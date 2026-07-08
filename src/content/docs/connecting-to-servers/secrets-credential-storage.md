---
title: Secrets & Credential Storage
section: Connecting to Servers
order: 4
description: >-
  OAuth tokens, environment variables, and request headers are encrypted at
  rest via the OS keychain and never exposed to the UI.
---

MCPFlo handles several kinds of sensitive values on your behalf: OAuth
tokens, environment variables (for stdio servers), and request headers (for
Streamable HTTP servers, e.g. bearer tokens). All of them are encrypted at
rest and kept out of the parts of the app that don't need them.

## How secrets are protected

- **Encrypted with the OS keychain.** Secrets are encrypted using Electron's
  [`safeStorage`](https://www.electronjs.org/docs/latest/api/safe-storage)
  API, which is backed by your operating system's native credential store:
  - macOS: Keychain
  - Windows: DPAPI
  - Linux: Secret Service (via `libsecret`), where available
- **Never leave the main process.** Encryption and decryption happen
  entirely in Electron's main process. The renderer (the UI you interact
  with) only ever sees a **server ID** — never the raw secret value.
- **Not stored in plain text in config.** `config.json` (see
  [Quickstart](/docs/getting-started/quickstart)) holds server metadata like
  names, commands, and URLs, but sensitive values are stored in their
  encrypted form, not as plain text.

## What counts as a secret

| Value                                  | Where it's used                 | Encrypted?          |
| -------------------------------------- | ------------------------------- | ------------------- |
| OAuth access/refresh tokens            | Streamable HTTP + OAuth servers | Yes                 |
| Environment variables                  | stdio servers                   | Yes                 |
| Request headers (e.g. `Authorization`) | Streamable HTTP servers         | Yes                 |
| Server name, command, args, URL        | All servers                     | No (not sensitive)  |

## Practical implications

- You can safely share a screenshot of the sidebar or server list — server
  names, commands, and URLs are visible, but tokens and header values are
  not rendered anywhere in the UI once saved.
- If you inspect `config.json` directly, secret fields will appear as
  ciphertext, not the original value.
- Removing a server clears its stored secrets along with its configuration
  and cached capabilities.
- Because encryption is tied to `safeStorage` and your OS user account, a
  copied `config.json` generally can't be decrypted on a different machine
  or under a different OS user account.

## Related

- See
  [Authentication & OAuth 2.1](/docs/connecting-to-servers/authentication-oauth)
  for how tokens are obtained in the first place.
- For the broader hardening model — sandboxed renderer, IPC validation,
  navigation restrictions — see the
  [project repository](https://github.com/harshalslimaye/mcpflo).
