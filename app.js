require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mailchimp = require('mailchimp-api-v3');

const app = express();
const port = 3001; // Match this with your React backend port

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY || 'not-configured'); // Replace with your API key

app.post('/subscribe', async (req, res) => {
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID) return res.status(503).send('Newsletter is not configured');
    const { email } = req.body;
    try {
        await mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, { // Use your List ID here
            email_address: email,
            status: 'subscribed'
        });
        res.status(200).send('Subscribed successfully');
    } catch (error) {
        res.status(400).send('Subscription failed');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});