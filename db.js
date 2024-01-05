const mongoose = require("mongoose");

var mogoURL = 'mongodb+srv://trungnam:1001@booking.e457byy.mongodb.net/Booking?retryWrites=true&w=majority';

mongoose
  .set("strictQuery", false)
  .connect(mogoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connect success"))
  .catch((error) => console.log("connect fails: ", error));

module.exports = mongoose;
