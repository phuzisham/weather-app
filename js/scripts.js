let temp, cTemp, fTemp, lat, long, city, icon, description, cityZip;

let request = new XMLHttpRequest();
let weatherKey = config.weatherKey;
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
  console.log('ERROR');
}

$("#toggle").change(function () {
  if ($('input[name="toggle"]').is(':checked')) {
    tempDisplay.innerHTML = cTemp + ' °C';
  } else {
    tempDisplay.innerHTML = fTemp + ' °F';
  }
});

$('#cityZip').click(function () {
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
  }
  request.send();
});

$('#myLocation').click(function () {
  getLocation();
});

function changeBackground(description) {
  if (description.includes('cloud')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('rain')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('drizzle')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('sun')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('clear')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('snow')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/60561/winter-snow-nature-60561.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('smoke')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/345043/pexels-photo-345043.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('storm')) {
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/371838/pexels-photo-371838.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb')";
  }
  if (description.includes('haze')) {
    document.body.style.backgroundImage = "url('http://img.wennermedia.com/social/gettyimages-73909114-ea10777f-1b8d-4abf-854b-aa3db47b294f.jpg')";
  }
  if (description.includes('mist')) {
    document.body.style.backgroundImage = "url('https://static.pexels.com/photos/4827/nature-forest-trees-fog.jpeg')";
  }
};

getLocation();
