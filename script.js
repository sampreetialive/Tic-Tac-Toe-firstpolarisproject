*{

box-sizing:border-box;

font-family:"Segoe UI",Arial,sans-serif;

}



body{

margin:0;

height:100vh;

display:flex;

justify-content:center;

align-items:center;

overflow:hidden;


background:

radial-gradient(
circle at top,
#17002b,
#030308 70%
);


color:white;

}





.background-glow{

position:absolute;

width:600px;

height:600px;


background:

radial-gradient(
circle,
rgba(0,170,255,.3),
transparent 70%
);



filter:blur(100px);



animation:floatGlow 8s infinite alternate;


}



@keyframes floatGlow{


from{

transform:translate(-100px,-50px);

}


to{

transform:translate(100px,50px);

}


}







.container{

position:relative;

z-index:2;

text-align:center;

padding:20px;


}







/* TITLE */


h1{


font-size:60px;


letter-spacing:10px;


color:white;



text-shadow:


0 0 15px white,

0 0 40px white;



margin-bottom:20px;


}










/* STATUS */


#status{


height:55px;


font-size:26px;


font-weight:bold;



display:flex;


justify-content:center;


align-items:center;



color:white;



transition:.3s;


}





#status.win{


font-size:38px;


color:#39ff14;



text-shadow:


0 0 20px #39ff14,

0 0 50px #39ff14;


}






#status.draw{


font-size:38px;


color:#ff1744;



text-shadow:


0 0 20px #ff1744,

0 0 50px #ff1744;


}









/* SCOREBOARD */


.scoreboard{


display:flex;


justify-content:center;


gap:20px;


margin:25px;


}





.score-card{


width:120px;


padding:15px;


border-radius:20px;



background:

rgba(0,140,255,.15);



border:

2px solid #008cff;



color:#00aaff;



box-shadow:


0 0 25px #008cff;



transition:.3s;


}




.score-card:hover{


transform:

translateY(-8px);


}





.score-card h3{


margin:0;


font-size:20px;


}



.score-card p{


font-size:35px;


margin:10px 0 0;


}









/* BOARD */


.board{


position:relative;



display:grid;



grid-template-columns:

repeat(3,110px);



gap:15px;



padding:15px;



border-radius:25px;



background:

rgba(255,255,255,.05);



box-shadow:


0 0 40px rgba(0,170,255,.5);



}









.cell{


height:110px;


width:110px;



display:flex;



justify-content:center;



align-items:center;



font-size:65px;



font-weight:900;



cursor:pointer;



border-radius:20px;



background:

rgba(255,255,255,.05);



border:

2px solid rgba(255,255,255,.2);



transition:.3s;



}





.cell:hover{


transform:scale(1.1);



border-color:#00f5ff;



box-shadow:

0 0 30px #00f5ff;


}








.cell.x{


color:#00f5ff;



text-shadow:


0 0 15px #00f5ff,

0 0 40px #00f5ff;


animation:pop .3s;


}





.cell.o{


color:#ff0080;



text-shadow:


0 0 15px #ff0080,

0 0 40px #ff0080;



animation:pop .3s;


}








@keyframes pop{


0%{

transform:scale(0);

}


70%{

transform:scale(1.3);

}


100%{

transform:scale(1);

}


}









/* WINNING LINE */


.winning-line{


position:absolute;



height:8px;



width:0;



background:#00f5ff;



border-radius:20px;



z-index:50;



box-shadow:


0 0 20px #00f5ff,

0 0 60px #00f5ff;



transform-origin:left center;



transition:

width .5s ease,

transform .5s ease;



pointer-events:none;



/* IMPORTANT FIX */

grid-column:1 / -1;

grid-row:1 / -1;


}









button{


margin-top:35px;


padding:15px 45px;



font-size:20px;



border:none;



border-radius:50px;



cursor:pointer;



color:white;



background:

linear-gradient(

45deg,

#008cff,

#00f5ff

);



box-shadow:


0 0 30px #00f5ff;



transition:.3s;


}





button:hover{


transform:scale(1.1);



box-shadow:


0 0 60px #00f5ff;


}








@media(max-width:600px){



h1{

font-size:40px;

}




.board{


grid-template-columns:

repeat(3,80px);


}




.cell{


height:80px;


width:80px;



font-size:45px;


}



}
