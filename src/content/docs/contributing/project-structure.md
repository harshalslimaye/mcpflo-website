---
title: Project Structure
section: Contributing
order: 2
description: >-
  A map of the repository for anyone contributing to MCPFlo itself.
---

A map of the repository for anyone contributing to MCPFlo itself.

```
mcpflo/
├── src/
│   ├── main/        Electron main process — IPC, MCP client, OAuth, persistence, caching
│   │   └── mcp/     Session/transport/protocol-version/OAuth-handshake logic
│   ├── preload/     Typed bridge between main and renderer
│   ├── renderer/    React UI (sidebar, detail views, stores, RJSF forms)
│   │   ├── components/  Feature-organized UI (server, tool, resource, prompt, auth, elicitation, sampling, trace, sidebar, ui, shared)
│   │   ├── stores/       Zustand state (serverStore, themeStore, uiStore, errorStore)
│   │   ├── lib/          Renderer-side utilities
│   │   └── types/        Renderer-local types
│   ├── shared/      Types shared across processes (MCP schemas, protocol versions, transport safety)
│   └── test/        Shared test setup/utilities
├── packages/
│   └── server-everything/   Test-fixture MCP server used by the e2e suite
├── e2e/             Playwright end-to-end specs
├── docs/images/     README assets (logo, screenshots)
├── README.md
├── CONTRIBUTING.md
└── CHANGELOG.md     Auto-generated via standard-version
```

## Where to look for what

| If you're changing...                          | Look in                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| How a server connects (stdio/HTTP/OAuth)         | `src/main/mcp/`, `src/main/oauthProvider.ts`, `src/main/oauthStore.ts`     |
| What the renderer can call in main               | `src/preload/index.ts` + `src/main/ipc.ts`                                 |
| A specific UI feature (e.g. tool forms)          | `src/renderer/components/<feature>/`                                       |
| App-wide state                                   | `src/renderer/stores/`                                                     |
| Types shared between main and renderer           | `src/shared/`                                                              |
| Config/capability persistence                    | `src/main/store.ts`, `src/main/capabilitiesCache.ts`                       |
| Secret handling                                  | `src/main/secrets.ts`                                                      |
| The bundled test server                          | `packages/server-everything/`                                              |
| End-to-end test coverage                         | `e2e/`                                                                     |

## Conventions

- Each `src/main/*.ts` module generally has a co-located `*.test.ts`
  (Vitest) — see files like `capabilitiesCache.test.ts`,
  `oauthHandshake.test.ts`, `sessionWiring.test.ts` alongside their
  implementations.
- `src/renderer/components/` is organized **by feature**, not by component
  type — e.g. everything related to prompts lives in `prompt/`, everything
  related to elicitation in `elicitation/`, rather than grouping all forms
  together or all modals together.

## Related

- See [Process Model](/docs/architecture/process-model) for what each
  top-level `src/` directory is responsible for.
- See
  [MCP Client/Session/Transport Layer](/docs/architecture/mcp-client-layer)
  for a closer look at `src/main/mcp/`.
- See [State Management](/docs/architecture/state-management) for
  `src/renderer/stores/`.
