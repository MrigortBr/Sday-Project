// Importa as mensagens de retorno e a connection com o mysql
const connection = require("./Connection")
const messages = require("../messages/User")

module.exports = new class User{
    //Responsavel por fazer a busca no banco de dados verificando se as informações passadas pela chave jwt são validas
    async authenticateLogin(user){
        //Desestrutura o campo user
        const {email, id, name} = user;
        try {
            //Faz uma busca no banco de dados por usuarios que tenham o mesmo email, id e nome (unico) e depois o retorna
            const response = await connection.select(['name', 'picture', 'email', 'id']).table("users").where({email: email, id: id, name: name})
            return response;
        } catch (error) {
            //Caso haja algum erro informa no console do servido
            console.log(error)
            //caso aconteça algum erro retorna como erro para posteriormente ser retornado ao usuario 
            const response = await messages.unknownError()
            return response;
        }
    }

    //Responsavel por fazer a busca de login no banco de dados
    async login(email){
        //Busca o email do usuario e retorna a contra encontrada com o email enviado retornando para o controller para ser feita a verificação
        const response = this.findByEmail(email)
        return response;
    }

    //Busca um email no banco de dados
    async findByEmail(email){
        try {
            //Tenta buscar um email igual o informado
            const result = await connection.select().table("users").where({email: email})
            return result
        } catch (error) {
            //Informa no console do servidor o erro que aconteceu
            console.log(error)
            //caso haja algum erro retona para o Controller informando que houve um erro desconhecido
            return messages.unknownError()
        }
    }

    async findByid(id){
        try {
            //Tenta buscar um id igual o informado
            const result = await connection.select().table("users").where({id: id})
            return result
        } catch (error) {
            //Informa no console do servidor o erro que aconteceu
            console.log(error)
            //caso haja algum erro retona para o Controller informando que houve um erro desconhecido
            return messages.unknownError()
        }
    }

    //Responsavel por realizar o cadastro do usuario e validar se o email ja está inserido
    async register(user){
        const { name, surname, picture, email, birth, password } = user
        try {
            //Conecta no banco tentanto inserir se o email ja existir como ele é unique key o mysql retorna o erro
            await connection.insert({name, surname, picture, email, birth, password}).into("users")
            return {status: true, code: 1};
        } catch (error) {
            console.log(error)
            //identifica-se o erro do mysql para saber se o erro é desconhecido ou se é porque o email ja existe
            if (error.errno == 1062){
                return {status: false, code: 0};
            }else{
                return {status: false, code: -1};
            }
        }
    }

    //Atualiza a conta do usuario
    async update(User){
        try {
            //atualiza as informações do usuario atraves da class usuario que tem todos os atributos do usuario
            const result = await connection.update(User).table("users").where({id: User.getId()})
            //Retorna true se não houver erro
            return true;
        } catch (error) {
            //Caso tenha um erro ele sera enviado para o console e informa para o usuario que é o erro desconhecido
            console.log(error)
            return messages.unknownError()
        }
    }
    
    //Deleteta a conta do usuario
    async delete(email, id){
        try {
            //Tenta deletar a conta do usuario
            const result = await connection.del().table("users").where({id: id, email: email});
            return true;
        } catch (error) {
            //Informa no console do servidor o erro que aconteceu
            console.log(error)
            if (error.errno == 1451){
                //Informa para o usuario sair de todos os projetos no qual ele está relacionado
                return messages.leaveForDelete();
            }else{
                //caso haja algum erro retona para o Controller informando que houve um erro desconhecido
                return messages.unknownError()
            }

        }
    }
}