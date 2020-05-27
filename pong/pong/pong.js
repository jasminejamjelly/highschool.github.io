// global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;

var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1=document.getElementById("paddle1").offsetTop;

var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const OgPaddleHeight = document.getElementById("paddle1").offsetHeight;
var paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const OgPaddleHeight2 = document.getElementById("paddle2").offsetHeight;
var paddleHeight2 = document.getElementById("paddle2").offsetHeight;
const paddleWidth2 = document.getElementById("paddle2").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var scoreOne = document.getElementById("score1").innerHTML;
var scoreTwo = document.getElementById("score2").innerHTML;

var bounce = new sound ("bounce.mp3");
var score = new sound ("score.mp3");
var power = new sound ("power.mp3");

// used to control game start/stop
var controlPlay;

// difficulty - easy
var difficulty = 1;

// is game going or not?
var playing = 0;

// counting power ups
var rightStarNumber = 3;
var leftStarNumber = 3;

// move paddles
document.addEventListener('keydown', function(e){

  
    if(e.keyCode == 87 || e.which == 87) { //w
        speedOfPaddle1 = -10;
    }
    if(e.keyCode == 83 || e.which == 83) { //w
        speedOfPaddle1 = 10;
    }
    if(e.keyCode == 38 || e.which == 38) { // up arrow
        speedOfPaddle2 = -10;
    }
    if(e.keyCode == 40 || e.which == 40) { // down arrow
        speedOfPaddle2 = 10;
    }
    
    // powerups -------------------------------------------------------------
    
    if(e.keyCode == 90 || e.which == 90) { // z key - player 1 double power up 
        if(playing ==1){
    doubleHeight();
        }
    }
    
    if(e.keyCode == 77 || e.which == 77) { // m key - player 2 double power up 
         if(playing ==1){
    doubleHeight2(); 
         }
    }

    if(e.keyCode == 88 || e.which == 88) { // x key - player 1 camouflages player 2
         if(playing ==1){
    camouflage();
         }
    }
    
    if(e.keyCode == 78|| e.which == 78) { // n key - player 2 camouflages player 1
        if(playing ==1){
    camouflage2();
        }
    }

});

// customize ball color ----------------------------------------------------

function colorone(){
     document.getElementById("ball").style.background = "#FFB17A";
}
function colortwo(){
     document.getElementById("ball").style.background = "#829399";
}
function colorthree(){
     document.getElementById("ball").style.background = "#A1BA89";
}


// powerups ----------------------------------------------------------------

// doubles height of paddle 1 
function doubleHeight(){
    if(leftStarNumber!=0){
    document.getElementById("paddle1").style.height = (OgPaddleHeight*2) + "px";
    paddleHeight = OgPaddleHeight*2;
    power.play();  
    leftStarNumber--;
    
    if(leftStarNumber == 2 ){
       document.getElementById("leftstars").innerHTML = "★★"
    } else if (leftStarNumber == 1){
        document.getElementById("leftstars").innerHTML = "★"
    }  else if (leftStarNumber == 0){
        document.getElementById("leftstars").innerHTML = " "
    } // doubleHeight
    
    setTimeout(originalHeight, 2000);
    }
} // doubleHeight


// doubles height of paddle 2 
function doubleHeight2(){
    
    if(rightStarNumber!=0){
    document.getElementById("paddle2").style.height = (OgPaddleHeight*2) + "px";
    paddleHeight2 = OgPaddleHeight*2;
    power.play();   
    rightStarNumber--;
        
    if(rightStarNumber == 2 ){
       document.getElementById("rightstars").innerHTML = "★★"
    } else if (rightStarNumber == 1){
        document.getElementById("rightstars").innerHTML = "★"
    }  else if (rightStarNumber == 0){
        document.getElementById("rightstars").innerHTML = " "
    }
    setTimeout(originalHeight2, 2000); 
    }
} // doubleHeight2


// player 1 camouflages paddle2
function camouflage(){
    
    if(leftStarNumber!=0){
    document.getElementById("paddle2").style.background = "#FFF5E8";
        
    leftStarNumber--;
        
    if(leftStarNumber == 2 ){
       document.getElementById("leftstars").innerHTML = "★★"
    } else if (leftStarNumber == 1){
        document.getElementById("leftstars").innerHTML = "★"
    }  else if (leftStarNumber == 0){
        document.getElementById("leftstars").innerHTML = " "
    }
    setTimeout(originalColor2, 2000); 
    }
} // camouflage2

// player 2 camouflages paddle1
function camouflage2(){
    
    if(rightStarNumber!=0){
    document.getElementById("paddle1").style.background = "#FFF5E8";
        
    rightStarNumber--;
        
    if(rightStarNumber == 2 ){
       document.getElementById("rightstars").innerHTML = "★★"
    } else if (rightStarNumber == 1){
        document.getElementById("rightstars").innerHTML = "★"
    }  else if (rightStarNumber == 0){
        document.getElementById("rightstars").innerHTML = " "
    }
    setTimeout(originalColor, 2000); 
    }
} // camouflage2

// resets powerups
function originalHeight() {
     document.getElementById("paddle1").style.height = OgPaddleHeight + "px"; 
    paddleHeight = OgPaddleHeight;
}
function originalHeight2() {
     document.getElementById("paddle2").style.height = OgPaddleHeight + "px"; 
    paddleHeight2 = OgPaddleHeight;
}

function originalColor() {
     document.getElementById("paddle1").style.background = "#36413E"; 
}
function originalColor2() {
     document.getElementById("paddle2").style.background = "#36413E"; 
}

// stop paddles -------------------------------------------------------------------------
document.addEventListener('keyup', function(e){
    
    if(e.keyCode == 87 || e.which == 87) { //w
        speedOfPaddle1 =0;
    }
    if(e.keyCode == 83 || e.which == 83) { //s
        speedOfPaddle1 = 0;
    }
     if(e.keyCode == 38 || e.which == 38) { //up arrow
        speedOfPaddle2 = 0;
    }
    if(e.keyCode == 40 || e.which == 40) { // down arrow
        speedOfPaddle2 = 0;
    }
});

// object constructor to play sounds -----------------------------------------------------------
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


// start ball movement -----------------------------------------------------------
function startBall() {
    
    let direction = 1;
    topPositionOfBall = startTopPositionOfBall;
    leftPositionOfBall = startLeftPositionOfBall;
    
    if(scoreOne==10||scoreTwo==10){
        stopGame();
    }
    // 50% chance of starting in either direction (R or L)
    
    if(Math.random() < 0.5) {
        direction = 1;
    } else {
        direction = -1;
    }
    
    if(difficulty == 1){
    topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
    leftSpeedOfBall = direction * (Math.random() * 2 + 3); 
    } else if (difficulty == 2){
    topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
    leftSpeedOfBall = direction * (Math.random() * 7 + 8); 
    } else if (difficulty == 3){
    topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
    leftSpeedOfBall = direction * (Math.random() * 11 + 15); 
    }
} // startBall

function easy(){
    difficulty = 1;
    document.getElementById("easy").style.background = "#FFB17A";
    document.getElementById("medium").style.background = "#A1BA89";
    document.getElementById("hard").style.background = "#A1BA89"; 
}
function medium(){
    difficulty = 2;
    document.getElementById("easy").style.background = "#A1BA89";
    document.getElementById("medium").style.background = "#FFB17A";
    document.getElementById("hard").style.background = "#A1BA89";
}

function hard(){
    difficulty = 3;
    document.getElementById("easy").style.background = "#A1BA89";
    document.getElementById("medium").style.background = "#A1BA89";
    document.getElementById("hard").style.background = "#FFB17A";
}

//updates location of paddles and ball -----------------------------------------------------------
function show() {
    
    // update location of elements
    positionOfPaddle1 += speedOfPaddle1;
    positionOfPaddle2 += speedOfPaddle2;
    
    topPositionOfBall += topSpeedOfBall;
    leftPositionOfBall += leftSpeedOfBall;
    
    // stop paddle from leaving top of gameboard
    if(positionOfPaddle1 <= 0) {
        positionOfPaddle1 = 0;
    }
    if(positionOfPaddle2 <= 0) {
        positionOfPaddle2 = 0;
    }
    
    // stop paddle from leaving bottom of screen
    if(positionOfPaddle1 >= gameboardHeight - paddleHeight){
        positionOfPaddle1 = gameboardHeight - paddleHeight;
    }
    if(positionOfPaddle2 >= gameboardHeight - paddleHeight2){
        positionOfPaddle2 = gameboardHeight - paddleHeight2;
    }
    
    // if ball hits top or bottom of gameboard, change direction
    if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
        topSpeedOfBall *= -1;
        
    } // if
    
    // ball on left edge of gameboard
    if(leftPositionOfBall <= paddleWidth) {
        
        // if ball hits left paddle, change direction
        if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
            bounce.play();
            leftSpeedOfBall *= -1;
        } else {
            scoreTwo++;
            score.play();
            startBall();
        } // else
        
    } // if
    
    // ball on right edge of gameboard
    if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
        
      // if ball hits right paddle, change direction
        if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight2) {
             bounce.play();
            leftSpeedOfBall *= -1;
        } else {
            scoreOne++;
            score.play();
            startBall();
        } // else  
        
    } // if
    
    document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
    document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
    document.getElementById("ball").style.top = topPositionOfBall + "px";
    document.getElementById("ball").style.left = leftPositionOfBall + "px";
    
    document.getElementById("score1").innerHTML = scoreOne;
    document.getElementById("score2").innerHTML = scoreTwo;
    
    
    
}//show

// resume gameplay -----------------------------------------------------------
function resumeGame(){
    if(!controlPlay){
        controlPlay = window.setInterval(show,1000/60);
    }
    playing = 1;
} // resume game

// pause gameplay -----------------------------------------------------------
function pauseGame(){
    playing = 0;
    window.clearInterval(controlPlay);
    controlPlay = false;
}// pausegame

// start gameplay -----------------------------------------------------------
function startGame(){
    
    // reset score, ball, & paddle
    scoreOne = 0;
    scoreTwo = 0;
    positionOfPaddle1 = startPositionOfPaddle1;
    positionOfPaddle2 = startPositionOfPaddle2;
    document.getElementById("rightstars").innerHTML = "★★★"
    document.getElementById("leftstars").innerHTML = "★★★"
    rightStarNumber = 3;
    leftStarNumber = 3;
    startBall();
    playing=1;
    if(!controlPlay){
        controlPlay = window.setInterval(show,1000/60);
    }
} // start game

// stop gameplay -----------------------------------------------------------
function stopGame(){
playing = 0;
window.clearInterval(controlPlay);
controlPlay = false;
    
// show lightox with score
let message1 = "tie game";
let message2 = "close to continue";
    
    if(scoreTwo > scoreOne){
        message1= "player two wins with " + scoreTwo + " points!"
        message2 = "player one had " + scoreOne + " points!";
    } else if (scoreOne > scoreTwo){
        message1= "player one wins with " + scoreOne + " points!"
        message2 = "player two had " + scoreTwo + " points!";
    } // else
    
    showLightBox(message1, message2);
    
} // stopGame

//--------- lightbox code ---------- //

function changeVisibility(divID){
    var element = document.getElementById(divID);
    
    // if element exists, toggle its class
    // between hidden and unhidden
    
    if(element) {
        element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
    } // if
} // changeVisibility

// display message in lightbox
function showLightBox(message,message2){
    
    // set messages
    document.getElementById("message").innerHTML = message;
    document.getElementById("message2").innerHTML = message2;
    
    // show lightbox
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
    
    // if the game is over, show controls
}

// close light box
function continueGame() {
    
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
    
} // continueGame

function continueAgain() {
    
    changeVisibility("lightbox2");
    changeVisibility("boundaryMessage2");
        changeVisibility("difficultypanel");
    
} // continueAgain

function continueAgainAgain() {
    
    changeVisibility("lightbox3");
    changeVisibility("boundaryMessage3");
    
} // continueAgainAgain


//--------- end of lightbox code ---------- //


