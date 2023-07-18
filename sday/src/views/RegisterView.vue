<template>
    <div class="register-frame">
    <div class="register-background-picture" >
        <img src="../assets/undraw_projections_svg_login.svg" alt="">
    </div>
    <div class="register-inputs">
        <span class="inputs-title"> 
            <h1>Registrar</h1>
            <p>Ja tem conta? <router-link to="/login"><a> clique aqui!</a></router-link> </p>
        </span>
        <input id="name" name="name" type="text" placeholder="Diga seu nome" class="inputs-half" v-model="this.name">
        <input id="surname" name="surname" type="text" placeholder="Diga seu sobrenome" class="inputs-half" v-model="this.surname">
        <input id="email" name="email" type="text" placeholder="Digite Seu email" class="inputs" v-model="this.email">
        <input id="birth" name="birth" type="date" placeholder="Data de nascimento" class="inputs" v-model="this.birth">
        <input id="password" name="password" type="text" placeholder="Digite sua senha " class="inputs-half" v-model="this.password">
        <input id="passwordConfirm" name="passwordConfirm" type="text" placeholder="Confirme a senha " class="inputs-half" v-model="this.passwordConfirm">
        <button id="login" @click="register">Registrar</button>
    </div>
</div>
</template>

<script>
import api from '@/classes/api';
import router from "../router"
import validator from "validator"

export default{
    data(){
        return{
            name: '',
            surname: '',
            email: '',
            birth: '',
            password: '',
            passwordConfirm: '',
        }
    },
    methods:{
        async register(){
            // Validação do campo 'email'
            if (!validator.isEmail(this.email)) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'Email inválido');
                return;
            }

            // Validação do campo 'password'
            if (!validator.isLength(this.password, { min: 6 })) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'A senha deve ter no mínimo 6 caracteres');
                return;
            }

            // Validação do campo 'confirmPassword'
            if (this.password !== this.passwordConfirm) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'As senhas não coincidem');
                return;
            }

            // Validação do campo 'birth'
            if (!validator.isDate(this.birth, { format: 'YYYY-MM-DD' })) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'Data de nascimento inválida');
                return;
            }

            // Validação do campo 'name'
            if (validator.isEmpty(this.name)) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'Nome é obrigatório');
                return;
            }

            // Validação do campo 'surname'
            if (validator.isEmpty(this.surname)) {
                this.$parent.$parent.$refs.alert.createAlert('alert', 'Sobrenome é obrigatório');
                return;
            }

            const result = await api.register(this.name, this.surname, this.email, this.birth, this.password, this.passwordConfirm)

            if (result.status){
                this.$parent.$parent.$refs.alert.createAlert("check", result.data)
                router.push({name: "login", path: "/login"})
            }else{
                this.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
            }
    }
}

</script>

<style scoped>
.register-frame{
    width: 80vw;
    height: 80vh;
    max-height: 80vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    animation: .5s ease-in-out forwards; 
    margin: 2.5% auto 2.5% auto;
}

@keyframes ease-in-out {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

.register-background-picture{
    background: var(--backgroundItemCurrent);
    height: 95%;
    width: 95%;
    margin: auto;
    border-radius: 20px;
}


.register-background-picture > *{
    height: 100%;
    width: 100%;
}

.register-inputs{
    width: 95%;
    height: fit-content;
    margin: auto;
    display: grid;
    grid-template-columns: 50% 50%;
}

.inputs-title{
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: 0;
    margin-bottom: 2%;
}
.inputs-title h1{
    font-size: 45px;
    color: var(--textColorCurrent);;
    width: 70%;
    margin: auto;
    margin-left: 0;
    margin-left: calc(100% /2 *0.05);
}

.inputs-title p{
    font-size: 25px;
    color: var(--textColorCurrent);;
    width: 70%;
    margin: auto;
    margin-left: 0;
    margin-left: calc(100% /2 *0.05);
}

.inputs-title a{
    color: var(--color);
}

.inputs{
    height: 9vh;
    margin: auto;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: calc(100% /2 *0.05);
    width: 93%;
}

.inputs-half{
    height: 9vh;
    width: 90%;
    padding-right: 2%;
    padding-left: 2%;
    margin-left: 0;
    margin-top: 2%;
    margin-bottom: 2%;

}

#name, #password{
    margin-left: 5%;
}

#surname, #passwordConfirm{
    margin-right: 5%;
}

#login{
    width: 60%;
    margin: auto;
    margin-top: 6%;
    height: 9%;
    background: var(--color);
    border-radius: 10px;
    color: var(--textColorCurrent);
    font-size: 35px;
    border: 0;
    cursor: pointer;
    transition: .3s;
    grid-column-start: 1;
    grid-column-end: 3;
    height: fit-content;
}

#login:hover{
    width: 93%;
}
</style>