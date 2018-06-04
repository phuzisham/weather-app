var request = new XMLHttpRequest();
var temp = 0;
var tempDiv = document.getElementById('temp');

request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=portland&APPID=ff3c9f4d39e7e445f23cfbb2e3ba1f27', true);

console.log('outside the payload');

request.onload = function() {
  console.log('in the payload');
  var data = JSON.parse(this.response);
  var temp = data.main.temp;

  tempDiv.innerHTML = cTempConversion(temp);
}

var cTempConversion = function(temp) {
  return (temp - 273).toFixed(0);
}

var fTempConversion = function(temp) {
  temp = temp - 273;
  return (9/5 * temp + 32).toFixed(0);
}

request.send();
