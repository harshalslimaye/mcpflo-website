# MCPFlo website

The public website for [MCPFlo](https://github.com/harshalslimaye/mcpflo) — a
desktop app for testing MCP servers ("Bruno for MCP"). Marketing pages and
documentation live together in a single [Astro](https://astro.build) project.

## Structure

```
src/
  pages/
    index.astro            # landing page
    privacy.astro, terms.astro
    docs/[...slug].astro   # docs pages (rendered from the content collection)
    docs/index.astro       # /docs → first doc page
  layouts/
    Layout.astro           # marketing chrome (top nav + footer)
    DocsLayout.astro       # docs chrome (sidebar, breadcrumb, prev/next)
  components/
    Footer.astro, NavTools.astro, ThemeScript.astro
  content/docs/<section>/<slug>.md   # the docs content collection
  content.config.ts        # docs collection schema (title, section, order…)
  lib/nav.ts               # builds the sidebar + prev/next from frontmatter
  styles/                  # ported CSS (home.css, docs.css, docs-prose.css)
  scripts/                 # theme toggle, mobile drawer, typewriter
public/
  favicon.png
  assets/                 # logo.png, app-hero.png, and other static images
legacy-static/             # the original hand-written static mockups (reference)
```

The docs sidebar is **generated at build time** from each markdown file's
frontmatter — it is not hand-maintained. See [CONTRIBUTING.md](CONTRIBUTING.md)
for how to add or edit a docs page.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the production build
```
