<template>
<a-locale-provider :locale="locale">
  <div id="app">
    <!--<keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive >-->
      <router-view></router-view>
      <lg-preview></lg-preview>
  </div>
  </a-locale-provider>
</template>
<script>
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      locale: en_US
    }
  },
  mounted(){
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
*{
  box-sizing: border-box;
}
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  input::-webkit-input-placeholder{
    color: #ccc;
  }
  
}
a{
  &:hover{
    color: #33B8B3;
  }
  &:active{
    color: #33B8B3;
  }
}
</style>
