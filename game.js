// the maps for the game: 2 = player, 1 = wall, 0 = empty, 3 = player
var map = [
    [2, 0, 1],
    [0, 1, 1],
    [0, 0, 3]
];

var map1 = [
    [2, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 3]
];

var bigMap = [
    [2, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 3]
]

var maps = [map, map1, bigMap];
var currentIndex = 0;
var currentMap = initLvl(currentIndex);

var toh;

// This will be our loaded map
// var currentLevel = map;
// renderMap(currentLevel);

// var player = findPlayerOnPosition(currentLevel);

var player = findPlayerOnPosition(currentMap);
var message = document.querySelector("h1");
var currentInstruction = 0;

function setMessage(text) {
    message.style.display = "block";
    message.innerHTML = text;
}

// global variable that stores the programming instructions
var instructions = [];

// get all buttons instances and attach click event
var allButtons = document.querySelectorAll("button");
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", onButtonClick);
}

// subscribing to the custom event onPlayerMove

document.addEventListener("moveMade", onPlayerMove);

document.addEventListener("keydown", onKeyboardClick);
function onKeyboardClick(event) {
    // console.log(event);
    switch (event.keyCode) {
        // arrow right
        case 39:
            var button = document.querySelector("#right");
            break; 
        case 37:
            var button = document.querySelector("#left");
            break;
        case 38:
            var button = document.querySelector("#up");
            break;
        case 40:
            var button = document.querySelector("#down");
            break;
        case 13:
            var button = document.querySelector("#play");
            break;                
    }
    if (button) {
        button.click();
    }
    event.preventDefault();
}

// document.addEventListener("moveMade", console.log);

// document.addEventListener("moveMade", function() { onPlayerMove(); });
// document.addEventListener("moveMade", function() { onPlayerMove(); });

// button click event handler
// add the selected instructions to the instructions list
// render instructions on the screen 
function onButtonClick(event) {
    var buttonText = event.target.innerHTML;
    // console.log(buttonText);
    if (buttonText == "Start") {
        // start();
        setTimeout(playMove, 300);
    }
    instructions.push(buttonText);
    var instructionsSection = document.querySelector(".instructions");
    var span = document.createElement("span");
    span.innerHTML = buttonText;
    instructionsSection.appendChild(span);
    // console.log(instructions);
}

// console.log(allButtons);

function renderMap(map) {

    // calculate proper width/height of the game field 
    // formula == (div_width + 2*div_border + 2*div_margin) * div_count 
    var maxLength = 0;

    for (var i = 0; i < map.length; i++) {
        if (maxLength < map[i].length) {
            maxLength = map[i].length;
        }
    }

    if (maxLength === 0) {
        return alert("Invalid map definition");
    }

    var mainWidth = (50 + 2 * 4 + 2 * 10) * maxLength;

    const mainEl = document.querySelector('main');
    mainEl.innerHTML = "";
    mainEl.style.width = mainWidth + "px";

    // loop through the map
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            // create div elements with proper classname
            var div = document.createElement('div');
            var className = "";
            switch (map[i][j]) {
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
            if (className) {
                // set a class name to the current div
                div.setAttribute('class', className);
            }
            // append div element to DOM tree
            mainEl.appendChild(div);
        }
    }
}

// function showMessage(message) {
//     var heading = document.querySelector('h1');
//     heading.innerHTML = message;
//     heading.style.display = "block";
// }

// function hideMessage() {
//     var heading = document.querySelector('h1');
//     heading.style.display = "none";
// }

function findPlayerOnPosition(map) {

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] === 2) {
                return {
                    x: i,
                    y: j
                };
            }
        }
    }

}

// sets wait time for the playMove function
function start(time) {
    setTimeout(playMove, time);
}

function playMove() {

    var oldPosition = {
        x: player.x,
        y: player.y
    };

    // reading the next instruction from the instructions array
    var instruction = instructions[currentInstruction];
    var section = document.querySelector(".instructions");
    if (section != null) {
        section.children[currentInstruction].setAttribute("class", "executed");
    }
    currentInstruction++;
    console.log(section.children);

    if (instruction === undefined) {
        setMessage("Game over !");
    }

    // update the map matrix
    // console.log(player);
    // console.log(instruction);
    switch (instruction) {
        case "Left":
            player.x -= 1;
            // console.log("debug");
            break;
        case "Right":
            player.x += 1;
            break;
        case "Down":
            player.y += 1;
            break;
        case "Up":
            player.y -= 1;
            break;
        default:
            break;
    }
    // check if the move is valid
    try {
        if (currentMap[player.y][player.x] === 0) {
            currentMap[oldPosition.y][oldPosition.x] = 0;
            currentMap[player.y][player.x] = 2;
            var event = new CustomEvent("moveMade", {
                detail: {
                    player: player
                }
            });
            toh = setTimeout(playMove, 300);         
            document.dispatchEvent(event);
            // start(500);
        } else if (currentMap[player.y][player.x] === 3) {
            setMessage("You win!");
            currentMap[oldPosition.y][oldPosition.x] = 0;
            currentMap[player.y][player.x] = 2;
            currentIndex++;
            if (currentIndex < maps.length) {
                setTimeout(function () {
                    currentMap = initLvl(currentIndex);
                }, 1000);
            } else {
                setMessage("The game has been completed !");
            }
        } else {
            setMessage("Game over!");
        }
    } catch {
        setMessage("Game over!");
    }

    // render the updated map array
    renderMap(currentMap);
}

function initLvl(lvlIndex) {

    var map = JSON.parse(JSON.stringify(maps[lvlIndex]));
    // var map = maps[lvlIndex];
    renderMap(map);
    // if (lvlIndex % 2 === 0) {
    //     document.addEventListener("moveMade", onPlayerMove);
    // } else {
    //     document.removeEventListener("moveMade", onPlayerMove);
    // }
    player = findPlayerOnPosition(map);
    document.querySelector("h1").style.display = "none";
    instructions = [];
    currentInstruction = 0;
    document.querySelector(".instructions").innerHTML = "";
    // console.log("Debugg");
    return map;

}

function onPlayerMove(e) {

    // console.log("debugg");
    var points = document.querySelector(".points");
    points.innerText--;
    if (points.innerText < 0) {
        clearTimeout(toh);
        setMessage("Game over!");  
    }
    console.log(points);

}