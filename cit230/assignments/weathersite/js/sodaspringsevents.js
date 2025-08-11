const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    let towndata = request.response; 
    let towns = towndata['towns'];
    let output = document.querySelector('.eventbox');
    for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Soda Springs") {
            let townevents = towns[i].events;
            let numevents = 0; 
            for (let e = 0; e < townevents.length; e++) {
                let event = townevents[numevents];
                numevents++;                 
                let list = document.createElement('ul');
                let listItem = document.createElement('li');
                listItem.textContent = event;
                list.appendChild(listItem);
                output.appendChild(list);
            }
        }
    };
}