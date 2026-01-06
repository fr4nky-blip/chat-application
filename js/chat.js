// ===== CHAT APPLICATION =====

const currentUser = localStorage.getItem("user");

if (!currentUser) {
    window.location.href = "./login.html";
}

// Mock users for chat
const users = ["Alice", "Bob", "Charlie", "David"].filter(u => u !== currentUser);

const usersList = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const chatWithSpan = document.getElementById("chatWith");

let selectedUser = null;

// Render user list
users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    li.onclick = () => selectUser(user);
    usersList.appendChild(li);
});

function selectUser(user) {
    selectedUser = user;
    chatWithSpan.textContent = "Chat with " + user;
    messagesDiv.innerHTML = "";
}

// Send message
function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text || !selectedUser) return;

    addMessage(currentUser, text, "sent");

    // Simulate a reply
    setTimeout(() => {
        addMessage(selectedUser, "Message received", "received");
    }, 800);

    input.value = "";
}

// Add message to chat area
function addMessage(sender, text, type) {
    const msg = document.createElement("div");
    msg.className = "message " + type;
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
