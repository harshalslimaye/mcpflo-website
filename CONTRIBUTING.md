# Contributing

The MCPFlo website is an [Astro](https://astro.build) project. The marketing
pages live in `src/pages/`, and the documentation lives in a content
collection under `src/content/docs/`.

## Editing the docs

Each docs page is a single markdown file at:

```
src/content/docs/<section>/<slug>.md
```

where `<section>` is the section directory (`getting-started`, `core-concepts`,
or `guides`) and `<slug>` becomes the page's URL (`/docs/<section>/<slug>`).

Every file starts with frontmatter that drives the sidebar, breadcrumb, and
prev/next links — **you don't edit the sidebar by hand**, it's generated from
this frontmatter at build time:

```markdown
---
title: Calling Tools        # page title + default sidebar label
navLabel: Calling tools     # optional shorter sidebar label
section: Guides             # sidebar group heading
order: 3                    # sort order within the section
description: ...            # optional one-line summary under the title
---

## First heading

Body content in standard markdown…
```

Notes:

- Don't repeat the title as a top-level `# Heading` in the body — the title
  comes from frontmatter. Start the body at `##`.
- To add a new page, drop a new `.md` file in the right section directory with
  `title`, `section`, and `order`. It appears in the sidebar automatically.
- Section order is fixed in `src/lib/nav.ts` (`SECTION_ORDER`); item order
  within a section is the `order` field.
- Link between docs pages with absolute routes, e.g. `[Results](/docs/guides/results)`.

## Running locally

```bash
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # production build into dist/
```

## Submitting changes

1. Create a branch.
2. Make your edit and check it with `npm run dev`.
3. Open a pull request.

Every docs page has an **Edit this page on GitHub** link at the bottom that
takes you straight to the source file for that page.
