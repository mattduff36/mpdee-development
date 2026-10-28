# MPDEE Development

The website for MPDEE Development: independent web design and application development by Matt, based in Edwinstowe, Nottinghamshire.

Live domain: https://development.mpdee.co.uk
Repository: https://github.com/mattduff36/mpdee-development

## October 2026 redesign

A complete visual and content refresh on the existing off-white and charcoal layout: bold typography, real project imagery, a filterable portfolio and individual case studies. Interface accents use a light orange (`#F2A43A`, hover `#DB8D1E`, tint `#FFF3E3`), with a darker orange (`#8A4E0C`) for small text and focus on the paper background. The original orange-and-yellow triangle logo is unchanged. The original home, work, services and contact URLs are retained. Existing website package names and starting prices are preserved.

The redesign is on `redesign/2026-studio`. It is for preview and review. **Do not merge to `main` or deploy to production until Matt explicitly confirms.**

## Stack

- Next.js 15 App Router, React 19 and TypeScript.
- Custom responsive CSS and self-hosted Manrope typography.
- Next.js image optimisation and static case-study generation.
- Nodemailer for the existing Gmail SMTP contact integration.
- Vercel hosting and Web Analytics.
- Jest and Testing Library for component, validation and API tests.

The new active UI uses native semantic HTML. Legacy Once UI components remain in the repository but are not used by the redesigned routes. The previous unconditional Google Analytics scripts have been removed; the existing Vercel Web Analytics integration remains.

## Local development

Use Node.js 22 (matching Vercel) and npm. Nodemailer requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

The development wrapper forwards normal Next.js arguments and translates the preview environment's `--host` flag to `--hostname`. It also works with ordinary `npm run dev` on Windows.

For the contact integration, copy `env.example` to `.env.local` and set the existing variables through your normal secret-management process:

- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

Never commit `.env.local` or credentials. The UI can be developed without SMTP; real submissions will report an unavailable email service and show a direct email alternative. A successful screen is shown only after the API reports successful delivery.

## Checks

```sh
npx tsc --noEmit
npm test -- --runInBand
npm run build
npm audit --omit=dev
```

Stop the development server before a production build because Next.js shares the `.next` output directory between these modes. Build verification is separate from deployment: `npm run build` does not publish the site.

Contact tests mock the delivery service and do not send emails. Do not use a real contact submission as an automated smoke test.

## Editing content

| File | Purpose |
| --- | --- |
| `src/data/projects.ts` | Portfolio summaries, case-study copy, URLs and images |
| `src/data/services.ts` | Service descriptions, website starting prices and FAQs |
| `src/app/page.tsx` | Homepage introduction, studio story and process |
| `src/app/globals.css` | Shared visual design and responsive layouts |
| `src/components/ContactForm.module.css` | Enquiry form styling |
| `public/images/work/` | Refreshed project screenshots |
| `public/fonts/` | Manrope font and its SIL Open Font License |

Case studies generate at `/work/[slug]`. Add a project to the data array to include it in the portfolio and sitemap. A project `url` is optional. Projects without one are presented as private applications and do not show a live-site link. Avoid inventing performance metrics, testimonials, public URLs or project capabilities. Public project images reflect publicly visible work and are not live product embeds.

DigiDocs is a private operations application in the portfolio. It has no public URL. Its image, `public/images/work/digidocs-illustrative.svg`, is a labelled illustrative schematic rather than a screenshot.

## Contact behaviour

`POST /api/contact` accepts `name`, `email`, optional `phone`, and optional `projectDetails`. Both client and server validate fields. Maximum lengths are 100, 254, 40 and 1,000 characters respectively. UK domestic and formatted international phone numbers are accepted.

The form preserves drafts on failure, guards against duplicate submissions, announces errors and successful delivery, and provides a direct email fallback. SMTP configuration or delivery failures cannot produce a false success. The existing rate limiter is process-local best-effort protection, not a distributed abuse-prevention service.

`GET /api/health` reports configuration presence. It does not establish that a real email has been delivered.

## Preview and release

Vercel project: `mpdee-development` in the existing MPDEE team. Use a non-production branch and an explicit preview target for review. Keep the current deployment protection settings. The production branch remains `main`.

Before any approved release, confirm the exact reviewed commit and check contact email configuration in the intended environment. No production deployment or merge is authorised by the redesign task alone.
