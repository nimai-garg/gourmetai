const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001; // Default to 5001 for local development

// Ensure that OPENAI_API_KEY is defined
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not defined');
  process.exit(1);
}

app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.options('*', cors()); // To handle preflight requests

const staticPromptPath = path.join(__dirname, 'staticPrompt.txt');
const nonStaticPromptPath = path.join(__dirname, 'userPrompt.txt');

// Function to validate prompt input
function validatePrompt(prompt) {
  return typeof prompt === 'string' && prompt.trim().length > 0 && prompt.length <= 500;
}

app.post('/updateStaticPrompt', async (req, res) => {
  console.log('Received request at /updateStaticPrompt');
  const { prompt } = req.body;

  if (!validatePrompt(prompt)) {
    return res.status(400).json({ error: 'Invalid prompt input' });
  }

  const assistantName = "GourmetBot";
  const fullPrompt = `You are ${assistantName}. ${prompt}`;

  try {
    // Write the new static prompt to the .txt file
    await fs.promises.writeFile(staticPromptPath, fullPrompt, 'utf8');
    const data = await fs.promises.readFile(staticPromptPath, 'utf8');

    // Send the prompt to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-4', messages: [{ role: 'user', content: data }] },
      {
        headers: {
          'Authorization': `Bearer sk-xiI57ty6KLVdBlFAJRDzoAIcnrKMao5yb8plQkfUJ3T3BlbkFJICr568BvqkLcoMGOorx5nKr9fOSNTVSzgT45p8zYUA`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error handling /updateStaticPrompt:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
});

app.post('/updateNonStaticPrompt', async (req, res) => {
  console.log('Received request at /updateNonStaticPrompt');
  const { prompt } = req.body;

  if (!validatePrompt(prompt)) {
    return res.status(400).json({ error: 'Invalid prompt input' });
  }

  const assistantName = "GourmetBot";
  const fullPrompt = `You are ${assistantName}. ${prompt}`;

  try {
    // Write the new non-static prompt to the .txt file
    await fs.promises.writeFile(nonStaticPromptPath, fullPrompt, 'utf8');
    const data = await fs.promises.readFile(nonStaticPromptPath, 'utf8');

    // Send the prompt to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model: 'gpt-4', messages: [{ role: 'user', content: data }] },
      {
        headers: {
          'Authorization': `Bearer sk-xiI57ty6KLVdBlFAJRDzoAIcnrKMao5yb8plQkfUJ3T3BlbkFJICr568BvqkLcoMGOorx5nKr9fOSNTVSzgT45p8zYUA`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error handling /updateNonStaticPrompt:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});