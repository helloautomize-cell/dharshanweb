import type { ReactNode } from "react";

export function DirectoryNightPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`care-body-map doctors-chooser on-night ${className}`}
      data-dark
    >
      {children}
    </div>
  );
}
