import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileDock } from "@/components/mobile-dock";
import { DesktopQuickActions } from "@/components/desktop-quick-actions";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
import { Suspense } from "react";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <MobileDock />
      <DesktopQuickActions />
      <CookieBanner />
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </>
  );
}
