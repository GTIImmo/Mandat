// script.js (identique, inchangé)
(() => {
  // ====== CONFIG (mets ton vrai numéro ici) ======
  const PHONE = "+33400000000"; // <-- remplace par ton numéro (format +33...)

  document.querySelectorAll("[data-phone-link]").forEach(a => {
    a.setAttribute("href", `tel:${PHONE}`);
  });

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

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

    mobileNav.querySelectorAll("a,button").forEach(el => el.addEventListener("click", closeMobileNav));
  }

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

  const drawer = document.getElementById("drawerCallback");
  const drawerForm = document.getElementById("drawerForm");
  const drawerMsg = document.getElementById("drawerMsg");

  let lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const firstInput = drawer.querySelector("input,select,textarea,button");
    if (firstInput) firstInput.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  document.querySelectorAll('[data-open-drawer="callback"]').forEach(btn => {
    btn.addEventListener("click", openDrawer);
  });

  document.querySelectorAll("[data-close-drawer]").forEach(el => {
    el.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
      closeDrawer();
    }
  });

  if (drawerForm && drawerMsg) {
    drawerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const prenom = drawerForm.querySelector('input[name="prenom"]')?.value?.trim();
      const tel = drawerForm.querySelector('input[name="tel"]')?.value?.trim();
      if (!prenom || !tel) {
        drawerMsg.textContent = "⚠️ Prénom et téléphone requis.";
        return;
      }
      drawerMsg.textContent = "✅ Merci ! On vous rappelle très rapidement.";
      drawerForm.reset();
      setTimeout(closeDrawer, 700);
    });
  }

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
})();
