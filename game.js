// global variable that stores the programming instructions
var instructions = [];

var currentInstruction = 0;

var map = [
    [2, 0, 1],
    [0, 1, 1],
    [0, 0, 3]
];

var map1 = [
    [2, 0, 1, 1],
    [0, 1, 1, 1],
    [0, 0, 3]
];

var bigMap = [
    [2, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 3]
]

// This will be our loaded map
var currentLevel = map;
renderMap(currentLevel);

let player = findPlayerOnPosition(currentLevel);

// get all buttons instances and attach click event
var allButtons = document.querySelectorAll("button");
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", onButtonClick);
}

// button click event handler
// add the selected instructions to the instructions list
// render instructions on the screen 
function onButtonClick(event) {
    var buttonText = event.target.innerHTML;
    console.log(buttonText);
    instructions.push(buttonText);
    var instructionsSection = document.querySelector(".instructions");
    var span = document.createElement("span");
    span.innerHTML = buttonText;
    instructionsSection.appendChild(span);
    console.log(instructions);
}

console.log(allButtons);

function renderMap(map) {

    // calculate proper width/height of the game field 
    // formula == (div_width + 2*div_border + 2*div_margin) * div_count 
    let maxLength = 0;

    for (let i = 0; i < map.length; i++) {
        if (maxLength < map[i].length) {
            maxLength = map[i].length;
        }
    }

    if (maxLength === 0) {
        return alert("Invalid map definition");
    }

    let mainWidth = (120+2*4+2*10)*maxLength;   

    const mainEl = document.querySelector('main');
    mainEl.innerHTML = "";
    mainEl.style.width = mainWidth+"px";    

    // loop through the map
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            // create div elements with proper classname
            let div = document.createElement('div');
            let className = "";
            switch(map[i][j]) {
                case 1:
                    className = "wall";
                    break;
                case 2:
                    className = "player";
                    break;
                case 3:
                    className = "exit";
                    break;        
            }
            if(className) {
                // set a class name to the current div
               div.setAttribute('class', className); 
            }
            // append div element to DOM tree
            mainEl.appendChild(div);
        }
    }
}

function showMessage(message) {
    var heading = document.querySelector('h1');
    heading.innerHTML = message;
    heading.style.display = "block";
}

function hideMessage() {
    var heading = document.querySelector('h1');
    heading.style.display = "none";
}

function findPlayerOnPosition(map) {
    
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] === 2) {
               return {x: i, y: j};
            }
        }
    }

}

function playMove() {

    let oldPosition = {
        x: player.x,
        y: player.y
    };

    // reading the next instruction from the instructions array
    let instruction = instructions[currentInstruction];
    currentInstruction++;
    // console.log(instruction);

    if (instruction === undefined) {
        showMessage("Game over !");
    }

    // update the map matrix
    console.log(player);
    console.log(instruction);
    switch(instruction) {
        case "Left":
            player.x-=1;
            console.log("debug");
            break;
        case "Right":
            player.x+=1;
            break;
        case "Down":
            player.y+=1;
            break;
        case "Up":
            player.y-=1;
            break;
        case "Start":
            showMessage("Game over!");
            break;                
    }
    // check if the move is valid
    try {
        if (currentLevel[player.y][player.x] === 0) {
            currentLevel[oldPosition.y][oldPosition.x] = 0;
            currentLevel[player.y][player.x] = 2;
        } else if (map[player.y][player.x] === 3){
            showMessage("You win!");
            currentLevel[oldPosition.y][oldPosition.x] = 0;
            currentLevel[player.y][player.x] = 2;
        } else if (map[player.y][player.x] === 1) {
            showMessage("Game over!");
            currentLevel[oldPosition.y][oldPosition.x] = 0;
            currentLevel[player.y][player.x] = 2;
        } else {
            showMessage("Game over!");
        }
    } catch {
        showMessage("Game over!");  
    }

    console.log(player);
    
    // render the updated map array
    renderMap(map);
}

renderMap(map);