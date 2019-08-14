<template>
      <div id="MyMenu">
            <a-menu mode="inline" @openChange="onOpenChange" :defaultSelectedKeys="['5']">
                  <a-menu-item key="1">
                        <a-icon type="dashboard" class="title-icon"/>
                        <span style="font-size: 20px;">仪表盘</span>
                  </a-menu-item>
                  <a-sub-menu key="sub2" class="my-submenu">
                        <span slot="title"><a-icon type="file-text" class="title-icon"/><span>订单管理</span></span>
                        <a-menu-item key="2">
                              <router-link to="">个人订单</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                              <router-link to="">团体订单</router-link>
                        </a-menu-item>
                        
                  </a-sub-menu>
                  <a-sub-menu key="sub3" class="my-submenu">
                        <span slot="title"><a-icon type="dollar" class="title-icon"/><span>佣金管理</span></span>
                        <a-menu-item key="4"><router-link to="">佣金管理</router-link></a-menu-item>
                        <a-menu-item key="5"><router-link to="">佣金明细</router-link></a-menu-item>
                        
                  </a-sub-menu>
                  <a-menu-item key="6">
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
      methods: {
            onOpenChange (openKeys) {
                  const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
                  if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                  this.openKeys = openKeys
                  } else {
                  this.openKeys = latestOpenKey ? [latestOpenKey] : []
                  }
            },
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
