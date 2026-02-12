(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

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
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMobileNav(); });
  }

  // Smooth scroll with header offset
  const header = document.getElementById("siteHeader");
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
      const group = d.getAttribute("data-acc-group");
      allDetails.forEach(other => {
        if (other !== d && other.getAttribute("data-acc-group") === group) other.open = false;
      });
    });
  });

  // Mini form (no backend)
  const miniForm = document.getElementById("miniForm");
  const miniMsg = document.getElementById("miniMsg");
  if (miniForm && miniMsg) {
    miniForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const prenom = miniForm.querySelector('input[name="prenom"]')?.value?.trim();
      const tel = miniForm.querySelector('input[name="tel"]')?.value?.trim();
      if (!prenom || !tel) {
        miniMsg.textContent = "⚠️ Prénom et téléphone requis.";
        return;
      }
      miniMsg.textContent = "✅ Merci ! On vous rappelle très rapidement.";
      miniForm.reset();
    });
  }

  // Contact form (no backend)
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  if (form && msg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const prenom = form.querySelector('input[name="prenom"]')?.value?.trim();
      const tel = form.querySelector('input[name="tel"]')?.value?.trim();

      if (!prenom || !tel) {
        msg.textContent = "⚠️ Merci de renseigner votre prénom et votre téléphone.";
        return;
      }
      msg.textContent = "✅ Merci ! Votre demande est bien envoyée. Nous vous recontactons très rapidement.";
      form.reset();
    });
  }

  // Reveal on scroll
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add("is-in");
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-in"));
  }
})();
