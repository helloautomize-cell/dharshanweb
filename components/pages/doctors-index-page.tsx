import Image from "next/image";
import Link from "next/link";
import { DoctorChooser } from "@/components/doctor-chooser";
import {
  DirectoryBookingClose,
  DirectoryBreadcrumb,
  DirectoryFacts,
  DirectoryFactsList,
  DirectoryComparison,
  DirectoryFaq,
  DirectoryPrinciples,
  DirectorySectionHeader,
  H1,
} from "@/components/pages/shared";
import { getDoctorPages, section, type PageContent } from "@/lib/content";
import { extractFaqs } from "@/lib/faqs";
import { Icon } from "@/lib/icons";
import { breadcrumb, doctorsItemList, faqPage, graph } from "@/lib/schema";
import { altFor } from "@/lib/alt-text";
import "./care.css";
import "./doctors.css";

const confirmed = (value?: string) =>
  !!value?.trim() && !value.includes("[CONFIRM");

export function DoctorsIndexPage({ page }: { page: PageContent }) {
  const doctors = getDoctorPages();
  const text = (heading: string) => section(page, heading)?.body ?? "";
  const languages = new Set(
    doctors.flatMap(({ meta }) =>
      (meta.doctor?.languages ?? [])
        .filter(confirmed)
        .map((language) => language.trim().toLowerCase()),
    ),
  );
  const faqs = extractFaqs(text("FAQs"));
  const data = graph(page.meta, [
    breadcrumb([
      { label: "Home", href: "/" },
      { label: "Doctors", href: "/doctors/" },
    ]),
    doctorsItemList(doctors.map(({ meta }) => meta)),
    faqPage(faqs),
  ]);
  return (
    <div className="care-page doctors-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <section
        className="care-hero care-container"
        aria-labelledby="doctors-heading"
      >
        <DirectoryBreadcrumb label="Doctors" />
        <div className="care-hero-columns doctors-hero-columns">
          <div>
            <p className="care-kicker">Our doctors</p>
            <div id="doctors-heading">
              <H1 className="care-title" text={page.meta.h1} />
            </div>
          </div>
          <div className="doctors-hero-intro">
            <p>{text("Intro")}</p>
            <div className="doctors-actions">
              <Link className="btn btn-primary" href="/contact/#book">
                Book a consultation
              </Link>
              <Link className="btn care-guide" href="#who">
                Help me choose <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </div>
        <DirectoryFacts
          facts={[
            { value: doctors.length, label: "physiatrists (PM&R)" },
            { value: languages.size, label: "languages spoken" },
            { value: 2, label: "ways to be seen: clinic or video" },
            { value: 0, label: "referrals needed to book" },
          ]}
        />
      </section>

      <section
        id="doctors"
        className="doctors-profiles care-container"
        aria-label="Doctor profiles"
      >
        {doctors.map(({ meta }, index) => {
          const profile = meta.doctor!;
          const name = meta.h1!.replaceAll("*", "");
          const slug = meta.url.split("/")[1];
          const nameParts = meta.h1!.split(/\*([^*]+)\*/);
          const facts = [
            ...profile.facts.filter((fact) => fact.label !== "Sees"),
            ...(profile.languages?.filter(confirmed).length
              ? [
                  {
                    label: "Languages",
                    value: profile.languages.filter(confirmed).join(", "),
                  },
                ]
              : []),
            ...profile.facts.filter((fact) => fact.label === "Sees"),
          ].filter((fact) => confirmed(fact.value));
          return (
            <article
              className="doctors-profile"
              key={meta.url}
              aria-labelledby={`${slug}-name`}
            >
              <Link
                href={meta.url}
                className="doctors-portrait"
                aria-label={`${profile.tag}: full profile of ${name}`}
              >
                <Image
                  src={`/images/doctors/${profile.portrait}.jpg`}
                  alt={altFor(`doctors/${profile.portrait}.jpg`)}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 759px) calc(100vw - 116px), (max-width: 1330px) 44vw, 572px"
                  preload={index === 0}
                />
                <span className="doctors-portrait-tag">{profile.tag}</span>
              </Link>
              <div className="doctors-profile-body">
                <p className="care-kicker">Consultant physiatrist</p>
                <h2 id={`${slug}-name`}>
                  {nameParts.map((part, i) =>
                    i % 2 ? (
                      <span className="serif" key={i}>
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </h2>
                {confirmed(meta.credentials) && (
                  <p className="doctors-credentials">{meta.credentials}</p>
                )}
                <DirectoryFactsList facts={facts}>
                  {profile.focus.some((focus) => confirmed(focus.label)) && (
                    <div>
                      <dt>Focus</dt>
                      <dd className="doctors-focus-pills">
                        {profile.focus
                          .filter((focus) => confirmed(focus.label))
                          .map((focus) => (
                            <Link key={focus.href} href={focus.href}>
                              {focus.label}
                            </Link>
                          ))}
                      </dd>
                    </div>
                  )}
                </DirectoryFactsList>
                <div className="doctors-actions doctors-profile-actions">
                  <Link
                    className="btn btn-primary"
                    href={`/contact/?doctor=${slug}#book`}
                  >
                    {profile.bookLabel}
                  </Link>
                  <Link className="btn care-guide" href={meta.url}>
                    Full profile <Icon name="arrow" size={18} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section
        id="who"
        className="care-container"
        aria-labelledby="who-heading"
      >
        <DoctorChooser
          description={text("Who to see")}
          doctors={doctors.map(({ meta }) => ({
            id: meta.url.split("/")[1],
            name: meta.h1!.replaceAll("*", ""),
            href: meta.url,
            avatar: `/images/doctors/${meta.avatar}-160.jpg`,
          }))}
        />
      </section>

      <section
        id="how"
        className="care-container care-section"
        aria-labelledby="doctors-how-heading"
      >
        <DirectorySectionHeader
          id="doctors-how-heading"
          kicker="How our doctors work"
          heading={
            <>
              Your goals first, <span className="serif">explained</span>{" "}
              plainly.
            </>
          }
          description={text("How our doctors work")}
        />
        <DirectoryPrinciples
          items={["Goals first", "Explained plainly", "One team"].map(
            (title) => ({ title, text: text(title) }),
          )}
        />
        <DirectoryComparison
          items={[
            {
              label: "Your physiatrist",
              heading: (
                <>
                  A doctor who <span className="serif">leads</span> the plan
                </>
              ),
            },
            {
              label: "Your physiotherapist",
              heading: <>A therapist who delivers it</>,
            },
          ].map((role) => ({
            ...role,
            points: text(role.label).split("\n").filter(Boolean),
          }))}
        />
      </section>

      <DirectoryFaq
        heading={
          <>
            Before you <span className="serif">book.</span>
          </>
        }
        description="Short answers to what people ask most about choosing a doctor."
        faqs={faqs}
        lastReviewed={page.meta.lastReviewed}
      />

      <DirectoryBookingClose
        heading={
          <>
            Choose a doctor, or let us <span className="serif">match</span> you.
          </>
        }
        description={text("Booking")}
        firstStep="Online, on WhatsApp or by phone, with your doctor choice."
      />
    </div>
  );
}
