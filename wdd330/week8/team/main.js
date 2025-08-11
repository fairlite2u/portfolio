const base = 'https://swapi.dev/api/';
const people = 'people/';
const url = base + people;
const page = 'https://swapi.dev/api/people/?page=';
let nextURL = '';
let prevURL = '';

function getJSON(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.table(data);
        nextURL = data.next;
        prevURL = data.previous;


        const charList = document.getElementById('character-list');
        const list = document.createElement('ul');
        list.classList = 'charBox';
        data.results.map(makePerson).forEach(element => {
            list.appendChild(element)
        });;
        charList.innerHTML = '';
        charList.appendChild(list);
});
}
function makePerson({
    name, 
    height, 
    mass, 
    hair_color, 
    skin_color, 
    eye_color, 
    birth_year, 
    gender
}) {
    const charEl = document.createElement('li');
    charEl.classList = 'charDetails';
    charEl.innerHTML = `<h3>${name}</h3>
    <ul>
    <li>Height: ${height}</li>
    <li>Mass: ${mass}</li>
    <li>Hair color: ${hair_color}</li>
    <li>Skin color: ${skin_color}</li>
    <li>Eye color: ${eye_color}</li>
    <li>Birth year: ${birth_year}</li>
    <li>Gender: ${gender}</li>
    </ul>`;
    return charEl;
}

document.querySelector('#nextButton').addEventListener('click', function(event){getJSON(nextURL)});
document.querySelector('#prevButton').addEventListener('click', function(event){getJSON(prevURL)});
document.querySelector('#page1').addEventListener('click', function(event){getJSON(page+'1')});
document.querySelector('#page2').addEventListener('click', function(event){getJSON(page+'2')});
document.querySelector('#page3').addEventListener('click', function(event){getJSON(page+'3')});
document.querySelector('#page4').addEventListener('click', function(event){getJSON(page+'4')});
document.querySelector('#page5').addEventListener('click', function(event){getJSON(page+'5')});
document.querySelector('#page6').addEventListener('click', function(event){getJSON(page+'6')});
document.querySelector('#page7').addEventListener('click', function(event){getJSON(page+'7')});
document.querySelector('#page8').addEventListener('click', function(event){getJSON(page+'8')});
document.querySelector('#page9').addEventListener('click', function(event){getJSON(page+'9')});

getJSON(url);
