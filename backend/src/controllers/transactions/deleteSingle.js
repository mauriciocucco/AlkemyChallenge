const { deleteTransaction } = require("../../models/transactions");

const deleteSingle = (req, res) =>
  deleteTransaction(req.params.transactionId)
    .then((resp) => res.status(200).send({ message: "Transaction deleted" }))
    .catch((e) => {
      console.error("Error: ", e);
      res.status(500).send({ error: "Server Error" });
    });

module.exports = deleteSingle;
