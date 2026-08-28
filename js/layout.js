/* Renders the shared header + footer into any page that includes this file.
   Usage: <div id="site-header"></div> ... <div id="site-footer"></div>
*/
(function () {
  "use strict";

  // Real, recognizable brand icons (inline SVG, currentColor-friendly).
  const ICON_FB = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.87h2.78l-.45 2.91h-2.33V22c4.78-.77 8.44-4.94 8.44-9.94Z"/></svg>`;
  const ICON_IG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none"/></svg>`;
  const ICON_WA = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.1C6.55 2.1 2.13 6.5 2.13 11.97c0 1.87.51 3.63 1.4 5.14L2 22l5.02-1.5a9.9 9.9 0 0 0 4.98 1.34c5.45 0 9.87-4.41 9.87-9.87 0-5.46-4.42-9.87-9.87-9.87Zm0 18.02c-1.56 0-3.05-.42-4.35-1.2l-.31-.18-2.98.8.79-2.9-.2-.3a8.14 8.14 0 0 1-1.29-4.37c0-4.5 3.66-8.16 8.15-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.15-8.16 8.15Zm4.48-6.12c-.25-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.72 2.63 4.18 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.45-.6 1.65-1.17.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>`;

  const socialLinks = (railClass) => `
    <a class="${railClass} rail-fb" href="https://www.facebook.com/Ammandoor" aria-label="Facebook" target="_blank" rel="noopener">${ICON_FB}</a>
    <a class="${railClass} rail-wa" href="https://api.whatsapp.com/send?phone=+9779802057804" aria-label="WhatsApp" target="_blank" rel="noopener">${ICON_WA}</a>
    <a class="${railClass} rail-ig" href="https://instagram.com/amaandoor?igshid=YmMyMTA2M2Y=" aria-label="Instagram" target="_blank" rel="noopener">${ICON_IG}</a>
  `;

  const headerHTML = `
    <div class="nav-wrap">
      <a class="brand" href="index.html">
        <img src="img/thumb/logo.webp" alt="Amaan Door & Hardware Suppliers logo" width="42" height="42">
        <span class="brand-name">Amaan Door &amp; Hardware
          <small>Suppliers · Birgunj</small>
        </span>
      </a>
      <ul class="nav-menu">
        <li><a href="index.html" data-nav="index.html">Home</a></li>
        <li><a href="category.html" data-nav="category.html">Category</a></li>
        <li><a href="about.html" data-nav="about.html">About</a></li>
        <li><a href="contact.html" data-nav="contact.html">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    </div>
  `;

  const footerHTML = `
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="img/thumb/logo.webp" alt="Amaan Door & Hardware Suppliers logo">
          <span>Amaan Door &amp; Hardware Suppliers</span>
        </div>
        <p style="max-width:320px;font-size:0.9rem;">
          Doors, plywood, laminates, glass and hardware for your home —
          near Ghariarwa Pokhari, Birgunj, Parsa, Nepal.
        </p>
        <div class="footer-social">${socialLinks("footer-social-link")}</div>
      </div>
      <div>
        <h4>Quick links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="category.html">Category</a></li>
          <li><a href="about.html">About us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li><a href="tel:+9779809120035">9809120035 — Shekh Nabi Hussen</a></li>
          <li><a href="tel:+9779802057804">9802057804 — Shekh Shahid</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} Amaan Door &amp; Hardware Suppliers. All rights reserved.
      · Website by <a href="mailto:projectdr.birgunj@gmail.com" style="color:inherit;text-decoration:underline;">Rajnish Gupta</a>
    </div>
  `;

  document.addEventListener("DOMContentLoaded", () => {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = footerHTML;

    // Fixed social rail — stays pinned to the right edge on every page and
    // every breakpoint, independent of the header, so WhatsApp/Facebook are
    // always reachable.
    if (!document.querySelector(".social-rail")) {
      const rail = document.createElement("div");
      rail.className = "social-rail";
      rail.innerHTML = socialLinks("");
      document.body.appendChild(rail);
    }

    // Re-run nav highlighting now that the header exists
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-menu a[data-nav]").forEach((a) => {
      if (a.getAttribute("data-nav") === path) a.classList.add("active");
    });

    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("open");
        menu.classList.toggle("open");
      });
      menu.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          toggle.classList.remove("open");
          menu.classList.remove("open");
        }),
      );
    }
  });
})();
