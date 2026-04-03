import express from "express";
import cors from "cors";

const app = express();
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

    const response = await fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(userMsg)}&botname=FeelAI&ownername=Suraj`
    );

    const data = await response.json();

    res.json({
      reply: data.message
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error aaya bhai" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running 🚀"));