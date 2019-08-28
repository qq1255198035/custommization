<template>
      <div id="wheader">
            <div class="header">
                  <div  class="logo">
                        <img src="@/assets/logo.png" alt="LOGO">
                  </div>
                  <nav-bar></nav-bar>
            </div>
      </div>
</template>
<script>
import NavBar from '@/components/Header/NavBar'

export default {
      components:{
            NavBar,
            
      },
      props:{
            
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

#wheader{
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
            
            padding: 0 80px;
            .logo{
                  padding: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img{
                        width: 90%;
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
