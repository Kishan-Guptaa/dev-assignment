const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

console.log("Connecting to:", connectionString);

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log("Success! Connected to Neon PostgreSQL database.");
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log("Current Time from DB:", res.rows[0]);
    return client.end();
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
