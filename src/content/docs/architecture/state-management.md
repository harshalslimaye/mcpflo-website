---
title: State Management
section: Architecture
order: 3
description: >-
  Zustand stores in src/renderer/stores/ — server state, theme, transient
  UI state, and error toasts.
---

The renderer uses [Zustand](https://zustand-demo.pmnd.rs/) for state, kept
in `src/renderer/stores/`. Rather than one monolithic store, state is split
into a small number of focused stores, each owning a distinct concern.

```
src/renderer/stores/
├── serverStore.ts   Servers, capabilities, call history, live protocol events
├── themeStore.ts     Light/dark theme, persisted to localStorage
├── uiStore.ts        Transient UI state (e.g. sidebar collapsed)
└── errorStore.ts      App-level error toasts
```

## `serverStore.ts` — the core store

The largest and most central store, holding everything related to
connected servers and their activity:

- Server configs, loaded server state, and cached capabilities
  (`ServerConfig`, `LoadedServer`, `MCPServer`, `CachedCapabilities`).
- Outcomes of tool calls, resource reads, and prompt gets
  (`ToolCallOutcome`, `ResourceReadOutcome`, `PromptGetOutcome`) — this is
  what backs [Call History](/docs/history-and-workflow/call-history),
  capped via a shared `pushCapped`/`capResponse` helper from
  `lib/historyRecord.ts` (see
  [Call History](/docs/history-and-workflow/call-history) for the
  50-entry limit this enforces).
- Live, in-flight protocol activity: tool-call notifications, elicitation
  requests/results, sampling requests/results, and auth events — these
  drive [Live Notifications](/docs/invoking-tools-and-prompts/live-notifications),
  [Elicitation](/docs/invoking-tools-and-prompts/elicitation), and
  [Sampling](/docs/invoking-tools-and-prompts/sampling).
- Server auth state (`ServerAuthState`, `AuthEvent`) — backs the **Auth
  panel** described in
  [Server Detail View & Token Estimator](/docs/browsing-capabilities/server-detail-view).

Operational failures that talk to the main process (an IPC call rejecting,
a hydrate that can't read the cache) are routed to `errorStore` via a local
`reportError` helper — kept distinct from server-protocol errors, which are
recorded as part of a call's history entry instead of surfacing as a toast.

## `themeStore.ts` — theme

Holds the current `light`/`dark` theme, persisted directly to
`localStorage` (key `mcpflo-theme`, independent of `config.json`) and
applied by setting a `data-theme` attribute on the document root. Defaults
to `dark` if nothing is stored yet. Backs
[Light & Dark Themes](/docs/history-and-workflow/light-dark-themes).

## `uiStore.ts` — transient UI state

Small, presentation-only state that doesn't belong in the server
store — currently just whether the sidebar is collapsed, also persisted to
`localStorage` (key `mcpflo-sidebar-collapsed`).

## `errorStore.ts` — error toasts

A queue of transient `ErrorToast` entries (each with an `id` and
`message`), auto-dismissed after a fixed TTL (6 seconds). This is MCPFlo's
_own_ operational failures — a failed IPC call, a store write that
threw — as opposed to server-protocol errors, which have their own home in
history records rather than a toast.

## Why split this way

Separating **server/protocol state** (serverStore) from **app-level
concerns** (theme, UI, errors) keeps the store that changes most often —
and is most performance-sensitive, given live notifications and history —
isolated from simple, rarely-changing preference state.

## Related

- See [Process Model](/docs/architecture/process-model) for how
  `renderer/` fits into the app as a whole.
- See [Call History](/docs/history-and-workflow/call-history) and
  [Live Notifications](/docs/invoking-tools-and-prompts/live-notifications)
  for the user-facing features `serverStore` implements.
