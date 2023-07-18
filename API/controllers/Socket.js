const socketIo = require('../index.js');



//Importa a classe JWT e model
const ModelProject = require("../models/Project")
const jwtClass = require("../classes/secretKey");

async function verifyUser(idUser, idProject){
    const result = await ModelProject.userInProject(idProject, idUser)
    if (result.status == false){
        return false
    }else{
        return true
    }
}

async function validateRoom(jwtSender, idReceiver, idProject){
    const user = await jwtClass.decode(jwtSender)
    
    if (user.status == true){
        const resultSender = await verifyUser(user.data.id, idProject)
        const resultReceiver = await verifyUser(idReceiver, idProject)

        if (resultReceiver == true && resultSender == true){
            return user.data.id;
        }else{
            return false
        }
    }else{
        return false;
    }
}

socketIo.on("connection", async (socket, values) => {
    let token = socket.handshake.query.token
    const project = socket.handshake.query.project
    const decoded = await jwtClass.decode(token)

    if (decoded.status == true && project != undefined){
        const userInProject = verifyUser(decoded.data.id, project)
        if (userInProject){
            socket.join(`${decoded.data.id}from${project}`)
            socket.emit("connected", `${decoded.data.id}from${project}`)
        }else{
            socket.disconnect()
        }
    }else{
        socket.disconnect()
    }

    socket.on("enterRoom", async (r, callback)=>{
        const connectionIsValid = await validateRoom(r.user, r.to, r.project)
        if (connectionIsValid != false){
            socket.join(`${connectionIsValid}to${r.to}in${r.project}`)
            callback(`${connectionIsValid}to${r.to}in${r.project}`)
        }else{
            callback(connectionIsValid)
        }
    })

    socket.on("sendMessage", async (r, callback) =>{
        const regex = /(\d+)to(\d+)in(\d+)/;
        const chatEmit = r.chat.replace(regex, '$2to$1in$3');
        if (regex.test(r.chat)) {
            const matches = regex.exec(r.chat);
            idSender = matches[1];
            idReceiver = matches[2];
            idProject = matches[3];
            const result = await ModelProject.sendMessage(idSender, idReceiver, idProject, r.message, new Date())
            if (result.status == false){
                return false;
            }else{
                console.log(chatEmit)
                console.log(`${idReceiver}from${idProject}`)
                socket.to(chatEmit).emit(chatEmit, {message: r.message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), type: "received"})
                socket.to(`${idReceiver}from${idProject}`).emit(`${idReceiver}from${idProject}`, {idUser: idSender, message: r.message})

            }
          } else {
            return false;
          }
        
    })
  // Lógica adicional para lidar com eventos de conexão
});

