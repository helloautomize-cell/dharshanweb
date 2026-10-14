import type { ReactNode } from "react";

/* Care-index line icons: one set, one service each. 24x24 grid, 1.5px
   stroke, round caps and joins, no fills, single colour via currentColor.
   Same conventions as components/medical-icons.tsx. */
const paths: Record<string, ReactNode> = {
  // Spine curve with three vertebrae.
  back: (
    <>
      <path d="M12 3c-2.2 2.8 2.2 4.6 0 7.4-2.2 2.9 2.2 4.7 0 7.6-1.4 1.8.6 3 .2 4" />
      <path d="M9.2 5.5h5.6M9.2 12h5.6M9.2 18.6h5.6" />
    </>
  ),
  // Head on a neck opening into shoulders.
  neck: (
    <>
      <circle cx="12" cy="5.6" r="3" />
      <path d="M9.4 8.2v4.4M14.6 8.2v4.4" />
      <path d="M4.5 20.5c2-4.8 4.6-6 7.5-6s5.5 1.2 7.5 6" />
    </>
  ),
  // Nerve line running down the leg with two branches.
  sciatica: (
    <>
      <path d="M10 3.5c2.5 3.2 4.6 4.8 5.4 7.6.8 3-1 6-2.2 9-.6 1.4-1.2 2.5-2.2 3.4" />
      <path d="M13.6 9.4l3.4-1.8M15 14.4l3.6.4" />
      <circle cx="10" cy="3.5" r="1.5" />
    </>
  ),
  // Syringe at an angle.
  injection: (
    <g transform="rotate(45 12 12)">
      <rect x="9.2" y="6" width="5.6" height="9.5" rx="1.6" />
      <path d="M12 15.5v4.5" />
      <path d="M12 6V2.5M9.6 3.5h4.8" />
      <path d="M10.8 9.5h2.4M10.8 12h2.4" />
    </g>
  ),
  // Brain lobes with a small bolt.
  stroke: (
    <>
      <path d="M12 4.2a3 3 0 0 0-3 3 3 3 0 0 0-2 3.9 3 3 0 0 0 1.9 4A3 3 0 0 0 12 19h.4" />
      <path d="M12 4.2a3 3 0 0 1 3 3 3 3 0 0 1 2 3.9 3 3 0 0 1-1.9 4A3 3 0 0 1 12 19" />
      <path d="M12.9 7.6 10.8 11h2.1l-1.4 4" />
    </>
  ),
  // Spine with a break mark.
  "spinal-cord": (
    <>
      <path d="M12 3c-2.2 2.6 2 4.4.2 7" />
      <path d="M11.8 14c-2.4 2.8 1.8 4.6-.2 7" />
      <path d="M9.4 5.4h4.4M9.4 19h4.4" />
      <path d="M9.8 10.2l4.6 1.6-4.6 1.6 4.6 1.6" />
    </>
  ),
  // Head profile with a small mark above the temple.
  "head-injury": (
    <>
      <path d="M8.5 20.5v-2.4a6.8 6.8 0 0 1-3.6-6A6.8 6.8 0 0 1 18 9.3c1 2 .7 4.5-.7 6.1" />
      <path d="M17.4 2.6v3.6M15.6 4.4h3.6" />
    </>
  ),
  // Hand with three small tremor lines.
  parkinsons: (
    <>
      <path d="M8.5 20.5v-8a3.7 3.7 0 0 1 7.4 0v8" />
      <path d="M10.8 8.8v3.4M13.6 8.8v3.4" />
      <path d="M4.6 9.4c.9-.8.9-2 0-2.8M4.6 15c.9-.8.9-2 0-2.8M19.9 12c-.9-.8-.9-2 0-2.8" />
    </>
  ),
  // Bent arm with tension lines at the joint.
  spasticity: (
    <>
      <path d="M4.5 18.5 10.5 12l4 3.5L19 9" />
      <path d="M14.5 7.2 15.8 9M17.5 5.8l2.4-.8M18.7 12.5l2.4.6" />
    </>
  ),
  // Two bone ends meeting at the joint.
  knee: (
    <>
      <path d="M9 2.5v7.5a3 3 0 0 0 6 0V2.5" />
      <path d="M9 21.5v-5.5a3 3 0 0 1 6 0v5.5" />
    </>
  ),
  // Ball in a socket with the arm continuing down.
  shoulder: (
    <>
      <circle cx="9.6" cy="10" r="3.4" />
      <path d="M9.6 13.4V21" />
      <path d="M14.4 4.6a6.6 6.6 0 0 1 5.9 7.3" />
    </>
  ),
  // Running figure.
  sports: (
    <>
      <circle cx="15.4" cy="4.4" r="1.8" />
      <path d="M13.6 7 10.2 10.6l3.6 3-1.4 6.6" />
      <path d="M10.2 10.6 6.4 9.4l-2.6 2" />
      <path d="M13.6 7l3.8 1.4 2.6-1.4" />
      <path d="M13.8 13.6 17 16.2l-.6 5" />
    </>
  ),
  // Bone with a small healed band.
  fracture: (
    <>
      <path d="M16.8 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5Z" />
      <path d="M9.2 11.8l3 3M11.8 9.2l3 3" />
    </>
  ),
  // Droplet with a plus.
  prp: (
    <>
      <path d="M12 3.4s5.6 6.3 5.6 10a5.6 5.6 0 0 1-11.2 0c0-3.7 5.6-10 5.6-10Z" />
      <path d="M12 11.4v4.4M9.8 13.6h4.4" />
    </>
  ),
  // Limb in a socket with a pylon and foot below.
  prosthetic: (
    <>
      <path d="M8.8 3.5v5.4a4.4 4.4 0 0 0 8.8 0V3.5" />
      <path d="M8.8 6.8h8.8" />
      <path d="M13.2 13.3V19" />
      <path d="M13.2 19l4.8.6v1.9" />
    </>
  ),
  // Child figure reaching a support line.
  "cerebral-palsy": (
    <>
      <circle cx="9" cy="4.4" r="2" />
      <path d="M9 6.6v5.8" />
      <path d="M9 8.2l-3.4 1.6M9 8.2l5.4 1" />
      <path d="M9 12.4 6.4 20.5M9 12.4l2.6 8.1" />
      <path d="M15.6 8.4V20.5" />
    </>
  ),
  // Muscle fibre lines.
  "muscular-dystrophy": (
    <>
      <path d="M4 6.5c4.2-1.8 11.8-1.8 16 0" />
      <path d="M4 12c4.2-1.4 11.8-1.4 16 0" />
      <path d="M4 17.5c4.2-1 11.8-1 16 0" />
      <path d="M9.8 9.6l.7 1.8M14.4 14.6l.7 1.8" />
    </>
  ),
  // Stacked blocks.
  development: (
    <>
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="8.5" y="4.5" width="7" height="7" rx="1.6" />
    </>
  ),
  // Figure on a balance line.
  balance: (
    <>
      <circle cx="12" cy="4.2" r="1.9" />
      <path d="M12 6.4v5.8" />
      <path d="M6 9.2h12" />
      <path d="M12 12.2 9.2 19.2M12 12.2l2.8 7" />
      <path d="M4 21h16" />
    </>
  ),
  // Bone with small pores.
  osteoporosis: (
    <>
      <path d="M16.8 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5Z" />
      <circle cx="10.2" cy="12.2" r="0.9" />
      <circle cx="13.4" cy="9.4" r="0.9" />
    </>
  ),
  // Video camera.
  video: (
    <>
      <rect x="2.8" y="6.8" width="12.6" height="10.4" rx="2.4" />
      <path d="M15.4 10.6 21.2 7.6v8.8l-5.8-3" />
    </>
  ),
};

export type CareIconName = keyof typeof paths;

export function CareIcon({
  name,
  size = 24,
  label,
  className,
}: {
  name: CareIconName;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
    >
      {paths[name]}
    </svg>
  );
}

export const careIconNames = Object.keys(paths) as CareIconName[];
