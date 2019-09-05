<template>
<a-locale-provider :locale="locale">
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive >
      <router-view  v-if="!$route.meta.keepAlive"></router-view>
  </div>
  </a-locale-provider>
</template>

<script>

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      locale: zhCN
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

  
</style>
