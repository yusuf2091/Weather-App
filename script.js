const apiKey = "6e4ebf43e689c34268618a096ae7fa9f";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorMessage = document.querySelector(".error-message");
    const weatherIcon = document.getElementById("weatherIcon");
    errorMessage.textContent = ""; // Clear any previous errors
    weatherIcon.classList.add("hidden"); // Hide the icon initially

    if (!city) {
        errorMessage.textContent = "Please enter a city name!";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found. Please try again!");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").textContent = `City: ${data.name}`;
        document.querySelector(".temp").textContent = `Temperature: ${data.main.temp} °C`;
        document.querySelector(".details").textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} km/h`;
        document.querySelector(".sky-status").textContent = `Sky: ${data.weather[0].description}`;
        document.querySelector(".coordinates").textContent = `Lat: ${data.coord.lat} | Lon: ${data.coord.lon}`;

        // Set the weather icon based on the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        let iconUrl = "";

        switch (weatherCondition) {
            case "clear":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear sky icon
                break;
            case "clouds":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Cloudy icon
                break;
            case "rain":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png"; // Rain icon
                break;
            case "drizzle":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Drizzle icon
                break;
            case "thunderstorm":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/3076/3076114.png"; // Thunderstorm icon
                break;
            case "snow":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/724/724883.png"; // Snow icon
                break;
            case "mist":
            case "fog":
                iconUrl = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Mist/Fog icon
                break;
            default:
                iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Default icon
        }

        weatherIcon.src = iconUrl;
        weatherIcon.alt = weatherCondition;
        weatherIcon.classList.remove("hidden"); // Show the icon
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
