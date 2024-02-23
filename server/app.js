var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')

var apiRouter = require('./routes/api')
var chatRouter = require('./routes/chat')
var adminRouter = require('./routes/admin')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoDB = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"))


app.use(cors())

app.use('/api', apiRouter);
app.use('/chat', chatRouter);
app.use('/admin', adminRouter), 

module.exports = app;
