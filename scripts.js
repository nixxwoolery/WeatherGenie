document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const search = document.querySelector(".search");
  const weatherBox = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");
  const error404 = document.querySelector(".not-found");
  
  search.addEventListener("click", () => {
  const APIKey = "87525b2d428e4b419dcb114aa86e358a";
  const city = document.querySelector(".search-box input").value.trim();
  
  if (!city) {
  console.log("City input is empty.");
  return;
  }
  
  fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${APIKey}`)
  .then((response) => {
  if (!response.ok) {
  throw new Error("Network response was not ok");
  }
  return response.json();
  })
  .then((json) => {
  console.log("Fetched data:", json); // Log the entire JSON response
  
  if (!json.data || json.data.length === 0) {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
  return;
  }
  
  error404.style.display = "none";
  error404.classList.remove("fadeIn");
  
  const weatherData = json.data[0];
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(
  ".weather-details .humidity span"
  );
  const wind = document.querySelector(".weather-details .wind span");
  
  // Map the weather icon code to the Weatherbit icons
  image.src = `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`;
  
  temperature.innerHTML = `${parseInt(weatherData.temp)}<span>°C</span>`;
  description.innerHTML = `${weatherData.weather.description}`;
  humidity.innerHTML = `${weatherData.rh}%`;
  wind.innerHTML = `${parseInt(weatherData.wind_spd)}Km/h`;
  
  weatherBox.style.display = "block";
  weatherDetails.style.display = "block";
  weatherBox.style.opacity = "1"; // Set opacity to 1
  weatherDetails.style.opacity = "1"; // Set opacity to 1
  container.style.height = "590px";
  })
  .catch((error) => {
  console.log(
  "There was a problem with the fetch operation:",
  error.message
  );
});
});
});