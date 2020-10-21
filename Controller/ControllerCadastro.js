const Cadastro = require("../Model/ModelCadastro");
const bcript = require("bcryptjs");
const { response } = require("express");

module.exports = {
  compare: (password, hashPassword) => {
    return bcript.compare(password, hashPassword);
  },

  password: (password) => {
    return bcript.hash(password, 10);
  },

  findOne: (element) => {
    return Cadastro.findOne(element).exec();
  },

  post: (formulario, res) => {
    new Cadastro(formulario)
      .save()
      .then(() => {
        console.log("Cadastro salvo na DB"),
          res
            .status(200)
            .send("formulario de cadastro salvo na collection cadastros");
      })
      .catch((erro) => {
        console.log("Deu ruim POST: " + erro);
      });
  },

  get: (req, res) => {
    Cadastro.find()
      .then((cadastros) => {
        res.status(200).send(cadastros);
      })
      .catch((erro) => {
        console.log("Deu ruim GET: " + erro);
      });
  },

  put: (formulario, res) => {
    Cadastro.findOneAndUpdate({ _id: formulario._id }, formulario)
      .then(() => {
        console.log("Cadastro atualizado na DB"),
          res
            .status(200)
            .send("formulario de cadastro atualizado na collection cadastros");
      })
      .catch((erro) => {
        console.log("Deu ruim PUT: " + erro);
      });
  },

  delete: (req, res) => {
    Cadastro.deleteOne(req.query)
      .then(() => {
        console.log("Cadastro deletado na DB"),
          res
            .status(200)
            .send("Cadastro foi deletado na collection cadastros");
      })
      .catch((erro) => {
        console.log("Deu ruim DELETE: " + erro);
      });
  },
};
