<template>
  <!--<exception-page type="404" />-->
  <div class="backs">
    <div>404</div>
    <div>
      <a-button @click="backHome">返回首页</a-button>
    </div>
  </div>
</template>

<script>
//import { ExceptionPage } from '@/components/Exception'

export default {
  methods: {
    backHome() {
      this.$router.push({
        path: '/index'
      })
    }
  }
  /*components: {
    ExceptionPage
  }*/
}
</script>

<style scoped lang="less">
  .backs{
    text-align: center;
    padding-top: 60px;
  }
</style>
