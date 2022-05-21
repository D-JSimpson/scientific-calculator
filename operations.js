const fractionButton = document.getElementById("fraction-btn");
fractionButton.addEventListener("click", function(){fractionCreator();});
function fractionCreator(){
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
        getChildrenForDivision(divisionContainer);
        cursor.insertAdjacentElement("afterend", divisionContainer);
        parent.removeChild(cursor);
        clearInterval(blinkIntervalID);
        if(numerator.childElementCount > 0){
            divisionUpdateCursor(divisionContainer.children[1]);
            numerator.classList.remove("division-grayed");
        }else{
        divisionUpdateCursor(divisionContainer.children[0]);
        }
        
    }
}
function getChildrenForDivision(divisionContainer){
    const cursor = document.querySelector(".cursor");
    let parent = cursor.parentElement;
    let parentChildren = parent.childNodes;
    let cursorIndex = -1;
    parentChildren.forEach( (child, index) =>{
        if(child == cursor){
            cursorIndex = index;
        }
    });
    let childrenArray = [];
    parentChildren = Array.from(parent.childNodes);
    let numerator = divisionContainer.children[0];
    for(let i = cursorIndex-1; i > 0; i--){
        let temp = parentChildren[i];
        if(temp.classList[0] == "operator")break;
        childrenArray.push(temp);
        parent.removeChild(temp);
    }
    for(let i=0; i < childrenArray.length; i++){
        numerator.insertAdjacentElement("afterbegin", childrenArray[i])
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
function divisionUpdateCursor(pos, place){
    if(pos.classList[0] == "numerator" || pos.classList[0] == "denominator"){
        centerDivisionText(pos);
        if(place == "beforeend"){
            pos.insertAdjacentHTML("beforeend", "<span class='cursor blink'></span>");
        }else{
        pos.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        }
        pos.classList.remove("division-grayed");
        cursorBlink();
    }
}
function divisionGrayed(pos){
    if(pos.childElementCount == 0)
    pos.classList.add("division-grayed");
}
function centerDivisionText(pos){
    let parent = pos.parentElement;
    let children = parent.children;
    if(children[0].childElementCount > 0 || children[1].childElementCount > 0){
        children[0].style.justifyContent = "center";
        children[1].style.justifyContent = "center";
    }
    else
    {
        children[0].style.justifyContent = "start";
        children[1].style.justifyContent = "start";
    }
}
function divisionOutsideBackspace(element, cursor){
    let empty = divisionEmpty(element);
    if(empty)return;

    let children = element.children;
    let denominator = children[1];
    cursor.parentElement.removeChild(cursor);
    clearInterval(blinkIntervalID);
    divisionUpdateCursor(denominator, "beforeend");
    divisionBreak = true;
}
function divisionEmpty(element){
    let children = element.children;
    if(children[0].childElementCount == 0 && children[1].childElementCount == 0)
    {
        return true;
    }
    return false;
}
function divisionInsideBackspace(element){

    let parentOfFraction = element.parentElement;
    let numerator = element.children[0];
    let denominator = element.children[1];
    if(numerator.childElementCount == 1){
        if(childIsCursor(numerator.children[0]))
        removeDivisionContainer(parentOfFraction, element, denominator);
    }
    if(denominator.childElementCount == 1){
        if(childIsCursor(denominator.children[0]))
        removeDivisionContainer(parentOfFraction, element, numerator);
    }

}
function removeDivisionContainer(container, fraction, element){
    let children = Array.from(container.children);
    let index = -1;
    children.forEach( (child, indx) =>{
        if(child == fraction){
            index = indx
        }
    });
    let childrenArray = [];
    let elementChildren = element.children;
    for(let i = 0; i < elementChildren.length; i++){
        let temp = elementChildren[i];
        childrenArray.push(temp);
    }
    let previous = children[index-1];
    if(previous !== null && previous !== undefined)
    {
        placeFromFraction(previous, childrenArray, "afterend");
    }
    else
    {
        placeFromFraction(container, childrenArray, "afterbegin");
    }
    container.removeChild(fraction);
}
function childIsCursor(element){
    if(element.classList[0] == "cursor")
        return true;
    return false;
}
function placeFromFraction(element, arr, place){
    element.insertAdjacentHTML("" + place, "<span class='cursor blink'></span>");
    clearInterval(blinkIntervalID);
    cursorBlink();
    for(let i = arr.length - 1; i >=0; i--){
        let temp = arr[i]
        element.insertAdjacentElement("" + place, temp);
    }
}
