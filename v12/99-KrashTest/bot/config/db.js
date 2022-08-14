'use strict';

const mongoose = require('mongoose');

console.log('Loading mongodb ..');

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('mongodb: connection success');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('mongodb: connection disconnected');
});

// Connect
console.log('mongodb: connecting...');
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
  })
  .catch(err => console.log(err));

module.exports = mongoose;