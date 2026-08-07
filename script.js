const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");

const newGameButton = document.getElementById("newGame");

const manualModeButton = document.getElementById("manualMode");

const aiModeButton = document.getElementById("aiMode");

const friendModeButton = document.getElementById("friendMode");

const winningLine = document.querySelector(".winning-line");


const clickSound = document.getElementById("clickSound");

const winSound = document.getElementById("winSound");

const drawSound = document.getElementById("drawSound");



let currentPlayer = "X";

let gameActive = true;


// GAME MODE

let aiTimer;
let gameMode = "manual";

let aiPlayer = "O";



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

X:0,

O:0,

draw:0

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








function playSound(sound){

    if(!sound){
        return;
    }


    sound.pause();

    sound.currentTime = 0;

    sound.volume = 1;


    let promise = sound.play();


    if(promise !== undefined){

        promise.catch(error=>{

            console.log("Sound error:", error);

        });

    }

}










function handleCellClick(){



let index=this.dataset.index;



if(

gameState[index]!=="" ||

!gameActive

){

return;

}




gameState[index]=currentPlayer;



this.textContent=currentPlayer;




this.classList.add(

currentPlayer==="X"

?

"x"

:

"o"

);





playSound(clickSound);



checkWinner();


// AI TURN

if(

gameMode==="ai" &&

gameActive &&

currentPlayer==="O"

){

aiTimer = setTimeout(aiMove,600);

}


}



function checkWinner(){


let win=null;



for(let condition of winningConditions){


let [a,b,c]=condition;



if(

gameState[a] &&

gameState[a]===gameState[b] &&

gameState[a]===gameState[c]

){


win=condition;


break;


}


}








if(win){



statusText.textContent=

`Player ${currentPlayer} Wins 🎉`;



statusText.className="win";



scores[currentPlayer]++;



updateScore();



showLine(win);


highlightWinner(win);


playSound(winSound);




if(window.confetti){


confetti({

particleCount:200,

spread:100,

origin:{y:.6}

});


}



gameActive=false;



return;


}








if(!gameState.includes("")){



statusText.textContent=

"It's a Draw!";



statusText.className="draw";


// DRAW BOARD EFFECT

document.querySelector(".board").classList.add("draw-board");



scores.draw++;



updateScore();



playSound(drawSound);



gameActive=false;



return;


}







currentPlayer =

currentPlayer==="X"

?

"O"

:

"X";






statusText.className="";



statusText.textContent=

`Player ${currentPlayer}'s Turn`;



}












// WINNING TILE EFFECT

function highlightWinner(win){

win.forEach(index=>{

cells[index].classList.add("winner");

});

}












function showLine(win){



const board=document.querySelector(".board");



const start=cells[win[0]];

const end=cells[win[2]];





const boardRect=

board.getBoundingClientRect();



const startRect=

start.getBoundingClientRect();



const endRect=

end.getBoundingClientRect();







const x1=

startRect.left+

startRect.width/2-

boardRect.left;



const y1=

startRect.top+

startRect.height/2-

boardRect.top;







const x2=

endRect.left+

endRect.width/2-

boardRect.left;



const y2=

endRect.top+

endRect.height/2-

boardRect.top;







const distance = Math.sqrt(

Math.pow(x2-x1,2)

+

Math.pow(y2-y1,2)

);







const angle=

Math.atan2(

y2-y1,

x2-x1

)

*

180/Math.PI;







winningLine.style.width=

`${distance}px`;



winningLine.style.left=

`${x1}px`;



winningLine.style.top=

`${y1}px`;



winningLine.style.transform=

`rotate(${angle}deg)`;



}



// =================
// AI SYSTEM
// =================


function aiMove(){


if(!gameActive){

return;

}



let move = findBestMove("O");


// block player

if(move===null){

move=findBestMove("X");

}


// random if no strategy

if(move===null){


let available=[];


gameState.forEach((cell,index)=>{


if(cell===""){

available.push(index);

}


});



move=

available[

Math.floor(

Math.random()*available.length

)

];


}



cells[move].click();


}





function findBestMove(player){



for(let condition of winningConditions){



let values=condition.map(

index=>gameState[index]

);



let count=

values.filter(

value=>value===player

).length;



let empty=

condition.find(

index=>gameState[index]===""

);



if(

count===2 &&

empty!==undefined

){


return empty;


}


}



return null;


}






function updateScore(){


xScore.textContent=scores.X;


oScore.textContent=scores.O;


drawScore.textContent=scores.draw;


}










// RESTART ONLY CLEARS BOARD

function restartGame(){

clearTimeout(aiTimer);

currentPlayer="X";


gameActive=true;



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







cells.forEach(cell=>{


cell.textContent="";


cell.classList.remove(

"x",

"o",

"winner"

);


});



// remove draw effect

document.querySelector(".board").classList.remove("draw-board");







statusText.className="";



statusText.textContent=

"Player X's Turn";







winningLine.style.width="0px";


winningLine.style.transform=

"rotate(0deg)";



}












// NEW GAME CLEARS EVERYTHING

function newGame(){


clearTimeout(aiTimer);


// reset mode

gameMode="manual";


// reset board

restartGame();


// reset scores

scores={

X:0,

O:0,

draw:0

};


updateScore();


// reset message

statusText.className="";

statusText.textContent=

"Player X's Turn";


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





if(manualModeButton){

manualModeButton.addEventListener(

"click",

()=>{

gameMode="manual";

restartGame();

statusText.textContent=

"Manual Mode - Player X's Turn";

}

);

}



if(friendModeButton){

friendModeButton.addEventListener(

"click",

()=>{

gameMode="friend";

restartGame();

statusText.textContent=

"Friend Mode - Player X's Turn";

}

);

}



if(aiModeButton){

aiModeButton.addEventListener(

"click",

()=>{

gameMode="ai";

restartGame();

statusText.textContent=

"You vs AI - Your Turn";

}

);

}



if(newGameButton){

newGameButton.addEventListener(

"click",

()=>{

console.log("NEW GAME BUTTON WORKING");

newGame();

}

);

}
