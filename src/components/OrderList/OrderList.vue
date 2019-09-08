<template>
      <div id="OrderList">
            <a-row :gutter="60" class="list-row">
                  <a-col :span="8" v-for="item in orderList" :key="item.id">
                        <div class="order-item">
                              <img :src="item.topic_url" alt="">
                              <div class="desc">
                                    <p>
                                          <span style="color: #33b8b3;font-size: 18px;">{{item.topic}}</span>
                                          <span>{{item.pay_end_date}}</span>
                                    </p>
                                    <p>{{item.introduction}}</p>
                                    <p>
                                          <span>{{item.buyNum}}/{{item.reservation}}</span>
                                          <span>
                                                <a-icon type="edit" @click="$router.push({path:'/orderdetails',query:{id: item.id}})"/>
                                                <a-icon type="file-search" @click="$router.push({path:'/myorder',query:{id: item.id}})"/>
                                                <a-icon type="share-alt" @click="open(item.id)"/>
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
      },
      methods:{
            open(id){
                  this.$emit('openShareBox', id)
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
                  text-align: center;
                  img{
                        width: 66%;
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
                              text-align: left;
                        }
                        p:nth-child(3){
                              font-size: 20px;
                              span{
                                    color: #757575;
                                    i{
                                          margin: 0 10px;
                                          color: #757575;
                                          font-size: 24px;
                                          cursor: pointer;
                                    }
                                    
                              }
                        }
                  }
            }
      }
      
}
</style>

