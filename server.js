require('dotenv').config();
const express = require('express');
const { handler } = require('./netlify/functions/chat');
const app = express();
app.use(express.json({ limit: '32kb' }));
app.all('/.netlify/functions/chat', async (req, res) => {
  const result = await handler({ httpMethod: req.method, headers: req.headers, body: JSON.stringify(req.body) });
  res.status(result.statusCode).set(result.headers).send(result.body);
});
app.get('/health', (req, res) => res.json({ status: 'healthy' }));
app.use((error, req, res, next) => res.status(error.status || 500).json({ error: 'Invalid request.' }));
if (require.main === module) {
  app.listen(process.env.PORT || 5001, '127.0.0.1', () => console.log('Local recipe API ready. Start the React app in a second terminal.'));
}
module.exports = app;
