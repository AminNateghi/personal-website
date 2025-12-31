document.addEventListener("DOMContentLoaded", function () {
  const projectItem = document.querySelectorAll("[data-project-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const sliderTrack = document.querySelector("[data-slider-track]");
  const sliderPrev = document.querySelector("[data-slider-prev]");
  const sliderNext = document.querySelector("[data-slider-next]");

  let currentIndex = 0;
  let slidesCount = 0;

  const openModal = () => {
    modalContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modalContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    sliderTrack.innerHTML = "";
    currentIndex = 0;
    slidesCount = 0;
  };

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slidesCount) index = slidesCount - 1;
    currentIndex = index;
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateButtons();
  }

  function updateButtons() {
    if (!sliderPrev || !sliderNext) return;
    sliderPrev.style.visibility = currentIndex === 0 ? "hidden" : "visible";
    sliderNext.style.visibility =
      currentIndex === slidesCount - 1 ? "hidden" : "visible";
  }

  function buildSlidesFromImages(imgNodes, startIndex) {
    sliderTrack.innerHTML = "";
    const fragment = document.createDocumentFragment();
    imgNodes.forEach((img) => {
      const wrapper = document.createElement("div");
      wrapper.className = "slide";
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      newImg.loading = "lazy";
      wrapper.appendChild(newImg);
      fragment.appendChild(wrapper);
    });
    sliderTrack.appendChild(fragment);
    slidesCount = imgNodes.length;

    showSlide(startIndex);
  }

  projectItem.forEach((item) => {
    item.addEventListener("click", function () {
      const projectImagesContainer = this.closest(".project-images");
      if (!projectImagesContainer) return;
      const imgs = projectImagesContainer.querySelectorAll(
        "[data-project-image]"
      );
      if (!imgs || imgs.length === 0) return;

      const clickedImg = this.querySelector("[data-project-image]");
      let startIndex = 0;
      imgs.forEach((imgNode, idx) => {
        if (imgNode === clickedImg) startIndex = idx;
      });

      buildSlidesFromImages(Array.from(imgs), startIndex);
      openModal();
    });
  });

  // prev / next button handlers
  if (sliderPrev) {
    sliderPrev.addEventListener("click", () => showSlide(currentIndex - 1));
  }
  if (sliderNext) {
    sliderNext.addEventListener("click", () => showSlide(currentIndex + 1));
  }

  // close handlers
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modalContainer.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (e.key === "ArrowRight") showSlide(currentIndex + 1);
    if (e.key === "Escape") closeModal();
  });
});
