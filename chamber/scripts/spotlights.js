const spotlightContainer = document.querySelector("#spotlights");

const levelNames = { 2: "Silver", 3: "Gold" };

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();

        const eligible = data.members.filter(member => member.membership >= 2);
        const selected = shuffle(eligible).slice(0, 3);

        displaySpotlights(selected);
    } catch (error) {
        console.error("Could not load spotlights:", error);
        spotlightContainer.textContent = "Member spotlights are not available right now.";
    }
}

function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const level = levelNames[member.membership];

        const card = document.createElement("article");
        card.classList.add("spotlight");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" width="200" height="150" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
            <p><span class="badge ${level.toLowerCase()}">${level} member</span></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();