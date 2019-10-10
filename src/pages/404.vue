<template>
  <div class="backs">
    <div class="content">
      <div class="title">404</div>
      <div class="photo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="">
      </div>
      <div>
        <commonBtn
          @backHome="backHome"
          :width="'100%'"
          :title="'Back Home'"
          :height="'56px'"
          :padding="'15px'"
          :radio="'18px'"
          :fontsize="'18px'"
        >
        </commonBtn>
      </div>
    </div>
  </div>
</template>

<script>
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  methods: {
    backHome() {
      this.$router.push({path: '/'})
    }
  },
  components: {
    commonBtn
  }
};
</script>

<style scoped lang="less">
.backs {
  text-align: center;
  .content{
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -20%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 1px 2px #eee;
    .title{
      padding: 20px;
      color: #33b8b3;
      font-size: 26px;
    }
    .photo{
      margin-bottom: 20px;
    }
    
  }
}
</style>
