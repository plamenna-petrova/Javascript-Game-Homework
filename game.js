// global variable that stores the programming instructions
var instructions = [];

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

renderMap(map);