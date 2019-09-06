<template>
      <div id="input-box">
            <input type="text" >
            <span>
                  <img src="./../../assets/btn_search.png" alt="">
            </span>
      </div>
</template>
<script>
export default {
      data(){
            return{
                  
            }
      }
}
</script>
<style lang="less" scoped>

#input-box{
      display: flex;
      justify-content: space-between;
      border-radius: 12px;
      padding: 5px 10px;
      width: 250px !important;
      border: 1px solid #fff !important;
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
