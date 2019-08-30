<template>
      <div id="GoodsList">
            <div class="gutter-example">
                  <a-row :gutter="30">
                        <a-col class="gutter-row" :span="6" v-for="item in goodsArr" :key="item.id">
                              <div class="gutter-box">
                                    <img :src="item.positive_pic_url" alt="">
                                    <div class="desc">
                                          <h3>{{item.name}}</h3>
                                          <p><span>$ {{item.min_price}} - $ {{item.max_price}}</span><span>Min QTY: {{item.min_order}}</span></p>
                                          <p>尺码： {{item.size}}</p>
                                    </div>
                              </div>
                        </a-col>
                  </a-row>
            </div>
      </div>
</template>
<script>
export default {
      props:{
            goodsArr:{
                  type: Array
            }
      }
}
</script>
<style lang="less">
#GoodsList{
      .gutter-row{
            margin: 20px 0; 
            .desc{
                  margin-top: 15px;
                  h3{
                        color: #33b8b3;
                  }
                  p{
                        margin: 10px 0;
                        color: #757575;
                  }
                  p:nth-child(2){
                        display: flex;
                        justify-content: space-between;
                  }
            }
            img{
                  width: 100%;
            }
      }
}
</style>
