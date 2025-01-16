<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script>
import MainView from './views/MainView.vue';

export default {
  name: 'App',
  components: {
    MainView,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>


