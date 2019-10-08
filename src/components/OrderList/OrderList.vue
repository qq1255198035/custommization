<template>
      <div id="OrderList">
            <a-row :gutter="60" class="list-row">
                  <a-col :span="8" v-for="item in orderList" :key="item.id">
                        <div class="order-item">
                              <div style="height:330px"><img :src="item.topic_url" alt=""></div>
                              <div class="desc">
                                    <p>
                                          <span style="color: #33b8b3;font-size: 18px; min-height: 27px;">{{item.topic}}</span>
                                          <span>{{item.pay_end_date}}</span>
                                    </p>
                                    <p>{{item.introduction}}</p>
                                    <p>
                                          <span>{{item.buyNum}}/{{item.reservation}}</span>
                                          <span>
                                                <a-icon type="edit" @click="goEdit(item.id,item.order_status)"/>
                                                <a-icon type="file-search" @click="$router.push({path:'/myorder',query:{id: item.id}})"/>
                                                <a-icon type="share-alt" @click="open(item,item.order_status)" />
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
            open(item,status){
                  if(status == 3){
                        this.$emit('openShareBox', item)
                  }else if(status < 3){
                        this.$message.error('The order has not been confirmed yet.')
                  }else{
                        this.$message.error('The order has been put into production.')
                  }
                  
            },
            goEdit(id,status){
                  if(status == 1 || status == 2){
                        this.$router.push({path:'/orderdetails',query:{id: id}})
                  }else{
                        this.$message.error('Your order has been confirmed.')
                  }
                  
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
                        width: 80%;
                        height: 100%;
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
                              min-height: 21px;
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

