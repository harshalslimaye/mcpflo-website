// Mobile nav-links dropdown, toggled via the hamburger button in the navbar.
(function () {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  function close() {
    toggle!.classList.remove("open");
    links!.classList.remove("open");
    toggle!.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", function (e) {
    if ((e.target as HTMLElement).tagName === "A") close();
  });
})();
