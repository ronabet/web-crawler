var express = require("express");
var app = express();
const helmet = require("helmet");
var http = require("http").Server(app);
var router = require("./router");
var cors = require('cors')
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000;

class Server {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(helmet.frameguard());
    app.use(cors())
    this.app.listen(port, function() {
        console.log("Server listening on port: " + port);
    });
    router(this.app);
  }
}

module.exports.Server = Server;
const server = new Server();