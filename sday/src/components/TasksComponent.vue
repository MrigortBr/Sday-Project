<template>
    <div class="background-tasks">
        <div class="header">
            <span v-if="!this.my">
                Gerenciamento de Tarefas
                <svg @click="showYourTasks()" v-if="this.permission < 2" id="more" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                </svg>
            </span>
            <span v-if="this.my">
                Suas Tarefas
                <svg v-if="this.permission < 2" @click="showYourTasks()" id="more" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                </svg>
            </span>
            <div class="more" @click="createTask" v-if="permission < 2 && !my">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </div>
        </div>

        <div class="tasks">
            <div class="task" v-for="(task, index) of tasks" :key="task.id">
                <div class="progressBar" :style="{backgroundColor: hexToRGBA(task.color)}">
                    <div :style="{backgroundColor: task.color, width: task.progress}" style="height: 100%; border-top-right-radius: 20px;"></div>
                </div>
                <div class="task-item" :class="{'hidden': !task.open, 'visible': task.open}">
                    <h1 @click="openTask(index)" >{{ task.name }}</h1>
                    <svg @click="openTask(index)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
                    </svg>
                    <div class="subtasks" v-show="task.open">
                        <div class="subtask" v-for="(subtask, indexSub) of task.subtasks" :key="subtask.id">
                            <h1>{{subtask.name}}</h1>
                            <div class="marker"></div>
                            <svg v-if="Number(subtask.finished) == 0 || subtask.progress!= '100%' && subtask.progress != undefined" @click="finishSubTask(subtask.id, index, indexSub)" id="marker" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                            <svg v-else-if="Number(subtask.finished) == 1 || subtask.progress == '100%' && subtask.progress != undefined" id="marker"  style="fill: green;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        </div>
                        <div class="subtask config" v-if="permission < 2 && !my">
                            <h1>Configurar</h1>
                            <svg @click="openConfigTask(task.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/classes/api';
export default {
    data(){
        return{
            tasks: [],
            config: "",
            my: true
        }
    },
    props:{
        permission: Number
    },
    created(){
        this.showTasks()
    },
    methods:{
            async showTasks(){
                let result
                if (this.my == true){
                    result = await api.getMyTasks(this.$route.params.id);
                }else{
                    result = await api.getTasks(this.$route.params.id);
                }


                if (result.status){
                    this.tasks = result.data
                }else{
                    this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
                }

            },
            openTask(index){
                const task = this.tasks[index]

                if (task.open){
                    task.open = false
                }else{
                    task.open = true
                }
            },
            createTask(){
                const element = {
                    color: "#00BFA6",
                    description: "",
                    id: null,
                    name: "",
                    open: false,
                    progress: "1%"
                }
                this.$emit("config", {datas: element, current:{type: "task", element: element}})
            },
            showYourTasks(){
                if (this.my ){
                    this.my = false
                }else{
                    this.my = true
                }
                this.showTasks()
            },
            openConfigTask(id){
                this.$emit("config", {id: id})
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
            async finishSubTask(id, index, indexSub){
                this.tasks[index].subtasks[indexSub].finished = 1
                const result = await api.finishSubTask(this.$route.params.id,id, this.my)

                if (result.status){
                   this.$parent.$parent.$parent.$refs.alert.createAlert("check" ,result.data)
                   this.showTasks()
                }else{
                   this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
                }
            }
        }
}
</script>

<style scoped>
    .background-tasks{
        width: 80vw;
        height: 80vh;
        min-height: 80vh;
        background-color: var(--backgroundItemCurrent);
        margin: auto auto auto auto;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 15% 85%;
        grid-row-gap: 5%;
        color: var(--textColorCurrent);
        background-image: url('../assets/taskBackground.svg');
        background-size: contain;
        transition: 1s;
        overflow-y: hidden;
    }

    .header{
        display: grid;
        grid-template-columns: 90% 10%;
    }

    .header .more{
        margin: auto;
    }

    .background-tasks h1, .background-tasks span{
        font-size: 50px;
        margin: auto;
    }

    .tasks{
        width: 100%;
        height: 90%;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .task{
        width: 33%;
        display: grid;
        height: fit-content;
        margin-bottom: 2vh;
        overflow: hidden;
    }

    .progressBar{
        width: 33%;
        height: 3vh;
        background: var(--backgroundItem2Current);
        margin-left: 10%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        overflow-y: auto;
        border: 1px solid black;
        border-bottom: transparent;
    }

    .task-item{
        width: 97.5%;
        margin: auto;
        background: var(--backgroundItem2Current);
        color: var(--textColorCurrent);
        border-radius: 20px;
        padding: 2%;
        display: grid;
        grid-template-columns: 75% 25%;
        grid-row-gap: 2vh;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    svg{
        height: 100%;
        fill: var(--textColorCurrent);
    }

    .task-item h1{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }



    .task-item svg{
        width: fit-content;
        margin: auto;
        transition: .25s;
    }
    

    .hidden{
        cursor: pointer;
    }

    .visible svg{
        transform: rotate(180deg);
    }

    .hidden:hover svg{
        transform: rotate(180deg);
    }


    .subtasks{
        grid-column-end: 3;
        grid-column-start: 1;
        display: grid;
        grid-row-gap: 2vh;
        overflow-y: auto;
    }

    .subtask{
        background-color: var(--inputCurrent);
        height: 100%;
        display: grid;
        grid-template-columns: 70% 15% 15%;
        padding: 1%;
        border-radius: 15px;
        overflow: hidden;
        border: 1px solid transparent;
        transition: .25s;
    }

    .subtask:hover{
        cursor: pointer;
        border: 1px solid var(--color);
    }

    #more{
        height: 5vh;
        width: fit-content;
        rotate: 270deg;
        cursor: pointer;
    }

    #marker{
        transform: rotate(0deg);
        transition: 1s;
        fill: var(--textColorCurrent);

    }

    #marker:hover{
        fill: green;
    }

    .config{
        border: 1px solid var(--color);
        grid-template-columns: 85% 15%;
    }

    .subtask svg{
        width: 90%;
        margin: auto;
        transition: .25s;
        cursor: pointer;
    }

    .subtask svg:hover{
        transform: rotate(90deg);
    }
    

    
</style>