<template>
    <div class="background-chat">
        <div class="contact-list">
            <div class="list">
                <div class="user" v-for="(user, index) in users" :key="user" @click="openChat(index)">
                    <img :src="user.picture" alt="">
                    <p class="name" :class="{'noMessage': !user.lastMessage}">{{ user.name }} {{ user.surname }}</p>
                    <span class="last-message"><p> {{ user.lastMessage }}</p>  <p v-if="user.numberMessages > 0" class="new">{{ user.numberMessages }}</p></span>
                    <p class="time">{{ user.hourLastMessage }}</p>
                </div>
            </div>
        </div>
        <div class="chat" v-if="chat">
            <div class="header">
                <img :src="chat.picture" alt="">
                <p>{{ chat.name  +" "+ chat.surname }}</p>
            </div>
            <div class="chat-text" id="chat">
                <div :class="{'sent': message.type == 'sent', 'received': message.type== 'received'}" v-for="message of messages" :key="message">
                    <p class="message">{{ message.message }}</p>
                    <p class="time">{{ message.time }}</p>
                </div>
            </div>
            <div class="inputs">
                <input type="text" name="" id="" v-model="message" @keyup="enter">
                <svg @click="sendMessage" v-if="message.length > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../classes/api"
import io from "socket.io-client"

export default {
    data(){
        return{
            users: [],
            chat: '',
            messages: [],
            socket: '',
            currentRoom: '',
            message: ''
        }
    },
    async created(){
        const result = await api.contacts( this.$route.params.id)
        const token = await api.getHeader();
        this.socket = io('http://localhost:8080', {query:{token: token.Authorization, project:this.$route.params.id }});
        this.socket.on("connected", (result) =>{
            if (result == false){
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", "Erro ao conectar no chat atualize a pagina e se o erro continuar entre em contato com o suporte")
            }else{
                this.socket.on(result, (response) =>{
                    const {idUser, message} = response

                    for (const user of this.users) {
                        if (user.id == idUser){
                            user.lastMessage = message
                            if (this.chat.id != idUser){
                                user.numberMessages++
                            }else if(this.chat.id !== undefined){
                                api.readMessage( this.$route.params.id, this.chat.id)
                            }
                            break;
                        }
                    }
                })
            }
        })

        if (result.status){
            this.users = result.data
        }else{
            this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
        }
    },
    methods:{
        async openChat(index){
            this.messages = []
            this.socket.off(this.currentRoom)
            const chat = this.users[index]
            this.chat = {name: chat.name, surname: chat.surname, picture: chat.picture, id: chat.id}

            const jwt = await api.getHeader();
            this.socket.emit('enterRoom', {user: jwt.Authorization, to: chat.id, project:this.$route.params.id}, (async result =>{
                if (result != false){
                    this.currentRoom = result
                    const messages = await api.messages(this.$route.params.id, chat.id)
                    if  (result.status != false){
                        this.messages = messages.data
                        setTimeout(() => {
                            this.scrollBottom()
                        }, messages.data*10);

                    }
                    if (chat.numberMessages > 0){
                        const result = await api.readMessage(this.$route.params.id, chat.id)
                        if  (result.status == false){
                            this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
                        }else{
                            this.users[index].numberMessages = 0
                        }
                    }

                }else{
                    this.$parent.$parent.$parent.$refs.alert.createAlert("error", "erro ao entrar na chat reinicie a pagina")
                }


            }))
        },
        async sendMessage(){
            this.socket.emit('sendMessage', {chat:this.currentRoom, message: this.message})
            this.messages.push({message: this.message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}), type: "sent"})
            this.message = ""
            setTimeout(() => {
                 this.scrollBottom()
            }, 100);
        },
        async enter(element){
            if (element.key == "Enter"){
                await this.sendMessage()
            }
        },
        scrollBottom(){
            if (document.getElementById("chat")){
                document.getElementById("chat").scrollTo({
                top: document.getElementById("chat").scrollHeight,
                behavior: 'smooth'
                });
            }
            

        }
    },
    watch:{
        currentRoom(){
            this.socket.on(this.currentRoom, async r =>{
                this.messages.push(r)
                console.log(r)
                await api.readMessage(this.$route.params.id, this.chat.id)
                setTimeout(() => {
                    this.scrollBottom()
                }, 100);
            })
            
        }
    }
}
</script>

<style scoped>
    .background-chat{
        width: 80vw;
        height: 80vh;
        min-height: 80vh;
        background-color: var(--backgroundItemCurrent);
        margin: auto auto auto auto;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 25% 75%;
        color: var(--textColorCurrent);
        background-image: url("../assets/backgroundChat.svg");
    }

    .contact-list{
        display: grid;
        border-right: 2px solid black;
    }
    .you{
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        border-bottom: 2px solid black;
    }

    .you img{
        width: 10vh;
        height: 10vh;
        margin: auto 5% auto 5%;
        border-radius: 50%;
    }

    .you p{
        width: 100%;
        height: fit-content;
        font-size: 25px;
        margin: auto;
    }

    .list{
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: min-content;
        overflow-y: auto;
        width: calc(80vw * 0.25);
        height: 100%;
        max-height: calc(80vh * 0.85);
        max-width: calc(80vw * 0.25);
    }

    .list::-webkit-scrollbar{
        width: 5px;
    }

    .list::-webkit-scrollbar-thumb {
        background-color: var(--backgroundItem2Current);
        border-radius: 20px; 
    }

    .user{
        background: var(--backgroundItem2Current);
        display: grid;
        grid-template-columns: 35% 65%;
        height: fit-content;
        width: 100%;
        max-width: calc(80vw * .24);
        grid-template-rows: repeat(3, 1fr);
        border-radius: 20px;
        margin: 5% auto 5% auto;
        border: 1px solid transparent
    }

    .user:hover{
        border: 1px solid var(--color);
        cursor: pointer;
    }

    .user img{
        width: 10vh;
        height: 10vh;
        margin: 1vh;
        grid-row-start: 1;
        grid-row-end: 4;
        border-radius: 50%;
    }

    .user .name{
        grid-column-start: 2;
        grid-column-end: 3;
        height: fit-content;
        margin-top: auto;
        font-size: 20px;
    }

    .noMessage{
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .user .last-message{
        grid-column-start: 2;
        grid-column-end: 3;
        margin: auto 0 auto 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
    }

    .last-message p{
        text-overflow: ellipsis;   
        white-space: nowrap;
        overflow: hidden;
        width: 80%;
    }

    .last-message .new {
        background: var(--color);
        width: fit-content;
        height: fit-content;
        padding: 0.2vw 0.5vw 0.2vw 0.5vw;
        border-radius: 50%;
        text-align: center;
    }

    .user .time{
        grid-column-start: 2;
        grid-column-end: 3;
        margin-right: 0;
        width: fit-content;
        margin-left: auto;
        margin-right: 5%;
        height: fit-content;
    }

    /* Chat */

        /* header */
    
        .header{
            width: 100%;
            height: 15%;
            border-bottom: 2px solid black;
            display: flex;
            flex-wrap: nowrap;
        }

        .header img{
            width: 10vh;
            height: 10vh;
            margin: auto 2% auto 2%;
            border-radius: 50%;
        }

        .header p{
            font-size: 20px;
            margin: auto 0 auto 0;
            min-width: 80%;
        }

    /* Chat */

    .chat-text{
        height: 75%;
        max-height: calc(80vh * 0.75);
        margin-top: 0;
        display: grid;
        overflow-y: auto;
        grid-template-rows: min-content;
        color: white;
    }

    .chat-text::-webkit-scrollbar{
        width: 5px;
    }

    .chat-text::-webkit-scrollbar-thumb {
        background-color: var(--backgroundItem2Current);
        border-radius: 20px;
    }


    .sent{
        width: 25%;
        max-width: calc(80vh * 0.5625);
        min-width: calc(80vh * 0.5625);
        display: grid;
        background: #009884;
        margin: 5px 1% 5px auto;
        padding: 1% 2% 1% 2%;
        height: fit-content;
        border-radius: 15px;
    }

    .sent .message{
        background: 0;
        
    }

    .sent .time{
        margin-left: auto;
    }

    .received{
        width: 25%;
        max-width: calc(80vh * 0.5625);
        min-width: calc(80vh * 0.5625);
        display: grid;
        background: #052C4F;
        margin: 5px auto 5px 1%;
        padding: 1% 2% 1% 2%;
        height: fit-content;
        border-radius: 15px;
    }

    .received .message{
        background: 0;
        word-break: break-all;
        width: 100%;   
    }

    .received .time{
        margin-left: auto;
    }

    .date{
        width: 25%;
        margin: auto;
        background: var(--backgroundItem2Current);
        border-radius: 25px;
        text-align: center;
        font-size: 20px;
        margin: 2% auto 2% auto;
    }

    /* Inputs */
    .inputs{
        height: 7%;
        display: flex;
        width: 90%;
        background: var(--backgroundItem2Current);
        padding: 1% 1% 1% 1%;
        border-radius: 15px;
        margin: auto;

    }
    
    .inputs input{
        width: 95%;
        margin: auto;
        height: 100%;
        background: none;
        border: 0;
        font-size: 15px;
        color: var(--textColorCurrent);
    }

    .inputs input:focus{
        outline: 0;
    }

    .inputs svg{
        height: 100%;
        width: 5%;
        transition: 1s;
    }

    .inputs svg:hover{
        cursor: pointer;
        fill: var(--color);
        animation: pulse 1s infinite;
    }

</style>