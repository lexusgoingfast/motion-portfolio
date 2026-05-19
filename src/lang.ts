import { applyRuTypographyDeep } from './typography'

export type Lang = 'en' | 'ru'

const ru = {
  name: 'Алексей Максимовских',
  sidebar_tagline:
    'Продакт-дизайнер и Creative Director\nсо стажем 4+ лет',
  nav: ['Работы', 'Обо мне', 'Услуги', 'Опыт', 'Контакт'],
  info: 'Инфо',
  available: 'Открыт к проектам',
  location: 'Москва / удалённо',
  email: 'a.maximovskikh@gmail.com',
  telegram: '@mxmvskh',
  telegramUrl: 'https://t.me/mxmvskh',
  phone: '+79778253155',

  hero: 'Работаю с интерфейсами, визуальными системами и digital-опытом для продуктов, брендов и культурных проектов.',

  about_label: 'Обо мне',
  about_title: 'Я делаю цифровые и визуальные проекты, в которых важны не только логика и функция, но и ощущение.',
  about_body: 'Мультидисциплинарный дизайнер с опытом в UX/UI, визуальных коммуникациях, брендинге, AI-визуале и digital production. Работаю с интерфейсами, визуальными системами, сайтами, презентациями и креативными концепциями. Умею соединять эстетику, логику и подачу — чтобы проект выглядел современно, цельно и убедительно.',
  about_table: [
    ['Статус', 'Открыт к проектам'],
    ['Локация', 'Москва / удалённо'],
    ['Языки', 'Русский — родной, английский — B2'],
    ['Образование', 'РГГУ + НИУ ВШЭ'],
    ['Фокус', 'Art Direction, UX/UI, Brand'],
  ],

  roles_label: 'Роли',
  roles: ['Art Direction', 'UX/UI Design', 'Brand Thinking', 'Visual Communication', 'Digital Design', 'AI Visual Production'],

  services_label: 'Услуги',
  services: [
    ['Интерфейсы и Digital Products', 'UX/UI дизайн для Web и Mobile, компонентные системы, прототипы'],
    ['Визуальные системы и айдентика', 'Брендинг, логотипы, Style Guide, дизайн-язык'],
    ['Сайты и лендинги', 'Дизайн и вёрстка в Figma / Framer, готово к разработке'],
    ['Презентации и Storytelling', 'Pitch Decks, инвесторские и продуктовые презентации'],
    ['AI-визуал и видеоконтент', 'Midjourney, Kling, пайплайны для изображений и видео'],
    ['Креативные концепции и Moodboard', 'Art Direction, концепт-девелопмент, визуальный ресерч'],
  ],

  approach_label: 'Подход',
  approach: ['Visual Thinking', 'Системность', 'Постоянный ресерч', 'Внимание к деталям', 'Самостоятельность'],

  tools_label: 'Инструменты',
  tools: 'Figma — Photoshop — Illustrator — Pixelmator — Notion — Framer — Ableton Live — Midjourney — Kling — Cursor — Trae — Claude',

  exp_label: 'Опыт',
  experience: [
    { company: 'Tape Production', role: 'AI, визуал, YouTube thumbnails', period: '2026' },
    { company: 'ПИК', role: 'Visual Creator — digital, AI-визуал, UX/UI, презентации', period: '2025–2026' },
    { company: 'ПИК', role: 'Visual Digital и коммуникации', period: '2024' },
    { company: 'IBLS', role: 'UX/UI дизайн, интерфейсы и продукт', period: '2022–2024' },
  ],

  edu_label: 'Образование',
  education: [
    { school: 'НИУ ВШЭ', program: 'Дизайн цифрового продукта', period: '2023–2025' },
    { school: 'РГГУ', program: 'Реклама и PR', period: '2019–2023' },
  ],

  contact_label: 'Контакт',
  contact_email_label: 'Email',
  contact_telegram_label: 'Telegram',
  contact_phone_label: 'Телефон',
  contact_title: 'Давайте сделаем что-то вместе.',
  contact_sub: 'Открыт к фриланс-проектам, коллаборациям\nи активно ищу фулл-тайм работу.',
}

export const t = {
  en: {
    name: 'Alexey Maksimovskikh',
    sidebar_tagline:
      'Product Designer and Creative Director\n4+ years of experience',
    nav: ['Work', 'About', 'Services', 'Experience', 'Contact'],
    info: 'Info',
    available: 'Available for work',
    location: 'Moscow / remote',
    email: 'a.maximovskikh@gmail.com',
    telegram: '@mxmvskh',
    telegramUrl: 'https://t.me/mxmvskh',
    phone: '+79778253155',

    hero: 'I work with interfaces, visual systems and digital experiences for products, brands and cultural projects.',

    about_label: 'About',
    about_title: 'I make digital and visual projects where logic, function and feeling matter equally.',
    about_body: 'Multidisciplinary designer with experience in UX/UI, visual communication, branding, AI visuals and digital production. I work with interfaces, visual systems, websites, presentations and creative concepts. My strength is connecting aesthetics, logic and delivery so a project looks contemporary, coherent and convincing.',
    about_table: [
      ['Status', 'Available for work'],
      ['Location', 'Moscow / remote'],
      ['Languages', 'Russian — native, English — B2'],
      ['Education', 'RSUH + HSE'],
      ['Focus', 'Art Direction, UX/UI, Brand'],
    ],

    roles_label: 'Roles',
    roles: ['Art Direction', 'UX/UI Design', 'Brand Thinking', 'Visual Communication', 'Digital Design', 'AI Visual Production'],

    services_label: 'Services',
    services: [
      ['Interfaces & Digital Products', 'UX/UI design for web and mobile, component systems, prototypes'],
      ['Visual Systems & Identity', 'Brand identity, logo systems, style guides, design language'],
      ['Websites & Landing Pages', 'Design and layout in Figma / Framer, ready for development'],
      ['Presentations & Storytelling', 'Pitch decks, investor and product presentations'],
      ['AI Visual & Video Content', 'Midjourney, Kling, image and video production pipelines'],
      ['Creative Concepts & Moodboards', 'Art direction, concept development, visual research'],
    ],

    approach_label: 'Approach',
    approach: ['Visual Thinking', 'Systematic Work', 'Constant Research', 'Attention to Detail', 'Independence'],

    tools_label: 'Tools',
    tools: 'Figma — Photoshop — Illustrator — Pixelmator — Notion — Framer — Ableton Live — Midjourney — Kling — Cursor — Trae — Claude',

    exp_label: 'Experience',
    experience: [
      { company: 'Tape Production', role: 'AI, visuals, YouTube thumbnails', period: '2026' },
      { company: 'ПИК', role: 'Visual creator — digital, AI visuals, UX/UI, presentations', period: '2025–2026' },
      { company: 'ПИК', role: 'Visual digital & communications', period: '2024' },
      { company: 'IBLS', role: 'UX/UI design, interfaces & product', period: '2022–2024' },
    ],

    edu_label: 'Education',
    education: [
      { school: 'HSE University', program: 'Digital product design', period: '2023–2025' },
      { school: 'RSUH', program: 'Advertising & PR', period: '2019–2023' },
    ],

    contact_label: 'Contact',
    contact_email_label: 'Email',
    contact_telegram_label: 'Telegram',
    contact_phone_label: 'Phone',
    contact_title: "Let's make something together.",
    contact_sub: 'Open to freelance projects, collaborations\nand actively looking for a full-time role.',
  },
  ru: applyRuTypographyDeep(ru),
}
