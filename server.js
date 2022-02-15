const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('./dist/epam-steam'));
app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/epam-steam/'}),
);

app.listen(process.env.PORT || 5000);
