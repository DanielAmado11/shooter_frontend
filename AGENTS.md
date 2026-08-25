# AGENTS.md

3D penalty-shootout game. Next.js 14 (App Router), React Three Fiber / drei / @react-three/cannon, howler audio. Everything is client-rendered — the root layout (`src/app/layout.jsx`) is `"use client"` and wraps the app in `QueryClientProvider` + `AuthProvider`.

## Commands
- `npm run dev` — dev server (port 3000)
- `npm run lint` — `next lint` (only lint; **no typecheck script, no tests**)
- `npm run build` + `npm start` — the only practical verification. `next build` also catches most issues.
- Path alias: `@/*` → `src/*` (jsconfig.json). Files are a mix of `.jsx` components and `.ts` services/interfaces.

## Env config
- `next.config.mjs` reads `PUBLIC_API_URL` and `PUBLIC_URL` from `process.env` **with prod fallbacks** (`xdmocaadfutbolgameapi.azurewebsites.net` / Vercel). This means **`.env` values DO take effect** for those two (local dev: `PUBLIC_API_URL=http://localhost:3001`, `PUBLIC_URL=http://localhost:3000`). Don't hardcode URLs in `next.config.mjs` — set them in `.env`.
- Code uses bare `process.env.*` (no `NEXT_PUBLIC_` prefix), so **only keys declared in `next.config.mjs` `env` reach the client bundle**. E.g. `TIMER=10000` in `.env` is inert — `src/components/header/timer/Timer.jsx` falls back to 45s. Add new vars to the `env` block, not just `.env`.
- `.env` is gitignored/untracked; after editing `next.config.mjs`, restart `npm run dev` (config is read at server start).

## Auth
- Cookie-based: `user_code` cookie (js-cookie) is sent as a `user_code` header on every request via `src/config/clientAxiosInstance.js`. API base is `process.env.PUBLIC_API_URL`.
- `AuthProvider` (`src/components/providers/auth-provider.jsx`) guards routes: unauthenticated users are pushed away from `/`, `/dashboard`, `/game`, `/leaderboard`; authenticated users away from `/home`, `/welcome`, `/login`.

## Routing / architecture
- Static routes (`/home`, `/welcome`, `/login`, `/game`, etc.) win over the dynamic `[username]` segment.
- `src/app/[username]/page.jsx` is the only server component (async) — social share preview, calls the API server-side.
- Game flow: `/` → `/welcome` → `/login` → `/dashboard` → `/instructions` → `/selection` → `/game` → `/leaderboard` → `/thanks`.
- Sounds autoplay on load (`sounds.background_1` in root layout); on iOS audio is unlocked by the first click/touch.

## Game mechanics
- `CharacterAnimation` context (`src/contexts/CharacterAnimation.jsx`) + `animationTime`/`animationIndex` sync the kicker, goalkeeper, and ball animations.
- Ball physics/force tables live in `src/utils/trayectory_forces.js`; kicker/goalkeeper placement in `src/utils/kickerPositions.js` and `src/utils/goalKeeperPositions.js`.
- Scores POST to `/score`; the share screenshot POSTs multipart to `/score/image` (`src/services/score.ts`).

## Deploy
- Azure Pipelines (`azure-pipelines.yml`), triggered on `master`, deploys this frontend to the App Service whose hostname is the same as `PUBLIC_API_URL` (`xdmocaadfutbolgameapi.azurewebsites.net`) — frontend and API share one origin in prod.
- Pipeline uses Node 20.x (`RuntimeStack NODE|20.10`); `.nvmrc` (`v18.17.0`) is stale.
- `.DS_Store` files are committed to the repo — leave them alone.
