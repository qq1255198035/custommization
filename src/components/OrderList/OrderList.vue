<template>
      <div id="OrderList">
            <a-row :gutter="60" class="list-row">
                  <a-col :span="8">
                        <div class="order-item">
                              <img src="@/assets/jaw.jpg" alt="">
                              <div class="desc">
                                    <p>
                                          <span>校篮球队训练服</span>
                                          <span>9月26日</span>
                                    </p>
                                    <p>描述信息描述信息描述信息描述信息描述信息233333333333</p>
                                    <p>
                                          <span>25/50</span>
                                          <span>
                                                <a-icon type="edit" />
                                                <a-icon type="search" />
                                                <a-icon type="branches" />
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </a-col>
                  <a-col :span="8">
                        <div class="order-item">
                              <img src="@/assets/jaw.jpg" alt="">
                              <div class="desc">
                                    <p>
                                          <span>校篮球队训练服</span>
                                          <span>9月26日</span>
                                    </p>
                                    <p>描述信息描述信息描述信息描述信息描述信息233333333333</p>
                                    <p>
                                          <span>25/50</span>
                                          <span>
                                                <a-icon type="edit" />
                                                <a-icon type="search" />
                                                <a-icon type="branches" />
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </a-col>
                  <a-col :span="8">
                        <div class="order-item">
                              <img src="@/assets/jaw.jpg" alt="">
                              <div class="desc">
                                    <p>
                                          <span>校篮球队训练服</span>
                                          <span>9月26日</span>
                                    </p>
                                    <p>描述信息描述信息描述信息描述信息描述信息233333333333</p>
                                    <p>
                                          <span>25/50</span>
                                          <span>
                                                <a-icon type="edit" />
                                                <a-icon type="search" />
                                                <a-icon type="branches" />
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
                        }
                        p:nth-child(2){
                              padding-right: 20px;
                              display: block;
                        }
                        p:nth-child(3){
                              font-size: 20px;
                              span{
                                    i{
                                          margin: 0 10px;
                                    }
                                    
                              }
                        }
                  }
            }
      }
      
}
</style>

