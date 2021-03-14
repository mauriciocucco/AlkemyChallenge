const sequelize = require("../config/db");

const getColumn = (id, column) =>
  sequelize.query(`SELECT ${column} FROM usuarios WHERE id_usuario = ?`, {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT,
  });

const createUser = ({ nombre_completo, email, password, saldo }) =>
  sequelize.query(
    "INSERT INTO usuarios (nombre_completo, email, password, saldo) VALUES (:nombre_completo,:email,MD5(:password),:saldo)",
    {
      replacements: { nombre_completo, email, password, saldo },
      type: sequelize.QueryTypes.INSERT,
    }
  );

const checkEmail = (email) =>
  sequelize.query(`SELECT nombre_completo FROM usuarios WHERE email = ?`, {
    replacements: [email],
    type: sequelize.QueryTypes.SELECT,
  });

const checkUser = (email, password) =>
  sequelize.query(
    `SELECT id_usuario, nombre_completo FROM usuarios WHERE email = ? AND password = MD5(?)`,
    {
      replacements: [email, password],
      type: sequelize.QueryTypes.SELECT,
    }
  );

module.exports = { getColumn, createUser, checkUser, checkEmail };
