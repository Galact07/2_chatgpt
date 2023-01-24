const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3080, () => {
  console.log("listening to 3080");
});

app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  res.json({
    models: response.data,
  });
});

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(currentModel);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    // data: response.data,
    message: response.data.choices[0].text,
  });
});
