const { getTransactions } = require("../../models/transactions");
const { getColumn } = require("../../models/users");

const getAll = async (req, res) => {
  try {
    const idUser = req.user.id_usuario;
    const transactions = await getTransactions(idUser); //id proveniente del token
    const [{ saldo }] = await getColumn(idUser, "saldo");

    if (transactions.length === 0) {
      return res
        .status(404)
        .send({ transactions: "Not found", balance: saldo });
    }

    res.status(200).send({ transactions, balance: saldo });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).send({ error: "Server Error" });
  }
};

module.exports = getAll;
