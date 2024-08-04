const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/latest-games", async (req, res) => {
  const LATEST_GAMES =
    "https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=1&releaseYearMin=1958&releaseYearMax=2024&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u";

  try {
    const rawData = await fetch(LATEST_GAMES);
    const json = await rawData.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/api/game-details/:slug", async (req, res) => {
  const { slug } = req.params;
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  try {
    const rawData = await fetch(GAME_DETAILS);
    const json = await rawData.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
