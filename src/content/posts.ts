export interface PostMeta {
  slug: string
  path: string
  lang: string
  languageLabel: string
  title: string
  excerpt: string
  published: string
  readMinutes: number
  rtl?: boolean
  /** Posts sharing a translationGroup are linked with hreflang alternates. */
  translationGroup?: string
}

export const posts: PostMeta[] = [
  {
    slug: 'pomodoro-technique-explained',
    path: '/blog/pomodoro-technique-explained',
    lang: 'en',
    languageLabel: 'English',
    title: 'Pomodoro Technique Explained: Complete Guide',
    excerpt:
      'How the 25/5 method works, why it helps you focus, and how to start your first session today.',
    published: '2024-09-03',
    readMinutes: 8,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'best-study-timer-apps',
    path: '/blog/best-study-timer-apps',
    lang: 'en',
    languageLabel: 'English',
    title: 'Best Study Timer Apps: Top Pomodoro Tools for Students',
    excerpt:
      'A practical comparison of study timers and Pomodoro apps, from simple web timers to full focus suites.',
    published: '2024-09-02',
    readMinutes: 6,
  },
  {
    slug: 'focus-timer-productivity',
    path: '/blog/focus-timer-productivity',
    lang: 'en',
    languageLabel: 'English',
    title: 'Focus Timer for Productivity: Master Your Concentration',
    excerpt:
      'Use timed sessions to protect deep work, cut distractions and build a sustainable focus habit.',
    published: '2024-09-01',
    readMinutes: 7,
  },
  {
    slug: 'time-management-pomodoro',
    path: '/blog/time-management-pomodoro',
    lang: 'en',
    languageLabel: 'English',
    title: 'Time Management with Pomodoro: Master Your Schedule',
    excerpt:
      'Plan your day in pomodoros: estimating tasks, prioritising, and keeping a healthy work rhythm.',
    published: '2024-08-31',
    readMinutes: 9,
  },
  {
    slug: 'concentration-timer-techniques',
    path: '/blog/concentration-timer-techniques',
    lang: 'en',
    languageLabel: 'English',
    title: 'Concentration Timer Techniques: Master Your Focus',
    excerpt:
      'Timer-based techniques for sharper attention and longer, calmer stretches of concentration.',
    published: '2024-08-30',
    readMinutes: 6,
  },
  {
    slug: 'work-timer-better-focus',
    path: '/blog/work-timer-better-focus',
    lang: 'en',
    languageLabel: 'English',
    title: 'Work Timer for Better Focus: Transform Your Productivity',
    excerpt:
      'How a simple work timer helps in the office and at home: meetings, deep work and breaks.',
    published: '2024-08-29',
    readMinutes: 8,
  },
  {
    slug: 'pomodoro-teknigi-aciklama',
    path: '/blog/tr/pomodoro-teknigi-aciklama',
    lang: 'tr',
    languageLabel: 'Türkçe',
    title: 'Pomodoro Tekniği Açıklaması: YKS ve YDS İçin',
    excerpt: 'YKS, YDS ve üniversite hazırlığında Pomodoro tekniğiyle daha verimli çalışmanın yolu.',
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'tecnica-pomodoro-explicada',
    path: '/blog/es/tecnica-pomodoro-explicada',
    lang: 'es',
    languageLabel: 'Español',
    title: 'Técnica Pomodoro Explicada: Guía Completa',
    excerpt: 'Aprende la técnica Pomodoro paso a paso para estudiar, trabajar y concentrarte mejor.',
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'tecnica-pomodoro-completa',
    path: '/blog/it/tecnica-pomodoro-completa',
    lang: 'it',
    languageLabel: 'Italiano',
    title: 'Tecnica del Pomodoro Completa: Guida per Studenti',
    excerpt: "Il metodo del Pomodoro per preparare la maturità, i test d'ingresso e gli esami universitari.",
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'pomodoro-tehnika-polnoe-rukovodstvo',
    path: '/blog/ru/pomodoro-tehnika-polnoe-rukovodstvo',
    lang: 'ru',
    languageLabel: 'Русский',
    title: 'Техника Помодоро: полное руководство',
    excerpt: 'Эффективный метод управления временем для подготовки к ЕГЭ, ОГЭ и поступлению в вуз.',
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'pomodoro-ka-complete-guide',
    path: '/blog/hi/pomodoro-ka-complete-guide',
    lang: 'hi',
    languageLabel: 'हिन्दी',
    title: 'Pomodoro तकनीक की पूरी गाइड: JEE, NEET तैयारी',
    excerpt: 'JEE, NEET और UPSC की तैयारी के लिए समय प्रबंधन का प्रभावी तरीका।',
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'pomodoro-technique-guide',
    path: '/blog/zh/pomodoro-technique-guide',
    lang: 'zh',
    languageLabel: '中文',
    title: '番茄工作法完全指南：高考时间管理',
    excerpt: '高效学习时间管理方法，专为高考、中考、考研学生设计。',
    published: '2024-09-03',
    readMinutes: 7,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'pomodoro-arabic-guide',
    path: '/blog/ar/pomodoro-arabic-guide',
    lang: 'ar',
    languageLabel: 'العربية',
    title: 'تقنية البومودورو مفصلة: دليل شامل',
    excerpt: 'دليل شامل للدراسة والتركيز للطلاب في الدول العربية.',
    published: '2024-09-03',
    readMinutes: 7,
    rtl: true,
    translationGroup: 'pomodoro-guide',
  },
  {
    slug: 'pomodoro-technique-urdu-guide',
    path: '/blog/ur/pomodoro-technique-urdu-guide',
    lang: 'ur',
    languageLabel: 'اردو',
    title: 'پوموڈورو تکنیک کی مکمل گائیڈ',
    excerpt: 'ایم ڈی کیٹ، ای سی اے ٹی اور دیگر امتحانات کی تیاری کے لیے وقت کے انتظام کا مؤثر طریقہ۔',
    published: '2024-09-03',
    readMinutes: 7,
    rtl: true,
    translationGroup: 'pomodoro-guide',
  },
]

export const getPost = (path: string) => posts.find((post) => post.path === path)

export const getTranslations = (post: PostMeta) =>
  post.translationGroup ? posts.filter((p) => p.translationGroup === post.translationGroup) : [post]
