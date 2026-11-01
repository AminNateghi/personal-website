
const THEME_KEY = "theme";
const DARK_MODE_CLASS = "dark-mode";

const themeButtons = document.querySelectorAll("[data-theme-toggle]");

const sunIcons = document.querySelectorAll(
  '[data-theme-icon="sun"]'
);

const moonIcons = document.querySelectorAll(
  '[data-theme-icon="moon"]'
);


function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage may be unavailable.
  }
}


function updateThemeIcons(isDarkMode) {
  sunIcons.forEach((icon) => {
    icon.classList.toggle("active", isDarkMode);
  });

  moonIcons.forEach((icon) => {
    icon.classList.toggle("active", !isDarkMode);
  });
}


function setTheme(isDarkMode) {
  document.body.classList.toggle(DARK_MODE_CLASS, isDarkMode);

  saveTheme(isDarkMode ? "dark" : "light");

  updateThemeIcons(isDarkMode);

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDarkMode));
  });
}


const savedTheme = getSavedTheme();

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const initialDarkMode =
  savedTheme === "dark" ||
  (savedTheme !== "light" && systemPrefersDark);

setTheme(initialDarkMode);

// Listen to all desktop and mobile theme buttons.
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains(
      DARK_MODE_CLASS
    );

    setTheme(!isDarkMode);
  });
});
