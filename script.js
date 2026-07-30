const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");

const winningLine = document.querySelector(".winning-line");



let currentPlayer = "X";

let gameActive = true;



let scores = {

    X:0,

    O:0,

    draw:0

};



const xScore = document.getElementById("x-score");

const oScore = document.getElementById("o-score");

const drawScore = document.getElementById("draw-score");



let gameState = [

    "","","",

    "","","",

    "","",""

];





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


    let clickedIndex =
    this.getAttribute("data-index");



    if(gameState[clickedIndex] !== "" || !gameActive){

        return;

    }



    gameState[clickedIndex] = currentPlayer;


    this.textContent = currentPlayer;



    checkWinner();



}





function checkWinner(){


    let winningCondition = null;



    for(let condition of winningConditions){



        let a = gameState[condition[0]];

        let b = gameState[condition[1]];

        let c = gameState[condition[2]];



        if(a !== "" && a===b && b===c){


            winningCondition = condition;

            break;


        }


    }





    if(winningCondition){



        statusText.textContent =
        `Player ${currentPlayer} wins!`;



        scores[currentPlayer]++;


        updateScore();



        showWinningLine(winningCondition);



        gameActive=false;


        return;


    }





    if(!gameState.includes("")){


        statusText.textContent =
        "It's a Draw!";


        scores.draw++;


        updateScore();


        gameActive=false;


        return;


    }






    currentPlayer =
    currentPlayer==="X" ? "O" : "X";



    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;



}





function showWinningLine(condition){



    let positions = {


        "0,1,2":
        "translateY(-100px)",


        "3,4,5":
        "translateY(0px)",


        "6,7,8":
        "translateY(100px)",


        "0,3,6":
        "rotate(90deg) translateY(100px)",


        "1,4,7":
        "rotate(90deg) translateY(0px)",


        "2,5,8":
        "rotate(90deg) translateY(-100px)",


        "0,4,8":
        "rotate(45deg)",


        "2,4,6":
        "rotate(-45deg)"

    };



    winningLine.style.width="300px";


    winningLine.style.transform =
    positions[condition.toString()];


}







function restartGame(){



    currentPlayer="X";


    gameActive=true;



    gameState=[

        "","","",

        "","","",

        "","",""

    ];



    statusText.textContent =
    "Player X's Turn";



    cells.forEach(cell=>{

        cell.textContent="";

    });



    winningLine.style.width="0";



}






function updateScore(){


    xScore.textContent=scores.X;


    oScore.textContent=scores.O;


    drawScore.textContent=scores.draw;


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
