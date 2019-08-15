<template>
      <div id="basiclayouts">
            <My-Header :showNav="true"></My-Header>
            <router-view></router-view>
      </div>
</template>
<script>
import MyHeader from '@/components/Header/Header'
export default {
      components:{
            MyHeader
      },
      data(){
            return{
                  
            }
      }
}
</script>
<style lang="less" scoped>
      #basiclayouts{
            position: relative;
            width: 100%;
            min-height: 100%;
            
      }
</style>
