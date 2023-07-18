const ModelProject = require("../models/Project")
const responses = require("../messages/Project")
const ObjectProject = require("../classes/Project")
const ObjectSubTask = require("../classes/Subtask")
const ObjectTask = require("../classes/Task")


module.exports = new class Project{

    //Lista todos os projetos do usuario
    async myProjects(req, res) {
        // Extrai o id do usuário logado do objeto req.login
        const { id } = req.login;
        
        // Chama o método projectsUser do ModelProject para obter os projetos do usuário
        const response = await ModelProject.projectsUser(id);
    
        // Verifica se houve algum erro ao obter os projetos do usuário
        if (response.status == false) {
            // Se houver um erro, retorna a mensagem de erro para o cliente
            const { code, message } = response;
            res.status(code).send(message);
        } else {
            //Tranforma de array Buffer (blob) para base64
            for (const project of response) {
                const bufferValue = Buffer.from(project.picture);
                project.picture = bufferValue.toString('base64');
            }
            // Se não houver erros, retorna a lista de projetos para o cliente
            const { code, data } = await responses.listProjects(response);
            res.status(code).json(data);
        }
    }
    
    // Registra um novo projeto
    async register(req, res) {
        // Extrai o id e o email do usuário logado do objeto req.login
        const { id, email } = req.login;
        
        // Extrai os campos name, picture e description do objeto req.body
        const { name, picture, description } = req.body;

        let emptyFields = [];

        // Verifica se o campo name está vazio
        if (!name) {
            emptyFields.push("Nome do projeto");
        }

        // Verifica se o campo picture está vazio
        if (!picture) {
            emptyFields.push("Imagem");
        }

        // Verifica se o campo description está vazio
        if (!description) {
            emptyFields.push("Descrição");
        }

        // Verifica se algum campo ficou vazio e, se sim, retorna a mensagem de campos não preenchidos para o cliente
        if (emptyFields.length > 0) {
            const { code, message } = await responses.unfilledFields(emptyFields);
            res.status(code).send(message);
            return;
        }

        // Cria um objeto de projeto com os dados fornecidos
        const project = new ObjectProject(null, name, picture, description);

        // Chama o método register do ModelProject para registrar o projeto no banco de dados
        const result = ModelProject.register(project, id, email);

        // Verifica se houve algum erro durante o registro do projeto
        if (result.status == false) {
            // Se houver um erro, retorna a mensagem de erro para o cliente
            const { code, message } = result;
            res.status(code).send(message);
        } else {
            // Se o projeto for registrado com sucesso, retorna a mensagem de sucesso para o cliente
            const { code, message } = await responses.successCreate();
            res.status(code).send(message);
        }
    }

    //Lista os usuarios do projeto
     async users(req, res) {
        // Obtém a permissão do usuário logado
        const { permission } = req.login;
        // Obtém o ID do projeto
        const { id: idProject } = req.project;
        // Obtém a lista de usuários associados ao projeto
        const users = await ModelProject.userProject(idProject);

        if (users.status == false) {
            // Se houve um erro na obtenção dos usuários, envia o código e a mensagem de erro como resposta
            const { code, message } = users;
            res.status(code).send(message);
        } else {
            // Itera sobre cada usuário retornado
            for (const user of users) {
                 // Verifica se o usuário possui uma imagem de perfil
                if (user.picture != null && user.picture.length > 0) {
                    // Converte a imagem de perfil para base64
                    const bufferValue = Buffer.from(user.picture);
                    user.picture = bufferValue.toString('base64');
                }
            }
            // Envia a resposta com a lista de usuários modificada
            const { code, data } = await responses.successUsers(users);
            res.status(code).send(data);
        }
    }

    //Lista as tasks do projeto
    async tasks(req, res) {
        // Extrai o usuário logado do objeto req.login
        const user = req.login;
    
        // Extrai o projeto do objeto req.project
        const project = req.project;
    
        // Extrai os parâmetros da requisição do objeto req.query
        const my = req.query.my;
        let result = '';
    
        if (my == undefined && project.permission < 2) {
            // Caso os parâmetros indiquem que são as tarefas do próprio usuário e a permissão do projeto seja menor que 2,
            // busca todas as tarefas do projeto
                result = await ModelProject.taskAll(project.id);
            } else {
                // Caso contrário, busca as tarefas do usuário no projeto
                result = await ModelProject.tasksUser(project.id, user.id);
            }
    
        if (result.status == false) {
            // Se houver um erro ao buscar as tarefas, retorna a mensagem de erro para o cliente
            const { code, message } = result;
            res.status(code).send(message);
        } else {
            for (const task of result) {
                let subtasks = '';
                if (my == undefined && project.permission < 2) {
                    // Caso os parâmetros indiquem que são as tarefas do próprio usuário e a permissão do projeto seja menor que 2,
                    // busca todas as sub-tarefas da tarefa para o usuário
                    subtasks = await ModelProject.subtask(task.id, user.id);
                } else {
                    // Caso contrário, busca as sub-tarefas da tarefa para o usuário
                    subtasks = await ModelProject.subtaskUser(task.id, user.id);
                }
    
                if (subtasks.status == false) {
                    // Se houver um erro ao buscar as sub-tarefas, retorna a mensagem de erro para o cliente e interrompe o loop
                    const { code, message } = subtasks;
                    res.status(code).send(message);
                    break;
                }
    
                task.subtasks = subtasks;
            }
            // Retorna as tarefas e sub-tarefas para o cliente
            res.send(result);
        }
    }
    
    //Finaliza uma subtarefa
    async finish(req, res) {
        const { idSubTask, my, idSended} = req.body;
        let { id: idUser } = req.login;
        const { permission, id: idTask } = req.project;
    
        if (idSended){
            idUser = idSended
        }

        if (idSubTask == undefined || idUser == undefined) {
            // Se os campos idSubTask ou idUser não forem fornecidos, retorna uma mensagem de erro desconhecido para o cliente
            const { code, message } = await responses.unknownError();
            res.status(code).send(message);
        } else {
            let result = '';
            if (my == false && permission < 2) {
                // Caso o parâmetro my seja fornecido e a permissão do projeto seja menor que 2,
                // marca como concluídas todas as sub-tarefas do usuário
                result = await ModelProject.finishAll(idSubTask, idUser);
            } else {
                // Caso contrário, marca a sub-tarefa do usuário como concluída
                result = await ModelProject.finish(idSubTask, idUser);
            }
    
            if (result.status == false) {
                // Se houver um erro ao marcar como concluída a sub-tarefa, retorna a mensagem de erro para o cliente
                const { code, message } = result;
                res.status(code).send(message);
            } else {
                // Se a sub-tarefa for marcada como concluída com sucesso, retorna uma mensagem de sucesso para o cliente
                const { code, message } = await responses.successFinish();
                res.status(code).send(message);
            }
        }
    }
    
    //Mostra o calendario
    async calendar(req, res) {
        const { id: idUser } = req.login;
        const { id: idProject } = req.project;
        let { dateSelect: dateSelected } = req.query;
        dateSelected = new Date(dateSelected);
        if (!isNaN(dateSelected)) {
            // Verifica se a data selecionada é válida
    
            const result = await ModelProject.calendar(idUser, idProject, dateSelected);
    
            if (result.status == false) {
                // Se houver um erro ao buscar as informações do calendário, retorna a mensagem de erro para o cliente
                const { code, message } = result;
                res.status(code).send(message);
            } else {
                // Se as informações do calendário forem obtidas com sucesso, retorna os dados para o cliente
                const { code, data } = await responses.successDate(result);
                res.status(code).send(data);
            }
        } else {
            // Se a data selecionada for inválida, retorna a mensagem de data inválida para o cliente
            const { code, message } = await responses.invalidDate();
            res.status(code).send(message);
        }
    }    

    // Método responsável por excluir um projeto
    async delete(req, res) {
        const { id: idUser } = req.login;
        const { id: idProject } = req.project;

        const result = await ModelProject.delete(idProject);

        if (result.status == false) {
            // Se houver um erro ao excluir o projeto, retorna a mensagem de erro para o cliente
            const { code, message } = result;
            res.status(code).send(message);
        } else {
            // Se o projeto for excluído com sucesso, retorna uma mensagem de sucesso para o cliente
            const { code, message } = await responses.successDelete();
            res.status(code).send(message);
        }
    }

    // Método responsável por retornar as configurações de um projeto
    async settings(req, res) {
        res.json(req.project);
    }

    // Método responsável por atualizar os dados de um projeto
    async update(req, res) {
        const project = req.project;
        const { name, description, picture } = req.body;

        let emptyFields = [];

        if (!name) {
            emptyFields.push("Nome");
        }

        if (!description) {
            emptyFields.push("Descrição");
        }

        if (!picture) {
            emptyFields.push("imagem");
        }

        if (emptyFields.length > 0) {
            // Se algum campo estiver vazio, retorna uma mensagem de erro informando quais campos estão faltando
            const { code, message } = await responses.unfilledFields(emptyFields);
            res.status(code).send(message);
            return;
        }

        const result = await ModelProject.update(name, description, picture, project.id);

        if (result.status == false) {
            // Se houver um erro ao atualizar os dados do projeto, retorna a mensagem de erro para o cliente
            const { code, message } = result;
            res.status(code).send(message);
        } else {
            // Se a atualização for bem-sucedida, retorna uma mensagem de sucesso para o cliente
            const { code, message } = await responses.successUpdate();
            res.status(code).send(message);
        }
    }

    // Método responsável por enviar um convite para um projeto
    async invite(req, res) {
        let project = req.project;
        const codeInvite = btoa(JSON.stringify({ id: project.id, name: project.name }));
        const { code, message, link } = await responses.invite(codeInvite);
        res.status(200).json({ message: message, link: link });
    }

    //Lista uma task em especifico
    async task(req, res) {
        const idProject = req.project.id;
        const idTask = req.query.idTask;
        const idSubTask = req.query.idSubTask;
        let task = '';
        let current = '';
    
        if (idTask) {
            // Obter informações da tarefa principal com base no ID da tarefa
            task = await ModelProject.taskByid(idTask);
    
            if (task.status !== undefined) {
                // Se houver um erro ao obter informações da tarefa, retorna a mensagem de erro para o cliente
                const { code, message } = task;
                res.status(code).send(message);
                return;
            } else {
                // Obter informações das subtasks relacionadas à tarefa principal
                const subtask = await ModelProject.subTasksByTask(idTask);
    
                if (subtask.status == false) {
                    // Se houver um erro ao obter informações das subtasks, retorna a mensagem de erro para o cliente
                    const { code, message } = subtask;
                    res.status(code).send(message);
                    return;
                } else {
                    task.subtasks = subtask;
                }
            }
        } else {
            // Se o ID da tarefa não for fornecido, retorna uma mensagem de erro
            const { code, message } = await responses.unknownError();
            res.status(code).send(message);
            return;
        }
    

        if (idSubTask) {
            // Obter informações da subtask com base no ID da subtask
            const subtask = await ModelProject.subtaskById(idSubTask);
            // Obter usuários associados ao projeto
            if (subtask.status == false) {
                // Se houver um erro ao obter informações da subtask, retorna a mensagem de erro para o cliente
                const { code, message } = subtask;
                res.status(code).send(message);
            } else {
                if (subtask.id > 0) {
                    current = subtask;
                    const users = await ModelProject.usersFinished(subtask.id);
                    if (users.status != false){
                        subtask.users = users
                    }

                }
            }
        }
        const { code, data } = await responses.successTask(current, task);

        res.status(code).json(data);
    }
    
    //Atualiza uma task
    async updateTask(req, res) {
        const { type, id } = req.body;
        const idProject = req.project.id;
        let emptyFields = [];

        
    
        if (!req.body.name) {
            emptyFields.push("Nome");
        }
    
        if (!req.body.description) {
            emptyFields.push("Descrição");
        }
    
        if (type == 2) {
            // Atualizar ou criar uma subtask
            const { name, description, idTask, created, finished} = req.body;
    
            if (!created) {
                emptyFields.push("Data de criação");
            }
    
            if (!finished) {
                emptyFields.push("Data finalizada");
            }
            const subtask = new ObjectSubTask(name, description, created, finished);
            let result = '';
            if (id != null) {
                subtask.setid(id);
                result = await ModelProject.updateSubTask(subtask, req.body.users, idProject);
                if (result.status == false) {
                    // Se houver um erro ao atualizar ou criar a subtask, retorna a mensagem de erro para o cliente
                    const { code, message } = result;
                    res.status(code).send(message);
                } else {
                    // Se a atualização ou criação da subtask for bem-sucedida, retorna uma mensagem de sucesso
                    const { code, message } = await responses.successUpdate();
                    res.status(code).send(message);
                }
            } else {
                subtask.setidTask(idTask);
                result = await ModelProject.createSubTask(subtask, req.body.users);
                if (result.status == false) {
                    // Se houver um erro ao atualizar ou criar a subtask, retorna a mensagem de erro para o cliente
                    const { code, message } = result;
                    res.status(code).send(message);
                } else {
                    // Se a atualização ou criação da subtask for bem-sucedida, retorna uma mensagem de sucesso
                    const { code, message } = await responses.successUpdate();
                    res.status(code).send({message: message, id: result});
                }
            }
    

        } else if (type == 1) {
            // Atualizar ou criar uma tarefa
            const { name, description, color } = req.body;
    
            if (!color) {
                emptyFields.push("Cor");
            }
    
            let result = '';
            const task = new ObjectTask(name, color, description);
    
            if (id != null) {
                task.setid(id);
                result = await ModelProject.updateTask(task, idProject);
                if (result.status == false) {
                    // Se houver um erro ao atualizar ou criar a tarefa, retorna a mensagem de erro para o cliente
                    const { code, message } = result;
                    res.status(code).send(message);
                } else {
                    // Se a atualização ou criação da tarefa for bem-sucedida, retorna uma mensagem de sucesso
                    const { code, message } = await responses.successUpdate();
                    res.status(code).send(message);
                }
            } else {
                task.setidProject(idProject);
                result = await ModelProject.createTask(task);
                if (result.status == false) {
                    // Se houver um erro ao atualizar ou criar a tarefa, retorna a mensagem de erro para o cliente
                    const { code, message } = result;
                    res.status(code).send(message);
                } else {
                    // Se a atualização ou criação da tarefa for bem-sucedida, retorna uma mensagem de sucesso
                    const { code, message } = await responses.successUpdate();
                    res.status(code).send({message: message, id: result});
                }
            }
    

        } else {
            // Se o tipo não for válido, retorna uma mensagem de erro
            const { code, message } = await responses.dataInvalid();
            res.status(code).send(message);
        }
    }
   
    //Responsavel por deletar uma task ou subtask
    async deleteTask(req, res){
        const { type, id } = req.body;
        let idProject = req.project.id;
        
        // Se o tipo não for válido, retorna uma mensagem de erro
        if(!isNaN(idProject) && !isNaN(id)){   
            let result = ''
            if (type == 1){
                result = await ModelProject.deleteTask(id);
            }else if(type == 2){
                result = await ModelProject.deleteSubTask(id);
            }

            if (result.status == false){
                const { code, message } = result;
                res.status(code).send(message);
            }else{
                const { code, message } = await responses.successDeleteTask();
                res.status(code).send(message);
            }
        }else{
            const { code, message } = await responses.dataInvalid();
            res.status(code).send(message);
        }
    }

    async inProject(req, res){
        res.send({permission: req.project.permission, name: req.project.name})
    }

    async leave(req, res){
        const {id} = req.login
        const {idproject} = req.params
        const {permission} = req.project

        if (permission == 0){
            const {code, message} = await responses.notLeave()
            res.status(code).send(message)
        }else{
            const result = await ModelProject.leave(id, idproject)
            if(result.status == false){
                const {code, message} = result
                res.status(code).send(message)
            }else{
                const {code, message} = await responses.successLeave()
                res.status(code).send(message)
            }        
        }
    }

    async enter(req, res){
        const {code} = req.params
        const {id: idUser} = req.login
        const idProject = JSON.parse(atob(code)).id
        console.log("oiiii")

        const userInProject = await ModelProject.userInProject(idProject, idUser);

        if (userInProject.status == false){
            const result = await ModelProject.enterInProject(idProject, idUser)

            if (result.status == false){
                const {code, message} = result
                res.status(code).send(message);
            }else{
                const {code, message} = await responses.successEnter()
                res.status(code).send(message);  
            }
        }else{
            const {code, message} = await responses.userInProject()
            res.status(code).send(message);
        }

    }

    async promote(req, res){
        const {idOwner} = req.login
        const {idUser, permission} = req.body
        const {idproject} = req.params
        const {permission: permissionOwner} = req.project
        if (permissionOwner == 0){
            if (permission == 0){
                const {code, message} = await responses.noUpdate()
                res.status(code).send(message)
                return;
            }
            const result = await ModelProject.promote(idUser, idproject, permission)
            if(result.status == false){
                const {code, message} = result
                res.status(code).send(message)
            }else{
                const {code, message} = await responses.successPromote()
                res.status(code).send(message)
            }
        }else{
            const {code, message} = await responses.noPermission()
            res.status(code).send(message)
        }
    }

    async remove(req, res){
        const {idOwner} = req.login
        const {idUser} = req.body
        const {idproject} = req.params
        const {permission} = req.project

        if (permission == 0){  
            const result = await ModelProject.remove(idUser, idproject)
            if(result.status == false){
                const {code, message} = result
                res.status(code).send(message)
            }else{
                const {code, message} = await responses.successRemove()
                res.status(code).send(message)
            }
        }else{
            const {code, message} = await responses.noPermission()
            res.status(code).send(message)
        }
    }

    async contacts(req, res){
        const {id: idUser} = req.login
        const {id: idProject} = req.project

        const result = await ModelProject.contacts(idUser, idProject)

        if (result.status == false){
            const {code, message} = result
            res.status(code).send(message)
        }else{
            for (const user of result) {
                if (user.picture != null && user.picture.length > 0) {
                    // Converte a imagem de perfil para base64
                    const bufferValue = Buffer.from(user.picture);
                    user.picture = bufferValue.toString('base64');
                }
            }
            res.send(result)
        }
    }

    async messages(req, res){
        const {id: idReceiver} = req.login
        const {id: idProject} = req.project
        const {id: idSender} = req.query

        const result = await ModelProject.getMessages(idSender, idReceiver, idProject)

        if (result.status == false){
            const {code, message} = result
            res.status(code).send(message)
        }else{
            for (const message of result) {
                if (message.idSender == idReceiver){
                    delete message.idSender
                    message.type = "sent"
                }else{
                    delete message.idSender
                    message.type = "received"
                }
            }
            res.send(result)
        }

    }

    async readMessage(req, res){
        const {id: idReceiver} = req.login
        const {id: idProject} = req.project
        const {id: idSender} = req.body

        const result = await ModelProject.readMessage(idSender, idReceiver, idProject)

        if (result.status == false){
            const {code, message} = result
            res.status(code).send(message)
        }else{
            res.send(result)
        }
    }
    
 
}