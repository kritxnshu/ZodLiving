import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { hostelJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hostelJsonLd()).replace(/</g, "\\u003c") }}
      />
      <HomePage />
    </>
  );
}
