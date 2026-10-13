"use client";

import { useEffect, useRef, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { careGroups } from "@/lib/service-badges";
import { Brand } from "./primitives";

export function NavigationDemo() {
  const [value, setValue] = useState("care");
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    root.current
      ?.querySelectorAll<HTMLElement>('span[aria-hidden="true"][tabindex="0"]')
      .forEach((guard) => {
        guard.tabIndex = -1;
      });
  }, [value]);
  const positionIndicator = (element: HTMLElement) => {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const link = element.getBoundingClientRect();
    root.current?.style.setProperty("--nav-x", `${link.left - bounds.left}px`);
    root.current?.style.setProperty("--nav-w", `${link.width}px`);
    root.current?.style.setProperty("--nav-show", "1");
  };
  return (
    <div className="navigation-demo">
      <NavigationMenu.Root
        ref={root}
        className="sample-nav"
        value={value}
        onValueChange={setValue}
        delayDuration={0}
      >
        <span className="nav-indicator" aria-hidden="true" />
        <Link className="nav-brand" href="/" aria-label="Rehabify home">
          <Brand />
        </Link>
        <NavigationMenu.List className="nav-links">
          <NavigationMenu.Item value="care">
            <NavigationMenu.Trigger
              className="nav-trigger"
              onPointerEnter={(event) => positionIndicator(event.currentTarget)}
              onFocus={(event) => positionIndicator(event.currentTarget)}
            >
              Care
              <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content
              className="mega-panel"
              forceMount
              hidden={value !== "care"}
            >
              <div className="mega-groups">
                {careGroups.map((group) => (
                  <div key={group.title}>
                    <h3>{group.title}</h3>
                    <NavigationMenu.Link href={group.href}>
                      {group.title}
                      <ArrowRight
                        size={16}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </NavigationMenu.Link>
                    {group.links.slice(0, 3).map((label) => (
                      <NavigationMenu.Link href={group.href} key={label}>
                        {label}
                      </NavigationMenu.Link>
                    ))}
                  </div>
                ))}
              </div>
              <NavigationMenu.Link
                href="/video-consultation/"
                className="mega-preview"
              >
                <Image
                  src="/images/doctors/dr-dharshan-video.jpg"
                  alt="Illustration: Dr. Dharshan N A explaining during a video consultation"
                  width={300}
                  height={200}
                  sizes="300px"
                />
                <span>
                  See the doctor from home
                  <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
              </NavigationMenu.Link>
              <p className="mega-emergency">
                Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
                <Link href="tel:112">112</Link>.
              </p>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          {[
            ["Where it hurts", "#body-map"],
            ["Video consults", "/video-consultation/"],
            ["Doctors", "#doctors"],
            ["Visit", "/plan-your-visit/"],
          ].map(([label, href]) => (
            <NavigationMenu.Item className="secondary-nav" key={label}>
              <NavigationMenu.Link
                href={href}
                onPointerEnter={(event) =>
                  positionIndicator(event.currentTarget)
                }
                onFocus={(event) => positionIndicator(event.currentTarget)}
              >
                {label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
        <Link className="nav-book" href="/contact/#book">
          Book a consultation
        </Link>
      </NavigationMenu.Root>
    </div>
  );
}
