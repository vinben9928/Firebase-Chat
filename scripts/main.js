window.addEventListener("DOMContentLoaded", documentLoaded);

var messages = firebase.database().ref("chat");

messages.on("value", function(data) {
    var msgs = data.val();

    var chatMessages = document.getElementById("chatMessages");
    while(chatMessages.firstChild) {
        chatMessages.removeChild(chatMessages.firstChild);
    }

    for(var key in msgs) {
        var message = msgs[key];
        
        var msgElement = document.createElement("div");
        var headerElement = document.createElement("p");
        var messageElement = document.createElement("p");

        headerElement.innerText = new Date(message.timestamp).toString() + " - " + message.name;
        headerElement.style.cssText = "font-weight: bold;";

        messageElement.innerText = message.message;

        msgElement.style.cssText = "padding: 16px; border-bottom: 1px dashed #CCCCCC;";

        msgElement.appendChild(headerElement);
        msgElement.appendChild(messageElement);
        
        chatMessages.appendChild(msgElement);
    }

    if(chatMessages.children.length > 0) {
        chatMessages.children[chatMessages.children.length - 1].scrollIntoView();
    }
});

function documentLoaded() {
    document.getElementById("chatForm").addEventListener("submit", onSubmit)
}

function onSubmit(event) {
    event.preventDefault();
    
    var name = document.getElementById("chatName").value;
    var message = document.getElementById("chatMessage").value;
    var timestamp = Date.now();

    let database = firebase.database();

    database.ref("chat").push({
        name: name,
        message: message,
        timestamp: timestamp
    });

    document.getElementById("chatMessage").value = "";
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