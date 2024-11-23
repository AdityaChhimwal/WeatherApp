const apiKey = "990c634c21ef1ae6b9167dfc6e1261d1";

// Function to fetch weather data
function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.querySelector(".result");
  const errorDiv = document.querySelector(".error-message");

  if (!city) {
    errorDiv.textContent = "Please enter a city name!";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      errorDiv.textContent = "";
    })
    .catch(error => {
      errorDiv.textContent = "Unable to fetch weather data. Please try again.";
      resultDiv.innerHTML = "";
    });
}

// Function to display weather data
function displayWeather(data) {
  const { name, main, weather, wind } = data;

  let weatherClass = "";
  if (weather[0].main === "Clear") weatherClass = "sunny";
  else if (weather[0].main === "Clouds") weatherClass = "cloudy";
  else if (weather[0].main === "Rain") weatherClass = "rainy";
  else if (weather[0].main === "Thunderstorm") weatherClass = "thunderstorm";

  const resultDiv = document.querySelector(".result");
  resultDiv.className = `result ${weatherClass}`; // Apply background class
  resultDiv.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
  `;
}
