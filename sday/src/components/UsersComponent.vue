<template>
    <div class="background-users">
        <header>
            <h1>Gerenciamento de Associados</h1>
            <div class="more" @click="invite">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </div>
        </header>
        <div class="background-scroll">
            <div class="users" v-if="users.length != 0">
                <div class="user" v-for="(user, index) in users" :key="user.id" :class="{'all-user': user.allUser}">
                    <img class="picture-user" :src="user.picture" alt="">
                    <h1>{{ user.name +" "+ user.surname }}</h1>
                    <div class="buttons" v-if="!user.allUser">       
                        <img v-if="user.permission == 0 && !user.all" src="../assets/star-fill.svg" alt=""   style="padding: 2%;" @mouseover="showPerms(user)">             
                        <img v-if="user.permission == 1" src="../assets/gear-fill.svg" alt="" @mouseover="showPerms(user)">
                        <img v-if="user.permission == 2" src="../assets/person-fill.svg" alt="" @mouseover="showPerms(user)">
                        <img v-if="this.permission == 0 && !user.allUser" src="../assets/x-lg.svg" alt="" @click="remove(user, index)">
                    </div>
                    <div class="buttons" v-else-if="user.allUser" @mouseleave="showPerms(user)">
                        <div v-if="user.all" class="all" :class="{'allShow': user.all}">
                            <div class="button-permission" @click="setPermission(user, 0)">
                                <img src="../assets/star-fill.svg" style="padding: 2%;">
                                <h1>Dono</h1>
                            </div>
                            <div class="button-permission" @click="setPermission(user, 1)">
                                <img src="../assets/gear-fill.svg" alt="" style="padding: 2%;">
                                <h1>Administrador</h1>
                            </div>

                            <div class="button-permission" @click="setPermission(user, 2)">
                                <img src="../assets/person-fill.svg" alt="" style="padding: 2%;">
                                <h1>Usuario</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="users" v-else-if="users.length == 0" style="width: 100%; height: 100%; display: flex;">
                <div class="load">
                    <div class="component"></div>
                    <p>Lendo Seus usuarios</p>
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
            users: []
        }
    },
    props:{permission: Number},
    created(){
        this.init()
    },
    methods: {
        async invite(){
            const result = await api.invite(this.$route.params.id)

            if (result.status){
                navigator.clipboard.writeText(result.data.link);
                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data.message)
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        },
        async init(){
            const result = await api.getUsers(this.$route.params.id);
            if (result.status){
                if (this.permission == 0){
                    for (const user of result.data) {
                        user.showDelete = true
                    }
                }
                this.users = result.data
                
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("error", result.data)
            }
        },
        async showPerms(user){
            if (this.permission == 0){
                if (user.all == true){
                setTimeout(() => {
                    user.showDelete = true
                    user.all = false
                    user.allUser = false
                }, 500);
            }else{
                setTimeout(() => {
                user.showDelete = false
                user.allUser = true
                user.all = true
                }, 10);
            }
            }
        },
        async setPermission(user, permission){
            if (user.permission == permission){
                this.$parent.$parent.$parent.$refs.alert.createAlert("alert", "Usario ja tem essa permissão!")
            }else{
               const result = await api.promote(this.$route.params.id, user.id, permission)
               
               if(result.status){
                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
                user.permission = permission
               }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("alert", result.data)
               }
            }
        },
        async remove(user, index){
            const result = await api.remove(this.$route.params.id, user.id)
               
            if(result.status){
                this.$parent.$parent.$parent.$refs.alert.createAlert("check", result.data)
                this.users.splice(index, 1)
            }else{
                this.$parent.$parent.$parent.$refs.alert.createAlert("alert", result.data)
            }
        }
    }
}
</script>

<style scoped>
    .background-users{
        width: 80vw;
        height: 80vh;
        min-height: 80vh;
        background-color: var(--backgroundItemCurrent);
        margin: auto auto auto auto;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 25% 75%;
        color: var(--textColorCurrent);
        background-image: var(--backgroundUsersProject);
        transition: 1s
    }

    header{
        display: grid;
    }

    .more{
        margin-top: -10vh;
    }

    header h1{
        margin: auto;
        white-space: nowrap;
        font-size: 30pt;
    }

    .users{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 10.185vh;
        grid-row-gap: 1vh;
        color: var(--textColorCurrent);
        transition: 1s;
    }

    .background-scroll{
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .user{
        width: 97.5%;
        height: 10.185vh;
        margin: auto;
        background-color: var(--backgroundItem2Current);
        border-radius: 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        transition: .5s;
    }


    .picture-user{
        height: 8.5vh;
        margin: auto;
        border-radius: 50px;

    }

    .user h1{
        margin: auto auto auto 0;
        font-size: 15pt;

    }



    .buttons img{
        height: 45%;
        margin: auto;
        background: var(--inputCurrent);
        border-radius: 10px;
        cursor: pointer;
        animation: opacity forwards 1s;

    }

    .all{
        grid-column-start: 1;
        grid-column-end: 3;
        width: 90%;
        height: 90%;
        display: grid;
        grid-template-columns: 100%;
        opacity: 0;
        padding: 2%;
    }

    .allShow{
        animation: opacity forwards 1s;
    }

    @keyframes  opacity {
        to{
            opacity: 1;
        }

        from{
            opacity: 0;
        }
    }

    .all h1{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        font-size: 15px;
    }

    .all-user{
        height: 20vh;
        transition: .5s;

    }
    

    .all img{
        width: 50%;
        height: fit-content;
    }

    .button-permission{
        display: grid;
        grid-template-columns: 50% 50%;
        border: 1px solid transparent;
        border-radius: 20px;
    }

    .button-permission:hover{
        cursor: pointer;
        border: 1px solid var(--color);
    }

</style>