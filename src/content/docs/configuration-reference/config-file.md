---
title: Config File Location & Format
section: Configuration Reference
order: 1
description: >-
  Where config.json lives on each OS, what it stores, and how to back it up
  or migrate it.
---

MCPFlo persists your server configurations to a single `config.json` file
on disk, managed via
[electron-store](https://github.com/sindresorhus/electron-store). This page
is the reference for where that file lives and what it contains.

## File location

| Platform | Path                                                |
| -------- | ---------------------------------------------------- |
| macOS    | `~/Library/Application Support/MCPFlo/config.json`  |
| Windows  | `%APPDATA%/MCPFlo/config.json`                      |
| Linux    | `~/.config/MCPFlo/config.json`                      |

## What's stored

- Server entries — name, transport type, command/args or URL, and any
  non-secret settings (protocol version override, connection timeout,
  etc.)
- App-level preferences (e.g. theme choice)

## What's _not_ stored in plain text

Sensitive values — OAuth tokens, environment variables, and request
headers — are stored in **encrypted form**, not as plain text, even though
they live in the same file. See
[Secrets & Credential Storage](/docs/connecting-to-servers/secrets-credential-storage)
for how this encryption works and why it can't be decrypted on a different
machine.

## Editing the file directly

`config.json` is a plain JSON file and can technically be edited by hand
while MCPFlo is closed, but this isn't the supported workflow:

- Non-secret fields (name, command, args, URL) can generally be edited
  safely.
- Encrypted fields will not decrypt correctly if hand-edited or copied from
  another machine/user account.
- Malformed JSON will likely prevent MCPFlo from loading your server list on
  next launch.

Prefer adding/editing servers through the UI, or via **JSON import** (see
[Importing Servers via JSON](/docs/connecting-to-servers/importing-servers-json)),
which validates input before saving.

## Backing up / migrating

To move your server list to another machine:

1. Copy `config.json` from the source machine.
2. Note that **encrypted secrets will not transfer** — you'll need to
   re-enter tokens/headers/env vars, or re-authenticate via OAuth, on the
   new machine.
3. Non-secret fields (server names, commands, URLs) will carry over as-is.

## Related

- See [Capabilities Cache](/docs/configuration-reference/capabilities-cache)
  for the separate per-server cache directory, which is distinct from this
  config file.
- See
  [Secrets & Credential Storage](/docs/connecting-to-servers/secrets-credential-storage)
  for the encryption model.
