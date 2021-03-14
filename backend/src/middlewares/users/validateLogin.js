const userSchema = require("../schemas/user");

const validateLogin = (req, res, next) => {
  const { error } = userSchema.login.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validateLogin;
