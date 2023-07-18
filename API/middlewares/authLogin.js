//Importa a classe JWT, model e messages
const jwtClass = require("../classes/secretKey");
const model = require("../models/User")
const messages = require("../messages/AuthLogin")

module.exports = async(req, res, next) =>{
    //Envia para decodificar na class jwtClass (secretKey.js)
    const data = await jwtClass.decode(req);
    //Valida se foi informado um erro na hora de decodificar
    if(data.status){
        console.log(data)
        //Autentica o login  verificando as informações do usuario
        const result = await model.authenticateLogin(data.data)
        //Caso a autenticação tenha falhando retorna para o usuario
        if (result.status == false){
            const {code, message} = result;
            res.status(code).send(message);
        }else{
            //caso o usuario nao tenha sido encontrado retorna para o usuario
            if (result.length == 0){
                const {code, message} = await messages.invalidAuthentication()
                res.status(code).send(message);
            }else{
                //Se for encontrado retorna permite a passagem para o controller ja enviado as informações do usuario no qual está conectando pelo parametro req.login
                req.login = result[0]
                next();
            }
            
        }
    }else{
        //Retorna o codigo de erro e a mensagem para o usuario
        const {code, message} = data;
        res.status(code).send(message);
    }   
}