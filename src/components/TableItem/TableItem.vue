<template>
  <div id="TableItem">
    <h2>
      {{data.name}}
      <slot></slot>
    </h2>
    <ul class="img-show">
      <li>
        <img :src="data.back_pic_url" alt />
      </li>
      <li>
        <img :src="data.back_pic_url" alt />
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  props: {
    data:{}
  },
  data() {
    return {
      
    };
  },
  components: {
    
  },
  created() {
    console.log(this.data)
  }
};
</script>
<style lang="less" scoped>
#TableItem {
  h2 {
    color: #fff;
  }
  .img-show {
    display: flex;
    li{
      width: 240px;
      margin-right: 24px;
      img {
      width: 100%;
    }
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
