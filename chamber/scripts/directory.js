const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

const levels = {
    1: { label: "Member", css: "" },
    2: { label: "Silver", css: "silver" },
    3: { label: "Gold", css: "gold" }
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Could not load members:", error);
        membersContainer.textContent = "Sorry, the member list could not be loaded.";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const level = levels[member.membership];

        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header">
                <h2>${member.name}</h2>
                <p>${member.tagline}</p>
            </div>
            <div class="card-body">
                <img src="images/${member.image}" alt="${member.name} logo" width="200" height="150" loading="lazy">
                <div class="card-details">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Email:</strong> ${member.email}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
                    <p><span class="badge ${level.css}">${level.label}</span></p>
                </div>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === "grid";
    membersContainer.classList.toggle("grid", isGrid);
    membersContainer.classList.toggle("list", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

getMembers();