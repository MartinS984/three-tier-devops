const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import pg driver
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION CONFIGURATION
// These variables will come from Kubernetes Env Vars
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'threetierdb',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// 1. Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// 2. Basic API Route
app.get('/api/v1/welcome', (req, res) => {
  res.json({ message: "Hello from the Node.js Backend!" });
});

// 3. NEW ROUTE: Fetch users from Database
app.get('/api/v1/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});