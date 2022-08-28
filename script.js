function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    document.style.boxShadow = "3px 3px 2px white";
 }

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity");
    let maxElement = document.querySelector("#max");
    let minElement = document.querySelector("#min");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    maxElement.innerHTML = Math.round(response.data.main.temp_max);
    minElement.innerHTML = Math.round(response.data.main.temp_min);
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

 let apiKey = "1b6c0398e1da79a12e6750bada098ecc";
 let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

 axios.get(apiURL).then(displayTemperature);