// Typewriter headline on the landing page (ported from the original index.html).
(function () {
  const el = document.getElementById("typed");
  if (!el) return;
  const text = "Test your MCP servers. Without the guesswork.";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = text;
    return;
  }
  let i = 0;
  function step() {
    if (i <= text.length) {
      el!.textContent = text.slice(0, i);
      i++;
      setTimeout(step, 34);
    }
  }
  setTimeout(step, 220);
})();
