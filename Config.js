const mongoose = require("mongoose");

//Config Mongoose
mongoose
  .connect("mongodb://localhost/teste", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB conectado!");
  })
  .catch((erro) => {
    console.log("Deu ruim: " + erro);
  });

module.exports = mongoose;
