/*
 * Run Mongoose
 * ************ */

const mongoose = require("mongoose");

module.exports = async (client) => {
  // When successfully connected
  mongoose.connection.on("connected", () => {
    console.log("mongodb: connection success");
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    console.log("mongodb: connection disconnected");
  });

  // Connect
  console.log("mongodb: connecting...");
  mongoose
    .connect(client.config.mongodb)
    .catch((err) => console.log(err));
};
