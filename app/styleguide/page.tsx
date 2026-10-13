import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MotionReview } from "@/components/motion-review";
import { DoctorFan, DoctorCards } from "@/components/doctor-fan";
import { FinderBar } from "@/components/finder-bar";
import { BodyMap } from "@/components/body-map";
import { GoalsBento } from "@/components/goals-bento";
import { NavigationDemo } from "@/components/navigation-demo";
import {
  BadgeCards,
  BadgeGallery,
  Goniometer,
  MobileDock,
  SpineNavigator,
  VideoCard,
} from "@/components/medical-widgets";
import { Brand, Button, SectionHeading } from "@/components/primitives";
import { contrast, tokens } from "@/lib/design-tokens";
import { faqs } from "@/lib/styleguide-copy";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Rehabify styleguide",
  description: "Rehabify design system and component review.",
  robots: { index: false, follow: false },
};
const swatches = Object.entries(tokens).filter(
  ([name]) => !["line", "ok", "wa", "alert"].includes(name),
);
export default function Styleguide() {
  return (
    <MotionReview>
      <main>
        <DoctorFan />
        <FinderBar />
        <section className="section wrap" id="logos">
          <SectionHeading>Brand marks</SectionHeading>
          <div className="logo-surfaces">
            {["dark", "light", "photo"].map((surface) => (
              <div className={`logo-surface ${surface}`} key={surface}>
                {surface === "photo" && (
                  <Image
                    src="/images/doctors/dr-dharshan-banner.jpg"
                    alt=""
                    fill
                    sizes="400px"
                  />
                )}
                {[24, 40, 64].map((size) => (
                  <Brand
                    key={size}
                    variant={
                      surface === "light"
                        ? "blue"
                        : surface === "photo"
                          ? "white"
                          : "ice"
                    }
                    size={size}
                    wordmark={false}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="icon-samples">
            <Image
              src="/images/brand/icon.png"
              width={64}
              height={64}
              alt="Rehabify app icon"
            />
            <Image
              src="/images/brand/apple-icon.png"
              width={48}
              height={48}
              alt="Rehabify Apple touch icon"
            />
            <Image
              src="/favicon.ico"
              width={32}
              height={32}
              alt="Rehabify favicon"
              unoptimized
            />
          </div>
        </section>
        <section className="section wrap" id="tokens">
          <SectionHeading>Night and ice</SectionHeading>
          <div
            className="swatches"
            role="region"
            aria-label="Colour tokens"
            tabIndex={0}
          >
            {swatches.map(([name, color]) => {
              const background = [
                "night",
                "night-2",
                "night-3",
                "blue",
                "blue-ink",
                "ink",
                "ink-2",
              ].includes(name)
                ? tokens.card
                : tokens.night;
              const ratio = contrast(color, background);
              return (
                <div className="swatch" key={name}>
                  <div
                    className="swatch-color"
                    style={{ backgroundColor: color }}
                  />
                  <div className="swatch-text">
                    <b>{name}</b>
                    <span>{color}</span>
                    <span>
                      {ratio.toFixed(2)}:1 on{" "}
                      {background === tokens.night ? "night" : "white"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="section wrap" id="typography">
          <SectionHeading>Typography</SectionHeading>
          <div className="type-specimens">
            <div>
              <span className="specimen-label">Display</span>
              <p className="display">
                Rehab that moves <span className="serif">with you.</span>
              </p>
            </div>
            <div>
              <span className="specimen-label">Heading</span>
              <p className="h2">
                Where does it <span className="serif">hurt?</span>
              </p>
            </div>
            <div>
              <span className="specimen-label">Subheading</span>
              <p className="h3">Goals first</p>
            </div>
            <div>
              <span className="specimen-label">Lede</span>
              <p className="lede">
                Every plan at Rehabify is led by a doctor trained in physical
                medicine and rehabilitation.
              </p>
            </div>
            <div>
              <span className="specimen-label">Body</span>
              <p>Every plan starts from what you want to be able to do.</p>
            </div>
            <div>
              <span className="specimen-label">Label</span>
              <p className="kicker">Physical medicine and rehabilitation</p>
            </div>
          </div>
        </section>
        <section className="section wrap">
          <div className="type-night on-night">
            <h2 className="h2">
              Care for pain, nerves and <span className="serif">movement.</span>
            </h2>
          </div>
        </section>
        <section className="section wrap" id="buttons">
          <SectionHeading>Buttons and states</SectionHeading>
          <div className="button-samples">
            <Button />
            <Button kind="ghost" href="#body-map">
              Where does it hurt?
            </Button>
            <Button kind="wa" href={siteConfig.whatsapp}>
              WhatsApp
            </Button>
            <Button kind="link" href="#doctors">
              View profile
            </Button>
          </div>
          <details className="placeholder-disclosure">
            <summary>Hover, focus and disabled states</summary>
            <div className="button-states">
              {(["primary", "ghost", "glow", "wa", "link"] as const).map(
                (kind) => (
                  <div key={kind}>
                    <span className="specimen-label">{kind}</span>
                    {["", "hover", "focus"].map((state) => (
                      <Button key={state} kind={kind} state={state}>
                        {kind === "wa"
                          ? "WhatsApp"
                          : kind === "link"
                            ? "View profile"
                            : "Book a consultation"}
                      </Button>
                    ))}
                    <Button kind={kind} disabled>
                      {kind === "wa"
                        ? "WhatsApp"
                        : kind === "link"
                          ? "View profile"
                          : "Book a consultation"}
                    </Button>
                  </div>
                ),
              )}
            </div>
          </details>
          <div className="glow-specimens">
            <div>
              <span className="specimen-label">Glow on paper</span>
              <Button kind="glow" />
            </div>
            <div className="on-night">
              <span>Glow on night</span>
              <Button kind="glow" />
            </div>
          </div>
        </section>
        <section className="section wrap" id="navigation">
          <SectionHeading>Navigation</SectionHeading>
          <NavigationDemo />
          <SpineNavigator />
        </section>
        <section className="section wrap" id="goniometer">
          <div className="widget-layout">
            <Goniometer />
            <div>
              <SectionHeading>Measured at each review</SectionHeading>
              <p className="lede">
                At each review the doctor measures your progress and changes the
                plan as you improve.
              </p>
            </div>
          </div>
        </section>
        <section className="section wrap" id="goals">
          <SectionHeading>
            Rehab planned by a <span className="serif">doctor</span>, around
            your goals.
          </SectionHeading>
          <GoalsBento />
        </section>
        <section className="section wrap" id="body-map">
          <SectionHeading description="Tap the body or choose an area. You will see what the doctor looks after there and where to go next.">
            Where does it <span className="serif">hurt?</span>
          </SectionHeading>
          <BodyMap />
        </section>
        <section className="section wrap" id="badges">
          <SectionHeading>
            Care for pain, nerves and <span className="serif">movement.</span>
          </SectionHeading>
          <BadgeCards />
          <details className="placeholder-disclosure">
            <summary>All 28 badges at 256, 112 and 64 on night and paper</summary>
            <BadgeGallery />
          </details>
        </section>
        <section className="section wrap" id="video">
          <SectionHeading>
            In clinic, by video or at <span className="serif">home.</span>
          </SectionHeading>
          <VideoCard />
        </section>
        <DoctorCards />
        <section className="section wrap" id="faqs">
          <SectionHeading>
            Before you <span className="serif">book.</span>
          </SectionHeading>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>
                  {faq.question}
                  <ChevronDown
                    size={24}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </summary>
                <div className="faq-answer">
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section className="section wrap" id="callouts">
          <SectionHeading>Notices</SectionHeading>
          <div className="callouts">
            <aside className="callout emergency">
              <h3>Medical emergency?</h3>
              <p>
                Call <a href="tel:108">108</a> or <a href="tel:112">112</a>.
              </p>
            </aside>
            <aside className="callout">
              <h3>Medical information</h3>
              <p>
                Information here is for general education and does not replace a
                consultation.
              </p>
            </aside>
            <aside className="callout warning">
              <h3>Plan your visit</h3>
              <p>
                Wear loose clothes to your visit so the doctor can check how
                your back, hips and knees move.
              </p>
            </aside>
          </div>
        </section>
        <section className="section wrap" id="dock">
          <SectionHeading>Mobile dock</SectionHeading>
          <MobileDock />
        </section>
      </main>
      <footer className="specimen-footer">
        <Brand variant="ice" />
        <p>Medical emergency? Call 108 or 112.</p>
        <p>
          Information here is for general education and does not replace a
          consultation.
        </p>
      </footer>
    </MotionReview>
  );
}
