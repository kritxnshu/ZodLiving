import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BASE_OPEN_GRAPH, BASE_TWITTER, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for page and section titles
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const DESCRIPTION =
  "Student hostel opposite Dronacharya College, Knowledge Park III, Greater Noida. 2 & 3-seater AC and Non-AC rooms with attached washrooms, 4 meals a day, high-speed Wi-Fi, laundry and 24×7 security.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Student Hostel in Knowledge Park III, Greater Noida`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: `${SITE_NAME} — Student Hostel in Greater Noida`,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    ...BASE_TWITTER,
    title: `${SITE_NAME} — Student Hostel in Greater Noida`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} dark antialiased`}
    >
      <body className="min-h-full bg-black text-white antialiased selection:bg-neutral-800 selection:text-white">
        <CustomCursor />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
