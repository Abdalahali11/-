/* SPA router */
const routes = ["home", "profile", "work", "special"];
const pages = new Map();

function initPages() {
  document.querySelectorAll(".page").forEach((el) => {
    pages.set(el.dataset.route, el);
  });
}

function setActivePage(route) {
  if (!routes.includes(route)) route = "home";
  let leavingEl = null;
  let enteringEl = null;
  for (const [key, el] of pages) {
    if (el.classList.contains("page--active") && key !== route) {
      leavingEl = el;
    }
    if (key === route) {
      enteringEl = el;
    }
  }

  if (leavingEl) {
    leavingEl.classList.remove("page--active");
    leavingEl.classList.add("page--leaving");
    setTimeout(() => leavingEl.classList.remove("page--leaving"), 350);
  }
  if (enteringEl) {
    enteringEl.classList.add("page--active");
  }

  highlightNav(route);
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Re-arm reveals on the new page
  initReveal();
}

function highlightNav(route) {
  document.querySelectorAll(".icon-btn").forEach((btn) => {
    const isCurrent = btn.dataset.route === route;
    if (isCurrent) {
      btn.setAttribute("aria-current", "page");
    } else {
      btn.removeAttribute("aria-current");
    }
  });
}

function handleHashChange() {
  const hash = window.location.hash.replace("#/", "");
  const route = hash || "home";
  setActivePage(route);
}

/* Smooth internal anchors */
function enableSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* Scroll reveal */
function initReveal() {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

/* Event bindings */
function bindNav() {
  document.querySelectorAll(".icon-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const route = btn.dataset.route;
      if (!route) return;
      window.location.hash = `#/${route}`;
    });
  });
  document.querySelectorAll('[data-route="work"], [data-route="profile"], [data-route="special"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const route = btn.dataset.route;
      window.location.hash = `#/${route}`;
    });
  });
}

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  initPages();
  bindNav();
  enableSmoothAnchors();
  initReveal();
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});