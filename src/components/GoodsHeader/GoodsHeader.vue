<template>
  <div class="wrapper">
    <div class="wrapper-box">
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
            <div>
                <img src="@/assets/1.png" alt="">
            </div>
            <div>
                <h1 class="title">篮球队,篮球服设计</h1>
                <p class="desc">订单简单描述，信息内容自己看去，打字实在是没有粘贴方便，根据信息去了解商品，仔细确认自己的商品订单，避免退货</p>
                <h3 class="contant">联系商家：AXle Sandar</h3>
                <div>
                    <a-icon type="phone" />+12 13354658794
                    <a-icon type="mail" />HJKLGHsaddsff@163.com
                </div>
            </div>
        </a-col>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
            <div class="right-desc">
                        <p>已支付数量<br><span>14</span></p> <a-divider type="vertical" class="my-divider"/>
                        <p>订单关闭时间<br><span>2019-10-12</span></p>
                  </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.wrapper {
}
</style>
