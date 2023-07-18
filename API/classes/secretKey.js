const jwt = require("jsonwebtoken");
const secret = "akdaskdaksgjdfbvjdjvkferfgepvepvkxkqkwskqx";
const keyClass = require("../messages/KeyClass");

module.exports = new class secretKey{
    async enconde(data){
        try {
            //Tenta codificar a chave caso não consiga ele retorna o erro desconhecido
            const dataEncoded = await jwt.sign(data, secret)
            return dataEncoded;
        } catch (error) {
            console.log(error)
            return keyClass.unknownError()
        }
    }

    //Função responsavel por decodificar a jwt key enviada pelo usuario na qual contem os dados do usuario
    async decode(req){
        //Usa a função verifyKey para verificar a chave e depois decodificar
        const jwtKey = await this.verifyKey(req)
        if (jwtKey.status == false){
            return jwtKey;
        }else{
            //Tenta decodificar a chave jwt
            const dataEncoded = await jwt.decode(jwtKey, secret)
            //Caso o resultado seja algo diferente de null ele retorna sem messagem de erro
            if (dataEncoded){
                return keyClass.keyValid(dataEncoded);
            }else{
                return keyClass.invalidKey()
            }
        }
    }

    //Função para validar a jwt passada
    async verifyKey(req){
        let data = ''
        try {
            //Lê o header que deveria estar a jwt
            data = req.headers['authorization'];
        } catch (error) {
            //Lê a key que ja foi encaminhada sem o req
            data = req
        }
        //Valida se o jwt não é uma string vazia
        if (typeof data !== 'string' || data.trim().length === 0) {
            //Se for invalida retorna um array com informações ja para o front-end de facil entendimento para o usuario
            return keyClass.emptyKey();
        }else{
            //Retira o barrear que fica antes da key
            const jwtKey = data.split(" ")[1];
            //Retorna apenas a key
            return jwtKey
        }
    }
}