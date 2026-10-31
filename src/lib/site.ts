import type { Metadata } from "next";
import { PROPERTY_CONFIG, ROOM_TIERS, VERIFIED_AMENITIES } from "@/lib/contact-config";

/**
 * Public URL of the site, used for canonical links, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL once there is a custom domain; on Vercel it otherwise falls back to the
 * project's production URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "ZOD Living";

const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "ZOD Living student hostel building in Knowledge Park III, Greater Noida",
};

/**
 * Social preview settings every page shares. A page that sets `openGraph` replaces its parent's
 * entirely, so pages spread this in rather than relying on the root layout.
 */
export const BASE_OPEN_GRAPH = {
  type: "website",
  locale: "en_IN",
  siteName: SITE_NAME,
  images: [SHARE_IMAGE],
} satisfies Metadata["openGraph"];

export const BASE_TWITTER = {
  card: "summary_large_image",
  images: [SHARE_IMAGE.url],
} satisfies Metadata["twitter"];

/** Title, description, canonical URL and social preview text for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...BASE_OPEN_GRAPH, title: `${title} | ${SITE_NAME}`, description, url: path },
    twitter: { ...BASE_TWITTER, title: `${title} | ${SITE_NAME}`, description },
  };
}

/** schema.org description of the hostel, rendered as JSON-LD on the homepage. */
export function hostelJsonLd() {
  const fees = ROOM_TIERS.flatMap((room) => [room.nonAcPrice, room.acPrice]).map((price) =>
    Number(price.replace(/\D/g, ""))
  );
  const inr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
  return {
    "@context": "https://schema.org",
    "@type": "Hostel",
    name: SITE_NAME,
    description:
      "Student hostel opposite Dronacharya College in Knowledge Park III, Greater Noida, with 2- and 3-seater AC and Non-AC rooms, attached washrooms and 4 meals a day.",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    telephone: PROPERTY_CONFIG.phoneRaw,
    email: PROPERTY_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 90, opposite Dronacharya College, Namoli, Knowledge Park III",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201310",
      addressCountry: "IN",
    },
    hasMap: PROPERTY_CONFIG.googleMapsUrl,
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: `${inr(Math.min(...fees))} – ${inr(Math.max(...fees))} per college session`,
    amenityFeature: VERIFIED_AMENITIES.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.title,
      value: true,
    })),
    sameAs: [PROPERTY_CONFIG.instagram.url, PROPERTY_CONFIG.facebook.url],
  };
}
