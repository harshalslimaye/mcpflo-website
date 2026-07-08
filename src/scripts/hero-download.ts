import { detectOS } from "./os-detect";

(function () {
  const link = document.getElementById("hero-download") as HTMLAnchorElement | null;
  const label = document.getElementById("hero-download-label");
  const platform = document.getElementById("hero-platform");
  const size = document.getElementById("hero-size");
  if (!link || !label || !platform || !size) return;

  if (detectOS() !== "windows") return;

  link.href = link.dataset.winHref!;
  label.textContent = link.dataset.winLabel!;
  platform.textContent = link.dataset.winPlatform!;
  size.textContent = link.dataset.winSize!;
})();
