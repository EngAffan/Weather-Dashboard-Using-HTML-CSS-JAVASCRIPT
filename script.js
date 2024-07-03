let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    locationBtn = document.getElementById('locationBtn'),
    apiKey = '553f1e74f40b19b5286510a768825d10',
    currentWeatherCard = document.querySelector('.weather-left .card'),
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    aqiCard = document.querySelectorAll('.highlights .card')[0],
    sunriseCard = document.querySelectorAll('.highlights .card')[1],
    aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'],
    hourlyForecastCard = document.querySelector('.hourly-forecast');
    humidityVal = document.getElementById('humidityVal'),
    pressureVal = document.getElementById('pressureVal'),
    visibilityVal = document.getElementById('visibilityVal'),
    windSpeedVal = document.getElementById('windSpeedVal'),
    feelsVal = document.getElementById('feelsVal');

function getWeatherDetails(name, lat, lon, country, state) {
    let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        AIRPOLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    fetch(AIRPOLLUTION_API_URL).then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch Air Pollution data');
        }
        return res.json();
    }).then(data => {
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML = `
        <div class="card-head card-top">
            <p>Air Quality Index</p>
            <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
        </div>
        <div class="air-indices">
            <i class="fas fa-wind fa-3x"></i>
            <div class="item">
                <p>PM2.5</p>
                <h2>${pm2_5}</h2>
            </div>
            <div class="item">
                <p>PM10</p>
                <h2>${pm10}</h2>
            </div>
            <div class="item">
                <p>SO2</p>
                <h2>${so2}</h2>
            </div>
            <div class="item">
                <p>CO</p>
                <h2>${co}</h2>
            </div>
            <div class="item">
                <p>NO</p>
                <h2>${no}</h2>
            </div>
            <div class="item">
                <p>NO2</p>
                <h2>${no2}</h2>
            </div>
            <div class="item">
                <p>NH3</p>
                <h2>${nh3}</h2>
            </div>
            <div class="item">
                <p>O3</p>
                <h2>${o3}</h2>
            </div>
        </div>
        `;
    }).catch(error => {
        alert('Failed to fetch Air Pollution data: ' + error.message);
    });

    fetch(WEATHER_API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return res.json();
        })
        .then(data => {
            let date = new Date();
            currentWeatherCard.innerHTML = `
                <div class="current-weather">
                    <div class="details">
                        <p>Now</p>
                        <h2>${data.main.temp.toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                    </div>
                </div>
                <hr>
                <div class="card-footer">
                    <p>
                        <i class="fas fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}
                    </p>
                    <p>
                        <i class="fas fa-location-dot"></i> ${name}, ${country}
                    </p>
                </div>
            `;
            let {sunrise , sunset} = data.sys,
            {timezone , visibility} = data,
            {humidity , pressure , feels_like}= data.main,
            {speed} = data.wind,
            sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
            sunriseCard.innerHTML = `
            <div class="card-head">
                        <p>Sunrise & Sunset</p>
                    </div>
                    <div class="sunrise-sunset">
                        <div class="item">
                            <div class="icon sun">
                                <img src="images/sunrise.png" alt="">
                            </div>
                            <div>
                                <p>Sunrise</p>
                                <h2>${sRiseTime}</h2>
                            </div>
                        </div>
                        <div class="item">
                            <div class="icon sun">
                                <img src="images/sunset.png" alt="">
                            </div>
                            <div>
                                <p>Sunset</p>
                                <h2>${sSetTime}</h2>
                            </div>
                        </div>
                    </div>
            `;
            humidityVal.innerHTML = `${humidity}%`;
            pressureVal.innerHTML = `${pressure}hPa`;
            visibilityVal.innerHTML = `${visibility / 1000}km`;
            windSpeedVal.innerHTML = `${speed}m/s`;
            feelsVal.innerHTML = `${feels_like}&deg;C`;
        })
        .catch(error => {
            alert('Failed to fetch current weather: ' + error.message);
        });

    fetch(FORECAST_API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch 5-day forecast');
            }
            return res.json();
        })
        .then(data => {
            let hourForecast = data.list;
            hourlyForecastCard.innerHTML = ``;
            for(i = 0; i<=7 ; i++){

                let hrForecastDate = new Date(hourForecast[i].dt_txt);
                let hr = hrForecastDate.getHours();
                let a = 'PM';
                if(hr < 12) a = 'AM';
                if(hr == 0) hr =12;
                if(hr > 12) hr = hr - 12;
                hourlyForecastCard.innerHTML += `
                <div class="card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourForecast[i].weather[0].icon}.png" alt="">
                    <p>${hourForecast[i].main.temp}&deg;C</p>
                </div>
                `;
            }
                
            let uniqueForecastDays = [];
            let fiveDaysForecast = data.list.filter(forecast => {
                let forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    uniqueForecastDays.push(forecastDate);
                    return true;
                }
                return false;
            });

            fiveDaysForecastCard.innerHTML = '';
            for (let i = 0; i < fiveDaysForecast.length; i++) {
                let date = new Date(fiveDaysForecast[i].dt_txt);
                fiveDaysForecastCard.innerHTML += `
                    <div class="forecast-item">
                        <div class="item-wrapper">
                            <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                            <span>${fiveDaysForecast[i].main.temp.toFixed(2)}&deg;C</span>
                        </div>
                        <p>${date.getDate()} ${months[date.getMonth()]}</p>
                        <p>${days[date.getDay()]}</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            alert('Failed to fetch 5-day forecast: ' + error.message);
        });
}

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    
    fetch(GEOCODING_API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch city coordinates');
            }
            return res.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('City not found');
            }
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
        })
        .catch(error => {
            alert(`Failed to fetch coordinates of ${cityName}: ` + error.message);
        });
}

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(position =>{
       let {latitude,longitude} = position.coords;
       let REVERSE_GEOLOCTION_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

       fetch(REVERSE_GEOLOCTION_URL).then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch city coordinates');
            }
            return res.json();
        })
        .then(data =>{
            let {name , country,state} = data[0];
            getWeatherDetails(name , latitude, longitude , country, state); 
        }).catch(error => {
            alert(`Failed to fetch coordinates of ${cityName}: ` + error.message);
        }) , error =>{
            if(error.code === error.PERMISSION_DINIED){
                alert('Geolocation permission denied. Please reset permission location to grant access again');
            }
        }
    });
}

searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup' , e => e.key === 'Enter' && getCityCoordinates());
window.addEventListener('load' , getUserCoordinates);
