<template>
      <div id="GoodsList">
            <div class="gutter-example">
                  <a-row :gutter="30">
                        <a-col class="gutter-row" :span="6" v-for="item in goodsArr" :key="item.id">
                              <div class="gutter-box" @click="handleClick(item.id)">
                                    <img :src="item.positive_pic_url" alt="">
                                    <div class="desc">
                                          <h3>{{item.name}}</h3>
                                          <p><span>$ {{item.min_price}} - $ {{item.max_price}}</span></p>
                                          <p>Min QTY: {{item.min_order}}</p>
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
      },
      methods:{
            handleClick(id){
                  this.$emit('on-click',id);
            }
      }
}
</script>
<style lang="less">
#GoodsList{
      .gutter-row{
            margin: 20px 0; 
            .gutter-box{
                  position: relative;
                  cursor: pointer;
                  &:hover{
                        .desc{
                              display: flex;
                        }
                  }
                  .desc{
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding-top: 15px;
                        width: 100%;
                        height: 100%;
                        display: none;
                        background-image: linear-gradient(45deg, rgba(17,187,232,0.5) 10%, #4ac37a 100%);
                        h3{
                              color: #fff;
                              text-align: center;
                              font-size: 18px;
                        }
                        p{
                              margin: 10px 0;
                              color: #fff;
                              text-align: center;
                              font-size: 16px;
                        }
                        p:nth-child(3){
                              margin-bottom: 0;
                              font-size: 14px;
                        }
                        p:nth-child(4){
                              margin-top: 0;
                              font-size: 14px;
                        }
                  }
                  img{
                        width: 100%;
                  }
            }
            
      }
}
</style>
