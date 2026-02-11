document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("formMessage").innerText =
  "Merci ! Nous vous recontactons très rapidement.";
  this.reset();
});
