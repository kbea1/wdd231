const API_KEY = "39658110c963e539301aa7aa9cafab6e";
const LAT = -8.1116;
const LON = -79.0288;

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastList = document.querySelector("#forecast");

const baseUrl = "https://api.openweathermap.org/data/2.5";
const params = `lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${baseUrl}/weather?${params}`),
            fetch(`${baseUrl}/forecast?${params}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error(`Request failed: ${currentResponse.status} / ${forecastResponse.status}`);
        }

        const current = await currentResponse.json();
        const forecast = await forecastResponse.json();

        displayCurrent(current);
        displayForecast(forecast.list);
    } catch (error) {
        console.error("Could not load weather:", error);
        currentTemp.textContent = "Weather is not available right now.";
    }
}

function displayCurrent(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
}

function displayForecast(list) {
    const today = new Date().toLocaleDateString("en-CA");
    const maxByDay = {};

    list.forEach(item => {
        const day = new Date(item.dt * 1000).toLocaleDateString("en-CA");
        if (day === today) return;
        if (maxByDay[day] === undefined || item.main.temp_max > maxByDay[day]) {
            maxByDay[day] = item.main.temp_max;
        }
    });

    forecastList.innerHTML = "";

    Object.keys(maxByDay).sort().slice(0, 3).forEach(day => {
        const name = new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
        const item = document.createElement("li");
        item.innerHTML = `<span>${name}</span><span>${Math.round(maxByDay[day])}°C</span>`;
        forecastList.appendChild(item);
    });
}

getWeather();