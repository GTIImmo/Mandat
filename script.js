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

  // Drawers
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

  // Details content (MANDAT-centric)
  const DETAILS = {
    contenu_mandat: `
      <h3>Le contenu du Mandat Signature</h3>
      <p class="detailsLead">
        Un mandat conçu pour piloter la vente, filtrer les visites, encadrer les offres et sécuriser jusqu’à l’acte.
      </p>

      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Préparer</strong>
            <span class="detailsTag">Stratégie</span>
          </div>
          <ul>
            <li>Estimation argumentée & positionnement cohérent</li>
            <li>Conseils concrets avant lancement</li>
            <li>Mise en valeur qui inspire confiance</li>
          </ul>
        </div>

        <div class="detailsCard">
          <div class="detailsK">
            <strong>Commercialiser</strong>
            <span class="detailsTag">Pilotage</span>
          </div>
          <ul>
            <li>Diffusion adaptée au bien et au secteur</li>
            <li>Pilotage selon les retours et objections</li>
            <li>Ajustements au bon moment</li>
          </ul>
        </div>

        <div class="detailsCard">
          <div class="detailsK">
            <strong>Sécuriser</strong>
            <span class="detailsTag">Jusqu’à l’acte</span>
          </div>
          <ul>
            <li>Visites qualifiées (budget, financement, timing)</li>
            <li>Offres encadrées (prix + conditions + solidité)</li>
            <li>Coordination notaire, pièces, délais</li>
          </ul>
        </div>
      </div>
    `,

    preparer: `
      <h3>I — Préparer</h3>
      <p class="detailsLead">On lance une commercialisation efficace quand le positionnement est clair.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Prix & stratégie</strong>
            <span class="detailsTag">Positionnement</span>
          </div>
          <ul>
            <li>Analyse du marché local</li>
            <li>Positionnement crédible</li>
            <li>Objectif : attirer les bons profils</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Mise en valeur</strong>
            <span class="detailsTag">Confiance</span>
          </div>
          <ul>
            <li>Annonce claire, complète, rassurante</li>
            <li>Visuels cohérents et hiérarchisés</li>
            <li>Moins de visites inutiles</li>
          </ul>
        </div>
      </div>
    `,

    commercialiser: `
      <h3>II — Commercialiser</h3>
      <p class="detailsLead">Diffuser, oui. Mais surtout piloter : mesurer et ajuster.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Diffusion</strong>
            <span class="detailsTag">Visibilité</span>
          </div>
          <ul>
            <li>Canaux adaptés au bien</li>
            <li>Présentation cohérente</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Pilotage</strong>
            <span class="detailsTag">Actions</span>
          </div>
          <ul>
            <li>Analyse des retours et objections</li>
            <li>Ajustements au bon moment</li>
            <li>Objectif : garder l’efficacité</li>
          </ul>
        </div>
      </div>
    `,

    securiser: `
      <h3>III — Sécuriser</h3>
      <p class="detailsLead">Le mandat vise l’acte authentique : le reste est une étape.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Offres encadrées</strong>
            <span class="detailsTag">Analyse</span>
          </div>
          <ul>
            <li>Conditions, solidité, financement</li>
            <li>Négociation structurée</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Suivi notaire</strong>
            <span class="detailsTag">Acte</span>
          </div>
          <ul>
            <li>Coordination pièces / délais</li>
            <li>Suivi des conditions suspensives</li>
            <li>Conduire jusqu’à la signature</li>
          </ul>
        </div>
      </div>
    `,

    outils: `
      <h3>Outils & technologie</h3>
      <p class="detailsLead">Nous activons les outils qui servent réellement la vente, selon le bien.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Visite virtuelle 360°</strong>
            <span class="detailsTag">Projection</span>
          </div>
          <ul>
            <li>Meilleure compréhension du bien</li>
            <li>Tri naturel des demandes</li>
            <li>Gain de temps sur les visites</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Vidéo</strong>
            <span class="detailsTag">Premium</span>
          </div>
          <ul>
            <li>Perception plus qualitative</li>
            <li>Contexte & volumes mieux compris</li>
            <li>Aide à la décision</li>
          </ul>
        </div>
      </div>
    `,

    pourquoi: `
      <h3>Pourquoi ça marche</h3>
      <p class="detailsLead">Une vente performante repose sur 3 principes : clarté, exécution, sécurisation.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Clarté</strong>
            <span class="detailsTag">Cadre</span>
          </div>
          <ul>
            <li>Positionnement crédible = meilleurs contacts</li>
            <li>Présentation claire = moins de visites inutiles</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Exécution</strong>
            <span class="detailsTag">Pilotage</span>
          </div>
          <ul>
            <li>On ajuste selon la réalité du marché</li>
            <li>On évite l’essoufflement</li>
          </ul>
        </div>
      </div>
    `,

    cadre_fixe: `
      <h3>Ce que le mandat fixe</h3>
      <p class="detailsLead">Un cadre clair pour piloter la vente et protéger la cohérence de la commercialisation.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Un plan de vente</strong>
            <span class="detailsTag">Méthode</span>
          </div>
          <ul>
            <li>Étapes, actions, suivi</li>
            <li>Décisions expliquées</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Une cohérence</strong>
            <span class="detailsTag">Valeur</span>
          </div>
          <ul>
            <li>Commercialisation structurée</li>
            <li>Objectif : vendre dans de bonnes conditions</li>
          </ul>
        </div>
      </div>
    `,

    acquereur: `
      <h3>Vous pouvez présenter un acquéreur</h3>
      <p class="detailsLead">Vous restez acteur : si vous identifiez un acheteur, vous pouvez nous le présenter.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>On sécurise la suite</strong>
            <span class="detailsTag">Dossier</span>
          </div>
          <ul>
            <li>Analyse de la solvabilité</li>
            <li>Encadrement de l’offre</li>
            <li>Suivi notaire jusqu’à l’acte</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Honoraires ajustés</strong>
            <span class="detailsTag">Mandat</span>
          </div>
          <p>
            Selon les conditions prévues au mandat, les honoraires peuvent être ajustés,
            sans modifier le niveau d’accompagnement jusqu’à la signature.
          </p>
        </div>
      </div>
    `,

    securisation: `
      <h3>Sécurisation jusqu’à l’acte</h3>
      <p class="detailsLead">Encadrer les offres et conduire le dossier jusqu’à la signature authentique.</p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Offres</strong>
            <span class="detailsTag">Conditions</span>
          </div>
          <ul>
            <li>Conditions, délais, financement</li>
            <li>Négociation structurée</li>
          </ul>
        </div>
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Notaire</strong>
            <span class="detailsTag">Acte</span>
          </div>
          <ul>
            <li>Coordination des pièces</li>
            <li>Relances et respect des délais</li>
            <li>Objectif : acte authentique</li>
          </ul>
        </div>
      </div>
    `,

    continuite: `
      <h3>Comment on assure la continuité</h3>
      <p class="detailsLead">
        L’idée n’est pas “de parler de l’entreprise”, mais de rendre le mandat plus fiable : suivi, coordination, continuité.
      </p>
      <div class="detailsGrid">
        <div class="detailsCard">
          <div class="detailsK">
            <strong>Continuité</strong>
            <span class="detailsTag">Suivi</span>
          </div>
          <ul>
            <li>Un référent + une organisation de suivi</li>
            <li>Retours structurés et décisions expliquées</li>
            <li>Coordination dossier / notaire</li>
          </ul>
        </div>
      </div>
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
