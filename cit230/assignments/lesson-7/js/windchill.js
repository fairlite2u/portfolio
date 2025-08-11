var t = document.getElementById('temp').innerHTML;
var s = document.getElementById('windspeed').innerHTML;

var f = 35.74 + (0.6215 * t) - (35.75 * (s**0.16)) + ((0.4275 * t) * (s**0.16))
document.getElementById("windchill").innerHTML = f.toFixed(1);