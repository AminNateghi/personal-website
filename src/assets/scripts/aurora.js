const AURORA_KEY = "aurora";

const auroraButtons = document.querySelectorAll(
  "[data-aurora-toggle]"
);

const layersIcons = document.querySelectorAll(
  '[data-aurora-icon="layers"]'
);

const layerIcons = document.querySelectorAll(
  '[data-aurora-icon="layer"]'
);

const auroraContainer = document.querySelector(".aurora-container");

function getSavedAurora() {
  try {
    return localStorage.getItem(AURORA_KEY);
  } catch {
    return null;
  }
}

function saveAurora(isActive) {
  try {
    localStorage.setItem(
      AURORA_KEY,
      isActive ? "on" : "off"
    );
  } catch {
    // Storage may be unavailable.
  }
}


function updateAuroraIcons(isActive) {
  layersIcons.forEach((icon) => {
    icon.classList.toggle("active", isActive);
  });

  layerIcons.forEach((icon) => {
    icon.classList.toggle("active", !isActive);
  });

  auroraButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isActive));
  });
}


function setAurora(isActive) {
  saveAurora(isActive);

  if (auroraContainer) {
    auroraContainer.classList.toggle(
      "is-hidden",
      !isActive
    );
  }

  updateAuroraIcons(isActive);
}


const savedAurora = getSavedAurora();

const initialIsActive =
  savedAurora === null ? true : savedAurora === "on";

setAurora(initialIsActive);

// Handle desktop and mobile buttons.
auroraButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isCurrentlyActive = auroraContainer
      ? !auroraContainer.classList.contains("is-hidden")
      : getSavedAurora() !== "off";

    setAurora(!isCurrentlyActive);
  });
});
