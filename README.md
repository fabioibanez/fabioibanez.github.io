# website

The repo is `fabioibanez/website` (renamed from `fabioibanez.github.io` — the
local checkout still has the old name, GitHub redirects). It deploys to two
places from the same `main` branch:

| Target          | Build command       | URL                                       | Why                                         |
| --------------- | ------------------- | ----------------------------------------- | ------------------------------------------- |
| Cloudflare      | `npm run build`     | https://fabioibanez.com                   | The actual site                             |
| GitHub Pages    | `npm run build:gh`  | https://fabioibanez.github.io/website/    | Hosts the LLVM compiler assets (see below)  |

## Why two builds?

`@jtrb/runtime` (used by [the IDE](https://fabioibanez.com/ide)) hardcodes URLs
for the LLVM compiler binaries:

```
https://fabioibanez.github.io/website/llvm.core.wasm
https://fabioibanez.github.io/website/llvm-resources.tar.gz
```

`llvm.core.wasm` is 72 MiB. Cloudflare Workers Static Assets caps individual
files at **25 MiB**, so we can't ship them via Cloudflare. GitHub Pages allows
files up to **100 MiB**, so it serves them instead.

To keep both deploys working from one repo:

- The LLVM files live in [`gh-pages-assets/`](./gh-pages-assets/), **not**
  `public/`. That keeps them out of `next build`'s default output.
- `npm run build:gh` runs `next build` and then `cp -R gh-pages-assets/. out/`,
  so they land at the URL paths the runtime expects.
- `.github/workflows/deploy.yml` runs `build:gh` and pushes `out/` to GitHub
  Pages.
- Cloudflare's auto-build runs `npm run build` (default), so `out/` stays small
  and under every per-file limit.

## Local

```bash
npm install
npm run dev      # localhost:3000
npm run build    # Cloudflare-equivalent output → out/
npm run build:gh # GH-Pages-equivalent output (with LLVM) → out/
```
