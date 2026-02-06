const toggleAuroraButton = document.getElementById("toggleAurora");
const auroraContainer = document.querySelector(".aurora-container");

const AURORA_KEY = "aurora";
const iconLayers = document.getElementById("iconLayers");
const iconLayer = document.getElementById("iconLayer");

function setAurora(isActive) {
  localStorage.setItem(AURORA_KEY, isActive ? "on" : "off");

  if (auroraContainer) {
    auroraContainer.classList.toggle("is-hidden", !isActive);
  }

  if (iconLayers) {
    iconLayers.classList.toggle("active", isActive);
  }

  if (iconLayer) {
    iconLayer.classList.toggle("active", !isActive);
  }
}

const savedAurora = localStorage.getItem(AURORA_KEY);
const initialIsActive = savedAurora ? savedAurora === "on" : true;
setAurora(initialIsActive);

if (toggleAuroraButton) {
  toggleAuroraButton.addEventListener("click", () => {
    const isCurrentlyActive = auroraContainer
      ? !auroraContainer.classList.contains("is-hidden")
      : savedAurora === "on";
    setAurora(!isCurrentlyActive);
  });
}
