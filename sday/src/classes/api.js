import axios from "axios"

class API{
    async transformImageUser(image){
        image = atob(image)
        if (image.length < 200){
            try {
                try {
                    image = require("../assets/"+image+".svg") 
                } catch (error) {
                    image = image.split(".")[0].replace("/img/", "")
                    image = require("../assets/"+image+".svg")
                }
            } catch (error) {
                image = require("../assets/undraw_male_avatar_g98d.svg")
            }
        }
        return image
    }

    async transformImageProjects(image){
        image = atob(image)
        if (image.length < 200){
            try {
                try {
                    image = require("../assets/"+image+".svg") 
                } catch (error) {
                    image = image.split(".")[0].replace("/img/", "")
                    image = require("../assets/"+image+".svg")
                }
            } catch (error) {
                image = require("../assets/undraw_performance_overview_re_mqrq.svg")
            }
        }
        return image
    }

    //Pega a key jwt do usuario
    async getHeader(){
        //Pega a key e formata ela
        const headers = {Authorization: "Bearer "+localStorage.getItem("jwt")};
        return headers;
    }

    //Pega o usuario logado
    async getLogin(){
        //Importa a key jwt
        const headers = await this.getHeader()

        //Faz a requisição para pegar os valores do usuario para verificar se seus dados são valido
        const result = axios.get("http://127.0.0.1:8080/users/home", {headers})
        .then(async data =>{
            //Caso verdadeiro retorna o valor passado
            data.data.picture = await this.transformImageUser(data.data.picture)
            return data.data
        })
        .catch((error) =>{
            console.log(error)
            //Caso falso retorna o valor de erro
            return error.response.data
        })

        //Retorna o resultado
        return result
    }

    //Mostra os projetos do usuario
    async myProjects (){
        const headers = await this.getHeader()

        const result = axios.get("http://127.0.0.1:8080/projects/myProjects", {headers})
            .then(async r =>{
                for (const project of r.data) {
                    project.picture = await this.transformImageProjects(project.picture)
                }
                return {status: true, data: r.data} 
            }).catch((error) =>{
                return {status: false, data: error.response}
            })

        return result;

    }

    //Mostra as informaçoes do usuario para permitir a edição
    async settings(){
        const headers = await this.getHeader()
        const result = axios.get("http://127.0.0.1:8080/users/settings", {headers}).then(async r =>{
            r.data.picture = await this.transformImageUser(r.data.picture)
            return {status: true, data: r.data} 
        }).catch((error) =>{
            return {status: false, data: error.response}
        })

        return result
    }

    //Responsavel por atualizar o usuario
    async update(name,surname,birth,email, newPassword, picture,oldPassword){
        const headers = await this.getHeader()
        const result = axios.post("http://127.0.0.1:8080/users/update", {name: name, surname: surname, birth: birth, email: email, picture: picture, password: oldPassword, newPassword: newPassword},{headers}).then((r) =>{
            localStorage.setItem("jwt", r.data.key)
            return {status: true, data: r.data} 
        }).catch(error =>{
            return {status: false, data: error.response}
        })

        return result
    }

    //Responsavel por deletar o usuario
    async delete(){
        const headers = await this.getHeader()

        const result = axios.post("http://127.0.0.1:8080/users/delete", {},{headers}).then(() =>{
            return {status: true}
        }).catch(error=>{   
            return {status: false, data: error.response}
        })

        return result;
    }

    async newProject(name, description, picture){
        const headers = await this.getHeader()

        const result = axios.post("http://127.0.0.1:8080/projects/register", {name: name, description: description, picture: picture}, {headers}).then((r) =>{
            return {message: r.data, status: true}
        }).catch(error =>{
            return {status: false, data: error.response}
        })

        return result
    }

    async login(email, password){
        const result = axios.post("http://localhost:8080/users/login", {email: email, password: password}).then(r =>{
            localStorage.setItem("jwt", r.data)
            return {data: r.data, status: true}
        }).catch(error =>{
            return {data: error.response.data, status: false}
        })

        return result;
    }

    async register(name, surname, email, birth, password, passwordConfirm){
        const user = {name: name, surname: surname, email: email, birth: birth, password: password, passwordConfirm: passwordConfirm}

        const result = axios.post("http://localhost:8080/users/register", user).then(r =>{
            return {data: r.data, status: true}
        }).catch(error =>{
            return {data: error.response.data, status: false}
        })

        return result
    }

    async getCalendar(id, dateSelect){
        const headers = await this.getHeader()
        console.log(`http://127.0.0.1:8080/projects/${id}/calendar`)

        const result = axios.get(`http://127.0.0.1:8080/projects/${id}/calendar`, {headers, params: {dateSelect: dateSelect}}).then(r =>{
            return r.data
        }).catch(() =>{

        })

        return result;
    }

    async userInProject(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/inproject`, {headers}).then(r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })


        return result
    }

    async settingsProject(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/settings`, {headers}).then(async r =>{
            r.data.picture = await this.transformImageProjects(r.data.picture)
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async updateProject(idProject, name, description, picture){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/update`, {name: name, description: description, picture: picture},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async deleteProject(idProject){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/delete`, {},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async getTasks(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/tasks`, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async getMyTasks(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/tasks?my`, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async finishSubTask(idProject ,idSubTask, my){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/finish?my`,{idSubTask: idSubTask, my: my}, {headers}).then(async r =>{
            return {status: true, data: r.data}
            
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async getUsers(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/users`, {headers}).then(async r =>{
            for (const user of r.data) {
                user.picture = await  this.transformImageUser(user.picture)
            }
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async getTask(idProject, idTask, idSubTask){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/task`, {headers, params:{idTask: idTask, idSubTask: idSubTask}}).then(async r =>{
            return {status: true, data: r.data}

        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async finishForUser(idUser, idSubTask, idProject){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/finish?my`,{idSubTask: idSubTask, idSended: idUser}, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async deleteTask(idTask, idProject, type){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/delete/task`,{id: idTask, type: type}, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async updateTask(current, idProject){
        const headers = await this.getHeader()

        const {name, id, color, description} = current
        const result = axios.post(`http://localhost:8080/projects/${idProject}/update/task`, {name: name, id:id, color: color, description: description, type: 1},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })
        return result;
    }

    async updateSubTask(current, idProject, idTask, users){
        const headers = await this.getHeader()

        const {id,name, description, created, finished} = current
        const result = axios.post(`http://localhost:8080/projects/${idProject}/update/task`,{id: id, name: name, description: description, created: created, finished: finished, idTask: idTask, type: 2, users: users}, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })
        return result;
    }

    async invite(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/invite`, {headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async enter(code){
        const headers = await this.getHeader()
        console.log("oiiiii")
        const result = axios.post(`http://localhost:8080/projects/${code}`, {},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async promote(idProject, idUser, permission){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/promote`, {idUser: idUser, permission: permission},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async remove(idProject, idUser){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/remove`, {idUser: idUser},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async leave(idProject){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/leave`, {},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async contacts(idProject){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/contacts`, {headers}).then(async r =>{
            for (const users of r.data) {
                users.picture = await this.transformImageUser(users.picture)
            }
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async readMessage(idProject, idSender){
        const headers = await this.getHeader()

        const result = axios.post(`http://localhost:8080/projects/${idProject}/readMessage`, {id: idSender},{headers}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }

    async messages(idProject, idUser){
        const headers = await this.getHeader()

        const result = axios.get(`http://localhost:8080/projects/${idProject}/messages`, {headers, params:{id: idUser}}).then(async r =>{
            return {status: true, data: r.data}
        }).catch(error =>{
            return {status: false, data: error.response.data}
        })

        return result;
    }


}
export default new API();