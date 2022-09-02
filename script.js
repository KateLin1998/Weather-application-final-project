function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  
  function formatDate() {
    let date = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}`;
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wedn", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  
  function displayForecast(response) {
    let forecast = response.data.daily;
  
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `    
            <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                </div>
                <img src="animated/${forecastDay.weather[0].icon}.svg" alt="" width=70 height=70 />
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperaute-max"> ${Math.round(
                  forecastDay.temp.max
                )} /</span> 
                <span class="weather-forecast-temperaute-min"> ${Math.round(
                  forecastDay.temp.min
                )}</span>
                </div>
            </div>
        `;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function getForecast(coordinates) {
    let apiKey = "1b6c0398e1da79a12e6750bada098ecc";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
  }
  
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let windIconElement = document.querySelector("#windIcon");

    celsiusTemperature = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    if (response.data.wind.speed < 1) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-0.svg`);
    } else if (response.data.wind.speed >= 1 && response.data.wind.speed <= 5) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-1.svg`);  
    } else if (response.data.wind.speed > 5 && response.data.wind.speed <= 11) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-2.svg`);
    } else if (response.data.wind.speed > 11 && response.data.wind.speed <= 19) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-3.svg`);
    } else if (response.data.wind.speed > 19 && response.data.wind.speed <= 28) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-4.svg`);
    } else if (response.data.wind.speed > 28 && response.data.wind.speed <= 38) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-5.svg`);
    } else if (response.data.wind.speed > 38 && response.data.wind.speed <= 49) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-6.svg`);
    } else if (response.data.wind.speed > 49 && response.data.wind.speed <= 61) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-7.svg`);
    } else if (response.data.wind.speed > 61 && response.data.wind.speed <= 74) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-8.svg`);
    } else if (response.data.wind.speed > 74 && response.data.wind.speed <= 88) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-9.svg`);
    } else if (response.data.wind.speed > 88 && response.data.wind.speed <= 102) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-10.svg`);
    } else if (response.data.wind.speed > 102 && response.data.wind.speed <= 117) {
      windIconElement.setAttribute("src", `wind/wind-beaufort-11.svg`);
    } else {
      windIconElement.setAttribute("src", `wind/wind-beaufort-12.svg`);
    } 

    iconElement.setAttribute(
      "src",
      `animated/${response.data.weather[0].icon}.svg`
    );

    getForecast(response.data.coord);
  }
  
  function search(city) {
    let apiKey = "1b6c0398e1da79a12e6750bada098ecc";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemperature);

    console.log(apiURL);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);
  }
  
  function displayFahrTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsLink.classList.remove("active");
    fahrLink.classList.add("active");
    let fahrTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    temperatureElement.innerHTML = fahrTemperature;
  }
  
  function displayCelsTemperature(event) {
    event.preventDefault();
    celsLink.classList.add("active");
    fahrLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
  
  let fahrLink = document.querySelector("#fahr");
  fahrLink.addEventListener("click", displayFahrTemperature);
  
  let celsLink = document.querySelector("#cels");
  celsLink.addEventListener("click", displayCelsTemperature);
  
  search("New York");
  