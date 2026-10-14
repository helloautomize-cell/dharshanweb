import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button, DoctorPortrait, Confirm } from "@/components/primitives";
import { FinderBar } from "@/components/finder-bar";
import { BodyMap } from "@/components/body-map";
import { Goniometer } from "@/components/medical-widgets";
import {
  QuoteTile,
  GoalsTile,
  ClinicVideoTile,
  ConditionsAZ,
  MarqueePause,
} from "@/components/home-widgets";
import {
  ReviewerBox,
  CtaBand,
  EmergencyStrip,
} from "@/components/pages/shared";
import {
  faqPage,
  medicalWebPage,
  breadcrumb,
  website,
  organisation,
} from "@/lib/schema";
import { getPage } from "@/lib/content";

const page = getPage("/")!;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

const marquee = [
  "Stroke",
  "Back pain",
  "Knee osteoarthritis",
  "Spinal cord injury",
  "Sciatica",
  "Frozen shoulder",
  "Neck pain",
  "Parkinson's disease",
  "Sports injuries",
  "Cerebral palsy",
  "Head injury",
  "Osteoporosis",
];

const careCards = [
  [
    "Pain and spine",
    "Back pain",
    "Discs, joints and muscles. Exercise first, procedures when suitable.",
    "/pain-and-spine/back-pain/",
    "back-pain",
  ],
  [
    "Pain and spine",
    "Neck pain",
    "Including pain that travels down the arm.",
    "/pain-and-spine/neck-pain/",
    "neck-pain",
  ],
  [
    "Pain and spine",
    "Sciatica",
    "Pain that runs from the back down the leg.",
    "/pain-and-spine/sciatica/",
    "sciatica",
  ],
  [
    "Pain and spine",
    "Image-guided injections",
    "Nerve blocks and joint injections, guided by imaging.",
    "/pain-and-spine/image-guided-injections/",
    "injections",
  ],
  [
    "Neuro rehab",
    "Stroke rehab",
    "Movement, balance, speech and daily tasks.",
    "/neuro-rehabilitation/stroke/",
    "stroke",
  ],
  [
    "Neuro rehab",
    "Spinal cord injury",
    "Mobility, independence and preventing complications.",
    "/neuro-rehabilitation/spinal-cord-injury/",
    "spine-injury",
  ],
  [
    "Neuro rehab",
    "Parkinson's disease",
    "Keep moving safely, reduce falls.",
    "/neuro-rehabilitation/parkinsons/",
    "parkinsons",
  ],
  [
    "Joints and sport",
    "Knee pain",
    "Including osteoarthritis and after surgery.",
    "/joints-and-sports/knee-pain/",
    "knee",
  ],
  [
    "Joints and sport",
    "Sports injuries",
    "A guided return to training and play.",
    "/joints-and-sports/sports-injuries/",
    "sports",
  ],
  [
    "Children",
    "Children's rehab",
    "Cerebral palsy, muscular dystrophy and development.",
    "/childrens-rehabilitation/",
    "children",
  ],
  [
    "Older adults",
    "Falls and balance",
    "Balance, strength and safety at home.",
    "/older-adults/falls-and-balance/",
    "older",
  ],
  [
    "Joints and sport",
    "Prosthetic training",
    "Learning to walk with a new limb.",
    "/joints-and-sports/prosthetic-rehab/",
    "prosthetics",
  ],
] as const;

const recoverySteps = [
  [
    "01",
    "Book",
    "Book online, call or WhatsApp. Choose a clinic visit or a video consult.",
    ["Clinic or video", "Confirmed by phone"],
  ],
  [
    "02",
    "First consultation",
    "The doctor asks about your problem, checks how you move, your strength, balance and pain, and reads your scans.",
    ["Movement", "Strength", "Balance"],
  ],
  [
    "03",
    "Your goals",
    "Together you agree on what matters: walking without support, sleeping without pain, getting back to work or sport.",
    ["Your words", "Measurable"],
  ],
  [
    "04",
    "Your plan",
    "Exercise, therapy, medicines and, only when suitable, image-guided procedures. Every part explained in plain words.",
    ["Written plan", "Plain words"],
  ],
  [
    "05",
    "Practice at home",
    "A home programme with clear steps, sets and repetitions, so progress continues between visits.",
    ["Home programme", "WhatsApp questions"],
  ],
  [
    "06",
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
] as const;

export default function Home() {
  const doctor = siteConfig.doctors[0];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              website(),
              organisation(),
              medicalWebPage(page.meta),
              faqPage(
                quickAnswers.map(([question, answer]) => ({
                  question,
                  answer,
                })),
              ),
              breadcrumb([{ label: "Home", href: "/" }]),
            ].filter(Boolean),
          }),
        }}
      />
      {/* 1. Hero (night stage) */}
      <section className="stage home-hero on-night" data-spine="Home" id="top">
        <div className="hero-copy">
          <p className="hero-pill">
            Physical medicine and rehabilitation · Bengaluru and online
          </p>
          <h1 className="display" id="hero-title">
            Rehab that moves <span className="serif">with you.</span>
          </h1>
          <p className="lede">
            A rehabilitation doctor assesses how you move, sets goals with you
            and plans each step back to the things you want to do. For pain,
            stroke, spine and sports injuries.
          </p>
          <div className="button-row">
            <Button kind="glow" />
            <Button kind="ghost" href="#concern">
              Where does it hurt?
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
          <p className="hero-facts">
            MD Physical Medicine and Rehabilitation · Fellowship Interventional
            pain · Clinic + video
          </p>
        </div>
        <div className="hero-visual">
          <div className="doctor-fan">
            <DoctorPortrait
              id="dr-selina-hero"
              alt="Dr. Selina Kh in a white coat with a stethoscope"
              className="back-arch"
            />
            <DoctorPortrait
              id="dr-dharshan-hero"
              alt="Dr. Dharshan N A in a white coat, arms crossed, in a rehabilitation corridor"
              priority
              className="front-arch"
            />
          </div>
          <div className="float-chip float-a">
            <span className="chip-dot" />
            Video consults available
          </div>
          <div className="float-gonio">
            <Goniometer />
            <p className="gonio-caption mono">
              Knee flexion · example · measured at each review
            </p>
          </div>
          <p className="arch-caption">
            Dr. Dharshan N A · Consultant physiatrist
          </p>
        </div>
        <p className="hero-short">A rehab doctor, in clinic or by video.</p>
      </section>

      {/* 2. Finder bar */}
      <section className="section finder-band" aria-label="Find care">
        <FinderBar />
      </section>

      {/* 3. Marquee */}
      <section className="marquee-band" aria-label="Conditions we see">
        <MarqueePause />
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined}>
              {marquee.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 4. Why Rehabify (bento) */}
      <section className="section wrap" id="why" data-spine="Why Rehabify">
        <div className="section-head">
          <p className="kicker">Why Rehabify</p>
          <h2 className="h2">
            Rehab planned by a <em>doctor</em>, around your goals.
          </h2>
          <p className="lede">
            Physiatrists are doctors who specialise in movement, pain and
            function. That changes where your rehab starts and how it is
            measured.
          </p>
        </div>
        <div className="bento-grid">
          <QuoteTile />
          <GoalsTile />
          <article className="bento-tile">
            <p className="kicker">Pain care</p>
            <h3 className="h3">Image-guided injections, only when suitable.</h3>
            <p className="muted">
              Most plans start with exercise and medicines. Nerve blocks and
              joint injections are guided by imaging.
            </p>
            <Link
              href="/pain-and-spine/image-guided-injections/"
              className="text-link"
            >
              Pain and spine care
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </article>
          <article className="bento-tile">
            <p className="kicker">Neuro rehab</p>
            <h3 className="h3">Brain, spine and nerve recovery.</h3>
            <p className="muted">
              Stroke, head injury, spinal cord injury, Parkinson&rsquo;s
              disease.
            </p>
            <Link href="/neuro-rehabilitation/" className="text-link">
              Neuro rehabilitation
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </article>
          <article className="bento-tile">
            <p className="kicker">For</p>
            <h3 className="h3">Every age.</h3>
            <ul className="age-list">
              <li>
                <Link href="/childrens-rehabilitation/">Children</Link>
              </li>
              <li>
                <Link href="/joints-and-sports/">Adults</Link>
              </li>
              <li>
                <Link href="/older-adults/">Older adults</Link>
              </li>
            </ul>
          </article>
          <ClinicVideoTile />
        </div>
      </section>

      {/* 5. Body map */}
      <section
        className="section wrap"
        id="concern"
        data-spine="Where it hurts"
      >
        <div className="section-head">
          <p className="kicker">Find care by concern</p>
          <h2 className="h2">
            Where does it <em>hurt?</em>
          </h2>
          <p className="lede">
            Tap the body or choose an area. You will see what the doctor looks
            after there and where to go next.
          </p>
        </div>
        <BodyMap />
        <ul className="also-row">
          <li>
            <Link href="/childrens-rehabilitation/">
              Children&rsquo;s rehab
            </Link>
          </li>
          <li>
            <Link href="/older-adults/">Older adults</Link>
          </li>
          <li>
            <Link href="/joints-and-sports/after-fracture-or-surgery/">
              After a fracture or surgery
            </Link>
          </li>
          <li>
            <Link href="/joints-and-sports/prosthetic-rehab/">
              Amputation and prosthesis
            </Link>
          </li>
        </ul>
      </section>

      {/* 6. Care track */}
      <section className="section wrap" id="care" data-spine="How we can help">
        <div className="section-head">
          <p className="kicker">How we can help</p>
          <h2 className="h2">
            Care for pain, nerves and <em>movement.</em>
          </h2>
          <p className="lede">
            Each card opens a full page on the condition, what happens at your
            visit and what to expect.
          </p>
        </div>
        <div
          className="care-track"
          role="region"
          aria-label="Care pages"
          tabIndex={0}
        >
          {careCards.map(([group, title, line, href, badge]) => (
            <article className="track-card" key={title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="track-badge"
                src={`/images/icons/services/${badge}@256.webp`}
                alt=""
                width={72}
                height={72}
                loading="lazy"
              />
              <p className="kicker">{group}</p>
              <h3 className="h3">{title}</h3>
              <p className="muted">{line}</p>
              <Link className="stretched-link" href={href} aria-label={title} />
            </article>
          ))}
        </div>
        <Link href="/care/" className="text-link">
          See all care
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </section>

      {/* 7. Recovery spine */}
      <section
        className="section wrap on-night recovery"
        id="recovery"
        data-spine="Your recovery"
      >
        <div className="section-head">
          <p className="kicker">Your recovery</p>
          <h2 className="h2">
            Six steps, one <em>spine.</em>
          </h2>
        </div>
        <div className="recovery-grid">
          <div className="spine-visual" aria-hidden="true">
            {recoverySteps.map(([n]) => (
              <span key={n} className="vertebra" />
            ))}
          </div>
          <ol className="recovery-steps">
            {recoverySteps.map(([n, title, text, tags]) => (
              <li key={n} className="recovery-step">
                <p className="step-n mono">{n}</p>
                <h3 className="h3">{title}</h3>
                <p>{text}</p>
                <ul className="tag-list">
                  {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Ways to see us (stacking cards) */}
      <section className="section wrap" id="ways" data-spine="Ways to see us">
        <div className="section-head">
          <p className="kicker">Ways to see us</p>
          <h2 className="h2">
            In clinic, by video or at <em>home.</em>
          </h2>
        </div>
        <div className="stack-list">
          <article
            className="stack-card"
            style={{ top: "calc(var(--nav-h, 90px) + 0px)" }}
          >
            <p className="kicker">01 · Clinic visit</p>
            <h3 className="h3">See the doctor in person.</h3>
            <p>
              A full examination of how you move, with procedures done on site
              when needed.
            </p>
            <ul className="content-list">
              <li>Bring scans, reports and medicines</li>
              <li>Wear loose clothes</li>
              <li>By appointment</li>
            </ul>
            <Button href="/contact/#book">Book a clinic visit</Button>
          </article>
          <article
            className="stack-card"
            style={{ top: "calc(var(--nav-h, 90px) + 16px)" }}
          >
            <p className="kicker">02 · Video consult</p>
            <h3 className="h3">Start from home.</h3>
            <p>
              Share your reports, show the doctor how you move on camera and
              leave with a first plan.
            </p>
            <ul className="content-list">
              <li>Good for first advice and follow-ups</li>
              <li>Reports shared before the call</li>
              <li>The doctor says if you need to come in</li>
            </ul>
            <Button href="/video-consultation/">Book a video consult</Button>
          </article>
          <article
            className="stack-card"
            style={{ top: "calc(var(--nav-h, 90px) + 32px)" }}
          >
            <p className="kicker">03 · Home programme</p>
            <h3 className="h3">Keep going between visits.</h3>
            <p>
              Every plan comes with exercises for home, checked and changed at
              each review.
            </p>
            <ul className="content-list">
              <li>Clear steps, sets and repetitions</li>
              <li>Updated as you improve</li>
              <li>Questions on WhatsApp</li>
            </ul>
          </article>
        </div>
        <Confirm>formats offered; home visits?</Confirm>
      </section>

      {/* 9. Meet your doctor */}
      <section className="section wrap" id="meet" data-spine="Meet your doctor">
        <div className="meet-grid">
          <div>
            <p className="kicker">Meet your doctor</p>
            <h2 className="h2">
              Dr. Dharshan <em>N A</em>
            </h2>
            <p className="lede">
              Consultant in Physical Medicine and Rehabilitation
            </p>
            <p>
              He looks after people recovering from stroke, brain and spinal
              cord injury, and people living with back, neck and joint pain. His
              work covers children, adults and older adults, with image-guided
              pain procedures when they are suitable.
            </p>
            <div className="principles">
              <article>
                <h3 className="h4">Goals first</h3>
                <p>Every plan starts from what you want to be able to do.</p>
              </article>
              <article>
                <h3 className="h4">Explained plainly</h3>
                <p>Scans, options and next steps in simple words.</p>
              </article>
              <article>
                <h3 className="h4">One team</h3>
                <p>
                  Works with physiotherapists and other therapists on one plan.
                </p>
              </article>
            </div>
            <ul className="timeline">
              <li>
                <span className="mono">2013 to 2019</span> MBBS, Annapoorana
                Medical College, Salem
              </li>
              <li>
                <span className="mono">2020 to 2023</span> MD, Physical Medicine
                and Rehabilitation, RIMS Imphal
              </li>
              <li>
                <span className="mono">Fellowship</span> Interventional Pain
                Management, Delhi Pain Management Centre
              </li>
            </ul>
            <div className="button-row">
              <Button href="/contact/?doctor=dr-dharshan#book">
                Book with Dr. Dharshan
              </Button>
              <Button kind="ghost" href={doctor.slug}>
                Full profile
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Button>
            </div>
          </div>
          <figure className="meet-photo">
            <DoctorPortrait
              id="dr-dharshan-portrait"
              alt="Portrait of Dr. Dharshan N A"
              sizes="(max-width: 767px) 80vw, 380px"
            />
            <figcaption>
              Dr. Dharshan N A · <Confirm>KMC Reg. No.</Confirm>
              <span className="mono"> Lead physiatrist</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 10. Visit band */}
      <section className="visit-band on-night" data-spine="Plan your visit">
        <div className="wrap visit-inner">
          <div>
            <p className="kicker">Plan your visit</p>
            <h2 className="h3">See the doctor in Bengaluru.</h2>
            <p>
              <Confirm>address, landmark and hours</Confirm>
            </p>
            <ul className="chip-row">
              <li>By appointment</li>
              <li>
                Lift access <Confirm>CONFIRM</Confirm>
              </li>
              <li>
                Parking <Confirm>CONFIRM</Confirm>
              </li>
            </ul>
          </div>
          <Button kind="ghost" href="/plan-your-visit/">
            <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
            Get directions
          </Button>
        </div>
      </section>

      {/* 11. Conditions A to Z */}
      <section
        className="section wrap"
        id="conditions"
        data-spine="Conditions A to Z"
      >
        <div className="section-head">
          <p className="kicker">Conditions A to Z</p>
          <h2 className="h2">
            Look up a <em>condition.</em>
          </h2>
          <p className="lede">
            Type a word. The list filters as you type, and each name opens its
            own page.
          </p>
        </div>
        <ConditionsAZ />
      </section>

      {/* 12. Quick answers */}
      <section className="section wrap" id="answers" data-spine="Quick answers">
        <div className="section-head">
          <p className="kicker">Quick answers</p>
          <h2 className="h2">
            Before you <em>book.</em>
          </h2>
        </div>
        <div className="answers-grid">
          <div className="faq-list">
            {quickAnswers.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>{question}</summary>
                <div className="answer">{answer}</div>
              </details>
            ))}
          </div>
          <aside className="help-card">
            <h3 className="h3">Still not sure?</h3>
            <p>
              Send a message and the team will help you choose the right
              appointment.
            </p>
            <Button kind="wa" href={siteConfig.whatsapp}>
              WhatsApp {siteConfig.phone}
            </Button>
          </aside>
        </div>
      </section>

      {/* 13. Notices */}
      <section className="section wrap notices" aria-label="Notices">
        <EmergencyStrip />
        <ReviewerBox meta={page.meta} />
        <p className="tip">
          <strong>Tip:</strong> Wear loose clothes to your visit so the doctor
          can check how your back, hips and knees move.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
