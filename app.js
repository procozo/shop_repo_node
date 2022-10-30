"use strict";
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var httpContext = require("express-http-context");
var cors = require("cors");
var app = express();
var db = require("./db");
global.__root = __dirname + "/";
// app.use(express.json());
// app.use(cookieParser());

// app.use(httpContext.middleware);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
var AuthController = require("./auth/AuthController");
var demo = require("./auth/demoController");

var FoodController = require("./food/FoodController");

var UserController = require("./user/UserController");

var choultryController = require("./choultry/choultryController");

var otpController = require("./auth/otpController");
var notificationController = require("./notification/NotificationController");

/**
 *
 * Shop
 */
var ShopController = require("./management_shop/shopController");

app.use(cors());

app.get("/api", function (req, res) {
  res.status(200).send("API works.");
});
app.use("/api/demo", demo);

app.use("/api/auth", AuthController);

// app.use("/api/otp", otpController);

app.use("/api/users", UserController);

app.use("/api/food", FoodController);

app.use("/api/shop", ShopController);

app.use("/api/choultry", choultryController);

// app.use("/api/notification", notificationController);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
