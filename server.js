// INFO 350 Practice 11: Deployment
// Simple Express server for Esaias Adhanom's dashboard project

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the files in this project folder
app.use(express.static(__dirname));

// Send the dashboard homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dashboard app is running on port ${PORT}`);
});
