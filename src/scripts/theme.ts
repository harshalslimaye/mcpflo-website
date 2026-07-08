// Theme toggle — shared by the marketing and docs layouts.
// The initial theme is applied inline in <head> (see ThemeScript) to avoid a flash.
(function () {
  const root = document.documentElement;
  const KEY = "mcpflo-home-theme";
  const tbtn = document.getElementById("theme-toggle");
  if (tbtn)
    tbtn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
    });
})();
