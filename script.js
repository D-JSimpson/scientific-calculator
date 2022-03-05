const userInputDisplayContainer = document.getElementById("user-input-display-container");

const userInputField = document.getElementById('first-input');
userInputField.addEventListener('keyup', e => {
    let currentPosition = e.target.selectionStart;
 console.log("the cursor is at: ", currentPosition);
});
userInputField.addEventListener('click', e => {
    let currentPosition = e.target.selectionStart;
    console.log("the cursor is at: ", currentPosition);
});
userInputField.onkeydown = function(event){return checkUserKey(event)};

//placeholder button for enter. When the user presses enter and the calculations run, a new box will appear with all the functions of the starting input field
const btn = document.getElementById('enter-button');
btn.addEventListener('click', function(){
let userInputField = document.createElement('input');

 userInputField.classList.add("user-input-display");

 userInputField.addEventListener('keyup', e => {
    let currentPosition = e.target.selectionStart;
 console.log("the cursor is at: ", currentPosition);
});

userInputField.addEventListener('click', e => {
    let currentPosition = e.target.selectionStart;
    console.log("the cursor is at: ", currentPosition);
});

 userInputField.onkeydown = function(event){return checkUserKey(event)};

 userInputDisplayContainer.appendChild(userInputField);
 userInputDisplayContainer.scrollTop = userInputDisplayContainer.scrollHeight - userInputDisplayContainer.clientHeight; //force scrollbar to the bottom
});

//Limit the users input to just numbers without using type = "Number". That breaks the event listeners for the userInputField
function checkUserKey(event){
    let char = event.keyCode;
    if(char > 31 && char < 58 || char == 8 || char == 61 || char == 173 || char == 191){
        return true;
    }
    return false;
}