var express = require("express");
var ChoultryRouter = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
ChoultryRouter.use(bodyParser.json());
var choultry = require("./Choultry");
var foodHelper = require("./Choultry_helper");
var userHelper = require("../authValidation/userHelper");
let globlData = [];
// CREATES A NEW food

ChoultryRouter.post("/Choultry", async function (req, res) {
  console.log(req.body);
  // await userHelper.getUserDetails(req.userId).then((user) => {
  //   console.log(user);
  // if (user.statusCode === 200) {
  foodHelper.createChoultry(req.body, null).then((response) => {
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
ChoultryRouter.get("/getAllChoultrys", async function (req, res) {
  await foodHelper.getAllChoultrys().then((response) => {
    res.status(200).send(response);
  });
});

ChoultryRouter.post("/updateChoultry", async function (req, res) {
  await foodHelper.updateChoultryDetails(req.body).then((response) => {
    if (response) {
      res.status(200).send({
        message: "updated the data succesfully for" + req.body._id,
        status_code: 200,
      });
    } else {
    }
  });
});

ChoultryRouter.get("/getTanentInformation", async function (req, res) {
  await foodHelper.getAllChoultrys().then((response) => {
    if (response) {
      res
        .status(200)
        .send({ message: "updated the data succesfully", status_code: 200 });
    } else {
    }
  });
});

ChoultryRouter.post("/getrentalInformation", async function (req, res) {
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

// ChoultryRouter.get("/getfoods", VerifyToken, async function (req, res) {
//   await foodHelper.getAllYourfoods(req.userId).then((response) => {
//     res.status(200).send(response);
//   });
// });

// GETS A SINGLE food FROM THE DATABASE
ChoultryRouter.post("/getChoultry", async function (req, res) {
  await foodHelper.getChoultryById(req.body.id).then((response) => {
    res.status(200).send(response);
  });
});

ChoultryRouter.post("/getChoultryByName", async function (req, res) {
  try {
    await foodHelper.getChoultryByName(req.body.name).then((response) => {
      res.status(200).send(response);
    });
  } catch (error) {
    console.log(error);
  }
});

// rentalHistory;

ChoultryRouter.post("/rentalHistory", async function (req, res) {
  await foodHelper.rentalHistory(req.body.name).then((response) => {
    res.status(200).send(response);
  });
});

// accessModifier;
ChoultryRouter.post("/accessModifier", async function (req, res) {
  await foodHelper.accessModifier(req.body).then((response) => {
    res.status(200).send(response);
  });
});

// pendingRent
ChoultryRouter.post("/pendingRent", async function (req, res) {
  await foodHelper.pendingRent(req.body).then((response) => {
    res.status(200).send(response);
  });
});
//rentalHistoryOnSelection
ChoultryRouter.post("/rentalHistoryOnSelection", async function (req, res) {
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
  } catch (error) {}
});

// totalRent
ChoultryRouter.post("/totalRent", async function (req, res) {
  await foodHelper.totalRent(req.body).then((response) => {
    res.status(200).send(response);
  });
});

// SEARCH

ChoultryRouter.get("/search/:id", VerifyToken, async function (req, res) {
  await foodHelper.searchSkills(req.params.id).then((response) => {
    res.status(200).send(response);
  });
});

// DELETES A food FROM THE DATABASE
ChoultryRouter.delete(
  "/deleteChoultry/:id",
  VerifyToken,
  async function (req, res) {
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
  }
);

// UPDATES A SINGLE food IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated food can put to this route
ChoultryRouter.put(
  "/updateChoultry/:id",
  VerifyToken,
  async function (req, res) {
    await foodHelper.updatefood(req.params.id, req.body).then((response) => {
      if (response.statusCode === 200) {
        res.status(200).send(response);
      } else {
        res.status(500).send(response);
      }
    });
  }
);

ChoultryRouter.post(
  "/searchwithlocation",
  VerifyToken,
  async function (req, res) {
    console.log(req.body);
    await foodHelper
      .searchwithLocation(req.body.text, req.body.location)
      .then((response) => {
        res.status(200).send(response);
      });
  }
);

ChoultryRouter.post(
  "/getProfileMatchPercentage",
  VerifyToken,
  async function (req, res) {
    console.log(req.body);
    await foodHelper.getProfileMatchBattery(body).then((response) => {
      res.status(200).send(response);
    });
  }
);

module.exports = ChoultryRouter;

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
