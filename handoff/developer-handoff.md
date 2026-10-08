# Website Handoff

## Intended experience

An enquiry-led business website for Micron Fencing Company. The current scope covers six pages: Home, About Us, Products, Services, Applications and Contact. A cart, checkout, customer account, admin panel or product inventory integration has not been specified.

## Content sources

- `content/website-content.md`: complete readable copy.
- `content/pages/`: one Markdown file per page.
- `content/faq.md` and `content/shared-content.md`: reusable copy.
- `content/data/website-content.json`: the same copy grouped by page, with draft metadata.
- `content/data/products.json`: supplied product and brand options; unknown fields remain null.
- `content/data/business-details-template.json`: business fields still to complete.

## Brand sources

- Use `brand/current-brand-guide.md` and the current logo SVGs.
- Use `handoff/asset-map.json` to locate the recommended files.
- `brand/reference/Micron_Brand_Book_Original_Concept_v1.pdf` is the original proposal, not the latest logo specification.
- The wordmark is outlined artwork; supporting font files are for ordinary headings and body copy.

## Interaction destinations

| Action | Destination or behaviour |
| --- | --- |
| Get a Quote / Request a Quote | `/contact#enquiry` |
| Explore Products / View All Products | `/products` |
| About Micron | `/about` |
| Explore Applications | `/applications` |
| Product enquiry | `/contact?product=[product-id]#enquiry`; prefill the product |
| Installation enquiry | `/contact?requirement=installation#enquiry` |
| Servicing enquiry | `/contact?requirement=servicing#enquiry` |
| Material pricing | `/contact?requirement=materials#enquiry` |
| Call Now | Verified `tel:` link after the number is supplied |
| WhatsApp Us | Verified WhatsApp number and prefilled enquiry message |

Build a real submission flow for the enquiry form. Show success only after the server accepts the enquiry. The recipient, mail service, storage, upload limits and spam controls still need implementation decisions. Keep submission credentials on the server.

## SEO and page structure

Use the supplied draft titles and descriptions. Set one meaningful H1 per page and logical section headings. Add canonical URLs, sitemap and robots directives after the real domain is confirmed. Add structured business data only for verified details. Keep FAQ copy visible if using it in page metadata.

## Build decisions still needed

Confirm stack, hosting, form recipient/service, file-upload handling, any analytics, whether an admin interface is needed, and launch date. No domain, hosting account or external service has been created by this pack.
