<template>
      <div id="OrderItem">
            <div class="order-title">
                  <p>
                        <span>订单Id:XXXXXXXXXX</span>
                        <span>订单时间: 2019-07-02 15: 00: 33</span>
                        <span>订单关闭时间： 2019-07-02</span>
                  </p>
                  <slot></slot>
            </div>
            <div class="order-content">
                  <div class="order-item">
                        <div class="left">
                              <img src="@/assets/jaw.jpg" alt="" width="100" height="120">
                              <div class="desc">
                                    <h3>篮球训练服</h3>
                                    <p>颜色： 蓝色</p>
                              </div>
                        </div>
                        <div class="right">
                              <span>26/56</span>
                              <span>状态： 团购中</span>
                              <a-button>样稿确认</a-button>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script>
export default {
      
}
</script>
<style lang="less">
#OrderItem{
      .order-title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 10px 0;
            p{
                  width: 90%;
                  display: flex;
                  justify-content: space-between;
            }
      }
      .order-content{
            .order-item{
                  padding: 20px 0;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                  display: flex;
                  justify-content: space-between;
                  .left{
                        display: flex;
                        width: 30%;
                        .desc{
                              display: flex;
                              flex-direction: column;
                              justify-content: space-between;
                              padding-left: 20px;
                              h3{
                                    color: #fff;
                                    padding: 10px;
                              }
                              p{
                                    padding: 10px;
                              }
                        }
                        
                  }
                  .right{
                        width: 70%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                  }
            }
      }
}
</style>
