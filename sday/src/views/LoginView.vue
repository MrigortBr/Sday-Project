<template>
    <div class="login-frame">
        <div class="login-background-picture">
            <img src="../assets/undraw_projections_svg_login.svg" alt="">
        </div>
        <div class="login-inputs">
            <span class="inputs-title"> 
                <h1>Login</h1>          
                <p>Não tem conta? <router-link to="/register"><a> clique aqui!</a></router-link> </p>
            </span>
            <input id="email" name="email" type="text"  placeholder="Digite Seu email" class="inputs" v-model="email">
            <input id="password" name="password" type="text" placeholder="Digite sua senha " class="inputs" v-model="password">
            <button id="login" @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import api from '@/classes/api';
import router from "../router"

export default ({
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        async login(){
            const email = this.email
            const password = this.password
            if (!email.trim('') == '' || !password.trim('') == ''){
                if (!email.trim('') == ''){
                    if(!password.trim('') == ''){
                        const result = await api.login(email, password)
                        if(result.status){
                            router.push({path: "/", name: "home"})
                        }else{
                            this.$parent.$parent.$refs.alert.createAlert("error", result.data)
                        }
                    }else{
                        this.$parent.$parent.$refs.alert.createAlert('alert', "Preencha o campo de senha para fazer login")  
                    }
                }else{
                    this.$parent.$parent.$refs.alert.createAlert('alert', "Preencha o campo de email para fazer login")  
                }     
            }else{
                this.$parent.$parent.$refs.alert.createAlert('alert', "Preencha o campo de email e senha para fazer login")  
            }
        }
    },
    mounted(){
        this.$parent.$parent.$refs.login.getLogin();
    }
})
</script>


<style scoped>
    .login-frame{
        width: 80vw;
        height: 80vh;
        margin: auto;
        display: grid;
        grid-template-columns: 50% 50%;
        animation: 0.5s ease-in-out forwards;
        margin-bottom: 2.5%;
        margin-top: 2.5%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    @keyframes ease-in-out {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

    .login-background-picture{
        background: var(--backgroundItemCurrent);
        height: 95%;
        width: 95%;
        margin: auto;
        border-radius: 20px;
    }

    .login-background-picture > *{
        height: 100%;
        width: 100%;
    }

    .login-inputs{
        width: 90%;
        height: fit-content;
        margin: auto;
        overflow-y: hidden;
    }


    .inputs-title h1{
        font-size: 45px;
        color: var(--textColorCurrent);
        width: 70%;
        margin: auto;
    }

    .inputs-title p{
        font-size: 25px;
        color: var(--textColorCurrent);;
        width: 70%;
        margin: auto;
    }

    .inputs-title a{
        color: var(--color);
    }

    .titleWhite h1{
        color: var(--textColorCurrent);
    }

    .inputs{
        width: 70%;
        margin-left: 15%;
        height: 9vh;
        margin-top: 6%;
    }

    input:focus{
        outline: 0;
    }


    #login{
        width: 60%;
        margin-left: 20%;
        margin-top: 6%;
        height: 9vh;
        background: var(--color);
        border-radius: 10px;
        color: var(--textColorCurrent);
        font-size: 35px;
        border: 0;
        cursor: pointer;
        transition: .3s;
    }

    #login:hover{
        width: 65%;
        margin-left: 17.5%;
    }



    .method-label{
        display: flex;
        font-size: 35px;
        color: var(--textColorCurrent);
        margin-left: 10%;
        margin-top: 5%;
    }

    .method-label hr{
        background-color: var(--textColorCurrent);
        width: 40%;
    }

    #methods{
        width: 80%;
        margin-left: 10%;
        display: flex;
        justify-content: center;
    }

    #methods > *{
        width: 12%;
        margin: 5%;
        cursor: pointer;
        transition: .5s;
    }
    
    #methods img:hover{
        transform: scale(1.2);
    }
</style>