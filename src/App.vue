<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      
   }
  },
  
  mounted(){
    
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  input::-webkit-input-placeholder{
    color: #fff;
  }
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  p{
    margin: 0;
    padding: 0;
  }
  
</style>
