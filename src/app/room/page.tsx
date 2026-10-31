import RoomPage from "@/components/pages/RoomPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Rooms & Fees",
  description:
    "2-seater and 3-seater rooms at ZOD Living, Greater Noida. Non-AC from ₹1,35,000 and AC from ₹1,50,000 per college session, with attached washrooms, study desks and 4 meals a day.",
  path: "/room",
});

export default function Page() {
  return <RoomPage />;
}
