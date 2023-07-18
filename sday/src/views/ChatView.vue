<template>
    <div class="background-components" >
        <NavComponent class="nav"/>
        <ChatComponent @new="this.new"/>
    </div>
</template>

<script>
import NavComponent from '@/components/NavComponent';
import ChatComponent from "@/components/ChatComponent";
    export default {
        components: {NavComponent,ChatComponent},
        methods:{
            new(){
                console.log("NOVA MENSAGEm")
            }
        }
    }
</script>