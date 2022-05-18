//Packages
const express = require('express');
const { json } = require('body-parser');
const createMail = require('./routes/mail');
const createTemplate = require('./routes/template');
const { urlencoded } = require('express');
const morgan = require('morgan');

//Express instance
const app = express();

//Middlewares
app.use(json());
app.use(urlencoded({extended:true}));
app.use(morgan('tiny'))

//Middlewares to send email
app.use(createMail);
app.use(createTemplate);

//Export app
module.exports = app;