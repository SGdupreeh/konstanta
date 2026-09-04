(function () {
  const projects = window.CONSTANTA_PROJECTS || [];
  const image = (src, alt) => `<img src="${src}" alt="${alt}" loading="lazy" />`;

  const projectCard = (project) => `<article class="project-card">
    <a class="project-card-media" href="project-${project.slug}.html">${image(project.cover, project.title)}<span class="project-card-arrow">↗</span></a>
    <div class="project-card-body"><span class="eyebrow">${project.label} · ${project.location}</span><h3><a href="project-${project.slug}.html">${project.title}</a></h3><p>${project.summary}</p><div class="tag-row">${project.services.map((service) => `<span>${service}</span>`).join('')}</div></div>
  </article>`;

  document.querySelectorAll('[data-project-grid]').forEach((grid) => {
    grid.innerHTML = projects.map(projectCard).join('');
  });

  const schoolObjects = window.CONSTANTA_SCHOOL_OBJECTS || [];
  document.querySelectorAll('[data-school-objects]').forEach((grid) => {
    grid.innerHTML = schoolObjects.map((object, index) => `<article class="school-object-card"><div class="school-object-gallery">${object.images.map(([src, alt]) => `<img src="assets/school-objects/${src}" alt="${alt}" />`).join('')}</div><div class="school-object-body"><span>Объект ${String(index + 1).padStart(2, '0')}</span><h3>${object.title}</h3><p>${object.work}</p></div></article>`).join('');
  });

  const caseTarget = document.querySelector('[data-project-case]');
  if (caseTarget) {
    const project = projects.find((item) => item.slug === caseTarget.dataset.project) || projects[0];
    if (project) {
      caseTarget.innerHTML = `<section class="case-hero"><div><span class="eyebrow">${project.label} · ${project.location}</span><h1>${project.title}</h1><p>${project.summary}</p><a class="blue-button" href="contacts.html">Обсудить похожий объект <span>↗</span></a></div><div class="case-hero-image">${image(project.cover, project.title)}</div></section>
      <section class="page-section case-overview"><div class="section-heading"><span class="eyebrow">Карточка объекта</span><h2>Что сделали<br /><span>на площадке</span></h2></div><div class="case-facts">${project.facts.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div><div class="case-services"><h3>Состав работ</h3><div class="tag-row">${project.services.map((service) => `<span>${service}</span>`).join('')}</div></div></section>
      <section class="page-section"><div class="section-heading"><span class="eyebrow">Фотографии</span><h2>Результат,<br /><span>который видно</span></h2></div><div class="case-gallery">${project.gallery.map((src, index) => `<figure>${image(src, `${project.title} — фото ${index + 1}`)}<figcaption>${index === 0 ? 'Фасад и входная группа' : index === 1 ? 'Готовое решение на объекте' : 'Внутреннее пространство'}</figcaption></figure>`).join('')}</div></section>`;
    }
  }

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
