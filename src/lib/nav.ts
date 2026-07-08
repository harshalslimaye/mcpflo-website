import { getCollection, type CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

// Fixed top-level section ordering for the sidebar / reading flow.
// Sections not listed here are appended afterwards, alphabetically.
export const SECTION_ORDER = [
  "Getting Started",
  "Connecting to Servers",
  "Browsing Capabilities",
  "Invoking Tools & Prompts",
  "History & Workflow",
  "Configuration Reference",
  "Architecture",
  "Contributing",
  "FAQ & Troubleshooting",
];

function sectionRank(section: string): number {
  const i = SECTION_ORDER.indexOf(section);
  return i === -1 ? SECTION_ORDER.length : i;
}

/** All docs in reading order: by section, then by `order` within a section. */
export async function getSortedDocs(): Promise<DocEntry[]> {
  const docs = await getCollection("docs");
  return docs.sort((a, b) => {
    const sr = sectionRank(a.data.section) - sectionRank(b.data.section);
    if (sr !== 0) return sr;
    if (a.data.section !== b.data.section)
      return a.data.section.localeCompare(b.data.section);
    return a.data.order - b.data.order;
  });
}

export interface NavItem {
  id: string;
  href: string;
  label: string;
}
export interface NavGroup {
  section: string;
  items: NavItem[];
}

/** Sidebar groups, generated from the collection's frontmatter at build time. */
export async function getNavGroups(): Promise<NavGroup[]> {
  const docs = await getSortedDocs();
  const groups: NavGroup[] = [];
  for (const doc of docs) {
    let group = groups.find((g) => g.section === doc.data.section);
    if (!group) {
      group = { section: doc.data.section, items: [] };
      groups.push(group);
    }
    group.items.push({
      id: doc.id,
      href: `/docs/${doc.id}`,
      label: doc.data.navLabel ?? doc.data.title,
    });
  }
  return groups;
}

/** Previous / next page in reading order, relative to the given doc id. */
export async function getPrevNext(id: string): Promise<{
  prev: DocEntry | null;
  next: DocEntry | null;
}> {
  const docs = await getSortedDocs();
  const idx = docs.findIndex((d) => d.id === id);
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx >= 0 && idx < docs.length - 1 ? docs[idx + 1] : null,
  };
}
