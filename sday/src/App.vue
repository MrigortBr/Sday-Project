<template>
  <HeaderComponentVue ref="login"/>
  <router-view/>
  <AlertComponent ref="alert"/>
</template>

<script>
import HeaderComponentVue from './components/HeaderComponent.vue';
import AlertComponent from './components/AlertComponent.vue';

export default{
  components: {HeaderComponentVue, AlertComponent}
}
</script>


