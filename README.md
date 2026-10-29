# Aurelia Homes — cinematic real-estate landing page

Next.js App Router + TypeScript + Tailwind CSS, GSAP/ScrollTrigger, Lenis, Framer Motion, `next/image`, and `next/font`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production checks: `npm run build` then `npm run start`.

## Customize the demo

Edit `src/config/site.ts` to change the brand, tagline, city, contact details, stats, project names and facts, amenities, highlights, floor plans, locations, and social links. Replace the fictional/demo copy and legal fields before production use.

## Media

Local media lives in `public/media/`; sources, license notes, and the missing hero-video substitution are documented in `public/media/CREDITS.md`. The hero currently uses a local still image because the Pexels video download endpoint was unavailable during this build.

## Enquiry endpoint

`POST /api/enquiry` accepts the client form JSON, logs it to the server, and returns `{ "ok": true }`. It is a demo stub; connect a CRM or secure email service before collecting real personal information.

## Deploy

Import this GitHub repository into Vercel and keep the default Next.js build settings. The sitemap is served at `/sitemap.xml`.
