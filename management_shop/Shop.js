var mongoose = require("mongoose");
const { object } = require("mongoose/lib/utils");
var shopSchma = new mongoose.Schema({
  year: String,
  shop_name: String,
  basic_details: Object,
  status_of_shop: String | Object,
  Shop_tenant_details: Object,
  deposit_details: Object,
  shop_notice_to_vacate: Object,
  rental_details: Object,
  contract_details: Object,
  agrement_details: Object,
  icon: String,
  title: String,
  titleOpacity: Number,
  count: String,
  description: String,
  isDelete: Boolean,
  isStatus: Boolean,
  statusValue: Boolean,
  isCreatedAt: String,
  subData: Array,
  isTest: Boolean,
  isElement: Boolean,
  author: String,
  version: String,
  isMultiple: Boolean,
  isExport: Boolean,
  deleteIcon: String,
  statusHolderIcon: String,
  iconTitle: String,
  actionItem: Boolean,
  isChecked: Boolean,
  type: String,
  isSingleCheckUI: Boolean,
  id: String,
  apiData: Object,
  workflow: Object,
  elementList: Object,
  template: String,
  isdisabled: Boolean,
  result: Array,
  status: Number,
  jobID: String,
});
// db.deals.ensureIndex({ name: "text", description: "text", category: "text" });
// shopSchma.index(
//   { role: "text", skillset: "text" },
//   { weights: { role: 1, skillset: 2 } }
// );
mongoose.model("2021", shopSchma);

module.exports = mongoose.model("2021");
