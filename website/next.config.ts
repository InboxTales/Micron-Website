import type { NextConfig } from "next";

/*
 * Static export for Hostinger web hosting: `npm run build` writes the site to
 * out/, which is uploaded to public_html. Server behaviour (HTTPS, redirects,
 * caching, security headers, 404) lives in public/.htaccess, and the quote
 * form posts to public/api/enquiry.php.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Pages export as about/index.html and are served at /about/ (no .html/.folder clash on LiteSpeed)
  trailingSlash: true,
  images: {
    // No image server on static hosting; photos in public/images are pre-sized WebP.
    unoptimized: true,
  },
};

export default nextConfig;
