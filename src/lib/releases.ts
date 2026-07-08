const repo = "https://github.com/harshalslimaye/mcpflo";

export const version = "0.1.0";
export const releaseDate = "July 3, 2026";
export const releaseUrl = `${repo}/releases/tag/v${version}`;
export const releasesIndexUrl = `${repo}/releases`;

const dl = (asset: string) => `${repo}/releases/download/v${version}/${asset}`;

export interface Build {
  label: string;
  size: string;
  href: string;
}

export const builds = {
  mac: {
    id: "mac",
    name: "macOS",
    primary: { label: "Download for Apple Silicon (.dmg)", size: "132.5 MB", href: dl("mcpflo-0.1.0-arm64.dmg") } as Build,
  },
  windows: {
    id: "windows",
    name: "Windows",
    primary: { label: "Download for Windows x64 (.exe)", size: "111.0 MB", href: dl("mcpflo-0.1.0-x64-setup.exe") } as Build,
    secondary: { label: "Windows ARM64 (.exe)", size: "112.7 MB", href: dl("mcpflo-0.1.0-arm64-setup.exe") } as Build,
  },
};

export { repo };
