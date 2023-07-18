<template>
    <HeaderComponents :profile="true"/>
    <div class="background-components" >
        <NavComponent class="nav" @permission="getPermission"/>
        <UsersComponent :permission="this.permission"/>
    </div>

</template>

<script>
import HeaderComponents from '@/components/HeaderComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import UsersComponent from '@/components/UsersComponent.vue'

export default({
    components: {
        HeaderComponents,NavComponent,UsersComponent
    },
    data(){
        return{
            permission: null
        }
    },
    methods:{
        getPermission(data){
            this.permission = data
        }
    }
})
</script>

