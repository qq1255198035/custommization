<template>
      <div id="About">
            <div class="content">
                  <div class="desc">
                        <h2>
                              <img src="@/assets/logo-group.png">
                        </h2>
                        <p>Looking for help? Please call or email us!</p>
                        <p><a-icon type="environment" />5005 Steeles Ave E, Unit 105Scarborough, Ontario M1V 5K1 Canada</p>
                        <p><a-icon type="phone" style="transform: rotateY(180deg)"/>(647) 983-8195</p>
                        <p><a-icon type="mail" />info@thecustomking.ca</p>
                        <p>
                              <span><a href="" target="_blank"><a-icon type="facebook" /></a></span>
                              <span><a href="" target="_blank"><a-icon type="instagram" /></a></span>
                              <span><a href="" target="_blank"><a-icon type="wechat" /></a></span>
                              <span><a href="" target="_blank"><a-icon type="weibo-circle" /></a></span>
                              <span><a href="" target="_blank"><a-icon type="qq" /></a></span>
                        </p>
                        <p>
                              <img src="@/assets/map-img.png" alt="">
                        </p>
                  </div>
            </div>
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
#About{
      height: 100%;
      width: 100%;
      background-image: linear-gradient(to right,#4bb377 , #01b6e1 );
      .content{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background-image: url("./../../assets/about-bg.png");
            background-position: left 150px;
            background-repeat: no-repeat;
            .desc{
                  width: 50%;
                  height: 100%;
                  padding: 5% 50px;
                  background-image: url("./../../assets/home-page2-bgright.png");
                  background-position: right 0;
                  background-repeat: no-repeat;
                  >h2{
                        img{
                              width: 30%;
                        }
                  }
                  p{
                        word-wrap: break-word;
                        margin: 25px 0;
                        color: #fff;
                        span{
                              
                              width: 35px;
                              height: 35px;
                              display: inline-block;
                              text-align: center;
                              line-height: 38px;
                              border: 1px solid #fff;
                              border-radius: 50%;
                              margin-right: 20px;
                              transition: 0.1s;
                              &:hover{
                                    transform: scale(1.1)
                              }
                              i{
                                    font-size: 20px;
                              }
                        }
                        > i{
                              font-size: 20px;
                              margin-right: 20px;
                        }
                        > img{
                              width: 100%;
                              display: block;
                        }
                  }
            }
      }
}
</style>

