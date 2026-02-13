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

  // Drawers (callback + details)
  const drawerCallback = document.getElementById("drawerCallback");
  const drawerDetails = document.getElementById("drawerDetails");
  const detailsTitle = document.getElementById("detailsTitle");
  const detailsBody = document.getElementById("detailsBody");

  let lastFocus = null;

  function openDrawer(drawerEl) {
    if (!drawerEl) return;
    lastFocus = document.activeElement;
    drawerEl.classList.add("is-open");
    drawerEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const first = drawerEl.querySelector("input,select,textarea,button,a");
    if (first) first.focus();
  }

  function closeDrawer(drawerEl) {
    if (!drawerEl) return;
    drawerEl.classList.remove("is-open");
    drawerEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  // Close on backdrop/buttons
  document.querySelectorAll("[data-close-drawer]").forEach(el => {
    el.addEventListener("click", () => {
      closeDrawer(drawerCallback);
      closeDrawer(drawerDetails);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
      closeDrawer(drawerCallback);
      closeDrawer(drawerDetails);
    }
  });

  // Open callback drawer
  document.querySelectorAll('[data-open-drawer="callback"]').forEach(btn => {
    btn.addEventListener("click", () => openDrawer(drawerCallback));
  });

  // Details content map
  const DETAILS = {
    engagement: `
      <h3>Notre engagement</h3>
      <p>
        Le Mandat Signature GTI formalise une vente structurée :
        estimation argumentée, commercialisation maîtrisée, qualification des acquéreurs,
        négociation encadrée et sécurisation jusqu’à l’acte authentique.
      </p>
      <ul>
        <li>Un cadre clair, des actions suivies</li>
        <li>Une commercialisation pilotée, pas “déposée”</li>
        <li>Une transaction sécurisée jusqu’au notaire</li>
      </ul>
    `,
    preparer: `
      <h3>Préparer</h3>
      <p>Une vente solide commence avant la première visite.</p>
      <ul>
        <li>Analyse marché + comparables réellement vendus</li>
        <li>Positionnement prix cohérent et crédible</li>
        <li>Mise en valeur : annonce structurée, visuels hiérarchisés</li>
        <li>Selon le bien : <strong>visite virtuelle 360°</strong>, <strong>vidéo</strong>, supports digitaux</li>
      </ul>
    `,
    commercialiser: `
      <h3>Commercialiser</h3>
      <p>Diffusion + pilotage : on suit la réalité du marché et on ajuste.</p>
      <ul>
        <li>Diffusion sur canaux pertinents</li>
        <li>Suivi des signaux : volume, qualité, objections</li>
        <li>Ajustements au bon moment</li>
      </ul>
    `,
    securiser: `
      <h3>Sécuriser</h3>
      <p>Notre rôle est d’aboutir à une signature, pas seulement à une offre.</p>
      <ul>
        <li>Qualification des acquéreurs (budget, financement, timing)</li>
        <li>Offres analysées : prix + conditions + solidité du dossier</li>
        <li>Coordination notaire, pièces, délais</li>
      </ul>
    `,
    pourquoi: `
      <h3>Pourquoi cette méthode est efficace</h3>
      <ul>
        <li>Un positionnement cohérent améliore la qualité des contacts</li>
        <li>Des supports clairs filtrent les visites inutiles</li>
        <li>Le pilotage évite l’essoufflement et les négociations subies</li>
        <li>La sécurisation réduit les risques de rupture</li>
      </ul>
    `,
    outils: `
      <h3>Outils & technologie</h3>
      <p>
        Nous utilisons les outils qui servent la vente — jamais l’inverse.
        Selon le bien, nous pouvons activer :
      </p>
      <ul>
        <li><strong>Visite virtuelle 360°</strong> : projection, tri, gain de temps</li>
        <li><strong>Vidéo</strong> : perception premium, compréhension du bien</li>
        <li>Supports digitaux optimisés : clarté, réassurance, précision</li>
      </ul>
    `,
    continuite: `
      <h3>Continuité de dossier</h3>
      <p>
        Vous avez un référent, et une organisation qui assure la continuité :
        coordination, retours structurés, suivi administratif et notaire.
      </p>
      <ul>
        <li>Suivi des étapes et des pièces</li>
        <li>Relances et coordination</li>
        <li>Décisions expliquées, visibilité sur l’avancement</li>
      </ul>
    `,
    honoraires: `
      <h3>Transparence des honoraires</h3>
      <p>
        Les honoraires sont définis en amont. Ils couvrent la préparation,
        la commercialisation, la négociation et la sécurisation jusqu’à l’acte.
      </p>
      <p>Tout est clair dès le départ.</p>
    `,
    acquereur: `
      <h3>Vous pouvez présenter un acquéreur</h3>
      <p>
        Si vous identifiez vous-même un acheteur, vous pouvez nous le présenter.
        Nous sécurisons alors la suite :
      </p>
      <ul>
        <li>Vérification de la solvabilité</li>
        <li>Encadrement de l’offre</li>
        <li>Suivi du dossier et coordination notariale</li>
      </ul>
      <p>
        Selon les conditions prévues au mandat, les honoraires peuvent être ajustés,
        sans modifier le niveau d’accompagnement jusqu’à la signature.
      </p>
    `,
    securisation: `
      <h3>Sécurisation de la transaction</h3>
      <ul>
        <li>Offres analysées (prix + conditions)</li>
        <li>Suivi des conditions suspensives</li>
        <li>Coordination notaire et pièces</li>
      </ul>
      <p>Objectif : conduire la transaction jusqu’à l’acte authentique.</p>
    `
  };

  // Open details drawer
  document.querySelectorAll('[data-open-drawer="details"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-drawer-title") || "Détails";
      const key = btn.getAttribute("data-drawer-content") || "";
      if (detailsTitle) detailsTitle.textContent = title;
      if (detailsBody) detailsBody.innerHTML = DETAILS[key] || "<p>Contenu indisponible.</p>";
      openDrawer(drawerDetails);
    });
  });

  // Callback form (no backend)
  const drawerForm = document.getElementById("drawerForm");
  const drawerMsg = document.getElementById("drawerMsg");

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
      setTimeout(() => closeDrawer(drawerCallback), 700);
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
})();
