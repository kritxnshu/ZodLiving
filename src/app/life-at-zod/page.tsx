import LifeAtZodPage from "@/components/pages/LifeAtZodPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Life at ZOD",
  description:
    "Rooms, study spaces, the dining mess, lounge and common areas: a look at everyday student life at ZOD Living in Knowledge Park III, Greater Noida.",
  path: "/life-at-zod",
});

export default function Page() {
  return <LifeAtZodPage />;
}
