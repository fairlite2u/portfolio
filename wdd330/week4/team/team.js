const board = document.querySelector('.board');
const reset = document.getElementById('reset');
board.addEventListener('click', placeMark);
reset.addEventListener('click', resetGame);

const player1 = "X";
const player2 = "O";

let player = player1;

function placeMark(e) {
    console.log(e.target);
    e.target.innerHTML = player;
    if (player == player1) {
        player = player2;
    } else {
        player = player1;
    }
}

function resetGame() {
    const squares = document.querySelectorAll('.board td');
    for (square of squares) {
        square.innerHTML = "";
    }
}


// Chris' research - work in progress for Stretch 2 & 3:

// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// function handleResultValidation() {
//     let roundWon = false;
//     for (let i = 0; i <= 7; i++) {
//         const winCondition = winningConditions[i];
//         let a = gameState[winCondition[0]];
//         let b = gameState[winCondition[1]];
//         let c = gameState[winCondition[2]];
//         if (a === '' || b === '' || c === '') {
//             continue;
//         }
//         if (a === b && b === c) {
//             roundWon = true;
//             break
//         }
//     }
// if (roundWon) {
//         statusDisplay.innerHTML = winningMessage();
//         gameActive = false;
//         return;
//     }
// }

// let roundDraw = !gameState.includes("");
//     if (roundDraw) {
//         statusDisplay.innerHTML = drawMessage();
//         gameActive = false;
//         return;
//     }



// Jesse's work in progress for Stretch 2 & 3:

// const tie = board => board.every(x => x !== '');
// const winCondToRow = boardText => condition => condition.map(i => board[i]);

// winningConditions.map(winningConditionToRow).any(checkRow)

// function checkRow(row, player) {
//     return row.all(function (content) {
//         return content === player;
//     })
// }

// function boardColumn(board, col) {
//     return board.map(row => row[col]);
// }

// for (winCond of winningConditions)
// {
// pl = boardText[winCond[0]]
// if(boardText[winCond[1]] == pl && boardText[winCond[2]] == pl)
// return pl;
// }


// function getWinner() {
//     const boardText = document.querySelectorAll(".board tr").map(x => x.querySelectorAll("td").map(y => y.textContent));
//     const checkWin 
// }