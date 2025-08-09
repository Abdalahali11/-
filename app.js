(function () {
  const body = document.body;

  // Page enter animation
  body.classList.add('page-enter');
  window.addEventListener('load', () => {
    setTimeout(() => {
      body.classList.remove('page-enter');
      body.classList.add('page-loaded');
    }, 50);
  });

  // Link transitions
  function setupLinkTransitions() {
    const links = document.querySelectorAll('a[data-transition]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || link.target === '_blank') return;
        e.preventDefault();
        body.classList.add('page-leave');
        setTimeout(() => {
          window.location.href = href;
        }, 360);
      });
    });
  }

  // Scroll reveal with IntersectionObserver
  function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));
  }

  // Init
  setupLinkTransitions();
  setupScrollReveal();
})();