const express = require('express'),

    http = require('http');
const morgan = require('morgan');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public'))); // This is to serve static files in public folder. __dirname denotes root of the folder

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});