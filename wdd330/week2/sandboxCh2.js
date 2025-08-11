// Eloquent JavaScript Code Sandbox 

//Chapter 2

/**
 * Looping a Triangle
 * Write a loop that makes seven calls to console.log to output the following triangle:
 * #
 * ##
 * ###
 * ####
 * #####
 * ######
 * #######
 */

for (let output = "#"; output.length < 8; output += "#"){
    console.log(output);
  }

/**
 * FizzBuzz
 * Write a program that uses console.log to print all the numbers from 1 to 100,
 * with two exceptions. For number divisible by 3, print "Fizz" instead of the 
 * number, and for numbers divisible by 5(and not by 3), print "Buzz" instead.
 */

for(let i=1; i <=100; i++){
    if (i%3 === 0){
        console.log("Fizz");
    } else if (i%5 === 0){
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

/**
 * FizzBuzz Stretch
 * Then modify your program to print "FizzBuzz" for numbers that are divisible by
 * both 3 and 5.
 */

 for(let i=1; i <=100; i++){
    let line = "";
    if (i%3 == 0){
        line += "Fizz";
    } 
    if (i%5 == 0){
        line += "Buzz";
    } 
    console.log(line || i);
}

/**
 * Chessboard
 * Write a program that creates a string that represents an 8x8 grid, using newline
 * characters to separate lines. At each position of the grid there is either a space
 * or a "#" character. The characters should form a chessboard. 
 */

let board = "";
for (let x = 1; x<=8; x++){
    for(let y = 1; y <=8; y++){
        if ((x+y)%2 == 0){
            board+= " ";
        } else {
            board += "#";
        }
    }
    board += "\n";
}
console.log(board);

/**
 * Chessboard Stretch
 * Modify the program to define a binding size = 8 and change the program so that
 * it works for any size, outputting a grid of the given width and height.
 */

 let board = "";
 let size = 8;
 for (let x = 1; x<=size; x++){
     for(let y = 1; y <=size; y++){
         if ((x+y)%2 == 0){
             board+= " ";
         } else {
             board += "#";
         }
     }
     board += "\n";
 }
 console.log(board);