const params = new URLSearchParams(window.location.search);

const fields = ["first", "last", "email", "phone", "organization"];

fields.forEach(field => {
    document.querySelector(`#${field}`).textContent = params.get(field) || "Not provided";
});

const stamp = params.get("timestamp");
const date = stamp ? new Date(stamp) : null;

document.querySelector("#timestamp").textContent =
    date && !isNaN(date) ? date.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" }) : "Not provided";