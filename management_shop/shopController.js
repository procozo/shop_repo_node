var express = require("express");
var shopRouter = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
shopRouter.use(bodyParser.json());
var shop = require("./Shop");
var foodHelper = require("./shop_helper");
var userHelper = require("../authValidation/userHelper");
let globlData = [];
// CREATES A NEW food

shopRouter.post("/shop", async function (req, res) {
  console.log(req.body);
  // await userHelper.getUserDetails(req.userId).then((user) => {
  //   console.log(user);
  // if (user.statusCode === 200) {
  foodHelper.createshop(req.body, null).then((response) => {
    console.log(response);
    res.status(200).send(response);
  });
  // } else {
  //   res
  //     .status(200)
  //     .send({ message: "please login and create food", statusCode: 401 });
  // }
  // });
});

// RETURNS ALL THE foods IN THE DATABASE
// VerifyToken;
shopRouter.get("/getAllShops", async function (req, res) {
  await foodHelper.getAllshops().then((response) => {
    res.status(200).send(response);
  });
});

shopRouter.post("/updateShop", async function (req, res) {
  await foodHelper.updateshopDetails(req.body).then((response) => {
    if (response) {
      res.status(200).send({
        message: "updated the data succesfully for" + req.body._id,
        status_code: 200,
      });
    } else {
    }
  });
});

shopRouter.get("/getTanentInformation", async function (req, res) {
  await foodHelper.getAllshops().then((response) => {
    if (response) {
      res
        .status(200)
        .send({ message: "updated the data succesfully", status_code: 200 });
    } else {
    }
  });
});

shopRouter.post("/getrentalInformation", async function (req, res) {
  await foodHelper.getRentalInfo(req.body).then((response) => {
    if (response) {
      res.status(200).send({
        message: "data succesfully",
        status_code: 200,
        data: response,
      });
    } else {
    }
  });
});

// shopRouter.get("/getfoods", VerifyToken, async function (req, res) {
//   await foodHelper.getAllYourfoods(req.userId).then((response) => {
//     res.status(200).send(response);
//   });
// });

// GETS A SINGLE food FROM THE DATABASE
shopRouter.post("/getShop", async function (req, res) {
  await foodHelper.getshopById(req.body.id).then((response) => {
    res.status(200).send(response);
  });
});

shopRouter.post("/getShopByName", async function (req, res) {
  try {
    await foodHelper.getshopByName(req.body.name).then((response) => {
      res.status(200).send(response);
    });
  } catch (error) {
    console.log(error);
  }
});

// rentalHistory;

shopRouter.post("/rentalHistory", async function (req, res) {
  await foodHelper.rentalHistory(req.body.name).then((response) => {
    res.status(200).send(response);
  });
});

// accessModifier;
shopRouter.post("/accessModifier", async function (req, res) {
  await foodHelper.accessModifier(req.body).then((response) => {
    res.status(200).send(response);
  });
});

// pendingRent
shopRouter.post("/pendingRent", async function (req, res) {
  await foodHelper.pendingRent(req.body).then((response) => {
    res.status(200).send(response);
  });
});
//rentalHistoryOnSelection
shopRouter.post("/rentalHistoryOnSelection", async function (req, res) {
  try {
    console.log("checking", req.body);
    let data = req.body;
    for (let i = 0; i < Math.abs(data.endMonth - data.startMonth); i++) {
      console.log(i);
      await foodHelper
        .rentalHistoryOnSelection(Number(data.startMonth) + i)
        .then((response) => {
          globlData.push(response);
        });
    }
    res.status(200).send({ status_code: 200, result: globlData });
    globlData = [];
  } catch (error) { }
});

// totalRent
shopRouter.post("/totalRent", async function (req, res) {
  await foodHelper.totalRent(req.body).then((response) => {
    res.status(200).send(response);
  });
});

// SEARCH

shopRouter.get("/search/:id", VerifyToken, async function (req, res) {
  await foodHelper.searchSkills(req.params.id).then((response) => {
    res.status(200).send(response);
  });
});

// DELETES A food FROM THE DATABASE
shopRouter.delete("/deleteShop/:id", VerifyToken, async function (req, res) {
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
shopRouter.put("/updateShop/:id", VerifyToken, async function (req, res) {
  await foodHelper.updatefood(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  });
});

shopRouter.post("/searchwithlocation", VerifyToken, async function (req, res) {
  console.log(req.body);
  await foodHelper
    .searchwithLocation(req.body.text, req.body.location)
    .then((response) => {
      res.status(200).send(response);
    });
});

shopRouter.post(
  "/getProfileMatchPercentage",
  VerifyToken,
  async function (req, res) {
    console.log(req.body);
    await foodHelper.getProfileMatchBattery(body).then((response) => {
      res.status(200).send(response);
    });
  }
);

module.exports = shopRouter;

/**
 *
 *
 * Routes
 *
 * /creatShop - F - D
 * /updateShop - F - D
 * /AddTanent - F  - D
 * /updateTanent - F - D
 * /shopHistory - F - D
 *
 * /getShop - F - D
 *
 * /addRent - F - D
 *
 * /rentalHistory - F
 *
 *
 * /pendingRent - F
 *
 *
 *
 */

/**
 *
 *
 * Routes
 *
 * /createChoultry
 *
 *
 * /addWedding - F
 *  + payment details (agrred + Paid) (+add)
 * /updateWedding - F
 *  + payment details
 *
 *
 *
 *
 *
 *
 *
 *
 */
