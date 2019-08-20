<template>
      <div id="OrderItem">
            <div  v-for="items in orderArr" :key="items.id">
                  <div class="order-title">
                        <p>
                              <span>订单Id:{{items.orderSn}}</span>
                              <span>订单时间: {{items.createTime}}</span>
                              <span>订单关闭时间： {{items.payEndDate}}</span>
                        </p>
                        <slot></slot>
                  </div>
                  <div class="order-content">
                        <div class="order-item" v-for="(item,index) in items.interiorList" :key="index + items.id">
                              <div class="left">
                                    <img src="@/assets/jaw.jpg" alt="" width="100" height="120">
                                    <div class="desc">
                                          <h3>{{item.name}}</h3>
                                          <p>颜色： {{item.productColor}}</p>
                                    </div>
                              </div>
                              <div class="right">
                                    <span>{{item.buyNum}}/{{item.quantity}}</span>
                                    <span>状态： {{item.status}}</span>
                                    <a-button>样稿确认</a-button>
                              </div>
                        </div>
                  </div>
            </div>
            
      </div>
</template>
<script>

export default {
      props:{
            orderArr:{
                  type: Array
            }
      }
}
</script>
<style lang="less">
#OrderItem{
      .order-title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 10px 0;
            margin-top: 20px;
            p{
                  width: 90%;
                  display: flex;
                  justify-content: space-between;
                  span{
                        width: 33%;
                        
                  }
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
