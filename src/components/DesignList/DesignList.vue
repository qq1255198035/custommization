<template>
      <div id="design-list">
            <a-row :gutter="60" class="list-row" v-if="designList.length > 0">
                  <a-col :span="8" v-for="item in designList" :key="item.id">
                        <div class="order-item">
                              <div class="img-box">
                                    <img :src="item.positivePicUrl" v-preview="item.positivePicUrl" />
                              </div>
                              <div class="desc">
                                    <p>
                                          <span style="color: #33b8b3;font-size: 18px; min-height: 27px;">{{item.name}}</span>
                                          <span>{{item.createTime}}</span>
                                    </p>
                                    <p>
                                          <span>colour:{{item.productColor}}</span>
                                          <span>
                                                <a-icon type="edit" @click="goEdit(item.id)"/>
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </a-col>
            </a-row>
            <div v-else style="text-align:center; padding: 20px 0;">
                  No Data
            </div>
      </div>
</template>
<script>
import { updateShow } from "@/api/seller"
export default {
      props:{
            designList:{
                  type: Array
            }
      },
      methods:{
            goEdit(id){
                  updateShow(id).then(res => {
                        console.log(res)
                        if(res.code == 0){
                              this.$router.push({path:'/neworder', query:{res: res.result,show: true}})
                        }
                  })
            }
      }
}
</script>
<style lang="less">
#design-list{
    padding: 20px 0;
    padding-top: 30px; 
      .list-row{
            display: flex;
            flex-wrap: wrap;
            .order-item{
                  margin-top: 20px;
                  text-align: center;
                  img{
                        width: 90%;
                        
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
@media screen and (max-width: 1900px) and (min-width: 1024px){
      #design-list{
            .list-row{
                  .order-item{
                        .img-box{
                              height: 250px;
                        }
                  }
            }
      }
}
</style>

