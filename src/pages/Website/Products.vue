<template>
      <div id="commodity">
            <a-row type="flex" justify="center" align="top" class="main">
                  <a-col :span="13">
                        <a-row>
                              <a-col :span="9" >
                                    <img src="@/assets/1.png" alt="">
                              </a-col>
                              <a-col :span="15">
                                    <img src="@/assets/2.png" alt="" srcset="">
                              </a-col>
                        </a-row>
                              
                        <a-row>
                              <a-col :span="17">
                                    <img src="@/assets/3.png" alt="" srcset="">
                              </a-col>
                              <a-col :span="7">
                                    <img src="@/assets/4.png" alt="" srcset="">
                              </a-col>
                        </a-row>
                              
                        
                  </a-col>
                  <a-col :span="5">
                        
                        <img src="@/assets/5.png" alt="" srcset="">
                  </a-col>
                  <a-col :span="4">
                        <a-row>
                              <a-col :span="24">
                                    <img src="@/assets/6.png" alt="" srcset="">
                              </a-col>
                        </a-row>
                        <a-row>
                              <a-col :span="24">
                                    <img src="@/assets/7.png" alt="" srcset="">
                              </a-col>
                        </a-row>
                  </a-col>
            </a-row>
            <Footer></Footer>
      </div>
</template>
<script>

import Footer from '@/components/Footer/Footer'
export default {
      components:{
            Footer
      }
}
</script>
<style lang="less" scoped>
#commodity{
      width: 100%;
      height: 100%;
      padding: 30px 80px;
      background-image: linear-gradient(to right,#4bb377 , #01b6e1 );
      .main{
            img{
                  width: 100%;
                  height: 100%;
                  padding: 2px;
                  box-shadow: -14px 10px 20px 3px rgba(51,44,43,0.22);
            }
      }
      
}
</style>
