<template>
      <div id="CardHeader">
            <div class="left">
                  <a-avatar shape="square" :size="200"/>
                  <dl class="order-desc">
                        <dt><h3>篮球队，球服设计</h3></dt>
                        <dd>订单描述信息订单描述信息订单描述信息订单描述信息订单描述信息订单描述信息</dd>
                        <dd>联系商家： Alex Sandra</dd>
                        <dd><a-icon type="phone" style="transform: rotateY(180deg)" /><span>+12345678911</span><a-icon type="mail" /><span>www.abc.com</span></dd>
                  </dl>
            </div>
            <div class="right">
                  <p>分享： <span><a-icon type="facebook" /></span><span><a-icon type="wechat" /></span><span><a-icon type="weibo-circle" /></span></p>
                  <div class="right-desc">
                        <p>已支付数量<br><span>14</span></p> <a-divider type="vertical" class="my-divider"/>
                        <p>订单关闭时间<br><span>2019-10-12</span></p>
                  </div>
            </div>
            
      </div>      
</template>
<script>
export default {
      
}
</script>
<style lang="less" scoped>
#CardHeader{
      display: flex;
      justify-content: space-between;
      .left{
            width: 50%;
            display: flex;
            .order-desc{
                  margin-left: 20px;
                  span{
                        margin: 0 15px;
                  }
                  i{
                        font-size: 18px;
                  }
                  h3{
                        font-size: 20px;
                        color: #fff;
                  }
            }
      }
      .right{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            > p{
                  span{
                        margin: 0 10px;
                        i{
                              font-size: 25px;
                        }
                  }
            }
            .right-desc{
                  display: flex;
                  align-items: center;
                  .my-divider{
                        margin: 0 100px;
                        height: 80%;
                  }
                  p{
                        text-align: center;
                        span{
                              font-size: 20px;
                              line-height: 60px;
                        }
                  }
            }
      }
}
</style>
