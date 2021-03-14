const express = require("express");
const expressJwt = require("express-jwt");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { jwtKey } = require("../config/config");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //60 minutos
  max: 10, //10 peticiones
  message: "Se superó el límite de 10 peticiones por hora.",
});

module.exports = function (app) {
  app.use(cors());

  app.use(express.json()); // parse application/json

  app.use(
    express.urlencoded({
      extended: false,
    })
  ); // parse application/x-www-form-urlencoded

  app.use(helmet());

  //app.use(limiter);

  app.use(
    expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({
      path: ["/users/login", "/users/register"],
    })
  );
};
