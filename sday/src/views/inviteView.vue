<template>
    <div v-if="loading" class="load">
        <div class="component"></div>
        <p>Lendo seu link</p>
    </div>
</template>

<script>
import api from "../classes/api"
import router from "../router"

export default {
    async created(){
        const result = await api.enter(this.$route.params.code);

        if (result.status){
            router.push({name: "home", path: "/"})
        }
    }
}
</script>

