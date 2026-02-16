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
    mobileNav.querySelectorAll("a,button").forEach(el => el.addEventListener("click", closeMobileNav));
  }

  // Smooth scroll (only # anchors on this page)
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

  // Accordion groups
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

  // Reveal
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

  // Generic Drawer (content)
  const drawer = document.getElementById("drawer");
  const drawerTitle = document.getElementById("drawerTitle");
  const drawerSub = document.getElementById("drawerSub");
  const drawerContent = document.getElementById("drawerContent");
  let lastFocus = null;

  function openDrawerContent(key) {
    if (!drawer || !drawerTitle || !drawerSub || !drawerContent) return;
    const d = DRAWER_CONTENT[key];
    if (!d) return;

    lastFocus = document.activeElement;

    drawerTitle.textContent = d.title;
    drawerSub.textContent = d.sub || "Informations complémentaires";
    drawerContent.innerHTML = d.html;

    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const first = drawer.querySelector("button, a, input, select, textarea");
    if (first) first.focus();
  }

  function closeDrawer(el) {
    if (!el) return;
    el.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  document.querySelectorAll("[data-open-drawer]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-drawer");
      if (key === "callback") {
        openCallback();
      } else {
        openDrawerContent(key);
      }
    });
  });

  document.querySelectorAll("[data-close-drawer]").forEach(el => {
    el.addEventListener("click", () => {
      closeDrawer(drawer);
      closeCallback();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
      closeDrawer(drawer);
      closeCallback();
    }
  });

  // Callback drawer (form)
  const drawerCallback = document.getElementById("drawerCallback");
  const drawerForm = document.getElementById("drawerForm");
  const drawerMsg = document.getElementById("drawerMsg");

  function openCallback() {
    if (!drawerCallback) return;
    lastFocus = document.activeElement;
    drawerCallback.classList.add("is-open");
    drawerCallback.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const firstInput = drawerCallback.querySelector("input,select,textarea,button");
    if (firstInput) firstInput.focus();
  }

  function closeCallback() {
    if (!drawerCallback) return;
    drawerCallback.classList.remove("is-open");
    drawerCallback.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  // Form (no backend)
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
      setTimeout(() => closeCallback(), 700);
    });
  }

  // Drawer contents
  const DRAWER_CONTENT = {
    servicesDetails: {
      title: "Détail de nos services (optionnel)",
      sub: "Pour comprendre notre approche, sans alourdir la page.",
      html: `
        <p>
          Notre méthode est simple : <strong>préparer</strong>, <strong>commercialiser</strong>, <strong>sécuriser</strong>.
          L’objectif : une vente claire, pilotée, et sécurisée jusqu’à l’acte authentique.
        </p>
        <h3>Préparer</h3>
        <ul>
          <li>Estimation argumentée et compréhensible (marché local + comparables).</li>
          <li>Positionnement prix & stratégie de mise en vente (tempo, leviers, plan d’action).</li>
        </ul>
        <h3>Commercialiser</h3>
        <ul>
          <li>Mise en valeur : annonce structurée, visuels cohérents et hiérarchisés.</li>
          <li>Selon le bien : <strong>visite virtuelle 360°</strong>, <strong>vidéo</strong>.</li>
          <li>Diffusion adaptée et pilotage des retours : on ajuste au bon moment.</li>
        </ul>
        <h3>Sécuriser</h3>
        <ul>
          <li>Visites qualifiées (projet, budget, financement, délais).</li>
          <li>Offres encadrées : analyse des conditions et solidité du dossier.</li>
          <li>Suivi notaire et coordination jusqu’à l’acte.</li>
        </ul>
      `
    },
    estimation: {
      title: "Estimation stratégique",
      sub: "Une estimation utile : un prix + une stratégie.",
      html: `
        <p>
          Une estimation ne se limite pas à un chiffre. Elle sert à définir une stratégie claire :
          positionnement, timing, mise en valeur et plan d’action.
        </p>
        <ul>
          <li>Analyse du marché local + comparables pertinents.</li>
          <li>Recommandations concrètes avant mise en vente.</li>
          <li>Objectif : éviter l’usure du bien et attirer des profils sérieux.</li>
        </ul>
      `
    },
    tools: {
      title: "Mise en valeur & outils (vidéo, 360°…)",
      sub: "Pour filtrer mieux, convaincre plus vite.",
      html: `
        <p>
          La présentation influence la qualité des demandes. Selon le bien et le marché,
          nous activons les outils qui créent de la confiance et de la projection.
        </p>
        <ul>
          <li>Annonce structurée : claire, rassurante, complète.</li>
          <li>Visuels hiérarchisés : cohérence, ordre, lisibilité.</li>
          <li><strong>Visite virtuelle 360°</strong> : projection, tri qualitatif, gain de temps.</li>
          <li><strong>Vidéo</strong> : perception, compréhension, mise en valeur.</li>
        </ul>
      `
    },
    security: {
      title: "Sécurisation jusqu’à l’acte",
      sub: "Offre acceptée ≠ vente : on sécurise la suite.",
      html: `
        <p>
          La réussite d’une vente se joue autant après l’offre que pendant la commercialisation.
          On encadre, on suit, on coordonne.
        </p>
        <ul>
          <li>Qualification acquéreur : projet, budget, financement, timing.</li>
          <li>Analyse des offres : conditions, solidité du dossier, points de vigilance.</li>
          <li>Suivi notaire : pièces, délais, conditions suspensives.</li>
          <li>Objectif : aller jusqu’à l’acte, sans flottement.</li>
        </ul>
      `
    }
  };
})();
