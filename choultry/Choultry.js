var mongoose = require("mongoose");
var ChoultrySchma = new mongoose.Schema({
  Wedding_Booking: String,
  refund: Object,
  occupire_details: Object,
  Installment: Object,
  Total_Received: String,
  Total_Due: String,
  Wedding_Expenses: Object,
});
mongoose.model("choultry_2021", ChoultrySchma);

module.exports = mongoose.model("choultry_2021");
let data = {
  Wedding_Booking: "Date",
  refund: {
    requested_date: "",
    refunded_date: "",
    flag: "No",
    amount: 4324,
  },
  occupire_details: {
    Name_of_the_person_who_is_booking_the_wedding: "",
    address: "",
    Phone_No: "",
    Adhar_Card: "",
    Wedding_Groom_Name: "",
    Wedding_BrideZ_Name: "",
    Wedding_Start_Date: "",
    Wedding_End_date: "",
    Agreement_Amount: "",
  },

  Installment: [
    {
      status: "paid",
      amount: 89999,
      paid_date: 89089089080,
      is_bank_deposited: true,
      deposit_details: {
        deposit_amount: 70000,
        deposit_date: 23123232323,
        source: "UPI",
      },
    },
    {
      status: "paid",
      amount: 89999,
      paid_date: 89089089080,
      is_bank_deposited: true,
      deposit_details: {
        deposit_amount: 70000,
        deposit_date: 23123232323,
        source: "UPI",
      },
    },
  ],
  Total_Received: "",
  Total_Due: "",
  Wedding_Expenses: {
    Wedding_Expenses: "",
    Labor_Charges: 3123,
    Electrical_Charges: 09809,
    Meter_Reading_Start: 4324324,
    Meter_Reading_End: 42343244,
    Cleaning_Charges: 42343244,
    Gas_Cylinder: 42343244,
    Parking: 42343244,
    Water_Charges: 42343244,
    Cooking_Charges: 42343244,
    Generator_Charges: 42343244,
    Tractor_Fuel_Charges: 42343244,
    Other_Charges: 42343244,
  },
};
