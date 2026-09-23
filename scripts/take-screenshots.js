/**
 * scripts/take-screenshots.js
 * Скрипт автоматического захвата скриншотов высокого разрешения (2x Retina) для Центра согласования
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Запуск браузера Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Список задач для скриншотов
  const tasks = [
    {
      name: '01_index_hero.png',
      url: `${BASE_URL}/index.html`,
      selector: '#hero',
      delay: 500
    },
    {
      name: '02_index_metrics.png',
      url: `${BASE_URL}/index.html`,
      selector: '.metrics-section',
      delay: 500
    },
    {
      name: '03_index_showcase.png',
      url: `${BASE_URL}/index.html`,
      selector: '#showcase',
      delay: 800
    },
    {
      name: '04_index_units.png',
      url: `${BASE_URL}/index.html`,
      selector: '#units',
      delay: 500
    },
    {
      name: '05_index_form.png',
      url: `${BASE_URL}/index.html`,
      selector: '.fast-cta-section',
      delay: 500
    },
    {
      name: '06_solutions_catalog.png',
      url: `${BASE_URL}/solutions.html`,
      selector: '.technical-catalog',
      delay: 500
    },
    {
      name: '07_solutions_production.png',
      url: `${BASE_URL}/solutions.html`,
      selector: '.factory-details-section',
      delay: 500
    },
    {
      name: '08_projects_catalog.png',
      url: `${BASE_URL}/projects.html`,
      selector: '.catalog-section',
      delay: 800
    },
    {
      name: '09_projects_passport.png',
      url: `${BASE_URL}/projects.html?school=bataisky`,
      selector: '.modal-dialog',
      delay: 800
    },
    {
      name: '10_documents_sro.png',
      url: `${BASE_URL}/documents.html`,
      selector: '.certificates-section',
      delay: 500
    },
    {
      name: '11_documents_counterparty.png',
      url: `${BASE_URL}/documents.html`,
      selector: '.counterparty-section',
      delay: 500
    },
    {
      name: '12_contacts_direct.png',
      url: `${BASE_URL}/contacts.html`,
      selector: '.contact-page-hero',
      delay: 500
    },
    {
      name: '13_privacy_policy.png',
      url: `${BASE_URL}/privacy.html`,
      selector: '.privacy-content-section',
      delay: 500
    }
  ];

  for (const task of tasks) {
    try {
      console.log(`Обработка: ${task.name} (${task.url})...`);
      await page.goto(task.url, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, task.delay || 500));

      if (task.action) {
        await task.action(page);
        console.log(`✓ Скриншот ${task.name} успешно сохранен (через action)`);
      } else if (task.selector) {
        const el = await page.$(task.selector);
        if (el) {
          await el.screenshot({ path: path.join(OUTPUT_DIR, task.name) });
          console.log(`✓ Скриншот ${task.name} успешно сохранен`);
        } else {
          console.warn(`! Селектор ${task.selector} не найден на странице ${task.url}, делаем снимок видимой области`);
          await page.screenshot({ path: path.join(OUTPUT_DIR, task.name) });
        }
      }
    } catch (err) {
      console.error(`Ошибка при захвате ${task.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('Все скриншоты успешно сгенерированы в:', OUTPUT_DIR);
}

capture().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
