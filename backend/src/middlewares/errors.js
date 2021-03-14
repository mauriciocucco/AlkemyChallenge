const notFound = (req, res) =>
  res.status(404).send({ error: "The requested page does not exist" });

const serverError = (err, req, res, next) => {
  if (!err) {
    //no hay error
    return next();
  }

  console.error("globalError: ", err);

  if (err.name === "UnauthorizedError") {
    //no se encontró un token (lo devuelve el express-jwt)

    return res.status(401).send({ error: "Unauthorized" });
  }

  res.status(500).send({ error: "Global server error" });
};

module.exports = {
  notFound,
  serverError,
};
