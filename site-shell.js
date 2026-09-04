(function () {
  const navItems = window.CONSTANTA_NAV || [];
  const page = document.body.dataset.page || '';

  function renderHeader() {
    const target = document.querySelector('[data-site-header]');
    if (!target) return;
    const links = navItems.map(([label, href]) => `<a class="${page === href.replace('.html', '') ? 'is-current' : ''}" href="${href}">${label}</a>`).join('');
    target.innerHTML = `<header class="mos-header">
      <a class="mos-brand" href="index.html" aria-label="Константа — на главную"><img class="mos-brand-logo" src="logo.svg" alt="Константа" /></a>
      <nav class="mos-nav" aria-label="Основная навигация">${links}</nav>
      <div class="mos-actions"><a class="mos-phone" href="tel:+79150156605">+7 915 015-66-05</a><a class="mos-contact-link" href="contacts.html">Обсудить проект</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню"><span></span><span></span></button></div>
    </header>
    <div class="mobile-menu" id="mobile-menu">${links}<a class="mobile-cta" href="contacts.html">Обсудить проект</a></div>`;
    const toggle = target.querySelector('.menu-toggle');
    const menu = target.querySelector('.mobile-menu');
    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }));
  }

  function renderFooter() {
    const target = document.querySelector('[data-site-footer]');
    if (!target) return;
    target.innerHTML = `<footer class="site-footer"><div class="footer-brand"><a class="mos-brand" href="index.html"><img class="mos-brand-logo" src="logo.svg" alt="Константа" /></a><p>Производственно-монтажные решения для объектов образования и инфраструктуры.</p></div><nav>${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}<a href="contacts.html">Контакты</a></nav><div class="footer-bottom"><span>© <span data-year>2026</span> ООО «Константа»</span><span>Москва · Московская область</span><a href="documents.html">Документы и реквизиты</a></div></footer>`;
  }

  renderHeader();
  renderFooter();
})();
