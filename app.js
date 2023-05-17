import { config } from "dotenv"
config()
import { Configuration, OpenAIApi } from "openai"
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8000;

const openai = new OpenAIApi(new Configuration({
        apiKey:process.env.API_KEY
}))

app.use(bodyParser.json());


app.post('/',  async (req, res) => {
  
   const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
        role: "user",
        content: "if i tell you my city name, will you tell me temperature"
    },
    {
        role: "assistant",
        content: "Yes, I can tell you the current temperature in your city. Please provide me with the name of your city."
    },
        {
        role: "user",
        content: req.body.prompt
    }]
   })
    res.send(result.data.choices[0].message.content)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});