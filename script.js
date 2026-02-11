(() => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.querySelector(".burger");
  const mobile = document.querySelector(".mobile");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  // Smooth open animation for accordions (visual polish)
  // (CSS handles most; here we add a tiny class to animate on open)
  document.querySelectorAll("details").forEach(d => {
    d.addEventListener("toggle", () => {
      if (d.open) {
        d.classList.add("just-opened");
        setTimeout(() => d.classList.remove("just-opened"), 250);
      }
    });
  });

  // Simple form feedback (no backend)
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");
  if (form && msg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msg.textContent = "✅ Merci ! Votre demande est bien envoyée. Nous vous recontactons très rapidement.";
      form.reset();
    });
  }
})();
