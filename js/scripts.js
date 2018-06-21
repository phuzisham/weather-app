let request = new XMLHttpRequest();
let weatherKey = config.weatherKey;
let temp, cTemp, fTemp, lat, long;
let tempDisplay = document.getElementById('temp');
let locationDiv = document.getElementById('location');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude.toFixed(3);
      long = position.coords.longitude.toFixed(3);
      console.log(lat);
      console.log(long);
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
    console.log(data);
    temp = data.main.temp;
    cTemp = cTempConversion(temp);
    fTemp = fTempConversion(cTemp);
    city = data.name;

    locationDiv.innerHTML = city + ' Weather';
    tempDisplay.innerHTML = cTemp + ' Degrees Celcius.';
    $("#greetingDiv").hide();
    $("#tempDiv").show();
  }
  request.send();
}

function locationError() {
  console.log('ERROR');
}

function cTempConversion(temp) {
  return (temp - 273).toFixed(0);
}

function fTempConversion(temp) {
  return (9/5 * temp + 32).toFixed(0);
}

function changeUnits() {
  if (tempDisplay.innerHTML == cTemp + ' Degrees Celcius.') {
    tempDisplay.innerHTML = fTemp + ' Degrees Fahrenheit.';
  } else {
      tempDisplay.innerHTML = cTemp + ' Degrees Celcius.';
  }
}

getLocation();
