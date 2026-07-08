// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mcpflo.app',
  markdown: {
    // The docs design uses a simple monochrome terminal look for code blocks
    // rather than full syntax highlighting; we style <pre>/<code> ourselves.
    syntaxHighlight: false,
  },
});
