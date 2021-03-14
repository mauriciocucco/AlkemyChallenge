const users = require("../modules/users");
const transactions = require("../modules/transactions");

module.exports = function (app) {
  app.use("/users", users);
  app.use("/transactions", transactions);
};
