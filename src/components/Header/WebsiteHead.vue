<template>
      <div id="wheader">
            <div class="homeMenu">
                  <a-row>
                        <a-col :span="8">
                        <h1><img src="@/assets/logoWhite.png"></h1>
                        </a-col>
                        <a-col :span="16">
                        <nav class="txtRight">
                              <router-link to="/home" class="anav a" :class="{'nav': $route.name == 'home'}">Home</router-link>
                              <router-link to="/products" class="anav a" :class="{'nav': $route.name == 'products'}">Products</router-link>
                              <router-link to="/about" class="anav a" :class="{'nav': $route.name == 'about'}">About Us</router-link>
                              <router-link to="/register" class="anav a">Become A Seller</router-link>
                        </nav>
                        </a-col>
                  </a-row>
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

#wheader{
      width: 100%;
      
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
