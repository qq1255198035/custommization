<template>
  <div style="text-align: center;">
    <p style="margin: 20px 0; font-size: 18px;color: #33b8b3;">密码修改成功！</p>
    <a-button type="primary">
      <router-link class="login" :to="{ path: '/login' }">去登录</router-link>
    </a-button>
  </div>
</template>

<script>

  export default {
    name: "Step3",
    components: {
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  
</style>