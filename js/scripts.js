let temp, cTemp, fTemp, lat, long, city, icon, description, cityZip;

const request = new XMLHttpRequest();
const weatherKey = 'ff3c9f4d39e7e445f23cfbb2e3ba1f27';
const tempDisplay = document.getElementById('temp');
const locationDiv = document.getElementById('location');
const iconDiv = document.getElementById('icon');
const descriptionDiv = document.getElementById('description');

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
    const data = JSON.parse(this.response);

    temp = data.main.temp;
    cTemp = (temp - 273).toFixed(0);
    fTemp = (9/5 * temp - 459.67).toFixed(0);
    city = data.name;
    icon = data.weather[0].icon;
    description = data.weather[0].description;

    locationDiv.innerHTML = city + ' Weather';
    tempDisplay.innerHTML = fTemp + ' °F';
    descriptionDiv.innerHTML = description;
    iconDiv.style.backgroundImage = "url('http://openweathermap.org/img/w/" + icon + ".png')";
    $("#greetingDiv").hide();
    $("#tempDiv").show();

    changeBackground(description);
  }
  request.send();
}

function locationError() {
  console.log('LOCATION ERROR');
}

$("#toggle").change(function () {
  if ($('input[name="toggle"]').is(':checked')) {
    tempDisplay.innerHTML = cTemp + ' °C';
  } else {
    tempDisplay.innerHTML = fTemp + ' °F';
  }
});

$('#cityZip').click(function (event) {
  event.preventDefault();
  cityZip = $('#cityChoice').val();

  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + cityZip + ',us' + '&APPID=' + weatherKey, true);

  request.onload = function() {
    let data = JSON.parse(this.response);

    temp = data.main.temp;
    cTemp = (temp - 273).toFixed(0);
    fTemp = (9/5 * temp - 459.67).toFixed(0);
    city = data.name;
    icon = data.weather[0].icon;
    description = data.weather[0].description;

    locationDiv.innerHTML = city + ' Weather';
    tempDisplay.innerHTML = fTemp + ' °F';
    descriptionDiv.innerHTML = description;
    iconDiv.style.backgroundImage = "url('http://openweathermap.org/img/w/" + icon + ".png')";
    $("#greetingDiv").hide();
    $("#tempDiv").show();

    changeBackground(description);
  }
  request.send();
});

$('#cityZip2').click(function (event) {
  event.preventDefault();
  cityZip = $('#cityChoice2').val();

  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + cityZip + ',us' + '&APPID=' + weatherKey, true);

  request.onload = function() {
    const data = JSON.parse(this.response);

    temp = data.main.temp;
    cTemp = (temp - 273).toFixed(0);
    fTemp = (9/5 * temp - 459.67).toFixed(0);
    city = data.name;
    icon = data.weather[0].icon;
    description = data.weather[0].description;

    locationDiv.innerHTML = city + ' Weather';
    tempDisplay.innerHTML = fTemp + ' °F';
    descriptionDiv.innerHTML = description;
    iconDiv.style.backgroundImage = "url('http://openweathermap.org/img/w/" + icon + ".png')";

    changeBackground(description);
  }
  request.send();
});

$('#myLocation').click(function () {
  getLocation();
});

function changeBackground(description) {
  if (description.includes('cloud')) {
    document.body.style.backgroundImage = "url('./images/cloud.jpg')";
  }
  if (description.includes('rain')) {
    document.body.style.backgroundImage = "url('./images/rain.jpg')";
  }
  if (description.includes('drizzle')) {
    document.body.style.backgroundImage = "url('./images/rain.jpg')";
  }
  if (description.includes('sun')) {
    document.body.style.backgroundImage = "url('./images/sun.jpg')";
  }
  if (description.includes('clear')) {
    document.body.style.backgroundImage = "url('./images/sun.jpg')";
  }
  if (description.includes('snow')) {
    document.body.style.backgroundImage = "url('./images/snow.jpg')";
  }
  if (description.includes('smoke')) {
    document.body.style.backgroundImage = "url('./images/smoke.jpg')";
  }
  if (description.includes('haze')) {
    document.body.style.backgroundImage = "url('./images/smoke.jpg')";
  }
  if (description.includes('storm')) {
    document.body.style.backgroundImage = "url('./images/storm.jpg')";
  }
  if (description.includes('mist')) {
    document.body.style.backgroundImage = "url('./images/mist.jpg')";
  }
};

getLocation();
