const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "8aceefc2e8b769871a01e3607b5cc5b5a80cf55addd08ee118d0df8a53bdb9a1",
      input: { prompt: prompt }
    }),
  });
  const prediction = await response.json();
  res.json(prediction);
});

app.get('/prediction/:id', async (req, res) => {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${req.params.id}`,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const prediction = await response.json();
  res.json(prediction);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
