const express = require('express'),
    http = require('http');
const morgan = require('morgan');
const path = require('path');
const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();



app.use('/dishes', dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leaders',leaderRouter);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public'))); // This is to serve static files in public folder. __dirname denotes root of the folder

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});