<template>
      <div id="swiper">
            <div class="swiper-container">
                  <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in imgUrl" :key="index">
                              <a href="http://baidu.com">
                                    <img :src="item" alt="banner">
                              </a>
                              
                        </div>

                  </div>
                  <!-- <div class="swiper-pagination"></div> -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
            </div>
      </div>
</template>
<script>
import Swiper from "swiper"
import imgurl from './../assets/bg-white.png'
import imgurl1 from './../assets/bg-white.png'
import imgurl2 from './../assets/bg-white.png'
import imgurl3 from './../assets/bg-white.png'
import imgurl4 from './../assets/bg-white.png'
import imgurl5 from './../assets/bg-white.png'
import 'swiper/dist/css/swiper.css'
//import { fabric } from 'fabric'
export default {
      data(){
            return{
                  imgUrl: {
                        imgurl,
                        imgurl1,
                        imgurl2,
                        imgurl3,
                        imgurl4,
                        imgurl5

                  }
            }
      },
      methods:{
            initSwiper(){
                  new Swiper ('.swiper-container', {
                         effect : 'coverflow',
                         loop: true,
                        slidesPerView: 3,
                        centeredSlides: true,
                        coverflowEffect: {
                        rotate: 0,
                        stretch: 10,
                        depth: 500,
                        modifier: 1,
                        slideShadows : false
                        },
                        autoplay: {
                              delay: 3000,//自动播放速度
                              disableOnInteraction: true//鼠标移上去时是否还继续播放
                        },
                        navigation: {
                              nextEl: '.swiper-button-next',
                              prevEl: '.swiper-button-prev',
                        },
                  })        
            },
           
      },
      created(){
            
      },
      mounted(){
            this.initSwiper();
      }
}
</script>

<style lang="less">

#swiper{
      background: url('./../assets/swiper-bg.png') center;
      padding: 50px;
}
.swiper-wrapper{
      position: relative;
      width: 100%;
      
      
}
.swiper-pagination{
      span.swiper-pagination-bullet{
            background-color: #fff;
      }
      span.swiper-pagination-bullet-active{
            background-color: #3254a4;
      }
}
.swiper-slide{
      a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                  display: block;
                  
            }
      }
     
}
@media screen and (max-width: 700px){
      .swiper-button-prev,.swiper-button-next{
            display: none;
      }
      .swiper-wrapper{
            position: relative;
            button{
                  width: 170px;
                  font-size: 8px;
                  padding: 5px;
                  padding-left: 20px;
                  margin-left: -85px;
            }
            .toronto{
                  bottom: -8px;
            }
            .hongkong{
                  bottom: 20px;
            }
      }
}
</style>
