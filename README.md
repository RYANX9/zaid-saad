# Zaid Saad — Portfolio

Live: [zaid-saad.vercel.app](https://zaid-saad.vercel.app)

Personal portfolio for Zaid Saad, a full-stack developer working with Flutter and Firebase-backed web systems, based in M'sila, Algeria. Content is editable through a built-in admin dashboard that commits changes directly back to this repository — no separate database or CMS involved.

## Features

- Landing page with hero, skills, and project showcase driven by typed content in `app/data.ts`
- **Admin dashboard** (`/admin`) for editing site content without touching code
- **GitHub-backed persistence** — saves go through the GitHub Contents API: the admin dashboard posts to `/api/save`, which regenerates `app/data.ts` and commits it straight to the repo, so the live data file is always the single source of truth and every content change is a real, versioned git commit
- Image upload endpoint (`/api/upload`) for project screenshots
- Contact shortcuts (email, phone, WhatsApp)

## Tech stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** with **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** for animation
- **lucide-react** for icons
- GitHub Contents API as the content backend (via `lib/github.ts`)

## Project structure

```
app/
  page.tsx                landing page
  admin/page.tsx           admin dashboard
  api/save/route.ts        commits regenerated data.ts to GitHub
  api/upload/route.ts       image upload handling
  lib/github.ts             GitHub Contents API client (read/commit file)
  lib/generateDataFile.ts   serializes admin edits into app/data.ts
  data.ts                   site content (projects, skills, socials)
  colors.ts
public/
  pic.png
  projects/                 project screenshots
```

## Getting started

```bash
npm install
```

Create `.env.local`:

```
GITHUB_TOKEN=<personal access token with repo write access>
REPO_OWNER=RYANX9
REPO_NAME=zaid-saad
REPO_BRANCH=main
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or `/admin` to edit content.

## Security note

`GITHUB_TOKEN` grants write access to this repository. Keep it out of version control and scope it as narrowly as possible (fine-grained PAT limited to this repo, contents: read/write only).
