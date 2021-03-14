const { updateTransaction } = require("../../models/transactions");

const putSingle = (req, res) =>
  updateTransaction(req.body, req.params.transactionId)
    .then((resp) => res.status(200).send({ message: "Transaction updated" }))
    .catch((e) => {
      console.error("Error: ", e);
      res.status(500).send({ error: "Server Error" });
    });

module.exports = putSingle;
