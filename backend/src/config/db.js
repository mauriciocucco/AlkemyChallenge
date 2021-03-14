const Sequelize = require("sequelize");
const { host, user, dbPort, database } = require("../config/config");
const sequelize = new Sequelize(
  `mariadb://${user}@${host}:${dbPort}/${database}`
);

sequelize
  .authenticate() //para verificar la conexión con la base de datos
  .then((res) =>
    console.log("Connection to the database has been established successfully.")
  )
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
