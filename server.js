app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    if (!userMsg) {
      return res.status(400).json({ error: "Message missing" });
    }

    const apiUrl = `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(userMsg)}&botname=FeelAI&ownername=Suraj`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "API failed" });
    }

    const data = await response.json();

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