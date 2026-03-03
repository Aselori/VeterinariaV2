# VetClinic — Veterinary Clinic Landing Page

Academic project. Next.js 16 + Tailwind v4 landing page for a veterinary clinic.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **pnpm**

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/            # Pages, layouts, API routes
  components/     # UI components
  context/        # DarkModeContext
  hooks/          # useChat
  lib/            # AI service scaffold, shared types
  constants/      # Services and navigation data
  types/          # TypeScript interfaces
```

## Dark Mode

Uses Tailwind v4 class strategy (`@custom-variant dark`). Toggle persists via `localStorage`.

## Chatbot

The `/api/chat` route is scaffolded and ready. Add your API key to `.env.local` and implement `src/lib/ai.ts` when ready.

```env
OPENAI_API_KEY=your_key_here
# or
GEMINI_API_KEY=your_key_here
```
