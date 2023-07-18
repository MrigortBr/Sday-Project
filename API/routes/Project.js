// PT-BR: Importa o express e inicializa-o para poder utilizar o express.Router()
// EN: Import express and initialize it to use express.Router()

const express = require("express");
const router = express.Router();

// Veririca se o usuario está no projeto, cada um tem uma das permissões existentes

//PT-BR: Middleware responsavel de verificar se o usuario é um administrador
//EN: Middleware to check if the user is the project owner
const authProjectAdmin = require("../middlewares/authProjectAdmin");

// PT-BR: Middleware responsavel por detectar se o usuario é o dono do projeto
// EN: Middleware to check if the user is a project administrator

const authProjectOwner = require("../middlewares/authProjectOwner");

// PT-BRMiddleware responsavel por detectar se o usuario está no projeto
// EN: Middleware to check if the user is in the project

const authProjectuser = require("../middlewares/authProjectuser");


// PT-BR: Importa o controller do projeto
// EN: Import the project controller
const ProjectController = require("../controllers/Project");

// PT-BR: Importa o middleware de autenticação responsável por verificar se o usuário está logado ou se os dados estão corretos
// EN: Import the authentication middleware responsible for checking if the user is logged in or if the data is correct

const authLogin = require("../middlewares/authLogin");

// PT-BR: Rotas
// EN: Routes

//PT-BR: Rotas com MiddleWare de dono
//EN: Routes with owner middleware

    //PT-BR: Rota para deletar o projeto
    //EN: Route to delete the project
    router.post("/:idproject/delete", authProjectOwner, ProjectController.delete);
    router.post("/:idproject/promote", authProjectOwner, ProjectController.promote)
    router.post("/:idproject/remove", authProjectOwner, ProjectController.remove)

//PT-BR: Rotas com Middleware de Administrador
//EN: Routes with admin middleware

    //PT-BR: Rota para listar os dados do projeto baseado no id passado (:id) para futuramente o usuario poder editar os dados
    //EN: Route to list project data based on the provided project ID (:id) for future editing
    router.get("/:idproject/settings", authProjectAdmin, ProjectController.settings);
    //PT-BR: Rota para a atualização dos dados do projeto
    //EN: Route to update project data
    router.post("/:idproject/update", authProjectAdmin, ProjectController.update);
    //PT-BR: Rota criada para gerar um codigo de convite para o projeto
    //EN: Route to generate an invitation code for the project
    router.get("/:idproject/invite", authProjectAdmin, ProjectController.invite);
    //PT-BR: Rota que lista todas as informações de uma tarefa
    //EN: Route to get information about a specific task
    router.get("/:idproject/task", authProjectAdmin, ProjectController.task);
    //PT-BR: Rota para deletar uma tarefa
    //EN: Route to delete a task
    router.post("/:idproject/delete/task", authProjectAdmin, ProjectController.deleteTask)
    //PT-BR: Rota para atualizar uma rota e seus dados (tanto tarefas tanto sub tarefas)
    //EN: Route to update a task and its data (both tasks and subtasks)
    router.post("/:idproject/update/task", authProjectAdmin, ProjectController.updateTask)
    //PT-BR: Rotas com Middleware de usuario
    //EN: Routes with user middleware
    
    //PT-BR: Rota para enviar a permissão e validar se o usuario está no projeto
    //EN: Route to send the permission and validate if the user is in the project
    router.get("/:idproject/inproject", authProjectuser, ProjectController.inProject)
    //PT-BR: Rota responsavel por listar todos os projetos que o usuario está inserido
    // Route to list all projects that the user is involved in
    router.get("/myProjects", authLogin, ProjectController.myProjects);
    //PT-BR: Rota responsavel por validar e resgistar um novo projeto
    //EN: Route to validate and register a new project
    router.post("/register", authLogin, ProjectController.register);
    //PT-BR: Rota que lista todos os usuarios presentes no projeto
    //EN: Route to list all users in the project
    router.get("/:idproject/users", authProjectuser, ProjectController.users);
    //PT-BR: Rota na qual lista todos as tarefas do projeto e se for um usuario sem permissão de administração retorna apenas as tarefas na qual ele esta inserido
    //EN: Route to list all tasks in the project, returning only the user's tasks if they don't have administrative permissions
    router.get("/:idproject/tasks", authProjectuser, ProjectController.tasks);
    //PT-BR: Rota para finalizar a sub tarefa passada para o usuario
    //EN: Route to mark a subtask as finished for the user
    router.post("/:idproject/finish", authProjectuser, ProjectController.finish)
    //PT-BR: Rota que lista as sub tarefas que o usuario está inserido
    //EN: Route to list the user's subtasks
    router.get("/:idproject/calendar", authProjectuser, ProjectController.calendar)

    //PT-BR: Rota pra o usuario sair do projeto
    router.post("/:idproject/leave", authProjectuser, ProjectController.leave)

    router.post("/:code", authLogin, ProjectController.enter);

    router.get("/:idproject/contacts", authProjectuser, ProjectController.contacts)

    router.get("/:idproject/messages", authProjectuser, ProjectController.messages)

    router.post("/:idproject/readMessage", authProjectuser, ProjectController.readMessage)

//PT-BR: Exporta o router permitindo sua importação
//EN: Export the router allowing its import
module.exports = router;