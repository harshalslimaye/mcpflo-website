import { detectOS } from "./os-detect";

(function () {
  const os = detectOS();
  if (os === "other") return;

  const card = document.querySelector(`.platform-card[data-platform="${os}"]`);
  if (!card) return;

  card.classList.add("is-recommended");
  const badge = document.createElement("span");
  badge.className = "badge mono";
  badge.textContent = "Recommended for you";
  card.prepend(badge);
})();
