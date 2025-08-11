alert('Welcome to Quiz Ninja!');

// Assign the string containing the question to be asked to a variable
const question = "What is Superman's real name?"

// Ask the user the question by creating a prompt dialog that will ask the question and allow the user to type in a response
const answer = prompt(question);

// The answer the user gives is then shown in an alert dialog
alert(`You answered ${answer}`);