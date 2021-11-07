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
  let weekday = days[date.getDay()];
  let hours = now.getHours();
  hours = ("0" + hours).slice(-2);
  let minutes = now.getMinutes();
  minutes = ("0" + minutes).slice(-2);
  let newDate = document.querySelector("#today-date-time");
  newDate.innerHTML = `${weekday}, ${currentDay} ${currentMonth} ${currentYear} ${hours}:${minutes}`;
  //forecast weekdays names
  let firstDayName = document.querySelector("#forecast-day1");
  firstDayName.innerHTML = days[date.getDay() + 1];
  let secondDayName = document.querySelector("#forecast-day2");
  secondDayName.innerHTML = days[date.getDay() + 2];
  let thirdDayName = document.querySelector("#forecast-day3");
  if (date.getDay() + 3 < 6) {
    thirdDayName.innerHTML = days[date.getDay() + 3];
  } else {
    thirdDayName.innerHTML = days[date.getDay() + 3 - 7];
  }
  let fourthDayName = document.querySelector("#forecast-day4");
  if (date.getDay() + 4 < 6) {
    fourthDayName.innerHTML = days[date.getDay() + 4];
  } else {
    fourthDayName.innerHTML = days[date.getDay() + 4 - 7];
  }
  let fifthDayName = document.querySelector("#forecast-day5");
  if (date.getDay() + 5 < 6) {
    fifthDayName.innerHTML = days[date.getDay() + 5];
  } else {
    fifthDayName.innerHTML = days[date.getDay() + 5 - 7];
  }
}
let now = new Date();
formatDate(now);

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
}
//conversion Celsius-Farenheit
function getFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round(temp * 1.8 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
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
