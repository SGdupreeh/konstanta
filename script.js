const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.classList.toggle('is-open', isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.classList.remove('is-open');
  });
});

document.querySelectorAll('.process-step').forEach((step) => {
  step.addEventListener('click', () => {
    const list = step.parentElement;
    list?.querySelectorAll('.process-step').forEach((item) => item.classList.remove('active'));
    step.classList.add('active');
  });
});

document.querySelectorAll('.ba-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ba-tab').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.ba-stage').forEach((panel) => panel.classList.add('is-hidden'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.remove('is-hidden');
  });
});

const form = document.querySelector('#project-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const success = form.querySelector('.form-success');
  success.textContent = 'Спасибо! В презентационной версии заявка никуда не отправляется — здесь будет подключена почта или CRM.';
  form.reset();
});

const revealElements = document.querySelectorAll('.white-section > *, .gray-section > *, .solution-item, .result-card, .doc-box, .ba-stage');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
