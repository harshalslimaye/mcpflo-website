---
title: 'Dev Setup: Node/npm Versions, npm run dev'
navLabel: Dev Setup
section: Contributing
order: 1
description: >-
  Clone, install, and run MCPFlo locally for development.
---

Everything you need to get MCPFlo running locally for development.

## Requirements

- **Node.js 18+**
- **npm 9+**

## Clone and install

```bash
git clone https://github.com/harshalslimaye/mcpflo.git
cd mcpflo
npm install
```

`npm install` also sets up **Husky** git hooks — notably a `pre-push` hook
that runs `npm test`, so pushes with failing tests are caught before they
leave your machine.

## Run the app

```bash
npm run dev
```

This starts MCPFlo via `electron-vite` in development mode, with hot
reload for the renderer.

## Other useful scripts

```bash
npm test            # run the test suite once
npm run test:watch  # run tests in watch mode
npm run e2e          # build and run the Playwright e2e suite
npm run typecheck   # type-check main and renderer
npm run lint        # lint with ESLint
npm run format      # format with Prettier
```

## First run

A fresh dev instance behaves the same as a packaged install — it's seeded
with the bundled test-fixture server, `@mcpflo/server-everything`, so you
have something to connect to immediately without configuring an external
MCP server (see
[Quickstart: Add Your First Server](/docs/getting-started/quickstart)).

## Related

- See [Project Structure](/docs/contributing/project-structure) for how
  the codebase is organized once you're in it.
- See [Running the e2e Suite](/docs/contributing/e2e-suite) for driving
  the app end-to-end with Playwright.
