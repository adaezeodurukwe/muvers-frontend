const express = require('express');
const path = require('path');
const { log } = console;
const app = express();
app.use(express.static(path.resolve(__dirname, './build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});
const port = process.env.PORT || 4040;
app.listen(port, () => log("Running on port", port));