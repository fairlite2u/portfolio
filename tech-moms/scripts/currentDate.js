let today = new Date()
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("currentdate").innerHTML = (day[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()] + " " + today.getFullYear());