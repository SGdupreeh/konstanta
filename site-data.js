/*
 * Единая точка данных ООО «Константа»
 * Факты по 9 школам, навигация, документы и реквизиты.
 */
window.CONSTANTA_NAV = [
  ['Объекты', 'projects.html'],
  ['Продукция и цех', 'solutions.html'],
  ['Документы', 'documents.html'],
  ['Контакты', 'contacts.html']
];

window.CONSTANTA_SCHOOLS = [
  {
    id: 1,
    slug: 'bataisky',
    title: 'Школа на Батайском проезде',
    shortTitle: 'Батайский проезд',
    address: 'Москва, Батайский проезд, д. 21',
    district: 'ЮВАО · Марьино',
    year: '2023',
    categories: ['doors', 'windows', 'mgn'],
    cover: 'assets/school-objects/bataisky/entrance.jpg',
    summary: 'Комплексный капитальный ремонт входных групп, светопрозрачных конструкций и дверных блоков здания школы.',
    actualWorks: [
      'Входная группа и тамбурная зона',
      'Оконные блоки ПВХ по ГОСТ 23166-2021',
      'Противопожарные двери EI-60',
      'Пандус и поручни МГН из нержавеющей стали'
    ],
    gallery: [
      { src: 'assets/school-objects/bataisky/entrance.jpg', title: 'Входная группа и входной портал' },
      { src: 'assets/school-objects/bataisky/windows.jpg', title: 'Оконные блоки классов и фасада' },
      { src: 'assets/school-objects/bataisky/doors.jpg', title: 'Межкомнатные и противопожарные двери' },
      { src: 'assets/school-objects/bataisky/group.jpg', title: 'Общая зона входного узла' }
    ],
    specs: [
      ['Объём конструкций', '420 м² остекления, 86 дверей'],
      ['Срок выполнения', 'Летние каникулы (52 дня)'],
      ['Предел огнестойкости', 'EI-60 (сертификат ФЗ-123)'],
      ['Статус приёмки', 'Сдано к 1 сентября без замечаний']
    ],
    auditShield: null
  },
  {
    id: 2,
    slug: 'tallinskaya',
    title: 'Школа № 1302 им. М. И. Цветаевой',
    shortTitle: 'Таллинская ул. (им. Цветаевой)',
    address: 'Москва, Таллинская ул., д. 20, корп. 4',
    district: 'СЗАО · Строгино',
    year: '2023',
    categories: ['doors'],
    cover: 'assets/school-objects/tallinskaya/doors.jpg',
    summary: 'Специализированное изготовление и монтаж внутренних дверных систем: межкомнатные двери ПВХ, алюминиевые блоки и противопожарные преграды EI-60.',
    actualWorks: [
      'Межкомнатные двери ПВХ для учебных классов',
      'Алюминиевые дверные блоки коридоров и холлов',
      'Противопожарные металлические двери EI-60 с доводчиками',
      'Усиленная износостойкая фурнитура и антипаника'
    ],
    gallery: [
      { src: 'assets/school-objects/tallinskaya/doors.jpg', title: 'Межкомнатные и противопожарные двери EI-60' }
    ],
    specs: [
      ['Объём конструкций', '112 дверных блоков'],
      ['Срок выполнения', 'Летние каникулы (45 дней)'],
      ['Предел огнестойкости', 'EI-60 (ГОСТ Р 57327-2016)'],
      ['Специализация', 'Строго внутренние дверные группы']
    ],
    auditShield: {
      active: true,
      badge: 'Протокол разграничения объёмов работ (Audit Shield)',
      title: 'Юридическое разграничение подрядных объёмов',
      text: 'ВНИМАНИЕ ТЕХНАДЗОРУ И ГЕНПОДРЯДЧИКАМ: ООО «Константа» на данном объекте выполняло ИСКЛЮЧИТЕЛЬНО изготовление, поставку и монтаж внутренних дверных блоков (двери ПВХ, алюминиевые и противопожарные преграды EI-60). Оконные блоки, витражное остекление и фасадные входные группы выполнялись сторонними подрядными организациями. Данные зафиксированы в актах разграничения зон ответственности.'
    }
  },
  {
    id: 3,
    slug: 'anokhina',
    title: 'Школа на улице Академика Анохина',
    shortTitle: 'Академика Анохина',
    address: 'Москва, ул. Академика Анохина, д. 40, корп. 2',
    district: 'ЗАО · Тропарёво-Никулино',
    year: '2023',
    categories: ['doors', 'windows', 'mgn'],
    cover: 'assets/school-objects/anokhina/entrance.jpg',
    summary: 'Модернизация оконных проёмов учебных классов, установка противопожарных дверей и входной группы с элементами МГН.',
    actualWorks: [
      'Входной портал и входная группа',
      'Оконные блоки классов с детскими замками безопасности',
      'Противопожарные двери EI-60 путей эвакуации',
      'Пандус и ограждения для маломобильных групп'
    ],
    gallery: [
      { src: 'assets/school-objects/anokhina/entrance.jpg', title: 'Входной портал и входная группа' },
      { src: 'assets/school-objects/anokhina/windows.jpg', title: 'Остекление классов' },
      { src: 'assets/school-objects/anokhina/doors.jpg', title: 'Противопожарные двери' },
      { src: 'assets/school-objects/anokhina/group.jpg', title: 'Общая группа входной зоны' }
    ],
    specs: [
      ['Объём конструкций', '580 м² остекления, 94 двери'],
      ['Срок выполнения', 'Летние каникулы (48 дней)'],
      ['Безопасность', 'Детские замки ГОСТ 23166-2021'],
      ['Статус приёмки', 'Сдано технадзору в срок']
    ],
    auditShield: null
  },
  {
    id: 4,
    slug: 'obrucheva',
    title: 'Школа на улице Обручева',
    shortTitle: 'Улица Обручева',
    address: 'Москва, ул. Обручева, д. 28А',
    district: 'ЮЗАО · Обручевский',
    year: '2023',
    categories: ['doors', 'windows'],
    cover: 'assets/school-objects/obrucheva/stained-glass.jpg',
    summary: 'Монтаж тёплых алюминиевых витражей лестничных клеток, входного тамбура и противопожарных преград.',
    actualWorks: [
      'Алюминиевые витражные конструкции',
      'Входная группа с автоматическими доводчиками',
      'Противопожарные двери EI-60',
      'Межкомнатные двери рекреаций'
    ],
    gallery: [
      { src: 'assets/school-objects/obrucheva/stained-glass.jpg', title: 'Алюминиевые витражи' },
      { src: 'assets/school-objects/obrucheva/doors.jpg', title: 'Дверные блоки' },
      { src: 'assets/school-objects/obrucheva/entrance.jpg', title: 'Входная группа' },
      { src: 'assets/school-objects/obrucheva/group.jpg', title: 'Интерьерные перегородки' }
    ],
    specs: [
      ['Объём конструкций', '390 м² витражей, 68 дверей'],
      ['Срок выполнения', '42 дня'],
      ['Профиль', 'Тёплый алюминиевый сплав'],
      ['Статус приёмки', 'Объект сдан в эксплуатацию']
    ],
    auditShield: null
  },
  {
    id: 5,
    slug: 'mozhayskoye',
    title: 'Школа на Можайском шоссе',
    shortTitle: 'Можайское шоссе',
    address: 'Москва, Можайское шоссе, д. 38, корп. 2',
    district: 'ЗАО · Можайский',
    year: '2023',
    categories: ['doors', 'windows'],
    cover: 'assets/school-objects/mozhayskoye/entrance.jpg',
    summary: 'Комплекс работ по замене оконных блоков, витражному остеклению рекреаций и монтажу входного узла.',
    actualWorks: [
      'Оконные конструкции ГОСТ 23166-2021',
      'Витражное остекление холлов и рекреаций',
      'Входной узел с противоударным триплексом',
      'Дверные блоки общего назначения'
    ],
    gallery: [
      { src: 'assets/school-objects/mozhayskoye/entrance.jpg', title: 'Входной узел' },
      { src: 'assets/school-objects/mozhayskoye/windows.jpg', title: 'Окна классов' },
      { src: 'assets/school-objects/mozhayskoye/stained-glass.jpg', title: 'Витражные конструкции' },
      { src: 'assets/school-objects/mozhayskoye/doors.jpg', title: 'Двери коридоров' }
    ],
    specs: [
      ['Объём конструкций', '510 м² остекления, 78 дверей'],
      ['Срок выполнения', '49 дней'],
      ['Стеклопакет', 'Энергосберегающий с триплексом'],
      ['Статус приёмки', 'Акты КС-2 подписаны']
    ],
    auditShield: null
  },
  {
    id: 6,
    slug: 'krasnodarsky',
    title: 'Школа на Краснодарском проезде, 9',
    shortTitle: 'Краснодарский проезд',
    address: 'Москва, Краснодарский проезд, д. 9',
    district: 'ЮВАО · Люблино',
    year: '2023',
    categories: ['doors', 'windows'],
    cover: 'assets/school-objects/krasnodarsky/entrance.jpg',
    summary: 'Монтаж фасадных витражей, светопрозрачных блоков классов с защитными замками и прочных входных дверей.',
    actualWorks: [
      'Фасадные витражные системы',
      'Оконные блоки классов с блокираторами',
      'Входной тамбур с двойным контуром уплотнения',
      'Дверные преграды холлов'
    ],
    gallery: [
      { src: 'assets/school-objects/krasnodarsky/entrance.jpg', title: 'Входной тамбур' },
      { src: 'assets/school-objects/krasnodarsky/windows.jpg', title: 'Оконные блоки классов' },
      { src: 'assets/school-objects/krasnodarsky/stained-glass.jpg', title: 'Витражные системы' },
      { src: 'assets/school-objects/krasnodarsky/doors.jpg', title: 'Дверные блоки' }
    ],
    specs: [
      ['Объём конструкций', '460 м² остекления, 82 двери'],
      ['Срок выполнения', 'Летний период (44 дня)'],
      ['Фурнитура', 'Усиленная с антивандальной защитой'],
      ['Статус приёмки', 'Сдано к началу учебного года']
    ],
    auditShield: null
  },
  {
    id: 7,
    slug: 'koshkina',
    title: 'Школа на улице Кошкина, 13',
    shortTitle: 'Улица Кошкина, 13',
    address: 'Москва, ул. Кошкина, д. 13, корп. 1',
    district: 'ЮАО · Москворечье-Сабурово',
    year: '2023',
    categories: ['doors', 'windows', 'mgn'],
    cover: 'assets/school-objects/koshkina/entrance.jpg',
    summary: 'Полная замена остекления, установка противопожарных дверей EI-60, витражных перегородок и входной группы с пандусом МГН.',
    actualWorks: [
      'Главный вход и пандус МГН по СП 59.13330',
      'Оконные блоки учебных классов',
      'Противопожарные двери EI-60 с антипаникой',
      'Витражные перегородки рекреаций'
    ],
    gallery: [
      { src: 'assets/school-objects/koshkina/entrance.jpg', title: 'Главный вход и пандус МГН' },
      { src: 'assets/school-objects/koshkina/windows.jpg', title: 'Оконные блоки' },
      { src: 'assets/school-objects/koshkina/doors.jpg', title: 'Противопожарные двери EI-60' },
      { src: 'assets/school-objects/koshkina/stained-glass.jpg', title: 'Витражи рекреаций' }
    ],
    specs: [
      ['Объём конструкций', '620 м² остекления, 115 дверей'],
      ['Срок выполнения', '50 дней'],
      ['Доступная среда', 'Пандус с уклоном 1:20, поручни 304'],
      ['Статус приёмки', 'Сдано без единого замечания']
    ],
    auditShield: null
  },
  {
    id: 8,
    slug: 'sholokhova',
    title: 'Школа на улице Шолохова',
    shortTitle: 'Улица Шолохова',
    address: 'Москва, ул. Шолохова, д. 19',
    district: 'ЗАО · Ново-Переделкино',
    year: '2023',
    categories: ['doors', 'windows'],
    cover: 'assets/school-objects/sholokhova/entrance.jpg',
    summary: 'Изготовление и установка алюминиевых витражей, противопожарных дверей путей эвакуации и входного тамбура.',
    actualWorks: [
      'Входная группа с тёплым притвором',
      'Алюминиевые витражные конструкции',
      'Противопожарные двери EI-60',
      'Межкомнатные двери кабинетов'
    ],
    gallery: [
      { src: 'assets/school-objects/sholokhova/entrance.jpg', title: 'Входная группа' },
      { src: 'assets/school-objects/sholokhova/stained-glass.jpg', title: 'Алюминиевые витражи' },
      { src: 'assets/school-objects/sholokhova/doors.jpg', title: 'Противопожарные двери EI-60' },
      { src: 'assets/school-objects/sholokhova/group.jpg', title: 'Входной тамбур' }
    ],
    specs: [
      ['Объём конструкций', '340 м² конструкций, 72 двери'],
      ['Срок выполнения', '40 дней'],
      ['Огнестойкость', 'Предел EI-60 подтверждён протоколами'],
      ['Статус приёмки', 'Введено в эксплуатацию']
    ],
    auditShield: null
  },
  {
    id: 9,
    slug: 'yuzhnoportovy',
    title: 'Школа на Южнопортовом проезде',
    shortTitle: 'Южнопортовый проезд',
    address: 'Москва, 2-й Южнопортовый проезд, д. 11',
    district: 'ЮВАО · Южнопортовый',
    year: '2023',
    categories: ['doors', 'windows'],
    cover: 'assets/school-objects/yuzhnoportovy/entrance.jpg',
    summary: 'Реконструкция фасадного входного портала, монтаж энергоэффективных оконных систем и дверных блоков.',
    actualWorks: [
      'Входной фасадный портал',
      'Оконные блоки ПВХ повышенной теплоизоляции',
      'Витражное остекление вестибюля',
      'Межкомнатные и противопожарные двери'
    ],
    gallery: [
      { src: 'assets/school-objects/yuzhnoportovy/entrance.jpg', title: 'Входной фасадный портал' },
      { src: 'assets/school-objects/yuzhnoportovy/windows.jpg', title: 'Окна классов' },
      { src: 'assets/school-objects/yuzhnoportovy/stained-glass.jpg', title: 'Витражи вестибюля' },
      { src: 'assets/school-objects/yuzhnoportovy/doors.jpg', title: 'Дверные блоки' }
    ],
    specs: [
      ['Объём конструкций', '480 м² остекления, 96 дверей'],
      ['Срок выполнения', '46 дней'],
      ['Стеклопакет', 'Двухкамерный с аргоном'],
      ['Статус приёмки', 'Сдано заказчику 28 августа']
    ],
    auditShield: null
  }
];

// Совместимость с предыдущими наименованиями
window.CONSTANTA_PROJECTS = window.CONSTANTA_SCHOOLS;
window.CONSTANTA_SCHOOL_OBJECTS = window.CONSTANTA_SCHOOLS;

window.CONSTANTA_DOCUMENTS = [
  {
    title: 'Выписка из реестра членов СРО',
    subtitle: 'Ассоциация строителей · Допуск до 500 млн руб.',
    category: 'СРО',
    date: 'Действует бессрочно',
    badge: 'Верифицировано',
    file: '#',
    fileName: 'Vypiska_SRO_OOO_Konstanta.pdf',
    size: '1.8 МБ'
  },
  {
    title: 'Сертификат соответствия ФЗ № 123 (EI-60)',
    subtitle: 'Противопожарные двери металлические глухие и остеклённые',
    category: 'Пожарная безопасность',
    date: 'Действителен до 2027 г.',
    badge: 'ГОСТ Р 57327-2016',
    file: '#',
    fileName: 'Certifikat_EI60_Konstanta.pdf',
    size: '2.4 МБ'
  },
  {
    title: 'Сертификат соответствия ГОСТ 23166-2021',
    subtitle: 'Блоки оконные и балконные для образовательных учреждений',
    category: 'Оконные конструкции',
    date: 'Действителен до 2026 г.',
    badge: 'Детские замки',
    file: '#',
    fileName: 'Certifikat_GOST_Okna_Konstanta.pdf',
    size: '1.6 МБ'
  },
  {
    title: 'Экспертное санитарно-эпидемиологическое заключение',
    subtitle: 'Разрешено применение в детских садах, школах и колледжах',
    category: 'СанПиН',
    date: 'Действует бессрочно',
    badge: 'Роспотребнадзор',
    file: '#',
    fileName: 'Sanitarnoe_Zaklyuchenie_Shkoly.pdf',
    size: '1.2 МБ'
  }
];

window.CONSTANTA_REQUISITES = {
  name: 'Общество с ограниченной ответственностью «Константа»',
  shortName: 'ООО «Константа»',
  inn: '7725838491',
  kpp: '772501001',
  ogrn: '1147746927510',
  legalAddress: '115280, г. Москва, ул. Ленинская Слобода, д. 19, офис 302',
  factoryAddress: 'г. Москва, Проектируемый проезд № 4062, д. 6, стр. 16',
  bank: 'ПАО «Сбербанк России» г. Москва',
  bik: '044525225',
  rs: '40702810438000012345',
  ks: '30101810400000000225',
  phone: '+7 915 015-66-05',
  email: 'info@konstanta-msk.ru',
  director: 'Генеральный директор / Руководитель проектов'
};
