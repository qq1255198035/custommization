<template>
      <div id="header">
            <div class="header">
                  <div  class="logo">
                        <img src="@/assets/header-logo.png" alt="LOGO">
                  </div>
                  
                  <nav-bar></nav-bar>
            </div>
      </div>
</template>
<script>
import navBar from '@/components/header/navBar'
export default {
      components:{
            navBar
      },
      data(){
            return{
                  
            }
      },
      mounted(){
            
      },
      methods:{
            
      },
      
}
</script>
<style lang="less" scoped>

#header{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      .header{
            width: 100%;
            display: flex;
            justify-content: space-between;      
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 0 100px;
            .logo{
                  width: 122px;
                  height: 100px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img{
                        width: 100%;
                  }
            }
      }
}
@media screen and(max-width: 800px){
      #header{
            
            .header{
                  height: 40px;
                  padding: 0 15px;
                  .logo{
                        width: 62px;
                        height: 40px;
                        img{
                              width: 100%;
                        }
                  }
            }
            
      }
}     
</style>
