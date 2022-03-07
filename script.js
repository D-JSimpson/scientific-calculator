const userInputDisplayContainer = document.getElementById("user-input-display-container");
const body = document.querySelector("body");
const userInput = document.getElementById("user-input");

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
const enterButton = document.getElementById('enter-button');
enterButton.addEventListener('click', function(){
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
 userInputDisplayContainer.scrollTop = userInputDisplayContainer.scrollHeight - userInputDisplayContainer.clientHeight; //force scroldbar to the bottom
});

//Toggle class when the user enters and leaves a DARK button to create a hover effect
const darkButton = document.querySelectorAll(".dark-button");
darkButton.forEach( (db) =>{
    db.addEventListener('mouseenter', db => {
        db.target.classList.toggle("d-hover");
    });
    db.addEventListener('mouseleave', db => {
        db.target.classList.toggle("d-hover");
    });
//Toggle class when the user presses down on a button
    db.addEventListener('mousedown', db => {
        db.target.classList.toggle("d-pressed");
    });
    db.addEventListener('mouseup', db => {
        db.target.classList.toggle("d-pressed");
    });
    
});
//Toggles class even when the user leaves the area of the button
window.addEventListener("mouseup", function(){
    darkButton.forEach( (db) => {
        if(db.classList[2] == "d-pressed"){
            db.classList.toggle("d-pressed");
        }
    });
});

//Toggle class when the user enters and leaves a LIGHT button to create a hover effect
const lightButton = document.querySelectorAll(".light-button");
lightButton.forEach( (lb) =>{
    lb.addEventListener('mouseenter', lb => {
        lb.target.classList.toggle("l-hover");
    });
    lb.addEventListener('mouseleave', lb => {
        lb.target.classList.toggle("l-hover");
    });
//Toggle class when the user presses down on a button
    lb.addEventListener('mousedown', lb => {
        lb.target.classList.toggle("l-pressed");
    });
    lb.addEventListener('mouseup', lb => {
        lb.target.classList.toggle("l-pressed");
    });
    
});
//Toggles class even when the user leaves the area of the button
window.addEventListener("mouseup", function(){
    lightButton.forEach( (lb) => {
        if(lb.classList[2] == "l-pressed"){
            lb.classList.toggle("l-pressed");
        }
    });
});

//Toggle class when the user enters and leaves the BACK button to create a hover effect
const backButton = document.getElementById("back-button");
backButton.addEventListener('mouseenter', bb => {
    bb.target.classList.toggle("d-hover");
});
backButton.addEventListener('mouseleave', bb => {
    bb.target.classList.toggle("d-hover");
});
//Toggle class when the user presses down on a button
backButton.addEventListener('mousedown', bb => {
    bb.target.classList.toggle("d-pressed");
});
backButton.addEventListener('mouseup', bb => {
    bb.target.classList.toggle("d-pressed");
});
//Toggles class even when the user leaves the area of the button
window.addEventListener("mouseup", function(){
        if(backButton.classList[1] == "d-pressed"){
            backButton.classList.toggle("d-pressed");
        }
});
//Toggle class when the user enters and leaves the ENTER button to create a hover effect
enterButton.addEventListener('mouseenter', eb => {
    eb.target.classList.toggle("e-hover");
});
enterButton.addEventListener('mouseleave', eb => {
    eb.target.classList.toggle("e-hover");
});
//Toggle class when the user presses down on a button
enterButton.addEventListener('mousedown', eb => {
    eb.target.classList.toggle("e-pressed");
});
enterButton.addEventListener('mouseup', eb => {
    eb.target.classList.toggle("e-pressed");
});
//Toggles class even when the user leaves the area of the button
window.addEventListener("mouseup", function(){
        if(enterButton.classList[1] == "e-pressed"){
            enterButton.classList.toggle("e-pressed");
        }
});

//Limit the users input to just dbbers without using type = "DBber". That breaks the event listeners for the userInputField
function checkUserKey(event){
    let char = event.keyCode;
    console.log(event);
    console.log(char);
    console.log(keyCode(54));
    if(char > 31 && char < 58 || char == 8 || char == 61 || char == 173 || char == 191){
        return true;
    }
    return false;
}
