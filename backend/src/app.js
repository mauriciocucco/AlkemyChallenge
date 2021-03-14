const express = require("express");
const app = express();
const { port } = require("./config/config");
const globalsMiddlewares = require("./middlewares/globals");
const routes = require("./routes/routes");
const { notFound, serverError } = require("./middlewares/errors");

//MIDDLEWARES GLOBALES
globalsMiddlewares(app);

//RUTAS
routes(app);

//MIDDLEWARES PARA ERRORES
app.use(notFound, serverError);

app.listen(port, () => console.log("SERVER UP!!!"));
