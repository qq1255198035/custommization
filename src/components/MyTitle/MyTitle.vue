<template>
      <div id="mytitle">
            <h2 :style="{fontSize: fontsize + 'px',paddingTop:paddingtop,paddingBottom:paddingbottom}">{{title}}</h2>
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
            },
            paddingtop:{
                  type:String
            },
            paddingbottom:{
                  type:String
            }
      }
}
</script>
<style lang="less" scoped>
#mytitle{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      h2{
            padding: 10px 0;
            margin:0;
            color: #33b8b3;
      }
}
</style>
