let currentPlayer = "x";
let gameStatus = ""; // "" - continue game, "tie", "x wins", "o wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

// reset board and all variables
function newGame() {
    
    // reset board
    for (var i = 0; i < idNames.length; i++) {
        document.getElementById(idNames[i]).innerHTML = "";
    } // for
    
    numTurns = 0;
    gameStatus = "";
    currentPlayer = "x";
    
    changeVisibility("controls");
    
} // newGame


// chooses box for computer to play
function computerTakeTurn(){
  
    let idName = "";
    let p = "o"; // player that the computer is focusing on.
                //first it focuses on itself to see if it
                //can win, and if not, it tries to block the player.
    
    // array of boxes
    let b = []; // board
    b[1] = document.getElementById(idNames[0]).innerHTML;
    b[2] = document.getElementById(idNames[1]).innerHTML;
    b[3] = document.getElementById(idNames[2]).innerHTML;
    b[4] = document.getElementById(idNames[3]).innerHTML;
    b[5] = document.getElementById(idNames[4]).innerHTML;
    b[6] = document.getElementById(idNames[5]).innerHTML;
    b[7] = document.getElementById(idNames[6]).innerHTML;
    b[8] = document.getElementById(idNames[7]).innerHTML;
    b[9] = document.getElementById(idNames[8]).innerHTML;
       
    // choose random boxes until empty box is found
    loop1:
    do {
        
        //prevents user from using the guaranteed win trick
        if(b[5] == ""){
               document.getElementById(idNames[4]).innerHTML = currentPlayer;
                break;
            } // if
        
        for(var i=0;i<2;i++){
            
        // when to play box one
       if((b[2]==p && b[2]==b[3]) || (b[4]==p && b[4]==b[7]) || (b[5]==p && b[5]==b[9])){
            // fill box if available 
            if(b[1] == ""){
                document.getElementById(idNames[0]).innerHTML = currentPlayer;
                break loop1;
            } 
            } // if 1 - verified
       
        // when to play box two
       if((b[1]==p && b[1]==b[3]) || (b[5]==p && b[5]==b[8])){
            // fill box if available
            if(b[2] == ""){
                document.getElementById(idNames[1]).innerHTML = currentPlayer;
                break loop1;
            } 
            } // if 2 - verified
           
        // when to play box 3
       if((b[1]==p && b[1]==b[2]) ||(b[5]==p && b[5]==b[7]) ||(b[6]==p && b[6]==b[9])){
           // fill box if available
            if(document.getElementById(idNames[2]).innerHTML == ""){
                document.getElementById(idNames[2]).innerHTML = currentPlayer;
                break loop1;
            } 
       } // if 3 - verified
        
         // when to block box 4
       if((b[1]==p && b[1]==b[7]) || (b[5]==p && b[5]==b[6])){
           // fill box if available
            if(b[4] == ""){
                document.getElementById(idNames[3]).innerHTML = currentPlayer;
                break loop1;
            } 
            } // if 4 - verified
        
        //code for when to play box five aren't required because the computer 
        // will always fill box five on its first turn if its empty
        
         // when to play box 6
       if((b[3]==p && b[3]==b[9]) || (b[4]==p && b[4]==b[5])){
            if(b[6] == ""){
                document.getElementById(idNames[5]).innerHTML = currentPlayer;
                break loop1;
            }
       } // if 6 
        
        // when to play box 7
       if((b[3]==p && b[3]==b[5]) || (b[1]==p && b[1]==b[4]) || (b[8]==p && b[8]==b[9])){
            // fill box if available 
            if(b[7] == ""){
                document.getElementById(idNames[6]).innerHTML = currentPlayer;
                break loop1;
            } 
       } // if 7 
        
        // when to play box 8
       if((b[2]==p && b[2]==b[5]) || (b[7]==p!="" && b[7]==b[9])){
           // fill box if available
            if(b[8] == ""){
                document.getElementById(idNames[7]).innerHTML = currentPlayer;
                break loop1;
            } 
       } // if 8 
        
        // when to play box 9
       if((b[3]==p && b[3]==b[6]) || (b[1]==p && b[1]==b[5]) || (b[7]==p && b[7]==b[8])){
           // fill box if available
            if(b[9] == ""){
                document.getElementById(idNames[8]).innerHTML = currentPlayer;
                break loop1;
            } 
       } // if 9 
            
            // change focus of computer to blocking x
            p = "x";
            
        } // for
        
        // choose random box 
        let rand = parseInt(Math.random()*9) + 1; // 1-9
        idName = idNames[rand-1];
        
        // check if chosen box is empty
        if(document.getElementById(idName).innerHTML == ""){
            document.getElementById(idName).innerHTML = currentPlayer;
            break;
        } // if
        
    } while(true);
    
} // computerTakeTurn

// take player turn
function playerTakeTurn(e){
    
    if(e.innerHTML == ""){
        e.innerHTML = currentPlayer; 
        checkGameStatus();
            if(gameStatus!=""){
            setTimeout(function(){showLightBox(gameStatus, "game over!");}, 500);
        } 

        // if came is not over, computer goes
        if(gameStatus == ""){
            setTimeout(function() {
            computerTakeTurn();
            checkGameStatus();
                    
        if(gameStatus!=""){
            setTimeout(function(){showLightBox(gameStatus, "game over!");}, 500);
        } // if
        }, 500); //setTimeout
    } // if
        
    } else {
        showLightBox("This box is already selected!", "Please select another box");
        return;
    } // else
        
} // playerTakeTurn


//after each turn, check for winner, tie, or to continue playing
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
    
    // if the game is over, show controls
}

// close light box
function continueGame() {
    
    changeVisibility("lightbox");
    changeVisibility("boundaryMessage");
    
    // if game is over, show controls
    if (gameStatus !=""){
        changeVisibility("controls");
    }
    
} // continueGame