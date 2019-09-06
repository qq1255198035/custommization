<template>
  <div id="User">
    
    <notice></notice>
    <span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="user" />
        </a>
        <a-menu slot="overlay" @click="onClick">
          <a-menu-item key="1"><a-icon type="logout" />退出登录</a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <span></span>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import notice from '@/components/notice/notice'
export default {
  data() {
    return {
      count: 0
    };
  },
  components: {
      notice
  },
  methods: {
    ...mapActions(["Logout"]),
    onClick({ key }) {
      console.log(key);
      const that = this;
      this.$confirm({
        title: "退出登录",
        content: "确认退出登录？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          that.Logout();
          window.location.reload();
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style lang="less" scope>
.drapDown {
  padding: 10px;
  box-shadow: 0 2px 3px #eee;
  li {
    a {
      color: #999;
    }
  }
}
#User {
  text-align: right;
  > span {
    margin: 0 10px;
    i {
      color: #33b8b3;
      font-size: 30px;
      padding: 4px;
    }
  }
  .header-notice {
    position: relative;
    .diount {
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
}
</style>