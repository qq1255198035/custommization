<template>
      <div id="basiclayouts">
            <My-Header></My-Header>
            <router-view></router-view>
      </div>
</template>
<script>
import MyHeader from '@/components/header/Header'
export default {
      components:{
            MyHeader
      },
}
</script>
<style lang="less" scoped>
      #basiclayouts{
            position: relative;
            width: 100%;
            height: 100%;
      }
</style>
