<template>
    <div class="background">
        <router-link :to="`/projects/${this.$route.params.id}/calendar`" class="background-svg">
                <svg id="calendar" class="svg calendar" :class="{'select': this.$route.name == 'calendar'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
        </router-link>
        <router-link :to="`/projects/${this.$route.params.id}/users`" class="background-svg">
                <svg id="users" :class="{'select': this.$route.name == 'users'}" class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
        
        </router-link>
        <router-link :to="`/projects/${this.$route.params.id}/chat`" class="background-svg">
            <div class="chat" v-if="messages > 0">
                <svg class="svg" :class="{'select': this.$route.name == 'chat'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                </svg>
                <span>{{ messages }}</span>
            </div>
            <svg  v-else-if="messages <= 0" class="svg" :class="{'select': this.$route.name == 'chat'}" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
            </svg>

    
        </router-link>
        <router-link :to="`/projects/${this.$route.params.id}/tasks`" class="background-svg">
            <svg id="tasks" :class="{'select': this.$route.name == 'tasks'}" class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
        </svg>
    
        </router-link>
        <router-link :to="`/projects/${this.$route.params.id}/settings`" class="background-svg" v-if="this.permission < 2">
            <svg id="settings" :class="{'select': this.$route.name == 'settingsProject'}" class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
        </router-link>

        <div class="background-svg" v-else @click="leave"> 
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00BFA6" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
        </div>
    </div>


</template>

<script>
import api from "../classes/api"
import router from "../router"
import io from "socket.io-client"
export default {
    async created(){
        const result = await api.userInProject(this.$route.params.id);
        console.log(result)
        if (result.status){
            this.permission = result.data.permission
            this.$emit("permission", this.permission)
        }else{
            router.push({name: "home", path: "/"})
            this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
        }

        const users = await api.contacts( this.$route.params.id)
        if (users.status == true){
            for (const user of users.data) {
            this.messages += user.numberMessages
            }
        }

        const token = await api.getHeader();
        this.socket = io('http://localhost:8080', {query:{token: token.Authorization, project:this.$route.params.id }});
        this.socket.on("connected", (result) =>{
            if (result != false){
                this.socket.on(result, () =>{
                    this.messages+= 1
                })
                }
            })
    },
    data(){
        return{
            permission: 0,
            messages: 0
        }
    },
    methods:{
        async leave(){
            const result = await api.leave(this.$route.params.id);
            if (result.status){
                router.push({name: "home", path: "/"})
                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
        }
        }
    }
}
</script>

<style scoped>
    .background{
        height: 40vh;
        width: 4vw;
        background-color: var(--backgroundItem2Current);
        border-radius: 20px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: repeat(5, 1fr);
        margin: auto;
    }

    .background-svg{
        width: 100%;
        height: 100%;
        display: flex;
        border-bottom: 1px solid var(--backgroundCurrent);
    }


    .chat{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 80% 20%;
    }

    .chat span{
        background: var(--color);
        height: fit-content;
        width: fit-content;
        padding: 1% 20% 1% 20%;
        border-radius: 50%;
        margin-top: auto;
        margin-bottom: 20%;

    }

    .svg{
        width: 100%;
        height: 60%;
        margin: auto;
        transition: .3s;
        stroke: var(--backgroundItemCurrent);
        fill: transparent;
        cursor: pointer;
    }

    .select{
        fill: var(--color);
        stroke: transparent;
        width: 100%;
        height: 60%;
    }

    .svg:hover{
        fill: var(--textColorCurrent);
        stroke: transparent;
    }

    .select:hover{
        fill: var(--color);
        stroke: transparent;
    }

</style>