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
      "As a seasoned front-end developer, with robust back-end experience, I specialize in crafting intuitive and high-performing web solutions, particularly admin panels. My passion lies in transforming intricate challenges into elegantly simple and visually appealing designs. I am dedicated to building websites and admin panels that are not only practical and efficient but also deliver exceptional user experiences.",
    "about.p2":
      "I leverage cutting-edge frameworks and technologies such as React, Vue, and Angular to develop bespoke admin panels tailored precisely to client needs. My expertise extends to a comprehensive tech stack, including Nuxt, Astro, TypeScript, NestJS, Prisma, GraphQL, Postgres, MSSQL and Git. With a proven track record of delivering successful web design and admin panel projects for diverse companies, I am adept at creating seamless and scalable digital products.",
    "about.doing": "What i'm doing",
    "about.skills": "What I know",
    "portfolio.title": "Portfolio",
    "resume.title": "Resume",
    "resume.experience": "Experience",
    "sidebar.myName": "Amin Nateghi",
    "sidebar.role": "Web developer",
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
    "about.title": "معرفی من",
    "about.p1":
      "من یک توسعه‌دهنده فرانت‌اند هستم که شناخت و تجربه کار با بک‌اند را دارم. بیشترین تجربه من مربوط به ساخت راهکارهای پنل‌های مدیریتی تخصصی می‌باشد، برنامه‌های با پرفورمنس بالا و UI مناسب و واکنش‌گرا برای دستگاه‌های مختلف نمایش. هچنین بخشی از تجربه من مربوط به پیاده‌سازی وب‌سایت‌های تخصصی بر اساس نیاز کارفرما می‌باشد. هیشه مشتاق چالش‌ها و تجربه‌های جدید هستم.",
    "about.p2":
      "با استفاده از فریم‌ورک‌ها و فناوری‌های روز مانند React، Vue و Angular پنل‌های مدیریتی متناسب با نیاز هر مشتری می‌سازم. تخصصم شامل طیف کاملی از تکنولوژی‌ها مثل Nuxt، Astro، TypeScript، NestJS، Prisma، GraphQL، Postgres، MSSQL و Git است. با سابقه اجرای موفق پروژه‌های طراحی وب و پنل مدیریتی برای شرکت‌های مختلف، محصولات دیجیتال مقیاس‌پذیر و خوش‌ساخت ارائه می‌دهم.",
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
