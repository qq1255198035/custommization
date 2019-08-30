<template>
      <div id="mytitle">
            <h2 :style="{fontSize: fontsize + 'px'}">{{title}}</h2>
            <slot></slot>
      </div>
</template>
<script>
export default {
      props:{
            title:{
                  type: String,

            },
            fontsize:{
                  type: Number,
                  default: 18
            }
      }
}
</script>
<style lang="less" scoped>
#mytitle{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #5ba997;
      margin: 20px 0;
      h2{
            
            padding: 10px 0;
            margin:0;
            color: #5ba997;
      }
}
</style>
