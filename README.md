# GridLock: The Great British Upgrade

A single-page energy-grid strategy game for the UK (React + Tailwind).

## Files
- **`index.src.html`** — the editable source: JSX, compiled live by Babel from a
  CDN. Open it directly in a browser for quick local hacking. **Edit this.**
- **`index.html`** + **`app.js`** — the **deployed build**. React/ReactDOM are
  vendored (same-origin, in `vendor/`) and the JSX is pre-compiled to plain JS,
  so the live page does no in-browser Babel compile and has no cross-origin
  script dependency (this is what fixed the blank page on Vercel). Generated —
  do not edit by hand.
- **`vendor/`** — pinned React + ReactDOM UMD builds.
- **`sim.mjs`** — head-less Monte-Carlo balance harness (reads `index.src.html`).
- **`build.mjs`** — regenerates `index.html` + `app.js` from `index.src.html`.

## Workflow
```sh
npm install            # once
# edit index.src.html
npm run build          # regenerate index.html + app.js  ← run before committing
node sim.mjs 5000      # optional: check the win-rate balance
```

Deploy: Vercel serves the static files as-is (see `vercel.json`); the entry
point is the built `index.html`. Always rebuild after editing `index.src.html`.
