// function doSomething(event) {
// //    console.log('Something Happened!');
// //    console.log(event.type);
// //    console.log(event.target);
//     console.log(`screen: (${event.screenX}, ${event.screenY}), page: (${event.pageX}, ${event.pageY}), client: (${event.clientX}, ${event.clientY})`);
// }

// addEventListener('click', doSomething);

const clickParagraph = document.getElementById('click');
clickParagraph.addEventListener('click',() => console.log('click') );
clickParagraph.addEventListener('mousedown',() => console.log('down') );
clickParagraph.addEventListener('mouseup',() => console.log('up') );

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);
function highlight(event){
    event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () =>  console.log('You Moved!') );

// This is triggered by the action of pressing a key
addEventListener('keydown', highlight);
// This is triggered by released the key
addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}`));
// This will return the printed representation of the key that was pressed using the key property:
// addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));
// Use the keydown event instead to use the key property for keys such as Shift, Ctrl, Alt, etc.
addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));
// This will check to see if the user pressed the C key while holding down the Ctrl key:
addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
        console.log('Action canceled!');
    }
});
// This will check to see if the Shift key was held down when the mouse was clicked:
addEventListener('click', (event) => {
    if (event.shiftKey) {
        console.log('A Shifty Click!');
    }
});

// This event occurs when a user stops touching the surface
addEventListener('touchend', () => console.log('Touch stopped'));

// Example of removing an Event Listener after it is used:
const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);
function remove(event) {
    console.log('Enjoy this while it lasts!');
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click',remove);
}

// Example of stopping default behavior (use with caution)
const brokenLink = document.getElementById('broken');
brokenLink.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

// Event Propagation
ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
// // Bubbling:
// ulElement.addEventListener('click', (event) =>
// console.log('Clicked on ul') );
// liElement.addEventListener('click', (event) =>
// console.log('Clicked on li') );
// // Capturing:
// ulElement.addEventListener('click', (event) =>
// console.log('Clicked on ul'),true);
// liElement.addEventListener('click', (event) =>
// console.log('Clicked on li'),true);
// // To have the event both capture and bubble, you must set a separate event handler for both cases:
// // capturing
// ulElement.addEventListener('click', (event) =>
// console.log('Clicked on ul'),true);
// liElement.addEventListener('click', (event) =>
// console.log('Clicked on li'),true);
// // bubbling
// ulElement.addEventListener('click', (event) =>
// console.log('Clicked on ul'),false );
// liElement.addEventListener('click', (event) =>
// console.log('Clicked on li'),false );

// // Using stopPropagation to stop the bubble phase (be careful that you don't stop other event listeners from firing)
// liElement.addEventListener('click', (event) => {
//     console.log('clicked on li');
//     event.stopPropagation(); }, false);

ulElement.addEventListener('click', highlight);

