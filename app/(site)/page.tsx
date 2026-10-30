import Link from "next/link";
import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Confirm } from "@/components/primitives";
import { FinderBar } from "@/components/finder-bar";
import { BodyMap } from "@/components/body-map";
import { CareIndex } from "@/components/care-index";
import { HomeEffects } from "@/components/home-effects";
import { GoalsTile } from "@/components/home-widgets";
import { HeroFan } from "@/components/hero-fan";
import { QuickAnswers } from "@/components/quick-answers";
import { DirectoryBookingClose } from "@/components/pages/shared";
import { faqPage, medicalWebPage, breadcrumb, graph } from "@/lib/schema";
import { getPage } from "@/lib/content";
import { altFor } from "@/lib/alt-text";

const page = getPage("/")!;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: "/" },
};

const arrow = (
  <svg
    className="arr"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const calIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

const condStrip: [string, string][] = [
  ["Back pain", "/pain-and-spine/back-pain/"],
  ["Neck pain", "/pain-and-spine/neck-pain/"],
  ["Sciatica", "/pain-and-spine/sciatica/"],
  ["Stroke", "/neuro-rehabilitation/stroke/"],
  ["Knee pain", "/joints-and-sports/knee-pain/"],
];

import { missingBadges } from "@/lib/service-badges";

const { existsSync } = await import("node:fs");
// Phase 7b: fail the build if a service badge file is missing.
for (const badge of missingBadges) {
  const file = `public/images/icons/services/${badge}@256.webp`;
  if (!existsSync(file)) throw new Error(`Missing service badge: ${file}`);
}

// Vertebra positions on the journey path, precomputed from
// "M60 20 C 30 120, 90 200, 60 300 S 30 480, 60 580" at (i + 0.5) / 6 of its
// length, so the spine renders correctly without JavaScript.
const vertPositions = [
  [51.8, 66.5],
  [60.1, 160.4],
  [68.2, 254.4],
  [47.9, 346.6],
  [37.5, 440.5],
  [48.1, 534.2],
] as const;

const recoverySteps = [
  [
    "Book",
    "Book online, call or WhatsApp. Choose a clinic visit or a video consult.",
    ["Clinic or video", "Confirmed by phone"],
  ],
  [
    "First consultation",
    "The doctor asks about your problem, checks how you move, your strength, balance and pain, and reads your scans.",
    ["Movement", "Strength", "Balance"],
  ],
  [
    "Your goals",
    "Together you agree on what matters: walking without support, sleeping without pain, getting back to work or sport.",
    ["Your words", "Measurable"],
  ],
  [
    "Your plan",
    "Exercise, therapy, medicines and, only when suitable, image-guided procedures. Every part explained in plain words.",
    ["Written plan", "Plain words"],
  ],
  [
    "Practice at home",
    "A home programme with clear steps, sets and repetitions, so progress continues between visits.",
    ["Home programme", "WhatsApp questions"],
  ],
  [
    "Review and adjust",
    "At each review the doctor measures your progress and changes the plan as you improve.",
    ["Range of motion", "Next goal"],
  ],
] as const;

const quickAnswers = [
  [
    "What is a physiatrist?",
    "A physiatrist is a doctor who specialises in Physical Medicine and Rehabilitation. They diagnose and treat problems with muscles, joints, nerves and the spine, and lead your rehab plan with physiotherapists and other therapists. The aim is less pain and more of the movement and independence you need for daily life.",
  ],
  [
    "Do I need a referral?",
    "No. You can book directly. Bring any scans, reports or hospital discharge summary to a clinic visit, or share them before a video consult, so the doctor can see the full picture.",
  ],
  [
    "Can rehab start with a video consult?",
    "Yes, for many problems. The doctor reviews your reports, watches you move on camera and sets a first plan with home exercises. If you need an in-person examination or a procedure, the doctor will tell you.",
  ],
  [
    "Is every pain treated with an injection?",
    "No. Most plans start with exercise, posture advice and medicines. Image-guided injections or nerve blocks are used only when the doctor finds them suitable after examining you, and every option is explained before you decide.",
  ],
  ["How do I book?", "Online, by phone or on WhatsApp at +91 79048 42576."],
  [
    "What should I bring?",
    "Scans, reports, discharge summary, medicines and any walking aids.",
  ],
] as const;

export default function Home() {
  const doctor = siteConfig.doctors[0];
  const second = siteConfig.doctors[1];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              page.meta,
              [
                faqPage(
                  quickAnswers.map(([question, answer]) => ({
                    question,
                    answer,
                  })),
                ),
                breadcrumb([{ label: "Home", href: "/" }]),
              ],
              medicalWebPage(page.meta),
            ),
          ),
        }}
      />
      <HomeEffects />

      {/* 1 · HERO */}
      <section
        className="stage on-night"
        id="top"
        data-dark
        style={{ marginTop: 12 }}
      >
        <div className="hero">
          <div className="hero-text">
            <span className="pill">
              <span className="dot" />
              Physical medicine and rehabilitation · Bengaluru and online
            </span>
            <h1>
              Rehab that
              <br />
              moves <span className="serif">with you.</span>
            </h1>
            <p className="lede">
              A rehabilitation doctor assesses how you move, sets goals with you
              and plans each step back to the things you want to do. For pain,
              stroke, spine and sports injuries.
            </p>
            <div className="btns">
              <Link className="btn btn-invert" href="/contact/#book">
                <span className="ic">{calIcon}</span>
                Book a consultation
              </Link>
              <Link className="btn btn-ghost" href="#where">
                Where does it hurt? {arrow}
              </Link>
            </div>
          </div>
          <HeroFan />
          <div className="facts">
            <span className="fact">
              <b>MD</b>
              <span>Physical medicine and rehabilitation</span>
            </span>
            <span className="fact">
              <b>Fellowship</b>
              <span>Interventional pain</span>
            </span>
            <span className="fact">
              <b>Two</b>
              <span>Rehabilitation doctors</span>
            </span>
            <span className="fact">
              <b>Clinic + video</b>
              <span>Bengaluru and online</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2 · FINDER */}
      <FinderBar />

      {/* 3 · CONDITIONS STRIP */}
      <nav className="cond-strip" aria-label="Common concerns">
        {condStrip.map(([label, href], i) => (
          <Fragment key={href}>
            {i > 0 && <i className="dot" aria-hidden="true" />}
            <Link href={href}>{label}</Link>
          </Fragment>
        ))}
      </nav>

      {/* 4 · WHY (bento) */}
      <section className="sec wrap" id="why">
        <div className="head split">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="kicker">Why Rehabify</span>
            <h2 className="h2">
              Rehab planned by a <span className="serif">doctor</span>, around
              your goals.
            </h2>
          </div>
          <p className="lede">
            Physiatrists are doctors who specialise in movement, pain and
            function. That changes where your rehab starts and how it is
            measured.
          </p>
        </div>
        <div className="bento">
          <article className="tile t-a">
            <span className="mono">How it starts</span>
            <blockquote>
              Your plan is written by a <b>rehabilitation doctor</b> after
              examining you, and it changes as you do.
            </blockquote>
            <div className="byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/doctors/dr-dharshan-avatar-160.jpg"
                width={46}
                height={46}
                alt=""
                loading="lazy"
              />
              <div>
                <b>Dr. Dharshan N A</b>
                <span>MBBS, MD (Physical Medicine and Rehabilitation)</span>
              </div>
            </div>
          </article>
          <article className="tile t-b">
            <span className="mono">Goals you choose · example</span>
            <h3>Progress is measured in the things you can do again.</h3>
            <GoalsTile />
          </article>
          <article className="tile t-c">
            <span className="mono">Pain care</span>
            <h3>Image-guided injections, only when suitable.</h3>
            <p>
              Most plans start with exercise and medicines. Nerve blocks and
              joint injections are guided by imaging.
            </p>
          </article>
          <article className="tile t-d">
            <span className="mono">Neuro rehab</span>
            <h3>Brain, spine and nerve recovery.</h3>
            <p>
              Stroke, head injury, spinal cord injury, Parkinson&rsquo;s
              disease.
            </p>
          </article>
          <article className="tile t-e">
            <span className="mono">For</span>
            <h3>Every age.</h3>
            <div className="ages">
              <Link href="/childrens-rehabilitation/">Children</Link>
              <Link href="/joints-and-sports/">Adults</Link>
              <Link href="/older-adults/">Older adults</Link>
            </div>
          </article>
        </div>
      </section>

      {/* 5 · BODY MAP */}
      <section className="sec wrap" id="where" style={{ paddingTop: 0 }}>
        <div className="head split">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="kicker">Find care by concern</span>
            <h2 className="h2">
              Where does it <span className="serif">hurt?</span>
            </h2>
          </div>
          <p className="lede">
            Tap the body or choose an area. You will see what the doctor looks
            after there and where to go next.
          </p>
        </div>
        <BodyMap />
      </section>

      {/* 6 · CARE INDEX */}
      <section className="sec wrap" id="care">
        <div className="head split">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="kicker">How we can help</span>
            <h2 className="h2">
              Care for pain, nerves and <span className="serif">movement.</span>
            </h2>
          </div>
          <p className="lede">
            Each one opens a full page on the condition, what happens at your
            visit and what to expect.
          </p>
        </div>
        <CareIndex />
      </section>

      {/* 7 · JOURNEY */}
      <section className="sec wrap" id="journey">
        <div className="head" style={{ maxWidth: 820 }}>
          <span className="kicker">Your recovery</span>
          <h2 className="h2">
            Six steps,
            <br />
            one <span className="serif">plan.</span>
          </h2>
          <p className="lede">Each step builds on the one before it.</p>
        </div>
        <div className="jr">
          <div className="jr-pin stage on-night" data-dark>
            <div className="aur" aria-hidden="true">
              <i />
              <i />
            </div>
            <svg viewBox="0 0 120 600" preserveAspectRatio="xMidYMid meet">
              <path
                className="track"
                aria-hidden="true"
                d="M60 20 C 30 120, 90 200, 60 300 S 30 480, 60 580"
              />
              <path
                className="drawn"
                id="jpath"
                aria-hidden="true"
                d="M60 20 C 30 120, 90 200, 60 300 S 30 480, 60 580"
                pathLength="1000"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <g id="jverts">
                {recoverySteps.map(([title], i) => (
                  <g
                    key={title}
                    className="v"
                    data-i={i}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to step ${i + 1}: ${title}`}
                    transform={`translate(${vertPositions[i][0]} ${vertPositions[i][1]})`}
                  >
                    <rect
                      className="v-hit"
                      x={-22}
                      y={-22}
                      width={44}
                      height={44}
                    />
                    <rect
                      className="v-pill"
                      x={-16}
                      y={-8}
                      width={32}
                      height={16}
                      rx={8}
                    />
                    <text className="v-num" x={26} y={4}>
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
            <div>
              <div className="jr-n" id="jn">
                01
              </div>
              <div className="jr-t" id="jt">
                {recoverySteps[0][0]}
              </div>
              <p className="jr-s mono" id="js">
                Step 1 of {recoverySteps.length}
              </p>
            </div>
          </div>
          <div className="steps">
            {recoverySteps.map(([title, text, tags], i) => (
              <div className="step" key={title} data-title={title} data-i={i}>
                <span className="mono">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="tagrow">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · WAYS (stacking cards) */}
      <section className="sec wrap" id="ways" style={{ paddingTop: 0 }}>
        <div className="head split">
          <div style={{ display: "grid", gap: 18 }}>
            <span className="kicker">Ways to see us</span>
            <h2 className="h2">
              In clinic, by video or at <span className="serif">home.</span>
            </h2>
          </div>
          <p className="lede">
            Three ways to start care, each confirmed by phone or WhatsApp.
          </p>
        </div>
        <div className="stack">
          <article className="sc" style={{ "--i": 0 } as CSSProperties}>
            <div className="tx">
              <span className="mono">01 · Clinic visit</span>
              <h3>See the doctor in person.</h3>
              <p>
                A full examination of how you move, with procedures done on site
                when needed.
              </p>
              <ul>
                <li>Bring scans, reports and medicines</li>
                <li>Wear loose clothes</li>
                <li>By appointment</li>
              </ul>
              <Link className="btn btn-primary" href="/contact/#book">
                <span className="ic">{arrow}</span>
                Book a clinic visit
              </Link>
            </div>
            <div className="ui photo">
              <Image
                src="/images/doctors/dr-dharshan-banner.jpg"
                alt={altFor("doctors/dr-dharshan-banner.jpg")}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </article>
          <article className="sc" style={{ "--i": 1 } as CSSProperties}>
            <div className="tx">
              <span className="mono">02 · Video consult</span>
              <h3>Start from home.</h3>
              <p>
                Share your reports, show the doctor how you move on camera and
                leave with a first plan.
              </p>
              <ul>
                <li>Good for first advice and follow-ups</li>
                <li>Reports shared before the call</li>
                <li>The doctor says if you need to come in</li>
              </ul>
              <Link className="btn btn-primary" href="/video-consultation/">
                <span className="ic">{arrow}</span>
                Book a video consult
              </Link>
            </div>
            <div className="ui photo">
              <Image
                src="/images/doctors/dr-dharshan-video.jpg"
                alt={altFor("doctors/dr-dharshan-video.jpg")}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </article>
        </div>
      </section>

      {/* 9 · DOCTOR */}
      <section className="sec wrap" id="doctor" style={{ paddingTop: 0 }}>
        <div className="doc">
          <div className="doc-ph" id="docph">
            <Image
              src="/images/doctors/dr-dharshan-desk.jpg"
              alt={altFor("doctors/dr-dharshan-desk.jpg")}
              fill
              sizes="(max-width: 1023px) 100vw, 45vw"
            />
            <div className="float">
              <div>
                <b>Dr. Dharshan N&nbsp;A</b>
                <span>Consultant in Physical Medicine and Rehabilitation</span>
              </div>
              <span className="mono" style={{ color: "var(--aqua)" }}>
                Lead physiatrist
              </span>
            </div>
          </div>
          <div>
            <span className="kicker">Meet your doctor</span>
            <h2>
              Dr. Dharshan{" "}
              <span className="serif" style={{ color: "var(--blue-ink)" }}>
                N A
              </span>
            </h2>
            <p className="role">
              Consultant in Physical Medicine and Rehabilitation
            </p>
            <p className="bio">
              He looks after people recovering from stroke, brain and spinal
              cord injury, and people living with back, neck and joint pain. His
              work covers children, adults and older adults, with image-guided
              pain procedures when they are suitable.
            </p>
            <div className="ways">
              <div>
                <b>Goals first</b>
                <p>Every plan starts from what you want to be able to do.</p>
              </div>
              <div>
                <b>Explained plainly</b>
                <p>Scans, options and next steps in simple words.</p>
              </div>
              <div>
                <b>One team</b>
                <p>
                  Works with physiotherapists and other therapists on one plan.
                </p>
              </div>
            </div>
            <div className="tl">
              <div>
                <span className="mono">2013 to 2019</span>
                <p>MBBS, Annapoorana Medical College, Salem</p>
              </div>
              <div>
                <span className="mono">2020 to 2023</span>
                <p>MD, Physical Medicine and Rehabilitation, RIMS Imphal</p>
              </div>
              <div>
                <span className="mono">Fellowship</span>
                <p>
                  Interventional Pain Management, Delhi Pain Management Centre
                </p>
              </div>
            </div>
            <div className="btns">
              <Link
                className="btn btn-primary"
                href="/contact/?doctor=dr-dharshan#book"
              >
                <span className="ic">{calIcon}</span>
                Book with Dr. Dharshan
              </Link>
              <Link className="btn btn-ghost" href={doctor.slug}>
                Full profile {arrow}
              </Link>
            </div>
          </div>
        </div>
        <div className="doc2">
          <article className="dcard">
            <div className="dph">
              <Image
                src="/images/doctors/dr-dharshan-avatar.jpg"
                alt="Dr. Dharshan N A"
                fill
                sizes="120px"
              />
            </div>
            <div>
              <span className="mono">Lead physiatrist</span>
              <h3>Dr. Dharshan N&nbsp;A</h3>
              <p>
                MD Physical Medicine and Rehabilitation · Fellowship in
                Interventional Pain Management
              </p>
            </div>
            <Link className="btn btn-ghost" href={doctor.slug}>
              Profile {arrow}
            </Link>
          </article>
          <article className="dcard">
            <div className="dph">
              <Image
                src="/images/doctors/dr-selina-avatar.jpg"
                alt="Dr. Selina Kh"
                fill
                sizes="120px"
              />
            </div>
            <div>
              <span className="mono">Consultant physiatrist</span>
              <h3>Dr. Selina Kh</h3>
              <p>
                Physical Medicine and Rehabilitation. Stroke, spinal cord
                injury, rheumatology and pain management.
              </p>
            </div>
            <Link className="btn btn-ghost" href={second.slug}>
              Profile {arrow}
            </Link>
          </article>
        </div>
      </section>

      {/* 10 · VISIT */}
      <section className="wrap" id="visit">
        <div className="visit on-night" id="visitband" data-dark>
          <div className="visit-panel">
            <span className="kicker">Plan your visit</span>
            <h3>See the doctor in Bengaluru.</h3>
            <p>
              {siteConfig.address.includes("[CONFIRM")
                ? "To be confirmed, shared when you book."
                : siteConfig.address}
            </p>
            <div className="row">
              <span>By appointment</span>
              <span>Video consults too</span>
            </div>
            <Link className="btn care-guide visit-dir" href="/plan-your-visit/">
              Get directions {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 11 · QUICK ANSWERS */}
      <section className="sec wrap" id="faq">
        <div className="faq-grid">
          <div className="faq-side">
            <span className="kicker">Quick answers</span>
            <h2 className="h2" style={{ marginTop: 18 }}>
              Before you <span className="serif">book.</span>
            </h2>
            <p className="lede">
              Answers about physiatrists, booking, video consults, procedures,
              children&apos;s rehab and privacy at Rehabify.
            </p>
          </div>
          <div>
            <QuickAnswers items={quickAnswers} />
            <p className="faq-review">
              <Image
                src="/images/doctors/dr-dharshan-avatar-160.jpg"
                alt=""
                width={32}
                height={32}
                className="faq-av"
              />
              <span>
                Medically reviewed by{" "}
                <Link href="/dr-dharshan-n-a/">Dr. Dharshan N A</Link>,
                consultant in physical medicine and rehabilitation
                {page.meta.lastReviewed?.includes("[CONFIRM") ? (
                  <Confirm>
                    {` · Last reviewed: ${page.meta.lastReviewed}`}
                  </Confirm>
                ) : page.meta.lastReviewed ? (
                  <> · Last reviewed: {page.meta.lastReviewed}</>
                ) : null}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 12 · BOOK */}
      <DirectoryBookingClose
        heading={
          <>
            Your next step can be a <span className="serif">small one.</span>
          </>
        }
        description="Clinic visit or video consult. The team confirms your time by phone or WhatsApp."
      />
    </>
  );
}
