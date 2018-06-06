var request = new XMLHttpRequest();
var weatherKey = config.weatherKey;
var temp = 0;
var cTemp = 0;
var fTemp = 0;
var tempDiv = document.getElementById('temp');

request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=portland&APPID=' + weatherKey, true);

request.onload = function(temp) {
  var data = JSON.parse(this.response);
  temp = data.main.temp;
  cTemp = cTempConversion(temp);
  fTemp = fTempConversion(cTemp);

  tempDiv.innerHTML = cTemp + ' Degrees Celcius.';
}

var cTempConversion = function(temp) {
  return (temp - 273).toFixed(0);
}

var fTempConversion = function(temp) {
  return (9/5 * temp + 32).toFixed(0);
}

var changeUnits = function(temp) {
  if (tempDiv.innerHTML == cTemp + ' Degrees Celcius.') {
    tempDiv.innerHTML = fTemp + ' Degrees Fahrenheit.';
  } else {
      tempDiv.innerHTML = cTemp + ' Degrees Celcius.';
  }
}

request.send();
