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
    let denominator = document.createElement("span");
        denominator.classList.add("denominator");
    divisionContainer.appendChild(numerator);
    divisionContainer.appendChild(denominator);
    const cursor = document.querySelector(".cursor");
    cursor.insertAdjacentElement("afterend", divisionContainer);
    console.log("hi")
}
//Only if empty
function divisionUpdateCursor(pos){
    if(pos.classList[0] == "numerator" || pos.classList[0] == "denominator"){
        pos.insertAdjacentHTML("afterbegin", "<span class='cursor blink'></span>");
        cursorBlink();
    }

}