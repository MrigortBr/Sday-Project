// Importa as mensagens de retorno e a connection com o mysql
const connection = require("./Connection")
const messages = require("../messages/Project")

module.exports = new class Project{
    //Informa todos os projetos que o usuario está inserido
    async projectsUser(id){
        try {
            //Cria a query e faz a consulta
            const result = await connection.select(["projects.name", "projects.picture", "projects.id"]).table("project_users").join("projects", "project_users.idproject", "=", "projects.id").where({idUser: id});
            return result
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError()
        }
    }

    //Faz o registro do projeto chamando o call do banco de dados
    async register(project, idUser, email){
        //Pega os valores "name", "picture", "descrição"
        const {name, picture, description} = project
        try {
            //Chama o "call createProject" procedure que tem a função de criar o projeto
            const result = await connection.raw("call createProject(?, ?, ?, ?, ?)", [name, picture, description, idUser, email])
            //Retorna true se nao precisar chamar o catch
            return true
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError()
        }
    }

    //Detecta se o usuario está no projeto enviado
    async userInProject(idProject, idUser){
        try {
            //Cria a query para o checar no banco se o usuario está no banco de dados
            const result = await connection.select(["projects.*","permission"]).table("project_users").join("projects", "project_users.idproject", "=", "projects.id").where({idUser: idUser, idProject: idProject});
            
            //Se nao houver projetos encontrados retorna para o usuario falando que o codigo enviado é invalido ("result.length ==0")
            if (result.length == 0){
                return await messages.projectNotFound();
            }else{
                return result[0]
            }
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error);
            return await messages.unknownError();
        }
    }

    //Lista todos os usuarios no projeto
    async userProject(idProject){
        try {
            const result = await connection('users as u')
                .select('u.id', 'u.name', 'pu.permission', 'u.surname', 'u.picture')
                .join('project_users as pu', 'pu.idUser', 'u.id')
                .where('pu.idProject', '=', idProject);
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista todas as tasks que o usuario está relacionado
    async tasksUser(idProject, idUser){
        try {
            //Chama a procedure listTaskUser
            const result = await connection.raw("call listTaskUser(?,?)", [idUser, idProject])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista todas as tasks do projeto
    async taskAll(idProject){
        try {
            //Chama a procedure listTasks
            const result = await connection.raw("call listTasks(?)", [idProject])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista uma task pelo id
    async taskByid(idTask){
        try {
            //Chama a procedure listTask
            const result = await connection.raw("call listTask(?)", [idTask]);
            //Caso nao encontre nem uma task retora para o usuario informando que nao existe task
            if (result[0][0].length == 0){
                return await messages.taskNotFound();
            }else{
                return result[0][0][0]
            }
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista todas as subtasks pelo id da task pai
    async subTasksByTask(idTask){
        try {
            //chama a procedure listSubTask
            const result = await connection.raw("call listSubTask(?)", [idTask]);
            return result[0][0]
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista uma subtask pelo seu id
    async subtaskById(idSubTask){
        try {
            //Cria a query
            const result = await connection.select().table("subtasks").where({id: idSubTask});
            return result[0]
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Lista os usuarios na task e se ja concluiram a task
    async usersFinished(idSubTask){
        try {
            //Cria a query
            const result = await connection.select('users.id', 'subtask_users.finished').table("subtask_users")
                .join('users', 'users.id', '=', 'subtask_users.idUser').where({idSubTask: idSubTask})
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }  
    }

    //Lista todas as subtasks que o usuario esta relacionado
    async subtaskUser(idTask, idUser){
        try {
            //chama a procedure ListSubTaskUser
            const result = await connection.raw("call listSubTaskUser(?,?)", [idUser, idTask])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            return await messages.unknownError();
        }
    }

    //Lista a subtask
    async subtask(idTask){
        try {
            //Chama a procedure listSubtask
            const result = await connection.raw("call listSubtask(?)", [idTask])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            return await messages.unknownError();
        }
    }

    //Marca como finalizado a tarefa do usuario
    async finish(idSubTask, idUser){
        try {
            //Cria a query
            const result = await connection.update({finished: 1}).table("subtask_users").where({idUser: idUser, idSubTask: idSubTask})
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Finaliza todos os usuarios relaciados a uma subtask 
    async finishAll(idSubTask, idUser){
        try {
            //Cria a query
            const result = await connection('subtask_users as stu').join('subtasks as st', 'st.id', '=', 'stu.idSubTask').join('tasks as t', 't.id', '=', 'st.idTask').join('project_users as p', function() {this.on('p.idProject', '=', 't.idProject').andOn('p.idUser', '=', idUser).andOn('p.permission', '<', 2);}).where('stu.idSubTask', idSubTask).update('stu.finished', true)
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        } 
    }

    //Lista o calendario do usuario dependendo do dia que foi enviado
    async calendar(idUser, idProject, dateSelected){
        try {
            //Chama a procedure listCalendar
            const result = await connection.raw("call listCalendar(?,?,?)", [idUser, idProject, dateSelected])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();
        }
    }

    //Deleta um Projeto
    async delete(idProject){
        try {
            //Cria uma transaction que tem o objeto de deletar o projeto e todos seus filhos/netos/bisnetos
            const result = await connection.transaction(async con =>{
                //Seleciona todas as tasks do projeto
                const tasks = await con.select("id").table("tasks").where({idProject: idProject})
                //Verifica se existe alguma
                if (tasks.length > 0){
                    //Pega apenas o id das tasks
                    let idsTask = tasks.map(task => task.id)
                    //Lista todas as subtasks relacionadas ao ids das task
                    let subTasks = await con.select("id").table("subtasks").whereIn('idTask', idsTask)
                    //Verifica se foi encontada alguma
                    if (subTasks.length > 0){
                        //Transforma todos os ids para uma array
                        let idSubTask = subTasks.map(subTask => subTask.id)
                        //Deleta todos os relacionamentos dos usuarios que tenham um relacionamento com a subtask
                        await con.del().table("subtask_users").whereIn('idSubTask', idSubTask)
                        //Deleta todas as subtasks do projeto
                        await con.del().table("subtasks").whereIn('id', idSubTask)
                        
                    }
                    //Deleta todas as tasks do projeto
                    await con.del().table("tasks").whereIn('id', idsTask)
                }
                //Deleta todas as mesagens do projeto
                await con.del().table("chat").where({idProject: idProject});
                //Deleta todos os usuarios relacionados ao projeto
                await con.del().table('project_users').where({idProject: idProject});
                //Deleta o projeto
                await con.del().table("projects").where({id: idProject})
            })
            return true;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError(); 
        }
    }

    //Atualiza o projeto * 
    async update(name, description, picture, idproject){
        try {
            //Cria a query *
            const result = connection.update({name: name, description: description, picture: picture}).table("projects").where({id: idproject})
            return result
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError(); 
        }
    }

    //Atualiza uma subTask
    async updateSubTask(subtask, users, idproject){
        try {
            //Inicializa uma transaction pois devem ser feito mais de uma requisição ao banco
            const result = await connection.transaction(async con =>{
                //Faz um forof com os usuarios passados pelo controller
                for (const user of users) {
                    //Verifica se o usuario é novo
                    if (user.new){
                        //Verifica se o usuario está no projeto
                        const userInProject = await this.userInProject(idproject, user.idUser)
                        //se estiver retorna o erro
                        if (userInProject.status == false){
                            return await messages.userNotInProject(); 
                        }else{
                            //Insere o usuario
                            try {
                                await con.insert({idUser: user.idUser, idSubTask: subtask.id, finished: user.finish}).table("subtask_users")
                            } catch (error) {
                                await con.update({finished: user.finish}).table("subtask_users").where({idUser: user.idUser, idSubTask: subtask.id})
                            }   
                        }
                    }else{
                        //se nao for um usuario novo apenas atualiza sua situação (finished = true or false (1,0))
                        await con.update({finished: user.finish}).table("subtask_users").where({idUser: user.idUser, idSubTask: subtask.id})
   
                    }
                }
                //Transforma o objeto de usuarios em uma array de ids
                const idUsers = users.map(user => user.idUser)
                //Deleta todos os usuarios que não estão na subtask para caso o usuario tenha os removido
                await con.del().table("subtask_users").whereNotIn('idUser', idUsers).where({idSubTask: subtask.id})
                //Atualiza a subtask
                await con.update(subtask).table("subtasks").where({id: subtask.id})
            })

            return {status: true};
        } catch (error) {
            //Caso o erro seja o 1062 significa que o usuario ja está inserido portanto nao pode ser inserido novamente caso contrario informa que o erro é desconhecido
            if (error.errno == 1062){
                return await messages.dataInvalid(); 
            }else{
                console.log(error)
                return await messages.unknownError(); 
            }
        }
    }

    //Atualiza a task
    async updateTask(task, idProject){
        try {
            //Cria a query de atualização da task
            const result = await connection.update(task).table("tasks").where({id: task.id, idproject: idProject})
            return result
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError(); 
        }
    }

    //Cria uma subtask
    async createSubTask(subtask, users){
        try {
            //Inicia uma transaction pois devem ser feitos mais de um "insert" no banco de dados
            const result = await connection.transaction(async con =>{
                //Insere a subtask passada pegando o id novo na variavel resultSubTask
                const resultSubtask = await con.insert(subtask).table("subtasks")
                //Cria uma varivel para poder passa direto no inser
                const usersInsert = []
                //Faz um forof de todos os usuarios pegando apenas o id,Finshed e idSubtask
                for (let user of users) {
                    usersInsert.push({idUser: user.idUser, finished: user.finish, idSubTask: resultSubtask[0]})
                 }
                 //Insere os usuarios novos caso tenha usuarios para ser inseridos
                 if (usersInsert.length > 0){
                    try {
                        await con.insert(usersInsert).table("subtask_users");
                    } catch (error) {
                        console.log(error)
                    }
                 }
                 return resultSubtask[0];
            })
            return result;
            
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    //Cria uma task
    async createTask(task){
        try {
            //Cria a query de inserção da task
            const result = await connection.insert(task).table("tasks")
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    //Deleta a task
    async deleteTask(idTask){
        try {
            const result = await connection.transaction(async con =>{
                const subtasks = await con.select("id").table("subtasks").where({idTask:  idTask})

                for (const subtask of subtasks) {
                    await con.del().table("subtask_users").where({idSubTask: subtask.id});
                    await con.del().table("subtasks").where({id: subtask.id});
                }

                await con.del().table("tasks").where({id: idTask})
            })

            return true;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();      
        }
    }
    
    //Deleta a subtask
    async deleteSubTask(idSubtask){
        try {
            const result = await connection.transaction(async con =>{
                await con.del().table("subtask_users").where({idSubTask: idSubtask});
                await con.del().table("subtasks").where({id: idSubtask});
            });
            return true;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async enterInProject(idProject, idUser){
        try {
            const result = await connection.insert({idUser: idUser, idProject: idProject, permission: 2}).table("project_users")
            return true;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async promote(idUser, idProject, permission){
        try {
            const result = await connection.update({permission: permission}).table("project_users").where({idUser: idUser, idProject: idProject}).whereNot({permission: 0})
            if (result == 0){
                return await messages.unknownError();  
            }else{
                return true;

            }
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async leave(idUser, idProject){
        try {
            const result = await connection.transaction(async r=>{
                const subtasks = await r.select('stu.idSubTask')
                .from('subtask_users as stu')
                .leftJoin('subtasks as st', 'st.id', 'stu.idSubTask')
                .join('tasks as t', 'st.idTask', 't.id')
                .where('t.idProject', idProject)
                .andWhere('stu.idUser', idUser)
                
                await r.del().table("subtask_users").whereIn("idSubTask", subtasks.map(subtask => subtask.idSubTask)).where({idUser: idUser})

                await r.del().table("project_users").where({idProject: idProject, idUser: idUser})

                return true;
            })

            
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async contacts(idUser, idProject){
        try {
            const result = await connection.raw("call getContacts(?, ?)", [idProject, idUser])
            return result[0][0];
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async getMessages(idSender, idReceiver, idProject){
        try {
            const result = await connection.select(["message", "date", "idSender"]).into("chat").where({idSender: idSender, idReceiver:idReceiver, idProject:idProject}).orWhere({idSender: idReceiver, idReceiver:idSender, idProject:idProject})
            return result;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async readMessage(idSender, idReceiver, idProject){
        try {
            await connection.update({readed: true}).table("chat").where({idSender: idSender, idReceiver:idReceiver, idProject:idProject})
            return {status: true, messages: "Mensagens lidas com sucesso"};
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }

    async sendMessage(idSender, idReceiver, idProject, message, date){
        try {
            await connection.insert({idSender: idSender, idReceiver: idReceiver, idProject: idProject, message: message, date: date, readed: false}).into("chat")
            return {status: true, messages: "Mensagens lidas com sucesso"};
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return await messages.unknownError();  
        }
    }
}