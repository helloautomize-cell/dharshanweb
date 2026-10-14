import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import { VercelSpeedInsights } from "@/components/speed-insights";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-heading",
  display: "swap",
});
const body = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-code",
  preload: false,
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  preload: false,
  display: "swap",
});
export const metadata: Metadata = {
  title: "Rehabify",
  description:
    "Doctor-led physical medicine and rehabilitation in Bengaluru and online.",
  robots: { index: false, follow: false },
  metadataBase: new URL("https://www.rehabify.in/"),
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        {children}
        <VercelSpeedInsights />
      </body>
    </html>
  );
}
