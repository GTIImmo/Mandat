(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Header shadow on scroll
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobileNav");

  function closeMobileNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobileNav));
  }

  // Smooth scroll with header offset
  const headerH = () => header ? header.getBoundingClientRect().height : 0;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = window.scrollY + target.getBoundingClientRect().top - headerH() - 12;
      window.scrollTo({ top, behavior: "smooth" });
      closeMobileNav();
    });
  });

  // Accordion groups: only one open per group
  const allDetails = Array.from(document.querySelectorAll("details[data-acc-group]"));
  allDetails.forEach(d => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      const g = d.getAttribute("data-acc-group");
      allDetails.forEach(o => {
        if (o !== d && o.getAttribute("data-acc-group") === g) o.open = false;
      });
    });
  });

  // Drawer (callback)
  const drawer = document.getElementById("callbackDrawer");
  const openBtns = document.querySelectorAll('[data-open-drawer="callback"]');
  const closeEls = drawer ? drawer.querySelectorAll("[data-close-drawer]") : [];

  function openDrawer() {
    if (!drawer) return;
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // focus first input
    setTimeout(() => {
      const input = drawer.querySelector("input,button,textarea,select");
      if (input) input.focus();
    }, 50);
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtns.forEach(b => b.addEventListener("click", openDrawer));
  closeEls.forEach(el => el.addEventListener("click", closeDrawer));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  // Fake submit handlers (à brancher sur ton back)
  const leadForm = document.getElementById("leadForm");
  const cbForm = document.getElementById("callbackForm");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Merci ! Votre demande a bien é
