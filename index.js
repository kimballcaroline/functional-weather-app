// Display Current Day and Time
function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesdat",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = weekdays[date.getDay()];
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

// Display Search City
function getTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${currentTemp}°F`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityElement = document.querySelector("#display-city");
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;
    let apiKey = "9e5cdc3919987acbd4e9812ceba2a900";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(getTemp);
  } else {
    cityElement.innerHTML = null;
    alert(`Please enter a city`);
  }
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", search);

// Display Current Temp in Search City
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9e5cdc3919987acbd4e9812ceba2a900";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
  let currentLocation = document.querySelector("#display-city");
  currentLocation.innerHTML = "Your Current Location";
}

function getLocalTemp() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getLocalTemp);
