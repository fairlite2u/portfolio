// The wss:// intead of https:// is the secure protocol used by websockets instead of HTTP
const URL = 'wss://echo.websocket.org/';
const outputDiv = document.getElementById('output');
const form = document.forms[0];

// This stores a reference to our websocket object. When new WebSocket(URL) runes, it creates an instance of a WebSocket object and tries to connect to the URL. When it is successful, it fires and event called 'open'.
const connection = new WebSocket(URL);

// To deal with the event, add an event handler:
connection.addEventListener('open', () => {
    // call a function called output() with the string 'CONNECTED'. It is used to output messages to the screen
    output('CONNECTED');
}, false);

// Create output() function to append a new paragraph element to the div with the id of output. This will produce a constant stream of messages inside the div.
function output(message) {
    const para = document.createElement('p');
    para.innerHTML = message;
    outputDiv.appendChild(para);
}

// Add an event listener to deal with when the form is submitted
form.addEventListener('submit', message, false);

// Create message() function that was called in the event listener
function message(event) {
    // Stop default behavior so form doesn't actually submit
    event.preventDefault();
    // get value of text input and store in variable
    const text = form.message.value;
    // use the output() function to add the message to the 'output' div
    output(`SENT: ${text}`);
    // Calls the send method of the connection object to send the message to the URL that the websocket is connected to.
    connection.send(text);
}

// Add an event listener to deal with the response
connection.addEventListener('message', (event) => {
    // Access the data using the data property and add message to the 'output' div
    output(`RESPONSE: ${event.data}`);
}, false);