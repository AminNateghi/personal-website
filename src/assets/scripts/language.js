const STORAGE_KEY = "language";
const SUPPORTED = ["en", "fa"];
const path = window.location.pathname;

const segments = path.split("/").filter(Boolean);
const pathLocale = SUPPORTED.includes(segments[0]) ? segments[0] : "en";

const stored = localStorage.getItem(STORAGE_KEY);
const preferred = SUPPORTED.includes(stored) ? stored : null;

function stripLocale(pathname) {
  const parts = pathname.split("/");
  if (SUPPORTED.includes(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}

function buildPath(pathname, locale) {
  const stripped = stripLocale(pathname);
  const cleaned = stripped === "/" ? "" : stripped.replace(/\/+$/, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}${cleaned || "/"}`;
}

if (preferred && preferred !== pathLocale) {
  const target = buildPath(path, preferred);
  if (target !== path) {
    window.location.replace(target);
  }
}

const toggleLanguage = document.getElementById("toggleLanguage");
toggleLanguage?.addEventListener("click", (event) => {
  const nextLocale = toggleLanguage.getAttribute("data-locale");
  if (SUPPORTED.includes(nextLocale)) {
    localStorage.setItem(STORAGE_KEY, nextLocale);
  }
});
