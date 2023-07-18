<template>
    <HeaderComponents :profile="true"/>
    <div class="background-components" >
        <NavComponent class="nav" @permission="getPermission"/>
        <TasksComponent v-if="list" :permission="this.permission" @config="configElement"/>
        <EditComponentCopyVue v-else-if="!list" :tasks="tasks" @leave="leave"/>
    </div>
</template>

<script>
import EditComponentCopyVue from '@/components/EditComponent.vue';
import HeaderComponents from '@/components/HeaderComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import TasksComponent from '@/components/TasksComponent.vue'

export default({
    data(){
        return{
            list: true,
            tasks: null,
            permission: null
        }
    },
    components: {
        HeaderComponents,NavComponent,TasksComponent,EditComponentCopyVue
    },
    methods:{
        configElement(element){
            this.list = false
            this.tasks = element
        },
        leave(){
            this.list = true
            this.tasks = null
        },
        getPermission(data){
            this.permission = data
        }
    }
});
</script>