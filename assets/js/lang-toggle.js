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

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    installToggle();
    applyLang(getLang());
  });
})();
