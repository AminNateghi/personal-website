const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const toggleThemeButton = document.getElementById("toggleTheme");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// theme
const THEME_KEY = "theme";
const DARK_MODE_CLASS = "dark-mode";
const theme = localStorage.getItem(THEME_KEY);
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function setTheme(isDarkMode) {
  const bodyElement = document.body;
  if (isDarkMode) {
    bodyElement.classList.add(DARK_MODE_CLASS);
    localStorage.setItem(THEME_KEY, "dark");
    iconSun.classList.remove("active");
    iconMoon.classList.add("active");
  } else {
    bodyElement.classList.remove(DARK_MODE_CLASS);
    localStorage.setItem(THEME_KEY, "light");
    iconSun.classList.add("active");
    iconMoon.classList.remove("active");
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark") {
  setTheme(true);
} else if (savedTheme === "light") {
  setTheme(false);
} else {
  // based on system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setTheme(true);
  } else {
    setTheme(false);
  }
}

toggleThemeButton.addEventListener("click", function () {
  const bodyElement = document.body;
  const isCurrentlyDarkMode = bodyElement.classList.contains(DARK_MODE_CLASS);
  setTheme(!isCurrentlyDarkMode);
});
