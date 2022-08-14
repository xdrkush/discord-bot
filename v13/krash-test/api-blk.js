var request = require("request");

// require('dotenv').config()

const config = {
  rpchost: "localhost", // to put in the .env
  rpcport: 7771, // to put in the .env
  rpcuser: "user", // to put in the .env
  rpcpassword: "password", // to put in the .env
};

// Headers
const headers = {
  "content-type": "text/plain;",
};

class RequestRPC {
  constructor(query) {
    this.command = query;
    this.config = config;
  }

  requestRPC() {
    let cb;
    return new Promise((resolve, reject) => {
      var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${this.command}","params":[]}`;
      var options = {
        url: `http://${config.rpcuser}:${config.rpcpassword}@127.0.0.1:7771/`,
        method: "POST",
        headers: headers,
        body: dataString,
      };

      cb = (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body);
          console.log("ttt", data);
          resolve(data);
        }
      };

      request(options, cb);
    });
  }

  getBlockCount() {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestRPC().then((data) => data);
      console.log("tesstt", data);
      resolve(data);
    });
  }

  getBalance() {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestRPC().then((data) => data);
      console.log("tesstt", data);
      resolve(data);
    });
  }
}

module.exports = RequestRPC;