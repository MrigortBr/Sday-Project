<template>
    <div class="background-edit">
    <div class="leave">
        <svg @click="leave" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
        </svg>
    </div>
    <div class="background-items">
        <div class="tasks">
            <h1>Sub Tarefas</h1>
            <div class="tasks-itens">
                <div class="task" v-for="(subtask, index) of task.subtasks" :key="subtask.id" @click="openSubTask(index)">
                    <h1>{{ subtask.name }}</h1>
                </div>
            </div>
            <div class="buttons">
                <button @click="newSubTask()" v-if="task.id !== null">nova sub tarefa</button>
                <button @click="openTask()" v-if="task.id !== null">Editar Tarefa</button>
                <div class="alertTasks" v-if="task.id == null">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info" viewBox="0 0 16 16">
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    <p > Para ter acesso as Sub tarefas crie uma tarefa principal para entender mais sobre <a>clique aqui</a></p>
                </div>
            </div>

        </div>
        <div class="config">
            <h1 id="title">Editar tarefa</h1>
            <div class="inputs-background">
                <input type="text" class="task-input input-1" placeholder="Titulo *" v-model="current.name">
                <input v-if="current.created" type="date" class="task-input input-2" placeholder="Data Inicial *" v-model="current.created">
                <input v-if="current.finished" type="date" class="task-input input-2" placeholder="Data Final *" v-model="current.finished">
                <input type="text" class="task-input input-1" placeholder="Descrição *" v-model="current.description">
                <div v-if="current.color" class="task-color" >
                    <input type="color" class="task-input" v-model="current.color" :style="{backgroundColor: hexToRGBA(current.color)}">
                    <span>Cor</span>
                </div>
                <div  v-if="current.color" class="task-progress" :style="{backgroundColor: hexToRGBA(current.color)}">
                    <div :style="{backgroundColor:  current.color , width: current.progress}"></div>
                    <span>Progresso: {{ current.progress }}</span>
                </div>

            </div>
            <div class="buttons" v-if="current.id">
                <button @click="update">Atualizar</button>
                <svg @click="drop" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </div>
            <div class="buttons" v-else-if="!current.id">
                <button @click="update" style="grid-column-start: 1;grid-column-end: 3;">Criar</button>
            </div>
        </div>
        <div class="users">
            <h1>Usuarios no projeto</h1>
            <div class="background-users">
                <div class="user" :class="{'selected': user.finished !== undefined}" v-for="(user, index) of users" :key="user.id" @click="selectUser(index)">
                    <img :src="user.picture" alt="">
                    <p>{{ user.name + " " + user.surname }}</p>
                    <svg v-if="user.finished == 0" @click="finishSubTask(user.id, current.id, index)" id="marker" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        <svg v-else-if="user.finished == 1" id="marker"  style="fill: green;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import api from "../classes/api"
export default {
    data(){
        return{
            task: Object,
            current: Object,
            users: [],
            idSubTask: undefined
        }
    },
    props: ["tasks"],
    mounted(){

        if (this.tasks.id != null){
            this.loadTask()
        }else{
            this.task = {
                name: "",
                description: "",
                color: "#00BFA6"
            }
            this.current = this.task
        }

    },
    methods: {
        async loadTask(){
            const result = await api.getTask(this.$route.params.id, this.tasks.id)
            if (result.status){
                const {current, task} = result.data
                this.loadUsers()
                this.task = task
                if (current.length > 0){
                    this.current = current
                }else{
                    this.current = task
                }
            }else{
                this.leave()
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        },
        async loadUsers(){
            const result = await api.getUsers(this.$route.params.id, this.tasks.id)
            this.users = result.data
        },
        filterUsers(){
            if (this.current.users){
                for (const user of this.users) {
                    for (const userCurrent of this.current.users) {
                        if (user.id == userCurrent.id){
                            user.finished = userCurrent.finished
                            break;
                        }
                    }
                }
            }
        },
        async openSubTask(index){
            this.current = this.task.subtasks[index]
            this.idSubTask = this.task.subtasks[index].id
            const result = await api.getTask(this.$route.params.id, this.task.id, this.task.subtasks[index].id)

            if (result.status){
                for (const user of this.users) {
                    delete user.finished
                }
                const {current, task} = result.data
                current.finished =  current.finished.split("T")[0]
                current.created = current.created.split("T")[0]
                if (current){
                    this.current = current
                    this.filterUsers()
                }else{
                    this.current = task
                }
            }else{
                this.leave()
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        },
        hexToRGBA(hex) {
            hex = hex.replace('#', '');

            if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
                throw new Error('Cor hexadecimal inválida');
            }
            const red = parseInt(hex.substring(0, 2), 16);
            const green = parseInt(hex.substring(2, 4), 16);
            const blue = parseInt(hex.substring(4, 6), 16);

            const alphaValue = 0.35 || 1;

            return `rgba(${red}, ${green}, ${blue}, ${alphaValue})`;
        },
        openTask(){
            this.current = this.task
            this.idSubTask = undefined
            for (const user of this.users) {
                delete user.finished
            }
            
        },
        newSubTask(){
            this.current = {
                id: null,
                name: "",
                description: "",
                created: new Date().toISOString().slice(0, 10),
                finished: new Date().toISOString().slice(0, 10),
                progress: "",
                users: []
            }
            this.idSubTask = null
        },
        selectUser(index){
            console.log(this.users[index])
            if (this.idSubTask !== undefined){
                if (this.users[index]){
                    console.log(this.users[index].finished)
                    if (this.users[index].finished !== undefined){
                        delete this.users[index].finished
                    }else{
                        this.users[index].finished = 0
                        this.users[index].new = true
                    }

                }
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("alert", "Seleção de usuarios restrita para sub tarefas")
            }
        },
        async update(){
            let result = ''
            const id = this.$route.params.id
            if (this.idSubTask === undefined){
                result = await api.updateTask(this.current, id)
            }else{
                const users = []
                for (const user of this.users) {
                    if (user.finished !== undefined){
                        users.push({idUser: user.id, finish: user.finished, new: user.new})
                    }
                }
                result = await api.updateSubTask(this.current, id, this.task.id, users)

            }
            if (result.status){
                if (result.data.id){
                    if (this.idSubTask !== undefined){
                        console.log(this.idSubTask)
                        if (this.task.subtask){
                            this.task.subtasks.push(this.current)
                        }else{
                            this.task.subtasks = []
                            this.task.subtasks.push(this.current)
                        }
                        this.current.id = result.data.id
                    }else{
                        this.current.id = result.data.id
                    }
                    this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data.message)
                }else{
                    this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
                }
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        },
        async drop(){
            let result = ''
            if (this.idSubTask > 0){
                result = await api.deleteTask(this.current.id, this.$route.params.id, 2)
            }else{
                result = await api.deleteTask(this.current.id, this.$route.params.id, 1)
            }

            if (result.status){
                if (this.idSubTask > 0){
                    let index = 0
                    for (const subtask of this.task.subtasks) {
                        if (subtask.id == this.current.id){
                            this.task.subtasks.splice(index, 1)
                            break;
                        }
                        index++
                    }
                    this.idSubTask = undefined
                    this.current = this.task
                }else{
                    this.leave()
                }
                


                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
            }else{
                this.leave()
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }


        },
        leave(){
            this.$emit("leave")
        },
        async finishSubTask(idUser, idSubTask, index){
            const result = await api.finishForUser(idUser, idSubTask, this.$route.params.id);

            if (result.status){
                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
                this.users[index].finished = 1
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        }    
    }
}
</script>

<style scoped>
    .background-edit{
        display: grid;
        grid-template-columns: 5% 95%;
    }

    .leave{
        height: 100%;
        width: 100%;
        display: flex;

    }

    .leave svg{
        width: 50%;
        height: fit-content;
        background-color: var(--inputCurrent);
        fill: var(--color);
        border-radius: 50%;
        rotate: 90deg;
        margin: auto 0 auto auto;
        margin-right: -15px;
    }

    .leave svg:hover{
        cursor: pointer;
        animation: pulse 1s infinite;
    }

    .background-items{
        display: grid;
        width: 80vw;
        height: 80vh;
        min-height: 80vh;
        max-height: 80vh;
        margin: auto 0 auto 0;
        grid-template-columns: 25% 50% 25%;
        background-color: var(--backgroundItem2Current);
        border-radius: 15px;
    }

    button:focus, input:focus{
        outline: 0;
        border: 1px solid var(--color);
    }

    /* Configurações das tasks */
    .tasks{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 20% 50% 30%;
        color: var(--textColorCurrent);
    }

    .tasks h1{
        width: 100%;
        font-size: 25px;
        margin: auto;
        text-align: center;
    }

    .tasks .buttons{
        display: grid;
        grid-template-columns: 100%;
    }    

    .tasks-itens{
        height: 100%;
        max-height: calc(80vh * 0.5);
        overflow-y: auto;
        display: grid;
    }

    .tasks-itens::-webkit-scrollbar{
        width: 5px; 
    }

    .tasks-itens::-webkit-scrollbar-thumb{
        background-color: var(--inputCurrent);
        border-radius: 5px;
    }

    .task{
        width: 90%;
        height: 5vh;
        min-height: 10vh;
        margin: 2% auto 2% auto;
        background-color: var(--inputCurrent);
        height: fit-content;
        padding: 2%;
        border-radius: 15px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .task:hover{
        cursor: pointer;
    }

    .task h1{
        width: 90%;
        height: fit-content;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }





    /* Configurações de configurações */
    .config{
        width: 100%;
        display: grid;
        grid-template-rows: 20% 60% 20%;
        grid-template-columns: 100%;
        color: var(--textColorCurrent);
        border-left: 1px solid var(--color);
        border-right: 1px solid var(--color);

    }

    .config #title{
        font-size: 30px;
        text-align: center;
        margin: auto;
    }
    .inputs-background{
        display: grid;
        grid-template-columns: 50% 50%; 
        width: 100%;  
    }

    .task-input{
        margin: auto;
        border: 0;
        border-radius: 20px;
        background-color: var(--inputCurrent);
        color: var(--textColorCurrent);
        padding: 2%;
        font-size: 20px;
        border: 1px solid transparent;
    }

    .input-1{
        grid-column-start: 1;
        grid-column-end: 3;
        width: 90%;
        height: 70%;
    }
    .input-2{
        width: 80%;
        height: 70%;
        text-align: center;
    }

    .task-progress, .task-color{
        display: grid;
        grid-template-columns: 100%;
        grid-auto-rows: 100%;
        width: 95%;
        height: 80%;
        margin: auto;
        overflow-y: auto;
        border-radius: 15px;
    }
    
    .task-color{
        width: 85%;
        margin-right: 5%;
        cursor: crosshair;
    }

    .task-color input{
        cursor: crosshair;
    }
    
    .task-progress{
        width: 85%;
        margin-left: 5%;   
    }

    .task-color::-webkit-scrollbar, .task-progress::-webkit-scrollbar{
        visibility: hidden;
        width: 0;
    }


    .task-color input{
        width: 100%;
        height: 100%;
        border: 0;
    }

    .task-progress div{
        height: 100%;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
    }

    .task-progress span, .task-color span{
        height: 50%;
        margin: auto;
        margin-top: -20%;
        color: var(--textColorCurrent);
        text-shadow: 1px 1px 0px rgba(0,0,0,0.6);
        font-size: 25px;
    }

    .buttons{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 80% 20%;
    }
    .buttons > *:hover{
        cursor: pointer;
    }
    .buttons button{
        transition: .25s;
        width: 70%;
        height: 60%;
        margin: auto;
        border-radius: 25px;
        color: var(--textColorCurrent);
        font-size: 20px;
        background-color: var(--color);
        border: 3px solid var(--color);
    }
    .buttons button:hover{
        width: 80%;
    }
    .buttons svg{
        background: red;
        width: 50%;
        height: 50%;
        padding: 5%;
        border-radius: 15px;
    }
    .buttons svg:hover{
        animation: swing 1s infinite;
    }

    .alertTasks{
        display: grid;
        grid-template-columns: 20% 80%;
        background: rgb(0, 128, 90);
        border-radius: 15px;
        padding: 2%;
        width: 90%;
        margin: auto;
    }

    .alertTasks a{
        color: var(--textColorCurrent);
        text-decoration: underline;
        font-weight: bolder;
        cursor: help;
    }

    .alertTasks svg{
        background: none;
        width: 100%;
        margin: auto;
    }

    /* Usuarios Config */
    .users{
        width: 100%;
        display: grid;
        grid-template-rows: 20% 80%;
        color: var(--textColorCurrent);
        height: 100%;
    }

    .users h1{
        width: 100%;
        text-align: center;
        font-size: 25px;
        margin: auto;
    }

    .background-users{
        height: 100%;
        max-height: calc(80vh * 0.75);
        overflow-y: auto;
    }

    .background-users::-webkit-scrollbar{
        width: 5px; 
    }

    .background-users::-webkit-scrollbar-thumb{
        background-color: var(--inputCurrent);
        border-radius: 5px;
    }

    .user{
        width: 90%;
        background-color: var(--inputCurrent);
        margin: 2% auto 2% auto;
        display: grid;
        grid-template-columns: 5vw max-content;
        padding: 2%;
        border-radius: 20px;
        border: 1px solid transparent;
    }

    .selected{
        border: 1px solid var(--color);
    }

    .user p{
        margin: auto;
        font-size: 20px;
        margin-left: 5px;
    }

    .user img{
        width: 5vw;
        height: 5vw;
        border-radius: 50%;
    }

</style>
