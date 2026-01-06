// ===== Set your backend URL here =====
// Local dev: "http://localhost:8080"
// Deployment: your live backend URL
const BASE_URL = "http://localhost:8080";
// Example for deployment: const BASE_URL = "https://mychatapp-backend.onrender.com";

// TEMP LOGIN USER (FOR NOW)
if (!localStorage.getItem("user")) {
    localStorage.setItem("user", "leo");
}

const loggedInUser = localStorage.getItem("user");
let selectedUser = null;

// TEMP USERS (can be replaced with API call later)
const users = ["leo", "mike"];

const userList = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const chatWith = document.getElementById("chatWith");

// Load users
users.forEach(u => {
    if (u !== loggedInUser) {
        const li = document.createElement("li");
        li.innerText = u;
        li.onclick = () => selectUser(u);
        userList.appendChild(li);
    }
});

// ===== WebSocket setup =====
// Make WebSocket URL dynamic for deployment
const socketUrl = BASE_URL.replace(/^http/, 'ws') + "/ws"; // converts http(s) -> ws(s)
var socket = new SockJS(socketUrl);
var stompClient = Stomp.over(socket);

stompClient.connect({}, function () {
    stompClient.subscribe('/topic/messages', function (msg) {
        const message = JSON.parse(msg.body);

        if (
            (message.sender === loggedInUser && message.receiver === selectedUser) ||
            (message.sender === selectedUser && message.receiver === loggedInUser)
        ) {
            renderMessage(message);
        }
    });
});

function selectUser(user) {
    selectedUser = user;
    chatWith.innerText = user;
    messagesDiv.innerHTML = "";
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    if (!input.value || !selectedUser) return;

    stompClient.send("/app/send", {}, JSON.stringify({
        sender: loggedInUser,
        receiver: selectedUser,
        content: input.value
    }));

    input.value = "";
}

function renderMessage(msg) {
    const div = document.createElement("div");
    div.className = "message " + (msg.sender === loggedInUser ? "sent" : "received");
    div.innerText = msg.content;
    messagesDiv.appendChild(div);
}
