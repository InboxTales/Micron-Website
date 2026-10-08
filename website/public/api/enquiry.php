<?php
/*
 * Quote form handler for Hostinger (PHP). Emails each enquiry, with any site
 * photos attached, to ENQUIRY_TO.
 *
 * Before launch:
 *   1. In hPanel > Emails, create the sender mailbox below (or change it to one you have).
 *   2. Set ENQUIRY_TO to the inbox that should receive enquiries.
 * Until ENQUIRY_TO is set the form shows its error message with the phone fallback.
 */

// Never print PHP warnings (and server paths) to visitors; they still go to the error log.
ini_set('display_errors', '0');

const ENQUIRY_TO = 'info@micron.in';           // inbox that receives enquiries
const ENQUIRY_FROM = 'noreply@micronwires.in'; // must be a mailbox on micronwires.in
const SITE_NAME = 'Micron Wires';

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const RATE_LIMIT = 5;            // enquiries per IP...
const RATE_WINDOW = 3600;        // ...per hour
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
const REQUIREMENTS = ['materials' => 'Materials', 'installation' => 'Installation', 'servicing' => 'Servicing'];
const PRODUCTS = [
    'barbed-wire' => 'Barbed Wire',
    'chain-link-fencing' => 'Chain Link Fencing',
    'gi-wire' => 'GI Wire',
    'concertina-coils' => 'Concertina Coils',
    'gi-fencing-poles' => 'GI Fencing Poles',
    'not-sure' => 'Not sure yet',
];

/** JSON for the site's own fetch(); a redirect back to the form for plain (no-JavaScript) posts. */
function respond(int $status, array $body): void
{
    $wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode($body);
    } else {
        $result = $status < 300 ? 'success' : 'error';
        header('Location: /contact/?status=' . $result . '#enquiry', true, 303);
    }
    exit;
}

function field(string $key, int $max = 2000): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? ''; // strip control chars except newline/tab
    return mb_substr($value, 0, $max);
}

/** Single-line value safe for an email header. */
function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed']);
}

// Honeypot: real visitors never see this field.
if (field('company') !== '') {
    respond(200, ['ok' => true]);
}

$enquiry = [
    'Name' => field('name', 120),
    'Phone' => field('phone', 30),
    'Site location' => field('site', 200),
    'Requirement' => REQUIREMENTS[field('requirement', 20)] ?? '',
    'Property type' => field('propertyType', 60),
    'Product' => PRODUCTS[field('product', 40)] ?? '',
    'Boundary length' => field('length', 20) !== '' ? field('length', 20) . ' ' . field('lengthUnit', 20) : '',
    'Additional details' => field('details', 4000),
];

$problems = [];
if ($enquiry['Name'] === '') $problems[] = 'name';
if (!preg_match('/^\+?[\d\s()-]{7,20}$/', $enquiry['Phone'])) $problems[] = 'phone';
if ($enquiry['Site location'] === '') $problems[] = 'site';
if ($enquiry['Requirement'] === '') $problems[] = 'requirement';

// Collect uploaded photos (input name="photos" multiple)
$photos = [];
if (!empty($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    foreach ($_FILES['photos']['name'] as $i => $name) {
        $error = $_FILES['photos']['error'][$i];
        if ($error === UPLOAD_ERR_NO_FILE) continue;
        $tmp = $_FILES['photos']['tmp_name'][$i];
        $size = (int) $_FILES['photos']['size'][$i];
        $type = $error === UPLOAD_ERR_OK && is_uploaded_file($tmp) ? $finfo->file($tmp) : '';
        if ($error !== UPLOAD_ERR_OK || $size > MAX_PHOTO_BYTES || !in_array($type, ALLOWED_TYPES, true)) {
            $problems[] = 'photos';
            break;
        }
        $safeName = preg_replace('/[^A-Za-z0-9._-]+/', '_', basename((string) $name)) ?: 'photo';
        $photos[] = ['name' => mb_substr($safeName, 0, 80), 'type' => $type, 'path' => $tmp];
    }
    if (count($photos) > MAX_PHOTOS) $problems[] = 'photos';
}

if ($problems) {
    respond(422, ['error' => 'Invalid fields', 'fields' => array_values(array_unique($problems))]);
}

// Simple per-IP rate limit, stored in the server's temp directory.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/micron-enquiry-' . sha1($ip) . '.json';
$now = time();
$recent = is_file($rateFile) ? (json_decode((string) file_get_contents($rateFile), true) ?: []) : [];
$recent = array_values(array_filter($recent, fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
if (count($recent) >= RATE_LIMIT) {
    respond(429, ['error' => 'Too many enquiries, please call us instead']);
}

if (ENQUIRY_TO === '') {
    error_log('Micron enquiry received but ENQUIRY_TO is not configured in api/enquiry.php');
    respond(503, ['error' => 'Enquiry delivery is not configured']);
}

// Build the email: plain-text body plus photo attachments.
$lines = [];
foreach ($enquiry as $label => $value) {
    if ($value !== '') $lines[] = $label . ': ' . $value;
}
$lines[] = '';
$lines[] = 'Photos attached: ' . count($photos);
$lines[] = 'Sent from the quote form on ' . ($_SERVER['HTTP_HOST'] ?? 'the website') . ' at ' . gmdate('Y-m-d H:i') . ' UTC';
$text = implode("\r\n", $lines);

$subject = 'New fencing enquiry: ' . oneLine($enquiry['Requirement']) . ' – ' . oneLine($enquiry['Name']);
$boundary = 'micron-' . bin2hex(random_bytes(12));

$headers = [
    'From: ' . mb_encode_mimeheader(SITE_NAME . ' Website', 'UTF-8') . ' <' . ENQUIRY_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    'X-Mailer: Micron Wires website',
];

$body = "--$boundary\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: base64\r\n\r\n"
    . chunk_split(base64_encode($text));
foreach ($photos as $photo) {
    $body .= "--$boundary\r\n"
        . 'Content-Type: ' . $photo['type'] . '; name="' . $photo['name'] . "\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . 'Content-Disposition: attachment; filename="' . $photo['name'] . "\"\r\n\r\n"
        . chunk_split(base64_encode((string) file_get_contents($photo['path'])));
}
$body .= "--$boundary--\r\n";

$sent = mail(
    ENQUIRY_TO,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . ENQUIRY_FROM
);

if (!$sent) {
    error_log('Micron enquiry: mail() failed');
    respond(502, ['error' => 'Delivery failed']);
}

$recent[] = $now;
@file_put_contents($rateFile, json_encode($recent), LOCK_EX);
respond(200, ['ok' => true]);
