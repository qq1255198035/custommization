<template>
  <div style="text-align: center;">
    <p style="margin: 20px 0; font-size: 18px;color: #33b8b3;">Successful!</p>
    <a-button type="primary">
      <router-link class="login" :to="{ path: '/login' }">Proceed to Sign-In</router-link>
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
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  
</style>