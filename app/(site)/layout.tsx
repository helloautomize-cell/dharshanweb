import { SiteHeader } from "@/components/site-header";
import { SiteFooter, MobileDock } from "@/components/site-footer";
import { SpineNav } from "@/components/spine-nav";
import { CookieBanner } from "@/components/cookie-banner";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <SpineNav />
      <div id="main">{children}</div>
      <SiteFooter />
      <MobileDock />
      <CookieBanner />
    </>
  );
}
