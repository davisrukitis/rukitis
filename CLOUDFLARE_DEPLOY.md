# Cloudflare Workers deployment

This project is configured for Cloudflare Workers through the OpenNext Cloudflare adapter.

## Cloudflare dashboard values

Use these values in Cloudflare Workers Builds:

```txt
Project name: rukitis
Build command: pnpm run build
Deploy command: pnpm run deploy
```

In **Advanced settings**, add:

```txt
NODE_VERSION = 22
```

## First local setup after pulling these changes

Run this once locally so `pnpm-lock.yaml` is refreshed with the new Cloudflare packages:

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm run preview
```

If the preview is good, deploy:

```bash
pnpm run deploy
```

## Why this is needed

Cloudflare Workers can host Next.js through `@opennextjs/cloudflare`.

The important files are:

```txt
open-next.config.ts
wrangler.jsonc
public/_headers
.dev.vars
next.config.mjs
package.json
```

## Notes

- Do not commit `.open-next`; it is generated build output.
- Keep `wrangler.jsonc > name` and `services[0].service` the same.
- If you rename the Cloudflare Worker project later, update both values.
- If Cloudflare install fails because of the lockfile, run `pnpm install` locally and commit the updated `pnpm-lock.yaml`.
