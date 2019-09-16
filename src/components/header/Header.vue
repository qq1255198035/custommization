<template>
      <div id="header">
            <div class="header">
                  <div  class="logo">
                        <router-link to="/index">
                              <img src="@/assets/logo.png" alt="LOGO">
                        </router-link>
                  </div>
            </div>
      </div>
</template>
<script>

export default {
      components:{
           
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

#header{
      
      .header{
            
            display: flex;
            justify-content: center;      
            align-items: center;
            .logo{
                  padding: 10px;
                  text-align: center;
                  margin-bottom: 40px;
                  img{
                        width: 80%;
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
