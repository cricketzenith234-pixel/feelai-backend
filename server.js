import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

// Chat route (NO API, always works)
app.post("/chat", (req, res) => {
  try {
    const userMsg = req.body.message;

    if (!userMsg) {
      return res.json({ reply: "Message nahi mila 😅" });
    }

    // Simple AI-like reply
    let reply = "";

    if (userMsg.toLowerCase().includes("hello")) {
      reply = "Hello bhai 👋 kaise ho?";
    } else if (userMsg.toLowerCase().includes("kaise ho")) {
      reply = "Main badhiya hu 😄 tum batao?";
    } else {
      reply = "Tumne bola: " + userMsg;
    }

    res.json({ reply });

  } catch (error) {
    res.json({ reply: "Error aa gaya 😅" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running 🚀"));