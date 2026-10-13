import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { DoctorPortrait } from "@/components/primitives";
import { BlockRenderer, metaLine } from "@/lib/markdown";
import { extractFaqs } from "@/lib/faqs";
import { section, type PageContent } from "@/lib/content";
import {
  BadgeMark,
  CtaBand,
  EmergencyStrip,
  H1,
  RelatedLinks,
  ReviewerBox,
  SectionBlocks,
  crumbs,
} from "@/components/pages/shared";
import {
  breadcrumb,
  blogPosting,
  faqPage,
  graph,
  medicalWebPage,
  physician,
} from "@/lib/schema";
import { conditions } from "@/lib/conditions";
import { MapFacade } from "@/components/map-facade";
import { megaGroups } from "@/lib/nav";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
function PageHead({ page, kicker }: { page: PageContent; kicker: string }) {
  return (
    <header className="page-head">
      <Breadcrumbs items={crumbs(page.meta)} />
      <BadgeMark badge={page.meta.badge} />
      <p className="kicker">{kicker}</p>
      <H1 text={page.meta.h1 ?? page.meta.title.replace(/\s*\|.*$/, "")} />
    </header>
  );
}
const faqOf = (page: PageContent) =>
  page.sections.find((s) => /^faqs?/i.test(s.heading));

export function ContentPage({
  page,
  kicker = "Rehabify",
}: {
  page: PageContent;
  kicker?: string;
}) {
  const meta = page.meta;
  const intro = section(page, "Intro") ?? section(page, "Intro (answer-first)");
  const faqs = faqOf(page);
  const isMedical = Array.isArray(meta.schema)
    ? meta.schema.includes("MedicalWebPage")
    : !!meta.badge;
  const graphData = graph(
    meta,
    [
      isMedical ? medicalWebPage(meta) : null,
      faqs ? faqPage(extractFaqs(faqs.body)) : null,
      breadcrumb([
        { label: "Home", href: "/" },
        ...crumbs(meta).map((c) => ({
          label: c.label,
          href: c.href ?? meta.url,
        })),
      ]),
    ].filter(Boolean),
  );
  return (
    <div className="page-main">
      <JsonLd data={graphData} />
      <PageHead page={page} kicker={kicker} />
      {intro && (
        <div className="page-intro">
          <BlockRenderer body={intro.body} />
        </div>
      )}
      <SectionBlocks page={page} exclude={/^intro/i} />
      {meta.url === "/plan-your-visit/" && <MapFacade />}
      <RelatedLinks links={meta.related} />
      {isMedical && <ReviewerBox meta={meta} />}
      <EmergencyStrip />
      <CtaBand />
    </div>
  );
}
export function DoctorPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const id = meta.url.includes("selina") ? "dr-selina-kh" : "dr-dharshan-n-a";
  const assetId = meta.url.includes("selina") ? "dr-selina" : "dr-dharshan";
  const doc = physician(id);
  const hero =
    section(page, "Hero (split)") ??
    section(page, "Hero (split, same layout as Dr. Dharshan)");
  const kicker = hero
    ? (metaLine(hero.body, "Kicker") ?? "Consultant physiatrist")
    : "Consultant physiatrist";
  return (
    <div className="page-main">
      <JsonLd
        data={graph(meta, [
          doc,
          breadcrumb([
            { label: "Home", href: "/" },
            { label: "Doctors", href: "/doctors/" },
            ...crumbs(meta)
              .slice(-1)
              .map((c) => ({ label: c.label, href: meta.url })),
          ]),
        ])}
      />
      <header className="page-head doctor-head">
        <div>
          <Breadcrumbs
            items={[
              { href: "/doctors/", label: "Doctors" },
              { label: (meta.h1 ?? meta.title).replace(/\*/g, "") },
            ]}
          />
          <p className="kicker">{kicker}</p>
          <H1 text={meta.h1 ?? meta.title.replace(/\s*\|.*$/, "")} />
          <p className="lede">
            Consultant in Physical Medicine and Rehabilitation
          </p>
        </div>
        <div className="doctor-portrait">
          <DoctorPortrait
            id={`${assetId}-hero`}
            alt={`Portrait of ${meta.url.includes("selina") ? "Dr. Selina Kh" : "Dr. Dharshan N A"}`}
            priority
            sizes="(max-width: 767px) 70vw, 320px"
          />
        </div>
      </header>
      <SectionBlocks page={page} exclude={/^hero/i} />
      <EmergencyStrip />
      <CtaBand title="Book with your physiatrist." />
    </div>
  );
}
export function PostPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const faqs = faqOf(page);
  return (
    <div className="page-main">
      <JsonLd
        data={graph(meta, [
          blogPosting(meta),
          faqs ? faqPage(extractFaqs(faqs.body)) : null,
          breadcrumb([
            { label: "Home", href: "/" },
            { label: "Health library", href: "/health-library/" },
            {
              label: (meta.h1 ?? meta.title).replace(/\*/g, ""),
              href: meta.url,
            },
          ]),
        ])}
      />
      <PageHead
        page={page}
        kicker={`Health library${meta.readingTime ? ` · ${meta.readingTime} read` : ""}`}
      />
      <SectionBlocks page={page} />
      <RelatedLinks links={meta.related ?? meta.links} />
      <ReviewerBox
        meta={{ ...meta, reviewer: meta.reviewedBy ?? meta.reviewer }}
      />
      <EmergencyStrip />
      <CtaBand />
    </div>
  );
}
export function ConditionsPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const letters = [
    ...new Set(conditions.map((c) => c.name[0].toUpperCase())),
  ].sort();
  return (
    <div className="page-main">
      <JsonLd data={graph(meta)} />
      <PageHead page={page} kicker="Conditions" />
      <nav className="az-jump" aria-label="Jump to letter">
        {letters.map((l) => (
          <Link key={l} href={`#az-${l}`}>
            {l}
          </Link>
        ))}
      </nav>
      <div className="az-list">
        {letters.map((letter) => (
          <section key={letter} id={`az-${letter}`} className="az-group">
            <h2 className="az-letter">{letter}</h2>
            <ul>
              {conditions
                .filter((c) => c.name[0].toUpperCase() === letter)
                .map((c) => (
                  <li key={c.name}>
                    <Link href={c.href}>{c.name}</Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <SectionBlocks page={page} exclude={/^(intro|conditions)/i} />
      <EmergencyStrip />
      <CtaBand />
    </div>
  );
}
export function CareIndexPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  return (
    <div className="page-main">
      <JsonLd data={graph(meta)} />
      <PageHead page={page} kicker="All care" />
      <div className="care-grid">
        {megaGroups.map((group) => (
          <section key={group.href} className="content-section">
            <h2 className="h3">
              <Link href={group.href}>{group.title}</Link>
            </h2>
            <ul className="content-list">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="content-section">
          <h2 className="h3">
            <Link href="/video-consultation/">Video consultation</Link>
          </h2>
          <p>Start from home with a video consult.</p>
        </section>
      </div>
      <EmergencyStrip />
      <CtaBand />
    </div>
  );
}
