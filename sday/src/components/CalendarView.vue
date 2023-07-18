<template>
    <div class="background-calendar">
        <header>
            <h1>Linha do tempo</h1>
            <div class="time"><input type="date" v-model="date" @change="selectCalendar"></div>
            <div class="days">
                <p v-for="day of days()" :key="day">{{ day }}</p>
        </div>
        </header>
        <div class="calendar-background">
            <div class="calendar">
                <div class="lines">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div class="tasks">
                    <div class="group">
                        <div class="task" :style="{gridColumnStart:  dateCreatedDiff(subtask.created), gridColumnEnd: dateFinishedDiff(subtask.finished), backgroundColor: hexToRGBA(subtask.color)}" v-for="subtask of subtasks" :key="subtask">
                            <div class="progress-bar" :style="{width: progress(subtask.progress), backgroundColor: subtask.color}"></div>
                            <span>{{ subtask.progress }} - {{ subtask.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>

<script>
import moment from 'moment';
import api from "../classes/api"

export default({
    data(){
        return{
            date: '',
            subtasks: []
        }
    },
    created(){
        this.date = new Date().toISOString().split('T')[0];
        this.selectCalendar()

    },
    methods:{
        days() {
            const daysArray = [];
            let date = new Date(this.date);
            date.setDate(date.getDate()-1)
            for (let cont = 0; cont < 15; cont++){
                date.setDate(date.getDate()+1)
                daysArray.push(date.getUTCDate().toString().padStart(2, "0"))
            }
            return daysArray;
        },
        dateCreatedDiff(date){
            date = moment(date)
            let dateSelected = moment(this.date)
            let diff = date.diff(dateSelected, "days")
            
            if (diff < 0) diff = 0

            return diff+1
        },
        dateFinishedDiff(date){
            date = moment(date)
            let dateSelected = moment(this.date)
            let diff = date.diff(dateSelected, "days")
            
            if (diff < 0) diff = 0


            return diff+2
        },
        async selectCalendar(){
            this.subtasks = await api.getCalendar(this.$route.params.id, this.date)
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
        progress(progress){
            console.log(progress)
            if (progress == "0%"){
                return "1%";
            }else{
                return progress 
            }
        }
    }
    
})
</script>


<style scoped>
    .background-calendar{
        width: 80vw;
        height: 80vh;
        min-height: 80vh;
        background-color: var(--backgroundItemCurrent);
        margin: auto auto auto auto;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 25% 75%;
        color: var(--textColorDark);
    }

    header{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        font-size: 40px;
    }

    header h1{
        padding: 3%;
        height: fit-content;
    }

    .time{
        background: var(--color);
        width: fit-content;
        padding: 1%;
        height: fit-content;
        border-radius: 20px;
        margin: auto;
    }

    .time input{
        border: 0;
        background: var(--color);
        color: white;
        font-size: 25px;
        width: fit-content;
        height: fit-content;
        text-align: center;
        margin: auto;
    }

    .time input:focus{
        outline: 0;
    }

    .days{
        grid-column-start: 1;
        grid-column-end: 4;
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        font-size: 30px;
    }

    .days p{
        margin: auto;
    }

    .calendar{
        display: flex;
        overflow-x: hidden;
        width: 80vw;
        min-height: 60vh;
    }

    .calendar-background{
        overflow-x: hidden;
        
    }


    .lines{
        width: 80vw;
        min-width: 80vw;
        display: grid;
        grid-template-columns: repeat(15, 1fr);
    }

    .line{
        background: var(--backgroundItem2Current);
        width: 5px;
        height: 95%;
        border-radius: 20px;
        margin: 0 auto 0 auto;
    }

    .tasks{
        width: 80vw;
        min-width: 80vw;
        margin-left: -80vw;
        display: grid;
        grid-template-columns: 100%;
        margin-bottom: 5%;
    }

    .group{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        height: 100%;

    }

    .task{
        width: 95%;
        height: 6.3vh;
        margin-left: 2.5%;
        margin-right: 2.5%;
        border-radius: 50px;
        z-index: 1;
        overflow-x: auto;
        margin-bottom: 2%;
        margin-top: 2%;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        overflow-y: hidden;
        cursor: pointer;
    }

    .progress-bar{
        height: 100%;
        border-radius: 50px;
        z-index: -2;
        margin-bottom: 0;
    }

    .task span{
        height: 6.3vh;
        width: 100%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-size: 15pt;
        margin-top: -6.3vh;
        color: var(--textColorCurrent);
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;   
    }

</style>