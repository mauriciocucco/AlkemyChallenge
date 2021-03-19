const express = require("express");
const users = express.Router();
const validateRegister = require("../middlewares/users/validateRegister");
const validateLogin = require("../middlewares/users/validateLogin");
const verifyEmail = require("../middlewares/users/verifyEmail");
const verifyEmailOnly = require("../controllers/users/verifyEmailOnly");
const verifyUser = require("../middlewares/users/verifyUser");
const login = require("../controllers/users/login");
const postSingle = require("../controllers/users/postSingle");

//subrutas de /users
users.post("/login", validateLogin, verifyUser, login);
users.post("/register", validateRegister, verifyEmail, postSingle);
users.post("/email", verifyEmailOnly);

module.exports = users;
