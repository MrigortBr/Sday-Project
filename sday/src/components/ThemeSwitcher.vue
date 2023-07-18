<template>
    <div class="themeSwitcher-background" @click="switchTheme">
        <img class="themeSwitcher-svg" src="../assets/brightness-high.svg" alt="">
        <img class="themeSwitcher-svg" src="../assets/moon.svg" alt="">
        <div ref="Switcherbutton" class="themeSwitcher-button" :class="{'dark': this.Theme.dark, 'white': this.Theme.white}"></div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            Theme: {}
            
        }
    },
    methods:{
        switchTheme(){
            if (this.Theme.dark == true){
                this.Theme.white = true
                this.Theme.dark = false
                this.applyTheme()
            }else{
                this.Theme.white = false
                this.Theme.dark = true
                this.applyTheme()
            }
            localStorage.setItem("theme", JSON.stringify({dark: this.Theme.dark, white: this.Theme.white}))
        },
        detectdTheme(){
            let lastTheme = localStorage.getItem("theme")
            if (!lastTheme){
                localStorage.setItem("theme", JSON.stringify({dark: false, white: true}))
                this.Theme = {dark: false, white: true}
            }else{
                lastTheme = JSON.parse(lastTheme)
                this.Theme = {dark: lastTheme.dark, white: lastTheme.white}
            }
            this.applyTheme()
        },
        applyTheme(){
            if (this.Theme.dark == true){
                document.body.style.setProperty('--backgroundCurrent', getComputedStyle(document.body).getPropertyValue('--backgroundDark'));
                document.body.style.setProperty('--backgroundItemCurrent', getComputedStyle(document.body).getPropertyValue('--backgroundItemDark'));
                document.body.style.setProperty('--backgroundItem2Current', getComputedStyle(document.body).getPropertyValue('--backgroundItem2Dark'));
                document.body.style.setProperty('--textColorCurrent', getComputedStyle(document.body).getPropertyValue('--textColorDark'));
                document.body.style.setProperty('--inputCurrent', getComputedStyle(document.body).getPropertyValue('--inputDark'));
                document.body.style.setProperty('--backgroundSettingsProject', getComputedStyle(document.body).getPropertyValue('--backgroundSettingsProjectDark'));
                document.body.style.setProperty('--backgroundUsersProject', getComputedStyle(document.body).getPropertyValue('--backgroundUsersProjectDark'));
                document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--backgroundDark'));
                document.getElementsByClassName("themeSwitcher-button")[0].style.marginLeft = "-58%"
            }else{
                
                document.body.style.setProperty('--backgroundCurrent', getComputedStyle(document.body).getPropertyValue('--backgroundWhite'));
                document.body.style.setProperty('--backgroundItemCurrent', getComputedStyle(document.body).getPropertyValue('--backgroundItemWhite'));
                document.body.style.setProperty('--backgroundItem2Current', getComputedStyle(document.body).getPropertyValue('--backgroundItem2White'));
                document.body.style.setProperty('--textColorCurrent', getComputedStyle(document.body).getPropertyValue('--textColorWhite'));
                document.body.style.setProperty('--inputCurrent', getComputedStyle(document.body).getPropertyValue('--inputWhite'));
                document.body.style.setProperty('--backgroundSettingsProject', getComputedStyle(document.body).getPropertyValue('--backgroundSettingsProjectWhite'));
                document.body.style.setProperty('--backgroundUsersProject', getComputedStyle(document.body).getPropertyValue('--backgroundUsersProjectWhite'));
                document.body.style.backgroundColor = (getComputedStyle(document.body).getPropertyValue('--backgroundWhite'));
                document.getElementsByClassName("themeSwitcher-button")[0].style.marginLeft = "-118%"
            }
        }
    },
    mounted(){
        this.detectdTheme()
    }
}
</script>

<style scoped>
    .themeSwitcher-background{
        width: 6vw;
        height: 4.5vh;
        display: flex;
        border-radius: 50px;
        cursor: pointer;
        user-select: none;
        border: 1px solid var(--color);
        background-color:  var(--backgroundItem2Current);
    }

    .themeSwitcher-background > *{
        user-select: none;
    }

    .themeSwitcher-svg{
        width: 30%;
        margin-right: 25%;
        margin-left: 5%;
        z-index: 1;
    }

    .themeSwitcher-button{
        background-color: #8E8E8E; 
        width: 2vw;
        height: 2vw;
        min-height: 2vw;
        margin: auto;
        transition: .3s;
        border-radius: 100%;
    }
</style>