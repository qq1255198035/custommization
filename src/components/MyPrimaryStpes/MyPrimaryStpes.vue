<template>
      <div id="Stpesprimary" :class="{column: vertical == 'mycolumn'}">
            <div class="section" :class="{'section-active': mycurrent - 0 >= 0}">
                  <doct2 v-if="mycurrent - 0 > 0"></doct2>
                  <doct1 v-else-if="mycurrent - 0 === 0"></doct1>
                  <slot name="p1"></slot>
            </div>
            <div class="line" :class="{'line-active': mycurrent - 1 >= 0}"></div>
            <div class="section" :class="{'section-active': mycurrent - 1 >= 0}">
                  <doct2 v-if="mycurrent - 1 > 0"></doct2>
                  <doct1 v-else-if="mycurrent - 1 === 0"></doct1>
                  <span class="doct3" v-else-if="mycurrent - 1 < 0"></span>
                  <slot name="p2"></slot>
            </div>
            <div class="line" :class="{'line-active': mycurrent - 2 >= 0}"></div>
            <div class="section" :class="{'section-active': mycurrent - 2 >= 0}">
                  <doct2 v-if="mycurrent - 2 > 0"></doct2>
                  <doct1 v-else-if="mycurrent - 2 === 0"></doct1>
                  <span class="doct3" v-else-if="mycurrent - 2 < 0"></span>
                  <slot name="p3"></slot>
            </div>
            <div class="line" :class="{'line-active': mycurrent - 3 >= 0}" v-if="stpesnum == 4"></div>
            <div class="section" :class="{'section-active': mycurrent - 3 >= 0}" v-if="stpesnum == 4">
                  <doct2 v-if="mycurrent - 3 > 0"></doct2>
                  <doct1 v-else-if="mycurrent - 3 === 0"></doct1>
                  <span class="doct3" v-else-if="mycurrent - 3 < 0" style="margin-top: 0"></span>
                  <slot name="p4"></slot>
            </div>
      </div>
</template>
<script>
import doct1 from '@/components/MyPrimaryStpes/doct1'
import doct2 from '@/components/MyPrimaryStpes/doct2'
export default {
      components:{
           doct1,
           doct2
      },
      data(){
            return{
                  
            }
            
      },
      props:{
            //进行中的状态
            mycurrent:{
                  type: Number,
                  default: 0
            },
            //排列方式，竖直，水平
            vertical:{
                  type: String,
                  default: 'col'
            },
            //一共分为几步
            stpesnum:{
                  default: 4
            }
      },
      mounted(){
            console.log(this.mycurrent - 1 === 0)
      }
}
</script>
<style lang="less" scoped>
.column{
      flex-direction: column;
      
      .line{
            max-width: 1px !important;
            min-width: 1px !important;
            height: 100px !important;
      }
}
#Stpesprimary{
      display: flex;
      justify-content: space-around;
      align-items: center;
      p{
            text-align: center;
      }
      .section{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-width: 74px;
            p{
                  font-size: 14px;
                  margin-top: 20px;
                  margin-bottom: 0;
                  color: #999;
                  min-width: 109px;
            }
      }
      .section-active{
            p{
                  color: #33b8b3;
            }
            
      }
      .line{
            height: 1px;
            width: 39%;
            background-color: #ddd;
            margin-bottom: 45px;
            min-width: 20px;
      }
      .doct3{
            width: 18px;
            height: 18px;
            background-color: #ddd;
            border-radius: 9px;
            display: block;
            margin-top: 10px;
      }
      .line-active{
            background-color: #33b8b3
      }
}
</style>
