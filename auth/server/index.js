// Main starting point
// require instead of import, older version
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');


// DB setup
// mongoose.createConnection('mongodb://localhost:27017/auth')

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true })
    .then(() => console.log('connected to mongo'))
    .catch(err => console.log(err))




// App setup            // .use -> middleware
app.use(morgan('combined'));        // morgan basically for debugging. Logs.
app.use(cors());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*'}));   // parse incoming request, to json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ', port)

// with nodemon installed, we don't have to restart the server after every change made

