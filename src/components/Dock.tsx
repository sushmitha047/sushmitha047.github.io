import { useEffect, useState } from "react";

const items = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About", wide: true },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research", wide: true },
  { id: "awards", label: "Awards", wide: true },
  { id: "hackathons", label: "Hackathons", wide: true },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** Floating pill nav, fixed to the bottom on every screen size. */
export default function Dock() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* private browsing */
    }
  }, [dark]);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3"
    >
      <div className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-line bg-bg/85 p-1 shadow-lg backdrop-blur-md">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`shrink-0 rounded-full ${it.wide ? "hidden sm:block" : ""} px-2.5 py-1.5 text-[0.75rem] sm:px-3 sm:text-[0.8rem] text-muted no-underline transition-colors hover:bg-accent-bg hover:text-accent`}
          >
            {it.label}
          </a>
        ))}
        <span aria-hidden="true" className="mx-0.5 h-5 w-px sm:mx-1 shrink-0 bg-line" />
        <button
          type="button"
          onClick={() => setDark(!dark)}
          aria-pressed={dark}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          className="shrink-0 rounded-full p-1.5 text-muted sm:p-2 transition-colors hover:bg-accent-bg hover:text-accent"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            {dark ? (
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
              </g>
            ) : (
              <path fill="currentColor" d="M20.4 14.9A8.5 8.5 0 1 1 9.1 3.6a1 1 0 0 1 1.3 1.3 6.5 6.5 0 0 0 8.7 8.7 1 1 0 0 1 1.3 1.3Z" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
