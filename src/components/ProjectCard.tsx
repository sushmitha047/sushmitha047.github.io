import { useId, useState } from "react";
import type { Project } from "../content";
import { Chevron, ExternalIcon } from "./ui";

/**
 * Collapsed, a card answers "what is it, and did it work" in about five seconds:
 * title, one line, and the measured result. Expanded, it gives the full
 * problem / approach / build. No second page, no clicking away.
 */
export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="rounded-xl border border-line bg-card transition-colors hover:border-accent-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full cursor-pointer px-4 pt-4 pb-3 text-left"
      >
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h3 className="text-[0.95rem] font-semibold">{p.title}</h3>
          <span className="shrink-0 font-mono text-[0.7rem] text-muted">
            {p.period}
          </span>
        </div>

        <p className="mt-1 text-[0.825rem] text-muted">{p.tagline}</p>

        <p className="result mt-3 px-3 py-2 text-[0.8rem] font-medium">
          {p.highlight}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1">
          {p.tech.slice(0, 5).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {p.tech.length > 5 && (
            <li className="chip">+{p.tech.length - 5} more</li>
          )}
        </ul>

        <span className="mt-3 inline-flex items-center gap-1 text-[0.775rem] font-medium text-accent">
          {open ? "Hide details" : "How it works"}
          <Chevron open={open} />
        </span>
      </button>

      {open && (
        <div id={panelId} className="border-t border-line px-4 py-4">
          {p.context && (
            <p className="mb-3 text-[0.8rem] italic text-muted">{p.context}</p>
          )}
          <dl className="space-y-3">
            {(
              [
                ["Problem", p.problem],
                ["Approach", p.approach],
                ["What I built", p.result],
              ] as const
            ).map(([label, text]) => (
              <div key={label}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
                  {label}
                </dt>
                <dd className="mt-0.5 text-[0.825rem]">{text}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-4 flex flex-wrap gap-1">
            {p.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        <a
          className="ghost-btn"
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`Source code for ${p.title}`}
        >
          Code <ExternalIcon />
        </a>
        {p.video && (
          <a
            className="ghost-btn"
            href={p.video.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Video walkthrough of ${p.title}`}
          >
            Walkthrough <ExternalIcon />
          </a>
        )}
      </div>
    </li>
  );
}
