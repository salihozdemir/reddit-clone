const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(config.db.url, config.db.options);
  } catch (err) {
    console.log("Mongoose error", err);
  }
  app.listen(config.port);
  console.log(`API listening on localhost:${config.port}`);
};

connect();
