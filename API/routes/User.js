// PT-BR: Importa o express e inicializa-o para poder utilizar o express.Router()
// EN: Import express and initialize it to use express.Router()
const express = require("express");
const router = express.Router();

// PT-BR: Importa o middleware de autenticação responsável por verificar se o usuário está logado ou se os dados estão corretos
// EN: Import the authentication middleware responsible for checking if the user is logged in or if the data is correct
const authLogin = require("../middlewares/authLogin");

// PT-BR: Importa o controller do usuário
// EN: Import the user controller
const UserController = require("../controllers/User");

// PT-BR: Rotas
// EN: Routes

// PT-BR: Obtém as informações necessárias para a criação da página inicial do usuário (como sua imagem de perfil) e serve como um autenticador de login
// EN: Get the necessary information for creating the user's home page (such as their profile image) and serve as a login authenticator
router.get("/home", authLogin, UserController.home);

// PT-BR: Rota para autenticar o login do usuário
// EN: Route to authenticate user login
router.post("/login", UserController.login);

// PT-BR: Rota para realizar o registro do usuário
// EN: Route to perform user registration
router.post("/register", UserController.register);

// PT-BR: Rota para apagar a conta do usuário e seus respectivos dados
// EN: Route to delete user account and associated data
router.post("/delete", authLogin, UserController.delete);

// PT-BR: Rota para receber as informações do usuário e permitir a atualização dos dados
// EN: Route to receive user information and allow data update
router.get("/settings", authLogin, UserController.settings);

// PT-BR: Rota para atualizar as informações do usuário
// EN: Route to update user information
router.post("/update", authLogin, UserController.update);

// Exporta o router permitindo sua importação
// Export the router allowing its import
module.exports = router;
