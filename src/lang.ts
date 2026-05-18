import { applyRuTypographyDeep } from './typography'

export type Lang = 'en' | 'ru'

const ru = {
  name: 'Алексей Максимовских',
  sidebar_tagline:
    'product & ux/ui дизайнер · 4+ года ·\nart direction, brand',
  nav: ['работы', 'обо мне', 'услуги', 'опыт', 'контакт'],
  info: 'инфо',
  available: 'открыт к проектам',
  location: 'москва / удалённо',
  email: 'a.maximovskikh@gmail.com',
  telegram: '@mxmvskh',

  hero: 'работаю с интерфейсами, визуальными системами и digital-опытом для продуктов, брендов и культурных проектов.',

  about_label: 'обо мне',
  about_title: 'я делаю цифровые и визуальные проекты, в которых важны не только логика и функция, но и ощущение.',
  about_body: 'мультидисциплинарный дизайнер с опытом в ux/ui, визуальных коммуникациях, брендинге, ai-визуале и digital production. работаю с интерфейсами, визуальными системами, сайтами, презентациями и креативными концепциями. умею соединять эстетику, логику и подачу — чтобы проект выглядел современно, цельно и убедительно.',
  about_table: [
    ['статус', 'открыт к проектам'],
    ['локация', 'москва / удалённо'],
    ['языки', 'русский — родной, английский — b2'],
    ['образование', 'рггу + ниу вшэ'],
    ['фокус', 'art direction, ux/ui, brand'],
  ],

  roles_label: 'роли',
  roles: ['art direction', 'ux/ui design', 'brand thinking', 'visual communication', 'digital design', 'ai visual production'],

  services_label: 'услуги',
  services: [
    ['интерфейсы и digital products', 'ux/ui дизайн для web и mobile, компонентные системы, прототипы'],
    ['визуальные системы и айдентика', 'брендинг, логотипы, style guide, дизайн-язык'],
    ['сайты и лендинги', 'дизайн и вёрстка в figma / framer, готово к разработке'],
    ['презентации и storytelling', 'pitch decks, инвесторские и продуктовые презентации'],
    ['ai-визуал и видеоконтент', 'midjourney, kling, пайплайны для изображений и видео'],
    ['креативные концепции и moodboard', 'art direction, концепт-девелопмент, визуальный ресерч'],
  ],

  approach_label: 'подход',
  approach: ['visual thinking', 'системность', 'постоянный ресерч', 'внимание к деталям', 'самостоятельность'],

  tools_label: 'инструменты',
  tools: 'Figma — Photoshop — Illustrator — Pixelmator — Notion — Framer — Ableton Live — Midjourney — Kling — Cursor — Trae — Claude',

  exp_label: 'опыт',
  experience: [
    { company: 'Tape Production', role: 'ai, визуал, youtube thumbnails', period: '2026' },
    { company: 'ПИК', role: 'visual creator — digital, ai-визуал, ux/ui, презентации', period: '2025–2026' },
    { company: 'ПИК', role: 'visual digital и коммуникации', period: '2024' },
    { company: 'IBLS', role: 'ux/ui дизайн, интерфейсы и продукт', period: '2022–2024' },
  ],

  edu_label: 'образование',
  education: [
    { school: 'НИУ ВШЭ', program: 'дизайн цифрового продукта', period: '2023–2025' },
    { school: 'РГГУ', program: 'реклама и pr', period: '2019–2023' },
  ],

  contact_label: 'контакт',
  contact_title: 'давайте сделаем\nчто-то вместе.',
  contact_sub: 'открыт к фриланс-проектам,\nколлаборациям и постоянной работе.',
  name_pl: 'ваше имя',
  email_pl: 'ваш@email.com',
  msg_pl: 'расскажите о проекте...',
  send: 'отправить →',
  sent: '✓ отправлено',
}

export const t = {
  en: {
    name: 'Alexey Maksimovskikh',
    sidebar_tagline:
      'product & ux/ui designer · 4+ years ·\nart direction, brand',
    nav: ['work', 'about', 'services', 'experience', 'contact'],
    info: 'info',
    available: 'available for work',
    location: 'moscow / remote',
    email: 'a.maximovskikh@gmail.com',
    telegram: '@mxmvskh',

    hero: 'i work with interfaces, visual systems and digital experiences for products, brands and cultural projects.',

    about_label: 'about',
    about_title: 'i make digital and visual projects where logic, function and feeling matter equally.',
    about_body: 'multidisciplinary designer with experience in ux/ui, visual communication, branding, ai visuals and digital production. i work with interfaces, visual systems, websites, presentations and creative concepts. my strength is connecting aesthetics, logic and delivery so a project looks contemporary, coherent and convincing.',
    about_table: [
      ['status', 'available for work'],
      ['location', 'moscow / remote'],
      ['languages', 'russian — native, english — b2'],
      ['education', 'rsuh + hse'],
      ['focus', 'art direction, ux/ui, brand'],
    ],

    roles_label: 'roles',
    roles: ['art direction', 'ux/ui design', 'brand thinking', 'visual communication', 'digital design', 'ai visual production'],

    services_label: 'services',
    services: [
      ['interfaces & digital products', 'ux/ui design for web and mobile, component systems, prototypes'],
      ['visual systems & identity', 'brand identity, logo systems, style guides, design language'],
      ['websites & landing pages', 'design and layout in figma / framer, ready for development'],
      ['presentations & storytelling', 'pitch decks, investor and product presentations'],
      ['ai visual & video content', 'midjourney, kling, image and video production pipelines'],
      ['creative concepts & moodboards', 'art direction, concept development, visual research'],
    ],

    approach_label: 'approach',
    approach: ['visual thinking', 'systematic work', 'constant research', 'attention to detail', 'independence'],

    tools_label: 'tools',
    tools: 'Figma — Photoshop — Illustrator — Pixelmator — Notion — Framer — Ableton Live — Midjourney — Kling — Cursor — Trae — Claude',

    exp_label: 'experience',
    experience: [
      { company: 'Tape Production', role: 'ai, visuals, youtube thumbnails', period: '2026' },
      { company: 'ПИК', role: 'visual creator — digital, ai visuals, ux/ui, presentations', period: '2025–2026' },
      { company: 'ПИК', role: 'visual digital & communications', period: '2024' },
      { company: 'IBLS', role: 'ux/ui design, interfaces & product', period: '2022–2024' },
    ],

    edu_label: 'education',
    education: [
      { school: 'HSE University', program: 'digital product design', period: '2023–2025' },
      { school: 'RSUH', program: 'advertising & pr', period: '2019–2023' },
    ],

    contact_label: 'contact',
    contact_title: "let's make\nsomething together.",
    contact_sub: 'open to freelance projects,\ncollaborations and full-time roles.',
    name_pl: 'your name',
    email_pl: 'your@email.com',
    msg_pl: 'tell me about your project...',
    send: 'send message →',
    sent: '✓ sent',
  },
  ru: applyRuTypographyDeep(ru),
}
