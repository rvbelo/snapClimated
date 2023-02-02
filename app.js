const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemprature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHimidity = document.getElementById('current-humidity'); 
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "98bedb9eb13f2dd8b314e820a2985307"

citySearchButton.addEventListener( 'click', () =>{
  let cityName = citySearchInput.value
  getCityWeather(cityName)
})

navigator.geolocation.getCurrentPosition((position) =>{
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
},
(err) =>{
    if(err.code === 1){
        alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
    } else {
        console.log(err)
    }
}
)

function getCityWeather(cityName){

    weatherIcon.src = `/assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function displayWeather(data) {
    console.log(data)
    let{
        dt,
        name,
        weather: [{icon, description}],
        main: { temp, feels_like, humidity},
        wind: { speed},
        sys: { sunrise, sunset},
    } = data

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `/assets/${icon}.svg`
    weatherDescription.textContent = description;
    currentTemprature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}Km`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHimidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', {month: 'long', day: 'numeric'})
    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}