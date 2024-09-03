const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mailchimp = require('mailchimp-api-v3');

const app = express();
const port = 3001; // Match this with your React backend port

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const mailchimp = new Mailchimp('92f7bf3382dd5a856be21a244b590829-us17'); // Replace with your API key

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        await mailchimp.post(`/lists/99de8cd02e/members`, { // Use your List ID here
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