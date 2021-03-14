const { checkEmail } = require("../../models/users");

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  checkEmail(email) //chequeo que no haya un usuario con el mismo email registrado
    .then(([response]) =>
      response === undefined
        ? next()
        : res.status(422).send({ error: "Email not available" })
    )
    .catch((e) => {
      console.log("Error: ", e);
      res.status(500).send({ error: "Server error" });
    });
};

module.exports = verifyEmail;
