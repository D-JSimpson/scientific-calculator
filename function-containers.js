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
    let absRight = document.createElement("span");
    absRight.classList.add("abs-right");
    absRight.innerText = "|";
    absRight.classList.add("abs-right-grayed");
    absContainer.appendChild(absLeft);
    absContainer.appendChild(absMiddle);
    absContainer.appendChild(absRight);
    const cursor = document.querySelector(".cursor");
    let alreadyThere = absValueThere();
    if(alreadyThere == false){
        if(cursor !== null){
            let parent = cursor.parentElement;
            getChildren(absContainer);
            cursor.insertAdjacentElement("afterend", absContainer);
            parent.removeChild(cursor); //Needs to be able to look into containers
            absValueUpdateCursor(absContainer.childNodes[1]);
        }
    }
}
function getChildren(absContainer){
    const cursor = document.querySelector(".cursor");
    let parent = cursor.parentElement;
    let parentChildren = parent.childNodes;
    let cursorIndex = -1;
    parentChildren.forEach( (child, index) =>{
        if(child.classList[0] == "cursor"){
            cursorIndex = index;
        }
    });
    let childrenArray = [];
    let middle = absContainer.children[1];
        for(let i = cursorIndex+1; i < parentChildren.length; i++){
            let temp = parentChildren[i];
            childrenArray.push(temp);
            parent.removeChild(temp);
            i--;
        }
        for(let i=childrenArray.length - 1; i > -1; i--){
            middle.insertAdjacentElement("afterbegin", childrenArray[i])
        }

}
function absValueThere(){
    const cursor = document.querySelector(".cursor");
    let bool = false;
    if(cursor !== null){
        let parent = cursor.parentElement;
        let parentClass = parent.classList[0];

        let previousSibling = cursor.previousElementSibling;
            if(previousSibling !== null && previousSibling.classList[0] == "abs-value-container"){
                let children = previousSibling.childNodes;
                const right = children[children.length-1];
                let rightClass = right.classList[1];
                if(rightClass == "abs-right-grayed"){
                    right.classList.remove("abs-right-grayed");
                    bool=true;
                }
            }
        if(parentClass == "abs-middle"){
            let sibling = parent.nextElementSibling;
            let siblingClass = sibling.classList[1];
            let container = parent.parentElement;
            let middleChildren = parent.childNodes;
            let lastMiddleChild = middleChildren[middleChildren.length -1];
            if(siblingClass == "abs-right-grayed" && lastMiddleChild == cursor){
                let c = document.createElement("span");
                c.classList.add("cursor");
                c.classList.add("blink");
                container.insertAdjacentElement("afterend", c);
                containerCursorBlink(c);
                parent.removeChild(cursor);
                let parentChildren = parent.childNodes;
                if(parentChildren.length == 0)parent.classList.add("abs-middle-grayed");
                sibling.classList.remove("abs-right-grayed");
                bool = true;
            }
            else if(siblingClass == "abs-right-grayed"){
                cursorIndex = -1;
                middleChildren.forEach( (child, index) =>{
                    if(child.classList[0] == "cursor"){
                        cursorIndex = index;
                    }
                });
                let childrenArray = [];
                for(let i = cursorIndex + 1; i < middleChildren.length; i++){
                    let temp = middleChildren[i];
                    childrenArray.push(temp);
                    parent.removeChild(temp);
                    i--;
                }
                for(let i=childrenArray.length - 1; i > -1; i--){
                    container.insertAdjacentElement("afterend", childrenArray[i])
                }
                let c = document.createElement("span");
                c.classList.add("cursor");
                c.classList.add("blink");
                container.insertAdjacentElement("afterend", c);
                containerCursorBlink(c);
                parent.removeChild(cursor);
                sibling.classList.remove("abs-right-grayed");
                let parentChildren = parent.childNodes;
                if(parentChildren.length == 0)parent.classList.add("abs-middle-grayed");
                bool=true;
            }
        }
    }
    return bool;
}
function absValueUpdateCursor(pos){
    if(pos.classList[0] == "abs-middle")
    {
        pos.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        pos.classList.remove("abs-middle-grayed");
        const children = pos.childNodes;
        let firstChild = children[0];
        containerCursorBlink(firstChild);
    }
    if(pos.classList[0] == "abs-right")
    {
        const parent = pos.parentNode;
        let cursor = document.createElement("span");
        cursor.classList.add("cursor");
        cursor.classList.add("blink");
        parent.insertAdjacentElement("afterend", cursor);
        containerCursorBlink(cursor);
    }
    if(pos.classList[0] == "abs-left")
    {
        const middle = pos.nextElementSibling;
        middle.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        middle.classList.remove("abs-middle-grayed");
        const children = middle.childNodes;
        let firstChild = children[0];
        containerCursorBlink(firstChild);
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
            if(middleChildren.length == 0)middle.classList.add("abs-middle-grayed");
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
function absValueBackspace(element, cursor){
//Outside container
if(element !== null){
let nextElement = element.nextElementSibling;
  if(nextElement !== null){
    if(nextElement.classList[0] == "cursor"){
        let siblingAfter = nextElement.nextElementSibling;
        let parent = cursor.parentElement;
        if(siblingAfter !== null){
            let children = cursor.parentElement.childNodes;
            const middle = element.childNodes[1];
            cursorIndex = -1;
                children.forEach( (child, index) =>{
                    if(child.classList[0] == "cursor"){
                        cursorIndex = index;
                    }
                });
            let childrenArray = [];
            for(let i = cursorIndex; i < children.length; i++){
                let temp = children[i];
                childrenArray.push(temp);
                parent.removeChild(temp);
                i--;
            }
            for(let i= 0; i < childrenArray.length; i++){
                middle.insertAdjacentElement("beforeend", childrenArray[i])
            }
            middle.classList.remove("abs-middle-grayed");
            const right = element.childNodes[element.childNodes.length-1];
            right.classList.add("abs-right-grayed");
            absBreak = true;
            return;
        }
        else{
        const right = element.childNodes[element.childNodes.length-1];
        right.classList.add("abs-right-grayed");
        parent.removeChild(nextElement);
        absValueUpdateCursorAfterBacksapce(element, cursor);
        absBreak = true;
        return;
        }
    }
  }
}
//Inside container
//   let hasCursor = false;
//     const middle = element.childNodes[1];
//     const middleChildren = middle.childNodes;
    
//     let index;
//     for(i=0; i<middleChildren.length; i++){
//         let e = middleChildren[i];
//         if(e.classList[0] == "cursor"){
//             index = i-1;
//             hasCursor = true;
//         }
//     }
const middle = cursor.parentElement;
const middleChildren = middle.childNodes;
const absContainer = middle.parentElement;
const absContainerParent = absContainer.parentElement;

    if(middleChildren[0] == cursor){ //CHANGE THIS DO WORK IF THE CURSOR IS THE FIRST CHILD
      removeContainer(cursor, absContainer);//  absContainer.insertAdjacentElement("afterend", cursor);
        absContainerParent.removeChild(absContainer);
        absBreak = true;
        return;
    }
   // let exp = middleChildren[index];
    let previous = cursor.previousElementSibling;
    if (previous !== null)middle.removeChild(previous);
    clearInterval(blinkIntervalID);
    cursorBlink();
}
function absValueUpdateCursorAfterBacksapce(element, cursor){
    const middle = element.childNodes[1];
    const middleChildren = middle.childNodes;
    // let cursor = document.createElement("span");
    //     cursor.classList.add("cursor");
    //     cursor.classList.add("blink");
    if(middleChildren.length == 0){
        middle.insertAdjacentElement("afterbegin", cursor);
        middle.classList.remove("abs-middle-grayed");
      //  containerCursorBlink(cursor);
    }
    else{
        let lastChild = middleChildren[middleChildren.length-1];
        lastChild.insertAdjacentElement("afterend", cursor);
      //  containerCursorBlink(cursor);
    }
}
function removeContainer(cursor, absContainer){
    let parent = cursor.parentElement;
    let parentChildren = parent.childNodes;
    let cursorIndex = -1;
    parentChildren.forEach( (child, index) =>{
        if(child.classList[0] == "cursor"){
            cursorIndex = index;
        }
    });
    let outside = absContainer.parentElement;
    let outsideChildren = outside.childNodes;
    let outsideIndex = -1;
    outsideChildren.forEach( (child, index) =>{
        if(child == absContainer){
            outsideIndex = index;
        }
    });
    let childrenArray = [];
        for(let i = cursorIndex; i < parentChildren.length; i++){
            let temp = parentChildren[i];
            childrenArray.push(temp);
            parent.removeChild(temp);
            i--;
        }
        for(let i=0; i < childrenArray.length; i++){
            absContainer.insertAdjacentElement("beforebegin", childrenArray[i])
        }
}