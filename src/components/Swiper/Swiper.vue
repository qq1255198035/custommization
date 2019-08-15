<template>
      <div id="swiper">
            <div class="swiper-container">
                  <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in imgUrl" :key="index">
                                    <img :src="item" alt="banner" style="width: 100%;">
                                    <button>开始定制</button>
                        </div>
                        
                  </div>
                  <div class="swiper-pagination"></div>
                  <div class="swiper-button-prev swiper-button-white"></div>
                  <div class="swiper-button-next swiper-button-white"></div>
            </div>
      </div>
</template>
<script>
import Swiper from "swiper"
import imgurl from '@/assets/index-banner.jpg'
import imgurl1 from '@/assets/index-banner.jpg'
import imgurl2 from '@/assets/index-banner.jpg'

import 'swiper/dist/css/swiper.css'
//import { fabric } from 'fabric'
export default {
      data(){
            return{
                  imgUrl: {
                        imgurl,
                        imgurl1,
                        imgurl2,
                        

                  }
            }
      },
      methods:{
            initSwiper(){
                  new Swiper ('.swiper-container', {
                        loop: true,
                        slidesPerView: 1,
                        centeredSlides: true,
                        autoplay: {
                              delay: 3000,//自动播放速度
                              disableOnInteraction: false//鼠标移上去时是否还继续播放
                        },
                        navigation: {
                              nextEl: '.swiper-button-next',
                              prevEl: '.swiper-button-prev',
                        },
                        pagination:{
                              el:'.swiper-pagination',
                              clickable: true
                        }
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
      
      padding: 0 50px;
      height: 100%;
}
.swiper-container{
      height: 100%;
}
.swiper-wrapper{
      position: relative;
      width: 100%;
      height: 100%;
      button{
            width: 230px;
            position: absolute;
            left: 50%;
            margin-left: -115px;
            padding: 10px;
            color: #fff;
            border: none;
            cursor: pointer;
            outline: none;
            background-color: rgba(255, 255, 255, 0.5);
            bottom: 100px;
      }
      
}
.swiper-pagination{
      span.swiper-pagination-bullet{
            background-color: #fff;
      }
      span.swiper-pagination-bullet-active{
            background-color: #fff;
      }
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 50px !important;
      left: unset;
      right: 0 !important;
      display: inline;
      width: auto;
}

.swiper-slide{
      a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                  display: block;
                  width: 100%;
            }
      }
     
}

</style>
