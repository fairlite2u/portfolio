alert('Welcome to Quiz Ninja!');

// Create an array that contains the questions and the answers in key pairs
// Use const because the array won't change
const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonderwoman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
  ];

 // Set starting score to zero
let score = 0;

// Use a for-of loop to iterate over the array
for(const [question,answer] of quiz){

  // get answer from user and store as variable
  const response = prompt(question);
  // compare user's response to correct answer using if...else
  // if correct, increase score by one and tell the user they are correct
  if(response === answer){
    alert('Correct!');
    score++;
  } 
  // if wrong, don't increase score, tell the user they are wrong, and give correct answer
  else {
    alert(`Wrong! The correct answer was ${answer}`);
  }
}

// Tell user their score
// Cool trick using the ternary operator to apend an s to point for scores greater than one
alert(`Game Over, you scored ${score} point${score > 1 ? 's' : ''}`);