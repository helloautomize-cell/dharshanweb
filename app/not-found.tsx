import type { Metadata } from "next";
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
        <a className="btn btn-glow light" href="/contact/#book">
          <span className="button-label">Book a consultation</span>
        </a>
        <a className="btn btn-ghost" href="/conditions/">
          Where does it hurt?
        </a>
        <a className="btn btn-ghost" href="/">
          Back to home
        </a>
      </div>
      <p className="footer-emergency">
        Medical emergency? Call <a href="tel:108">108</a> or{" "}
        <a href="tel:112">112</a>
      </p>
    </main>
  );
}
