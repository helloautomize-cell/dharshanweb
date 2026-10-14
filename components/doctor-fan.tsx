import { DoctorPortrait, Button, SectionHeading, Confirm } from "./primitives";
import { siteConfig } from "@/lib/site-config";

export function DoctorFan() {
  return (
    <section
      className="stage hero-demo on-night"
      id="styleguide"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="hero-pill">Physical medicine and rehabilitation</p>
        <h1 className="display" id="hero-title">
          Rehab that moves <span className="serif">with you.</span>
        </h1>
        <p className="lede">A rehab doctor, in clinic or by video.</p>
        <div className="button-row">
          <Button kind="glow" />
          <Button kind="ghost" href="#body-map">
            Where does it hurt?
          </Button>
        </div>
      </div>
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
    </section>
  );
}
export function DoctorCards() {
  return (
    <section className="section wrap" id="doctors">
      <SectionHeading>
        Meet your <span className="serif">doctors</span>
      </SectionHeading>
      <div className="doctor-cards">
        {siteConfig.doctors.map((doctor) => (
          <article key={doctor.id} className="doctor-card">
            <DoctorPortrait id={`${doctor.id}-hero`} alt={doctor.name} />
            <div>
              <h3 className="h3">{doctor.name}</h3>
              <p className="doctor-role">{doctor.role}</p>
              <p>
                {doctor.id === "dr-selina" ? (
                  <Confirm>{doctor.qualifications}</Confirm>
                ) : (
                  "MBBS, MD (PMR)"
                )}
              </p>
              <p className="muted">{doctor.focus}</p>
            </div>
            <Button href={`/contact/?doctor=${doctor.id}#book`}>
              {doctor.id === "dr-dharshan"
                ? "Book with Dr. Dharshan"
                : "Book with Dr. Selina"}
            </Button>
            <Button href={doctor.slug} kind="ghost">
              View profile
            </Button>
          </article>
        ))}
      </div>
      <details className="placeholder-disclosure">
        <summary>Photo to be added</summary>
        <DoctorPortrait id="future-doctor" alt="" approved={false} />
      </details>
    </section>
  );
}
