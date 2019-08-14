<template>
      <div id="nav-bar">
            <ul class="nav-list-pc">
                  <li :class="{'nav-active': $route.name == 'home'}">
                        <router-link to="/home">Home</router-link>
                        <!-- <span class="active-border" v-if="this.$route.name == 'home'"></span> -->
                  </li>
                  <li :class="{'nav-active': $route.name == 'products'}">
                        <router-link to="/products">Products</router-link>
                        
                  </li>
                  <li :class="{'nav-active': $route.name == 'about'}">
                        <router-link to="/about">About Us</router-link>
                        
                  </li>
                  <li :class="{'nav-active': false}">
                        <router-link to="">Sign Up</router-link>
                  </li>
                  <li :class="{'nav-active': false}">
                        <router-link to="">My Account</router-link>
                  </li>
            </ul>
            
            <div class="nav-list-mobile">
                  <span @click="hiddenMenuM = !hiddenMenuM"><a-icon type="menu-unfold" /></span>
                  <ul class="hide-menu-mobile" v-show="hiddenMenuM">
                        <li @click="hiddenMenuM = false">
                              <router-link to="/home">Home</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="/products">Products</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="/about">About Us</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="">Sign Up</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="">My Account</router-link>
                        </li>
                  </ul>
            </div>
      </div>
</template>
<script>
export default {
      data(){
            return{
                  hiddenMenuM: false,
                  sideNav: false
            }
      },
      mounted(){
            
      },
      computed:{
            
      }
}
</script>
<style lang="less" scoped>
#nav-bar{
      height: 100px;
      display: flex;
      align-items: center;
      .nav-list-pc{
            height: 100%;
            display: flex;
            > li{
                  height: 100%;
                  padding: 0 40px;
                  display: flex;
                  
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                 
                  .hidden-menu{
                        width: 240px;
                        padding: 0 10px;
                        position: absolute;
                        top:100px;
                        background-color: #fff;
                        left: 0;   
                        li{
                              display: flex;
                              padding: 6px;
                              
                              a{
                                    width: 100%;
                                    color: #333;
                                    font-size: 14px;
                                    padding: 5px;
                                    &:hover{
                                          background-color: #f8f8f8;
                                    }
                              }
                        }
                  }
                  > a{
                        color: #fff;
                        padding: 10px 0;
                        font-size: 30px;
                        position: relative;
                        z-index: 1;
                        &:active{
                              text-decoration: none;
                        }
                        &:focus{
                              text-decoration: none;
                        }
                  }
                  
                  .active-border{
                        width: 15px;
                        height: 2px;
                        background-color: #fff;
                         
                  }
            
            }
      }
      .nav-list-mobile{
            display: none;
            .hidden-menu-m{
                  width: 100%;
                  li{
                        background-color: rgba(0, 0, 0, 0.6);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
                        a{
                              font-size: 10px !important;
                        }
                  }
            }
      }
}
.nav-active{
      
      text-shadow: 8px 0 7px rgba(0,0,0,0.43);
      a{
            font-size: 40px !important;
      }
}
@media screen and(max-width: 800px){
      #nav-bar{
            height: 40px;
            .nav-list-pc{
                  display: none;
            }
            .nav-list-mobile{
                  display: block;
                  span{
                        color: #fff;
                        font-size: 20px; 
                  }
                  .hide-menu-mobile{
                        position: absolute;
                        width: 100%;
                        top: 40px;
                        left: 0;
                        li{
                              background-color: rgba(0, 0, 0, 0.6);
                              border-bottom: 1px solid rgba(255, 255, 255, 0.6);
                              a{
                                    width: 100%;
                                    display: flex;
                                    text-align: center;
                                    justify-content: center;
                                    align-items: center;
                                    color: #fff;
                                    font-size: 14px;
                                    padding: 2px 0;
                                    span{
                                          font-size: 14px;
                                          margin-left: 2px;
                                    }
                              }
                        }
                  }
            }
      }
}
</style>
