:root{
  --bg:#ffffff;
  --soft:#f6f7fb;
  --text:#0f1115;
  --muted:rgba(15,17,21,.72);
  --muted2:rgba(15,17,21,.56);
  --line:rgba(15,17,21,.10);

  --accent:#b31252;
  --accent2:#0b6b63;

  --shadow: 0 18px 60px rgba(15,17,21,.10);
  --shadow2: 0 10px 30px rgba(15,17,21,.08);
  --shadow3: 0 6px 18px rgba(15,17,21,.06);

  --r:18px;
  --r2:26px;
  --container:1140px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  color:var(--text);
  background:var(--bg);
  line-height:1.55;
}
a{color:inherit;text-decoration:none}
.container{width:min(var(--container),calc(100% - 44px));margin:0 auto}
.muted{color:var(--muted)}
.micro{font-size:12px;color:var(--muted2);margin-top:10px;font-weight:800}

/* Topbar */
.topbar{
  position:sticky;top:0;z-index:60;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,.88);
  border-bottom:1px solid var(--line);
}
.topbar__inner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0}

.brand{display:flex;align-items:center;gap:12px;min-width:260px}
.brand__logo{height:32px;width:auto;display:block;filter: grayscale(100%)}
.brand__txt{display:flex;flex-direction:column;line-height:1.1}
.brand__name{font-weight:950;letter-spacing:.2px}
.brand__sub{font-size:12px;color:var(--muted2);font-weight:850}

/* Nav */
.nav{display:flex;align-items:center;gap:14px;color:var(--muted);font-weight:850}
.nav a{padding:8px 10px;border-radius:14px}
.nav a:hover{background:rgba(15,17,21,.05);color:var(--text)}

.burger{
  display:none;width:44px;height:44px;border-radius:16px;
  background:rgba(15,17,21,.03);
  border:1px solid var(--line);
  cursor:pointer;
}
.burger span{display:block;width:18px;height:2px;background:rgba(15,17,21,.65);margin:5px auto;border-radius:99px}

.mobileNav{border-top:1px solid var(--line);background:rgba(255,255,255,.94)}
.mobileNav__inner{display:flex;flex-direction:column;gap:10px;padding:14px 0 18px}
.mobileNav__inner a{padding:10px 12px;border-radius:14px;color:var(--muted);font-weight:900}
.mobileNav__inner a:hover{background:rgba(15,17,21,.05);color:var(--text)}

/* Buttons */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:12px 16px;border-radius:16px;font-weight:950;
  border:1px solid rgba(179,18,82,.18);
  background:linear-gradient(135deg, rgba(179,18,82,1), rgba(179,18,82,.85));
  color:#fff;
  box-shadow:0 10px 24px rgba(179,18,82,.16);
  transition:transform .15s ease, filter .15s ease;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.02)}
.btn--ghost{
  background:rgba(15,17,21,.03);
  border:1px solid var(--line);
  color:var(--text);
  box-shadow:none;
}
.btn--small{padding:10px 12px;border-radius:14px}

/* Hero */
.hero{
  padding:54px 0 24px;
  background:
    radial-gradient(900px 520px at 10% -10%, rgba(179,18,82,.08), transparent 62%),
    radial-gradient(900px 520px at 92% 10%, rgba(11,107,99,.06), transparent 62%),
    #fff;
}
.hero__grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:start}

.chip{
  display:inline-flex;align-items:center;
  padding:8px 12px;border-radius:999px;
  border:1px solid var(--line);
  background:rgba(15,17,21,.03);
  font-weight:950;width:fit-content;
}
h1{
  font-size:clamp(32px,4.2vw,56px);
  line-height:1.03;margin:14px 0 12px;letter-spacing:-.035em;
}
.lead{color:var(--muted);font-size:18px;max-width:82ch;margin:0 0 12px;font-weight:850}
.lead--small{font-size:16px}
.hero__cta{display:flex;gap:12px;flex-wrap:wrap;margin:14px 0 14px}

.callout{
  border:1px solid var(--line);
  background:linear-gradient(135deg, rgba(11,107,99,.08), rgba(179,18,82,.06));
  padding:14px;border-radius:18px;
  box-shadow:var(--shadow3);
}
.callout__title{font-weight:950;margin-bottom:6px}
.callout__text{color:rgba(15,17,21,.88);font-weight:850}

.hero__pills{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.pill{
  border:1px solid var(--line);
  background:rgba(255,255,255,.92);
  border-radius:18px;
  padding:12px;
  box-shadow:var(--shadow3);
}
.pill__k{font-weight:950;font-size:12px;color:rgba(15,17,21,.65);text-transform:uppercase;letter-spacing:.03em}
.pill__v{margin-top:6px;font-weight:900;color:rgba(15,17,21,.92)}

.mediaCard{
  margin:0;border-radius:var(--r2);overflow:hidden;
  border:1px solid rgba(15,17,21,.08);
  background:#fff;
  box-shadow:var(--shadow);
}
.mediaCard__frame{position:relative}
.mediaCard img{width:100%;height:380px;object-fit:cover;display:block}
.mediaCard__grad{position:absolute;inset:0;background:linear-gradient(180deg, rgba(15,17,21,0) 42%, rgba(15,17,21,.22) 100%)}
.mediaCard__badge{
  position:absolute;left:12px;top:12px;
  padding:8px 10px;border-radius:999px;
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  font-weight:950;font-size:12px;
  box-shadow:var(--shadow3);
}
.mediaCard figcaption{padding:12px 14px;color:var(--muted);font-weight:900;background:rgba(255,255,255,.94)}

.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.kpi{
  padding:14px;border-radius:18px;
  background:rgba(15,17,21,.03);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.kpi__n{font-weight:950;font-size:20px;letter-spacing:-.02em}
.kpi__t{color:var(--muted2);font-weight:900;font-size:13px;margin-top:4px}

/* Sections */
.section{padding:68px 0}
.section--soft{
  background:var(--soft);
  border-top:1px solid rgba(15,17,21,.08);
  border-bottom:1px solid rgba(15,17,21,.08);
}
.section__head{display:flex;flex-direction:column;gap:10px;margin-bottom:22px}
.section__head h2{margin:0;font-size:clamp(22px,3vw,34px);letter-spacing:-.02em}
.section__head p{margin:0;color:var(--muted);max-width:95ch;font-weight:850}

/* Cards & grids */
.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.card{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.card h3{margin:0 0 8px}
.card p{margin:0;color:var(--muted);font-weight:850}

/* Steps */
.steps{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.step{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.step__top h3{margin:0 0 6px}
.step__top p{margin:0;color:var(--muted);font-weight:850}

/* Split panels */
.split{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.panel{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.panel h3{margin:0 0 8px}
.panel p{margin:0 0 10px;color:var(--muted);font-weight:850}

/* Engagement */
.engagement{display:grid;grid-template-columns:1.15fr .85fr;gap:12px;align-items:start}
.engagement__main,.engagement__aside{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.mini{
  border:1px solid rgba(15,17,21,.10);
  border-radius:18px;
  padding:14px;
  background:
    radial-gradient(500px 220px at 20% 0%, rgba(179,18,82,.08), transparent 60%),
    rgba(255,255,255,.92);
  margin-bottom:10px;
}
.mini__t{font-weight:950}
.mini__p{color:var(--muted);font-weight:850;margin:6px 0 10px}
.mini__a{
  display:inline-flex;padding:10px 12px;border-radius:14px;
  border:1px solid rgba(179,18,82,.18);
  background:rgba(179,18,82,.10);
  font-weight:950;
}
.mini__a:hover{background:rgba(179,18,82,.14)}

.banner{
  margin-top:12px;
  padding:16px;border-radius:var(--r2);
  border:1px solid rgba(15,17,21,.08);
  background:linear-gradient(135deg, rgba(11,107,99,.08), rgba(179,18,82,.06));
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  font-weight:900;
}
.banner__cta{display:flex;gap:10px;flex-wrap:wrap}

/* Accordions */
.acc{
  margin-top:12px;
  border:1px solid rgba(15,17,21,.10);
  border-radius:18px;
  background:rgba(15,17,21,.02);
  overflow:hidden;
}
.acc summary{
  cursor:pointer;
  list-style:none;
  padding:12px 14px;
  font-weight:950;
  color:rgba(15,17,21,.86);
  display:flex;align-items:center;justify-content:space-between;
}
.acc summary::-webkit-details-marker{display:none}
.acc summary::after{content:"+";font-weight:950;color:rgba(15,17,21,.70)}
.acc[open] summary::after{content:"–"}
.acc__body{padding:12px 14px;color:var(--muted);font-weight:850}
.acc__body ul{margin:10px 0 0;padding-left:18px}
.acc__body li{margin:6px 0}

/* FAQ */
.faq{display:grid;gap:10px}
.faq__item{
  padding:14px 16px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.faq__item summary{cursor:pointer;font-weight:950;list-style:none}
.faq__item summary::-webkit-details-marker{display:none}
.faq__body{margin-top:10px;color:var(--muted);font-weight:850}

/* Contact */
.contact{display:grid;grid-template-columns:.85fr 1.15fr;gap:12px;align-items:start}
.contact__card{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.form{
  padding:18px;border-radius:var(--r2);
  background:rgba(255,255,255,.92);
  border:1px solid var(--line);
  box-shadow:var(--shadow3);
}
.form__title{font-weight:950;margin-bottom:12px}
.form label{display:flex;flex-direction:column;gap:8px;margin-bottom:12px;font-weight:950}
.form input,.form select,.form textarea{
  width:100%;
  border-radius:16px;border:1px solid rgba(15,17,21,.12);
  background:#fff;padding:12px;color:var(--text);
  outline:none;font-family:inherit;font-weight:850
}
.form input:focus,.form select:focus,.form textarea:focus{
  border-color:rgba(179,18,82,.26);
  box-shadow:0 0 0 4px rgba(179,18,82,.10);
}
.form__msg{margin:10px 0 0;color:rgba(15,17,21,.70);font-weight:900}

/* Footer */
.footer{border-top:1px solid rgba(15,17,21,.08);padding:22px 0 72px}
.footer__inner{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.footer__left{display:flex;align-items:center;gap:12px}
.footer__logo{height:28px;width:auto;display:block;filter:grayscale(100%)}
.footer__brand{margin:0;font-weight:950;letter-spacing:-.01em}
.footer__sub{color:var(--muted2);font-weight:850;font-size:13px}
.footer__links{display:flex;gap:14px;color:var(--muted);font-weight:950}
.footer__links a:hover{color:var(--text)}

/* Sticky CTA */
.stickyCta{position:fixed;right:14px;bottom:14px;display:flex;gap:10px;z-index:80}
.stickyCta__btn{
  display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:999px;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(15,17,21,.10);
  color:rgba(15,17,21,.92);
  font-weight:950;
  box-shadow:var(--shadow3);
}
.stickyCta__btn--primary{
  background:linear-gradient(135deg, rgba(179,18,82,1), rgba(179,18,82,.85));
  color:#fff;border-color:rgba(179,18,82,.16);
  box-shadow:0 10px 24px rgba(179,18,82,.16);
}
.stickyCta__btn:hover{transform:translateY(-1px)}

/* Reveal animations */
.reveal{opacity:0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease}
.reveal.is-in{opacity:1; transform:none}

/* Smooth scrolling + header offset */
html{scroll-behavior:smooth}
:target{scroll-margin-top:84px}

/* Responsive */
@media (max-width:980px){
  .nav{display:none}
  .burger{display:block}
  .hero__grid{grid-template-columns:1fr}
  .hero__pills{grid-template-columns:1fr}
  .cards3{grid-template-columns:1fr}
  .steps{grid-template-columns:1fr}
  .split{grid-template-columns:1fr}
  .engagement{grid-template-columns:1fr}
  .contact{grid-template-columns:1fr}
  .mediaCard img{height:300px}
  .banner{flex-direction:column;align-items:flex-start}
}
@media (max-width:560px){
  .brand__txt{display:none}
  .stickyCta__btn span:last-child{display:none}
}
