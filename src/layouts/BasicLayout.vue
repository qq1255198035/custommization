<template>
      <div id="basiclayouts">
            <My-Header></My-Header>
            <router-view></router-view>
      </div>
</template>
<script>
import MyHeader from '@/components/Header/WebsiteHead'
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
@import url('./../assets/home.css');
      #basiclayouts{
            position: relative;
            width: 100%;
            min-height: 100%;
            
      }
</style>
