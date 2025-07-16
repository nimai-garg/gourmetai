const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-NUcZRBGroHFItwm1fdXti5_IxSiLcze32hRSClokhMT3BlbkFJwLb8in-N07nm23QaafZADgtkJPR5uMyh7_QoFrc8cA';

// Then use OPENAI_API_KEY instead of process.env.OPENAI_API_KEY in your axios request

require('dotenv').config();

// Middleware
app.use(bodyParser.json());

// In your Express backend server
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://gourmetchef.app', 'https://www.gourmetchef.app']
    : 'http://localhost:3000',  // Note: this is a string, not an array for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Validate environment variables
function validateEnv() {
  if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not defined');
    process.exit(1);
  }
}

validateEnv();

// Input validation
function validatePrompt(prompt) {
  return typeof prompt === 'string' && 
         prompt.trim().length > 0 && 
         prompt.length <= 1000;
}

// Helper function for OpenAI API calls
async function callOpenAI(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to process request with OpenAI');
  }
}

app.post('/updateStaticPrompt', async (req, res) => {
  try {
    // Add debug logging
    console.log('Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      OPENAI_API_KEY: OPENAI_API_KEY  ? 'Present' : 'Missing',
      PORT: process.env.PORT
    });
    console.log('Received prompt:', req.body.prompt);

    // Check if API key is available
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    const { prompt } = req.body;
    
    // Log the request to OpenAI
    console.log('Sending request to OpenAI...');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Received response from OpenAI');
    res.json(response.data);
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

// Route handler for non-static prompt
app.post('/updateNonStaticPrompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!validatePrompt(prompt)) {
      return res.status(400).json({ 
        error: 'Invalid prompt. Must be a string between 1 and 1000 characters.' 
      });
    }

    const assistantName = "GourmetBot";
    const fullPrompt = `You are ${assistantName}. ${prompt}`;
    const nonStaticPromptPath = path.join(__dirname, 'userPrompt.txt');

    // Write prompt to file
    await fs.writeFile(nonStaticPromptPath, fullPrompt, 'utf8');
    
    // Call OpenAI API
    const apiResponse = await callOpenAI(fullPrompt);
    
    res.json(apiResponse);
  } catch (error) {
    console.error('Error in /updateNonStaticPrompt:', error);
    res.status(500).json({ 
      error: 'An internal server error occurred',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('API Key status:', {
    exists: !!OPENAI_API_KEY,
    length: OPENAI_API_KEY ?.length || 0
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});