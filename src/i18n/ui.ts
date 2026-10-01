export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    "site.title": "Amin Nateghi - Personal Portfolio",
    "nav.about": "About",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.lang.en": "EN",
    "nav.lang.fa": "FA",
    "about.title": "About me",
    "about.p1":
      "I am a front-end developer with back-end experience, specializing in the design and implementation of efficient, user-friendly web solutions and management dashboards. My primary passion lies in transforming complex challenges into simple, beautiful, and engaging designs.",
    "about.p2":
      "I leverage leading frameworks and technologies—such as React, Vue, and Angular—to develop custom management dashboards tailored to clients' specific needs. My technical expertise encompasses a range of tools and technologies, including Nuxt, Astro, TypeScript, Nest, Prisma, and GraphQL.",
    "about.doing": "What i'm doing",
    "about.skills": "What I know",
    "portfolio.title": "Portfolio",
    "resume.title": "Resume",
    "resume.experience": "Experience",
    "sidebar.myName": "Amin Nateghi",
    "sidebar.role": "Frontend developer",
    "sidebar.github": "GitHub",
    "sidebar.linkedin": "LinkedIn",
    "sidebar.madeWith": "Made with ❤️ By Amin Nateghi",
    "modal.prev": "Previous image",
    "modal.next": "Next image",
  },
  fa: {
    "site.title": "امین ناطقی - سایت شخصی",
    "nav.about": "معرفی",
    "nav.resume": "رزومه",
    "nav.portfolio": "نمونه‌کارها",
    "nav.lang.en": "EN",
    "nav.lang.fa": "FA",
    "about.title": "معرفی",
    "about.p1":
"من یک توسعه دهنده فرانت‌اند (Front-end) هستم که تجربه کار  در حوزه بک‌اند (Back-end) دارم، تخصص من طراحی و پیاده‌سازی راهکارهای وب کارآمد و کاربرپسند، همچنین پنل‌های مدیریتی است. اشتیاق اصلی من، تبدیل چالش‌های پیچیده به طرح‌هایی ساده، زیبا و جذاب است.",
    "about.p2":
      "من برای توسعه پنل‌های مدیریتی اختصاصی و متناسب با نیازهای دقیق مشتریان، از فریم‌ورک‌ها و فناوری‌های پیشرویی همچون React، Vue و Angular بهره می‌برم. دامنه تخصص فنی من شامل مجموعه‌ای از ابزارها و فناوری‌ها نظیر Nuxt، Astro، TypeScript، Nest، Prisma، GraphQL، می‌شود.",
    "about.doing": "تجربه در",
    "about.skills": "مهارت‌ها",
    "portfolio.title": "نمونه‌کارها",
    "resume.title": "رزومه",
    "resume.experience": "سوابق کاری",
    "sidebar.myName": "امین ناطقی",
    "sidebar.role": "توسعه‌دهنده وب",
    "sidebar.github": "گیت‌هاب",
    "sidebar.linkedin": "لینکدین",
    "sidebar.madeWith": "ساخته شده با ❤️ توسط امین ناطقی",
    "modal.prev": "تصویر قبلی",
    "modal.next": "تصویر بعدی",
  },
};
