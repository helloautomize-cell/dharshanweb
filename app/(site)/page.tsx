import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="foundation-page">
      <Image
        src="/images/brand/mark-ice@3x.png"
        width={80}
        height={122}
        alt="Rehabify"
        unoptimized
      />
      <h1 className="h2">{siteConfig.name}</h1>
      <p className="lede">Physical medicine and rehabilitation</p>
    </main>
  );
}
