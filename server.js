// INFO 350 Practice 12: Environment Variables
// Express server for Esaias Adhanom's deployed dashboard project

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variable used for Practice 12
const greeting = process.env.GREETING || 'Hello from my deployed app!';

// Serve the files in this project folder
app.use(express.static(__dirname));

// Send the dashboard homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Practice 12 API route that shows the environment variable
app.get('/api/message', (req, res) => {
  res.json({ message: greeting });
});

app.listen(PORT, () => {
  console.log(`Dashboard app is running on port ${PORT}`);
});
