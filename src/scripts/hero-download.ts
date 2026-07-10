import { detectOS } from "./os-detect";

(function () {
  const link = document.getElementById("hero-download") as HTMLAnchorElement | null;
  const label = document.getElementById("hero-download-label");
  const platform = document.getElementById("hero-platform");
  const size = document.getElementById("hero-size");
  if (!link || !label || !platform || !size) return;

  const os = detectOS();

  if (os === "windows") {
    link.href = link.dataset.winHref!;
    label.textContent = link.dataset.winLabel!;
    platform.textContent = link.dataset.winPlatform!;
    size.textContent = link.dataset.winSize!;
  } else if (os === "android") {
    link.href = link.dataset.androidHref!;
    label.textContent = link.dataset.androidLabel!;
    platform.textContent = link.dataset.androidPlatform!;
    size.textContent = link.dataset.androidSize!;
  }
})();
