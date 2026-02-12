(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu (robuste + jamais ouvert en desktop)
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobileNav");

  function closeMobileNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }

  function openMobileNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
  }

  if (burger && mobileNav) {
    closeMobileNav();

    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      expanded ? closeMobileNav() : openMobileNav();
    });

    // click lien => ferme
    mobileNav.addEventListener("click", (e) => {
      if (e.target && e.target.matches("a")) closeMobileNav();
    });

    // ESC => ferme
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });

    // si on repasse en desktop => on force fermé
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMobileNav();
    });
  }

  // Accordions (cartes + FAQ)
  const accordions = document.querySelectorAll("[data-accordion]");
  accordions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const acc = btn.parentElement?.querySelector(".acc") || btn.nextElementSibling;
      if (!acc) return;
      const willOpen = acc.hidden === true;
      acc.hidden = !willOpen;
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    },
    { threshold: 0.14 }
  );
  reveals.forEach((el) => io.observe(el));

  // Drawer (callback)
  const drawer = document.getElementById("drawerCallback");
  const openBtns = document.querySelectorAll('[data-open-drawer="callback"]');
  const closeBtns = drawer ? drawer.querySelectorAll("[data-close-drawer]") : [];

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtns.forEach((b) => b.addEventListener("click", openDrawer));
  closeBtns.forEach((b) => b.addEventListener("click", closeDrawer));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Forms (demo)
  function handleSubmit(form) {
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      console.log("Callback form payload:", payload);

      const btn = form.querySelector('button[type="submit"]');
      const old = btn ? btn.textContent : null;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Envoyé ✅";
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = old || "Envoyer";
        }, 1600);
      }
      form.reset();
      closeDrawer();
      alert("Merci ! Nous vous recontactons rapidement.");
    });
  }

  handleSubmit(document.getElementById("callbackForm"));
  handleSubmit(document.getElementById("contactForm"));
})();
