// Add more questions!
// const quiz = [
//     { name: "Superman",realName: "Clark Kent"},
//     { name: "Wonder Woman",realName: "Diana Prince"},
//     { name: "Batman",realName: "Bruce Wayne"},
//     { name: "The Hulk",realName: "Bruce Banner"},
//     { name: "Spider-man",realName: "Peter Parker"},
//     { name: "Cyclops",realName: "Scott Summers"},
//     { name: "Star-Lord",realName: "Peter Quill"},
//     { name: "Black Widow", realName: "Natasha Romanoff"},
//     { name: "Scarlet Witch", realName: "Wanda Maximoff"}
// ];

// Use Ajax to fetch questions from a server instead of having them as an object in our JS
const url = 'https://spbooks.github.io/jsninja2/questions.json';
// Use Fetch API to get the JSON data
fetch(url)
// Returns data as a JS object
.then(res => res.json())
.then(quiz => {
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
    view.response.addEventListener('click', (event) = game.check(event), false);
});

// Add a random function so the questions aren't always asked in the same order
function random(a, b=1) {
    // If only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a,b] = [b,a];
    }
    return Math.floor((b - a + 1) * Math.random()) + a;
}
// Create shuffle function to change the position of the elements inside the array
function shuffle(array) {
    // The for loop iterates backwards through the array and selects a random element to swap with
    for (let i = array.length; i; i--) {
        let j = random(i) - 1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

// View Object - everything here is related to view in the html document
const view = {
    // Use document.querySelector and getElementById to connect to div in html
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    // Add reference to form in html
    response: document.querySelector('#response'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    // Connect the button in the html to the js
    start: document.getElementById('start'),
    // Connect the timer in the html to the js
    timer: document.querySelector('#timer strong'),
    // the render function updates the content of an element on the page without reloading the page
    // it uses a for loop to update HTML with the content provided
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    },
    // Add the show and hide functions to show and hide elements on the page
    // These work by simply changing the style.display property to none to hide an element, and block to display it.
    // These will make the start button disapper while the game is in progress and then reappear once the game is over.
    show(element){
        element.style.display = 'block';
    },
    hide(element){
        element.style.display = 'none';
    },
   
    // This function uses the show and hide methods so the question, response, and results are visible and hides the start button
    // The render method is used to reset the HTML content in the result and info elements to an empty string
    // Also calls the new resetForm method
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
    },
    // This method is called at the end of the game to hide any elements not required and make the start button visible again
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },
    // Add a helper method to create the button HTML
    buttons(array) {
        return array.map(value => `<button>${value}</button>`).join('');
    }
};
// Store questions as objects inside an array

// Creat and object to be the namespace using the object literal pattern
// this is similar to classes in Java that I am also learning about this week!
const game = {
    // modify the functions to be methods inside the object
    start(quiz){
        // Adding calls to the console make the code easier to debug
        // This will log a message in the console when the method is invoke so we can see where the program is in its runtime.
        // These calls are also added to ask(), check(event), and gameOver()
        console.log('start() invoked');
        // the 'this' keyword refers to the object that is within
        this.score = 0;
        this.questions = [...quiz];
        // The view.setup() method needs to be called at the beginning of every game
        view.setup();
        // add this.ask() so the first question will be asked
        this.ask();  
        // Initialize the seconds remaining to 20
        this.secondsRemaining = 20;
        // Sets up the countdown method called
        this.timer = setInterval(this.countdown, 1000);     
    },
    // Add countdown function that will continually decrease the countdown by 1 and display the remaining time
    countdown(){
        game.secondsRemaining--;
        view.render(view.timer, game.secondsRemaining);
        // Once countdown reaches below zero, call the game over function
        if(game.secondsRemaining < 0) {
            game.gameOver();
        }
    },
    // Update to add name object as parameter
    ask(name){
        // Adding calls to the console make the code easier to debug
        console.log('ask() invoked');
        // Check the length of the this.questions array to see if there are questions left
        // Change it from greater than 0 to greater than 2 so that three possible answers are given
        if(this.questions.length > 2) {
            // Add cal to the shuffle method so questions are asked in a random order
            shuffle(this.questions);
            // If questions left, use pop() method to remove the last element in the array and assign it to this.question
            this.question = this.questions.pop();
            // This array is created so that the answer options can be randomly presented
            const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
            // And shuffled
            shuffle(options);
            // The next two line of code stay the same from QuizNinja 7, but are placed inside the if statement
            const question = `What is ${this.question.name}'s real name?`;
            // the call to the render function replaces the prompt dialog
            view.render(view.question,question);
            // The answer options need to be displayed
            view.render(view.response, view.buttons(options));
        }
        // Stops asking questions if no questions left
        else {
            this.gameOver();
        }
    },
    // Update to add event object as parameter
    check(event){
        // Adding calls to the console make the code easier to debug
        console.log('check(event) invoked');
        // Get the answer that was submitted by user
        const response = event.target.textContent;
        // This stays the same from last week
        const answer = this.question.realName;
        if(response === answer){
        // the call to the render function will replace the alert dialog
        view.render(view.result,'Correct!',{'class':'correct'});
        this.score++;
        // the render function is inserted here to update the score as needed
        view.render(view.score,this.score);
        } 
        else {
        // the call to the render function will replace the alert dialog        
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        // Triggers the next question to be asked
        this.ask();
    },
    gameOver(){
        // Adding calls to the console make the code easier to debug
        console.log('gameOver() invoked');        
        // the call to the render function replaces the alert dialog          
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        // Add the call to the hide function to unhide the start button
        view.teardown();
        // This line removes the interval when the games has finished so it doesn't keep counting down. 
        clearInterval(this.timer);
    }
}

// Move these to the JSON part at the top
// // Update the call to the game.start function to be triggered by clicking the button
// view.start.addEventListener('click', () => game.start(quiz), false);
// // Add event listener that is triggered when the button is clicked
view.response.addEventListener('click', (event) => game.check(event), false);