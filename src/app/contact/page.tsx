import ContactPage from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Visit",
  description:
    "Visit ZOD Living at Plot 90, opposite Dronacharya College, Knowledge Park III, Greater Noida. Call or WhatsApp +91 78380 18108 to book a visit. Open 24 hours.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
