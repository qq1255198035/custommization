<template>
  <div class="share">
    <div class="share-box">
      <sys-header></sys-header>
      <div class="step">Progress</div>
      <my-stpes :mycurrent="1">
        <p slot="p1">Select Size</p>
        <p slot="p2">Please Confirm Payment</p>
        <p slot="p3">Waiting To Start Group Order</p>
        <p slot="p4">Completed</p>
      </my-stpes>
      <div class="content">
        <div class="title">
          <span>
            <a-icon type="frown" />
          </span>
          <div>
            <h3>Payment Unsuccessful</h3>
            <p>Pay Again</p>
          </div>
        </div>
        <div class="desc">
          <div class="border"></div>
          <div class="bg">
            <div class="pay-detail">
              <p>Order Number：xxxx xxxx xxxx xxx</p>
            </div>
            <div class="pay-btn">
              <a-button class="buy-again">Pay Again</a-button>
              <a-button class="back">Back</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyStpes from "@/components/MyStpes/MyStpes";
import SysHeader from "@/components/SysHeader/SysHeader";
export default {
  props: {},
  data() {
    return {
      value: 1
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    SysHeader,
    MyStpes
  }
};
</script>

<style scoped lang="less">
.share {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
  .share-box {
    padding: 0px 40px;
    .step {
      padding: 16px 0;
    }
    .content {
      margin-top: 40px;
      .title {
        display: flex;
        justify-content: center;
        h3 {
          color: #ffffff;
          font-size: 22px;
        }
        span {
          font-size: 40px;
          padding-right: 16px;
        }
      }
      .desc {
        margin-top: 16px;
        width: 70%;
        margin: 10px auto;
        .border {
          width: 100%;
          height: 14px;
          border-radius: 10px;
          border: solid 1px #808080;
          background: #808080;
        }
        .bg {
          width: 96%;
          margin: 0 auto;
          background: #ffffff;

          h1 {
            line-height: 70px;
            border-bottom: dashed 1px #808080;
            text-align: center;
          }
          .pay-detail {
            padding: 10px 16px;
            line-height: 34px;
            color: #333;
            text-align: center;
          }
          .pay-btn {
            width: 50%;
            margin: 0 auto;
            padding: 30px 0;
            text-align: center;
            .buy-again {
              border: solid 1px #4ac37a;
              color: #4ac37a;
              width: 88px;
              height: 32px;
              margin: 0 10px;
            }
            .back {
              border: solid 1px #11bbe8;
              color: #11bbe8;
              width: 88px;
              height: 32px;
              margin: 0 10px;
            }
          }
        }
      }
    }
  }
}
</style>
