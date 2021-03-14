const sequelize = require("../config/db");

const getTransactions = (id) =>
  sequelize.query(
    "SELECT id_transaccion, fecha, valor, concepto, tipo FROM transacciones WHERE id_usuario1 = ?",
    { replacements: [id], type: sequelize.QueryTypes.SELECT }
  );

const createTransaction = (idTransaction, userId, { valor, concepto, tipo }) =>
  sequelize.query(
    "INSERT INTO transacciones (id_transaccion, id_usuario1, valor, concepto, tipo) VALUES (:idTransaction, :userId, :valor, :concepto, :tipo)",
    {
      replacements: { idTransaction, userId, valor, concepto, tipo },
      type: sequelize.QueryTypes.INSERT,
    }
  );

const updateTransaction = ({ valor, concepto }, id) =>
  sequelize.query(
    "UPDATE transacciones SET valor = :valor, concepto = :concepto  WHERE id_transaccion = :id",
    { replacements: { valor, concepto, id } }
  );

const deleteTransaction = (id) =>
  sequelize.query("DELETE FROM transacciones WHERE id_transaccion = ?", {
    replacements: [id],
  });

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
