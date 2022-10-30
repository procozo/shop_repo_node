var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// var env = require("../env/config");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Shop = require("./Shop");
let shopPerticularData = [];
var totalArray = [];
module.exports = {
  createshop: (data, user) => {
    // console.log(data);
    return new Promise((resolve, reject) => {
      Shop.create(data, function (err, shop) {
        if (err) resolve(err);
        resolve({ message: "success", statusCode: 200, result: shop });
      });
      //   resolve(data);
    }).catch((err) => console.error(err));
  },
  updateshopDetails: (data) => {
    try {
      // console.log(data._id);
      return new Promise((resolve, reject) => {
        // console.log("promise");
        Shop.findByIdAndUpdate({ _id: data._id }, data, function (err, doc) {
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
        });
      });
    } catch (error) { }
  },
  getRentalInfo: (data) => {
    try {
      // console.log(data);
      return new Promise((resolve, reject) => {
        Shop.find(function (err, shop) {
          if (err) {
          } else {
            if (shop) {
              let rental = [];
              shop.map((res) => {
                res.shop.map((shop) => {
                  console.log(shop);
                });
              });

              resolve(
                shop[data.shop].rental_details
                  ? shop[data.shop].rental_details
                  : false
              );
            }
          }
        });
      });
    } catch (error) { }
  },
  getAllshops: () => {
    var usersProjection = {
      _id: true,
    };
    return new Promise((resolve, reject) => {
      Shop.find(
        {},
        // { shop_name: 1 },
        // usersProjection,
        // "_id",
        // "shopName",
        // "shopType",
        // "price",
        // "aboutDish",
        // "quantity",
        // "rating",
        // "description",
        // "imgUrl",
        // "shopVerient",
        // "availability",
        function (err, shops) {
          if (err) resolve(err);
          console.log(shops);
          resolve(shops);
        }
      );
    }).catch((err) => reject(err));
  },
  getAllYourshops: (userId) => {
    shopPerticularData = [];
    console.log(userId);
    return new Promise((resolve, reject) => {
      //   console.log(shop.find({}).project({ _id: 1 }).toArray());

      shop.find({}, function (err, shops) {
        if (err) resolve(err);
        shops.map((val) => {
          //   console.log(val.createdBy._id, userId);
          if (String(val.createdBy._id) === String(userId))
            shopPerticularData.push(val);
          // console.log(String(val.createdBy._id) === String(userId));
        });
        // console.log(shopPerticularData);
        resolve({
          message: "success",
          statusCode: 200,
          result: shopPerticularData,
        });
      });
    }).catch((err) => reject(err));
  },

  getshopById: (shopId) => {
    console.log(shopId);
    return new Promise((resolve, reject) => {
      Shop.findById(shopId, function (err, shops) {
        console.log(shops);
        if (err) resolve(err);
        if (!shops) resolve({ message: "not found", statusCode: 404 });
        resolve({ message: "found", data: shops, statusCode: 200 });
      });
    }).catch((err) => console.log(err));
  },
  getshopByName: (shopName) => {
    // console.log(shopName);
    return new Promise((resolve, reject) => {
      Shop.find({ shop_name: shopName }, function (err, shops) {
        console.log(shops);
        if (err) resolve(err);
        if (!shops) resolve({ message: "not found", statusCode: 404 });
        resolve(shops);
      });
    }).catch((err) => console.log(err));
  },

  rentalHistory: (shopId) => {
    // console.log(shopId);
    return new Promise((resolve, reject) => {
      Shop.find({}, { shop_name: 1, rental_details: 1 }, function (err, shops) {
        console.log(shops);
        if (err) resolve(err);
        if (!shops) resolve({ message: "not found", statusCode: 404 });
        resolve(shops);
      });
    }).catch((err) => console.log(err));
  },

  accessModifier: (accessArray) => {
    console.log(accessArray);
    return new Promise((resolve, reject) => {
      Shop.find({}, accessArray, function (err, shops) {
        // console.log(shops);
        if (err) resolve(err);
        if (!shops) resolve({ message: "not found", statusCode: 404 });
        resolve(shops);
      });
    }).catch((err) => console.log(err));
  },

  // pendingRent
  pendingRent: (data) => {
    console.log("searchinbg for month" + data.month);
    return new Promise((resolve, reject) => {
      Shop.find(
        {},
        {
          shop_name: 1,
          rental_details: 1,
        },
        function (err, shops) {
          if (err) resolve(err);
          if (!shops) resolve({ message: "not found", statusCode: 404 });

          if (shops) {
            let pendingRentShops = [];
            shops.map((res) => {
              if (res.rental_details.rental_history["" + data.month + ""]) {
                if (
                  res.rental_details.rental_history["" + data.month + ""]
                    .status !== "paid"
                ) {
                  pendingRentShops.push(res);
                }
              } else {
                pendingRentShops.push(res);
              }
            });
            resolve(pendingRentShops);
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
      Shop.find(
        {
          [findString]: { $exists: true },
        },

        (err, shops) => {
          if (err) resolve(err);
          if (!shops) resolve({ message: "not found", statusCode: 404 });

          if (shops) {
            rentalHistoryData = [];

            shops.map((res) => {
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
              shopTotal: total,
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
      let notPaidShopList = [];
      let totalRent = 0;
      let agreedAmount = 0;
      Shop.find(
        {
          [findString]: { $exists: false },
        },
        {
          shop_name: 1,
          rental_details: 1,
        },
        function (err, unpaidShops) {
          if (err) resolve(err);
          if (!unpaidShops) resolve({ message: "not found", statusCode: 404 });

          if (unpaidShops) {
            notPaidShopList = unpaidShops;
            unpaidShops.map((res) => {
              agreedAmount =
                agreedAmount + Number(res.rental_details.retal_agreed);
            });
          }
          Shop.find(
            {
              [findString]: { $exists: true },
            },
            {
              shop_name: 1,
              rental_details: 1,
            },
            function (err, shops) {
              if (err) resolve(err);
              if (!shops) resolve({ message: "not found", statusCode: 404 });

              if (shops) {
                shops.map((res) => {
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
                  totalNumberOdpaidShops: shops.length,
                  totalNumberOdUnpaidShops: notPaidShopList.length,
                  notPaidShopList: notPaidShopList,
                  paidShops: shops,
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
  deleteshopByID: (shopId) => {
    return new Promise((resolve, reject) => {
      shop
        .findByIdAndRemove(shopId, function (err, shop) {
          console.log("shop is", shop);
          if (err) resolve(err);
          if (shop === null) {
            resolve({ message: "not found", statusCode: 404 });
          } else {
            resolve({ message: "success", statusCode: 200, result: shop._id });
          }
        })
        .catch((err) => reject(err));
    });
  },
  updateshop: (id, data) => {
    return new Promise((resolve, reject) => {
      shop.findByIdAndUpdate(id, data, { new: true }, function (err, shop) {
        if (err) resolve(err);
        resolve({ message: "success", statusCode: 200, result: shop });
      });
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
      await shop.find(
        {
          $and: [
            {
              $or: [
                { shopType: regex },
                { shopName: regex },
                { shopVarient: regex },
              ],
            },
          ],
        },
        async function (err, shop) {
          if (err) resolve(err);
          if (!shop) resolve({ message: "not found", statusCode: 404 });
          resolve(shop);
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
      await shop.find(
        {
          $and: [
            {
              $or: [{ skillset: skillset }, { jobLocation: locationdoor }],
            },
          ],
        },
        "role skillset companyName timeStamp jobLocation",
        async function (err, shop) {
          if (err) resolve(err);
          if (!shop) resolve({ message: "not found", statusCode: 404 });
          resolve(shop);
        }
      );
    }).catch((err) => reject(err));
  },
  getProfileMatchBattery: (data) => { },
};
