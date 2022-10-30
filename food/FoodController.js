var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var food = require("./Food");
var foodHelper = require("./food_helper");
var userHelper = require("../authValidation/userHelper");

// CREATES A NEW food

router.post("/food", VerifyToken, async function (req, res) {
  //   console.log(req);
  await userHelper.getUserDetails(req.userId).then((user) => {
    console.log(user);
    if (user.statusCode === 200) {
      foodHelper.createfood(req.body, user.result).then((response) => {
        console.log(response);
        res.status(200).send(response);
      });
    } else {
      res
        .status(200)
        .send({ message: "please login and create food", statusCode: 401 });
    }
  });
});

// RETURNS ALL THE foods IN THE DATABASE
router.get("/getallfoods", VerifyToken, async function (req, res) {
  await foodHelper.getAllfoods().then((response) => {
    res.status(200).send(response);
  });
});
router.get("/getfoods", VerifyToken, async function (req, res) {
  await foodHelper.getAllYourfoods(req.userId).then((response) => {
    res.status(200).send(response);
  });
});

// GETS A SINGLE food FROM THE DATABASE
router.get("/getfood/:id", VerifyToken, async function (req, res) {
  await foodHelper.getfoodById(req.params.id).then((response) => {
    res.status(200).send(response);
  });
});

// SEARCH

router.get("/search/:id", VerifyToken, async function (req, res) {
  await foodHelper.searchSkills(req.params.id).then((response) => {
    res.status(200).send(response);
  });
});

// DELETES A food FROM THE DATABASE
router.delete("/deletefood/:id", VerifyToken, async function (req, res) {
  await foodHelper.deletefoodByID(req.params.id).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send({
        message: "food: " + response.result + " was deleted.",
        statusCode: 200,
      });
    } else {
      res.status(200).send(response);
    }
  });
});

// UPDATES A SINGLE food IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated food can put to this route
router.put("/updatefood/:id", VerifyToken, async function (req, res) {
  await foodHelper.updatefood(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  });
});

router.post("/searchwithlocation", VerifyToken, async function (req, res) {
  console.log(req.body);
  await foodHelper
    .searchwithLocation(req.body.text, req.body.location)
    .then((response) => {
      res.status(200).send(response);
    });
});

router.post("/getProfileMatchPercentage", VerifyToken, async function (
  req,
  res
) {
  console.log(req.body);
  await foodHelper.getProfileMatchBattery(body).then((response) => {
    res.status(200).send(response);
  });
});

module.exports = router;
