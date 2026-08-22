(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const rail = document.querySelector('.product-rail');
  const railButton = document.querySelector('.product-rail-tab');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
      });
    });
  }

  if (rail && railButton) {
    railButton.addEventListener('click', () => {
      const open = rail.classList.toggle('open');
      railButton.setAttribute('aria-expanded', String(open));
    });
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-page]').forEach((link) => {
    const target = link.getAttribute('data-page');
    if (target === currentPage || (currentPage === '' && target === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
