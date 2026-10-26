  const toggleButton = document.querySelector<HTMLButtonElement>("#toggleMore");
  const moreMenu = document.querySelector<HTMLElement>("#navbarMore");

  if (toggleButton && moreMenu) {
    const setMenuOpen = (open) => {
      toggleButton.setAttribute("aria-expanded", String(open));
      toggleButton.setAttribute(
        "aria-label",
        open ? "Close more options" : "Open more options",
      );

      moreMenu.classList.toggle("is-open", open);
      moreMenu.setAttribute("aria-hidden", String(!open));
      moreMenu.inert = !open;
    };

    toggleButton.addEventListener("click", () => {
      const isOpen = toggleButton.getAttribute("aria-expanded") === "true";

      setMenuOpen(!isOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        toggleButton.getAttribute("aria-expanded") === "true"
      ) {
        setMenuOpen(false);
        toggleButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !moreMenu.contains(target) &&
        !toggleButton.contains(target)
      ) {
        setMenuOpen(false);
      }
    });
  }