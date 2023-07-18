<template>
    <input type="file" name="" id="" style="visibility: hidden; position: absolute;" ref="file" @change="selectFile" accept=".png, .jpeg, .jpg">

    <div class="background-config">
        <div class="gallery">
            <svg @click="previus" xmlns="http://www.w3.org/2000/svg" class="chevron" id="right" fill="red" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
            </svg>
            <div class="gallery-image">
                <img :src="pictures[index]" alt="" ref="picture">
            </div>
            <svg  @click="next" xmlns="http://www.w3.org/2000/svg" class="chevron" id="left" fill="red" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
            </svg>
            <div class="alert-background" @click="openFile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                <p>Enviar imagem</p>    
            </div>
        </div>
        <div class="inputs">
            <h1>Edição Do usuario</h1>
            <div class="name">
                <label for="">Olá </label>
                <input type="text" id="name" @keyup="ajustSize" placeholder="Primeiro Nome" v-model="name" ref="name" >
                &nbsp;
                <input type="text" @keyup="ajustSize" placeholder="Segundo Nome" v-model="surname" @load="ajustSizeInicial" ref="surname">   
            </div>
            <input type="text" class="input-component" placeholder="Email *" v-model="email">
            <input type="date" class="input-component" placeholder="Data Nascimento*" v-model="birth">
            
            <input type="text" class="input-component" placeholder="Senha atual*" v-model="oldPassword">
            <input type="text" class="input-component" placeholder="Nova senha" v-model="newPassword">
            
            <div class="buttons">
                <button class="confirm" @click="update">Atualizar</button>
                <button class="danger" @click="destroy">Deletar Conta</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/classes/api';
import router from "../router"

export default {
    data(){
        return{
            index: 0,
            pictures: [
            require("../assets/undraw_pic_profile_re_7g2h.svg"),
            require("../assets/undraw_profile_pic_re_iwgo.svg"),
            require("../assets/undraw_male_avatar_g98d.svg"),
            require("../assets/undraw_female_avatar_efig.svg")
            ],
            name: "",
            surname: "",
            birth: "",
            email: "",
            newPassword: "",
            oldPassword: ""
        }
    },
    async created(){
        const r = await api.settings()
        if (r.status){
            this.name = r.data.name
            this.surname = r.data.surname
            this.email = r.data.email
            this.birth = new Date(r.data.birth).toISOString().split('T')[0];
            if (this.pictures.indexOf(r.data.picture) == -1){
                this.pictures.push(r.data.picture)
                this.index = this.pictures.length   -1
            }else{
                console.log(this.pictures.indexOf(r.picture))
                this.index = this.pictures.indexOf(r.data.picture)
            }
        }else{
            router.push({name: "login", path: "/login"})
        }
    },
    methods:{
        next(){
            this.index++
            if(this.index > this.pictures.length-1){
                this.index = 0
            }            
        },
        previus() {
            this.index--
            if (this.index < 0){
                this.index = this.pictures.length-1
            }
        },
        openFile(){
            this.$refs.file.click()
        },
        selectFile(event){
            const file = event.target.files[0]

            const reader = new FileReader();

            reader.onload = () => {
                const resultBLOB = reader.result
                this.$refs.picture.src = resultBLOB;
                const indexFinded = this.pictures.indexOf(resultBLOB)
                if (indexFinded == -1){
                    this.index = this.pictures.length
                    this.pictures.push(this.$refs.picture.src)
                    this.$refs.file.value = ""
                }else{
                    this.index = indexFinded
                }
            }
            reader.readAsDataURL(file);

        },
        ajustSize(event){
            const input = event.target
            input.style.width = input.value.length*16+"px"
        },
        ajustSizeInicial(){
            this.$refs.name.style.width = this.name.length*20+"px"
            this.$refs.surname.style.width = this.surname.length*20+"px"
        },
        async update(){
            if (this.name === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Nome é obrigatório");
                return;
            }
            if (this.surname === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Sobrenome é obrigatório");
                return;
            }
            if (this.birth === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Data de Nascimento é obrigatório");
                return;
            }
            if (this.email === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Email é obrigatório");
                return;
            }
            if (this.oldPassword === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "Digite sua senha no campo Senha Atual");
                return;
            }

            let picture = this.pictures[this.index]

            if (picture.indexOf("/img") != -1){
                picture = picture.split(".")[0]
                picture = picture.replace("/img/", "")
            }

            const result = await api.update(this.name, this.surname, this.birth, this.email, this.newPassword, picture, this.oldPassword)

            if (result.status){
                this.$parent.$parent.$refs.alert.createAlert("check", result.message)
                this.oldPassword = ""
                this.newPassword = ""
                this.$parent.$parent.$refs.login.getLogin()
            }else{
                this.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }

        },
        async destroy(){
            const result = await api.delete();

            if (result.status){
                router.push({name: "login", path: "/login"})
            }else{
                this.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        }   
    },
    watch: {
        name: {
            deep: true,
            handler() {
                this.ajustSizeInicial()
            },
        },
        surname: {
            deep: true,
            handler() {
                this.ajustSizeInicial()
            },
        },
    }
}
</script>

<style scoped>
    .background-config{
        width: 90vw;
        height: 80vh;
        min-width: 90vw;
        margin: 5vh 5vw 5vh 5vw;
        display: grid;
        grid-template-columns: 30% 70%;
        -webkit-user-select: none; /* Para navegadores baseados em WebKit, como Chrome, Safari */
        -moz-user-select: none; /* Para navegadores baseados em Gecko, como Firefox */
        -ms-user-select: none; /* Para o Internet Explorer */
        user-select: none; /* Padrão, incluindo navegadores modernos */
    }
    .gallery{
        width: 100%;
        height: 100%;
        margin: auto;
        display: grid;
        grid-template-columns: 10% 80% 10%;
        grid-template-rows: 85% 15%;
        background: var(--backgroundItemCurrent);
        border-radius: 20px 0px 0px 20px;

    }
    
    .gallery-image{
        padding: 1%;
        border-radius: 20px;
        height: 80%;
        margin: auto;
        width: 100%;
        height: 100%;
        min-width: 100%;
        max-width: 100%;
        display: flex;
        min-height: calc(80vh * 0.68);
        max-height: calc(80vh * 0.68);
    }

    .gallery-image img{
        width: 100%;
        height: 80%;
        max-height: 100%;
        max-width: 100%;
        margin: auto;
        border-radius: 20px;
        padding: 2%;
        border-radius: 50%;
    }

    .chevron{
        width: 5vh;
        max-width: 50px;
        max-height: 50px;
        margin: auto;
        background: var(--backgroundItem2Current);
        fill: var(--color);
        border-radius: 50px;
        cursor: pointer;

    }

    #right{
        margin-right: -50%;
        transform: rotate(90deg);
        padding: .5%;
    }

    #left{
        margin-left: -50%;
        transform: rotate(270deg);
        padding: .5%;
    }

    .alert-background{
        grid-column-start: 1;
        grid-column-end: 4;
        background-color: var(--color);
        display: flex;
        width: fit-content;
        padding: 0 2% 0 2%;
        border-radius: 20px;
        height: 80%;
        margin: auto auto 10% auto;
    }
    .alert-background:hover{
        cursor: pointer;
        animation: bounce 1s;
    }

    .alert-background p{
        height: fit-content;
        width: 90%;
        margin: auto 0 auto 2%;
        white-space: nowrap;
        font-size: 20px;
    }

    .alert-background svg{
        height: 40%;
        margin: auto 0 auto 0;
        width: fit-content;
    }

    .inputs{
        background: var(--backgroundItemCurrent);
        border-radius: 0px 20px 20px 0px;
        color: var(--textColorCurrent);
        font-size: 30px;
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 50% 50%;
        grid-template-rows: 10% 20% 20% 20% 30%;
    }

    .inputs h1{
        font-size: 40px;
        border-bottom: 1px solid var(--backgroundItem2Current);
        width: fit-content;
        height: fit-content;
        margin: auto;
        grid-column-start: 1;
        grid-column-end: 3;

    }

    .name{
        grid-column-start: 1;
        grid-column-end: 3;
        margin: auto auto auto auto;
        padding: 1%;
    }

    .name input{
        border: 0;
        background: transparent;
        border-bottom: 1px solid var(--backgroundItem2Current);
        width: fit-content;
        color: var(--textColorCurrent);
        font-size: 30px;
        min-width: 60px;
        transition: .25s
    }

    .name input:hover, .name input:focus{
        outline: 0;
        border-bottom: 3px solid var(--backgroundItem2Current);
    }
    
    .input-component{
        width: 80%;
        height: 50%;
        margin: auto 10% auto 10%;
        border-radius: 20px;
        background-color: var(--backgroundItem2Current);
        border: 0;
        font-size: 20px;
        color: var(--textColorCurrent);
        padding: 2%;
    }
    .input-component:focus{
        outline: 0;
    }

    .buttons{
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .buttons button{
        border: 0;
        border-radius: 15px;
        margin: auto;
        height: 30%;
        cursor: pointer;
        transition: .5s;
        font-size: 15px;
    }

    .confirm{
        background: var(--color);
        width: 60%;
    }

    .confirm:hover{
        width: 65%;
    }

    .danger{
        width: 20%;
        background: red;
        color: white;
    }

    .danger:hover{
        width: 25%;
    }
</style>