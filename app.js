const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

console.log(
  'VERIFY_TOKEN:',
  verifyToken ? 'LOADED' : 'MISSING'
);
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook Server is running');
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('--- WEBHOOK VERIFICATION ---');
  console.log('Mode:', mode);
  console.log('Received token:', token);
  console.log('Configured token:', verifyToken);
  console.log('Challenge:', challenge);

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  }

  console.log('WEBHOOK VERIFICATION FAILED');
  return res.status(403).send('Verification failed');
});

app.post('/webhook', (req, res) => {
  console.log('Webhook received');
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
