# Wedding_v2 — Axel & Amanda

A GitHub-friendly static wedding website scaffold (Next.js + TypeScript + Tailwind) with RSVP, gift registry, and a lightweight admin dashboard.

Goals
- Static-first site compatible with GitHub Pages (via `next export`) or any static host.
- Optional Supabase integration for hosted DB and auth.
- Simple fallback localStorage/demo mode for development.

Quick start

1. Clone this repo and install dependencies

```bash
cd wedding_v2
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build and export static site (for GitHub Pages)

```bash
npm run export
# output will be in out/ directory
```

Environment variables
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — optional, if set the app will use Supabase for data storage
- `NEXT_PUBLIC_ADMIN_PIN` — optional admin PIN for demo admin access (defaults to `1234` in demo mode)

Data models
- RSVPs: stored in Supabase table `rsvps` or in `localStorage` demo (demo key `demo_rsvps`).
- Gifts: stored in Supabase table `gifts` or loaded from `public/data/gifts.json` and demo `localStorage` key `demo_gifts`.

Admin
- Visit `/admin/login` and enter the PIN (or use Supabase auth if you configure it).
- Dashboard allows exporting RSVPs to CSV and viewing gifts.

Supabase setup (optional)
1. Create a Supabase project.
2. Create `rsvps` and `gifts` tables matching the fields in `lib/data.ts`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as GitHub repo secrets or environment variables.

Deploying to GitHub Pages
1. Build & export: `npm run export` (creates `out/` folder)
2. Commit the `out/` folder or use GitHub Actions to build and deploy `out/` to `gh-pages` branch.

Notes
- This scaffold intentionally provides a Supabase-backed option for production and a local demo mode for GitHub Pages and local testing.
- For secure admin access use Supabase Auth and server-side session management. The `NEXT_PUBLIC_ADMIN_PIN` approach is for simple, non-critical workflows only.

Next steps
- Add CRUD UI in admin to edit/add/delete gifts (currently read-only in demo mode).
- Add forms for guest messaging and PDF export of guest lists.

