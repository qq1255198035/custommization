<template>
  <div>
    <div id="box">
      <My-Header :showNav="false"></My-Header>
      <div class="wrapper">
        <dir class="lefts">
          <a-drawer
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
        </dir>
        <div class="rights">
          <transition name="page-transition">
            <route-view />
          </transition>
        </div>
      </div>
      <!-- SideMenu -->

      <!-- Setting Drawer (show in development mode) -->
      <!-- <setting-drawer v-if="!production"></setting-drawer> -->
    </div>
  </div>
</template>

<script>
import { triggerWindowResizeEvent } from "@/utils/util";
import { mapState, mapActions } from "vuex";
import MyHeader from "@/components/Header/Header";
import { mixin, mixinDevice } from "@/utils/mixin";
import config from "@/config/defaultSettings";

import RouteView from "./RouteView";
import SideMenu from "@/components/Menu/SideMenu";

export default {
  name: "BasicLayout",
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    MyHeader
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
.wrapper {
  display: flex;
}
.lefts {
  flex: 0 0 140px;
}
.rights {
  flex: 1;
  padding-left: 40px;
}
#box {
  width: 100%;
  min-width: 100%;
  padding: 150px 80px 0;
  min-height: 100%;
  background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
  overflow: hidden;
}
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
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
        <My-Header :showNav="false"></My-Header>
        <a-row type="flex" justify="space-between" align="top">
            <a-col :span="4">
                <My-Menu></My-Menu>
            </a-col>
            <a-col :span="20">
                <router-view></router-view>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import MyHeader from '@/components/Header/Header';
import MyMenu from "@/components/MyMenu/MyMenu";
export default {
    components:{
        MyHeader,
        MyMenu
    }
}
</script>

<style lang="less" scoped>
#SellerLayout{
    width: 100%;
    min-height: 100%;
    padding: 150px 80px 0;
    background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
}
</style>-->