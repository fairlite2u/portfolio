/*****Weather Summary*****/
function windChill(t,s) {
    return  parseFloat(35.74 + (0.6215 * t) - (35.75 * (s**0.16)) + ((0.4275 * t) * (s**0.16)));
}
let weatherRequest = new XMLHttpRequest();
let apiURLstring = 'https://api.openweathermap.org/data/2.5/weather?id=5368361&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest.open('Get', apiURLstring, true);
weatherRequest.send();
weatherRequest.onload = function() {
    let weatherData = JSON.parse(weatherRequest.responseText);
    document.getElementById('current').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed').innerHTML = weatherData.wind.speed.toFixed();
}

let weatherRequest2 = new XMLHttpRequest();
let apiURLstring2 = 'https://api.openweathermap.org/data/2.5/weather?id=2925192&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest2.open('Get', apiURLstring2, true);
weatherRequest2.send();
weatherRequest2.onload = function() {
    let weatherData = JSON.parse(weatherRequest2.responseText);
    document.getElementById('current2').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp2').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill2').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity2').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed2').innerHTML = weatherData.wind.speed.toFixed();
}


let weatherRequest3 = new XMLHttpRequest();
let apiURLstring3 = 'https://api.openweathermap.org/data/2.5/weather?id=4359760&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest3.open('Get', apiURLstring3, true);
weatherRequest3.send();
weatherRequest3.onload = function() {
    let weatherData = JSON.parse(weatherRequest3.responseText);
    document.getElementById('current3').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp3').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill3').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity3').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed3').innerHTML = weatherData.wind.speed.toFixed();
}

let weatherRequest4 = new XMLHttpRequest();
let apiURLstring4 = 'https://api.openweathermap.org/data/2.5/weather?id=5844096&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest4.open('Get', apiURLstring4, true);
weatherRequest4.send();
weatherRequest4.onload = function() {
    let weatherData = JSON.parse(weatherRequest4.responseText);
    document.getElementById('current4').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp4').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill4').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity4').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed4').innerHTML = weatherData.wind.speed.toFixed();
}

let weatherRequest5 = new XMLHttpRequest();
let apiURLstring5 = 'https://api.openweathermap.org/data/2.5/weather?id=3448439&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest5.open('Get', apiURLstring5, true);
weatherRequest5.send();
weatherRequest5.onload = function() {
    let weatherData = JSON.parse(weatherRequest5.responseText);
    document.getElementById('current5').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp5').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill5').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity5').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed5').innerHTML = weatherData.wind.speed.toFixed();
}

let weatherRequest6 = new XMLHttpRequest();
let apiURLstring6 = 'https://api.openweathermap.org/data/2.5/weather?id=5391811&units=imperial&APPID=ff571c48af1923ac4fbdf7523b913171';
weatherRequest6.open('Get', apiURLstring6, true);
weatherRequest6.send();
weatherRequest6.onload = function() {
    let weatherData = JSON.parse(weatherRequest6.responseText);
    document.getElementById('current6').innerHTML = weatherData.weather[0].description;
    document.getElementById('hightemp6').innerHTML = weatherData.main.temp_max.toFixed();
    document.getElementById('windchill6').innerHTML = windChill(weatherData.main.temp_max, weatherData.wind.speed).toFixed();
    document.getElementById('humidity6').innerHTML= weatherData.main.humidity.toFixed();
    document.getElementById('windspeed6').innerHTML = weatherData.wind.speed.toFixed();
}