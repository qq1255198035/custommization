<template>
      <div id="Home">
            <full-page :options="options">
                  <div class="section">
                        <div class="box1 box">
                              <Swiper/>
                        </div>
                  </div>
                  <div class="section">
                        <div class="box2 box">
                              <div class="right">
                                    <div class="desc">
                                          <h2>
                                          <img src="@/assets/home-page2-title.png" alt="">
                                          </h2>
                                          <p>長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單</p>
                                          <p>sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                                    </div>
                              </div>
                              
                              
                        </div>
                  </div>
                  <div class="section">
                        <div class="box3 box">
                              <div class="bg">
                                    <a href=""></a>
                              </div>
                        </div>
                  </div>
            </full-page>

      </div>
</template>
<script>
import Swiper from '@/components/Swiper/Swiper'
export default {
      components:{
            Swiper
      },
      data () {
            return {
                  options: {
                  
                        afterLoad: this.afterLoad,
                        verticalCentered: true,
                        scrollOverflow: false,
                        scrollBar: false,
                        menu: '#menu',
                  // navigation: true,
                  // anchors: ['page1', 'page2', 'page3'],
                  
                  }
            }
      }
}
</script>
<style lang="less">
#Home{
      background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
      height: 100%;
      .section{
            .box{
                  height: 100%;
                  padding-top: 150px;
            }
            .box2{
                  background-image: url("./../assets/home-page2-bg.png");
                  background-position: left 150px;
                  background-repeat: no-repeat;
                  display:flex;
                  justify-content: flex-end;
                  align-items: center;
                  .right{
                        height: 100%;
                        width: 50%;
                        padding-top: 5%;
                        background-image: url("./../assets/home-page2-bgright.png");
                        
                        background-position: right 0;
                        background-repeat: no-repeat;
                        .desc{
                              width: 100%;
                              height: 50%;
                              padding: 0 50px;
                              
                              p{
                                    word-wrap: break-word;
                                    margin: 20px 0;
                              }
                        }
                  }
                  
                 
            }
            .box3{
                  background-image: url("./../assets/home-page2-bgright.png");
                  background-position: right 150px;
                  background-repeat: no-repeat;
                  display: flex;
                        justify-content: center;
                        align-items: center;
                  .bg{
                        width: 90%;
                        height: 100%;
                        background-image: url("./../assets/home-page3-center.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: 100%;
                        a{
                              width: 250px;
                              height: 250px;
                              transform: rotate(45deg);
                              margin-top:25px; 
                        }
                  }
                  
            }
      }
      
}
</style>
