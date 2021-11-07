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
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = temperature;
  let city = response.data.name;
  let mainCityName = document.querySelector("#city-name");
  mainCityName.innerHTML = city;
}
