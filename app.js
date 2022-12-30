var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

var authRouter = require("./routes/auth/auth");
var adminRoute = require("./routes/adminRoutes");
var searchRoute = require("./routes/searchRoutes");
var userRouter = require("./routes/userRoutes");
var productRouter = require("./routes/productRoutes");
var storeRouter = require("./routes/storeRoutes");

global.__basedir = __dirname + "/";

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/search", searchRoute);
// app.use("/admin", adminRoute); //using
app.use('/api/user', userRouter);
app.use("/api/products", productRouter);
app.use("/api/store", storeRouter);

// mongoose.connect('mongodb://localhost:27017/albi').then(()=>{
mongoose.connect('mongodb://127.0.0.1:27017/kabe').then(()=>{
  console.log("Database connected...");
});

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
