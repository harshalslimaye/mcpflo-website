// Mobile contents drawer for the docs sidebar (ported from the original docs.js).
(function () {
  const sb = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");
  const ct = document.getElementById("contentsToggle");
  function close() {
    if (sb) sb.classList.remove("open");
  }
  if (ct)
    ct.addEventListener("click", function () {
      if (sb) sb.classList.toggle("open");
    });
  if (scrim) scrim.addEventListener("click", close);
})();
