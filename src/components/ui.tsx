import type { ReactNode } from "react";

/** Staggered blur-in. `i` is the position in the page order. */
export function Fade({
  children,
  i = 0,
  className = "",
}: {
  children: ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <div className={`fade ${className}`} style={{ animationDelay: `${i * 55}ms` }}>
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  children,
  i = 0,
}: {
  id: string;
  title: string;
  children: ReactNode;
  i?: number;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-8">
      <Fade i={i}>
        <h2 id={`${id}-h`} className="sec-h mb-3 text-xl">
          {title}
        </h2>
      </Fade>
      {children}
    </section>
  );
}

export function Avatar({ src, initials }: { src: string; initials: string }) {
  return (
    <span className="relative inline-flex size-20 shrink-0 sm:size-28 items-center justify-center overflow-hidden rounded-full border border-line bg-chip text-xl font-medium sm:text-2xl text-muted">
      {initials}
      {/* Sits on top of the initials; if the file is missing the initials show through. */}
      <img
        src={src}
        alt="Sushmitha Halli Sudhakara"
        loading="eager"
        width={112}
        height={112}
        className="absolute inset-0 size-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
      />
    </svg>
  );
}
