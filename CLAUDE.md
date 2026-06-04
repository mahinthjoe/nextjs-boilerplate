# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install          # install dependencies (required before any other command)
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build
npm run lint         # run ESLint
```

No test framework is configured.

## Stack

- **Next.js 16** (App Router) — this version has breaking changes vs. training data; check `node_modules/next/dist/docs/` before writing any Next.js-specific code
- **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}` syntax, not the v3 `theme.extend` config pattern
- **TypeScript** (strict mode), path alias `@/*` → project root

## Architecture

All routes live under `app/` using the App Router file convention (`layout.tsx`, `page.tsx`). There is currently one route: `app/page.tsx` (home).

Global styles are in `app/globals.css` using Tailwind v4's CSS-first config. CSS custom properties (`--background`, `--foreground`) are defined in `:root` and mapped to Tailwind tokens via `@theme inline`.

`next.config.ts` is minimal with no customizations yet.
