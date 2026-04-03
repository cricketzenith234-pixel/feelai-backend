import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    // Check message
    if (!userMsg) {
      return res.status(400).json({ error: "Message missing" });
    }

    // API URL
    const apiUrl = `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(userMsg)}&botname=FeelAI&ownername=Suraj`;

    // Call API
    const response = await fetch(apiUrl);

    // Check API response
    if (!response.ok) {
      return res.status(500).json({ error: "API failed" });
    }

    const data = await response.json();

    // Send reply
    res.json({
      reply: data.message || "Koi reply nahi aaya"
    });

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      error: "Server crash hua bhai"
    });
  }
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});