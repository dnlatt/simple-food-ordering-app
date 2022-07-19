const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body } = require('express-validator');
const app = express();

app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());

// Cross site
app.use(cors());

app.use(bodyParser.json({ limit: '50mb'}));
app.use(body.urlencode({ limit: '50mb', extended: false }));

require('./routes')(app);

module.exports = app; 