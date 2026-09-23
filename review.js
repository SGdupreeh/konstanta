/**
 * review.js — Интерактивная логика Центра согласования проекта
 * ООО «Константа» — Капитальный ремонт школ
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'konstanta_review_answers_v1';
  let currentIndex = 0;
  let activeFilter = 'all';
  let filteredSections = [];
  let answers = {};

  // Инициализация данных из localStorage
  function loadAnswers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      answers = saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Ошибка чтения localStorage', e);
      answers = {};
    }
  }

  function saveAnswers() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      updateProgress();
      renderSidebar();
    } catch (e) {
      console.error('Ошибка сохранения в localStorage', e);
    }
  }

  function getSectionAnswer(id) {
    return answers[id] || { status: null, comment: '' };
  }

  function setSectionStatus(id, status) {
    if (!answers[id]) answers[id] = { comment: '' };
    answers[id].status = answers[id].status === status ? null : status;
    answers[id].updatedAt = new Date().toISOString();
    saveAnswers();
    renderActiveCard();
    showToast('Статус сохранен');
  }

  function setSectionComment(id, text) {
    if (!answers[id]) answers[id] = { status: null };
    answers[id].comment = text;
    answers[id].updatedAt = new Date().toISOString();
    saveAnswers();
  }

  function filterSections() {
    const all = window.REVIEW_DATA ? window.REVIEW_DATA.sections : [];
    if (activeFilter === 'all') {
      filteredSections = all;
    } else {
      filteredSections = all.filter(s => s.page === activeFilter);
    }
    currentIndex = 0;
    renderSidebar();
    renderActiveCard();
  }

  function updateProgress() {
    const all = window.REVIEW_DATA ? window.REVIEW_DATA.sections : [];
    const total = all.length;
    let answeredCount = 0;

    all.forEach(sec => {
      const a = answers[sec.id];
      if (a && a.status) {
        answeredCount++;
      }
    });

    const percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    const progressFill = document.getElementById('progress-fill');
    const progressLabel = document.getElementById('progress-label');
    const progressPercent = document.getElementById('progress-percent');

    if (progressFill) progressFill.style.width = percent + '%';
    if (progressLabel) progressLabel.textContent = `Согласовано: ${answeredCount} из ${total}`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
  }

  function renderSidebar() {
    const list = document.getElementById('sidebar-list');
    if (!list) return;

    list.innerHTML = '';
    filteredSections.forEach((sec, idx) => {
      const ans = getSectionAnswer(sec.id);
      const li = document.createElement('li');
      li.className = `hub-sidebar-item ${idx === currentIndex ? 'active' : ''}`;
      
      let statusClass = '';
      if (ans.status === 'approved') statusClass = 'status-approved';
      if (ans.status === 'changes') statusClass = 'status-changes';
      if (ans.status === 'question') statusClass = 'status-question';

      li.innerHTML = `
        <span class="hub-status-dot ${statusClass}"></span>
        <div class="hub-sidebar-info">
          <div class="hub-sidebar-title">${sec.title}</div>
          <div class="hub-sidebar-page">${sec.pageName}</div>
        </div>
      `;

      li.addEventListener('click', () => {
        currentIndex = idx;
        renderSidebar();
        renderActiveCard();
      });

      list.appendChild(li);
    });
  }

  function renderActiveCard() {
    if (!filteredSections.length) return;
    const sec = filteredSections[currentIndex];
    const ans = getSectionAnswer(sec.id);

    // Левая колонка (Превью и Описание)
    const imgEl = document.getElementById('preview-img');
    const badgePage = document.getElementById('badge-page');
    const badgeCategory = document.getElementById('badge-category');
    const titleEl = document.getElementById('section-title');
    const expertTag = document.getElementById('expert-tag');
    const linkExt = document.getElementById('link-target-url');
    const descEl = document.getElementById('section-desc');
    const rationalesList = document.getElementById('rationales-list');
    const checklist = document.getElementById('checklist');

    if (imgEl) {
      imgEl.src = sec.image;
      imgEl.alt = sec.title;
    }
    if (badgePage) badgePage.textContent = sec.pageName;
    if (badgeCategory) badgeCategory.textContent = sec.badge;
    if (titleEl) titleEl.textContent = sec.title;
    if (expertTag) expertTag.textContent = `Экспертиза: ${sec.expert} (${sec.expertRole})`;
    if (linkExt) {
      linkExt.href = sec.targetUrl;
      linkExt.textContent = `Перейти к блоку на сайте (${sec.page}) ↗`;
    }
    if (descEl) descEl.textContent = sec.description;

    if (rationalesList) {
      rationalesList.innerHTML = '';
      sec.rationales.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        rationalesList.appendChild(li);
      });
    }

    if (checklist) {
      checklist.innerHTML = '';
      sec.decisionPoints.forEach(dp => {
        const li = document.createElement('li');
        li.textContent = dp;
        checklist.appendChild(li);
      });
    }

    // Правая колонка (Вопрос и Решение)
    const questionText = document.getElementById('question-text');
    if (questionText) questionText.textContent = sec.question;

    const btnApproved = document.getElementById('opt-approved');
    const btnChanges = document.getElementById('opt-changes');
    const btnQuestion = document.getElementById('opt-question');

    if (btnApproved) btnApproved.classList.toggle('selected', ans.status === 'approved');
    if (btnChanges) btnChanges.classList.toggle('selected', ans.status === 'changes');
    if (btnQuestion) btnQuestion.classList.toggle('selected', ans.status === 'question');

    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
      commentInput.value = ans.comment || '';
    }

    // Кнопки навигации
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const counterEl = document.getElementById('nav-counter');

    if (btnPrev) btnPrev.disabled = currentIndex === 0;
    if (btnNext) btnNext.disabled = currentIndex === filteredSections.length - 1;
    if (counterEl) counterEl.textContent = `${currentIndex + 1} из ${filteredSections.length}`;
  }

  function showToast(msg) {
    const toast = document.getElementById('hub-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Генерация текста протокола для Telegram / WhatsApp / Email
  function generateProtocolText() {
    const data = window.REVIEW_DATA;
    const all = data ? data.sections : [];
    
    let text = `📋 *ПРОТОКОЛ СОГЛАСОВАНИЯ ПРОЕКТА*\n`;
    text += `🏢 Объект: ${data.projectTitle}\n`;
    text += `📅 Дата: ${new Date().toLocaleDateString('ru-RU')} | Версия: ${data.version}\n\n`;

    let approvedCount = 0;
    let changesCount = 0;
    let questionCount = 0;
    let unreviewedCount = 0;

    all.forEach((sec, idx) => {
      const a = answers[sec.id] || {};
      let statusIcon = '⏳ [НЕ ПРОСМОТРЕНО]';
      if (a.status === 'approved') {
        statusIcon = '✅ [УТВЕРЖДЕНО]';
        approvedCount++;
      } else if (a.status === 'changes') {
        statusIcon = '✏️ [ТРЕБУЮТСЯ ПРАВКИ]';
        changesCount++;
      } else if (a.status === 'question') {
        statusIcon = '❓ [НУЖНА КОНСУЛЬТАЦИЯ]';
        questionCount++;
      } else {
        unreviewedCount++;
      }

      text += `*${idx + 1}. ${sec.title}* (${sec.pageName})\n`;
      text += `Статус: ${statusIcon}\n`;
      if (a.comment && a.comment.trim()) {
        text += `💬 Замечание заказчика: "${a.comment.trim()}"\n`;
      }
      text += `\n`;
    });

    text += `---------------------------------\n`;
    text += `📊 ИТОГ СОГЛАСОВАНИЯ:\n`;
    text += `✅ Утверждено: ${approvedCount}\n`;
    text += `✏️ Требуют правок: ${changesCount}\n`;
    text += `❓ На обсуждение: ${questionCount}\n`;
    text += `⏳ Не рассмотрено: ${unreviewedCount}\n`;

    return text;
  }

  function copyToClipboard(str) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(str);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = str;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  // Настройка слушателей событий
  document.addEventListener('DOMContentLoaded', () => {
    loadAnswers();
    filteredSections = window.REVIEW_DATA ? window.REVIEW_DATA.sections : [];

    // Фильтры страниц
    const filterPills = document.querySelectorAll('.hub-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        filterPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        activeFilter = e.target.getAttribute('data-filter') || 'all';
        filterSections();
      });
    });

    // Кнопки выбора статуса
    const btnApproved = document.getElementById('opt-approved');
    const btnChanges = document.getElementById('opt-changes');
    const btnQuestion = document.getElementById('opt-question');

    if (btnApproved) {
      btnApproved.addEventListener('click', () => {
        if (!filteredSections[currentIndex]) return;
        setSectionStatus(filteredSections[currentIndex].id, 'approved');
      });
    }

    if (btnChanges) {
      btnChanges.addEventListener('click', () => {
        if (!filteredSections[currentIndex]) return;
        setSectionStatus(filteredSections[currentIndex].id, 'changes');
      });
    }

    if (btnQuestion) {
      btnQuestion.addEventListener('click', () => {
        if (!filteredSections[currentIndex]) return;
        setSectionStatus(filteredSections[currentIndex].id, 'question');
      });
    }

    // Ввод комментария
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
      commentInput.addEventListener('input', (e) => {
        if (!filteredSections[currentIndex]) return;
        setSectionComment(filteredSections[currentIndex].id, e.target.value);
      });
    }

    // Навигация
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          renderSidebar();
          renderActiveCard();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentIndex < filteredSections.length - 1) {
          currentIndex++;
          renderSidebar();
          renderActiveCard();
        }
      });
    }

    // Горячие клавиши (Arrow Left / Right)
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' && currentIndex < filteredSections.length - 1) {
        currentIndex++;
        renderSidebar();
        renderActiveCard();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        renderSidebar();
        renderActiveCard();
      }
    });

    // Экспорт / Протокол
    const btnExport = document.getElementById('btn-export');
    const modal = document.getElementById('hub-modal');
    const modalClose = document.getElementById('modal-close');
    const modalText = document.getElementById('modal-protocol-text');
    const btnCopyProtocol = document.getElementById('btn-copy-protocol');

    if (btnExport && modal && modalText) {
      btnExport.addEventListener('click', () => {
        modalText.textContent = generateProtocolText();
        modal.classList.add('open');
      });
    }

    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }

    if (btnCopyProtocol) {
      btnCopyProtocol.addEventListener('click', () => {
        const text = generateProtocolText();
        copyToClipboard(text).then(() => {
          showToast('✅ Протокол скопирован в буфер!');
        });
      });
    }

    // Печать / PDF
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // Lightbox для просмотра скриншотов в полном разрешении
    const previewImgWrap = document.querySelector('.hub-preview-img-wrap');
    const lightbox = document.getElementById('hub-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (previewImgWrap && lightbox && lightboxImg) {
      previewImgWrap.addEventListener('click', () => {
        if (!filteredSections[currentIndex]) return;
        const sec = filteredSections[currentIndex];
        lightboxImg.src = sec.image;
        if (lightboxCaption) {
          lightboxCaption.textContent = `${sec.title} (${sec.pageName}) — Кликните, чтобы закрыть`;
        }
        lightbox.classList.add('open');
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose || e.target === lightboxImg) {
          lightbox.classList.remove('open');
        }
      });
    }

    // Сброс ответов
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Сбросить все сохраненные отметки и комментарии?')) {
          answers = {};
          localStorage.removeItem(STORAGE_KEY);
          updateProgress();
          renderSidebar();
          renderActiveCard();
          showToast('Все ответы очищены');
        }
      });
    }

    // Первичный рендер
    filterSections();
    updateProgress();
  });
})();
