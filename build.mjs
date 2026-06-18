/* ============================================================================
   GRIDLOCK build step
   ----------------------------------------------------------------------------
   index.src.html is the editable source: JSX + Tailwind, transformed live by
   Babel-standalone from a CDN. That is convenient for local hacking but fragile
   to ship — it depends on three cross-origin CDNs AND compiles a 150 KB script
   in the browser on every load (which can stall or run out of memory, notably
   on mobile, leaving a blank page).

   This script produces the DEPLOYED index.html:
     • React + ReactDOM are vendored (served same-origin from /vendor)
     • the JSX is PRE-compiled to plain JS (app.js) — no in-browser Babel
     • Tailwind's Play CDN is kept (a failure there only drops styling, never
       blanks the page)

   Run:  npm install  &&  npm run build
   ============================================================================ */
import { readFileSync, writeFileSync } from "fs";
import * as Babel from "@babel/standalone";

const src = readFileSync(new URL("./index.src.html", import.meta.url), "utf8");

/* --- pull the pieces out of the source --- */
const style = (src.match(/<style>[\s\S]*?<\/style>/) || [""])[0];

const errScript = (src.match(/<script>\s*\/\*\s*Surface a startup failure[\s\S]*?<\/script>/) || [""])[0];

const babelSrc = src.split('<script type="text/babel"')[1].split("</script>")[0].replace(/^[^>]*>/, "");
if (!babelSrc) throw new Error("could not find the <script type=text/babel> block in index.src.html");

/* --- compile JSX exactly the way the browser would (sourceType: script) --- */
const { code } = Babel.transform(babelSrc, { presets: ["env", "react"], sourceType: "script" });
writeFileSync(new URL("./app.js", import.meta.url), code);

/* --- assemble the deployable, self-contained-ish index.html --- */
const out = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
<title>GridLock: The Great British Upgrade</title>
${errScript}
<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
${style}
</head>
<body>
<div id="root"></div>
<script src="app.js"></script>
</body>
</html>
`;

writeFileSync(new URL("./index.html", import.meta.url), out);
console.log(`built index.html + app.js (${(code.length / 1024).toFixed(0)} KB of compiled JS)`);
