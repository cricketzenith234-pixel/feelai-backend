import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ API key from Render env variable
const API_KEY = process.env.OPENAI_API_KEY;

// ✅ Test route (important)
app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

// ✅ Chat route
app.post("/chat", async (req, res) => {
  try {
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
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (error) {
    res.json({ error: "Error aa gaya" });
  }
});

// ✅ Render ke liye PORT fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});