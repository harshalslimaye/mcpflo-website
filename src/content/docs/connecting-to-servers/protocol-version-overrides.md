---
title: Protocol Version Overrides
section: Connecting to Servers
order: 6
description: >-
  Pin a connection to a specific MCP protocol version instead of the default
  negotiation.
---

MCP is a versioned protocol — client and server normally **negotiate** a
protocol version automatically when a connection is established. MCPFlo lets
you override this negotiation, which is useful when you need to test how a
server behaves against a specific version rather than whatever it would pick
by default.

## Where to set it

The protocol version override lives in the **Advanced** section when adding
(or editing) a server — available for both stdio and Streamable HTTP
transports.

1. Click **+ Add Server** (or edit an existing server).
2. Expand the **Advanced** section.
3. Enter the MCP protocol version you want to pin the connection to.
4. Save/reconnect — MCPFlo sends that version during the initial handshake
   instead of negotiating its own default.

## Why you'd use it

- **Compatibility testing** — confirm a server correctly supports (or
  rejects) an older protocol version it claims to support.
- **Regression testing** — verify a server's behavior hasn't changed across
  protocol versions during development.
- **Debugging negotiation issues** — if a server behaves unexpectedly,
  pinning a version helps isolate whether the problem is version-related or
  something else.

## Notes

- Leaving this field blank uses MCPFlo's default negotiation behavior — most
  users never need to touch it.
- If a server doesn't support the pinned version, the connection will fail
  or the server may respond with an error during the handshake, depending on
  how it implements version checking.
- This setting is per-server, not global — different servers can be pinned
  to different versions simultaneously.
