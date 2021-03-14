const Joi = require("joi");

const transactionSchema = {
  post: Joi.object().keys({
    valor: Joi.number().positive().required(),
    concepto: Joi.string().min(3).required(),
    tipo: Joi.string().valid("ingreso", "egreso").required(),
  }),
  put: Joi.object().keys({
    valor: Joi.number().positive().required(),
    concepto: Joi.string().min(3).required(),
  }),
};

module.exports = transactionSchema;
