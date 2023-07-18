<template>
    <div class="background-components">
        <NavComponent/>
        <CalendarView/>
    </div>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue';
import CalendarView from '@/components/CalendarView.vue';

export default {
    components: {NavComponent, CalendarView},

}
</script>

<style scoped>

</style>