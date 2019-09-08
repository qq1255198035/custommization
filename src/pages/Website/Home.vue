<template>
      <div id="Home">
            <full-page :options="options" ref="fullpage">
                  <div class="section">
                        <div class="box1 box">
                              <Swiper/>
                        </div>
                        <div class="bottom">
                              <span @click="moveSectionDown">
                                    <a-icon type="down" />
                              </span>
                              
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
                        <div class="bottom">
                              <span @click="moveSectionDown">
                                    <a-icon type="down" />
                              </span> 
                        </div>
                  </div>
                  <div class="section">
                        <div class="box3 box">
                              <div class="bg">
                                    <a href=""></a>
                              </div>
                              <Footer></Footer>
                        </div>
                  </div>
            </full-page>
            
      </div>
</template>
<script>
import Swiper from '@/components/Swiper/Swiper';
import Footer from '@/components/Footer/Footer'
export default {
      components:{
            Swiper,
            Footer
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
      },
      methods:{
            moveSectionDown(){
                  this.$refs.fullpage.api.moveSectionDown();
            }
            
      }
}
</script>
<style lang="less">
@keyframes mymove{
      0% {transform: scale(1.0);}
      50% {transform: scale(1.2)}
      100% {transform: scale(1.0)}
}
#Home{
      background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
      height: 100%;
      .section{
            position: relative;
            .bottom{
                  position: absolute;
                  bottom: 20px;
                  width: 100%;
                  text-align: center;
                  z-index: 100;
                  animation:mymove 2s infinite;
                  cursor: pointer;
                  span{
                        background-color: rgba(255, 255, 255, 0.3);
                        border-radius: 12px;
                        width: 24px;
                        height: 24px;
                        display: inline-block;
                        padding-top: 3px;
                  }
            }
            .box{
                  height: 100%;
                  padding-top: 150px;
            }
            .box2{
                  background-image: url("./../../assets/home-page2-bg.png");
                  background-position: left 150px;
                  background-repeat: no-repeat;
                  display:flex;
                  justify-content: flex-end;
                  align-items: center;
                  .right{
                        height: 100%;
                        width: 50%;
                        padding-top: 5%;
                        background-image: url("./../../assets/home-page2-bgright.png");
                        
                        background-position: right 0;
                        background-repeat: no-repeat;
                        .desc{
                              width: 100%;
                              height: 50%;
                              padding: 0 50px;
                              
                              p{
                                    word-wrap: break-word;
                                    margin: 20px 0;
                                    color: #fff;
                              }
                        }
                  }
                  
                 
            }
            .box3{
                  background-image: url("./../../assets/home-page2-bgright.png");
                  background-position: right 150px;
                  background-repeat: no-repeat;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                  .bg{
                        width: 90%;
                        height: 100%;
                        background-image: url("./../../assets/home-page3-center.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        a{
                              width: 250px;
                              height: 250px;
                             
                              margin-top:25px; 
                              
                        }
                  }
                  
            }
      }
      
}
</style>
