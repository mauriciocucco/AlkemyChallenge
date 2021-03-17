const { deleteTransaction } = require("../../models/transactions");

const deleteAll = async (req, res) => {
  try {
    const idArray = req.params.stringIds.split(",");

    for (let id of idArray) {
      await deleteTransaction(id);
    }

    res.status(200).send({ message: "Transaction/s deleted" });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = deleteAll;
