<template>
  <div id="app">
    <orders/>
  </div>
</template>

<script>
import orders from './pages/main.vue'
export default {
  name: 'app',
  components: {
    orders
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
}
</style>
