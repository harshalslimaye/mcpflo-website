---
title: Custom Tests Folder
section: Testing
order: 6
description: >-
  Point a server's test scripts and saved requests at a folder of your
  own choosing, instead of MCPFlo's app-data directory.
---

By default, a server's test scripts and saved requests live under
MCPFlo's own app-data directory. The **Tests Folder** card — on the
server's Overview tab — lets you point them at a folder of your own
choosing instead, e.g. one you keep in version control alongside the
server's source.

## Default location

Without any configuration, a server's tests live at:

```
<userData>/tests/<server-id>/
```

Where `<userData>` is the same per-OS application data directory used for
`config.json` (see
[Config File Location & Format](/docs/configuration-reference/config-file)).

## Choosing a custom folder

1. Open the server's **Overview** tab and expand the **Tests Folder** card
   (collapsed by default — it's a settings affordance, not primary
   content).
2. Click **Choose folder…** — a native OS folder picker opens.
3. Pick (or create) a folder. It's used **as-is** — no `server-id`
   subfolder is appended underneath it, unlike the default location.

Once set, the card shows a **Custom** badge, and every script/saved-request
read or write for this server goes to that folder instead.

## Switching back to the default

Click **Use default** (shown only while a custom folder is set) to clear
the override — the server reverts to `<userData>/tests/<server-id>/`.

## If the custom folder goes missing

If a configured custom folder has been moved or deleted, the card shows a
warning instead of silently falling back:

> **Folder not found** — This folder may have been moved or deleted. Test
> scripts won't be found or saved until you choose a new folder or switch
> back to the default.

MCPFlo deliberately does **not** redirect to the default location on your
behalf in this case — a write would otherwise recreate a folder at a path
you explicitly chose to move away from. You decide: pick a new folder, or
explicitly switch back to default.

## Why you'd use this

- **Version-controlling test scripts** alongside the server's own source,
  instead of leaving them in app-private storage.
- **Sharing scripts with teammates** — point everyone's MCPFlo install at
  the same checked-out folder.
- **Keeping tests server-specific but portable** — moving a project's
  folder between machines carries its tests with it.

## Related

- See [Where Test Files Live on Disk](/docs/testing/where-test-files-live-on-disk)
  for the exact file layout inside either location.
- Switching between default and custom only changes _where_ scripts and
  saved requests are read from and written to — the file layout inside
  either location is identical.
