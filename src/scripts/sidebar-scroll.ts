// Docs pages are separate full-page loads, so the sidebar remounts fresh on
// every navigation and scrolls to the top by default. Re-center it on the
// active page's link so the current section stays in view.
(function () {
  const sidebar = document.getElementById("sidebar");
  const active = sidebar?.querySelector<HTMLAnchorElement>(".sb-link.active");
  if (!sidebar || !active) return;

  const offset =
    active.offsetTop - sidebar.clientHeight / 2 + active.clientHeight / 2;
  sidebar.scrollTop = Math.max(0, offset);
})();
