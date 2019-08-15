<template>
      <div id="header">
            <div class="header">
                  <div  class="logo">
                        <img src="@/assets/logo.png" alt="LOGO">
                  </div>
                  
                  <right-header></right-header>
            </div>
      </div>
</template>
<script>
import rightHeader from '@/components/SysHeader/RightHeader'
export default {
      components:{
            rightHeader
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
      /*width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;*/
      .header{
            width: 100%;
            display: flex;
            justify-content: space-between;      
            align-items: center;
            
            //padding: 0 80px;
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
                        width: 110px;
                        height: 40px;
                        img{
                              width: 100%;
                        }
                  }
            }
            
      }
}     
</style>
