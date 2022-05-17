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
            sizing(absContainer);
            nestedSizingIncrease(absContainer);
            parent.removeChild(cursor);
            absValueUpdateCursor(absContainer.childNodes[1]);
        }
    }
}
function getBiggestAbs(){
    let children = currentSelection.children;
    let style = '24px';
    for(let i = 0; i<children.length; i++){
        let child = children[i];
        if(child.classList[0] == "abs-value-container"){
            let temp = window.getComputedStyle(child, null).getPropertyValue('font-size')
            if(parseFloat(style) < parseFloat(temp)){
                style = temp;
            }
        }
    }
    return style;
}
//Changes the height of the input box
//Based on the biggest abs Container that is inside of it.
function inputAbsSizing(){
    let divInput = currentSelection.parentElement;
    let absStyle = getBiggestAbs();
    let biggestAbs = parseFloat(absStyle);
    if(biggestAbs > 24){
        let newHeight = ((biggestAbs-24)/5) * 2.5;
         newHeight+=18;
         newHeight += "%";
        divInput.style.cssText="height: " + newHeight;
    }
    if(biggestAbs == 24){
        divInput.style.cssText="height: 18%";
    }
}
//Sizing only increase the size once,
//So this function bubbles outwards utilizing it, 
//Increasing the size of all the parent containers the original is inside.
function nestedSizingIncrease(absContainer){
    let middle = absContainer.parentElement;
    if(middle !== null && middle.classList[0] !== "expression-container"){
    let container = middle.parentElement;
    sizing(container);
        while(container.parentElement.classList[0] !== "expression-container"){
            container = container.parentElement.parentElement;
            sizing(container);
        }
    }
}
//If the container that is being placed has an abs container Inside of it it,
//Increase its size based of the biggest size of its children
function sizing(absContainer){
    let hasAbsContainer = false;
    let middle = absContainer.children[1];
    let style = '24px';
    for(let i = 0; i<middle.children.length; i++){
        let child = middle.children[i];
        if(child.classList[0] == "abs-value-container"){
            hasAbsContainer=true;
            if( parseFloat(window.getComputedStyle(child, null).getPropertyValue('font-size')) > parseFloat(style))
            style = window.getComputedStyle(child, null).getPropertyValue('font-size');
            
        }
    }
    if(hasAbsContainer){
        let fontsize = parseFloat(style);
        fontsize+=5;
        style = fontsize + "px";
        absContainer.style.cssText = "font-size: " + style;
        inputAbsSizing();
    }else{
    absContainer.style.cssText = "font-size: " + style; //So that the container will return to its size of 24px in the instance it no longer has any absContainers inside of it.
    }
}
//sizingDecrease only decreases the size once,
//So this function bubbles outwards utilizing it, 
//Decreasing the size of all the parent containers the original is inside.
//But only if said container is the biggest relatively
function nestedSizingDecrease(absContainer){
    let middle = absContainer.parentElement;
    let container = middle.parentElement;
    if(middle.classList[0] == "expression-container" || container.classList[0] == "expression-container")return;
    let style = window.getComputedStyle(absContainer, null).getPropertyValue('font-size');
    //Loops through the parent container of the parameter to see 
    //if there are any abs value containers bigger than itself, 
    //if so DO NOT continue onwards so that no size is decreased
    for(let i = 0; i<middle.children.length; i++){
        let child = middle.children[i];
        if(child.classList[0] == "abs-value-container"){
            if( parseFloat(window.getComputedStyle(child, null).getPropertyValue('font-size')) >= parseFloat(style) && child !== absContainer)
            return; 
        }
    }
    //So that the outermost abs container is not decreased. 
    //Everytime ANY container is decreased.
    //Only when there is not a biggerAbsContainer available.
    let hasBiggerAbsContainer = biggerAbsContainer(absContainer);
    if(hasBiggerAbsContainer == false){
        if(container.parentElement.classList[0] == "expression-container"){
            sizingDecrease(container);
            
        };
    }
    while(container.parentElement.classList[0] !== "expression-container"){
        sizingDecrease(container);
        container = container.parentElement.parentElement;
        if(hasBiggerAbsContainer == false){
         if(container.parentElement.classList[0] == "expression-container"){
            sizingDecrease(container);
         };
        }
    }
}
function sizingDecrease(absContainer){
    let outerStyle = window.getComputedStyle(absContainer, null).getPropertyValue('font-size');
    let fontsize = parseFloat(outerStyle);
    fontsize-=5;
    outerStyle = fontsize + "px"; 
    absContainer.style.cssText = "font-size: " + outerStyle;
    inputAbsSizing();
}
//return T/F if there is a bigger container, that does not hold the parameter, within the same outermost container.
function biggerAbsContainer(absContainer){
    let hasBiggerAbsContainer = false;
    let outerMostContainer = absContainer.parentElement;
    //loops through to get the container that is farthest outwards
    while(outerMostContainer.parentElement.classList[0] !== "expression-container"){
        outerMostContainer = outerMostContainer.parentElement;
    }
    let middle = outerMostContainer.children[1];
    let outsideContainer;
    //loops to get the container that is the outermost container of the parameter, but NOT the outerMost overall
    for(let z = 0; z<middle.children.length; z++){
        let child = middle.children[z];
        if( child.contains(absContainer)){
            outsideContainer = child;
        }
    }
    let style = window.getComputedStyle(outsideContainer, null).getPropertyValue('font-size');
    for(let i = 0; i<middle.children.length; i++){
        let child = middle.children[i];
        if(child.classList[0] == "abs-value-container"){
            let isDescendent = child.contains(absContainer);
            if( parseFloat(window.getComputedStyle(child, null).getPropertyValue('font-size')) > parseFloat(style) && isDescendent == false)
            hasBiggerAbsContainer=true;
        }
    }
    return hasBiggerAbsContainer;
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

        //When the cursor is to the right of a abs container
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
            //When the cursor is the last child and abs right has been "deleted"
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
            //When the cursor is not the last child, but inside of an absContainer
            else if(siblingClass == "abs-right-grayed"){
                cursorIndex = -1;
                middleChildren.forEach( (child, index) =>{
                    if(child.classList[0] == "cursor"){
                        cursorIndex = index;
                    }
                });
                //Stores the contents after the cursor in an array then removes them from the parent container
                let childrenArray = [];
                for(let i = cursorIndex + 1; i < middleChildren.length; i++){
                    let temp = middleChildren[i];
                    childrenArray.push(temp);
                    parent.removeChild(temp);
                    i--;
                }
                //Inserts the elements from the childrenarray right after the container they were in and in the same order
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
                //After all this is performed, calls sizing incase the container size has been altered by having abs containers inside of it
                nestedSizingDecrease(container); //Added
                sizing(container);
                
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
            sizing(element);
            nestedSizingIncrease(element);
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
    nestedSizingDecrease(absContainer)
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