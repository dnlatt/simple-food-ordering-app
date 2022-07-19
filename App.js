const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('dotenv').config()

app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());

// Cross site
app.use(cors());

app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

require('./routes')(app);

module.exports = app; 