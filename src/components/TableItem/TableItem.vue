<template>
  <div id="TableItem">
    <div class="check font-reset">
      {{data.name}}
      <slot></slot>
    </div>
    <div class="img-box">
      <a-row :gutter="24">
        <a-col :span="12">
          <img :src="data.back_pic_url" alt />
        </a-col>
        <a-col :span="12">
          <img :src="data.back_pic_url" alt />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {}
  },
  data() {
    return {};
  },
  components: {},
  created() {
    console.log(this.data);
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
      width: 290px;
      height: 290px;
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
      .ant-btn {
      }
    }
  }
}
.ant-btn .anticon {
  font-size: 30px !important;
}
</style>
