const cells=document.querySelectorAll(".cell");

const statusText=document.getElementById("status");

const restartButton=document.getElementById("restart");

const winningLine=document.querySelector(".winning-line");


const clickSound=document.getElementById("clickSound");

const winSound=document.getElementById("winSound");

const drawSound=document.getElementById("drawSound");



let currentPlayer="X";

let gameActive=true;



let gameState=[
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



let scores={

X:0,

O:0,

draw:0

};



const xScore=document.getElementById("x-score");

const oScore=document.getElementById("o-score");

const drawScore=document.getElementById("draw-score");





const winningConditions=[

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


let index=this.dataset.index;


if(gameState[index]!="" || !gameActive)
return;



gameState[index]=currentPlayer;


this.textContent=currentPlayer;


clickSound.play();


checkWinner();


}






function checkWinner(){


let win=null;



for(let condition of winningConditions){


let[a,b,c]=condition;


if(
gameState[a] &&
gameState[a]==gameState[b] &&
gameState[a]==gameState[c]
){

win=condition;

break;

}

}





if(win){


statusText.textContent=
`Player ${currentPlayer} Wins 🎉`;


scores[currentPlayer]++;


updateScore();


showLine(win);


winSound.play();



confetti({

particles:200,

spread:120

});



gameActive=false;


return;


}





if(!gameState.includes("")){


statusText.textContent=
"Draw!";


scores.draw++;


updateScore();


drawSound.play();



gameActive=false;


return;


}




currentPlayer=
currentPlayer==="X"?"O":"X";


statusText.textContent=
`Player ${currentPlayer}'s Turn`;



}







function showLine(win){


winningLine.style.width="300px";


if(win[0]==0)
winningLine.style.top="45px";


if(win[0]==3)
winningLine.style.top="156px";


if(win[0]==6)
winningLine.style.top="268px";



}




function updateScore(){

xScore.textContent=scores.X;

oScore.textContent=scores.O;

drawScore.textContent=scores.draw;

}




function restartGame(){


gameState=[
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


currentPlayer="X";


gameActive=true;


statusText.textContent=
"Player X's Turn";



cells.forEach(cell=>{

cell.textContent="";

});



winningLine.style.width="0";



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
