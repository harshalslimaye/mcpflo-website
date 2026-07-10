---
title: Where Test Files Live on Disk
section: Testing
order: 7
description: >-
  The on-disk file layout for test scripts and saved requests — one file
  per test item, under a single root directory per server.
---

Test scripts and saved requests are stored as plain files — no database,
nothing binary — one file per test item, under a single root directory
per server.

## Root directory

- **Default:** `<userData>/tests/<server-id>/`
- **Custom:** whatever folder you picked via the Tests Folder card (used
  as-is, no `server-id` subfolder appended) — see
  [Custom Tests Folder](/docs/testing/custom-tests-folder).

## Layout under the root

```
<root>/
├── tool/
│   ├── <encodeURIComponent(toolName)>.test.js
│   └── <encodeURIComponent(toolName)>.requests.json
├── resource/
│   ├── <encodeURIComponent(resourceName)>.test.js
│   └── <encodeURIComponent(resourceName)>.requests.json
└── prompt/
    ├── <encodeURIComponent(promptName)>.test.js
    └── <encodeURIComponent(promptName)>.requests.json
```

- One subfolder per capability kind: `tool/`, `resource/`, `prompt/`.
- A capability's name is `encodeURIComponent`-encoded into the filename,
  so names containing slashes or other special characters still produce
  a single, safe filename.
- A capability with no saved script has no `.test.js` file; one with no
  saved requests has no `.requests.json` file — neither is created just
  to sit empty.

## File formats

**`.test.js`** — the raw script text, exactly as typed in the Tests tab
editor. Plain JavaScript, evaluated inside an isolated sandbox with no
network or filesystem access.

**`.requests.json`**:

```json
{
  "requests": [
    {
      "id": "5f2b...-uuid",
      "name": "Happy path",
      "args": { "query": "hello" },
      "createdAt": 1731000000000,
      "updatedAt": 1731000000000
    }
  ],
  "testRequestId": "5f2b...-uuid"
}
```

- `requests` — every saved request for this capability, in creation
  order.
- `testRequestId` — which single request (if any) is marked "use for
  tests"; absent if none is marked.

## Behavior worth knowing

- **Deleting, not emptying** — clearing a script's content, or removing
  every saved request, deletes the corresponding file rather than
  leaving an empty one on disk.
- **Atomic writes** — every write goes through a temp-file-then-rename,
  so a crash mid-write can't corrupt a script or requests file.
- **Permissions** — `.requests.json` files are set to `0o600` (owner
  read/write only) after writing, since saved arguments may include
  values you'd consider sensitive.
- **Corrupt files degrade gracefully** — an unparseable or wrong-shaped
  `.requests.json` is treated as "no saved requests" rather than
  surfacing an error, so a bad hand-edit or a sync-conflict copy doesn't
  break the app.
- **Safe even with a bad `name`** — every path is resolved and checked
  against the root before use, so a capability name can never cause a
  read/write to land outside the tests folder.

## Related

- See [Custom Tests Folder](/docs/testing/custom-tests-folder) for how
  the root directory itself is chosen.
- See [Saved Requests](/docs/testing/saved-requests) for how
  `.requests.json`'s contents are edited from the UI.
