// Set the starting angle
let angle = 0;
// Get the square
const squareElement1 = document.getElementById('square1');
const squareElement2 = document.getElementById('square2');

// Animation using setInterval:
// Increase value of angle by 2 until it reaches 360 and resets to 0
setInterval( () => {
    angle = (angle + 2) % 360;
    // rotate the square degrees equal to angle with 60 frames per second
    squareElement1.style.transform = `rotate(${angle}deg)`}, 1000/60);

    
// Optimized by using requestAnimationFrame
function rotate() {
    angle = (angle + 2) % 360;
    squareElement2.style.transform = `rotate(${angle}deg)`
    window.requestAnimationFrame(rotate);
}

// Call function and assign to variable so it can be cancelled
const id = requestAnimationFrame(rotate);

// Cancel using id
//cancelAnimationFrame(id);