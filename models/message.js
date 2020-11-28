const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const MessagesSchema = new Schema({
  roomname: String,
  messages: [
    {
      sender: String,
      message: String,
      time: String,
    },
  ],
});

module.exports = mongoose.model("Messages", MessagesSchema);
