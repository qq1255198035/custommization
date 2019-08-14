<template>
      <div id="MyMenu">
            <a-menu mode="inline" :defaultSelectedKeys="[$route.name]">
                  <a-menu-item key="dashbored">
                        <a-icon type="dashboard" class="title-icon"/>
                        <span style="font-size: 20px;">仪表盘</span>
                  </a-menu-item>
                  <a-sub-menu key="order" class="my-submenu">
                        <span slot="title"><a-icon type="file-text" class="title-icon"/><span>订单管理</span></span>
                        <a-menu-item key="perorder">
                              <router-link to="perorder">个人订单</router-link>
                        </a-menu-item>
                        <a-menu-item key="grouporder">
                              <router-link to="">团体订单</router-link>
                        </a-menu-item>
                        
                  </a-sub-menu>
                  <a-sub-menu key="commission" class="my-submenu">
                        <span slot="title"><a-icon type="dollar" class="title-icon"/><span>佣金管理</span></span>
                        <a-menu-item key="yjgl"><router-link to="">佣金管理</router-link></a-menu-item>
                        <a-menu-item key="yjmx"><router-link to="">佣金明细</router-link></a-menu-item>
                  </a-sub-menu>
                  <a-menu-item key="accountset">
                        <a-icon type="idcard" class="title-icon"/>
                        <span style="font-size: 20px;">账号设置</span>
                  </a-menu-item>
            </a-menu>
      </div>
</template>
<script>
export default {
      data(){
            return{
                  
                 
            }
      },
      mounted(){
            console.log(this.$route.name)
      },
      methods: {
            
      },
}
</script>
<style lang="less">
@import "./../index.less";
#MyMenu{
      .title-icon{
            font-size: 24px;
      }
}
</style>
