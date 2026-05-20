#!/usr/bin/env bun
import { marked } from "marked"

const RAW = "https://raw.githubusercontent.com/leohenon/opencode-vim/ocv"

const head = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OpenCode-Vim — OpenCode fork with a vim mode</title>
  <meta name="description" content="OpenCode-Vim is an OpenCode fork with a built-in vim mode. Full vim motions, copy mode, Anthropic OAuth, and minimal UI — all in your terminal." />
  <meta name="keywords" content="opencode vim mode, does opencode have vim, open code vim, opencode vim motions, opencode fork, opencode vim mode terminal, ocv, opencode vim keybindings" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://leohenon.github.io/opencode-vim/" />
  <meta property="og:title" content="OpenCode-Vim — OpenCode fork with a vim mode" />
  <meta property="og:description" content="An OpenCode fork with a built-in vim mode. Full vim motions, copy mode, Anthropic OAuth, and minimal UI." />
  <meta property="og:url" content="https://leohenon.github.io/opencode-vim/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="OpenCode-Vim — OpenCode fork with a vim mode" />
  <meta name="twitter:description" content="An OpenCode fork with a built-in vim mode. Full vim motions, copy mode, Anthropic OAuth, and minimal UI." />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OpenCode-Vim",
    "description": "OpenCode fork with a built-in vim mode. Full vim motions, copy mode, Anthropic OAuth, and minimal UI.",
    "operatingSystem": "Linux, macOS",
    "applicationCategory": "DeveloperApplication",
    "keywords": "opencode vim mode, opencode fork, vim motions terminal"
  }
  </script>
  <style>
    :root { --bg: #0d1117; --bg-card: #161b22; --border: #30363d; --text: #e6edf3; --text-muted: #8b949e; --accent: #58a6ff; --accent-green: #3fb950; --accent-orange: #d29922; --code-bg: #1c2128; --max-w: 820px; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 2rem 1rem; }
    .container { max-width: var(--max-w); margin: 0 auto; }
    header { text-align: center; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
    h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text); }
    .subtitle { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1rem; }
    .subtitle strong { color: var(--text); }
    .badges { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .badges img { height: 22px; }
    .btn { display: inline-block; padding: 0.6rem 1.4rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: opacity 0.2s; }
    .btn:hover { opacity: 0.85; }
    .btn-primary { background: var(--accent-green); color: #fff; }
    .btn-secondary { background: #21262d; color: var(--text); border: 1px solid var(--border); }
    .hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem; }
    .demo-img { display: block; max-width: 100%; border: 1px solid var(--border); border-radius: 8px; margin: 2rem auto; }
    h2 { font-size: 1.5rem; margin: 2.5rem 0 1rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--border); }
    h3 { font-size: 1.15rem; margin: 1.5rem 0 0.75rem; color: var(--accent); }
    p, li { color: var(--text-muted); margin-bottom: 0.5rem; }
    strong, b { color: var(--text); }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    code { background: var(--code-bg); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.88em; font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace; }
    pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 6px; padding: 1rem; overflow-x: auto; margin: 0.75rem 0; font-size: 0.88rem; line-height: 1.45; }
    pre code { background: none; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 0.75rem 0; font-size: 0.9rem; }
    th, td { padding: 0.5rem 0.75rem; text-align: left; border: 1px solid var(--border); }
    th { background: var(--bg-card); font-weight: 600; color: var(--text); }
    td { color: var(--text-muted); }
    blockquote { background: var(--bg-card); border-left: 4px solid var(--accent); padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; margin: 1rem 0; font-size: 0.92rem; color: var(--text-muted); }
    blockquote strong { color: var(--text); }
    img { max-width: 100%; border-radius: 6px; }
    ul, ol { padding-left: 1.5rem; margin: 0.75rem 0; }
    hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
    footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.88rem; }
    @media (max-width: 600px) { body { padding: 1rem 0.75rem; } h1 { font-size: 1.6rem; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1><span>OpenCode</span> Vim</h1>
      <p class="subtitle">An <strong>OpenCode</strong> fork with a built-in <strong>vim mode</strong>. Syncs with upstream <strong>OpenCode</strong> releases.</p>
      <p class="subtitle">Adds a comprehensive
      <strong>Vim</strong> mode, so you can navigate, edit text, and control your AI coding
      assistant with the familiarity of <strong>Vim</strong>. If you have been missing <strong>Vim</strong> while using <strong>Opencode</strong>, this fixes that.</p>
      <div class="hero-btns">
        <a class="btn btn-primary" href="https://github.com/leohenon/opencode-vim">View on GitHub</a>
        <a class="btn btn-secondary" href="https://www.npmjs.com/package/@leohenon/ocv">npm package</a>
      </div>
    </header>


    <img class="demo-img" src="https://raw.githubusercontent.com/leohenon/opencode-vim/ocv/.github/demo.gif" alt="OpenCode-Vim demo" />`

const foot = `    <footer>
      <p><a href="https://github.com/leohenon/opencode-vim">OpenCode-Vim on GitHub</a> &middot; <a href="https://www.npmjs.com/package/@leohenon/ocv">npm</a> &middot; MIT License</p>
    </footer>
  </div>
</body>
</html>`

const readme = await Bun.file("README.md").text()
marked.use({ gfm: true })

const idx = readme.indexOf("## ")
const body = await marked.parse(idx !== -1 ? readme.slice(idx) : readme)
const html = body
  .replace(/src="\.github\//g, `src="${RAW}/.github/`)
  .replace(/href="\.github\//g, `href="${RAW}/.github/`)
  .replace(/\[!NOTE\]/g, "<strong>Note:</strong>")
  .replace(/\[!TIP\]/g, "<strong>Tip:</strong>")

await Bun.write("docs/index.html", head + "\n\n" + html + "\n\n" + foot)
console.log("Generated docs/index.html from README.md")
