//Biblioteca de validação 
const validator = require("validator");
const moment = require("moment");

//Responses para os metodos de Login
const responses = require("../messages/User");

//Classe para o gerenciamento de keys jwt
const JwtObject = require("../classes/secretKey");

//Model do usuario
const ModelUser = require("../models/User");

//Classe do usuario, para criação de senhas e validação
const UserObject = require("../classes/User");


module.exports = new class UserController{
    
    //Retorna a imagem e o nome do usuario
    async home(req, res){
        try {
            const bufferValue = Buffer.from(req.login.picture);
            req.login.picture = bufferValue.toString('base64');
        } catch (error) {
            
        }
        res.status(200).send({name: req.login.name, picture: req.login.picture});
    }

    // Responsavel por fazer o login do usuario
    async login(req, res) {
        // Desestrutura o req.body (dados enviados pelo usuario) em duas variaveis: email e password
        const {email, password} = req.body;

        // Verifica se email e password não estão vazios
        if (email && password) {
            // Usa a biblioteca validator para validar se o email enviado é um email valido
            if (validator.isEmail(email)) {
                // Pega os dados do email enviado para poder validar com a senha enviada
                const response = await ModelUser.login(email);
                // Verifica se não houve nenhum erro
                if (response.status == false) {
                    // Desestrutura o response (variavel de retorno do ModelUser.login) e retorna o erro com mensagem caso exista
                    const {code, message} = response;
                    res.status(code).send(message);
                } else {
                    // Verifica se encontrou algum usuario
                    if (response.length == 0) {
                        // Desestrutura o response e retorna para o usuario informando que o email é invalido
                        const {code, message} = await responses.invalidEmail();
                        res.status(code).send(message);
                    } else {
                        // Cria um instacia da classe 
                        const user = new UserObject(response.id, response[0].name, response[0].surname, response[0].picture, response[0].email, response[0].birth, null);
                        // Valida a senha usando os metodos da classe UserObject
                        if (user.validatePassword(password, response[0].password)) {
                            // Cria a chave jwt e envia para o usuario
                            const jwtKey = await JwtObject.enconde({email: response[0].email, id: response[0].id, name: response[0].name});
                            const {code, token} = await responses.validLogin(jwtKey);
                            res.status(code).send(token);
                        } else {
                            // Desestrutura o response e informa para o usuario que sua senha é invalida
                            const {code, message} = await responses.invalidPassword();
                            res.status(code).send(message);
                        }
                    }
                }
            } else {
                // Desestrutura o response e informa que o email está invalido
                const {code, message} = await responses.invalidEmail();
                res.status(code).send(message);
            }
        } else {
            // Desestrutura o response e informa que os campos estão vazios
            const {code, message} = await responses.unfilledFields();
            res.status(code).send(message);
        }
    }

    //Metodo responsavel por realizar a validação dos dados recebidos e registar um novo usuario no banco de dados
    async register(req, res){
        //Desestrutura o req.body(informações passadas pelo usuario) e verifica se alguma está vazia e se estiver retorna para o usuario qual campo está invalido
        const { name, surname, email, birth, password } = req.body;
        const emptyFields = [];

        if (!name) {
            emptyFields.push('Nome');
        }

        if (!surname) {
            emptyFields.push('SobreNome');
        }

        if (!email) {
            emptyFields.push('Email');
        }

        if (!birth) {
            emptyFields.push('Data Nascimento');
        }

        if (!password) {
            emptyFields.push('senha');
        }

        //Verifica se algum campo ficou vazio e se ficar retorna a mensagem "personalizada" para o usuario
        if (emptyFields.length > 0) {
            res.status(400).send({
                message: `${emptyFields.join(' e ')} vazios`,
            });
        } else { 
            //Valida se o email é valido
            if (!validator.isEmail(email)) {
                //Instacia a responses e envia a mensagem informando que o email é invalido
                const {code, message} = await responses.invalidEmail();
                res.status(code).send(message);
            }else {
                //Cria uma data moment para fazer a validação
                let momentDate = moment(birth, 'YYYY-MM-DD', true);
                if (!momentDate.isValid){
                    //Instacia a responses e envia a mensagem informando que a data de nascimento é invalida
                    const {code, message} = await responses.invalidBirth();
                    res.status(code).send(message);
                }else{
                    //Cria um novo objeto
                    const user = new UserObject(null, name, surname, null, email, birth, password);
                    //Tenta fazer a inserção do usuario no banco de dados
                    const result = await ModelUser.register(user);
                    //Verifica se o banco tem exito em registrar o usuario
                    if (result.status == false){
                        //Se caso o codido for == 0 significa que o email ja existe portanto nao da para registrar o usuario
                        if (result.code == 0){
                            const {code, message} = await responses.emailExists();
                            res.status(code).send(message);
                        }else{
                            const {code, message} = await responses.unknownError();
                            res.status(404).send(message);
                        }
                    }else{
                        const {code, message} = await responses.successRegister();
                        res.status(code).send(message);
                    }
                }
            }
        }
    }

    //Responsavel por listar todos os valores do usuario para permitir que ele possa atualizar seus dados
    async settings(req, res){
        //Pega o email que é lido pelo middleware
        const {email} = req.login;
        //Verifica se existe um usuario que tem esse email tendo em vista que é unique key
        const result = await ModelUser.findByEmail(email);
        if (result.status == false){
            //Retorna a mensagem de erro
            const {code, message} = result;
            res.status(code).send(message);
        }else{
            //Retorna as informações
            let {name, surname, birth, email, picture} = result[0];
            try {
                const bufferValue = Buffer.from(picture);
                picture = bufferValue.toString('base64');
            } catch (error) {
                
            }
            res.status(200).send({name: name, surname: surname, birth: birth, email: email, picture: picture});
        }
    }

    //Metodo reponsavel por atualizar a informações do usuario
    async update(req, res){
        //Pega as informações que estão sendo passadas pelo front
        const {name, surname, birth, email, picture, password, newPassword} = req.body;
        //Caso algo dos campos seja vazio ele retorna avisando que devem ser preenchidos
        if (!name || !surname || !birth || !email || !password){
            const {code, message} = await responses.unfilledFields();
            res.status(code).send(message);
            return;
        }
        //Pega o id da jwt do usuario
        const {id} = req.login;
        //Cria um usuario com os dados "novos"
        const User = new UserObject(id, name, surname, picture, email, birth, null);
        
        //Busca o email informado pelo usuario
        const emailFinded = await ModelUser.findByEmail(email);

        //Verifica se ja está em uso e que nao seja ele
        if (emailFinded.length > 0 && emailFinded[0].id != id){
            //Retorna para o ususario falando que o email está em uso
            const {code, message} = await responses.emailInUse();
            res.status(code).send(message);
        }else{
            //Busca os dados do usuario que estão salvos
            const user = await ModelUser.findByid(User.id);
            //Valida a senha
            if (User.validatePassword(password, user[0].password) && user[0].id == id){
                //Verifica se a senha foi mudada
                if (newPassword) User.setPassword(newPassword);
                else User.setPassword(password);

                //Passa para o model a classe de usuario para pode atualizar
                const result = await ModelUser.update(User);
                if (result.status == false){
                    const {code, message} = result;
                    res.status(code).send(message);
                }else{
                    //Cria uma nova key jwt ja que a validação dela e email e nome
                    const keyJwt = await JwtObject.enconde({email: User.getEmail(), id: User.getId(), name: User.getName()});
                    //Envia a requisição de volta com mensagem de sucesso e o jwtKey
                    const {code, jwtKey, message} = await responses.successUpdate(keyJwt);
                    res.status(code).json({message: message, key: jwtKey});
                }
            }else{
                //Se a senha estiver invalida retorna para o usuario (e se os ids nao baterem significa que houve uma tentativa de burlagem)
                const {code, message} = await responses.invalidPassword();
                res.status(code).send(message);
            }
        }
    }

    //Metodo responsavel por deletar a conta do usuario e os projetos no qual ele é dono
    async delete(req, res){
        const {email, id} = req.login;
        const result = await ModelUser.delete(email, id);
        if (result.status == false){
            const {code, message} = result;
            res.status(code).send(message);
        }else{
            const {code, message} = await responses.successDelete();
            res.status(code).send(message);
        }
    }   
}