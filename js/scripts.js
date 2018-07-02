let request = new XMLHttpRequest();
let weatherKey = config.weatherKey;
let temp, cTemp, fTemp, lat, long, city, icon, description;
let tempDisplay = document.getElementById('temp');
let locationDiv = document.getElementById('location');
let iconDiv = document.getElementById('icon');
let descriptionDiv = document.getElementById('description');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude.toFixed(3);
      long = position.coords.longitude.toFixed(3);
      getWeather();
    });
  } else {
    locationError();
  }
}

function getWeather() {
  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=' + weatherKey, true);

  request.onload = function() {
    let data = JSON.parse(this.response);

    temp = data.main.temp;
    cTemp = (temp - 273).toFixed(0);
    fTemp = (9/5 * temp - 459.67).toFixed(0);
    city = data.name;
    icon = data.weather[0].icon;
    description = data.weather[0].description;

    locationDiv.innerHTML = city + ' Weather';
    tempDisplay.innerHTML = cTemp + ' °C';
    descriptionDiv.innerHTML = description;
    iconDiv.style.backgroundImage = "url('http://openweathermap.org/img/w/" + icon + ".png')";
    $("#greetingDiv").hide();
    $("#tempDiv").show();
  }
  request.send();
}

function locationError() {
  console.log('ERROR');
}

function changeUnits() {
  if (tempDisplay.innerHTML == cTemp + ' °C') {
    tempDisplay.innerHTML = fTemp + ' °F';
  } else {
      tempDisplay.innerHTML = cTemp + ' °C';
  }
}

getLocation();
