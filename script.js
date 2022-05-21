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
firstDivInput.addEventListener("click", function(){selectField(this)});
selectField(firstDivInput);
function selectField(input){
    let children = input.children;
    if(currentSelection !== children[1]){
    deselectOtherFields();
    currentSelection = children[1];
    }
    cursorInBetween(); 
    input.classList.add("display-border");
}
function deselectOtherFields(){
    let cursor = document.querySelector(".cursor");
    if(cursor !== null){
    currentSelection.parentElement.classList.remove("display-border");
    let parent = cursor.parentElement;
    parent.removeChild(cursor);
    }
};
//controls the cursor when it is inbetween elements
function cursorInBetween(){
    const expressionChildren = currentSelection.children;                                                                                     
    if(expressionChildren.length == 0){updateCursor();} //When the field is empty
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
    const expressionChildren = currentSelection.children;
    let firstChild = expressionChildren[0];
    firstChild.insertAdjacentHTML("beforebegin", "<span class='cursor blink'></span>");

}
function cursorToEnd(){
    let cursor = document.createElement("span");
        cursor.classList.add("cursor");
        cursor.classList.add("blink");
    currentSelection.insertAdjacentElement("beforeend", cursor);
    cursorBlink();
    let input = currentSelection.parentElement;
    input.classList.add("display-border");
}
//This is not needed. 
//As I have come to realize,
//This is just reinventing querySelector.
//But I think the mistake is hilarious so I am leaving it.
function recursiveCall(e){
    if(e.classList[0] == "cursor"){
      return e;
    }
    if(e.children.length == 0){
      return;
    }
    for(let r = 0; r< e.children.length; r++){
      let c = recursiveCall(e.children[r]);
      if(c !== undefined && c.classList[0] == "cursor"){
        return c;
      }
    }
  }
  
  function getCursor(e){
    let childrenElements = e.children;
    for(let i =0; i < childrenElements.length; i++){
      let child = childrenElements[i];
      if(child.classList[0] == "cursor")return child;
      if(child.children.length !== 0){
        let pos = recursiveCall(child);
        if(pos !== undefined)return pos;
      }
    }
  
  }
function updateCursor(pos){
    let cursor = getCursor(currentSelection);
    if(cursor !== undefined){
        let parent = cursor.parentElement;
        parent.removeChild(cursor);
        clearInterval(blinkIntervalID);
        if(parent.classList[0] == "numerator" || parent.classList[0] == "denominator")divisionGrayed(parent);
    }

      let funcBreak = false;
      //Will call a function to control cursor based on the parent element of what has been click on
      if(pos !== undefined){
          let parentNodeClass = pos.parentNode.classList[0];
          switch (parentNodeClass){
              case "abs-value-container":
                  absValueUpdateCursor(pos);
                  funcBreak = true;
                  break;
              case "division-container":
                  divisionUpdateCursor(pos);
                  funcBreak = true;
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
   else if(pos.classList[0] == "expression-container"){
    return;
 }
   else{
      pos.insertAdjacentHTML("afterend", "<span class='cursor blink'></span>");
   }
    cursorBlink();
}
//Will delete the selected field, but only if it is empty
function deleteField(){
    let empty = isFieldEmpty();
    if(empty){
        let input = currentSelection.parentElement;
        let container = input.parentElement;
        let previous = input.previousElementSibling;
        let next = input.nextElementSibling;
        //If there are no other sibling elements do nothing.
        if(previous == null && next == null)return false;
        container.removeChild(input);
        clearInterval(blinkIntervalID);
        //Selects another field now that the input field is deleted. 
        if(previous !== null){
            let children = previous.children;
            let newInput = children[1];
            currentSelection = newInput;
            cursorToEnd();
        }else if(next !== null){
            let children = next.children;
            let newInput = children[1];
            currentSelection = newInput;
            cursorToEnd();
        }
        return true;
    }
    return false;
}
let absBreak = false;
function backSpace(){
    let exit = deleteField();
    if(exit)return;
     
    let cursor = getCursor(currentSelection);
    //Nothing Selected
    if(cursor == undefined)return;
    let previous = cursor.previousElementSibling;
    if(previous !== null){
        let previousClass = previous.classList[0];
        switch(previousClass){
            case "abs-value-container":
                absValueBackspace(previous, cursor);
                break;
            default:
                break;
        }
    }
    if(absBreak == true){absBreak = false; return};
    let cursorParent = cursor.parentElement;
    let cursorParentClass = cursorParent.classList[0];
    switch(cursorParentClass){
        case "abs-middle":
                  absValueBackspace(null, cursor);
                  break;
              default:
                  break;
    }
    if(absBreak == true){absBreak = false; return};
    if(previous == null)return;
    let parent = previous.parentElement
    if(previous !== null && parent !== null) parent.removeChild(previous);
    clearInterval(blinkIntervalID);
    cursorBlink();
}
function insertAtCursor(key){
    let cursor = getCursor(currentSelection);
    //Nothing Selected
    if(cursor == undefined)return;
    cursor.insertAdjacentHTML("beforebegin", "<span class='digit'>" + key + "</span>");
    clearInterval(blinkIntervalID);
    cursorBlink();
}
body.addEventListener("keydown", function(event){
    let operationBreak = false;
    switch(event.key){
        case "|":
            absValueCreator();
            break;
        case "/":
            //divisionCreator();
            break;
        case "*":
            operationInsertAtCursor("·");
            operationBreak = true;
            break;
        case "+":
        case "-":
            operationInsertAtCursor("" + event.key);
            operationBreak = true;
            break;
        default:
            break;
    }
    if(checkUserKey(event)){
        if(event.key == "Backspace"){
            backSpace();
        }else{
            if(operationBreak == true)return;
            insertAtCursor(event.key);
        }
    }
});

body.addEventListener("click", function(){selectNone();});
function selectNone(){
    const positionGrab = Array.from(document.querySelectorAll( ":hover" ));
    let lastChild = positionGrab[positionGrab.length-1];
    if(lastChild.tagName == "BODY")deselectOtherFields();
}

//When the user presses enter and the calculations run, a new box will appear with all the functions of the starting input field
const enterButton = document.getElementById('enter-button');
enterButton.addEventListener('click', function(){
    let empty = isFieldEmpty();
    if(empty == false)
    createInputField();
});
//Return T/F, so that Enter button
//Does thing if field is empty
//Not including the cursor
function isFieldEmpty(){
    let count = currentSelection.childElementCount;
    if(count == 1)return true;
    return false;
}
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
    div.addEventListener("click", function(){selectField(this)});
    let input = currentSelection.parentElement;
    input.insertAdjacentElement("afterend", div);
    selectField(div);
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
    console.log(char);
    if(char > 31 && char < 58 || char == 8 || char == 61 || char == 173){
        return true;
    }
    return false;
}
