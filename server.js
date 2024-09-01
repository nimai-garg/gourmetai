const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Mailchimp = require('mailchimp-api-v3');

const app = express();
const port = process.env.PORT || 3001; // Default port for local development

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend origin
  methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));
app.use(bodyParser.json());

// Initialize Mailchimp
const mailchimp = new Mailchimp('e9ad866a56cc654bec6688eb6b1616ac-us12'); // Replace with your Mailchimp API key

// Paths for file operations
const staticPromptPath = path.join(__dirname, 'staticPrompt.txt');
const nonStaticPromptPath = path.join(__dirname, 'userPrompt.txt');

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).send('Invalid email address');
  }
  try {
    const response = await mailchimp.post(`/lists/5d0dc4ad88/members`, {
      email_address: email,
      status: 'subscribed'
    });
    res.status(200).send('Subscribed successfully');
  } catch (error) {
    console.error('Mailchimp error:', error.response ? error.response.data : error.message);
    res.status(400).send('Subscription failed');
  }
});

// Route for updating static prompt
app.post('/updateStaticPrompt', async (req, res) => {
  console.log('Received request at /updateStaticPrompt');
  const { prompt } = req.body;
  const assistantName = "GourmetBot"; // Replace with your desired name
  const fullPrompt = `You are ${assistantName}. ${prompt}`;
  fs.writeFile(staticPromptPath, fullPrompt, 'utf8', async (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to write to file' });
    }
    fs.readFile(staticPromptPath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read file' });
      }
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

// Route for updating non-static prompt
app.post('/updateNonStaticPrompt', async (req, res) => {
  console.log('Received request at /updateNonStaticPrompt');
  const { prompt } = req.body;
  const assistantName = "GourmetBot"; // Replace with your desired name
  const fullPrompt = `You are ${assistantName}. ${prompt}`;
  fs.writeFile(nonStaticPromptPath, fullPrompt, 'utf8', async (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ error: 'Failed to write to file' });
    }
    fs.readFile(nonStaticPromptPath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read file' });
      }
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});