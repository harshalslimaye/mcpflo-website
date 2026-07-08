---
title: 'Process Model: Main / Preload / Renderer / Shared'
navLabel: Process Model
section: Architecture
order: 1
description: >-
  MCPFlo's Electron process split — main, preload, renderer, and shared —
  and the trust boundary between them.
---

MCPFlo is an Electron app, so its codebase follows Electron's standard
multi-process split — each with a distinct responsibility and trust
boundary. This is the map for anyone contributing to the app itself.

```
src/
├── main/        Electron main process — IPC, MCP client, OAuth, persistence, caching
├── preload/     Typed bridge between main and renderer
├── renderer/    React UI (sidebar, detail views, stores, RJSF forms)
└── shared/      Types shared across processes (MCP schemas, configs)
```

## `src/main` — the main process

Runs with full Node.js/OS access and owns everything sensitive or stateful.
Key areas:

- **`mcp/`** — the MCP client layer: `session.ts` / `sessionWiring.ts`
  (connection lifecycle), `transportFactory.ts` (stdio vs. Streamable
  HTTP), `toolCalls.ts`, `protocolVersion.ts`, `oauthHandshake.ts`.
- **`mcpClient.ts`** — higher-level client orchestration on top of `mcp/`.
- **`oauthProvider.ts` / `oauthStore.ts`** — OAuth 2.1 flow implementation
  and token storage.
- **`secrets.ts`** — encryption/decryption via `safeStorage`, used for
  tokens, env vars, and headers (see
  [Secrets & Credential Storage](/docs/connecting-to-servers/secrets-credential-storage)).
- **`store.ts`** — `electron-store`-backed persistence for `config.json`.
- **`capabilitiesCache.ts`** — the per-server capabilities cache on disk
  (see [Capabilities Cache](/docs/configuration-reference/capabilities-cache)).
- **`ipc.ts`** — registers all IPC handlers the renderer calls into.
- **`elicitations.ts` / `samplings.ts`** — server-initiated
  elicitation/sampling request handling.
- **`pendingRequests.ts`** — tracks in-flight requests (supports
  [Cancelling & Refreshing Discovery](/docs/browsing-capabilities/cancelling-refreshing-discovery)).
- **`serverId.ts`, `shellPath.ts`/`fixPath.ts`, `openExternal.ts`** —
  server ID generation, PATH fixes for spawned processes (mainly macOS),
  and the scheme-allowlisted external-link opener.
- **`index.ts`** — main process entry point.

Because this process spawns untrusted server processes and holds decrypted
secrets in memory, it's the security-critical half of the app (see the
README's **Security** section).

## `src/preload` — the bridge

A minimal, typed bridge (`index.ts` + `index.d.ts`) exposed to the renderer
via Electron's context isolation. It defines exactly which main-process
operations the UI is allowed to call — nothing more. Secrets never cross
this bridge in decrypted form; the renderer only ever receives server IDs
and non-sensitive metadata.

## `src/renderer` — the UI

A React 19 + TypeScript app, sandboxed in Chromium with no direct Node/OS
access — everything it needs goes through the preload bridge. Structure:

- **`components/`** — organized by feature area: `sidebar/`, `server(s)/`,
  `tool/` (including `tool/rjsf/` for schema-driven forms), `resource/`,
  `prompt/`, `auth/`, `elicitation/`, `sampling/`, `trace/` (call
  history/replay), `canvas/`, `layout/`, and `shared/` (including
  `shared/json/` for the JSON tree view).
- **`stores/`** — [Zustand](https://zustand-demo.pmnd.rs/) state stores.
- **`lib/`** — renderer-side utilities.
- **`types/`** — renderer-local types.

This maps closely to the feature categories in the rest of these docs — e.g.
[Browsing Capabilities](/docs/browsing-capabilities/capability-tree) lives
largely in `sidebar/` and `server(s)/`,
[Invoking Tools & Prompts](/docs/invoking-tools-and-prompts/invocation-forms)
in `tool/`, `resource/`, `prompt/`, `elicitation/`, and `sampling/`, and
[History & Workflow](/docs/history-and-workflow/call-history) in `trace/`.

## `src/shared` — cross-process types

Types and constants used by both main and renderer, so the two sides agree
on shapes without duplicating definitions:

- **`mcp.types.ts`** — shared MCP protocol types.
- **`protocolVersions.ts`** — supported protocol version constants (backs
  [Protocol Version Overrides](/docs/connecting-to-servers/protocol-version-overrides)).
- **`transportSafety.ts`** — shared validation, e.g. enforcing the
  cleartext-HTTP OAuth restriction (see
  [Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth)).

## Related

- See
  [MCP Client/Session/Transport Layer](/docs/architecture/mcp-client-layer)
  for a deeper look at `src/main/mcp/`.
- See [State Management](/docs/architecture/state-management) for how
  `renderer/stores/` is organized.
- See [IPC Bridge Design](/docs/architecture/ipc-bridge-design) for how
  `preload/` and `ipc.ts` fit together.
