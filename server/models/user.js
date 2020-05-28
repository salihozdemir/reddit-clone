const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

module.exports = mongoose.model("user", userModel);
