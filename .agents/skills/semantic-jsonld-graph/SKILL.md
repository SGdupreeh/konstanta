---
name: semantic-jsonld-graph
description: >-
  Проектирование микроразметки Schema.org в формате JSON-LD, OpenGraph и Twitter Cards для поисковиков и AI-систем.
  Используйте этот скилл при оформлении метаданных компании, страниц услуг, карточек кейсов и навигации.
---

# Стандарт микроразметки и семантического графа (JSON-LD)

## 1. Базовый граф организации (Organization / LocalBusiness)
Каждая ключевая страница должна включать блок `<script type="application/ld+json">`:
```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "ООО «Константа»",
  "url": "https://constanta.ru",
  "logo": "https://constanta.ru/assets/logo.svg",
  "description": "Производство и монтаж светопрозрачных конструкций, остекление и комплексное переоборудование школ и общественных пространств.",
  "telephone": "+7 (495) 000-00-00",
  "email": "info@constanta.ru",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Примерная, д. 10",
    "addressLocality": "Москва",
    "postalCode": "101000",
    "addressCountry": "RU"
  }
}
```

## 2. Разметка навигационных цепочек (BreadcrumbList)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://constanta.ru/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Школьные проекты",
      "item": "https://constanta.ru/schools.html"
    }
  ]
}
```

## 3. Мета-теги OpenGraph (для соцсетей, Telegram, WhatsApp)
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">
<meta property="og:title" content="Комплексное переоборудование и остекление школ | ООО «Константа»">
<meta property="og:description" content="Реализованные проекты по переоборудованию входных групп, фасадов и пространств образовательных учреждений Москвы.">
<meta property="og:image" content="https://constanta.ru/assets/og-cover.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```
