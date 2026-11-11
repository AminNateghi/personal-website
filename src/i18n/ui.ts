export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    "site.title": "Amin Nateghi",
    "site.description": "Personal Portfolio",
    "nav.about": "About",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.lang.en": "EN",
    "nav.lang.fa": "فا",
    "nav.blog": "Blog",
    "about.title": "About me",
    "about.p1":
      "I am a programmer with most of my experience in the front-end, but I have an equal amount of experience in the back-end and in developing Android applications. My primary passion lies in transforming complex challenges into simple, beautiful, and engaging designs.",
    "about.p2":
      "I leverage leading frameworks and technologies—such as React, Vue, and Angular—to develop custom management dashboards tailored to clients' specific needs. My technical expertise encompasses a range of tools and technologies, including Nuxt, Astro, TypeScript, Nest, Prisma, and GraphQL. I also use React Native and Expo for developing Android apps, and SQLite for the database.",
    "about.doing": "What i'm doing",
    "about.skills": "What I know",
    "portfolio.title": "Portfolio",
    "resume.title": "Resume",
    "resume.experience": "Experience",
    "sidebar.myName": "Amin Nateghi",
    "sidebar.role": "Software Engineer",
    "sidebar.github": "GitHub",
    "sidebar.linkedin": "LinkedIn",
    "sidebar.madeWith": "Made with ❤️ By Amin Nateghi",
    "modal.prev": "Previous image",
    "modal.next": "Next image",
  },
  fa: {
    "site.title": "امین ناطقی",
    "site.description": "سایت شخصی",
    "nav.about": "معرفی",
    "nav.resume": "رزومه",
    "nav.portfolio": "نمونه‌کارها",
    "nav.lang.en": "EN",
    "nav.lang.fa": "FA",
    "nav.blog": "وبلاگ",
    "about.title": "معرفی",
    "about.p1":
      "من یک برنامه نویس هستم که بیشتر تجربه من تو بخش فرانت‌اند بوده، اما به همین اندازه در بک‌اند و تولید اپ‌های اندرویدی تجربه دارم. تخصص من طراحی و پیاده‌سازی نرم‌افزاهای تحت وب، پنل‌های مدیریتی و تولید برنامه‌های اندرویدی است. اشتیاق اصلی من، تبدیل چالش‌های پیچیده به طرح‌هایی ساده، زیبا و جذاب است.",
    "about.p2":
      "من برای توسعه نرم‌افزاهای تحت وب و پنل‌های مدیریتی اختصاصی و متناسب با نیازهای دقیق مشتریان، از فریم‌ورک‌ها و فناوری‌های پیشرویی همچون React، Vue و Angular بهره می‌برم. دامنه تخصص فنی من شامل مجموعه‌ای از ابزارها و فناوری‌ها نظیر Nuxt، Astro، TypeScript، Nest، Prisma، DrizzleORM، GraphQL، می‌شود. همچنین برای تولید اپ‌های اندروید از React Native و Expo و برای دیتابیس از SQLite استفاده می‌کنم.",
    "about.doing": "تجربه در",
    "about.skills": "مهارت‌ها",
    "portfolio.title": "نمونه‌کارها",
    "resume.title": "رزومه",
    "resume.experience": "سوابق کاری",
    "sidebar.myName": "امین ناطقی",
    "sidebar.role": "مهندس نرم‌افزار",
    "sidebar.github": "گیت‌هاب",
    "sidebar.linkedin": "لینکدین",
    "sidebar.madeWith": "ساخته شده با ❤️ توسط امین ناطقی",
    "modal.prev": "تصویر قبلی",
    "modal.next": "تصویر بعدی",
  },
};
