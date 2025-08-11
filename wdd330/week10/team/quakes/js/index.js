import QuakesController from "./QuakesController.js";

const quakesController = new QuakesController('#quakeList');
const button = document.getElementById('radiusBtn');

button.addEventListener('click', () => {getUserInput();
});

function getUserInput() {
    const input = document.getElementById('radiusInput').value;
    if (input === "") {
        document.getElementById('message').innerText = "You must enter a number";
    } else {
    quakesController.init(Number(input))
    document.getElementById('message').innerText = "";
    }
}
