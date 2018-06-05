'use strict';

const express = require('express');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

app.use('/api/stream', express.static('stream'))

app.get('/api/hello', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);

console.log(`Server running at http://${HOST}:${PORT}`);