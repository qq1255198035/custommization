<template>
      <div id="nav-bar">
            <ul class="nav-list-pc">
                  <li :class="{active: false}">
                        <router-link to="">Home</router-link>
                        <!-- <span class="active-border" v-if="this.$route.name == 'home'"></span> -->
                  </li>
                  <li :class="{active: false}">
                        <router-link to="/play">Commodity</router-link>
                        
                  </li>
                  <li :class="{active: false}">
                        <router-link to="/scores">About us</router-link>
                        
                  </li>
                  <li :class="{active: false}">
                        <router-link to="">Become a seller</router-link>
                        
                  </li>
            </ul>
            
            <div class="nav-list-mobile">
                  <span @click="hiddenMenuM = !hiddenMenuM"><a-icon type="menu-unfold" /></span>
                  <ul class="hide-menu-mobile" v-show="hiddenMenuM">
                        <li @click="hiddenMenuM = false">
                              <router-link to="/home">Home</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="/play">Commodity</router-link>
                        </li>
                        <li @click="hiddenMenuM = false">
                              <router-link to="/scores">About</router-link>
                        </li>
                        <li @click="sideNav = !sideNav">
                              <router-link to="">Become a seller</router-link>
                              
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
            //console.log(this.isActive)
            
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
                  padding: 0 30px;
                  display: flex;
                  
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                  &:hover::before{
                        background-color: rgba(89,87,87,0.5);
                        -webkit-transform: scaleY(1);
                        transform: scaleY(1);
                        
                  }      
                  &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        bottom: 0;
                        left: 0;
                        
                        z-index: 0;
                        -webkit-transform: scaleY(0);
                        transform: scaleY(0);
                        -webkit-transform-origin: 0 50%;
                        transform-origin: 0 50%;
                        -webkit-transition-property: transform;
                        transition-property: transform;
                        -webkit-transition-duration: 0.4s;
                        transition-duration: 0.4s;
                        transition-timing-function: ease-out;
                  }
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
                        font-size: 18px;
                        position: relative;
                        z-index: 1;
                        
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
.active{
      background-color: rgba(89,87,87,0.5);
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
