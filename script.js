(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobileNav");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  // UTM capture
  const params = new URLSearchParams(location.search);
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
  utmKeys.forEach(k => {
    const el = document.getElementById(k);
    if (el) el.value = params.get(k) || "";
  });

  // Guide 20s -> prefill form
  const gCity = document.getElementById("g_city");
  const gType = document.getElementById("g_type");
  const gDelay = document.getElementById("g_delay");
  const gCta = document.getElementById("g_cta");

  function prefillFromGuide() {
    const addr = document.querySelector('[name="address"]');
    const type = document.querySelector('[name="property_type"]');
    const delay = document.querySelector('[name="delay"]');
    if (addr && gCity?.value) addr.value = gCity.value.trim();
    if (type && gType?.value) type.value = gType.value;
    if (delay && gDelay?.value) delay.value = gDelay.value;
  }
  if (gCta) gCta.addEventListener("click", () => prefillFromGuide());

  // Smart form toggle
  const form = document.getElementById("smartForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");
  const toggleBtns = document.querySelectorAll(".toggle__btn");
  const fieldSlot = document.getElementById("field_slot");

  let mode = "estimation";

  function setMode(next) {
    mode = next;
    toggleBtns.forEach(b => b.classList.toggle("is-active", b.dataset.mode === mode));
    if (fieldSlot) fieldSlot.hidden = (mode !== "rappel");
    if (submitBtn) submitBtn.textContent = (mode === "rappel") ? "Demander un rappel" : "Demander une estimation";
  }
  toggleBtns.forEach(btn => btn.addEventListener("click", () => setMode(btn.dataset.mode)));
  setMode("estimation");

  // Endpoint: connect later (Apps Script / Brevo)
  const ENDPOINT = ""; // <-- colle ici l'URL de ton Apps Script Web App (POST JSON)

  function isBot(data){
    return (data.website && String(data.website).trim().length > 0);
  }

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Envoi…";

      const data = Object.fromEntries(new FormData(form).entries());
      data.mode = mode;

      // Prefill from guide
      prefillFromGuide();

      if (isBot(data)) {
        status.textContent = "✅ Merci !";
        form.reset();
        return;
      }

      try {
        if (!ENDPOINT) {
          await new Promise(r => setTimeout(r, 450));
          form.reset();
          status.textContent = "✅ Merci ! Nous vous recontactons très rapidement.";
          return;
        }

        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        form.reset();
        status.textContent = "✅ Merci ! Demande envoyée. On revient vers vous rapidement.";
      } catch (err) {
        console.error(err);
        status.textContent = "❌ Oups. Impossible d’envoyer. Réessayez ou appelez l’agence.";
      }
    });
  }
})();
