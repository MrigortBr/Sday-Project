<template>
    <header>
        <h1 @click="home" class="title"><s>S</s>day</h1>
            <div class="functions">
            <img v-if="profile" @click="leave" id="leave" src="../assets/box-arrow-left.svg" alt="">
            <img v-if="profile" @click="config" id="settings" src="../assets/gear.svg" alt="">
            <ThemeSwitcher class="switcher"/>
            <img v-if="profile" id="profile" :src="image" alt="">
        </div>
    </header>
</template>

<script>
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
import router from "../router";
import api from "../classes/api"

export default({
    components: {
        ThemeSwitcher
    },
    methods: {
        leave(){
            localStorage.removeItem("jwt");
            router.push({name: "login", path: "/login"});
            this.profile = ""
        },
        config(){
            router.push({name: "settings", path: "/settings"})
        },
        home(){
            router.push({name: "home", path: "/home"})
        },
        async getLogin(){
            const user = await api.getLogin()
            if (user.picture !== undefined && user.picture !== null){
                this.image = user.picture
                this.profile = user
            }else{
                this.leave()
            }
        }
    },
    data(){
        return{
            image: require("../assets/undraw_pic_profile_re_7g2h.svg"),
            profile: true
        }
    },
    async mounted(){
        this.getLogin();
    }
})
</script>

<style scoped>
    .title{ 
        font-size: 50px;
        color: #A3B7B4;
        margin: auto;
        width: 98%;
        text-align: start;
    }

    .title:hover{
        cursor: pointer;
    }

    .title s{
        text-shadow: 3px 3px 0px rgba(255,255,255,0.6);
        color: var(--color);
        text-decoration: none;
    }

    header{
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 10vh;
        top: 2vh;
        width: 95vw;
        height: 10vh;
        min-height: 10vh;
        max-height: 10vh;
        margin: auto;
        position: relative;
    }

    .functions{
        display: flex;
        align-items: center;
        justify-content: end;
    }

    #profile{
        height: 10vh;
        width: 10vh;
        max-height: 10vh;
        min-height: 10vh;
        max-width: 10vh;
        min-width: 10vh;
        cursor: pointer;
        transition: .1s;
        margin-right: 2%;
        border-radius: 50%;
        border: 1px solid var(--color);
    }

    #leave, #settings, .switcher{
        height: 5vh;
        min-height: 5vh;
        max-height: 5vh;
        cursor: pointer;
        transition: .1s;
        margin: auto 2% auto 0;
    }

    header img:hover{
        transform: scale(1.1)
    }
</style>


