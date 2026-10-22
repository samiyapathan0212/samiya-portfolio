# Samiya Pathan — Portfolio

A personal portfolio built with React 19, strict TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide and React Router.

- Light and dark themes, persisted in `localStorage`, defaulting to the OS setting, applied before first paint (no flash).
- Home page: hero, featured projects, more analytics work, experience, skills, certificates (click to view each certificate full size), about and education, contact.
- Case studies at `/projects/foresight`, `/projects/shopsphere`, `/projects/internship-job-portal`; custom 404.
- All copy lives in typed files in `src/content/`. Nothing is hard-coded in components.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run lint       # oxlint
```

## Deploy to Vercel

1. Push the project to GitHub and import it in Vercel. The Vite preset is detected (build `npm run build`, output `dist`).
2. Add the environment variable `VITE_SITE_URL` (your deployed origin, no trailing slash, e.g. `https://your-domain.vercel.app`). It makes the Open Graph and Twitter image URLs absolute and generates `sitemap.xml` at build time.
3. `vercel.json` already rewrites unknown paths to `index.html` (so `/projects/foresight` works on refresh) and caches static assets.
4. Redeploy after setting the variable.

## Editing content

| What | File |
| --- | --- |
| Name, email, links, nav, skills | `src/content/site.ts` |
| Projects and case studies | `src/content/projects.ts` |
| Experience | `src/content/experience.ts` |
| Certificates (image, date, credential, verify link) | `src/content/certificates.ts` |
| Resume | replace `public/Samiya_Pathan_Resume.pdf` |
| Certificate images | `public/certificates/` |
| Project screenshots | `public/images/projects/` |

## Accuracy notes

- FORESIGHT's data is synthetic and its seasonal-naive baseline (11.80% WAPE) beat the gradient-boosting model (15.20%); the site says so.
- ShopSphere payments are simulated and the catalogue is mock data; the Job Portal admin area has no authentication. Each case study states this.
- No metrics, dates or links were added beyond what the repositories, certificates and letters show.

## Manual checks still needed (cannot be verified from a build sandbox)

- [ ] Open all four live demos (FORESIGHT, ShopSphere, ShopSphere API, Job Portal) — free hosts sleep and may need a minute.
- [ ] Open every "Verify online" link in the certificate viewer.
- [ ] The resume PDF contains a phone number. Replace it with a phone-free copy if the site will be public.
- [ ] Set `VITE_SITE_URL` and confirm the social preview image in a link-preview tool.
- [ ] Run Lighthouse on the deployed URL.

## QA checklist (run before release)

- [ ] `npm run build` and `npm run lint` pass
- [ ] Light and dark at 390px, 768px and 1440px: no horizontal scroll, no clipped text
- [ ] Theme persists across reload; first paint has no flash; toggling works by keyboard
- [ ] Mobile menu: opens, traps focus, closes with Escape and on navigation
- [ ] Certificate viewer: opens from each card, arrow keys move between certificates, Escape closes and returns focus
- [ ] Each case-study route loads directly and on refresh; unknown slug shows the 404
- [ ] Resume downloads as `Samiya_Pathan_Resume.pdf`
- [ ] Tab order is logical, focus ring always visible, `prefers-reduced-motion` respected
