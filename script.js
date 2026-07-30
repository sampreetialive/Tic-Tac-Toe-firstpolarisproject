const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let scores = {
    X: 0,
    O: 0,
    draw: 0
};

const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const drawScore = document.getElementById("draw-score");


let gameState = [
    "", "", "",
    "", "", "",
    "", "", ""
];


const winningConditions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];



function handleCellClick() {

    let clickedCell = this;

    let clickedIndex = clickedCell.getAttribute("data-index");


    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }


    gameState[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;


    checkWinner();

}




function checkWinner() {

    let roundWon = false;


    for (let condition of winningConditions) {


        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];


        if (a === "" || b === "" || c === "") {
            continue;
        }


        if (a === b && b === c) {

            roundWon = true;

            break;

        }

    }



    // WINNER

    if (roundWon) {


        statusText.textContent =
        `Player ${currentPlayer} wins!`;


        scores[currentPlayer]++;


        updateScore();


        gameActive = false;


        return;

    }




    // DRAW

    if (!gameState.includes("")) {


        statusText.textContent =
        "It's a Draw!";


        scores.draw++;


        updateScore();


        gameActive = false;


        return;

    }





    // CHANGE PLAYER

    currentPlayer =
    currentPlayer === "X" ? "O" : "X";


    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;

}




function restartGame() {


    currentPlayer = "X";

    gameActive = true;


    gameState = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    statusText.textContent =
    "Player X's Turn";



    cells.forEach(cell => {

        cell.textContent = "";

    });


}




function updateScore() {


    xScore.textContent = scores.X;

    oScore.textContent = scores.O;

    drawScore.textContent = scores.draw;


}





cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );

});



restartButton.addEventListener(
    "click",
    restartGame
);
