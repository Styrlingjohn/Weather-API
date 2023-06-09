var cityEL = document.querySelector('#city');
var submitEL = document.querySelector('#submitButton');
var weatherEl = document.querySelector('#weather');
var forecastEL = document.querySelector('#forecast');
var apiKey = 'd27f916493177ac6f9eb3bab02a17608';
var search;

function displayDay() {
  var date = dayjs().format('MMMM DD YYYY');
  return date;
};

var weatherSearch = function (event) {
  event.preventDefault();
  search = cityEL.value.trim();
  if (search) {
    coordinates(search);
  } else {
    window.alert('Oops! Enter city name please!');
  }
};

function coordinates(city) {
  fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      weatherEl.innerHTML = '';
      forecastEL.innerHTML = '';
      fetchWeatherData(data[0].lat, data[0].lon);
      fetchForecastData(data[0].lat, data[0].lon);
    })
};

function fetchWeatherData(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function (resp) { return resp.json() })
    .then(function (data) {

      var weatherDivEL = document.createElement('div');
      weatherDivEL.classList.add("box");
      var todaysWeatherEL = document.createElement('h1');
      todaysWeatherEL.textContent = search + " (" + displayDay() + ") ";
      var TempEL = document.createElement('p');
      var WindEL = document.createElement('p');
      var HumidityEL = document.createElement('p');

      TempEL.textContent = "Temp: " + data.main.temp + " °F";
      WindEL.textContent = "Wind: " + data.wind.speed + " mph";
      HumidityEL.textContent = "Humidity: " + data.main.humidity + " %";
      weatherEl.append(todaysWeatherEL);
      weatherEl.appendChild(TempEL);
      TempEL.appendChild(WindEL);
      WindEL.appendChild(HumidityEL);
    })
};

function fetchForecastData(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&cnt=120")
    .then(function (resp) { return resp.json() })
    .then(function (data) {

      for (let i = 0; i < 120; i += 8) {

        var forecastWeatherDivEL = document.createElement('div');
        forecastWeatherDivEL.classList.add("box");
        var forecastWeatherEL = document.createElement('h1');
        forecastWeatherEL.textContent = dayjs(data.list[i].dt_txt).format('MMMM DD YYYY');
        var forecastTempEL = document.createElement('p');
        var forecastWindEL = document.createElement('p');
        var forecastHumidityEL = document.createElement('p');

        forecastTempEL.textContent = "Temp: " + data.list[i].main.temp + " °F";
        forecastWindEL.textContent = "Wind: " + data.list[i].wind.speed + " mph";
        forecastHumidityEL.textContent = "Humidity: " + data.list[i].main.humidity + " %";
        forecastEL.append(forecastWeatherDivEL);
        forecastWeatherDivEL.append(forecastWeatherEL, forecastTempEL, forecastWindEL, forecastHumidityEL);
      };
    })
};

submitEL.addEventListener('click', weatherSearch);

init();