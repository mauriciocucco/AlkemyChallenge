const express = require("express");
const transactions = express.Router();
const {
  validatePost,
  validatePut,
} = require("../middlewares/transactions/validateTransaction");
const getAll = require("../controllers/transactions/getAll");
const postSingle = require("../controllers/transactions/postSingle");
const putSingle = require("../controllers/transactions/putSingle");
const deleteAll = require("../controllers/transactions/deleteAll");

//subrutas de /transactions
transactions.get("/", getAll);
transactions.put("/:transactionId", validatePut, putSingle);
transactions.delete("/:stringIds", deleteAll);
transactions.post("/", validatePost, postSingle);

module.exports = transactions;
