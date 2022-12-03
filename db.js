var mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// mongoose
//   .connect("mongodb://localhost:27017/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => {
//     console.log("connected to MongoDB");
//   });
mongoose
  .connect("mongodb+srv://hrcloud:shopData@cluster0.icwl5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to MongoDB");
  });
