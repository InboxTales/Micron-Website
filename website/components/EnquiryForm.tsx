"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { applications, phoneLink, products } from "@/lib/site";
import { Upload } from "./Icons";

const requirements = [
  { value: "materials", label: "Materials" },
  { value: "installation", label: "Installation" },
  { value: "servicing", label: "Servicing" },
];

/** PHP handler in public/api/enquiry.php (runs on Hostinger, not in `next dev`) */
const ENDPOINT = "/api/enquiry.php";
const MAX_PHOTOS = 5;
const MAX_PHOTO_MB = 5;

type Errors = Partial<Record<"name" | "phone" | "site" | "requirement" | "photos", string>>;
type Status = "idle" | "sending" | "success" | "error";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const phone = String(data.get("phone") ?? "").trim();
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!/^\+?[\d\s()-]{7,20}$/.test(phone))
    errors.phone = "Please enter a valid phone number, including the country code if needed.";
  if (!String(data.get("site") ?? "").trim()) errors.site = "Please enter your site location.";
  if (!data.get("requirement")) errors.requirement = "Please choose the service you need.";

  const photos = data.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (photos.length > MAX_PHOTOS) errors.photos = `Please upload up to ${MAX_PHOTOS} photographs.`;
  else if (photos.some((f) => f.size > MAX_PHOTO_MB * 1024 * 1024))
    errors.photos = `Each photograph must be under ${MAX_PHOTO_MB} MB.`;
  return errors;
}

export function EnquiryForm() {
  const params = useSearchParams();
  const initialProduct = products.some((p) => p.id === params.get("product")) ? params.get("product")! : "";
  const initialRequirement = requirements.some((r) => r.value === params.get("requirement"))
    ? params.get("requirement")!
    : initialProduct
      ? "materials"
      : "";

  const [errors, setErrors] = useState<Errors>({});
  // ?status= is set when the form was posted before JavaScript loaded (see the API route)
  const [status, setStatus] = useState<Status>(() => {
    const s = params.get("status");
    return s === "success" || s === "error" ? s : "idle";
  });
  const [fileNames, setFileNames] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const first = (["name", "phone", "site", "requirement", "photos"] as const).find((k) => found[k]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      if (process.env.NODE_ENV === "development") {
        // No PHP in `next dev`: log and show success so the flow can be tried locally.
        console.info("Enquiry (dev only, not sent):", Object.fromEntries(data));
        setStatus("success");
        form.reset();
        setFileNames([]);
        return;
      }
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
      setFileNames([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Enquiry received</h3>
        <p>
          Thank you for contacting Micron Fencing Company. Your enquiry has been received. Our team will contact
          you to discuss your requirements.
        </p>
        <button type="button" className="btn btn--dark" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldError = (key: keyof Errors) =>
    errors[key] ? (
      <p className="field__error" id={`${key}-error`}>
        {errors[key]}
      </p>
    ) : null;

  const invalid = (key: keyof Errors) => ({
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <form
      className="enquiry-form"
      action={ENDPOINT}
      method="post"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">
            Full name <span className="req">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required {...invalid("name")} />
          {fieldError("name")}
        </div>

        <div className="field">
          <label htmlFor="phone">
            Phone number <span className="req">*</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required {...invalid("phone")} />
          {fieldError("phone")}
        </div>

        <div className="field field--full">
          <label htmlFor="site">
            Site location <span className="req">*</span>
          </label>
          <input id="site" name="site" placeholder="Village, town or area" required {...invalid("site")} />
          {fieldError("site")}
        </div>

        <fieldset className="field field--full" {...invalid("requirement")}>
          <legend>
            Requirement <span className="req">*</span>
          </legend>
          <div className="segmented">
            {requirements.map((r) => (
              <label key={r.value} className="segmented__option">
                <input type="radio" name="requirement" value={r.value} defaultChecked={r.value === initialRequirement} />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
          {fieldError("requirement")}
        </fieldset>

        <div className="field">
          <label htmlFor="propertyType">Property type</label>
          <select id="propertyType" name="propertyType" defaultValue="">
            <option value="">Select property type</option>
            {applications.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="product">Product of interest</label>
          <select id="product" name="product" defaultValue={initialProduct}>
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="length">Approximate boundary length</label>
          <div className="input-group">
            <input id="length" name="length" type="number" min="0" step="any" inputMode="decimal" />
            <select name="lengthUnit" aria-label="Length unit" defaultValue="metres">
              <option value="metres">Metres</option>
              <option value="feet">Feet</option>
              <option value="kilometres">Kilometres</option>
            </select>
          </div>
        </div>

        <div className="field field--full">
          <label htmlFor="details">Additional details</label>
          <textarea id="details" name="details" rows={4} />
        </div>

        <div className="field field--full">
          <span className="field__label">Upload site photographs</span>
          <label className={`dropzone${errors.photos ? " is-invalid" : ""}`}>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              {...invalid("photos")}
              onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
            <Upload size={22} />
            <span>
              {fileNames.length
                ? fileNames.join(", ")
                : "Add clear photographs of your site or the fence that needs attention."}
            </span>
            <small>
              Up to {MAX_PHOTOS} images, {MAX_PHOTO_MB} MB each
            </small>
          </label>
          {fieldError("photos")}
        </div>

        {/* Honeypot: hidden from people, often filled by bots */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          We couldn&apos;t send your enquiry. Please try again or contact us by phone
          {phoneLink().href.startsWith("tel:") ? (
            <>
              {" "}
              on <a href={phoneLink().href}>{phoneLink().label}</a>
            </>
          ) : null}
          .
        </p>
      )}

      <div className="form-footer">
        <p className="form-note">
          We&apos;ll use the details you provide to respond to your enquiry. Read our{" "}
          <Link href="/privacy">Privacy Policy</Link> for more information.
        </p>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending enquiry..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}
