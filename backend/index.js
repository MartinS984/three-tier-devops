const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Health Check Endpoint (Vital for K8s Probes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// 2. Basic API Route
app.get('/api/v1/welcome', (req, res) => {
  res.json({ message: "Hello from the Node.js Backend!" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});