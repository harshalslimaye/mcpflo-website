---
title: MCP Client/Session/Transport Layer
navLabel: MCP Client Layer
section: Architecture
order: 2
description: >-
  A tour of src/main/mcp/ — session pooling, transport construction,
  protocol version pinning, OAuth, and handler wiring.
---

This is the heart of MCPFlo's main process — everything involved in
establishing, maintaining, and calling into an MCP connection lives here.
Each file has a narrow, specific job.

```
src/main/mcp/
├── types.ts             Shared internal types (Session, handlers, ActiveCall)
├── transportFactory.ts  Builds the SDK transport for stdio or Streamable HTTP
├── protocolVersion.ts   Pins the negotiated protocol version, if overridden
├── oauthHandshake.ts    Drives the OAuth 2.1 authorization-code + PKCE flow
├── session.ts           Owns the pool of live sessions, one per server
├── sessionWiring.ts     Wires notification/elicitation/sampling handlers onto a Client
└── toolCalls.ts         Invokes tools over a warm session
```

## `session.ts` — the session pool

Live sessions are kept in a `Map<serverId, Promise<Session>>`, keyed by
server ID. Storing the **promise** rather than the resolved session means
concurrent first-callers share a single in-flight connection attempt
instead of racing to spawn duplicate processes for the same server. A warm
session is reused across calls until it's disconnected or dies;
`resolveSession` treats a failed connection as simply absent, so a prior
failure doesn't wedge the pool.

Connecting a fresh session composes the other files in this directory: it
builds a transport (`transportFactory`), pins a protocol version if one was
set (`protocolVersion`), goes through the OAuth handshake if needed
(`oauthHandshake`), and wires up handlers (`sessionWiring`) — see
[Cancelling & Refreshing Discovery](/docs/browsing-capabilities/cancelling-refreshing-discovery)
for how an `AbortSignal` passed into this path lets an in-flight connect be
cancelled.

## `transportFactory.ts` — building the transport

`createTransport(config)` switches on `config.transport.type` to construct
either a `StdioClientTransport` or a `StreamableHTTPClientTransport` from
the MCP SDK. For stdio, it deliberately does **not** inherit the full host
environment — only a safe baseline (PATH, HOME, etc.) via
`getDefaultEnvironment()`, with `PATH` corrected via `resolveShellPath()`
(see [Process Model](/docs/architecture/process-model) → `shellPath.ts`) so
tools like `npx` resolve correctly, then layers the user's explicitly
configured environment variables on top. This means secrets living in
MCPFlo's own process environment can never leak into a spawned server.
Everything downstream of transport construction works against the SDK's
generic `Transport` interface, so the rest of the session logic is
transport-agnostic.

## `protocolVersion.ts` — version pinning

The MCP SDK hardcodes its latest supported protocol version into every
`initialize` request with no built-in option to request a different one.
`pinRequestedProtocolVersion(client, version)` works around this by
intercepting the client's own `request()` method and rewriting the
`protocolVersion` param specifically on outgoing `initialize` calls — a
single seam that covers stdio, plain Streamable HTTP, and OAuth reconnects
alike. This is what powers
[Protocol Version Overrides](/docs/connecting-to-servers/protocol-version-overrides).

## `oauthHandshake.ts` — the OAuth flow

Drives the authorization-code + PKCE flow described in
[Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth):
builds an OAuth-aware transport, starts a loopback listener to capture the
redirect, and coordinates with `oauthProvider.ts` and `oauthStore.ts` (one
level up, in `src/main/`) for Dynamic Client Registration and encrypted
token storage. `assertCredentialSafe` (imported from `transportFactory.ts`)
enforces the cleartext-HTTP restriction for non-loopback hosts.

## `sessionWiring.ts` — handlers

`wireSession` attaches the pieces of an MCP session that react to
server-initiated messages rather than client-initiated calls:

- Protocol housekeeping notifications the server may emit at any point
  (e.g. right after the handshake, while registering capability-gated
  tools).
- `elicitation/create` requests, routed to an `ElicitationHandler` — see
  [Elicitation](/docs/invoking-tools-and-prompts/elicitation).
- `sampling/createMessage` requests, routed to a `SamplingHandler` — see
  [Sampling](/docs/invoking-tools-and-prompts/sampling).

## `toolCalls.ts` — invoking tools

`callTool()` invokes a tool over a session's warm, pooled connection,
obtained via `getSession()`. Calls to the **same** server are
serialized — a session has a single `active` call slot that the
transport's notification taps and elicitation handler read from — so an
in-flight call unambiguously owns that slot. Calls to **different** servers
run fully independently, so a slow call to one server never blocks
another. This is what backs
[Live Notifications](/docs/invoking-tools-and-prompts/live-notifications),
and the serialization detail is why a single server's history entries are
always chronological.

## `types.ts` — shared internal shapes

Defines the internal `Session`, `ActiveCall`, `ElicitationHandler`, and
`SamplingHandler` types used across the files above — each handler type
carries an `AbortSignal` so a server-side cancellation (e.g. the server's
own elicitation timeout firing) can unwind the client-side wait cleanly.

## Related

- See [Process Model](/docs/architecture/process-model) for how this
  directory fits into the main process as a whole.
- See
  [Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth),
  [Elicitation](/docs/invoking-tools-and-prompts/elicitation), and
  [Sampling](/docs/invoking-tools-and-prompts/sampling) for the
  user-facing behavior these files implement.
