//Helper functions.
function getElementsByClassName(className) {
    if(className === undefined || className === null || typeof className !== "string") { throw "'className' must be a valid string!"; }
    
    var returnArray = [];
    var elements = document.getElementsByClassName(className);
    for(var i = 0; i < elements.length; i++) {
        returnArray.push(elements[i]);
    }

    return returnArray;
}

//Firebase events.
var messages = firebase.database().ref("chat");

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        document.getElementById("logoutLink").style.display = "block";
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("loginNotice").style.display = "none";
        document.getElementById("loginBlock").style.display = "none";
        document.getElementById("chatMessages").style.display = "block";
        document.getElementById("chatBlock").style.display = "block";

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
    }
    else {
        document.getElementById("logoutLink").style.display = "none";
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("loginNotice").style.display = "table";
        document.getElementById("loginBlock").style.display = "none";
        document.getElementById("chatMessages").style.display = "none";
        document.getElementById("chatBlock").style.display = "none";
    }
});

//Main code.
window.addEventListener("DOMContentLoaded", documentLoaded);

function documentLoaded() {
    document.getElementById("chatForm").addEventListener("submit", onSubmit);
    document.getElementById("loginForm").addEventListener("submit", onLoginSubmit);
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

function onLoginSubmit(event) {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value)
        .then(function() {
            
        })
        .catch(function(error) {
            console.log(error.message, error.code);
            alert("Invalid username or password!");
        });
}

function login() {
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("loginNotice").style.display = "none";
    document.getElementById("loginBlock").style.display = "block";
}

function logout() {
    firebase.auth().signOut()
        .then(function() {
            window.location.reload(true);
        })
        .catch(function(error) {
            alert("Couldn't sign out:\n" + error.message + " (" + error.code + ")");
        });
}