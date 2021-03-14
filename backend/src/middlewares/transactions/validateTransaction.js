const transactionSchema = require("../schemas/transaction");

const validatePost = (req, res, next) => {
  const { error } = transactionSchema.post.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

const validatePut = (req, res, next) => {
  const { error } = transactionSchema.put.validate(req.body);

  error ? res.status(422).send({ error: error.details[0].message }) : next();
};

module.exports = { validatePost, validatePut };
