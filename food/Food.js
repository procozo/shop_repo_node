var mongoose = require("mongoose");
var foodSchema = new mongoose.Schema({
  foodName: String,
  foodType: { type: String, text: true },
  price: String,
  description: String,
  aboutDish: String,
  quantity: Number,
  rating: String,
  imgUrl: String,
  foodVerient: { type: String, text: true },
  availability: Boolean,
  timeStamp: Date,
  createdBy: Object,
});
// db.deals.ensureIndex({ name: "text", description: "text", category: "text" });
foodSchema.index(
  { role: "text", skillset: "text" },
  { weights: { role: 1, skillset: 2 } }
);
mongoose.model("Food", foodSchema);

module.exports = mongoose.model("Food");
