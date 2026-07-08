---
title: Authentication & OAuth 2.1
section: Connecting to Servers
order: 3
description: >-
  MCPFlo handles OAuth 2.1 automatically — authorization-code + PKCE, Dynamic
  Client Registration, and keychain-encrypted tokens.
---

Streamable HTTP servers that require authentication can use a static header
(see
[Importing Servers via JSON](/docs/connecting-to-servers/importing-servers-json))
or full **OAuth 2.1**. MCPFlo handles the OAuth flow automatically — you
don't need to manually obtain or paste a token.

## How it works

1. Add a Streamable HTTP server without an `Authorization` header.
2. Expand the server row in the sidebar for the first time.
3. If the server requires OAuth, MCPFlo:
   - Opens your system's default browser to the server's authorization page.
   - Uses the **authorization-code + PKCE** flow (no client secret
     required).
   - Captures the redirect on a local **loopback listener** (per
     [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252) — the
     standard for native app OAuth).
   - Exchanges the code for tokens and reconnects the server automatically.
4. Sign in once in the browser tab that opens, then return to MCPFlo — the
   connection completes on its own.

## Dynamic Client Registration

MCPFlo registers itself as an OAuth client with the server automatically,
using **Dynamic Client Registration (DCR)** — no manual client setup
required for servers that support it.

If a server **doesn't** support DCR, MCPFlo falls back to a **manual Client
ID** field, which you can enter in the server's auth settings.

## The Auth panel

Every OAuth-connected server has an **Auth panel** in its server detail
view, showing:

- Current session / token status
- Token expiry
- Granted scopes
- A **sign-out** action, one click away

## Security notes

- OAuth tokens are **encrypted at rest** using the OS keychain
  (`safeStorage`) and never leave the main process — the UI only ever sees a
  server ID, not the token itself.
- MCPFlo **refuses OAuth over cleartext HTTP** for any non-loopback host —
  only `https://` (or `http://localhost`) authorization endpoints are
  accepted.

## Troubleshooting

- **Browser doesn't open** — check that MCPFlo has permission to open
  external URLs on your OS; the scheme is restricted to an allowlist for
  security.
- **Stuck on "connecting"** — the loopback listener may be blocked by a
  firewall or another process bound to the same port; retry or restart the
  app.
- **Server doesn't support DCR** — enter a Client ID manually in the
  server's auth settings, if the server operator has issued one to you out
  of band.
