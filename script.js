/**
 * script.js
 * Общие обработчики интерфейса сайта ООО «Константа»
 */

let isCommonInitialized = false;
function initCommon() {
  if (isCommonInitialized) return;
  isCommonInitialized = true;

  // Обработка форм заявок
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const success = form.querySelector('.form-success') || document.createElement('p');
      success.className = 'form-success is-active';
      success.textContent = 'Спасибо! Ваша заявка принята. Инженер свяжется с вами в течение 24 часов для уточнения деталей и расчёта сметы.';
      if (!form.querySelector('.form-success')) {
        form.appendChild(success);
      }
      form.reset();
    });
  });

  // Шаги процессов (аккордеоны)
  document.querySelectorAll('.process-step').forEach((step) => {
    step.addEventListener('click', () => {
      const list = step.parentElement;
      list?.querySelectorAll('.process-step').forEach((item) => item.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // Дропзона файлов на главной (index.html#fast-cta)
  const homeDropzone = document.getElementById('home-file-dropzone');
  const homeFileInput = document.getElementById('home-file-input');
  const homeFileList = document.getElementById('home-file-list');
  if (homeDropzone && homeFileInput) {
    const attached = [];
    const render = () => {
      if (!homeFileList) return;
      homeFileList.innerHTML = attached.map((f, i) => `
        <div class="attached-file-chip">
          <span>📄 ${f.name} (${(f.size / (1024 * 1024)).toFixed(2)} МБ)</span>
          <button type="button" class="remove-file-btn" data-index="${i}" aria-label="Удалить файл ${f.name}">✕</button>
        </div>
      `).join('');
      homeFileList.querySelectorAll('.remove-file-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.index, 10);
          attached.splice(idx, 1);
          render();
        });
      });
    };

    homeDropzone.addEventListener('click', () => homeFileInput.click());
    homeDropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        homeFileInput.click();
      }
    });

    homeFileInput.addEventListener('change', (e) => {
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) attached.push(e.target.files[i]);
        render();
      }
    });

    ['dragenter', 'dragover'].forEach((name) => {
      homeDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        homeDropzone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach((name) => {
      homeDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        homeDropzone.classList.remove('is-dragover');
      });
    });

    homeDropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer?.files) {
        for (let i = 0; i < e.dataTransfer.files.length; i++) attached.push(e.dataTransfer.files[i]);
        render();
      }
    });
  }

  // Reveal Observer для анимации появления секций
  const revealElements = document.querySelectorAll('.white-section > *, .gray-section > *, .page-section > *, .showcase-section, .metrics-bar');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((element) => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}
