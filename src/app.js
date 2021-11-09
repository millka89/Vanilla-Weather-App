//current date and time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "Mart",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let day = days[date.getDay()];
  let hours = now.getHours();
  hours = ("0" + hours).slice(-2);
  let minutes = now.getMinutes();
  minutes = ("0" + minutes).slice(-2);
  let newDate = document.querySelector("#today-date-time");
  newDate.innerHTML = `${day}, ${currentDay} ${currentMonth} ${currentYear} ${hours}:${minutes}`;
  let now = new Date();
  formatDate(now);
}

//searching engine
function enterCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#city-name-search");
  let cityName = document.querySelector("#city-name");
  if (cityEntered.value) {
    cityName.innerHTML = `${cityEntered.value}`;
  } else {
    cityName.innerHTML = "Enter a city";
  }
  let cityUrlName = cityEntered.value;
  let apiKey = "33227af3de9a444d458da7784b71ec39";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityUrlName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeatherParameters);
}
let citySearchForm = document.querySelector("#city-name-form");
citySearchForm.addEventListener("submit", enterCity);

//timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm">
        ${formatDay(forecastDay.dt)}
        <div class="weather-icon">
           <img
          src= "http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        </div>
        <div class="temp-forecast mt-3">
        <span class="forecast-day">
        ${Math.round(forecastDay.temp.day)}° 
        </span>
        ${Math.round(forecastDay.temp.night)}°
        </div>
        <div class="description-forecast mt-3">
          ${forecastDay.weather[0].description}
          </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecast);
}
//forecast coordinates
function getForecast(coordinates) {
  let apiKey = "e4cf1329ae1cef2a3c492edaed3c0c6f";
  let Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(Url).then(displayForecast);
}

//weather parameters
function getWeatherParameters(response) {
  //temperature
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = temperature;
  //city name
  let city = response.data.name;
  let mainCityName = document.querySelector("#city-name");
  mainCityName.innerHTML = city;
  //humidity
  let humidity = document.querySelector("#humidity-parameter");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  //pressure
  let pressure = document.querySelector("#pressure-parameter");
  pressure.innerHTML = `${response.data.main.pressure} hPa`;
  //wind speed
  let windSpeed = document.querySelector("#wind-parameter");
  let wind = Math.round(Number(response.data.wind.speed) * 3.6);
  windSpeed.innerHTML = `${wind} kph`;
  //weather description
  let weatherDescription = document.querySelector("#description-parameter");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let weatherIconNow = document.querySelector("#current-weather-img");
  weatherIconNow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
//conversion Celsius-Farenheit
function getFarenheit(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round(temp * 1.8 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  farenheitTemp.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round((temp - 32) / 1.8);
}

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertToCelsius);

let farenheitTemp = document.querySelector("#farenheit-temp");
farenheitTemp.addEventListener("click", getFarenheit);

//current location button - geolocation
function retrievePosition(position) {
  let apiKey = "33227af3de9a444d458da7784b71ec39";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeatherParameters);
}

function startNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#geolocation-current");
button.addEventListener("click", startNavigator);

navigator.geolocation.getCurrentPosition(retrievePosition);
