const { checkEmail } = require("../../models/users");

const verifyEmailOnly = (req, res) =>
  checkEmail(req.body.email) //chequeo que no haya un usuario con el mismo email registrado
    .then(([response]) =>
      response === undefined
        ? res.status(200).send({ message: "Email available" })
        : res.status(200).send({ message: "Email not available" })
    )
    .catch((e) => {
      console.log("Error: ", e);
      res.status(500).send({ error: "Server error" });
    });

module.exports = verifyEmailOnly;
