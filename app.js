var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')
const morgan=require(morgan)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const morgan = require('morgan');

var app = express();
require('dotenv').config

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(morgan('dev'))

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
