import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WORDNIK_API_KEY; // we'll set this securely in Render

app.get("/wotd", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${API_KEY}`
    );
    const data = await response.json();

    const word = data.word;
    const definition = data.definitions[0]?.text || "No definition found";

    res.type("text/plain");
    res.send(`${word} — ${definition}`);
  } catch (err) {
    res.type("text/plain");
    res.send("Error fetching Word of the Day.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
