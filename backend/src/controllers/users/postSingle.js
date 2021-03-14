const { createUser } = require("../../models/users");

const postSingle = (req, res) =>
  createUser(req.body)
    .then((resp) => res.status(200).send({ id: resp[0] }))
    .catch((e) => {
      console.error("Error: ", e);
      res.status(500).send({ error: "Server Error" });
    });

module.exports = postSingle;
