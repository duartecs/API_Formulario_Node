const mongoose = require("../Config");

//Schema da tabela == modelo do documento
const CadastroSchema = mongoose.Schema({
  login: {
    type: String,
    require: true,
  },
  senha: {
    type: String,
    require: true,
  },
  nome: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  idade: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

//Create table == criar collection
var cadastro = mongoose.model("cadastros", CadastroSchema);

module.exports = cadastro;
