import type { ReactNode } from "react";

// Code-drawn medical glyphs, 24x24, stroke only, no fills.
// Each one is a short recognizable subject in the same line style as Lucide.
const paths: Record<string, ReactNode> = {
  stethoscope: (
    <>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M5 3h2.4M10.6 3H13" />
      <path d="M9 17v1.5a5 5 0 0 0 10 0V15" />
      <circle cx="19" cy="12" r="2.4" />
    </>
  ),
  ultrasound: (
    <>
      <path d="M9 3h6l1.2 4.5H7.8Z" />
      <path d="M7.8 7.5 6.6 14a4.4 4.4 0 0 0 8.8.4L14.2 7.5" />
      <path d="M3.5 18.5a8 8 0 0 0 4.5 3M16 21.5a8 8 0 0 0 4.5-3" />
    </>
  ),
  goniometer: (
    <>
      <path d="M4 20a8 8 0 0 1 16 0" />
      <path d="M12 20 6.8 8.5" />
      <path d="M5.2 13.5l1.6 1M12 9.6v2M18.8 13.5l-1.6 1" />
      <circle cx="12" cy="20" r="1.6" />
    </>
  ),
  spine: (
    <>
      <path d="M12 3c-2.2 2.8 2.2 4.6 0 7.4c-2.2 2.9 2.2 4.7 0 7.6c-1.4 1.8.6 3 .2 4" />
      <path d="M9.2 5.5h5.6M9.2 12h5.6M9.2 18.6h5.6" />
    </>
  ),
  brain: (
    <>
      <path d="M12 4a3 3 0 0 0-3 3 3 3 0 0 0-2 4 3 3 0 0 0 2 4 3 3 0 0 0 3 3h1V4Z" />
      <path d="M12 4a3 3 0 0 1 3 3 3 3 0 0 1 2 4 3 3 0 0 1-2 4 3 3 0 0 1-3 3h-1" />
    </>
  ),
  knee: (
    <>
      <path d="M9 2v8a3 3 0 0 0 6 0V2" />
      <path d="M9 22v-6a3 3 0 0 1 6 0v6" />
    </>
  ),
  wheelchair: (
    <>
      <circle cx="9" cy="16" r="5.4" />
      <circle cx="9" cy="16" r="1.3" />
      <circle cx="12.5" cy="3.4" r="1.9" />
      <path d="M9 11V6.6h3.4M13.5 12.5H19l1.8 5.5" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M8 21l1-7-3-3M16 21l-1-7 3-3M9 11h6" />
    </>
  ),
};
export type MedicalIconName = keyof typeof paths;
export function MedicalIcon({
  name,
  size = 24,
  label,
  className,
}: {
  name: MedicalIconName;
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
      strokeWidth="1.75"
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
export const medicalIconNames = Object.keys(paths) as MedicalIconName[];
