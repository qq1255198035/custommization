<template>
  <div id="SellerLayout">
    <div class="content">
      <a-row type="flex" justify="space-between" align="top" style="min-height: 100%;height: 100%;">
        <a-col :span="6" style="height: 100%;">
          <div class="left-menu" ref="left">
            <My-Header :showNav="false"></My-Header>
            <a-drawer
              style="margin-top: 50px;"
              v-if="isMobile()"
              placement="left"
              :wrapClassName="`drawer-sider ${navTheme}`"
              :closable="false"
              :visible="collapsed"
              @close="drawerClose"
            >
              <side-menu
                mode="inline"
                :menus="menus"
                :theme="navTheme"
                :collapsed="false"
                :collapsible="true"
                @menuSelect="menuSelect"
              ></side-menu>
            </a-drawer>

            <side-menu
              v-else-if="isSideMenu()"
              mode="inline"
              :menus="menus"
              :theme="navTheme"
              :collapsed="collapsed"
              :collapsible="true"
            ></side-menu>
          </div>
        </a-col>
        <a-col :span="18" style="height: 100%;">
          <div class="right-menu" ref="right">
            <User></User>
                <transition name="page-transition">
              <route-view />
            </transition>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- SideMenu -->

    <!-- Setting Drawer (show in development mode) -->
    <!-- <setting-drawer v-if="!production"></setting-drawer> -->
  </div>
</template>

<script>
import { triggerWindowResizeEvent } from "@/utils/util";
import { mapState, mapActions } from "vuex";
import MyHeader from "@/components/Header/Header";
import { mixin, mixinDevice } from "@/utils/mixin";
import config from "@/config/defaultSettings";
import User from "@/components/Header/User";
import RouteView from "./RouteView";
import SideMenu from "@/components/Menu/SideMenu";

export default {
  name: "BasicLayout",
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    MyHeader,
    User
  },
  data() {
    return {
      //production: config.production,
      collapsed: false,
      menus: []
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return "0";
      }
      if (this.sidebarOpened) {
        return "256px";
      }
      return "80px";
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    }
  },
  created() {
    console.log(this.mainMenu);
    //this.menus = this.mainMenu;
    this.menus = this.mainMenu.find(item => item.path === "/").children;
    console.log(this.menus);
    this.collapsed = !this.sidebarOpened;
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edge") > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed;
        setTimeout(() => {
          this.collapsed = !this.collapsed;
        }, 16);
      });
    }
  },
  methods: {
    ...mapActions(["setSidebar"]),
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
      triggerWindowResizeEvent();
    },
    paddingCalc() {
      let left = "";
      if (this.sidebarOpened) {
        left = this.isDesktop() ? "256px" : "80px";
      } else {
        left = (this.isMobile() && "0") || ((this.fixSidebar && "80px") || "0");
      }
      return left;
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false;
      }
    },
    drawerClose() {
      this.collapsed = false;
    }
  }
};
</script>

<style lang="less">
#SellerLayout {
  width: 100%;
  height: 100%;
  padding: 50px;
  .content {
    height: 100%;
    .left-menu {
      background-color: #33b8b3;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding-top: 50px;
      min-height: 100%;
    }
    .right-menu {
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 20px;
      min-height: 100%;
      position: relative;
    }
  }
}
.ant-menu-inline {
  border-right: none;
}
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


<!--<template>
    <div id="SellerLayout">
        <div class="content">
            <a-row type="flex" justify="space-between" align="top" style="min-height: 100%;height: 100%;">
                <a-col :span="6" style="height: 100%;">
                    <div class="left" ref="left">
                        <My-Header></My-Header>
                        <My-Menu style="margin-top: 50px;"></My-Menu>
                    </div>
                </a-col>
                <a-col :span="18" style="height: 100%;">
                    <div class="right" ref="right">
                        <User style="width: 100%;height: 58px;background-color: #fff;position: absolute;left: 0;right: 0;top:0;z-index: 9999;padding-top: 20px;"></User>
                        <div class="scroll-box">
                            <router-view></router-view>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import User from '@/components/Header/User';
import MyHeader from '@/components/Header/Header';
import MyMenu from "@/components/MyMenu/MyMenu";
export default {
    components:{
        User,
        MyMenu,
        MyHeader
    },
    mounted(){
       
    }
}
</script>

<style lang="less" scoped>
#SellerLayout{
    width: 100%;
    height: 100%;
    padding: 50px;
    .content{
        height: 100%;

        .left{
            background-color: #33b8b3;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            padding-top: 50px;
            min-height: 100%;
        }
        .right{
            background-color: #fff;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 20px;
            min-height: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            .scroll-box{
                padding-top: 58px; 
                overflow-y: scroll;
                height: 100%;
                &::-webkit-scrollbar {  /*滚动条整体样式*/
                    width: 0;  /*宽分别对应竖滚动条的尺寸*/
                    /*高分别对应横滚动条的尺寸*/
                }
            }
           
           

        }
        
    }
    
}
</style>-->
