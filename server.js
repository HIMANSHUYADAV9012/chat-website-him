const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ⚡ Telegram Bot Config
const TELEGRAM_BOT_TOKEN = "7689966226:AAFPKCpq4Q_l0J9c6hKlCNV_O-EdTfE4JgU"; // यहां अपना बॉट टोकन डालो
const TELEGRAM_CHAT_ID = "5029478739"; // यहां अपनी Chat ID डालो

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let messages = []; // पुराने मैसेज स्टोर करने के लिए

// 📨 जब यूजर वेबसाइट से मैसेज भेजेगा, तो ये API उसे Telegram बॉट पर भेजेगी
app.post("/send-message", async (req, res) => {
    const message = req.body.text;
    
    // Message को Telegram Bot पर भेजना
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    });

    messages.push({ sender: "user", text: message }); // लोकल स्टोरेज में सेव करना
    res.sendStatus(200);
});

// 🔄 Telegram से आने वाले मैसेज को वेबसाइट पर दिखाना
app.post("/receive-message", async (req, res) => {
    const { message } = req.body;

    if (message && message.text) {
        messages.push({ sender: "bot", text: message.text });
    }

    res.sendStatus(200);
});

// 🌐 जब कोई वेबसाइट खोलेगा, उसे पुराने मैसेज मिलेंगे
app.get("/messages", (req, res) => {
    res.json(messages);
});

// 🚀 सर्वर रन करना
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
