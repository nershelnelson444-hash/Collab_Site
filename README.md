# Collab — website

React + Vite + TypeScript + Tailwind v4 + Framer Motion.

## Run locally
npm install
npm run dev

## Build for production
npm run build
# outputs to /dist

## Notes
- The hero uses the same background video source as the reference
  PrismaHero component you shared. It's an external CDN link, so it depends
  on that CDN staying up — for a permanent site, download the clip and
  serve it from your own assets (or shoot/license your own footage) and
  point the <video src> in src/components/Hero.tsx at that instead.
- Case study thumbnails on the Work section are gradient swatches as
  placeholders — swap in real screenshots of amberdunes.blog and
  kl7garage.in when you have them (src/components/Work.tsx).
- Update the email address and copy throughout to match your actual details.
