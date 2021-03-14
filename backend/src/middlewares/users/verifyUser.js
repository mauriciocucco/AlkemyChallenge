const { checkUser } = require("../../models/users");

const verifyUser = (req, res, next) => {
  const { email, password } = req.body;

  checkUser(email, password)
    .then(([resp]) => {
      if (resp) {
        req.infoUser = resp;
        next();
      } else {
        res.status(422).send({ error: "User not found" });
      }
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(500).send({ error: "Server error" });
    });
};

module.exports = verifyUser;
