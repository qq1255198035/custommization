<template>
      <div id="About">
            <div class="content">
                  <div class="desc">
                        <h2>
                        <img src="@/assets/home-page2-title.png" alt="">
                        </h2>
                        <p>長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單長春到曾多次調查的菜單</p>
                        <p><a-icon type="environment" /> 吉林省长春市南关区卫星路与健民街交汇创新花园三号楼5单元209</p>
                        <p><a-icon type="phone" style="transform: rotateY(180deg)"/> +12 12345698654455</p>
                        <p><a-icon type="mail" /> www@qq.com</p>
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
            padding-top: 5%;
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

