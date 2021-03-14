const { createTransaction } = require("../../models/transactions");
const { v4: uuid } = require("uuid");

const postSingle = (req, res) => {
  const idTransaction = uuid();

  createTransaction(idTransaction, req.user.id_usuario, req.body)
    .then((resp) => res.status(200).send({ id: resp[0] }))
    .catch((e) => {
      console.error("Error: ", e);
      res.status(500).send({ error: "Server Error" });
    });
};

module.exports = postSingle;
