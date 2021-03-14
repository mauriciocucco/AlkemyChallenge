const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/config");
const signOptions = { expiresIn: "8h" };

const createToken = (payload) => jwt.sign(payload, jwtKey, signOptions);

module.exports = createToken;
