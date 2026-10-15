"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { doctorChoices, type DoctorChoiceProfile } from "@/lib/doctors";
import { Icon } from "@/lib/icons";
import { DirectoryNightPanel } from "@/components/directory-panel";

export function DoctorChooser({
  doctors,
  description,
}: {
  doctors: DoctorChoiceProfile[];
  description: string;
}) {
  const [selected, setSelected] = useState(0);
  const choice = doctorChoices[selected];
  return (
    <DirectoryNightPanel>
      <div className="doctors-chooser-intro">
        <p className="care-kicker">Not sure who to see?</p>
        <h2 id="who-heading">
          Start with what you need <span className="serif">help</span> with.
        </h2>
        <p>{description}</p>
        <div
          className="care-region-pills"
          role="group"
          aria-label="What you need help with"
        >
          {doctorChoices.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={selected === index}
              aria-controls="doctor-choice-results"
              onClick={() => setSelected(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="doctors-chooser-results">
        <div id="doctor-choice-results" aria-live="polite" aria-atomic="true">
          <p className="care-kicker">
            {choice.doctors.length === 2
              ? "Both doctors see this"
              : "Usually seen by"}
          </p>
          <ul>
            {choice.doctors.map((match) => {
              const doctor = doctors.find((item) => item.id === match.id)!;
              return (
                <li key={doctor.id}>
                  <Link href={doctor.href}>
                    <Image src={doctor.avatar} width={56} height={56} alt="" />
                    <span>
                      <strong>{doctor.name}</strong>
                      <small>{match.reason}</small>
                    </span>
                    <Icon name="arrow" size={20} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="doctors-chooser-note">
          Still unsure? Choose No preference when you{" "}
          <Link href="/contact/#book">book</Link> and the team will match you.
        </p>
      </div>
    </DirectoryNightPanel>
  );
}
