// Replace the nested arrays with objects
const quiz = [
    { name: "Superman", realName: "Clark Kent" },
    { name: "Wonder Woman", realName: "Diana Prince" },
    { name: "Batman", realName: "Bruce Wayne" },
];

// Store questions as objects inside an array

// Creat an object to be the namespace using the object literal pattern
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
        const response =  prompt(question);
        // call check function to verify answer
        this.check(response);
    },
    check(response){
        const answer = this.question.realName;
        if(response === answer){
        alert('Correct!');
        this.score++;
        } else {
        alert(`Wrong! The correct answer was ${answer}`);
        }
    },
    gameOver(){
        alert(`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    }
}
// call the start function that is inside the game object using the namespace
game.start(quiz);