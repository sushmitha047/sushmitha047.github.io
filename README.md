# Sushmitha Halli Sudhakara — portfolio

A single-page portfolio built with Vite, React 19, TypeScript and Tailwind CSS v4.

Layout follows the `dillionverma/portfolio` template (MIT) that Sushmitha picked as a
reference: one narrow centred column, staggered blur-in entrances, a floating dock nav,
and expandable cards. It is a from-scratch implementation rather than a fork, so there is
no Next.js, shadcn/ui, Radix or framer-motion dependency — 5 source files instead of ~25.

---

## ⚠️ Read this before you publish

Two things need your confirmation. Both are marked with `⚠️ VERIFY` comments in
`src/content.ts`.

**1. Your job title at Decisions LLC.**
Your two resumes disagree:

| Source | Title |
| --- | --- |
| `Sushmitha-Resume_EngineeringRole.docx` (uploaded) | Technical Sales Enablement Specialist (AI & Automation Projects) |
| `Sushmitha-Resume_ResearchRole.docx` (uploaded) | Technical Sales Enablement Specialist (AI & Automation Projects) |
| Older ML Engineer resume | Technical Documentation Writer (AI & Product Enablement) |

The site currently uses the uploaded (newer) version. A public page is indexed and
easy for a recruiter to cross-check against a reference call, so set this to whatever
HR would confirm. It appears in two places in `src/content.ts`: `site.role` and the
first entry of `experience`.

**2. A dropped metric.**
One resume attributes 65.2% of the bike-sharing improvement to temporal features
and 25.1% to hyperparameter tuning. The other says temporal features contributed 92%
and one-hot encoding cost 1.7%. Since the two can't both be right, the site states
only the Kaggle score movement (1.80462 → 0.49549), which both sources agree on.
If you can find the original notebook output, add the correct breakdown back.

Minor: your repo is named `cs795-deeplearning` but its README and your resume both
say CS 895. The site avoids the course number entirely.

---

## Run it locally

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # type-checks, then writes to dist/
npm run preview      # serves dist/ so you can check the production build
```

Node 20 or newer.

---

## Editing the site

**All content lives in `src/content.ts`.** Nothing else needs touching for routine
updates — the components read from that file and lay it out. To add a project,
append to the `projects` array; to reorder the featured work, move the entries.

Each featured project has a `metric` object, which renders as the before/after
measurement block. If a project has a result but no baseline to compare against,
omit `before` and `beforeLabel` and it renders as a single figure (see the
AWS project).

| File | What it holds |
| --- | --- |
| `src/content.ts` | Every fact on the page |
| `src/index.css` | Colour tokens, type scale, base styles |
| `src/components/` | `ui.tsx`, `ProjectCard.tsx`, `Dock.tsx` |
| `public/resume/` | The two resume PDFs |
| `public/og.png` | Social-share preview image |
| `public/sushmitha.jpg` | Headshot — **not included**, drop one in to replace the "SH" initials |

### Replacing the resumes

Drop new PDFs into `public/resume/` and update the `href` values in the `resumes`
array in `src/content.ts`. The PDFs currently there were converted from your two
`.docx` files.

### Re-enabling the demo links

When your Streamlit apps are back up, add a `video`-style entry to the relevant
project. The `Project` type already supports one extra link; for a live demo,
add a second field alongside `video` in `src/content.ts` and render it next to
"Read the code" in `src/components/Projects.tsx`.

---

## Deploying

### GitHub Pages (recommended)

You already own `github.com/sushmitha047/sushmitha047.github.io`, which means you
get `https://sushmitha047.github.io` with no subdirectory in the URL, and pushes
deploy automatically. **Note that this will replace whatever is currently in that
repository** — take a backup branch first if you want to keep it.

1. Push this project to the root of that repo on the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push. The workflow in `.github/workflows/deploy.yml` builds and publishes.
   First run takes about two minutes; check the **Actions** tab.

Every later push to `main` redeploys.

**If you use a different repo name** (e.g. `sushmitha047/portfolio`), the site is
served from a subpath, so set `base: "/portfolio/"` in `vite.config.ts` — otherwise
the CSS and JS will 404.

#### Why GitHub Pages over Vercel or Netlify

For a static single-page site all three are free and all three auto-deploy from
GitHub, so the deciding factor is the URL and the account surface. `sushmitha047.github.io`
sits on the same profile a recruiter is already looking at, needs no third-party
signup, and has no build-minute quota to run out of. Vercel and Netlify give you
`something.vercel.app` / `something.netlify.app`, which is fine but reads as
scaffolding rather than a home.

Vercel is the better choice if you later add server-side rendering, API routes,
or preview deployments per pull request. You can switch at any point — import the
repo at vercel.com, framework preset "Vite", and it works with no code changes
(set `base` back to `"/"` if you'd changed it).

### Custom domain, later

If you buy e.g. `sushmitha.dev`:

1. At your registrar, add these DNS records:
   - Four `A` records for the apex `@` pointing to `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` for `www` pointing to `sushmitha047.github.io`
2. On GitHub: **Settings → Pages → Custom domain**, enter the domain, save,
   then tick **Enforce HTTPS** once the certificate is issued (usually under an hour).
3. Update the absolute URLs in `index.html` (`og:url`, `og:image`, `canonical`,
   `twitter:image`), `public/robots.txt` and `public/sitemap.xml`.

GitHub Pages writes a `CNAME` file into the repo when you set the domain. Because
this project deploys via Actions rather than from a branch, add that same `CNAME`
file to `public/` so it survives each build.

---

## What's included

Semantic HTML with one `h1` and a correct heading order, a skip link, visible focus
rings, `aria-current` on the active nav item, labelled icon buttons, and a mobile
menu with `aria-expanded`/`aria-controls`. Reveal animations and smooth scrolling are
disabled under `prefers-reduced-motion`. Dark mode is class-based with an inline
script that applies the saved theme before first paint, so there's no flash.

SEO covers a descriptive title and meta description, Open Graph and Twitter card
tags, JSON-LD `Person` structured data, `sitemap.xml`, `robots.txt`, an SVG favicon
and an Apple touch icon. A `.nojekyll` file stops GitHub Pages from running the
build output through Jekyll.

The production bundle is roughly 19 KB of CSS and 224 KB of JS (71 KB gzipped),
with three webfonts loaded from Google Fonts using `display=swap`.
