<template>
    <div class="background-components" >
        <NavBarComponent class="nav"/>
        <SettingsComponent/>
    </div>
</template>

<script>
// import axios from 'axios';
import NavBarComponent from '@/components/NavComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue';

export default {
    components: {NavBarComponent,SettingsComponent}
}
</script>