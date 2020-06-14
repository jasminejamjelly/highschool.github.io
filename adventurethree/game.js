const levels = [	
	
	// level zero - bread
	["flag", "fenceup", "", "", "bread",
	"fenceside", "tree", "", "", "tree",
	"animate", "animate", "animate", "animate", "animate",
	"", "tree", "fenceup", "", "tree",
	"tree", "", "", "horseup","rider"],
	
	// level one - cheese
	["cheese", "water", "water", "water", "flag",
	"animate", "animate", "bridge animate", "animate", "fenceside",
	"water", "water", "bridge", "water", "",
	"bridge", "bridge", "bridge", "bridge", "bridge",
	"water", "water", "horseup", "water", "rider"],
	
	
	// level two
	["horsedown", "water", "flag", "tree", "tree",
	"", "water", "", "", "",
	"animate", "animate", "animate", "animate", "",
	"", "rock", "", "tree", "water",
	"rider", "rock", "", "", "lettuce"],
    
    
	// level three
	["tree", "fenceup", "flag", "fenceup", "tree",
	"", "", "fenceside", "", "",
	"animate", "animate", "animate", "animate", "animate",
	"", "rock", "", "", "",
	"chicken", "", "tree", "rider", "horseup"],
	
	]; // end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");	
const noPassObstacles = ["rock", "tree", "water","chicken"];

var currentLevel = 0; // starting level
var riderOn = false; // is the rider on?
var food = false; // do you have the ingredient?
var ingredient = "bread";
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;
var lives = 3;
var jump = false;
    let nextLocation = 0; // location we wish to move to
    let nextClass = ""; // class of location we wanna move to
    
    let nextLocation2 = 0;
    let nextClass2 = "";

// start game
window.addEventListener("load", function() {
	loadLevel(currentLevel);
});

// move horse
document.addEventListener("keydown",function(e) {
    if(jump==false){
    switch (e.keyCode) {
    
        case 37: // left arrow
            if(currentLocationOfHorse % widthOfBoard !== 0) {
                 tryToMove("left");
             }   
            break;
            
        case 38: // up arrow
            if(currentLocationOfHorse - widthOfBoard >= 0){
                tryToMove("up");
            }
            break;
            
        case 39: // right arrow
        if(currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
             tryToMove("right");
         }   
        break;
            
        case 40: // down arrow
            if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
                tryToMove("down");
            }
            break;
    }
    } // switch
}); // key event listener


// try to move horse
function tryToMove(direction) {
    
    // location before move
    let oldLocation = currentLocationOfHorse;
    
    // class of location before move
    let oldClassName = gridBoxes[oldLocation].className;
    let newClass = ""; // new class to switch to if move successful
    
    switch(direction) {
        case "left":
            nextLocation = currentLocationOfHorse - 1;
             nextClass = gridBoxes[nextLocation].className;
             if (nextClass.includes("fenceside")) {return;}
            break;
            
        case "right":
            nextLocation = currentLocationOfHorse + 1;
             nextClass = gridBoxes[nextLocation].className;
            
            if (nextClass.includes("fenceside")) {return;}
            break;
            
        case "up":
            nextLocation = currentLocationOfHorse - widthOfBoard;
            nextClass = gridBoxes[nextLocation].className;
          
            if (nextClass.includes("fenceup")) {return;}
            break;
            
        case "down":
            nextLocation = currentLocationOfHorse + widthOfBoard;
            nextClass = gridBoxes[nextLocation].className;
            
            if (nextClass.includes("fenceup")) {return;}
            break;      
            
    } // switch
    
    nextClass = gridBoxes[nextLocation].className;
    
    // if the obstacle is not passable, don't move
    if (noPassObstacles.includes(nextClass)) {return;}
    
    // if it's a fence, and there's no dog, don't move
    if (!riderOn && nextClass.includes("fence")) {return;}
    
      // if it's a flag, and there's no dog, don't move
    if ((!riderOn || !food) && nextClass.includes("flag")) {return;}
    
    // if there is a fence, move two spaces with animation
    if (nextClass.includes("fence")) {
        // rider must be on to jump
        if(riderOn){
            gridBoxes[currentLocationOfHorse].className = "";
            oldClassName = gridBoxes[nextLocation].className;
            
            // set values according to direction
            if (direction == "left") {
                nextClass = "jumpleft";
                nextClass2 = "horserideleft";
                nextLocation2 = nextLocation - 1;
                nextClassFence = gridBoxes[nextLocation2].className;
              
            } else if (direction == "right") {
                nextClass = "jumpright";
                nextClass2 = "horserideright";
                nextLocation2 = nextLocation + 1;
                nextClassFence = gridBoxes[nextLocation2].className;
            } else if (direction == "up"){
                nextClass = "jumpup";
                nextClass2 = "horserideup";
                nextLocation2 = nextLocation - widthOfBoard;
                nextClassFence = gridBoxes[nextLocation2].className;
            } else if (direction == "down"){
                nextClass = "jumpdown";
                nextClass2 = "horseridedown";
                nextLocation2 = nextLocation + widthOfBoard;
                nextClassFence = gridBoxes[nextLocation2].className;
            }
            
              if((nextClassFence.includes("rock")||nextClassFence.includes("tree")||nextClassFence.includes("water"))||nextClassFence.includes("flag")&&(!food||!riderOn)){
                  gridBoxes[currentLocationOfHorse].className = nextClass2;
                  return;} else {
            
            // show horse jumping
            gridBoxes[nextLocation].className = nextClass;
            
            setTimeout(function() {
                jump = true;
                // set jump back to just a fence
                gridBoxes[nextLocation].className = oldClassName;
                
                // update current location of horse to be two spaces past take off
                currentLocationOfHorse = nextLocation2;
                
                // get class of box after jump
                nextClass = gridBoxes[currentLocationOfHorse].className;
                
                // show horse and rider after landing
                gridBoxes[currentLocationOfHorse].className = nextClass2;
                
                // if next box is a flag, go up a level
                jump = false;
                levelUp(nextClass);
                
            }, 350);
            
            return;
              }
        } // if riderOn
        
    } // if class has fence
    
    
    // if there's a rider, add rider
    if (nextClass == "rider") {
        riderOn = true;
    }
    
    if (nextClass == ingredient){
        food = true;
         changeVisibility(ingredient); 
    }
   
    // if there's a bridge in the old location keep it
     if (oldClassName.includes("bridge")) {
        gridBoxes[oldLocation].className = "bridge";
    } else {
        gridBoxes[oldLocation].className = "";
    } // else 
    
    // build name of new class
    newClass = (riderOn) ? "horseride" : "horse";
    newClass += direction;
    
    // if there's a bridge in the next location, keep it
    if (gridBoxes[nextLocation].classList.contains("bridge")) {
        newClass += " bridge";
    }
    
    // move one space
    currentLocationOfHorse = nextLocation;
    gridBoxes[currentLocationOfHorse].className = newClass;
    
    // if there's an enemy, end the game
    if (nextClass.includes("enemy")) {
        loseLife();
    }
    
   
    // move up to next level if needed
    levelUp(nextClass);

    
} // tryToMove

function egg(){
    if(currentLevel==3){
        gridBoxes[20].className="egg";
     
    }
}

// move up a level
function levelUp(nextClass) {
    if(nextClass == "flag" && riderOn && food) {   
        currentLevel++;
        if(currentLevel==4){
                win();
            }else{
        document.getElementById("levelup").style.display = "block";
        clearTimeout(currentAnimation);
        setTimeout(function(){
            document.getElementById("levelup").style.display = "none";     
            loadLevel(currentLevel);
        }, 1000);
            }
    }
} // levelUp

// load levels 0 - max level
function loadLevel(c){
	let levelMap = levels[c];
	let animateBoxes;
	riderOn = false;
	food = false;
	// load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
	if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
	} // for
	
	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0, "right");
    
    // what ingredient??
if(currentLevel==0){
     document.getElementById("character").src="images/brock.png";
      document.getElementById("story").innerHTML = "Welcome to bread grove! <br><br> Our trees here grow only the finest bread! I heard that theres a single loaf here that's pillowy soft, but has the most robust crust in all the land! Are you bready? Lets roll!";
} else if(currentLevel == 1){
    ingredient = "cheese";
    document.getElementById("character").src="images/boss.png";
      document.getElementById("story").innerHTML = "Welcome to the river maze! <br><br> Well, it really isn't much of a maze since jasmine didn't want to resize all her images just to add some more grid boxes... But see that giant cheese in the corner? That's the meltiest cheese in all the land! Have a gouda time! ";
    
} else if (currentLevel == 2){
    document.getElementById("character").src="images/man.png";
     ingredient = "lettuce";
    document.getElementById("story").innerHTML = "Welcome to my lettuce farm. We have the crunchiest and freshest leaves you'll ever find. It's really not a very interesting vegetable... I'm pretty tired of eating it. Maybe if you took my last head of lettuce, I won't have to eat it today...";
} else if (currentLevel ==3){
    document.getElementById("character").src="images/teamrocket.png";
    ingredient = "egg";
    document.getElementById("story").innerHTML = "There aren't any eggs here. Go home kid. ";
}
    
} // loadLevel

// animate enemy left to right (could add up and down)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy (boxes, index, direction) {
	
	// exit function if no animation
	if (boxes.length <= 0) { return; }
	
	// update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else {
		boxes[index].classList.add("enemyleft");
	}
   
    
          if ((boxes[index].classList.contains('horseup'))||(boxes[index].classList.contains('horsedown'))||   (boxes[index].classList.contains('horseleft'))|| (boxes[index].classList.contains('horseright')) | (boxes[index].classList.contains('horserideright'))| (boxes[index].classList.contains('horserideleft'))| (boxes[index].classList.contains('horserideup'))| (boxes[index].classList.contains('horseridedown'))) {loseLife();}
    
	// remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if (i != index){
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
		} 
	} // for

	// moving right
	if (direction == "right") {
		// turn around if hit right side
		if (index == boxes.length - 1){
			index--;
			direction = "left";
		} else {
			index++;
		}
		
		// moving right
		} else {
			// turn around if hit left side
			if (index == 0) {
				index++;
				direction = "right";
			} else {
				index --;
			}
		} // else

		
	currentAnimation = setTimeout (function() {
		animateEnemy(boxes, index, direction)
	}, 750);
} // animateEnemy

//--------- lightbox code ---------- //

function changeVisibility(divID){
    var element = document.getElementById(divID);
    
    // if element exists, toggle its class
    // between hidden and unhidden
    
    if(element) {
        element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
    } // if
} // changeVisibility

function start() {
    changeVisibility("start"); 
    changeVisibility("lives");
    changeVisibility("story");
    changeVisibility("character");
} // start

 function restart() {
     document.getElementById("end").className = 'hidden';
     document.getElementById("win").className = 'hidden';
     clearTimeout(currentAnimation);
     lives = 3;
        ingredient = "bread";
    document.getElementById("lives").innerHTML = "Lives <br> ❤ ❤ ❤";
     currentLevel = 0;
     document.getElementById("character").src="images/brock.png";
        document.getElementById("character").className = 'unhidden';
      document.getElementById("story").className = 'unhidden';
      
     
      document.getElementById("bread").className = 'hidden';
     document.getElementById("egg").className = 'hidden';
     document.getElementById("lettuce").className = 'hidden';
     document.getElementById("cheese").className = 'hidden';
     
     loadLevel(0);
} // restart 

function end() {
    
    changeVisibility("end");
    changeVisibility("story");
    changeVisibility("character");
} // end

function win() {
    
    changeVisibility("win");
    changeVisibility("story");
    changeVisibility("character");
    
} // win

function loseLife() {
            lives--;    
        
         if(lives==2){
             document.getElementById("lives").innerHTML = "Lives <br> ❤ ❤";
        }else if(lives == 1){
                document.getElementById("lives").innerHTML = "Lives <br> ❤";
        } else if (lives == 0){
        end();
        return;
        }
   
    loadLevel(currentLevel);
      clearTimeout(currentAnimation);
}