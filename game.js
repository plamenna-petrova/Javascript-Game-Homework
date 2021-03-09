// global variable that stores the programming instructions
var instructions = []; 

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


