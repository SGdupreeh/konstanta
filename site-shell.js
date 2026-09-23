(function () {
  const navItems = window.CONSTANTA_NAV || [
    ['Объекты', 'projects.html'],
    ['Продукция и цех', 'solutions.html'],
    ['Документы', 'documents.html'],
    ['Контакты', 'contacts.html']
  ];
  const page = document.body.dataset.page || '';

  function renderHeader() {
    const target = document.querySelector('[data-site-header]');
    if (!target) return;
    const links = navItems.map(([label, href]) => {
      const isCurrent = page === href.replace('.html', '');
      return `<a class="${isCurrent ? 'is-current' : ''}" href="${href}">${label}</a>`;
    }).join('');

    target.innerHTML = `<header class="mos-header">
      <a class="mos-brand" href="index.html" aria-label="ООО «Константа» — на главную">
        <img class="mos-brand-logo" src="logo.svg" alt="ООО «Константа»" width="39" height="46" />
        <span class="mos-brand-text">
          <span class="mos-brand-title">КОНСТАНТА</span>
          <span class="mos-brand-sub">Капитальный ремонт школ</span>
        </span>
      </a>
      <nav class="mos-nav" aria-label="Основная навигация">
        ${links}
      </nav>
      <div class="mos-actions">
        <a class="mos-phone" href="tel:+79150156605">+7 915 015-66-05</a>
        <a class="mos-contact-link blue-button header-btn" href="contacts.html">Обсудить проект <span>↗</span></a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню">
          <span></span><span></span>
        </button>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-links">
        ${links}
      </div>
      <div class="mobile-menu-footer">
        <a class="mobile-phone" href="tel:+79150156605">+7 915 015-66-05</a>
        <a class="blue-button mobile-cta" href="contacts.html">Обсудить проект <span>↗</span></a>
      </div>
    </div>`;

    const toggle = target.querySelector('.menu-toggle');
    const menu = target.querySelector('.mobile-menu');
    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('modal-locked', open);
    });
    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('modal-locked');
    }));

    const header = target.querySelector('.mos-header');
    if (header) {
      const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function renderFooter() {
    const target = document.querySelector('[data-site-footer]');
    if (!target) return;
    const links = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
    target.innerHTML = `<footer class="site-footer">
      <div class="footer-brand">
        <a class="mos-brand" href="index.html" aria-label="ООО «Константа» — на главную">
          <img class="mos-brand-logo" src="logo.svg" alt="ООО «Константа»" width="36" height="42" />
          <span class="mos-brand-text">
            <span class="mos-brand-title">КОНСТАНТА</span>
            <span class="mos-brand-sub">Капитальный ремонт школ</span>
          </span>
        </a>
        <p>Капитальный ремонт школ Москвы и МО. Производство и монтаж светопрозрачных конструкций, дверей EI-60 и решений доступной среды.</p>
        <div class="footer-contacts">
          <a class="footer-phone" href="tel:+79150156605">+7 915 015-66-05</a>
          <span class="footer-email">info@konstanta-msk.ru</span>
        </div>
      </div>
      <nav class="footer-nav">
        <span class="footer-nav-title">Разделы сайта</span>
        ${links}
        <a href="contacts.html?mode=estimate">Заявка на расчёт ВОР</a>
      </nav>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> ООО «Константа» · ИНН 7725838491 · ОГРН 1147746927510</span>
        <span>Москва и Московская область</span>
        <a href="documents.html">Реквизиты и выписка СРО</a>
        <a href="privacy.html">Политика конфиденциальности</a>
      </div>
    </footer>`;
  }

  renderHeader();
  renderFooter();
})();
