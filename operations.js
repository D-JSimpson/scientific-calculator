//Intended Functionality
//--------------------
//The division operator loops through its parent element
//Does not stop until it hits an operation or reaches the end of the parent element
//Puts all of the looped through elements on top, moves cursor to bottom.
const divButton = document.getElementById("division");
divButton.addEventListener("click", function(){divisionCreator();});

function divisionCreator(){
    let divisionContainer = document.createElement("span");
        divisionContainer.classList.add("division-container");
    let numerator = document.createElement("span");
        numerator.classList.add("numerator");
        numerator.classList.add("division-grayed");
    let denominator = document.createElement("span");
        denominator.classList.add("denominator");
        denominator.classList.add("division-grayed");
    divisionContainer.appendChild(numerator);
    divisionContainer.appendChild(denominator);
    const cursor = document.querySelector(".cursor");
    if(cursor !== null){
        let parent = cursor.parentElement;
        cursor.insertAdjacentElement("afterend", divisionContainer);
        parent.removeChild(cursor);
        clearInterval(blinkIntervalID);
        divisionUpdateCursor(divisionContainer.children[0]);
    }
}
function operationInsertAtCursor(operator){
    let cursor = getCursor(currentSelection);
    //Nothing Selected
    if(cursor == undefined)return;
    cursor.insertAdjacentHTML("beforebegin", "<span class='operator'>" + operator + "</span>");
    clearInterval(blinkIntervalID);
    cursorBlink();
}
//Only if empty
function divisionUpdateCursor(pos){
    if(pos.classList[0] == "numerator" || pos.classList[0] == "denominator"){
        pos.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        pos.classList.remove("division-grayed");
        cursorBlink();
    }
}
function divisionGrayed(pos){
    if(pos.childElementCount == 0)
    pos.classList.add("division-grayed");
}