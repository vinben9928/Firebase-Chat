window.addEventListener("DOMContentLoaded", documentLoaded);

function documentLoaded() {
    document.getElementById("chatForm").addEventListener("submit", onSubmit)
}

function onSubmit(event) {
    event.preventDefault();
    
    var name = document.getElementById("chatName").value;
    var message = document.getElementById("chatMessage").value;
    var timestamp = Date.now();

    
}

function getElementsByClassName(className) {
    if(className === undefined || className === null || typeof className !== "string") { throw "'className' must be a valid string!"; }
    
    var returnArray = [];
    var elements = document.getElementsByClassName(className);
    for(var i = 0; i < elements.length; i++) {
        returnArray.push(elements[i]);
    }

    return returnArray;
}