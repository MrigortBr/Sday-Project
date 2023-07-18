//Importa a classe JWT e model
const ModelProject = require("../models/Project")
const jwtClass = require("../classes/secretKey");

module.exports = async(req, res, next) =>{
    //Seleciona o id do projeto
    const idProject = req.params.idproject
    //Envia para decodificar na class jwtClass (secretKey.js)
    const user = await jwtClass.decode(req);

    //Valida se o usuario a jwt conseguiu ser decodificada
    if (user.status !== false){
        //Verifica se o usuario está no projeto no qual ele está tentando acessar
        const result = await ModelProject.userInProject(idProject, user.data.id)
        //Caso o retorno seja falso nao permite o usuario passar para o controller
        if (result.status == false){
            const {code, message} = result
            res.status(code).send(message);
            return;
        }else{
            //Cria duas informações para passar para o controller
            //req.login = Informações do usuario
            req.login = user.data
            //req.project = informações do projeto
            req.project = result
            //Transforma a imagem do projeto em base64 para diminuir o peso da resposta
            const bufferValue = Buffer.from(req.project.picture);
            req.project.picture = bufferValue.toString('base64');
            next()
        }
    //Retorna para o usuario que houve uma falha ao decodificar suas informações
    }else{
        const {code, message} = user
        res.status(code).send(message);
    }
}
