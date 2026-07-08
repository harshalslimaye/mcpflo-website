---
title: Troubleshooting Connections
section: Connecting to Servers
order: 7
description: >-
  Common issues you might hit when connecting to an MCP server, and where
  to look.
---

Common issues you might hit when connecting to an MCP server in MCPFlo, and
where to look.

## stdio servers

**Server fails to start / immediately disconnects**

- Verify the **command** is correct and available on your `PATH` — MCPFlo
  spawns the process using the exact command and args you provided.
- If using `npx`, confirm the package name and version are correct; a typo
  fails silently until the process exits.
- Check that required **environment variables** are set — a missing API key
  or config value is a common cause of an immediate crash.

**Process hangs on "connecting"**

- The server may be slow to start (e.g. downloading a package on first
  `npx` run) — give it a moment before assuming failure.
- If it never resolves, increase the **connection timeout** in the server's
  Advanced section.
- Cancel the discovery (see
  [Cancelling & Refreshing Discovery](/docs/browsing-capabilities/cancelling-refreshing-discovery))
  and retry.

**Process becomes orphaned**

- MCPFlo cleans up spawned processes on remove/quit; if one lingers after a
  crash, restart MCPFlo or manually terminate it from your OS process
  manager.

## Streamable HTTP servers

**Connection refused / times out**

- Confirm the URL is reachable (try it in a browser or with `curl`).
- Check for a firewall, VPN, or proxy blocking the request.
- Increase the connection timeout in Advanced settings if the server is
  known to be slow to respond.

**401 / 403 errors**

- For header-based auth, confirm the `Authorization` header value is
  correct and hasn't expired.
- For OAuth-protected servers, check the **Auth panel** in the server detail
  view — the token may have expired; sign out and reconnect to trigger a
  fresh sign-in.

**OAuth sign-in doesn't complete**

- Confirm your default browser opened and you completed sign-in there.
- The redirect is captured by a local loopback listener — if another
  process is bound to the same port, or a firewall blocks localhost
  traffic, the redirect can't be captured. Retry after freeing the port.
- OAuth is refused over cleartext HTTP for non-loopback hosts by design —
  if the server's authorization endpoint isn't `https://`, the connection
  will be rejected.

## Protocol negotiation

- If you've set a **protocol version override** and the server doesn't
  support it, the handshake will fail. Clear the override to fall back to
  normal negotiation.

## General

- Removing and re-adding the server resets its connection state and cached
  capabilities, which resolves most stuck states.
- Cached capabilities are stored per server under
  `<user-data>/servers/<server-id>/capabilities.json` — deleting this file
  forces a fresh discovery on next connect if you suspect a stale cache.
- If none of the above resolves it, check for a known issue or file one on
  the [issue tracker](https://github.com/harshalslimaye/mcpflo/issues).
