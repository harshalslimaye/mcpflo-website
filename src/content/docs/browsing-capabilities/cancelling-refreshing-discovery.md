---
title: Cancelling & Refreshing Discovery
section: Browsing Capabilities
order: 4
description: >-
  Abort a slow or stuck capability discovery without affecting other
  connected servers.
---

When you expand a server, MCPFlo triggers **capability discovery** — a
round-trip to the server asking it to list its tools, resources, and
prompts. Most servers respond quickly, but a slow, unresponsive, or
misbehaving server can leave that request hanging.

## Cancelling a slow fetch

If a server's discovery is taking too long:

1. Locate the server row (or its loading indicator) in the sidebar.
2. Use the **cancel** action to abort the in-flight discovery request.
3. The server row returns to a non-connected state, ready to retry.

This means one slow or stuck server doesn't block you from browsing or
working with your other connected servers — the discovery request is scoped
per-server and cancelling it doesn't affect anything else.

## When you'd use this

- **A server hangs during development** — common when you're actively
  iterating on a server and it's temporarily in a broken state; cancel and
  retry once you've fixed it, without restarting MCPFlo.
- **A remote Streamable HTTP server is unreachable** — rather than waiting
  out a long timeout, cancel immediately and check connectivity.
- **You expanded the wrong server** — cancel before it finishes if you
  didn't mean to trigger discovery.

## After cancelling

- Re-expand the server row to retry discovery from scratch.
- If it continues to hang, see
  [Troubleshooting Connections](/docs/connecting-to-servers/troubleshooting-connections)
  for connection-specific diagnostics (stdio process issues, HTTP timeouts,
  etc.).
- You can also raise the **connection timeout** in the server's Advanced
  settings if the server is simply slow rather than stuck — see
  [Protocol Version Overrides](/docs/connecting-to-servers/protocol-version-overrides)
  for where the Advanced section lives.
