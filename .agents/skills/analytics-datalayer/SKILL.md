---
name: analytics-datalayer
description: >-
  Проектирование схемы событий dataLayer, настройка целей Яндекс Метрики и защита от утечки персональных данных.
  Используйте этот скилл при создании интерактивных кнопок, отправке заявок и интеграции счетчиков.
---

# Архитектура событийной аналитики (dataLayer & Яндекс Метрика)

## 1. Универсальный диспетчер `dataLayer`
Все события отправляются в единый стек:
```javascript
window.dataLayer = window.dataLayer || [];

function trackEvent(eventName, eventParams = {}) {
  window.dataLayer.push({
    event: eventName,
    ...eventParams,
    timestamp: Date.now()
  });

  // Автоматический проброс в Яндекс Метрику при наличии счетчика
  if (typeof ym === 'function' && window.YM_COUNTER_ID) {
    ym(window.YM_COUNTER_ID, 'reachGoal', eventName, eventParams);
  }
}
```

## 2. Стандартизированный реестр событий
- `lead_form_submitted` — успешная отправка любой контактной формы.
- `click_contact_phone` — клик по номеру телефона в шапке или футере.
- `click_contact_email` — клик по email.
- `gallery_photo_viewed` — открытие фотографии в полноэкранном режиме.
- `document_downloaded` — клик по скачиванию PDF (сертификат, выписка СРО).
- `scroll_depth_75` — пользователь дочитал страницу до 75%.

## 3. Политика конфиденциальности в аналитике
- КАТЕГОРИЧЕСКИ запрещено передавать в `dataLayer` или Метрику:
  - Номера телефонов пользователей.
  - ФИО и персональные адреса.
- Разрешено передавать только: ID формы, тип услуги, категорию объекта, факт успешной отправки (`status: 'success'`).
