const express = require("express");
const CP = require("cookie-parser");
const cors = require("cors");


function expressConf(app, options) {

  app.use(cors(options.cors));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(CP());

  app.use(express.static("build"));
}

module.exports = expressConf;