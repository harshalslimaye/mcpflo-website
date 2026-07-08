---
title: 'Running the E2E Suite: Playwright'
navLabel: Running the E2E Suite
section: Contributing
order: 3
description: >-
  MCPFlo's Playwright suite drives the real packaged app against a real
  test-fixture MCP server.
---

MCPFlo's end-to-end tests drive the actual packaged Electron app using
[Playwright](https://playwright.dev/), exercising real user flows against a
real MCP server rather than mocks.

## Running it

```bash
npm run e2e
```

This builds the app and runs the full Playwright suite against it.

## What it tests against

The suite connects to **`@mcpflo/server-everything`**
(`packages/server-everything`) — MCPFlo's own bundled test-fixture MCP
server, which deterministically exercises the full protocol surface
(tools, resources, prompts, elicitation, sampling, notifications). Using a
real, purpose-built server instead of mocks means the e2e suite validates
the actual MCP client/session/transport code path, not just the UI in
isolation.

## Structure (`e2e/`)

```
e2e/
├── app.spec.ts               General app-level flows
├── fixtures.ts                Shared Playwright fixtures/setup
├── servers/
│   └── manage.spec.ts        Adding/removing/managing servers
└── everything/                Specs per capability of server-everything
    ├── tools/                 One spec per tool (echo, get-sum, trigger-elicitation-request, trigger-sampling-request, gzip-file-as-resource, ...)
    ├── resources/              One spec per resource (architecture, features, how-it-works, ...)
    └── prompts/                One spec per prompt (simple, args, completable, resource)
```

The `everything/` specs map roughly 1:1 to server-everything's exposed
capabilities — when the fixture server gains a new tool/resource/prompt, a
corresponding spec is expected alongside it.

## What this suite is good for

- **Regression coverage on core flows** — connecting a server, invoking a
  tool, reading a resource, rendering a prompt, handling
  elicitation/sampling requests — all against a real MCP connection.
- **Verifying protocol-level features** — since server-everything
  deliberately exercises things like elicitation and sampling, the e2e
  suite is where those flows get true end-to-end coverage (UI → IPC →
  main-process MCP client → real server → back).

## Related

- See [Dev Setup](/docs/contributing/dev-setup) for other available
  scripts (`npm test`, `npm run typecheck`, etc.).
- See [Project Structure](/docs/contributing/project-structure) for where
  `e2e/` sits relative to the rest of the repo.
