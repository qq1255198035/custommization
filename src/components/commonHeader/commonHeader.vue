<template>
      <a-menu
        theme="light"
        mode="inline"
        :defaultSelectedKeys="['1']"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="solution" />
            <span>订单管理</span>
          </span>
          <a-menu-item key="1">
              个人订单
              <router-link to="{path: '/orders'}"></router-link>
          </a-menu-item>
          <a-menu-item key="2">Group Order</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="3">
          <a-icon type="user" />
          <span>Account Settings</span>
          <router-link to="{path: '/account'}"></router-link>
        </a-menu-item>
      </a-menu>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
  }
};
</script>
<style lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

</style>
