<template>
  <div id="MyMenu">
    <a-menu mode="inline" :defaultSelectedKeys="[$route.name]" :defaultOpenKeys="openKeys()">
      <a-menu-item key="dashbored">
        <a-icon type="dashboard" class="title-icon" />
        <span>
          <router-link style="font-size: 20px;" to="/dashbored">仪表盘</router-link>
        </span>
      </a-menu-item>
      <a-sub-menu key="order" class="my-submenu">
        <span slot="title">
          <a-icon type="file-text" class="title-icon" />
          <span>订单管理</span>
        </span>
        <a-menu-item key="perorder">
          <router-link to>个人订单</router-link>
        </a-menu-item>
        <a-menu-item key="grouporder">
          <router-link to="grouporder">Group Order</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="commission" class="my-submenu">
        <span slot="title">
          <a-icon type="dollar" class="title-icon" />
          <span>Commission Management</span>
        </span>
        <a-menu-item key="commissions">
          <router-link to="/commissions">Commission Management</router-link>
        </a-menu-item>
        <a-menu-item key="commissionsdetails">
          <router-link to="/commissionsdetails">Commission Details</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="accountset">
        <a-icon type="idcard" class="title-icon" />
        <span style="font-size: 20px;">账号设置</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.name);
  },
  methods: {
    openKeys() {
      if (this.$route.name == "perorder" || this.$route.name == "grouporder") {
        return ["order"];
      } else if (
        this.$route.name == "commissions" ||
        this.$route.name == "commissionsdetails"
      ) {
        return ["commission"];
      }
    }
  },
  computed: {}
};
</script>
<style lang="less">
@import "./../index.less";
#MyMenu {
  .title-icon {
    font-size: 24px;
  }
  .ant-menu-item-selected {
    background-color: #fff !important;
    i {
      color: #33b8b3 !important;
    }
    a {
      color: #33b8b3 !important;
    }
  }
}
</style>
