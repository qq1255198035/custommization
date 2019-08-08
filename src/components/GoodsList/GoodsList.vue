<template>
      <div id="GoodsList">
            <div class="gutter-example">
                  <a-row :gutter="30">
                        <a-col class="gutter-row" :span="6">
                              <div class="gutter-box">
                                    <img src="@/assets/jaw.jpg" alt="">
                                    <div class="desc">
                                          <h3>校篮球队训练服</h3>
                                          <p><span>$ 200 - $ 300</span><span>Min QTY: 10</span></p>
                                          <p>尺码： S M L XL 2XL</p>
                                    </div>
                              </div>
                        </a-col>
                        <a-col class="gutter-row" :span="6">
                              <div class="gutter-box">
                                    <img src="@/assets/jaw.jpg" alt="">
                                    <div class="desc">
                                          <h3>校篮球队训练服</h3>
                                          <p><span>$ 200 - $ 300</span><span>Min QTY: 10</span></p>
                                          <p>尺码： S M L XL 2XL</p>
                                    </div>
                              </div>
                        </a-col>
                        <a-col class="gutter-row" :span="6">
                              <div class="gutter-box">
                                    <img src="@/assets/jaw.jpg" alt="">
                                    <div class="desc">
                                          <h3>校篮球队训练服</h3>
                                          <p><span>$ 200 - $ 300</span><span>Min QTY: 10</span></p>
                                          <p>尺码： S M L XL 2XL</p>
                                    </div>
                              </div>
                        </a-col>
                        <a-col class="gutter-row" :span="6">
                              <div class="gutter-box">
                                    <img src="@/assets/jaw.jpg" alt="">
                                    <div class="desc">
                                          <h3>校篮球队训练服</h3>
                                          <p><span>$ 200 - $ 300</span><span>Min QTY: 10</span></p>
                                          <p>尺码： S M L XL 2XL</p>
                                    </div>
                              </div>
                        </a-col>
                  </a-row>
            </div>
      </div>
</template>
<script>
export default {
      
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
