<template>
    <div class="background">
        <div class="newProject" @click="newProject">
            <img src="../assets/plus.svg" alt="">
        </div>
            <div v-if="loading" class="load">
                <div class="component"></div>
                <p>Lendo Seus projetos</p>
            </div>
            
            <div @click="this.$router.push({name: 'calendar', params:{id: project.id}})" class="project"  v-for="project in projects" :key="project.id">
                <img :src='project.picture' alt="">
                <hr>    
                <h1>{{ project.name }}</h1>
                <button>Abrir</button>
            </div>
    </div>

</template>

<script>
import api from "../classes/api"

export default {
    data(){
        return{
            projects: [],
            loading: true
        }
    },
    created() {
        this.init();
    },
    
    methods:{
        newProject(){
            this.$router.push({name: "new", path: "/new"})
        },
        async init(){
            this.$parent.$parent.$refs.login.getLogin();
            const response = await api.myProjects();

            if (response.status){
                this.projects = response.data
                this.loading = false
            }else{
                console.log(response.data)
                this.$parent.$parent.$refs.alert.createAlert("error", response.data.data)
            }

        }
    }
}
</script>

<style scoped>
    .background{
        width: 90vw;
        height: 62vh;
        background-color: var(--backgroundItemCurrent);
        overflow-x: auto;
        overflow-y: hidden;
        border-radius: 15px;
        display: flex;
        flex-wrap: nowrap;
        margin: auto;
        margin-top: 15vh;
    }

    .background::-webkit-scrollbar{
        width: fit-content;
    }

    .background::-webkit-scrollbar-thumb{
        background-color: var(--backgroundItem2Current);
        border-radius: 20px;
    }

    .newProject, .project{
        width: calc(90vw * 0.225);
        max-width: calc(90vw * 0.225);
        min-width: calc(90vw * 0.225);;
        margin: auto 2.5vw auto 2.5vw;
        min-height: calc(60vh *0.9);
        max-height: calc(60vh *0.9);
        background-color: var(--backgroundItem2Current);
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
    }

    .project{
        display: grid;
        grid-auto-rows: 50% 10% 20% 20%;
        padding: 1%;
    }

    .project hr{
        background-color: var(--textColorCurrent);
        margin-bottom: 0;
        width: 100%;
        height: 1px;
    }

    .project button{
        width: 80%;
        margin: 0 auto 0 auto;
        height: 60%;
        border: 0;
        border-radius: 15px;
        background: var(--color);
        color: var(--textColorCurrent);
        transition: .3s;
        cursor: pointer;
        font-size: 15pt;
    }
    .project button:hover{
        width: 90%;
    }
    
    .project h1{
        color: var(--textColorCurrent);
        width: 100%;
        font-size: 15pt;
        text-align: center;
        margin-top: 0;
    }


    .project img{
        height: 100%;
        width: fit-content;
        max-width: 100%;
        margin-bottom: 0;
        margin: auto auto 0 auto;

    }

    .newProject img{
        width: 100%;
        margin: auto;
        transition: .25s;
    }

    .newProject:hover img{
        transform: rotate(90deg);
    }
</style>
