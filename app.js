const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('./socket-handler')
 require('dotenv').config(); // تحميل متغيرات البيئة

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/commnt');
const likeRouter = require('./routes/like');
const FollowersRouter = require('./routes/followers');
 

const app = express();
 // ربط Socket.io بالخادم

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// التعامل مع اتصالات Socket.io

// تعريف مسارات التوجيه
// تم تعديل المسار هنا

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/followers', FollowersRouter);

// استماع الخادم على منفذ 8080
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:8080');
  })

module.exports = { app};
