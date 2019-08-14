<template>
      <div id="GoodsList">
            <div class="gutter-example">
                  <a-row :gutter="30">
                        <a-col class="gutter-row" :span="6" v-for="item in goodsArr" :key="item.id">
                              <div class="gutter-box">
                                    <img src="@/assets/jaw.jpg" alt="">
                                    <div class="desc">
                                          <h3>{{item.name}}</h3>
                                          <p><span>$ {{item.minprice}} - $ {{item.maxprice}}</span><span>Min QTY: {{item.num}}</span></p>
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
            .desc{
                  margin-top: 15px;
                  h3{
                        color: #fff;
                  }
                  p{
                        margin: 10px 0;
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
