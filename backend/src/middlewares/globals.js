const express = require("express");
const expressJwt = require("express-jwt");
const cors = require("cors");
const helmet = require("helmet");
const { jwtKey } = require("../config/config");

module.exports = function (app) {
  app.use(cors());

  app.use(express.json()); // parse application/json

  app.use(
    express.urlencoded({
      extended: false,
    })
  ); // parse application/x-www-form-urlencoded

  app.use(helmet());

  app.use(
    expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({
      path: ["/users/login", "/users/register", "/users/email"],
    })
  );
};
