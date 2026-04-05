import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

// ✅ CHAT ROUTE
app.get("/chat", async (req, res) => {
  try {
    const userMessage = req.query.message;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data); // debug

    // error check
    if (!data.candidates) {
      return res.json({
        message: "API error: " + JSON.stringify(data),
      });
    }

    const reply = data.candidates[0].content.parts[0].text;

    res.json({ message: reply });
  } catch (err) {
    res.json({ message: "Server error 😢" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running 🚀"));