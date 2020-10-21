const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const routeCadastro = require("./Routes/RouteCadastro");

//Config BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, autenticate"
  );
  app.use(cors());
  next();
});

//Rotas
app.use(routeCadastro);

//Server
app.listen(5000, () => {
  console.log("Server iniciado!");
});
