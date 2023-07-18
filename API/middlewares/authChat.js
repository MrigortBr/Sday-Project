const jwt = require("jsonwebtoken");
const secret = "akdaskdaksgjdfbvjdjvkferfgepvepvkxkqkwskqx"
const projectModel = require("../models/Project")

module.exports = async(jwtCode, idProject, idReceiver) =>{
    const user = jwtCode.split(" ")[1];
    const token = jwt.decode(user, secret)
    const result = await projectModel.userInProject(idProject, token.id)
    let resultSecond = false
    if (resultSecond == undefined){
        resultSecond = true
    }else{
        resultSecond = await projectModel.userInProject(idProject, idReceiver)
    }
    
    if (result.status && resultSecond.status){
        result.data.idUser = token.id
        return {status: true, result: result.data};
        
    }else{
        return {status: false};
    }

}