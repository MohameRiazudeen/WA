// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Normal homepage
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook Server is running 🚀');
});
/*
// WhatsApp webhook verification
app.get('/webhook', (req, res) => {
  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': token
  } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});
*/
app.get('/webhook', (req, res) => {
  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': token
  } = req.query;

  console.log('Mode:', mode);
  console.log('Received token:', token);
  console.log('Environment token exists:', !!verifyToken);
  console.log('Tokens match:', token === verifyToken);

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Verification failed');
  }
});
// Receive WhatsApp webhook messages
app.post('/webhook', (req, res) => {
  const timestamp = new Date()
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);

  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
