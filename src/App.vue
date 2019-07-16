<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
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
ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  p{
    margin: 0;
    padding: 0
  }
</style>
