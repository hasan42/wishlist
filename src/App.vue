<template>
  <div id="app">
    <Wish />
  </div>
</template>

<script>
import Wish from './components/Wish/Wish.vue'

export default {
  name: 'app',
  components: {
    Wish
  },
  mounted: function () {
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
