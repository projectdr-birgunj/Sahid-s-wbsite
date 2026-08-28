/* ==========================================================================
   Amaan Door & Hardware Suppliers — site behaviour
   - mobile nav
   - lazy-loaded images with skeleton shimmer (IntersectionObserver)
   - lightbox with full-quality zoom + pan + swipe navigation
   ========================================================================== */

(function () {
  "use strict";

  /* Mobile nav + active-link highlighting live in layout.js, run once the
     shared header markup has been injected into the page. */

  /* ---------------- Lazy image loading ---------------- */
  // Any element: <div class="lazy-frame"><img data-src="..." alt=""></div>
  function initLazyImages(root = document) {
    const frames = root.querySelectorAll(".lazy-frame:not([data-lazy-init])");
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const frame = entry.target;
          const img = frame.querySelector("img[data-src]");
          if (img) {
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            img.addEventListener(
              "load",
              () => frame.classList.add("loaded"),
              { once: true }
            );
            img.addEventListener(
              "error",
              () => frame.classList.add("loaded"),
              { once: true }
            );
          } else {
            frame.classList.add("loaded");
          }
          obs.unobserve(frame);
        });
      },
      { rootMargin: "300px 0px" }
    );

    frames.forEach((frame) => {
      frame.setAttribute("data-lazy-init", "1");
      io.observe(frame);
    });
  }

  /* ---------------- Lightbox / full-quality zoom viewer ---------------- */
  const Lightbox = (function () {
    let overlay, stage, imgWrap, imgEl, spinner, qualityTag, hint;
    let gallery = [];
    let index = 0;
    let scale = 1,
      posX = 0,
      posY = 0;
    let dragging = false,
      dragStartX = 0,
      dragStartY = 0,
      startPosX = 0,
      startPosY = 0;
    let pinchStartDist = 0,
      pinchStartScale = 1;

    function build() {
      overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.innerHTML = `
        <div class="lightbox-bar">
          <span class="lightbox-quality" id="lb-quality"><span class="dot"></span><span id="lb-quality-text">Loading preview…</span></span>
          <div class="lightbox-actions">
            <button type="button" id="lb-zoomout" aria-label="Zoom out">−</button>
            <button type="button" id="lb-zoomin" aria-label="Zoom in">+</button>
            <button type="button" id="lb-reset" aria-label="Reset zoom">⤢</button>
            <button type="button" id="lb-close" aria-label="Close">✕</button>
          </div>
        </div>
        <div class="lightbox-stage">
          <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
          <div class="lightbox-img-wrap" id="lb-imgwrap">
            <img id="lb-img" src="" alt="" draggable="false" />
          </div>
          <button type="button" class="lightbox-nav lightbox-next" aria-label="Next">›</button>
          <div class="lightbox-spinner" id="lb-spinner"></div>
        </div>
        <div class="lightbox-hint">Scroll or pinch to zoom · drag to pan · full quality loads automatically</div>
      `;
      document.body.appendChild(overlay);

      stage = overlay.querySelector(".lightbox-stage");
      imgWrap = overlay.querySelector("#lb-imgwrap");
      imgEl = overlay.querySelector("#lb-img");
      spinner = overlay.querySelector("#lb-spinner");
      qualityTag = overlay.querySelector("#lb-quality");
      hint = overlay.querySelector(".lightbox-hint");

      overlay.querySelector("#lb-close").addEventListener("click", close);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay || e.target === stage) close();
      });
      overlay.querySelector(".lightbox-prev").addEventListener("click", () => nav(-1));
      overlay.querySelector(".lightbox-next").addEventListener("click", () => nav(1));
      overlay.querySelector("#lb-zoomin").addEventListener("click", () => setScale(scale + 0.4));
      overlay.querySelector("#lb-zoomout").addEventListener("click", () => setScale(scale - 0.4));
      overlay.querySelector("#lb-reset").addEventListener("click", resetTransform);

      document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") nav(-1);
        if (e.key === "ArrowRight") nav(1);
      });

      // Wheel zoom
      stage.addEventListener(
        "wheel",
        (e) => {
          if (!overlay.classList.contains("active")) return;
          e.preventDefault();
          const delta = e.deltaY > 0 ? -0.15 : 0.15;
          setScale(scale + delta);
        },
        { passive: false }
      );

      // Drag to pan (mouse)
      imgWrap.addEventListener("mousedown", (e) => {
        if (scale <= 1) return;
        dragging = true;
        imgWrap.classList.add("dragging");
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        startPosX = posX;
        startPosY = posY;
      });
      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        posX = startPosX + (e.clientX - dragStartX);
        posY = startPosY + (e.clientY - dragStartY);
        applyTransform();
      });
      window.addEventListener("mouseup", () => {
        dragging = false;
        imgWrap.classList.remove("dragging");
      });

      // Double-click to toggle zoom
      imgWrap.addEventListener("dblclick", () => {
        setScale(scale > 1 ? 1 : 2.2);
      });

      // Touch: pan + pinch + swipe
      let touchMode = null; // 'pan' | 'pinch' | 'swipe'
      let swipeStartX = 0;

      stage.addEventListener(
        "touchstart",
        (e) => {
          if (e.touches.length === 2) {
            touchMode = "pinch";
            pinchStartDist = touchDist(e.touches);
            pinchStartScale = scale;
          } else if (e.touches.length === 1) {
            if (scale > 1) {
              touchMode = "pan";
              dragStartX = e.touches[0].clientX;
              dragStartY = e.touches[0].clientY;
              startPosX = posX;
              startPosY = posY;
            } else {
              touchMode = "swipe";
              swipeStartX = e.touches[0].clientX;
            }
          }
        },
        { passive: true }
      );

      stage.addEventListener(
        "touchmove",
        (e) => {
          if (touchMode === "pinch" && e.touches.length === 2) {
            e.preventDefault();
            const dist = touchDist(e.touches);
            const next = pinchStartScale * (dist / pinchStartDist);
            setScale(next, false);
          } else if (touchMode === "pan" && e.touches.length === 1) {
            e.preventDefault();
            posX = startPosX + (e.touches[0].clientX - dragStartX);
            posY = startPosY + (e.touches[0].clientY - dragStartY);
            applyTransform();
          }
        },
        { passive: false }
      );

      stage.addEventListener("touchend", (e) => {
        if (touchMode === "swipe") {
          const dx = (e.changedTouches[0]?.clientX ?? swipeStartX) - swipeStartX;
          if (Math.abs(dx) > 60) nav(dx > 0 ? -1 : 1);
        }
        touchMode = null;
      });

      function touchDist(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
      }
    }

    function setScale(next, clampPos = true) {
      scale = Math.min(Math.max(next, 1), 5);
      if (scale === 1) {
        posX = 0;
        posY = 0;
      }
      applyTransform();
    }

    function applyTransform() {
      imgWrap.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    function resetTransform() {
      scale = 1;
      posX = 0;
      posY = 0;
      applyTransform();
    }

    function setQuality(isFull) {
      qualityTag.classList.toggle("hq", isFull);
      qualityTag.querySelector("#lb-quality-text").textContent = isFull
        ? "Full quality"
        : "Loading full quality…";
    }

    function loadItem(item) {
      resetTransform();
      spinner.classList.add("active");
      setQuality(false);
      imgEl.alt = item.name || "";

      // Show the fast thumb immediately, then swap to the full-res version.
      imgEl.src = item.thumb;

      const fullImg = new Image();
      fullImg.onload = () => {
        imgEl.src = item.full;
        spinner.classList.remove("active");
        setQuality(true);
      };
      fullImg.onerror = () => {
        spinner.classList.remove("active");
        setQuality(true);
      };
      fullImg.src = item.full;
    }

    function nav(dir) {
      if (!gallery.length) return;
      index = (index + dir + gallery.length) % gallery.length;
      loadItem(gallery[index]);
    }

    function open(items, startIndex) {
      if (!overlay) build();
      gallery = items;
      index = startIndex;
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      loadItem(gallery[index]);
      const multi = gallery.length > 1;
      overlay.querySelector(".lightbox-prev").style.display = multi ? "flex" : "none";
      overlay.querySelector(".lightbox-next").style.display = multi ? "flex" : "none";
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      imgEl.src = "";
    }

    return { open, close };
  })();

  /* Wire up any gallery on the page: elements with [data-lightbox-group] share
     a gallery; each clickable item needs data-full / data-thumb / data-name. */
  function initLightboxes(root = document) {
    const groups = {};
    root.querySelectorAll("[data-lightbox-item]").forEach((el) => {
      const group = el.getAttribute("data-lightbox-group") || "default";
      groups[group] = groups[group] || [];
      const idx = groups[group].length;
      groups[group].push({
        thumb: el.getAttribute("data-thumb"),
        full: el.getAttribute("data-full"),
        name: el.getAttribute("data-name") || "",
      });
      el.addEventListener("click", (e) => {
        e.preventDefault();
        Lightbox.open(groups[group], idx);
      });
    });
  }

  // Expose helpers for pages that render content dynamically (product.html)
  window.SiteUI = { initLazyImages, initLightboxes };

  document.addEventListener("DOMContentLoaded", () => {
    initLazyImages();
    initLightboxes();
  });
})();
