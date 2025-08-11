// This uses and event listener to change the background color if the button is clicked
const btn = document.getElementById('rainbow');
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'rebeccapurple', 'violet'];
function change() {
    document.body.style.background = rainbow[Math.floor(7*Math.random())];
}
btn.addEventListener('click', change);

const form = document.forms[0];
form.addEventListener('submit', factorize, false);

// // This will find the factors of the number in the input field when the 'Submit' button is clicked and show the result in the empty div.
// // The problem with this method is that it can't handle really large numbers (say at least 18-20 digits) quickly and the browser will display a warning. 
// // Also, the 'Change Color' button cannot be used while the factors are being calculated because the whole program is frozen until the factors are calculated.
// // Instead, we will edit the factorize() function and move the factorsOf() function into a new js file to be used with a worker.

// function factorize(event) {
//     // prevent the form from being submitted
//     event.preventDefault();

//     const number = Number(form.number.value);
//     document.getElementById('output').innerText = factorsOf(number);
// }

// function factorsOf(n) {
//     if(Number.isNaN(Number(n))) {
//         throw new RangeError('Argument Error: Value must be an integer');
//     }
//     if(n < 0) {
//         throw new RangeError('Argument Error: Number must be positive');
//     }
//     if(!Number.isInteger(n)) {
//         throw new RangeError('Argument Error: Number must be an integer');
//     }
//     const factors = [];
//     for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
//         if (n%i === 0) {
//             factors.push(i, n/i);
//         }
//     }
//     return factors.sort((a,b) => a - b);
// }


// Instead, use web workers to allow the rest of the page to continue working while the factors are calculated.
function factorize(event) {
    // prevent the form from being submitted
    event.preventDefault();
    // display message to let user know the result may take awhile to calculate (only displayed until the worker returns a result)
    document.getElementById('output').innerHTML = '<p>This could take a while ...</p>';
    const number = Number(form.number.value);

    // Check to see that web workers are supported
    if(window.Worker) {
        // if they are, add a new web worker
        const worker = new Worker('factors.js');
        // use postMessage() to send a message to the worker (the number to be factorized)
        worker.postMessage(number);
        // Set up and event listener that will fire when a message is received back from the worker and insert the information now stored in the data property into the output div.
        worker.addEventListener('message', (event) => {
            document.getElementById('output').innerHTML = event.data;
        }, false);
    }
}