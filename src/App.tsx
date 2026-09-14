import { useState } from "react";
import {
  about, awards, education, experience, hackathons, interests, moreProjects,
  profile, projects,
  publications, resumes, site, skills, volunteering,
} from "./content";
import Dock from "./components/Dock";
import ProjectCard from "./components/ProjectCard";
import { Avatar, Chevron, ExternalIcon, Fade, Section } from "./components/ui";

/** Work and education entries: compact by default, bullets on click. */
function RoleCard({ title, org, place, period, bullets, detail, links }: {
  title: string; org: string; place?: string; period: string;
  bullets?: string[]; detail?: string;
  links?: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!bullets?.length;

  const head = (
    <>
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h3 className="text-[0.9rem] font-semibold">{org}</h3>
        <span className="shrink-0 font-mono text-[0.7rem] text-muted">{period}</span>
      </div>
      <p className="mt-0.5 text-[0.8rem] text-muted">
        {title}{place ? `, ${place}` : ""}
      </p>
      {detail && <p className="mt-2 text-[0.8rem] text-muted">{detail}</p>}
      {hasDetail && (
        <span className="mt-2 inline-flex items-center gap-1 text-[0.75rem] text-muted">
          {open ? "Hide" : "What I did"}
          <Chevron open={open} />
        </span>
      )}
    </>
  );

  return (
    <li className="rounded-xl border border-line bg-card">
      {hasDetail ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full cursor-pointer px-4 py-3 text-left"
        >
          {head}
        </button>
      ) : (
        <div className="px-4 py-3">{head}</div>
      )}

      {open && hasDetail && (
        <ul className="space-y-2 border-t border-line px-4 py-3">
          {bullets!.map((b, i) => (
            <li key={i} className="text-[0.8rem] text-muted">{b}</li>
          ))}
        </ul>
      )}

      {links?.length ? (
        <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
          {links.map((l) => (
            <a key={l.href} className="ghost-btn" href={l.href}
               target="_blank" rel="noreferrer"
               aria-label={`${l.label} — related to ${org}`}>
              {l.label} <ExternalIcon />
            </a>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to projects
      </a>

      <main className="mx-auto max-w-2xl space-y-12 px-5 pt-14 pb-28 sm:px-6">
        <section id="top">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <Fade><h1 className="text-3xl sm:text-4xl">{profile.greeting}</h1></Fade>
              <Fade i={1}>
                <p className="mt-1.5 text-[0.95rem] text-muted">
                  {site.role} in {site.location}
                </p>
              </Fade>
            </div>
            <Fade i={1}><Avatar src={profile.avatar} initials={profile.initials} /></Fade>
          </div>

          <Fade i={2}>
            <p className="mt-5 text-[0.925rem] text-muted">{profile.blurb}</p>
          </Fade>

          <Fade i={3}>
            <div className="mt-5 flex flex-wrap gap-2">
              <a className="ghost-btn" href={site.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a>
              <a className="ghost-btn" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
              <a className="ghost-btn" href={profile.researchgate} target="_blank" rel="noreferrer">ResearchGate <ExternalIcon /></a>
              <a className="ghost-btn" href={profile.medium} target="_blank" rel="noreferrer">Medium <ExternalIcon /></a>
              <a className="ghost-btn" href={`mailto:${site.email}`}>Email</a>
              <a className="ghost-btn" href={resumes[0].href} download>Resume</a>
            </div>
          </Fade>
        </section>

        <Section id="projects" title="Projects" i={4}>
          <Fade i={4}>
            <p className="mb-4 text-[0.85rem] text-muted">
              Each card opens to show the problem, the approach and what I actually
              built. Code links go straight to the repository.
            </p>
          </Fade>
          <ul className="space-y-3">
            {projects.map((p, i) => (
              <Fade key={p.slug} i={5 + i}><ProjectCard p={p} /></Fade>
            ))}
          </ul>

          <Fade i={9}>
            <h3 className="mt-8 mb-3 text-[0.9rem] font-semibold">Smaller pieces</h3>
          </Fade>
          <ul className="grid gap-3 sm:grid-cols-2">
            {moreProjects.map((m, i) => (
              <Fade key={m.title} i={10 + i} className="h-full">
                <li className="flex h-full flex-col rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent-line">
                  <h4 className="text-[0.875rem] font-semibold">{m.title}</h4>
                  {m.note && <p className="mt-0.5 text-[0.7rem] italic text-muted">{m.note}</p>}
                  <p className="mt-2 text-[0.8rem] text-muted">{m.blurb}</p>
                  <ul className="mt-3 flex flex-wrap gap-1">
                    {m.tech.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <a className="ghost-btn" href={m.repo}
                       target="_blank" rel="noreferrer"
                       aria-label={`Source code for ${m.title}`}>
                      Code <ExternalIcon />
                    </a>
                    {m.video && (
                      <a className="ghost-btn" href={m.video.href}
                         target="_blank" rel="noreferrer"
                         aria-label={`${m.video.label} for ${m.title}`}>
                        {m.video.label} <ExternalIcon />
                      </a>
                    )}
                  </div>
                </li>
              </Fade>
            ))}
          </ul>
        </Section>

        <Section id="about" title="About" i={12}>
          <Fade i={12}>
            <div className="space-y-3 text-[0.875rem] text-muted">
              {about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p className="pt-1">
  <span className="text-fg">Outside work:</span>{" "}
  {interests.map((it, i) => (
    <span key={it.label}>
      {i > 0 && ", "}
      {it.href ? (
        <a className="text-accent hover:underline" href={it.href}
           target="_blank" rel="noreferrer">
          {it.label}
        </a>
      ) : (
        it.label
      )}
    </span>
  ))}
  .
</p>
            </div>
          </Fade>
        </Section>

        <Section id="experience" title="Experience" i={13}>
          <ul className="space-y-3">
            {experience.map((job, i) => (
              <Fade key={job.org + job.period} i={13 + i}><RoleCard {...job} /></Fade>
            ))}
          </ul>
          <Fade i={18}>
            <h3 className="mt-8 mb-3 text-[0.9rem] font-semibold">Education</h3>
          </Fade>
          <ul className="space-y-3">
            {education.map((e, i) => (
              <Fade key={e.degree} i={18 + i}>
                <RoleCard org={e.school} title={`${e.degree} — ${e.detail}`} period={e.period} />
              </Fade>
            ))}
          </ul>

          <Fade i={19}>
            <h3 className="mt-8 mb-3 text-[0.9rem] font-semibold">Volunteering</h3>
          </Fade>
          <ul className="space-y-3">
            {volunteering.map((v, i) => (
              <Fade key={v.org} i={19 + i}>
                <RoleCard org={v.org} title={v.title} period={v.period} detail={v.detail} />
              </Fade>
            ))}
          </ul>
        </Section>

        <Section id="research" title="Publications" i={20}>
          <ul className="space-y-3">
            {publications.map((p, i) => (
              <Fade key={p.title} i={20 + i}>
                <li className="rounded-xl border border-line bg-card p-4">
                  <a className="text-[0.875rem] font-semibold hover:underline"
                     href={p.href} target="_blank" rel="noreferrer">{p.title}</a>
                  <p className="mt-1 text-[0.775rem] text-muted">{p.authors}</p>
                  <p className="mt-0.5 text-[0.775rem] text-muted">{p.venue}</p>
                </li>
              </Fade>
            ))}
          </ul>
        </Section>

        <Section id="awards" title="Awards & scholarships" i={21}>
          <ol className="space-y-3">
            {awards.map((a, i) => (
              <Fade key={a.title} i={21 + i}>
                <li className="rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent-line">
                  <div className="flex gap-3">
                    <span aria-hidden="true" className="font-mono text-[0.75rem] font-medium text-accent">
                      {a.step}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[0.9rem] font-semibold">{a.title}</h3>
                      <p className="mt-0.5 text-[0.775rem] text-muted">{a.issuer}</p>
                      <p className="mt-2 text-[0.8rem] text-muted">{a.note}</p>
                    </div>
                  </div>
                </li>
              </Fade>
            ))}
          </ol>
        </Section>

        <Section id="hackathons" title="Hackathons & datathons" i={22}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {hackathons.map((h, i) => (
              <Fade key={h.title} i={22 + i} className="h-full">
                <li className="flex h-full flex-col rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent-line">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <h3 className="text-[0.875rem] font-semibold">{h.title}</h3>
                    <span className="shrink-0 font-mono text-[0.7rem] text-muted">{h.period}</span>
                  </div>
                  <p className="mt-2 text-[0.8rem] text-muted">{h.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {h.links.map((l) => (
                      <a key={l.href} className="ghost-btn" href={l.href}
                         target="_blank" rel="noreferrer"
                         aria-label={`${l.label} for ${h.title}`}>
                        {l.label} <ExternalIcon />
                      </a>
                    ))}
                  </div>
                </li>
              </Fade>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills" i={23}>
          <div className="space-y-3">
            {skills.map((s, i) => (
              <Fade key={s.group} i={23 + i}>
                <div>
                  <p className="mb-1 text-[0.75rem] font-medium text-muted">{s.group}</p>
                  <ul className="flex flex-wrap gap-1">
                    {s.items.map((x) => <li key={x} className="chip">{x}</li>)}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Get in touch" i={29}>
          <Fade i={29}>
            <p className="text-[0.875rem] text-muted">
              Open to machine learning engineer, MLOps, Data Scientist, Applied Researcher, and Research Scientist roles. Email or LinkedIn is the fastest way to
              reach me.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a className="ghost-btn" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="ghost-btn" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ExternalIcon />
              </a>
              {resumes.map((r) => (
                <a key={r.href} className="ghost-btn" href={r.href} download>{r.label}</a>
              ))}
            </div>
          </Fade>
        </Section>

        <footer className="border-t border-line pt-6 text-[0.75rem] text-muted">
          {site.name} — {site.location}
        </footer>
      </main>

      <Dock />
    </>
  );
}
