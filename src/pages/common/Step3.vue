<template>
  <div>
    完成
    <a-button>
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