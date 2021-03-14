const express = require("express");
const transactions = express.Router();
const {
  validatePost,
  validatePut,
} = require("../middlewares/transactions/validateTransaction");
const getAll = require("../controllers/transactions/getAll");
const postSingle = require("../controllers/transactions/postSingle");
const putSingle = require("../controllers/transactions/putSingle");
const deleteSingle = require("../controllers/transactions/deleteSingle");

//subrutas de /transactions
transactions.get("/", getAll);
transactions.put("/:transactionId", validatePut, putSingle);
transactions.delete("/:transactionId", deleteSingle);
transactions.post("/", validatePost, postSingle);

module.exports = transactions;
