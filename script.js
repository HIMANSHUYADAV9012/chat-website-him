const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");

// Send Message
function sendMessage() {
    let message = messageInput.value.trim();
    if (message === "") return;

    // Create Message Bubble
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerHTML = `💌 ${message}`;
    chatBox.appendChild(userMessage);

    // Send to Telegram Bot
    fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message })
    });

    messageInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight; // Auto Scroll
}

// Receive Message from Telegram Bot
function receiveMessage(text) {
    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.innerHTML = `🤖 ${text}`;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}
