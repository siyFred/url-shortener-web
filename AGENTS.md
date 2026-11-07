# AGENTS.md

This file provides guidance to AGENTS (Antigravity CLI) when working with code in this repository.

## Project Overview

`url-shortener-web` is the Next.js web client for the URL Shortener service, paired with the backend repository [`url-shortener-api`](https://github.com/siyFred/url-shortener-api). The UI and user-facing copy are written in Brazilian Portuguese (`pt-br`).

## Commands

- **Install dependencies:** `npm install`
- **Start development server (http://localhost:3000):** `npm run dev`
- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Run linter:** `npm run lint` (or `npx eslint <file>` to lint a single file)
- **Type-check without emitting:** `npx tsc --noEmit`

*(No automated test runner is installed yet; End-to-End testing with Cypress is planned on the project roadmap.)*

## Environment & Backend Integration

- **Backend dependency:** The app expects the `url-shortener-api` backend (Spring Boot + PostgreSQL) to be running locally on port `8080` by default.
- **Environment variable:** Configure `NEXT_PUBLIC_API_URL` in `.env.local` in the project root (falling back to `http://localhost:8080` in [`app/page.tsx`](app/page.tsx)). Always use the `NEXT_PUBLIC_API_URL` prefix so Next.js exposes the variable to client components.
- **API contract:**
  - `POST ${NEXT_PUBLIC_API_URL}/api/shorten`
  - Request body: `{ "longUrl": "<string>" }`
  - Response body: `{ "shortUrl": "<string>" }`

## Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router in `app/`) with React 19 and TypeScript (`strict: true`).
- **Path alias:** `@/*` maps to the repository root (`./*`).
- **Styling:** Tailwind CSS v4 configured via `@tailwindcss/postcss` in [`postcss.config.mjs`](postcss.config.mjs) and `@import "tailwindcss";` with inline `@theme` variables in [`app/globals.css`](app/globals.css) (no `tailwind.config.*` file).
- **Application structure:**
  - [`app/layout.tsx`](app/layout.tsx): Root layout configuring Geist Sans / Geist Mono fonts and setting `<html lang="pt-br">`.
  - [`app/page.tsx`](app/page.tsx): Client component (`"use client"`) implementing the URL shortening form, request lifecycle (`loading`, `error`), and shortened URL display.

## Roadmap Context

Planned features documented in [`README.md`](README.md):
- **Authentication & Dashboard:** Login/registration routes integrating with backend Spring Security/JWT, plus a `/dashboard` route for full CRUD over a user's shortened links.
- **Analytics:** Displaying click statistics on `/dashboard`.
- **E2E Tests:** Cypress test suite covering link creation, clicking, and redirection.
