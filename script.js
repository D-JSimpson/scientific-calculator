const userInputDisplayContainer = document.getElementById("user-input-display-container");
const body = document.querySelector("body");
const userInput = document.getElementById("user-input");

let currentSelection;
let blinkIntervalID;
const firstDivInput = document.getElementById("first-div-input");
let textArea = document.getElementById("text-area");
const epressionContainer = document.getElementById("expression-container");
let keepCursorPosition = false;


firstDivInput.addEventListener("mouseenter", function(){this.style.cursor="text"}); //To let user know they can click
firstDivInput.addEventListener("click", function(){
    let children = this.childNodes;
    currentSelection = children[3];
    deselectOtherFields();
    cursorInBetween(); 
    firstDivInput.classList.add("display-border");
    
    
});
function deselectOtherFields(){
    let displayChildren = [];
    let dCPH = Array.from(userInputDisplayContainer.childNodes);
    dCPH.forEach( (e) =>{
        if(e.tagName == "DIV"){
            displayChildren.push(e);
        }
    });
    let divInputChildren = [];
    displayChildren.forEach( (e) =>{
        let dIPH = [];
        e.childNodes.forEach( (q) =>{
            if(q.tagName == "SPAN"){
                dIPH.push(q);
            }
        });
        dIPH.forEach( (el) => {
            if(el.classList[0] == "expression-container" && el !== currentSelection){ 
                divInputChildren.push(el);
            }
        });
    });
    
    divInputChildren.forEach( (e) =>{
        e.parentNode.classList.remove("display-border");
        let children = e.childNodes;
        children.forEach( (el) =>{
            if(el.classList[0] == "cursor"){
                e.removeChild(el);
            }
        });
    });
};

//controls the cursor when it is inbetween elements
function cursorInBetween(){
    const expressionChildren = currentSelection.childNodes;                                                                                          
    if(expressionChildren.length == 1){updateCursor();} //When the field is empty
    else{
        let place = getPositionElement();
            updateCursor(place);
        
    }
}

//gets the element the user is hovering over and returns that element
function getPositionElement(){
    const positionGrab = Array.from(document.querySelectorAll( ":hover" ));
    console.log(positionGrab);
    const expressionChildren = currentSelection.childNodes;
    let lastChildIndex=expressionChildren.length - 1;
    const lastChild = expressionChildren[lastChildIndex];
    let pos = positionGrab.length - 1;
    const place = positionGrab[pos];
    if(place == lastChild){
        keepCursorPosition = false;
    } else{keepCursorPosition = true;}
    if(pos !== 4)return place;
    

}
function cursorBlink(){
    const cursor = document.querySelector(".cursor");
    if(cursor.classList[1] !== "blink")cursor.classList.toggle("blink");
    blinkIntervalID = setInterval(cursorBlinkTime, 1000, cursor);
}
function cursorBlinkTime(c){
    
    setTimeout( () =>{c.classList.toggle("blink")}, 500);
}
function cursorToStart(){
    const expressionChildren = currentSelection.childNodes;
    let firstChild = expressionChildren[0];
    firstChild.insertAdjacentHTML("beforebegin", "<span class='cursor blink'></span>");

}
let removeFluff = true;
function updateCursor(pos){
    const expressionChildren = currentSelection.childNodes;
    if(removeFluff == true)
    {
        expressionChildren[0].remove();
        removeFluff = false;
    }
    
     expressionChildren.forEach( (exp)=>{
          if(exp.classList[0] == "cursor"){
              currentSelection.removeChild(exp);
          }
        switch (exp.classList[0]){
            case "abs-value-container":
                absValueRemoveCursor(exp);
                break;
            default:
                break;
         }
      });
      let funcBreak = false;
      //Will call a function to control cursor based on the parent element of what has been click on
      if(pos !== undefined){
          let parentNodeClass = pos.parentNode.classList[0];
          switch (parentNodeClass){
              case "abs-value-container":
                  absValueUpdateCursor(pos);
                  funcBreak = true;
                  break;
              default:
                  break;
          }
      }
      if(funcBreak == true)return;
   if(pos == undefined){
    currentSelection.innerHTML += "<span class='cursor blink'></span>";
   }else if(pos.classList[0]  == "span-input"){
        cursorToStart();
   }
   else{
      pos.insertAdjacentHTML("afterend", "<span class='cursor blink'></span>");
   }
    cursorBlink();
}
function backSpace(){
    const expressionChildren = currentSelection.childNodes;
    let index;
    expressionChildren.forEach( (exp, ind)=>{
        let nodeClass = exp.classList[0];
        
        if(nodeClass == "cursor"){
            index = ind-1;
        }
        switch (nodeClass){
              case "abs-value-container":
                  absValueBackspace(exp);
                  break;
              default:
                  break;
        }
       
    });
    let exp = expressionChildren[index];
    if(index >= 0) currentSelection.removeChild(exp);
    clearInterval(blinkIntervalID);
    cursorBlink();
}
function insertAtCursor(key){
    const expressionChildren = Array.from(currentSelection.childNodes);
    console.log(expressionChildren);
    
    for(i=0; i< expressionChildren.length; i++){
        let exp = expressionChildren[i];
        console.log(exp.classList[0]);
        if(exp.classList[0] !== "digit" && exp.classList[0] !== "cursor"){absValueCursorCheck(exp, key);}
        if(exp.classList[0] == "cursor"){
            exp.insertAdjacentHTML("beforebegin", "<span class='digit'>" + key + "</span>");
            break;
        }
    }
    clearInterval(blinkIntervalID);
    cursorBlink();
}
body.addEventListener("keydown", function(event){
    
    if(checkUserKey(event)){
        if(event.key == "Backspace"){
            backSpace();
        }else{
            insertAtCursor(event.key);
            if(keepCursorPosition == false)
            {
            updateCursor();
            }
        }
    }
});


//the display field will track the users position with the field
// const userInputField = document.getElementById('first-input');
// let currentInputField;
// userInputField.addEventListener('keyup', e => {
//     let currentPosition = e.target.selectionStart;
//  console.log("the cursor is at: ", currentPosition);
// });
// userInputField.addEventListener('click', e => {
//     let currentPosition = e.target.selectionStart;
//     console.log("the cursor is at: ", currentPosition);
// });
// userInputField.addEventListener("focusin", e =>{
//     currentInputField = e.target;
// });
// userInputField.addEventListener("focusout", e =>{
//     currentInputField = undefined;
// });
// userInputField.onkeydown = function(event){return checkUserKey(event)};

//When the user presses enter and the calculations run, a new box will appear with all the functions of the starting input field
const enterButton = document.getElementById('enter-button');
enterButton.addEventListener('click', function(){createInputField();});
function createInputField(){
    let div = document.createElement("div");
    div.addEventListener("mouseenter", function(){this.style.cursor="text"}); //To let user know they can click
    div.classList.add("div-input-too");
    let startSpan = document.createElement("span");
    startSpan.innerHTML = "<textarea style='border: none' id='text-area'></textarea>";
    startSpan.classList.add("span-input");
    let expressionSpan = document.createElement("span");
    expressionSpan.classList.add("expression-container");
    div.classList.add("user-input-display");
    div.appendChild(startSpan);
    div.appendChild(expressionSpan);
    div.addEventListener("click", function(){
        let children = this.childNodes;
        currentSelection = children[1];
        deselectOtherFields();
        cursorInBetween(); 
        div.classList.add("display-border")
    });
    userInputDisplayContainer.appendChild(div);
    userInputDisplayContainer.scrollTop = userInputDisplayContainer.scrollHeight - userInputDisplayContainer.clientHeight; //force scroldbar to the bottom
}

//** Start of hover and press effects **//

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
//** End of hover and press effects **//

//Limit the users input to just numbers and some other things
function checkUserKey(event){
    let char = event.keyCode;
    if(char > 31 && char < 58 || char == 8 || char == 61 || char == 173 || char == 191){
        return true;
    }
    return false;
}
