const env = require('dotenv');

env.config({
  path: './.env',
});

const express = require('express');
const cors = require('cors');
const database = require('./database/connect');

const app = express();
// create connection to mongodb
database();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', require('./routes'));

module.exports = app;
