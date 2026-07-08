import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Docs content collection.
// Each markdown file lives at src/content/docs/<section-dir>/<slug>.md and its
// frontmatter drives the sidebar navigation, breadcrumb, and prev/next links.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    // Page title (also the sidebar link label unless navLabel is set).
    title: z.string(),
    // Sidebar group heading, e.g. "Getting Started", "Core Concepts", "Guides".
    section: z.string(),
    // Sort order within the section (ascending).
    order: z.number(),
    // Optional shorter label for the sidebar link.
    navLabel: z.string().optional(),
    // Optional one-line summary shown under the page title.
    description: z.string().optional(),
  }),
});

export const collections = { docs };
