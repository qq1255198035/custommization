<template>
  <div id="User">
    <span @click="noticeBtn" style="padding:10px;cursor: pointer;">
      <a-icon style="font-size: 30px; padding: 4px" type="bell" :style="{color: bellcolor}"/>
    </span>
    <!--<notice></notice>-->
    <span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="user" :style="{color: usercolor}"/>
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
//import notice from '@/components/notice/notice'
export default {
  data() {
    return {
      count: 0
    };
  },
  props:{
    bellcolor:{
      default: '#33b8b3'
    },
    usercolor:{
      default: '#33b8b3'
    }
  },
  components: {
      //notice
  },
  methods: {
    ...mapActions(["Logout"]),
    noticeBtn() {
      this.$router.push({
        path: '/notice'
      })
    },
    onClick({ key }) {
      console.log(key);
      const that = this;
      this.$confirm({
        title: "退出登录",
        content: "确认退出登录？",
        okText: "确认",
        cancelText: "Cancel",
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
    #User{
        text-align: right;
        padding: 20px 0;
        > span{
            margin: 0 10px;
            i{
                color: #33b8b3;
                font-size: 30px;
                padding: 4px;
                
            }
        }
        .header-notice{
            position: relative;
            .diount{
                position: absolute;
                top: 10px;
                right: 0px;
            }
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
</style>