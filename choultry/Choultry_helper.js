var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// var env = require("../env/config");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Choultry = require("./Choultry");
let ChoultryPerticularData = [];
var totalArray = [];
module.exports = {
  createChoultry: (data, user) => {
    // console.log(data);
    return new Promise((resolve, reject) => {
      Choultry.create(data, function (err, Choultry) {
        if (err) resolve(err);
        resolve({ message: "success", statusCode: 200, result: Choultry });
      });
      //   resolve(data);
    }).catch((err) => console.error(err));
  },
  updateChoultryDetails: (data) => {
    try {
      // console.log(data._id);
      return new Promise((resolve, reject) => {
        // console.log("promise");
        Choultry.findByIdAndUpdate(
          { _id: data._id },
          data,
          function (err, doc) {
            if (err) {
              // err: any errors that occurred
              console.log(err);
              resolve(false);
            } else {
              // doc: the document before updates are applied if `new: false`
              // console.log(doc); // , the document returned after updates if `new  true`
              // console.log(doc.Info);
              resolve(true);
            }
          }
        );
      });
    } catch (error) {}
  },
  getRentalInfo: (data) => {
    try {
      // console.log(data);
      return new Promise((resolve, reject) => {
        Choultry.find(function (err, Choultry) {
          if (err) {
          } else {
            if (Choultry) {
              let rental = [];
              Choultry.map((res) => {
                res.Choultry.map((Choultry) => {
                  console.log(Choultry);
                });
              });

              resolve(
                Choultry[data.Choultry].rental_details
                  ? Choultry[data.Choultry].rental_details
                  : false
              );
            }
          }
        });
      });
    } catch (error) {}
  },
  getAllChoultrys: () => {
    var usersProjection = {
      _id: true,
    };
    return new Promise((resolve, reject) => {
      Choultry.find(
        {},
        // { Choultry_name: 1 },
        // usersProjection,
        // "_id",
        // "ChoultryName",
        // "ChoultryType",
        // "price",
        // "aboutDish",
        // "quantity",
        // "rating",
        // "description",
        // "imgUrl",
        // "ChoultryVerient",
        // "availability",
        function (err, Choultrys) {
          if (err) resolve(err);
          console.log(Choultrys);
          resolve(Choultrys);
        }
      );
    }).catch((err) => reject(err));
  },
  getAllYourChoultrys: (userId) => {
    ChoultryPerticularData = [];
    console.log(userId);
    return new Promise((resolve, reject) => {
      //   console.log(Choultry.find({}).project({ _id: 1 }).toArray());

      Choultry.find({}, function (err, Choultrys) {
        if (err) resolve(err);
        Choultrys.map((val) => {
          //   console.log(val.createdBy._id, userId);
          if (String(val.createdBy._id) === String(userId))
            ChoultryPerticularData.push(val);
          // console.log(String(val.createdBy._id) === String(userId));
        });
        // console.log(ChoultryPerticularData);
        resolve({
          message: "success",
          statusCode: 200,
          result: ChoultryPerticularData,
        });
      });
    }).catch((err) => reject(err));
  },

  getChoultryById: (ChoultryId) => {
    console.log(ChoultryId);
    return new Promise((resolve, reject) => {
      Choultry.findById(ChoultryId, function (err, Choultrys) {
        console.log(Choultrys);
        if (err) resolve(err);
        if (!Choultrys) resolve({ message: "not found", statusCode: 404 });
        resolve(Choultrys);
      });
    }).catch((err) => console.log(err));
  },
  getChoultryByName: (ChoultryName) => {
    // console.log(ChoultryName);
    return new Promise((resolve, reject) => {
      Choultry.find({ Choultry_name: ChoultryName }, function (err, Choultrys) {
        console.log(Choultrys);
        if (err) resolve(err);
        if (!Choultrys) resolve({ message: "not found", statusCode: 404 });
        resolve(Choultrys);
      });
    }).catch((err) => console.log(err));
  },

  rentalHistory: (ChoultryId) => {
    // console.log(ChoultryId);
    return new Promise((resolve, reject) => {
      Choultry.find(
        {},
        { Choultry_name: 1, rental_details: 1 },
        function (err, Choultrys) {
          console.log(Choultrys);
          if (err) resolve(err);
          if (!Choultrys) resolve({ message: "not found", statusCode: 404 });
          resolve(Choultrys);
        }
      );
    }).catch((err) => console.log(err));
  },

  accessModifier: (accessArray) => {
    console.log(accessArray);
    return new Promise((resolve, reject) => {
      Choultry.find({}, accessArray, function (err, Choultrys) {
        // console.log(Choultrys);
        if (err) resolve(err);
        if (!Choultrys) resolve({ message: "not found", statusCode: 404 });
        resolve(Choultrys);
      });
    }).catch((err) => console.log(err));
  },

  // pendingRent
  pendingRent: (data) => {
    console.log("searchinbg for month" + data.month);
    return new Promise((resolve, reject) => {
      Choultry.find(
        {},
        {
          Choultry_name: 1,
          rental_details: 1,
        },
        function (err, Choultrys) {
          if (err) resolve(err);
          if (!Choultrys) resolve({ message: "not found", statusCode: 404 });

          if (Choultrys) {
            let pendingRentChoultrys = [];
            Choultrys.map((res) => {
              if (res.rental_details.rental_history["" + data.month + ""]) {
                if (
                  res.rental_details.rental_history["" + data.month + ""]
                    .status !== "paid"
                ) {
                  pendingRentChoultrys.push(res);
                }
              } else {
                pendingRentChoultrys.push(res);
              }
            });
            resolve(pendingRentChoultrys);
          }
        }
      );
    }).catch((err) => console.log(err));
  },

  rentalHistoryOnSelection: (data) => {
    // console.log(data);

    // console.log("searchinbg for month" + data.startMonth, data.endMonth);
    return new Promise((resolve, reject) => {
      // console.log(Math.abs(data.endMonth - data.startMonth));
      let findString = "";
      let rentalHistoryData = [];
      let demo = "none";
      // for (let i = 0; i < Math.abs(data.endMonth - data.startMonth); i++) {
      findString = "rental_details.rental_history." + data;
      let total = 0;
      let finalObj = [];

      // console.log(findString);
      Choultry.find(
        {
          [findString]: { $exists: true },
        },

        (err, Choultrys) => {
          if (err) resolve(err);
          if (!Choultrys) resolve({ message: "not found", statusCode: 404 });

          if (Choultrys) {
            rentalHistoryData = [];

            Choultrys.map((res) => {
              total =
                total +
                Number(
                  res.rental_details.rental_history["" + data + ""].amount
                );
              rentalHistoryData.push({
                data: res,

                value: res.rental_details.rental_history["" + data + ""],
              });
            });
            finalObj = {
              rentalHistoryData,
              ChoultryTotal: total,
              month: data,
            };
            demo = "data";
            totalArray.push(finalObj);
            resolve(finalObj);
          }
          // console.log(totalArray);
        },
        this
      );
      totalArray = [];
    }).catch((err) => console.log(err));
  },

  totalRent: (data) => {
    // console.log(data);
    return new Promise((resolve, reject) => {
      let findString = "rental_details.rental_history." + data.month;
      let notPaidChoultryList = [];
      let totalRent = 0;
      let agreedAmount = 0;
      Choultry.find(
        {
          [findString]: { $exists: false },
        },
        {
          Choultry_name: 1,
          rental_details: 1,
        },
        function (err, unpaidChoultrys) {
          if (err) resolve(err);
          if (!unpaidChoultrys)
            resolve({ message: "not found", statusCode: 404 });

          if (unpaidChoultrys) {
            notPaidChoultryList = unpaidChoultrys;
            unpaidChoultrys.map((res) => {
              agreedAmount =
                agreedAmount + Number(res.rental_details.retal_agreed);
            });
          }
          Choultry.find(
            {
              [findString]: { $exists: true },
            },
            {
              Choultry_name: 1,
              rental_details: 1,
            },
            function (err, Choultrys) {
              if (err) resolve(err);
              if (!Choultrys)
                resolve({ message: "not found", statusCode: 404 });

              if (Choultrys) {
                Choultrys.map((res) => {
                  totalRent =
                    totalRent +
                    Number(
                      res.rental_details.rental_history["" + data.month + ""]
                        .amount
                    );

                  agreedAmount =
                    agreedAmount + Number(res.rental_details.retal_agreed);
                });
                resolve({
                  message: "total",
                  agreed: agreedAmount,
                  total: totalRent,
                  totalNumberOdpaidChoultrys: Choultrys.length,
                  totalNumberOdUnpaidChoultrys: notPaidChoultryList.length,
                  notPaidChoultryList: notPaidChoultryList,
                  paidChoultrys: Choultrys,
                  statusCode: 200,
                });
                // resolve(totalRent);
              }
            }
          );
        }
      );
    }).catch((err) => console.log(err));
  },
  deleteChoultryByID: (ChoultryId) => {
    return new Promise((resolve, reject) => {
      Choultry.findByIdAndRemove(ChoultryId, function (err, Choultry) {
        console.log("Choultry is", Choultry);
        if (err) resolve(err);
        if (Choultry === null) {
          resolve({ message: "not found", statusCode: 404 });
        } else {
          resolve({
            message: "success",
            statusCode: 200,
            result: Choultry._id,
          });
        }
      }).catch((err) => reject(err));
    });
  },
  updateChoultry: (id, data) => {
    return new Promise((resolve, reject) => {
      Choultry.findByIdAndUpdate(
        id,
        data,
        { new: true },
        function (err, Choultry) {
          if (err) resolve(err);
          resolve({ message: "success", statusCode: 200, result: Choultry });
        }
      );
    });
  },

  searchSkills: (text) => {
    console.log(text);
    // var queryCond = {};
    // if (query.role) {
    //   queryCond.name = { $regex: text, $options: "i" };
    // }
    // if (query.skillset) {
    //   queryCond.city = text;
    // }
    return new Promise(async (resolve, reject) => {
      let regex = new RegExp(text, "i");
      await Choultry.find(
        {
          $and: [
            {
              $or: [
                { ChoultryType: regex },
                { ChoultryName: regex },
                { ChoultryVarient: regex },
              ],
            },
          ],
        },
        async function (err, Choultry) {
          if (err) resolve(err);
          if (!Choultry) resolve({ message: "not found", statusCode: 404 });
          resolve(Choultry);
        }
      );
    }).catch((err) => reject(err));
  },

  //   search with location
  searchwithLocation: (skill, location) => {
    console.log(skill, location);
    console.log(skill.length);
    return new Promise(async (resolve, reject) => {
      let skillset = new RegExp(skill, "i");
      let locationdoor = new RegExp(location, "i");
      await Choultry.find(
        {
          $and: [
            {
              $or: [{ skillset: skillset }, { jobLocation: locationdoor }],
            },
          ],
        },
        "role skillset companyName timeStamp jobLocation",
        async function (err, Choultry) {
          if (err) resolve(err);
          if (!Choultry) resolve({ message: "not found", statusCode: 404 });
          resolve(Choultry);
        }
      );
    }).catch((err) => reject(err));
  },
  getProfileMatchBattery: (data) => {},
};
