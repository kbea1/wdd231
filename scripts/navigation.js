const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});