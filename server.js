const express = require("express");
const app = express();
const helmet = require("helmet");
const http = require("http").Server(app);
const router = require("./router");
const cors = require('cors')
const bodyParser = require("body-parser");
const config = require('./config/config');

class Server {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet.frameguard());
    app.use(cors())
    this.app.listen(config.config.port, function() {
        console.log("Server listening on port: " + config.config.port);
    });
    router(this.app);
  }
}

module.exports.Server = Server;
const server = new Server();