/**
 * site-pages.js
 * Логика страниц ООО «Константа»:
 * 1. Интерактивный слайдер на главной (index.html) («раз — следующий», свайпы, точки, счетчик 01/09).
 * 2. Реестр проектов на projects.html (фильтры, карточки 9 школ, полноэкранный паспорт с циклическим просмотром, клавиатурой, Audit Shield).
 * 3. Документы (documents.html) (1-клик копирование реквизитов с fallback и light toast).
 * 4. Контакты (contacts.html) (prefill ?object=, drag-and-drop дропзона).
 */

(function () {
  const schools = window.CONSTANTA_SCHOOLS || [];

  // ==========================================
  // 1. ИНТЕРАКТИВНЫЙ СЛАЙДЕР НА ГЛАВНОЙ (index.html)
  // ==========================================
  function initShowcaseSlider() {
    const sliderContainer = document.querySelector('[data-showcase-slider]');
    if (!sliderContainer || !schools.length) return;

    let currentIndex = 0;

    const renderSlider = () => {
      sliderContainer.innerHTML = `
        <div class="showcase-slider-wrapper">
          <div class="showcase-slider-track" id="showcase-track">
            ${schools.map((school, idx) => `
              <div class="showcase-slide ${idx === currentIndex ? 'is-active' : ''}" data-index="${idx}">
                <div class="showcase-slide-content">
                  <div class="showcase-slide-header">
                    <span class="eyebrow">${school.district}</span>
                    <span class="showcase-counter">${String(idx + 1).padStart(2, '0')} / ${String(schools.length).padStart(2, '0')}</span>
                  </div>
                  <h3 class="showcase-title">${school.title}</h3>
                  <p class="showcase-summary">${school.summary}</p>
                  <div class="showcase-works-title">Выполненные работы:</div>
                  <div class="showcase-tags">
                    ${school.actualWorks.map(w => `<span class="work-tag">✓ ${w}</span>`).join('')}
                  </div>
                  <div class="showcase-actions">
                    <a class="blue-button" href="projects.html?school=${school.slug}">
                      Паспорт объекта <span>↗</span>
                    </a>
                    <a class="outline-button" href="contacts.html?object=${encodeURIComponent(school.title)}">
                      Рассчитать аналог
                    </a>
                  </div>
                </div>
                <div class="showcase-slide-media">
                  <img src="${school.cover}" alt="${school.title}" loading="lazy" />
                  <div class="showcase-badge">
                    <span>Сдано к 1 сентября</span>
                    <small>${school.specs ? school.specs[0][1] : 'Капитальный ремонт'}</small>
                  </div>
                  ${school.auditShield ? `
                    <div class="showcase-audit-pill">
                      <svg class="audit-pill-svg" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8 1.5L2.5 3.8V7.5C2.5 11.2 4.8 14.1 8 15C11.2 14.1 13.5 11.2 13.5 7.5V3.8L8 1.5Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" stroke-linejoin="round"/>
                        <path d="M5.5 8L7.2 9.7L10.5 6.3" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>Строго двери (Audit Shield)</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="showcase-controls">
          <div class="showcase-nav-buttons">
            <button type="button" class="slider-btn prev-btn" aria-label="Предыдущий объект">←</button>
            <div class="slider-step-indicator">
              <strong>${String(currentIndex + 1).padStart(2, '0')}</strong>
              <span>/ ${String(schools.length).padStart(2, '0')}</span>
            </div>
            <button type="button" class="slider-btn next-btn" aria-label="Следующий объект">→</button>
          </div>
          <div class="showcase-dots">
            ${schools.map((_, i) => `
              <button type="button" class="slider-dot ${i === currentIndex ? 'is-active' : ''}" data-goto="${i}" aria-label="Перейти к объекту ${i + 1}"></button>
            `).join('')}
          </div>
          <a class="arrow-link showcase-all-link" href="projects.html">
            Все 9 объектов в реестре <span>↗</span>
          </a>
        </div>
      `;

      bindSliderEvents();
    };

    const updateActiveSlide = (direction) => {
      const slides = sliderContainer.querySelectorAll('.showcase-slide');
      slides.forEach((s, idx) => {
        const isActive = idx === currentIndex;
        s.classList.toggle('is-active', isActive);
        s.classList.remove('slide-next', 'slide-prev');
        if (isActive && direction) {
          s.classList.add(direction === 'next' ? 'slide-next' : 'slide-prev');
        }
      });
      const dots = sliderContainer.querySelectorAll('.slider-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('is-active', idx === currentIndex);
      });
      const indicator = sliderContainer.querySelector('.slider-step-indicator strong');
      if (indicator) {
        indicator.textContent = String(currentIndex + 1).padStart(2, '0');
      }
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % schools.length;
      updateActiveSlide('next');
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + schools.length) % schools.length;
      updateActiveSlide('prev');
    };

    const bindSliderEvents = () => {
      sliderContainer.querySelector('.next-btn')?.addEventListener('click', nextSlide);
      sliderContainer.querySelector('.prev-btn')?.addEventListener('click', prevSlide);

      sliderContainer.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const targetIdx = parseInt(e.currentTarget.dataset.goto, 10);
          const dir = targetIdx > currentIndex ? 'next' : 'prev';
          currentIndex = targetIdx;
          updateActiveSlide(dir);
        });
      });

      // Touch swipe support with vertical scroll awareness
      const track = sliderContainer.querySelector('#showcase-track');
      if (track) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        track.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
            if (diffX < 0) nextSlide();
            else prevSlide();
          }
        }, { passive: true });
      }
    };

    renderSlider();
  }

  // ==========================================
  // 2. РЕЕСТР ОБЪЕКТОВ И МОДАЛЬНЫЙ ПАСПОРТ (projects.html)
  // ==========================================
  function initProjectsCatalog() {
    const gridTarget = document.querySelector('[data-projects-catalog]');
    const filterContainer = document.querySelector('[data-projects-filters]');
    const modalTarget = document.querySelector('[data-school-modal]');

    if (!gridTarget) return;

    let currentFilter = 'all';
    let currentModalSlug = null;

    // Filters definition
    const filters = [
      { key: 'all', label: 'Все объекты (9)' },
      { key: 'doors', label: 'Только двери' },
      { key: 'windows', label: 'Окна и витражи' },
      { key: 'mgn', label: 'Входные группы и МГН' }
    ];

    if (filterContainer) {
      filterContainer.innerHTML = filters.map(f => `
        <button type="button" class="filter-chip ${f.key === currentFilter ? 'is-active' : ''}" data-filter="${f.key}">
          ${f.label}
        </button>
      `).join('');

      filterContainer.querySelectorAll('.filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          currentFilter = btn.dataset.filter;
          filterContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          renderCards();
        });
      });
    }

    const renderCards = () => {
      const filtered = schools.filter(s => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'doors') return s.categories.includes('doors');
        if (currentFilter === 'windows') return s.categories.includes('windows');
        if (currentFilter === 'mgn') return s.categories.includes('mgn');
        return true;
      });

      if (!filtered.length) {
        gridTarget.innerHTML = `<div class="empty-filter-state">В данной категории нет объектов</div>`;
        return;
      }

      gridTarget.innerHTML = filtered.map((school, index) => `
        <article class="school-card" data-slug="${school.slug}">
          <div class="school-card-media">
            <img src="${school.cover}" alt="${school.title}" loading="lazy" />
            <span class="school-card-number">${String(school.id).padStart(2, '0')}</span>
            ${school.auditShield ? `
              <span class="shield-badge-small">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink:0;">
                  <path d="M8 1.5L2.5 3.8V7.5C2.5 11.2 4.8 14.1 8 15C11.2 14.1 13.5 11.2 13.5 7.5V3.8L8 1.5Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" stroke-linejoin="round"/>
                  <path d="M5.5 8L7.2 9.7L10.5 6.3" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Audit Shield</span>
              </span>
            ` : ''}
          </div>
          <div class="school-card-body">
            <span class="eyebrow">${school.district}</span>
            <h3 class="school-card-title">${school.title}</h3>
            <p class="school-card-address">${school.address}</p>
            <div class="school-card-works">
              <span class="works-caption">Подтверждённый состав работ:</span>
              <div class="tag-row">
                ${school.actualWorks.map(w => `<span class="tag-item">✓ ${w}</span>`).join('')}
              </div>
            </div>
            <div class="school-card-footer">
              <button type="button" class="blue-button open-passport-btn" data-slug="${school.slug}">
                Паспорт объекта <span>↗</span>
              </button>
            </div>
          </div>
        </article>
      `).join('');

      gridTarget.querySelectorAll('.school-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        const schoolTitle = card.querySelector('.school-card-title')?.textContent || '';
        card.setAttribute('aria-label', `Паспорт объекта: ${schoolTitle}`);

        card.addEventListener('click', () => {
          const slug = card.dataset.slug;
          if (slug) openModal(slug);
        });

        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const slug = card.dataset.slug;
            if (slug) openModal(slug);
          }
        });
      });
    };

    // Modal Passport logic
    const openModal = (slug, direction = null) => {
      const schoolIndex = schools.findIndex(s => s.slug === slug);
      if (schoolIndex === -1) {
        // Clean up invalid query param
        const url = new URL(window.location);
        url.searchParams.delete('school');
        window.history.replaceState({}, '', url);
        return;
      }
      currentModalSlug = slug;

      const school = schools[schoolIndex];
      const prevSchool = schools[(schoolIndex - 1 + schools.length) % schools.length];
      const nextSchool = schools[(schoolIndex + 1) % schools.length];

      // Update URL query ?school=slug
      const url = new URL(window.location);
      url.searchParams.set('school', slug);
      window.history.replaceState({}, '', url);

      let activeGalleryIndex = 0;

      modalTarget.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-dialog ${direction ? 'slide-' + direction : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-school-title">
          <header class="modal-header">
            <div class="modal-header-info">
              <span class="eyebrow">${school.district} · Объект ${String(school.id).padStart(2, '0')} из ${String(schools.length).padStart(2, '0')}</span>
              <h2 id="modal-school-title">${school.title}</h2>
              <p class="modal-address">${school.address}</p>
            </div>
            <div class="modal-nav-controls">
              <button type="button" class="modal-arrow-btn modal-prev" title="Предыдущий объект (${prevSchool.shortTitle})" aria-label="Предыдущий объект">
                ← <span>Пред.</span>
              </button>
              <div class="modal-cyclic-step">
                <strong>${String(schoolIndex + 1).padStart(2, '0')}</strong> / ${String(schools.length).padStart(2, '0')}
              </div>
              <button type="button" class="modal-arrow-btn modal-next" title="Следующий объект (${nextSchool.shortTitle})" aria-label="Следующий объект">
                <span>След.</span> →
              </button>
              <button type="button" class="modal-close-btn" aria-label="Закрыть паспорт">✕</button>
            </div>
          </header>

          <div class="modal-body">
            ${school.auditShield ? `
              <div class="audit-shield-alert audit-shield-box">
                <div class="shield-icon" aria-label="Инженерный аудит">
                  <svg class="audit-shield-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L3 5.5V11.5C3 17.5 6.9 22.4 12 23.9C17.1 22.4 21 17.5 21 11.5V5.5L12 2Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1.4" stroke-linejoin="round"/>
                    <path d="M8.5 12L11 14.5L16 9" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="shield-content">
                  <div class="shield-meta-row">
                    <span class="shield-official-status">АКТ РАЗГРАНИЧЕНИЯ ОБЪЁМОВ ТЕХНАДЗОРА</span>
                    <span class="shield-graphite-badge">Audit Shield</span>
                  </div>
                  <h4>${school.auditShield.title}</h4>
                  <p>${school.auditShield.text}</p>
                </div>
              </div>
            ` : ''}

            <div class="modal-gallery-area">
              <div class="modal-main-photo">
                <img id="modal-active-img" src="${school.gallery[0].src}" alt="${school.gallery[0].title}" />
                <div class="modal-photo-caption" id="modal-caption">${school.gallery[0].title}</div>
              </div>
              ${school.gallery.length > 1 ? `
                <div class="modal-thumbnails">
                  ${school.gallery.map((img, i) => `
                    <button type="button" class="modal-thumb ${i === 0 ? 'is-active' : ''}" data-thumb-idx="${i}">
                      <img src="${img.src}" alt="${img.title}" />
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div class="modal-details-grid">
              <div class="modal-works-card">
                <h3>Подтверждённый состав работ</h3>
                <ul class="verified-works-list">
                  ${school.actualWorks.map(w => `
                    <li>
                      <span class="check-icon">✓</span>
                      <div>
                        <strong>${w}</strong>
                        <small>Выполнено силами ООО «Константа»</small>
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="modal-specs-card">
                <h3>Параметры и приёмка</h3>
                <dl class="specs-table">
                  ${school.specs.map(([label, val]) => `
                    <div class="spec-row">
                      <dt>${label}</dt>
                      <dd>${val}</dd>
                    </div>
                  `).join('')}
                </dl>
                <div class="modal-cta-box">
                  <p>Нужен такой же объём работ или расчёт по вашей ведомости?</p>
                  <a class="blue-button" href="contacts.html?object=${encodeURIComponent(school.title)}">
                    Рассчитать смету по объекту <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      modalTarget.classList.add('is-open');
      document.body.classList.add('modal-locked');

      // Bind thumbnail clicks
      const mainImg = modalTarget.querySelector('#modal-active-img');
      const caption = modalTarget.querySelector('#modal-caption');
      const thumbs = modalTarget.querySelectorAll('.modal-thumb');

      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const idx = parseInt(thumb.dataset.thumbIdx, 10);
          activeGalleryIndex = idx;
          mainImg.src = school.gallery[idx].src;
          caption.textContent = school.gallery[idx].title;
          thumbs.forEach(t => t.classList.remove('is-active'));
          thumb.classList.add('is-active');
        });
      });

      // Touch swipe support for continuous cyclic browsing in modal dialog
      const dialog = modalTarget.querySelector('.modal-dialog');
      if (dialog) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        dialog.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        dialog.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
            if (diffX < 0) {
              openModal(nextSchool.slug, 'next');
            } else {
              openModal(prevSchool.slug, 'prev');
            }
          }
        }, { passive: true });
      }

      // Bind cyclic navigation
      modalTarget.querySelector('.modal-prev')?.addEventListener('click', () => {
        openModal(prevSchool.slug, 'prev');
      });
      modalTarget.querySelector('.modal-next')?.addEventListener('click', () => {
        openModal(nextSchool.slug, 'next');
      });
      modalTarget.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
      modalTarget.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
    };

    const closeModal = () => {
      modalTarget.classList.remove('is-open');
      modalTarget.innerHTML = '';
      document.body.classList.remove('modal-locked');
      currentModalSlug = null;

      // Clear query param
      const url = new URL(window.location);
      url.searchParams.delete('school');
      window.history.replaceState({}, '', url);
    };

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!modalTarget.classList.contains('is-open') || !currentModalSlug) return;
      const schoolIndex = schools.findIndex(s => s.slug === currentModalSlug);
      if (schoolIndex === -1) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        const nextSchool = schools[(schoolIndex + 1) % schools.length];
        openModal(nextSchool.slug, 'next');
      } else if (e.key === 'ArrowLeft') {
        const prevSchool = schools[(schoolIndex - 1 + schools.length) % schools.length];
        openModal(prevSchool.slug, 'prev');
      }
    });

    renderCards();

    // Check deep link ?school=slug
    const initialSlug = new URLSearchParams(window.location.search).get('school');
    if (initialSlug) {
      setTimeout(() => openModal(initialSlug), 80);
    }
  }

  // ==========================================
  // 3. ДОКУМЕНТЫ: КОПИРОВАНИЕ РЕКВИЗИТОВ (documents.html)
  // ==========================================
  function initDocumentsPage() {
    const copyBtn = document.querySelector('[data-copy-requisites]');
    const toast = document.querySelector('#copy-toast');
    const req = window.CONSTANTA_REQUISITES;

    if (!copyBtn || !req) return;

    const requisitesText = `Полное наименование: ${req.name}
Сокращённое наименование: ${req.shortName}
ИНН: ${req.inn}
КПП: ${req.kpp}
ОГРН: ${req.ogrn}
Юридический адрес: ${req.legalAddress}
Адрес производства: ${req.factoryAddress}
Банк: ${req.bank}
БИК: ${req.bik}
Расчётный счёт: ${req.rs}
Корреспондентский счёт: ${req.ks}
Телефон: ${req.phone}
Email: ${req.email}`;

    let toastTimer = null;
    const showToast = (message) => {
      if (!toast) return;
      toast.querySelector('.toast-text').textContent = message || 'Реквизиты скопированы в буфер обмена';
      toast.classList.add('is-visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 3500);
    };

    const copyText = async (text, successMsg) => {
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (err) {
          copied = false;
        }
      }
      if (!copied) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          copied = document.execCommand('copy');
        } catch (err) {
          copied = false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
      if (copied) {
        showToast(successMsg);
      } else {
        showToast('Не удалось скопировать автоматически, скопируйте вручную');
      }
    };

    copyBtn.addEventListener('click', () => {
      copyText(requisitesText, 'Реквизиты ООО «Константа» скопированы в буфер обмена');
    });

    // Also copy individual rows if clicked, using robust fallback
    document.querySelectorAll('.copyable-row').forEach(row => {
      row.addEventListener('click', () => {
        const val = row.querySelector('.val-text')?.textContent.trim();
        if (val) {
          copyText(val, `Скопировано: ${val}`);
        }
      });
    });
  }

  // ==========================================
  // 4. КОНТАКТЫ: PREFILL И ФАЙЛОВЫЙ ДРОПЗОН (contacts.html)
  // ==========================================
  function initContactsPage() {
    const objectInput = document.querySelector('#contact-object');
    const commentInput = document.querySelector('#contact-comment');
    const dropzone = document.querySelector('#file-dropzone');
    const fileInput = document.querySelector('#file-input');
    const fileListDisplay = document.querySelector('#file-list-display');
    const form = document.querySelector('#contact-upload-form');

    // Safe prefill from query parameter ?object= (URLSearchParams already decodes)
    if (objectInput) {
      const urlObj = new URLSearchParams(window.location.search).get('object');
      if (urlObj) {
        objectInput.value = urlObj;
      }
    }

    // Contextual prefill from query parameter ?mode=
    if (commentInput) {
      const mode = new URLSearchParams(window.location.search).get('mode');
      if (mode === 'ks2') {
        commentInput.value = 'Запрос актов КС-2, сертификатов и исполнительной документации по сданным объектам.';
      } else if (mode === 'catalog') {
        commentInput.value = 'Запрос технического каталога, альбомов типовых узлов примыканий (DWG) и прайс-листа.';
      } else if (mode === 'estimate') {
        commentInput.value = 'Заявка на оперативный расчёт сметы по ведомости объёмов работ (ВОР).';
      }
    }

    if (dropzone && fileInput) {
      const attachedFiles = [];

      const renderFileList = () => {
        if (!fileListDisplay) return;
        if (!attachedFiles.length) {
          fileListDisplay.innerHTML = '';
          return;
        }
        fileListDisplay.innerHTML = `
          <div class="attached-files-header">Прикреплённые файлы (${attachedFiles.length}):</div>
          <ul class="attached-files-list">
            ${attachedFiles.map((file, i) => `
              <li class="attached-file-item">
                <span class="file-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 2.5C3.5 1.67 4.17 1 5 1H10.5L14 4.5V13.5C14 14.33 13.33 15 12.5 15H5C4.17 15 3.5 14.33 3.5 13.5V2.5Z" stroke="#177dbb" stroke-width="1.4" stroke-linejoin="round"/>
                    <path d="M10 1V5H14" stroke="#177dbb" stroke-width="1.4" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${(file.size / (1024 * 1024)).toFixed(2)} МБ)</span>
                <button type="button" class="remove-file-btn" data-index="${i}" aria-label="Удалить файл">✕</button>
              </li>
            `).join('')}
          </ul>
        `;

        fileListDisplay.querySelectorAll('.remove-file-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.dataset.index, 10);
            attachedFiles.splice(idx, 1);
            renderFileList();
          });
        });
      };

      const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
          attachedFiles.push(files[i]);
        }
        renderFileList();
      };

      // Reset attached files on form reset
      if (form) {
        form.addEventListener('reset', () => {
          attachedFiles.length = 0;
          renderFileList();
        });
      }

      dropzone.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('is-dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('is-dragover');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length) {
          handleFiles(dt.files);
        }
      });
    }
  }

  // Update dynamic year
  document.querySelectorAll('[data-year]').forEach(n => {
    n.textContent = new Date().getFullYear();
  });

  // Guard against duplicate initialization
  let isInitialized = false;
  function initAll() {
    if (isInitialized) return;
    isInitialized = true;
    initShowcaseSlider();
    initProjectsCatalog();
    initDocumentsPage();
    initContactsPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
