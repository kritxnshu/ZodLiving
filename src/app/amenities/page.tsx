import AmenitiesPage from "@/components/pages/AmenitiesPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Amenities",
  description:
    "Everything included at ZOD Living: 4 meals a day in an air-conditioned mess, high-speed Wi-Fi, laundry, 24×7 security with CCTV, power backup, a PS5 room and more.",
  path: "/amenities",
});

export default function Page() {
  return <AmenitiesPage />;
}
