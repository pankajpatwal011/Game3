let gameSeq = [];//Game seuqence array
let userSeq = [];//User Sequence
let btns = ["yellow","red","purple","green"];
let highScore = 0;//Declaration for high score

let started = false;//Declare that the value of the started is false it mean's game has not started
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if(started == false) {//Check that the value of the started is false it mean's game has not started
        console.log("Game is started");
        started = true;//By setting this our game will start only for one time 
    }
    levelUp();//When the game is start then make a call to levelUp
});

function gameFlash(btn){//This is the flash of the game
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){//This is user flash of the game
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}


function levelUp(){
    userSeq = [];//To reset the user sequence
    level++;//Increase the level 
    h2.innerText = `Levle ${level}`;//Store the value of the level in the innertext of h2
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);//rabdColor contains string like:- red,yellow,purple,green which are the classnames in the HTML so we need to select them as a class
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);//Add randColor to the gameSeq
    console.log(gameSeq);//to print game sequence
    gameFlash(randBtn);//Call to gameFlash with randBtn attribute so that the button will flash
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){//We write userSeq 1stly bcz we are checking the userSeq with gameSeq instead of gameSeq with userSeq
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);//We wanna check it after the 1 second
        }
    }
    else{
        if(level>highScore){
            highScore = level;
        };
        h2.innerHTML = `Game is over! Your Score was <b>${level}</b> <br> High Score: ${highScore} Press any key to start the game `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();//Call to the reset function
    }
}

function btnPress(){//For user press
    let btn = this;
    // console.log(btn);
    userFlash(btn);

    userColor = btn.getAttribute("id");//We click on the button's so that's why we are taking the btn as a object
    userSeq.push(userColor);
    checkAns(userSeq.length-1);//We make a call to this function bcz when we press any button then it is essential to perform the check -1 bcz we are checking the last button in checkans
}

let allBtns = document.querySelectorAll(".btn")
    for(btn of allBtns){
        btn.addEventListener("click",btnPress);
    };

function reset(){//Function reset is used to reset the else part of checkAns function
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}