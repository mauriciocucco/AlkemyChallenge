require("dotenv").config();

const jwtKey = process.env.TKS;
const port = process.env.PORT;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const dbPort = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

module.exports = { jwtKey, port, host, user, dbPort, database };
