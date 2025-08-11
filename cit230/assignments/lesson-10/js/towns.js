const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    let towndata = request.response;
    let towns = towndata['towns'];

    let output = document.querySelector('section');

    towns.forEach(town => {
        if (town.name == "Preston" || town.name == "Soda Springs" || town.name == "Fish Haven") {
            let myH3 = document.createElement('h3');
            let myH4 = document.createElement('h4');
            let myPara1 = document.createElement('p');
            let myPara2 = document.createElement('p');
            let myPara3 = document.createElement('p');
            let img = document.createElement('img');

            if (town.name == "Preston") {
                img.setAttribute("src", "images/preston-barn300.jpg");
                img.setAttribute("alt", "A Red Barn in Preston");
            }
            else if (town.name == "Soda Springs") {
                img.setAttribute("src", "images/sodasprings-barn300x200.jpg");
                img.setAttribute("alt", "A White Barn in Soda Springs");
            }
            else if (town.name == "Fish Haven") {
                img.setAttribute("src", "images/fishhaven-barn300x200.jpg");
                img.setAttribute("alt", "A Red Barn in Fish Haven");
            }

            myH3.textContent = town.name;
            myH4.textContent = town.motto;
            myPara1.textContent = "Year Founded: " + town.yearFounded;
            myPara2.textContent = "Population: " + town.currentPopulation;
            myPara3.textContent = "Annual Rain Fall: " + town.averageRainfall;

            output.appendChild(myH3);
            output.appendChild(myH4);
            output.appendChild(myPara1);
            output.appendChild(myPara2);
            output.appendChild(myPara3);
            output.appendChild(img);
        };
        
    });

}
