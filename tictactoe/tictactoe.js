let currentPlayer = "x";
let gameStatus = ""; // "" - continue game, "tie", "x wins", "o wins"
let numTurns = 0;

// take player turn
function playerTakeTurn(e){
    
    if(e.innerHTML == ""){
   e.innerHTML = currentPlayer; 
   checkGameStatus();
    } else {
        showLightBox("This box is already selected!", "Please select another box");
        return;
    } // else
        
    //game is over
    if(gameStatus!=""){
        showLightBox(gameStatus, "game over!");
    }
} // playerTakeTurn


//after each turn, check for winner, tie , to continue playing
function checkGameStatus(){
    numTurns++; // count turn
    
    //check win 
    if(checkWin()){
        gameStatus = currentPlayer + " wins!";
        return;
    }
    // check for tie
    if(numTurns == 9) {
        gameStatus = "Tie game!";
    } // if
    
    // switch current player
    currentPlayer = (currentPlayer == "x" ? "o":"x");
    
} // checkGameStatus

// check for a win, there are eight win paths
function checkWin(){
    let cb = []; // current board
    cb[0] = ""; //not gonna use
    cb[1] = document.getElementById("one").innerHTML;
    cb[2] = document.getElementById("two").innerHTML;
    cb[3] = document.getElementById("three").innerHTML;
    cb[4] = document.getElementById("four").innerHTML;
    cb[5] = document.getElementById("five").innerHTML;
    cb[6] = document.getElementById("six").innerHTML;
    cb[7] = document.getElementById("seven").innerHTML;
    cb[8] = document.getElementById("eight").innerHTML;
    cb[9] = document.getElementById("nine").innerHTML;
    
    // top row
    if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
        return true;
    }
     // middle row
    if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
        return true;
    }
     // top row
    if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
        return true;
    }
    
      // first column
    if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
        return true;
    }
    
      // second column
    if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
        return true;
    }
    
      // third column
    if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
        return true;
    }
    
      // '/' diagonal
    if(cb[7] != "" && cb[7] == cb[5] && cb[5] == cb[3]){
        return true;
    }
    
      // '\' diagonal
    if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
        return true;
    }
    
} // checkWin

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
}

// close light box
function continueGame() {
    
     changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
    
} // continueGame