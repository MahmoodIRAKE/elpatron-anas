const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'build')));

// For any request, send back React's index.html file.
// This supports client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the port that Heroku provides or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
