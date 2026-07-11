(function () {
  const STORAGE_KEY = "wdLang";
  const DEFAULT_LANG = "zh";
  const NAV_LABELS = {
    "/publications/": { zh: "论文", en: "Publications" },
    "/projects/": { zh: "项目", en: "Projects" },
    "/news/": { zh: "动态", en: "News" },
    "/experience/": { zh: "经历", en: "Experience" },
    "/cv/": { zh: "CV", en: "CV" },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setText(el, lang) {
    const text = el.dataset[lang];
    if (typeof text === "string") el.textContent = text;
  }

  function setHtml(el, lang) {
    const html = el.dataset[`html${lang[0].toUpperCase()}${lang.slice(1)}`];
    if (typeof html === "string") el.innerHTML = html;
  }

  function normalizePath(href) {
    try {
      const url = new URL(href, window.location.origin);
      return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    } catch (_) {
      return href;
    }
  }

  function translateNav(lang) {
    document.querySelectorAll("nav a[href]").forEach((link) => {
      const path = normalizePath(link.getAttribute("href"));
      if (NAV_LABELS[path]) link.textContent = NAV_LABELS[path][lang];
    });
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.dataset.lang = lang;
    document.querySelectorAll("[data-zh][data-en]").forEach((el) => setText(el, lang));
    document.querySelectorAll("[data-html-zh][data-html-en]").forEach((el) => setHtml(el, lang));
    translateNav(lang);
    const toggle = document.querySelector(".wd-lang-toggle");
    if (toggle) {
      toggle.textContent = lang === "zh" ? "EN" : "中";
      toggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
      toggle.setAttribute("title", lang === "zh" ? "Switch to English" : "切换到中文");
    }
  }

  function installToggle() {
    if (document.querySelector(".wd-lang-toggle")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wd-lang-toggle";
    button.addEventListener("click", () => {
      const next = getLang() === "zh" ? "en" : "zh";
      localStorage.setItem(STORAGE_KEY, next);
      applyLang(next);
    });

    const themeToggle = document.querySelector("#light-toggle, .toggle-container, [title='Change theme']");
    if (themeToggle && themeToggle.parentElement) {
      themeToggle.parentElement.insertBefore(button, themeToggle);
      return;
    }

    const nav = document.querySelector(".navbar-nav");
    if (nav) {
      const item = document.createElement("li");
      item.className = "nav-item wd-lang-nav-item";
      item.appendChild(button);
      nav.appendChild(item);
      return;
    }

    document.body.appendChild(button);
  }

  function installCarousels() {
    document.querySelectorAll("[data-wd-carousel]").forEach((carousel) => {
      if (carousel.dataset.wdCarouselReady === "true") return;
      carousel.dataset.wdCarouselReady = "true";

      const viewport = carousel.querySelector(".wd-showcase-viewport");
      const track = carousel.querySelector(".wd-showcase-rail");
      const cards = Array.from(carousel.querySelectorAll(".wd-showcase-card"));
      const dotsHost = carousel.querySelector(".wd-carousel-dots");
      const prev = carousel.querySelector("[data-wd-carousel-prev]");
      const next = carousel.querySelector("[data-wd-carousel-next]");
      if (!viewport || !track || !cards.length || !dotsHost) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let index = 0;
      let timer = null;
      let resizeTimer = null;
      let dots = [];

      function trackGap() {
        const value = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap;
        return Number.parseFloat(value) || 16;
      }

      function visibleCount() {
        const width = cards[0].getBoundingClientRect().width;
        if (!width) return 1;
        return Math.max(1, Math.floor((viewport.clientWidth + trackGap()) / (width + trackGap())));
      }

      function maxIndex() {
        return Math.max(0, cards.length - visibleCount());
      }

      function renderDots() {
        const count = maxIndex() + 1;
        if (dots.length === count) return;
        dotsHost.innerHTML = "";
        dots = Array.from({ length: count }, (_, i) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "wd-carousel-dot";
          button.setAttribute("aria-label", `Show research item ${i + 1}`);
          button.addEventListener("click", () => {
            setIndex(i);
            restartAutoplay();
          });
          dotsHost.appendChild(button);
          return button;
        });
      }

      function setIndex(nextIndex, options = {}) {
        renderDots();
        const maximum = maxIndex();
        if (nextIndex > maximum) nextIndex = 0;
        if (nextIndex < 0) nextIndex = maximum;
        index = nextIndex;

        const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
        const offset = Math.min(cards[index].offsetLeft, maxOffset);
        if (options.instant) track.style.transition = "none";
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        if (options.instant) requestAnimationFrame(() => (track.style.transition = ""));

        dots.forEach((dot, i) => {
          const active = i === index;
          dot.classList.toggle("is-active", active);
          dot.setAttribute("aria-current", active ? "true" : "false");
        });
      }

      function stopAutoplay() {
        if (timer) window.clearInterval(timer);
        timer = null;
      }

      function startAutoplay() {
        stopAutoplay();
        if (reducedMotion.matches || maxIndex() === 0) return;
        timer = window.setInterval(() => setIndex(index + 1), 5200);
      }

      function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      prev?.addEventListener("click", () => {
        setIndex(index - 1);
        restartAutoplay();
      });
      next?.addEventListener("click", () => {
        setIndex(index + 1);
        restartAutoplay();
      });
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);
      reducedMotion.addEventListener?.("change", restartAutoplay);
      window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => setIndex(Math.min(index, maxIndex()), { instant: true }), 120);
      });

      setIndex(0, { instant: true });
      startAutoplay();
    });
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    installToggle();
    installCarousels();
    applyLang(getLang());
  });
})();
