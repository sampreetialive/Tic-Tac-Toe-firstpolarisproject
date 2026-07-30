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





    // WIN CONDITION

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





    // DRAW CONDITION

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







    // CHANGE PLAYER


    currentPlayer =
    currentPlayer === "X" ? "O" : "X";



    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;



}









// FIXED WINNING LINE FUNCTION

function showLine(win){


    winningLine.style.width = "300px";

    winningLine.style.height = "8px";

    winningLine.style.left = "0px";

    winningLine.style.top = "0px";

    winningLine.style.transform = "rotate(0deg)";



    let combination = win.toString();





    // Horizontal rows


    if(combination === "0,1,2"){


        winningLine.style.top = "45px";


    }



    else if(combination === "3,4,5"){


        winningLine.style.top = "156px";


    }



    else if(combination === "6,7,8"){


        winningLine.style.top = "268px";


    }






    // Vertical columns


    else if(combination === "0,3,6"){


        winningLine.style.left = "45px";

        winningLine.style.top = "156px";

        winningLine.style.transform =
        "rotate(90deg)";


    }



    else if(combination === "1,4,7"){


        winningLine.style.left = "156px";

        winningLine.style.top = "156px";

        winningLine.style.transform =
        "rotate(90deg)";


    }



    else if(combination === "2,5,8"){


        winningLine.style.left = "268px";

        winningLine.style.top = "156px";

        winningLine.style.transform =
        "rotate(90deg)";


    }







    // Diagonal top-left to bottom-right


    else if(combination === "0,4,8"){


        winningLine.style.width = "420px";


        winningLine.style.left = "-60px";


        winningLine.style.top = "156px";


        winningLine.style.transform =
        "rotate(45deg)";


    }







    // Diagonal top-right to bottom-left


    else if(combination === "2,4,6"){


        winningLine.style.width = "420px";


        winningLine.style.left = "-60px";


        winningLine.style.top = "156px";


        winningLine.style.transform =
        "rotate(-45deg)";


    }



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



    // Reset winning line


    winningLine.style.width = "0";

    winningLine.style.transform = "rotate(0deg)";

    winningLine.style.left = "0px";

    winningLine.style.top = "0px";



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
