const userSchema = require("../schemas/user");

const validateRegister = (req, res, next) => {
  const { error } = userSchema.register.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = validateRegister;
