function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    document.style.boxShadow = "3px 3px 2px white";
 }

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let days = ["Sun", "Mon", "Tue", "Wedn", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
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
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML = 
        forecastHTML + 
        `    
            <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                    </div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png" alt="" width="42" />
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperaute-max"> ${Math.round(forecastDay.temp.max)} /</span> 
                <span class="weather-forecast-temperaute-min"> ${Math.round(forecastDay.temp.min)}</span>
            </div>
            </div>
        `;
        }
    })

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

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${response.data.weather[0].icon}.svg`);

    getForecast(response.data.coord);

}

function search(city) {
    let apiKey = "1b6c0398e1da79a12e6750bada098ecc";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemperature);
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

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", displayFahrTemperature);

let celsLink = document.querySelector("#cels");
celsLink.addEventListener("click", displayCelsTemperature);

search("New York");