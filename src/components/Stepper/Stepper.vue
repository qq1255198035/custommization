<template>
      <div id="stepper">
            <button class="left" @click="clickLeftbtn">-</button>
            <input type="number" min="1" max="Infinity" class="stepper-input" :value="num">
            <button class="right" @click="clickRightbtn">+</button>
      </div>
</template>
<script>
import propsync from './propsync'
export default {
      data(){
            return{
                  
            }
      },
      mixins: [propsync],
      props:{
            num: {
                  type:Number,
            }
      },
      
      methods:{
            clickLeftbtn(){
                  this.p_num > 1 ? this.p_num -- : this.p_num = 1 
            },
            clickRightbtn(){
                  this.p_num ++
            }
      }
     
}
</script>
<style lang="less" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
} 
#stepper{
      .stepper-input{
            box-sizing: border-box;
            width: 32px;
            height: 28px;
            
            padding: 0;
            color: #fff;
            font-size: 14px;
            text-align: center;
            vertical-align: middle;
            background-color: rgba(255,255,255,0.5);
            border: 0;
            border-width: 1px 0;
            border-radius: 0;
            -webkit-appearance: none;
            outline: none;
      }
      .left{
            position: relative;
            box-sizing: border-box;
            width: 28px;
            height: 28px;
            margin: 0;
            padding: 5px;
            color: #fff;
            vertical-align: middle;
            background-color: rgba(255,255,255,0.5);
            border: 0;
            border-radius: 4px 0 0 4px;
            border-right: 1px solid #fff;
            outline: none;
            cursor: pointer;
            line-height: 14px;
      }
      .right{
            position: relative;
            box-sizing: border-box;
            width: 28px;
            height: 28px;
            margin: 0;
            padding: 5px;
            color: #fff;
            vertical-align: middle;
            background-color: rgba(255,255,255,0.5);
            border: 0;
            border-radius: 0 4px 4px 0;
            border-left: 1px solid #fff;
            outline: none;
            cursor: pointer;
            line-height: 14px;
      }
}
</style>
