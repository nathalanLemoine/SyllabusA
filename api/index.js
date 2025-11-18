const express = require('express');
const client = require('prom-client');

const app = express();

app.use(cors()); 

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
const register = client.register;

app.get('/api', (req, res) => res.json({ message: 'API OK' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`API listening on ${port}`));