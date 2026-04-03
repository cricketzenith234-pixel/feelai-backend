import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "YOUR_OPENAI_API_KEY";

app.post("/chat", async (req, res) => {
    const userMsg = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a cute emotional AI girl." },
                { role: "user", content: userMsg }
            ]
        })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
});

app.listen(3000);
