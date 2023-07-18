<template>
    <input type="file" name="" id="" style="visibility: hidden; position: absolute;" ref="file" @change="selectFile" accept="image/png,image/jpeg">
    <div class="background-new">
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
                <p>Enviar imagem para o projeto</p>    
            </div>
        </div>
        <div class="inputs-background">
            <input class="inputs" type="text" name="" id="" placeholder="Titulo do Projeto" v-model="name">
            <textarea name="" placeholder="Descrição do projeto" v-model="description"></textarea>
            <button @click="create">Criar</button>
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
                require("../assets/undraw_team_up_re_84ok.svg"),
                require("../assets/undraw_static_website_re_x70h.svg"),
                require("../assets/undraw_solution_mindset_re_57bf.svg"),
                require("../assets/undraw_react_re_g3ui.svg"),
                require("../assets/undraw_projections_svg_login.svg"),
                require("../assets/undraw_projections_re_ulc6.svg"),
                require("../assets/undraw_preferences_popup_re_4qk0.svg"),
                require("../assets/undraw_mobile_development_re_wwsn.svg"),
                require("../assets/undraw_mobile_encryption_re_yw3o.svg"),
                require("../assets/undraw_pair_programming_re_or4x.svg"),
                require("../assets/undraw_performance_overview_re_mqrq.svg")
            ],
            name: "",
            description: ""
        }
    },
    methods:{
        next(){
            this.index++
            if(this.index > this.pictures.length-1){
                this.index = 0
            }

            console.log(this.pictures   )
            
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
                console.log(resultBLOB)
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
        async create(){
            if (this.name === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Titulo do projeto é obrigatório.");
            } else if (this.name.length < 6) {
                this.$parent.$parent.$refs.alert.createAlert("error", "O campo Nome deve ter pelo menos 6 caracteres.");
            } else if (this.description === "") {
                this.$parent.$parent.$refs.alert.createAlert("alert", "O campo Descrição do projeto é obrigatório.");
            } else {
                const name = this.name;
                const description = this.description;
                let image = this.pictures[this.index]
                
                if (image.indexOf("/img") != -1){
                image = image.split(".")[0]
                image = image.replace("/img/", "")
                }   

                const result = await api.newProject(name, description, image)
                if (result.status){
                    router.push({name: "home", path:"/"})
                    this.$parent.$parent.$refs.alert.createAlert("check", result.message)
                }else{
                    this.$parent.$parent.$refs.alert.createAlert("error", result.data)
                }

            }
        }
    }
}
</script>

<style scoped>
    .background-new{
        width: 80vw;
        height: 80vh;
        min-width: 80vw;
        margin: 5vh 10vw 5vh 10vw;
        display: grid;
        grid-template-columns: 50% 50%;
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
        border-radius: 20px;

    }
    
    .gallery-image{
        border: 1px solid black;
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
        width: fit-content;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
        margin: auto;
        border-radius: 20px;
        padding: 2%;
        
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
        margin: auto;
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

    .inputs-background{
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 15% 70% 15%;
    }

    .inputs-background input, .inputs-background textarea{
        width: 90%;
        height: 90%;
        margin: 0 auto auto auto;
        border-radius: 15px;
        background-color: var(--inputCurrent);
        color: var(--textColorCurrent);
        font-size: 20pt;
        border: 0;
        padding: 2%;
    }

    .inputs-background textarea{
        margin-top: 5%;
        height: 85%;
        margin-bottom: 0;
    }


    .inputs-background button{
        margin: auto;
        width: 90%;
        height: 90%;
        border-radius: 15px;
        font-size: 25px;
        background-color: var(--color);
        transition: .5s;
        cursor: pointer;
        margin-bottom: 0;
    }

    .inputs-background button:hover{
        width: 95%;
    }

    .inputs-background textarea:focus,.inputs-background input:focus{
        outline: 0;
    }
</style>
