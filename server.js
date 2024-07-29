const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
 const path = require('path');

 const app = express();
 const port = process.env.PORT || 5001; // Default to 3000 for local development

 app.use(bodyParser.json());

 // Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend origin
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));

app.options('*', cors()); // Include this to handle preflight OPTIONS requests


const staticPromptPath = path.join(__dirname, 'staticPrompt.txt');
const nonStaticPromptPath = path.join(__dirname, 'userPrompt.txt');

app.post('/updateStaticPrompt', async (req, res) => {
  console.log('Received request at /updateNonStaticPrompt');
  const { prompt } = req.body;
  const assistantName = "GourmetBot"; // Replace with your desired name
  // Add the assistant's name to the prompt
  const fullPrompt = `You are ${assistantName}. ${prompt}`;
  // Write the new static prompt to the .txt file
  fs.writeFile(staticPromptPath, fullPrompt, 'utf8', async (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to write to file' });
    }
    // Read the prompt from the .txt file
    fs.readFile(staticPromptPath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read file' });
      }
      // Send the prompt to the OpenAI API
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: data }],
        }, {
          headers: {
            'Authorization': `Bearer sk-proj-8AZWAIqvStj7BioLukFeT3BlbkFJV4LAip8PLsLsOfJ48Zly`,
            'Content-Type': 'application/json',
          },
        });
        res.json(response.data);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to communicate with OpenAI API' });
      }
    });
  });
});
app.post('/updateNonStaticPrompt', async (req, res) => {
  console.log('Received request at /updateNonStaticPrompt');
  const { prompt } = req.body;
  const assistantName = "GourmetBot"; // Replace with your desired name
  // Add the assistant's name to the prompt
  const fullPrompt = `You are ${assistantName}. ${prompt}`;
  // Write the new non-static prompt to the .txt file
  fs.writeFile(nonStaticPromptPath, fullPrompt, 'utf8', async (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to write to file' });
    }
    // Read the prompt from the .txt file
    fs.readFile(nonStaticPromptPath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read file' });
      }
      // Send the prompt to the OpenAI API
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: data }],
        }, {
          headers: {
            'Authorization': `Bearer sk-proj-8AZWAIqvStj7BioLukFeT3BlbkFJV4LAip8PLsLsOfJ48Zly`,
            'Content-Type': 'application/json',
          },
        });
        res.json(response.data);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Failed to communicate with OpenAI API' });
      }
    });
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});