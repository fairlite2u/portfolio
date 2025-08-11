const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');

// beginning colors and styles
context.fillStyle = "#0000cc";
context.strokeStyle = "#ccc";
context.lineWidth = 4;

// draw a filled in rectangle
context.fillRect(10,10,100,50);

// draw the outline of a rectangle
context.strokeRect(10,100,100,50);

// draw a thick red T shape
context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#c00';
context.lineWidth = 15;
context.stroke();

// draw a circle
context.beginPath();
context.arc(200, 200, 30, 0, Math.PI * 2, false);
context.strokeStyle = '#ff0';
context.lineWidth = 4;
context.stroke();

// draw the text "Hello"
context.fillStyle = '#0c0';
context.font = 'bold 26px sans-serif';
context.fillText('Hello', 20, 200);

