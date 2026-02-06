import { defaultLocale, locales, ui, type Locale } from "./ui";

const rtlLocales = new Set<Locale>(["fa"]);

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split("/");
  if (locales.includes(maybeLocale as Locale)) {
    return maybeLocale as Locale;
  }
  return defaultLocale;
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

type TranslationKey = keyof (typeof ui)[typeof defaultLocale];

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key];
  };
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/");
  if (locales.includes(parts[1] as Locale)) {
    const rest = parts.slice(2).join("/");
    return `/${rest}`;
  }
  return pathname;
}

export function getLocalePath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = stripLocaleFromPathname(normalized);
  const cleaned = stripped === "/" ? "" : stripped.replace(/\/+$/, "");
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${prefix}${cleaned || "/"}`;
}
