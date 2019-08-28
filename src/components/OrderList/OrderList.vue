<template>
      <div id="OrderList">
            <a-row :gutter="60" class="list-row">
                  <a-col :span="8" v-for="item in orderList" :key="item.id">
                        <div class="order-item">
                              <img :src="item.topic_url" alt="">
                              <div class="desc">
                                    <p>
                                          <span style="color: #5ba997;font-size: 18px;">{{item.topic}}</span>
                                          <span>{{item.pay_end_date}}</span>
                                    </p>
                                    <p>{{item.introduction}}</p>
                                    <p>
                                          <span>{{item.buyNum}}/{{item.reservation}}</span>
                                          <span>
                                                <a-icon type="edit" />
                                                <a-icon type="file-search" />
                                                <a-icon type="share-alt" />
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </a-col>
            </a-row>
      </div>
</template>
<script>
export default {
      props:{
            orderList:{
                  type: Array
            }
      }
}
</script>


<style lang="less">
#OrderList{
      padding-top: 30px; 
      .list-row{
            display: flex;
            flex-wrap: wrap;
            .order-item{
                  margin-top: 20px;
                  img{
                        width: 100%;
                        height: 300px;
                  }
                  .desc{
                        margin-top: 15px;
                        p{
                              display: flex;
                              justify-content: space-between;
                              overflow: hidden;
                              text-overflow:ellipsis;
                              white-space: nowrap;
                              margin: 5px 0;
                              span{
                                    color:#8e8e8e;
                              }
                        }
                        p:nth-child(2){
                              padding-right: 20px;
                              display: block;
                              color: #a7a7a7;
                        }
                        p:nth-child(3){
                              font-size: 20px;
                              span{
                                    color: #757575;
                                    i{
                                          margin: 0 10px;
                                          color: #757575;
                                    }
                                    
                              }
                        }
                  }
            }
      }
      
}
</style>

