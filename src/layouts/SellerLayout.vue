<template>
  <div id="SellerLayout">
    <div class="content" v-if="mobileShow">
      <a-row type="flex" justify="space-between" align="top" style="min-height: 100%;height: 100%;">
        <a-col :span="5" style="height: 100%;">
          <div class="left-menu" ref="left">
            <My-Header :showNav="false"></My-Header>
            <div class="menu-scroll">
              <side-menu
                mode="inline"
                :menus="menus"
                :theme="navTheme"
                :collapsed="collapsed"
                :collapsible="true"
              ></side-menu>
            </div>
            
          </div>
        </a-col>
        <a-col :span="19" style="height: 100%;">
          <div class="right-menu" ref="right">
            <User></User>
            <!--<transition name="page-transition">
              <route-view />
            </transition>-->
            <div class="scroll-box">
                <router-view></router-view>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div v-else class="mobile-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import MyHeader from "@/components/Header/Header";

//import config from "@/config/defaultSettings";
import User from "@/components/Header/User";
//import RouteView from "./RouteView";
import SideMenu from "@/components/Menu/SideMenu";

export default {
 
  components: {
    SideMenu,
    MyHeader,
    User,
    
  },
  data() {
    return {
      //production: config.production,
      collapsed: false,
      menus: [],
      navTheme: 'light',
      mobileShow: false
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    
  },
  watch: {
  },
  created() {
    this.menus = this.mainMenu.find(item => item.path === "/").children;
    this.collapsed = !this.sidebarOpened;
    this.getWindowScreen();
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
    getWindowScreen(){
      let screenWidths = window.screen.width;
      if(screenWidths > 768){
        this.mobileShow = true;
      }else{
        this.mobileShow = false;
      }
    },
  }
};
</script>

<style lang="less">
@import url("./../components/index.less");

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
      padding-bottom: 120px;
      height: 100%;
      overflow: hidden;
    }
    .right-menu {
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-bottom: 78px;
      min-height: 100%;
      overflow: hidden;
      height: 100%;
      position: relative;
      .scroll-box{
                
                
                overflow-y: scroll;
                height: 100%;
                
                &::-webkit-scrollbar {  /*滚动条整体样式*/
                    width: 6px;  /*宽分别对应竖滚动条的尺寸*/
                    /*高分别对应横滚动条的尺寸*/
                    background-color: #fff;
                    
                }
                &::-webkit-scrollbar-thumb {
                    background-color: #33b8b3;
                    border-radius:4px;
                    height: 10%;
                }
            }
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
@media screen and (max-width: 768px) and (min-width: 325px){
  #SellerLayout {
    width: 100%;
    height: 100%;
    padding: 0;
    .mobile-box{
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }
  }
}
</style>