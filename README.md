# Recipe App

TanStack Start monorepo for the recipe app.

## Apps and packages

- `apps/web`: TanStack Start web app.
- `packages/ui`: shared shadcn/ui package used by the app.

Use shared UI components from `@workspace/ui`:

```tsx
import { Button } from "@workspace/ui/components/button"
```

Add new shadcn components from the web app root with:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Generated shadcn components are placed in `packages/ui/src/components`.

## Authentication

Authentication is handled by Clerk.

The web app uses `@clerk/tanstack-react-start` with TanStack Start:

- `apps/web/src/start.ts` registers Clerk middleware.
- `apps/web/src/routes/__root.tsx` wraps the app in `ClerkProvider`.
- `apps/web/src/routes/sign-in.$.tsx` renders the Clerk sign-in route.
- `apps/web/src/routes/sign-up.$.tsx` renders the Clerk sign-up route.
- `apps/web/src/routes/index.tsx` shows signed-out sign-in/sign-up controls and a signed-in user menu.

Clerk styling uses the shadcn theme from `@clerk/ui`, with the CSS imported through `packages/ui/src/styles/globals.css`.

### Clerk environment

Local development uses Clerk values from `apps/web/.env.local`. Do not commit local env files.

Cloudflare Workers runtime uses Worker bindings:

- `CLERK_SECRET_KEY`: stored as a Cloudflare Worker secret.
- `VITE_CLERK_PUBLISHABLE_KEY`: stored as a Cloudflare Worker secret.
- Clerk route vars are stored in `apps/web/wrangler.jsonc` because they are not sensitive.

To update Worker secrets:

```bash
cd apps/web
pnpm exec wrangler secret put CLERK_SECRET_KEY
pnpm exec wrangler secret put VITE_CLERK_PUBLISHABLE_KEY
```

## Deployment

The web app deploys to Cloudflare Workers using Wrangler and the Cloudflare Vite plugin.

Key files:

- `apps/web/wrangler.jsonc`: Worker name, compatibility settings, entrypoint, and non-secret vars.
- `apps/web/vite.config.ts`: includes `@cloudflare/vite-plugin`.
- `.github/workflows/deploy-web-worker.yml`: deploys on pushes to `main`.

Current Worker:

```text
https://so-many-recipes-web.snowy-star-3e8e.workers.dev
```

### Manual deploy

```bash
cd apps/web
pnpm run deploy
```

This runs `pnpm build` and then `wrangler deploy`.

### GitHub Actions deploy

Pushes to `main` deploy automatically through `.github/workflows/deploy-web-worker.yml`.

GitHub repository secrets required by the workflow:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Clerk secrets are not duplicated into GitHub Actions. They live in Cloudflare Worker secrets and are available to the deployed Worker at runtime.

The Cloudflare API token should be scoped to the deployment account and include:

- Account -> Workers Scripts -> Edit

### Deployment checks

Useful commands:

```bash
cd apps/web
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
pnpm cf-typegen
```

`pnpm cf-typegen` regenerates `apps/web/worker-configuration.d.ts` after Worker bindings change.
