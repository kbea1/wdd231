const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();

const openButtons = document.querySelectorAll(".more-link");
const closeButtons = document.querySelectorAll(".close-modal");

openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.modal);
        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});