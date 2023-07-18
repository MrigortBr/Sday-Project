<template>
    <div class="message" :class="{'alert': alert.type == 'alert', 'error': alert.type == 'error', 'check': alert.type == 'check', 'destroy': destroy, 'create': !destroy}" v-if="alert.alert">
        <img v-if="alert.type=='alert'" src="../assets/exclamation-triangle.svg" alt="">
        <img v-if="alert.type=='error'" src="../assets/x-octagon.svg" alt="">
        <img v-if="alert.type=='check'" src="../assets/check-lg.svg" alt="">
        <h1>{{ alert.message }}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return{
            destroy: false,
            timeoutId: null,
            alert: {alert: false, message: '', destroy: false, reset: '', type: ''}
        }
    },
    created(){
        this.initAlert();
    },
    watch:{
        alert: {
            handler(){
                if (this.alert.destroy){
                    this.destroy = true
                    clearTimeout(this.timeoutId)
                }else if(this.alert.alert){
                    try {
                        const audio = new Audio(require('../assets/audio/popup1.mp3'));
                        audio.volume = 0.2
                        audio.play();
                        this.destroy = false;
                        this.initAlert()
                    } catch (error) {
                        console.log(error)
                    }

                }
            }, deep: true
        }
    },
    methods: {
        initAlert(){
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => {
                this.destroy = true
                setTimeout(() => {
                    this.alert.alert = false
                }, 1000);
            }, 3500);
        },
        createAlert(type, message){
            if (this.alert.alert){
                this.alert.destroy = true
                clearTimeout(this.setTimeout)
                this.setTimeout = setTimeout(() => {
                    this.alert.destroy = false
                    this.alert.message = message;
                    this.alert.type = type;
                }, 500);
                
            }else{
                this.alert.message = message;
                this.alert.type = type;
                this.alert.alert = true;
            }
        }
    }
}
</script>   


<style scoped>
    .message{
        display: grid;
        grid-template-columns: 30% 70%; 
        padding-right: 2%;
        width: 20vw;
        height: 5vw;
        position: absolute;
        top: 80vh;
        bottom: 10vh;
        left: 80vw;
    }

    .alert{
        background-color: rgba(255, 255, 0, 0.753);
    }
    .error{
        background-color: rgba(211, 4, 4, 0.699);
        color: white;
    }

    .check{
        background-color: rgba(13, 146, 1, 0.699);
        color: white;
    }

    .create{
        animation: enter 0.5s;
    }

    .destroy{
        animation: leave 0.5s forwards;
    }

    @keyframes leave {
        to{
            left: 140vw;
        }
        from{
            left: 80vw;
        }
    }

    @keyframes enter {
        from{
            left: 140vw;
        }
        to{
            left: 80vw;
        }
    }

    .message img{
        height: 90%;
        margin: auto;
    }

    .message h1{
        font-size-adjust: 100%;
        text-align: center;
        vertical-align: middle;
        height: fit-content;
        margin: auto;
        width: 100%;
        font-size: 15px;
    }
</style>