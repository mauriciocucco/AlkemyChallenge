const createToken = require("../../services/createToken");

const login = (req, res) => {
  try {
    const { id_usuario, nombre_completo } = req.infoUser;

    const token = createToken({ id_usuario });

    res.status(200).send({
      message: "Successful authentication",
      token,
      user: nombre_completo,
    });
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = login;
