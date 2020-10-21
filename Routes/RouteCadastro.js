const { Router } = require("express");
const express = require("express");
const router = express.Router();

const serviceCadastro = require("../Services/ServiceCadastro");

router.post("/login", serviceCadastro.login);
router.get("/cadastro", serviceCadastro.get);
router.post("/cadastro", serviceCadastro.post);
router.put("/cadastro", serviceCadastro.put);
router.delete("/cadastro", serviceCadastro.delete);

module.exports = router;
