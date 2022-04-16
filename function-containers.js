const absoluteValue = document.getElementById("abs");
absoluteValue.addEventListener("click", function(){
    absValueCreator();
});
function absValueCreator(){
    let absContainer = document.createElement("span");
    absContainer.classList.add("abs-value-container");
    let absLeft = document.createElement("span");
    absLeft.classList.add("abs-left");
    absLeft.innerText = "|";
    let absMiddle = document.createElement("span");
    absMiddle.classList.add("abs-middle");
    absMiddle.classList.add("abs-middle-grayed");
    absMiddle.addEventListener("click", function(){absMiddle.classList.toggle("abs-middle-grayed")});
    let absRight = document.createElement("span");
    absRight.classList.add("abs-right");
    absRight.classList.add("abs-right-graye");
    absRight.innerText = "|";
    absContainer.appendChild(absLeft);
    absContainer.appendChild(absMiddle);
    absContainer.appendChild(absRight);

    currentSelection.appendChild(absContainer);
}

function absValueUpdateCursor(pos){
    if(pos.classList[0] == "abs-middle")
    {
        pos.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        const children = pos.childNodes;
        let firstChild = children[0];
        containerCursorBlink(firstChild);
    }
    if(pos.classList[0] == "abs-right")
    {
        const parent = pos.parentNode;
        parent.insertAdjacentHTML("afterend", "<span class='cursor blink'></span>");
    }
    if(pos.classList[0] == "abs-left")
    {
        const middle = pos.nextElementSibling;
        middle.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
    }
}
function containerCursorBlink(cursor){
    const c = cursor;
    if(c.classList[1] !== "blink")c.classList.toggle("blink");
    blinkIntervalID = setInterval(cursorBlinkTime, 1000, c);
}
function absValueRemoveCursor(element){
    const middle = element.childNodes[1];
    const middleChildren = middle.childNodes;
    middleChildren.forEach( (exp)=>{
        if(exp.classList[0] == "cursor"){
            middle.removeChild(exp);
            clearInterval(blinkIntervalID);
        }
    });
}
function absValueCursorCheck(element, key){
    const middle = element.childNodes[1];
    const middleChildren = middle.childNodes;
    for(j=0; j<middleChildren.length; j++){
        let exp = middleChildren[j];
        if(exp.classList[0] == "cursor"){
            exp.insertAdjacentHTML("beforebegin", "<span class='digit abs-digit'>" + key + "</span>");
            break;
        }
    }
}
function absValueBackspace(element){
    const middle = element.childNodes[1];
    const middleChildren = middle.childNodes;
    if(middleChildren.length == 1){
        element.insertAdjacentHTML("afterend", "<span class='cursor blink'></span>");
        currentSelection.removeChild(element);
        return;
    }
    let index;
    for(i=0; i<middleChildren.length; i++){
        let e = middleChildren[i];
        if(e.classList[0] == "cursor"){
            index = i-1;
        }
    }
    let exp = middleChildren[index];
    if (index>=0)middle.removeChild(exp);
    clearInterval(blinkIntervalID);
    cursorBlink();
}