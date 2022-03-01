const userInputField = document.querySelector('input');
userInputField.addEventListener('keyup', e => {
 console.log("the cursor is at: ", e.target.selectionStart);
 console.log(e.target.keyCode);
});
userInputField.addEventListener('click', e => {
    console.log("the cursor is at: ", e.target.selectionStart);
});
//Limit the users input to just numbers without using type = "Number". That breaks the event listeners for the userInputField
function checkUserKey(event){
    let char = event.keyCode;
    if(char > 31 && (char < 48 || char > 57)){
        return false;
    }
    return true;
}
//Allow other input values as well, such as "+" or "()"