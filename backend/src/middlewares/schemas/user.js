const Joi = require("joi");

const userSchema = {
  register: Joi.object().keys({
    nombre_completo: Joi.string()
      .required()
      .pattern(new RegExp("^[A-Z]{1}[a-z]{1,}\\s[A-Z]{1}[a-z]{1,}$"))
      .message("Enter your fullname"),
    email: Joi.string().email().message("Enter a valid email").required(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$"
        )
      )
      .message("Invalid password"), //debe tener minimo 6 caracteres con 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
    saldo: Joi.number().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().message("Enter a valid email").required(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{6,30}$"
        )
      )
      .message("Invalid password"),
  }),
};

module.exports = userSchema;
