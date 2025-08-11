// This part stays the same as the previous version
const quiz = [
    { name: "Superman",realName: "Clark Kent" },
    { name: "Wonder Woman",realName: "Diana Prince" },
    { name: "Batman",realName: "Bruce Wayne" },
];

// View Object - everything here is related to view in the html document
const view = {
    // Use document.querySelector and getElementById to connect to div in html
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    // the render function updates the content of an element on the page without reloading the page
    // it uses a for loop to update HTML with the content provided
    render(target,content,attributes) {
        for(const key in attributes) {
            target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
    }
};
// Store questions as objects inside an array

// Creat and object to be the namespace using the object literal pattern
// this is similar to classes in Java that I am also learning about this week!
const game = {
    // modify the functions to be methods inside the object
    start(quiz){
        // the 'this' keyword refers to the object that is within
        this.questions = [...quiz];
        this.score = 0;
        // main game loop
        for(const question of this.questions){
        this.question = question;
        // call ask function
        this.ask();
        }
        // end of main game loop
        // call game over function
        this.gameOver();
    },
    ask(){
        const question = `What is ${this.question.name}'s real name?`;
        // the call to the render function replaces the prompt dialog
        view.render(view.question,question);
        const response =  prompt(question);
        this.check(response);
    },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
        // the call to the render function will replace the alert dialog
        view.render(view.result,'Correct!',{'class':'correct'});
        alert('Correct!');
        this.score++;
        // the render function is inserted here to update the score as needed
        view.render(view.score,this.score);
        } else {
        // the call to the render function will replace the alert dialog        
        view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        alert(`Wrong! The correct answer was ${answer}`);
        }
    },
    gameOver(){
        // the call to the render function replaces the alert dialog          
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }
}

// call the start function that is inside the game object using the namespace
game.start(quiz);