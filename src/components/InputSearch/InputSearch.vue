<template>
      <div id="input-box" :class="{'focus-btn': isFocus}">
            <input type="text">
            <span @click="isFocus = !isFocus">
                  <img src="./../../assets/btn_search.png" alt="">
            </span>
      </div>
</template>
<script>
export default {
      data(){
            return{
                  isFocus:false
            }
      }
}
</script>
<style lang="less" scoped>
.focus-btn{
      width: 250px !important;
      border: 1px solid #fff !important;
}
#input-box{
      border: none;
      width: 0%;
      display: flex;
      justify-content: space-between;
      border-radius: 20px;
      padding: 5px 10px;
      transition: 0.6s;
      min-width: 25px;
      input{
            border: none;
            outline: none;
            background-color: rgba(255, 255, 255, 0);
            padding:0;
            width: calc(100% - 35px)
      }
      span{
            cursor: pointer;
            img{
                  width: 25px;
                  height: 25px;
            }
      }
      
}
</style>
