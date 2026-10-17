import type { Metadata } from "next";
import Image from "next/image";
import { MotionReview } from "@/components/motion-review";
import { NavigationDemo } from "@/components/navigation-demo";
import { ServiceCard } from "@/components/service-card";
import { Brand, Button } from "@/components/primitives";
import { Icon } from "@/lib/icons";
import { MedicalIcon, medicalIconNames } from "@/components/medical-icons";
import { CareIcon, careIconNames } from "@/components/icons/care";
import { contrast, tokens } from "@/lib/design-tokens";
import { altFor } from "@/lib/alt-text";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Rehabify styleguide",
  description: "Rehabify design system and component review.",
  robots: { index: false, follow: false },
};

const colourStrip: [string, string, string][] = [
  ["Night", "#0A1626", "stage surfaces"],
  ["Ice", "#D9EDF3", "headlines on night"],
  ["Aqua", "#6FD0E6", "tiny highlight on night only"],
  ["Apricot", "#F2B48A", "emergency line only"],
  ["Blue", "#0A6E94", "primary action"],
  ["Blue ink", "#086487", "small blue text"],
  ["Ink", "#0E2233", "body text"],
  ["Paper", "#F5F8FA", "page ground"],
  ["White", "#FFFFFF", "cards"],
];

const swatches = Object.entries(tokens).filter(
  ([name]) => !["line", "ok", "wa", "alert"].includes(name),
);

export default function Styleguide() {
  return (
    <MotionReview>
      <main>
        {/* ======= tokens and type ======= */}
        <section className="section wrap" id="system">
          <div className="sys">
            <span className="kicker">The system behind this page</span>
            <h2 className="sys-h">
              Design <span className="serif">tokens</span> and components
            </h2>
            <p className="lede">
              Every specimen below is the component that ships on the site, not
              a copy, so this page cannot drift from the real design.
            </p>

            <h3>Colour</h3>
            <div
              className="sw"
              role="region"
              aria-label="Colour strip"
              tabIndex={0}
            >
              {colourStrip.map(([name, hex, note]) => (
                <div key={name}>
                  <i
                    style={{
                      background: hex,
                      borderBottom:
                        hex === "#F5F8FA" || hex === "#FFFFFF"
                          ? "1px solid #DFE8EE"
                          : undefined,
                    }}
                  />
                  <p>
                    <b>{name}</b>
                    <span>
                      {hex} · {note}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <details className="placeholder-disclosure">
              <summary>Full token list with contrast ratios</summary>
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
            </details>
          </div>
        </section>

        {/* ======= type ======= */}
        <section className="section wrap" id="type">
          <div className="sys">
            <h3>Type</h3>
            <div className="ts">
              <div>
                <small>
                  Display · Bricolage Grotesque 600 · -0.035em · 1.02
                </small>
                <span
                  style={{
                    font: "600 clamp(40px,6vw,72px)/1.02 var(--font-heading), sans-serif",
                    letterSpacing: "-0.035em",
                  }}
                >
                  Rehab that moves <span className="serif">with you.</span>
                </span>
              </div>
              <div>
                <small>H2 · Bricolage 600 · -0.035em · 1.02</small>
                <span
                  style={{
                    font: "600 40px/1.02 var(--font-heading), sans-serif",
                    letterSpacing: "-0.035em",
                  }}
                >
                  Where does it <span className="serif">hurt?</span>
                </span>
              </div>
              <div>
                <small>
                  Accent · Instrument Serif italic · one phrase per heading
                </small>
                <span className="serif" style={{ fontSize: 36 }}>
                  small one.
                </span>
              </div>
              <div>
                <small>Body · Geist 400 · 17px · 1.65</small>
                <span>
                  Bring your scans, reports and a list of the medicines you
                  take.
                </span>
              </div>
              <div>
                <small>Kicker · Geist Mono · 12px · .14em tracking</small>
                <span className="mono">
                  Step 02 · 3 sets × 10 · KMC Reg. No.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap" id="buttons">
          <div className="sys">
            <h3>Buttons</h3>
            <div className="button-samples">
              <Button />
              <Button kind="ghost" href="#system">
                Where does it hurt?
              </Button>
              <Button kind="wa" href={siteConfig.whatsapp}>
                WhatsApp
              </Button>
              <Button kind="link" href="#buttons">
                View profile
              </Button>
            </div>
            <div className="glow-specimens">
              <div className="on-night">
                <span>Primary on night</span>
                <Button kind="invert" />
              </div>
            </div>
            <details className="placeholder-disclosure">
              <summary>Hover, focus and disabled states</summary>
              <div className="button-states">
                {(["primary", "ghost", "invert", "wa", "link"] as const).map(
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
          </div>
        </section>

        {/* ======= cards ======= */}
        <section className="section wrap" id="cards">
          <div className="sys">
            <h3>Cards</h3>
            <div className="card-specimens">
              <ServiceCard
                href="/pain-and-spine/back-pain/"
                badge="back-pain"
                kicker="Pain and spine"
                title="Back pain"
                text="Discs, joints and muscles. Exercise first, procedures when suitable."
              />
            </div>
          </div>
        </section>

        <section className="section wrap" id="cards-tile">
          <div className="sys">
            <h3>Bento tile</h3>
            <div className="card-specimens">
              <div className="tile">
                <span className="mono">Bento tile</span>
                <h3>Image-guided injections, only when suitable.</h3>
                <p>
                  When an injection is part of the plan, it is guided by
                  imaging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======= navigation states ======= */}
        <section className="section wrap" id="nav-states">
          <div className="sys">
            <h3>Navigation states</h3>
            <NavigationDemo />
          </div>
        </section>

        {(["paper", "night"] as const).map((surface) => (
          <section
            className="section wrap"
            id={surface === "night" ? "icons-night" : "icons"}
            key={surface}
          >
            <div className="sys">
              <h3>Icons on {surface}</h3>
              <div className="icon-specimens">
                <div
                  className={`icon-strip ${surface === "night" ? "on-night" : ""}`}
                >
                  <span className="specimen-label">
                    {surface === "night" ? "On night" : "On paper"} · Lucide,
                    stroke 1.5 to 1.75
                  </span>
                  <div
                    className="icon-row"
                    role="region"
                    aria-label="Lucide icon set"
                    tabIndex={0}
                  >
                    {(
                      [
                        "calendar",
                        "phone",
                        "whatsapp",
                        "arrow",
                        "chevronDown",
                        "search",
                        "video",
                        "clock",
                        "pin",
                        "menu",
                        "close",
                        "check",
                        "play",
                        "pause",
                        "mic",
                        "sound",
                        "alert",
                        "info",
                        "file",
                      ] as const
                    ).map((name) => (
                      <span className="icon-cell" key={name}>
                        <Icon name={name} size={24} />
                        <small>{name}</small>
                      </span>
                    ))}
                  </div>
                  <span className="specimen-label">
                    Code-drawn medical, 24 and 16
                  </span>
                  <div
                    className="icon-row"
                    role="region"
                    aria-label="Code-drawn medical icons"
                    tabIndex={0}
                  >
                    {medicalIconNames.map((name) => (
                      <span className="icon-cell" key={name}>
                        <MedicalIcon name={name} size={24} />
                        <MedicalIcon name={name} size={16} />
                        <small>{name}</small>
                      </span>
                    ))}
                  </div>
                  <span className="specimen-label">
                    Care index icons, 28 and 20
                  </span>
                  <div
                    className="icon-row"
                    role="region"
                    aria-label="Care index icon set"
                    tabIndex={0}
                  >
                    {careIconNames.map((name) => (
                      <span className="icon-cell" key={name}>
                        <CareIcon name={name} size={28} />
                        <CareIcon name={name} size={20} />
                        <small>{name}</small>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ======= brand marks ======= */}
        <section className="section wrap" id="brand">
          <div className="sys">
            <h3>Brand marks</h3>
            <div className="logo-surfaces">
              {["dark", "light", "photo"].map((surface) => (
                <div className={`logo-surface ${surface}`} key={surface}>
                  {surface === "photo" && (
                    <Image
                      src="/images/doctors/dr-dharshan-banner.jpg"
                      alt={altFor("doctors/dr-dharshan-banner.jpg")}
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
          </div>
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
