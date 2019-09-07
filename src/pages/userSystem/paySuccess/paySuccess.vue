<template>
  <div class="share">
    <div class="share-box">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <div class="step" style="color:#fff">流程进度</div>
          <my-stpes :mycurrent="step">
            <p slot="p1">选择尺码</p>
            <p slot="p2">确认支付</p>
            <p slot="p3">等待开团</p>
            <p slot="p4">完成</p>
          </my-stpes>
          <div class="content">
            <div class="title">
              <span v-if="code === 1">
                <a-icon type="smile" />
              </span>
              <span v-if="code === 0">
                <a-icon type="frown" />
              </span>
              <div v-if="code === 1">
                <h3>支付成功</h3>
                <p>感谢您的购买</p>
              </div>
              <div v-if="code === 0">
                <h3>支付失败</h3>
                <p>请重新支付</p>
              </div>
            </div>
            <div class="desc">
              <div class="border"></div>
              <div class="bg">
                <h1 v-if="code === 1">${{price}}</h1>
                <div class="pay-detail" v-if="code === 1">
                  <p>付款账户：{{payName}}</p>
                  <p>订单编号：{{orderId}}</p>
                </div>
                <div class="pay-detail" v-if="code === 0">
                  <p>订单编号：{{orderId}}</p>
                </div>
                <div class="pay-btn" v-if="code === 1">
                  <a-button class="buy-again" @click="alginBtn">再次购买</a-button>
                  <a-button class="back">返回</a-button>
                </div>
                <div class="pay-btn" v-if="code === 0">
                  <a-button class="buy-again" @click="resetBtn">重新支付</a-button>
                  <a-button class="back">返回</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { payBack, status } from "@/api/system";
import User from "@/components/Header/User";
import MyStpes from "@/components/MyStpes/MyStpes";
export default {
  props: {},
  data() {
    return {
      step: 1,
      value: 1,
      code: "",
      price: "",
      payName: "",
      orderId: "",
      orderAgain: "",
      userId: ""
    };
  },
  computed: {},
  created() {
    this._payBack();
    this._status();
  },
  mounted() {},
  watch: {},
  methods: {
    _status() {
      const param = {
        user_order_id: this.$ls.get("userOrderId")
      };
      console.log(param);
      status(param).then(res => {
        console.log(res);
        this.step = parseInt(res.result.schedule);
      });
    },
    _payBack() {
      const param = {
        paymentId: this.$route.query.paymentId,
        token: this.$route.query.token,
        PayerID: this.$route.query.PayerID,
        user_order_id: this.$ls.get("userOrderId"),
        order_id: this.$ls.get("orderId"),
        price: this.$ls.get("price")
      };
      console.log(param);
      payBack(param).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.code = 1;
          let result = res.payInfoList[0];
          this.price = result.order_price;
          this.payName = result.pay_name;
          this.orderId = result.order_sn;
          this.orderAgain = result.order_id;
          this.userOrderId = result.user_order_id;
        }
        if (res.code == 0) {
          this.code = 0;
          this.orderId = res.payInfoList[0].order_sn;
        }
      });
    },
    alginBtn() {
      this.$router.push({
        path: "/share",
        query: {
          order_id: this.orderAgain
        }
      });
    },
    resetBtn() {
      this.$router.push({
        path: "/payment",
        query: {
          user_order_id: this.userOrderId
        }
      });
    }
  },
  components: {
    MyStpes
  }
};
</script>

<style lang="less">
@import url("./../../../components/index.less");
@import url("./../../../assets/style.css");
.share {
  header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.4);
      padding: 30px;
      p:nth-child(1) {
        color: #fff;
        font-size: 60px;
        margin-bottom: 0;
      }
    }
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
        color: #fff
      }
      p{
        color: #fff
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
</style>
