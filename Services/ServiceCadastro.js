const { hash } = require('bcryptjs');
const controllerCadastro = require('../Controller/ControllerCadastro');
const jwt = require('./JWT');

module.exports = {

    login: (req, res)=>{
        controllerCadastro.findOne({login: req.body.login})
        .then((consult)=>{
            if(!consult){
                res.status(406).send("Login não encontrado")
            }else{
                controllerCadastro.compare(req.body.senha, consult.senha)
                .then((result)=>{
                    if (result){
                        jwt.getToken(consult).then((token)=>{
                            res.status(200).send({message: "Login e senha ok", token, consult})
                        }).catch((erro)=>{
                            console.log("Deu ruim JWT2: " + erro);
                            res.status(404)
                        })
                    }else{
                        res.status(406).send("Senha divergente");
                    }
                }).catch((erro)=>{
                    console.log("Deu ruim COMPARE: " + erro);
                })
            }
        }).catch((erro)=>{
            console.log("Deu ruim BUSCA ONE: " + erro);
        })
    },

    post: (req, res) =>{
        controllerCadastro.findOne({login: req.body.login})
        .then((consult)=>{
            if(!consult){
                controllerCadastro.password(req.body.senha)
                .then((hash)=>{
                    const formulario = {
                        login: req.body.login,
                        senha: hash,
                        nome: req.body.nome,
                        cpf: req.body.cpf,
                        idade: req.body.idade,
                        email: req.body.email,
                    }
                    controllerCadastro.post(formulario, res);
                }).catch((erro)=>{
                    console.log("Deu ruim POST: " + erro)
                })
                
            }else{
                res.status(406).send("Usuario ja tem cadastro!");
            }
        }).catch((erro)=>{
            console.log("Deu ruim POST: " + erro)
        })
    },

    get: async (req, res) =>{
        if(req.headers.autenticate !== undefined){
            try{
                const resultVerify = await jwt.verifyToken(req.headers.autenticate)
                if(resultVerify.sub == 'admin'){
                    controllerCadastro.get(req, res)
                }else{
                    res.status(406).send("Usuario não tem permissão")
                }
            }catch(err){
                res.status(406).send("Erro ao verificar o usuario")
                console.log(err)
            }
        }else{
            res.status(406).send("Usuario não tem permissão")
        }
    },

    put: (req, res) =>{
        if (req.body.senha === undefined || req.body.senha === ''){
            controllerCadastro.put(req.body, res);
        }else{
            controllerCadastro.password(req.body.senha)
            .then((hash)=>{
                const formulario = {
                    _id: req.body._id,
                    login: req.body.login,
                    senha: hash,
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    idade: req.body.idade,
                    email: req.body.email,
                }
                controllerCadastro.put(formulario, res);
            }).catch((erro)=>{
                console.log("Deu ruim PUT: " + erro)
            })
        }
    },

    delete: async(req, res) =>{
        if(req.headers.autenticate !== undefined){
            try{
                const resultVerify = await jwt.verifyToken(req.headers.autenticate)
                if(resultVerify.sub === 'admin'){
                    controllerCadastro.delete(req, res)
                }else{
                    res.status(406).send("Usuario não tem permissão")
                }
            }catch(err){
                res.status(406).send("Erro ao verificar o usuario")
                console.log(err)
            }
        }else{
            res.status(406).send("Usuario não tem permissão")
        }
    }

}