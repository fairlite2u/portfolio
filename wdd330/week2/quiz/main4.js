// This part stays the same as the previous version
const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
  ];

// Create a main function that has multiple functions inside that do different parts of the quiz
// The main function starts the quiz, sets the score to zero, and calls the other functions
function start(quiz){
   let score = 0;
  // This is the loop from the previous version updated to call the other functions
  for(const [question,answer] of quiz){
    // Here the ask function is called with a parameter of question
    const response = ask(question);
    // Here the check function is called with parameter of response and answer
    check(response,answer);
  }

  // This game over function is called after the other functions have been looped through
  gameOver();

  // The other functions that are called from the main function are below
  
  // This function triggers the prompt dialog and asks a question from the quiz array
  // It returns the answer that the user types in
  function ask(question){
    return prompt(question);
  }

  // This function receives the user's answer from the ask function and checks it against the answer in the array
  // If the answer is correct, the score increases by one
  // If the answer is wrong, the user is given the answer
  function check(response,answer){
    if(response === answer){
      alert('Correct!');
      score++;
    } else {
      alert(`Wrong! The correct answer was ${answer}`);
    }
  }

  // This function ends the game and gives the user their total score
  function gameOver(){
    alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
  }
}

// This calls the main function so that the game starts. The quiz array is passed in as an argument.
// Without this line of code, the quiz won't start!
start(quiz);