const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");

const winningLine = document.querySelector(".winning-line");


const clickSound = document.getElementById("clickSound");

const winSound = document.getElementById("winSound");

const drawSound = document.getElementById("drawSound");



let currentPlayer = "X";

let gameActive = true;



let gameState = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];



let scores = {

    X: 0,

    O: 0,

    draw: 0

};



const xScore = document.getElementById("x-score");

const oScore = document.getElementById("o-score");

const drawScore = document.getElementById("draw-score");





const winningConditions = [

    [0,1,2],

    [3,4,5],

    [6,7,8],


    [0,3,6],

    [1,4,7],

    [2,5,8],


    [0,4,8],

    [2,4,6]

];







function handleCellClick(){


    let index = this.dataset.index;



    if(gameState[index] !== "" || !gameActive){

        return;

    }



    gameState[index] = currentPlayer;


    this.textContent = currentPlayer;



    if(clickSound){

        clickSound.play();

    }



    checkWinner();

}









function checkWinner(){


    let win = null;



    for(let condition of winningConditions){


        let [a,b,c] = condition;



        if(

            gameState[a] &&

            gameState[a] === gameState[b] &&

            gameState[a] === gameState[c]

        ){

            win = condition;

            break;

        }

    }





    if(win){


        statusText.textContent =
        `Player ${currentPlayer} Wins 🎉`;



        scores[currentPlayer]++;



        updateScore();



        showLine(win);



        if(winSound){

            winSound.play();

        }



        confetti({

            particleCount:200,

            spread:120

        });



        gameActive = false;


        return;


    }







    if(!gameState.includes("")){


        statusText.textContent =
        "It's a Draw!";



        scores.draw++;



        updateScore();



        if(drawSound){

            drawSound.play();

        }



        gameActive = false;


        return;


    }






    currentPlayer =
    currentPlayer === "X" ? "O" : "X";



    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;

}









// NEW FIXED WINNING LINE SYSTEM

function showLine(win){


    const board = document.querySelector(".board");


    const firstCell = cells[win[0]];

    const lastCell = cells[win[2]];



    const boardRect = board.getBoundingClientRect();


    const firstRect = firstCell.getBoundingClientRect();

    const lastRect = lastCell.getBoundingClientRect();




    const x1 =
    firstRect.left +
    firstRect.width / 2 -
    boardRect.left;



    const y1 =
    firstRect.top +
    firstRect.height / 2 -
    boardRect.top;




    const x2 =
    lastRect.left +
    lastRect.width / 2 -
    boardRect.left;



    const y2 =
    lastRect.top +
    lastRect.height / 2 -
    boardRect.top;





    const length =
    Math.sqrt(

        Math.pow(x2-x1,2) +
        Math.pow(y2-y1,2)

    );





    const angle =
    Math.atan2(

        y2-y1,

        x2-x1

    )
    *
    (180 / Math.PI);






    winningLine.style.width =
    `${length}px`;



    winningLine.style.left =
    `${x1}px`;



    winningLine.style.top =
    `${y1}px`;



    winningLine.style.transformOrigin =
    "0 50%";



    winningLine.style.transform =
    `rotate(${angle}deg)`;


}









function updateScore(){


    xScore.textContent = scores.X;


    oScore.textContent = scores.O;


    drawScore.textContent = scores.draw;


}









function restartGame(){


    currentPlayer = "X";


    gameActive = true;



    gameState = [

        "",
        "",
        "",

        "",
        "",
        "",

        "",
        "",
        ""

    ];



    statusText.textContent =
    "Player X's Turn";



    cells.forEach(cell=>{


        cell.textContent = "";


    });




    winningLine.style.width = "0px";

    winningLine.style.transform =
    "rotate(0deg)";


}









cells.forEach(cell=>{


    cell.addEventListener(
        "click",
        handleCellClick
    );


});







restartButton.addEventListener(
    "click",
    restartGame
);
