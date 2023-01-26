"use strict";

let createError = require('http-errors');
let express = require('express');
let mongoose = require("mongoose");
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let generateQrCodeRouter = require('./routes/generate');
let downloadQrCodeRouter = require('./routes/download');
let listQrCodeRouter = require('./routes/list');

let app = express();

// Connect to mongodb server.
mongoose.connect('mongodb://mongo:27017/qrCodesDB', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/lib/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));

app.use('/', indexRouter);
app.use('/generate', generateQrCodeRouter);
app.use('/download', downloadQrCodeRouter);
app.use('/list', listQrCodeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
