<template>
  <div id="TableItem">
      <div class="check font-reset">
      {{datas.name}}
      <slot></slot>
    </div>
    <div class="img-box">
      <a-row :gutter="24">
        <a-col :span="6">
          <img :src="datas.positive_pic_url" v-preview="datas.positive_pic_url"/>
        </a-col>
        <a-col :span="6">
          <img :src="datas.back_pic_url" v-preview="datas.back_pic_url"/>
        </a-col>
        <a-col :span="6">
          <img :src="datas.left_pic_url" v-preview="datas.left_pic_url"/>
        </a-col>
        <a-col :span="6">
          <img :src="datas.right_pic_url" v-preview="datas.right_pic_url"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datas: {
      
    }
  },
  data() {
    return {};
  },
  components: {},
  created() {
    
  }
};
</script>
<style lang="less" scoped>
#TableItem {
  .check {
    padding-bottom: 20px;
  }
  .img-box {
    img {
      width: 100%;
      // height: 130px;
    }
  }
  .paynum {
    overflow: hidden;
    padding: 20px 0;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
}
.ant-btn .anticon {
  font-size: 30px !important;
}
@media screen and (max-width: 768px) and (min-width: 325px){
  #TableItem{
    padding: 0 20px;
    .font-reset{
      font-size: 14px;
    }
  }
  
}
</style>
