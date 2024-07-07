var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
const cors=require('cors')
const db=require('./models/DB')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postRouter=require('./routes/post')
const commentRouter=require('./routes/commnt')
const likeRouter=require('./routes/like')
const models=require('./models')
var app = express();
require('dotenv').config

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post',postRouter)
app.use('/comment',commentRouter)
app.use('/like',likeRouter)
app.listen(8080)
module.exports = app;
