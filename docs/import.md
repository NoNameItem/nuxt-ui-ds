# Importing the kit into Claude Design

## What you need

- Access to [Claude Design](https://claude.ai/design).
- The `kit/` folder of this repository: clone the repository, or use **Code → Download ZIP**
  on GitHub and unpack it. `main` has the kit for the latest supported Nuxt UI version; for
  another version, take the tag named after it (`v4.11.1`). Do not rename, edit or re-save files inside `kit/`: the import is
  checked byte by byte.

## Import

1. In Claude Design, start creating a new design system (the **Set up your design system**
   wizard).
2. Attach the whole `kit/` folder — all 425 files, keeping the folder structure. Paths
   matter: `components/`, `lib/`, `tokens/`, `guidelines/`, `source/`, `ui_kits/` and the
   files at the root (`_ds_bundle.js`, `_ds_manifest.json` and the rest) must land at the
   same relative paths.
3. Paste this text as the request:

   ```text
   The attached files are a finished design system exported from another Claude Design project: a port of @nuxt/ui 4.11.1, 425 files (components/, lib/, tokens/, guidelines/, source/, ui_kits/, _ds_bundle.js, _ds_manifest.json and the rest). It is already built and verified.

   Place the files as they are, at the same relative paths, byte for byte. Do not generate, rewrite, extend or rebuild anything. If some file could not be placed, list those files, but do not recreate their contents yourself.
   ```

4. Send it and wait until the platform finishes.

## Signs of success

- The design system appears under **Choose design systems** above the chat input of a
  project.
- Component cards — for example Button, Select, Card, Modal — open and render in both the
  light and the dark theme.

## If something goes wrong

- **The platform returned an error, or placed only some of the files.** Create a new design
  system and attach the folder again. [Verify](#verify) shows which files are missing.
- **The platform agent started generating or rewriting components.** Stop it: a regenerated
  kit is not the verified one. Start over and paste the request text exactly as above.

## Do not let the platform rebuild the kit

`_ds_bundle.js` exposes all components under one global name. The platform derived that
name from the design system's name and the id of the project where the bundle was built, and
the same name is written into 18 files of the kit: 14 component cards (`*.card.html`) and
4 `ui_kits/*.jsx`. As long as the bundle is not rebuilt, everything is consistent.

If the platform agent edits the kit in your project, it rebuilds the bundle. The new bundle
may get a different global name, and those 18 files stop finding the components. So:

- do not ask the platform agent to modify the imported kit;
- if the bundle was rebuilt anyway, import `kit/` again into a new design system.

## Verify

### By eye

Open a few cards in both themes and compare them with the
[Nuxt UI documentation](https://ui.nuxt.com/docs/components): Button, Select, Card, Modal.
Variants, sizes and colors should match.

### File by file

This checks that every file of `kit/` reached your project with the same size. You need
Node.js 22 or newer and [Claude Code](https://claude.com/claude-code) with the
`claude-design` MCP server connected. No `pnpm install` is needed.

1. Open Claude Code in the root of this repository and ask:

   ```text
   Using the claude-design MCP, find my design system project named "<the name you gave the design system>", call list_files for it with depth -1, and save the JSON array it returns, exactly as returned, to dist/import-listing.json. Then run: node pipeline/kit-export.mjs check-import dist/import-listing.json
   ```

2. The last line should read `matched: 425 of 425`, with no missing, extra or differing
   files. `.thumbnail` is ignored: the platform generates it itself.

If files are missing or differ, import the kit again.
