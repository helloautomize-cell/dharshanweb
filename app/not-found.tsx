import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <main className="not-found on-night" data-dark>
      <Brand variant="ice" size={44} />
      <h1 className="h2">
        This page moved <span className="serif">on.</span>
      </h1>
      <p className="lede">
        The link may be old or the page renamed. Try one of these instead.
      </p>
      <div className="not-found-links">
        <Link className="btn btn-invert" href="/contact/#book">
          <span className="button-label">Book a consultation</span>
        </Link>
        <Link className="btn btn-ghost" href="/care/#where">
          Where does it hurt?
        </Link>
        <Link className="btn btn-ghost" href="/">
          Back to home
        </Link>
      </div>
      <p className="footer-emergency">
        Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
        <Link href="tel:112">112</Link>
      </p>
    </main>
  );
}
