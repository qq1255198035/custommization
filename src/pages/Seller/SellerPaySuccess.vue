<template>
  <div class="shares">
    <div class="share-boxs">
      <header>
        <router-link :to="{name: 'index'}">
          <p class="icon-logotxt"></p>
        </router-link>
        <p>
          <User></User>
        </p>
      </header>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <div class="step" style="color:#fff">Progress</div>
          <my-stpes :mycurrent="step">
            <p slot="p1">Select Size</p>
            <p slot="p2">Please Confirm Payment</p>
            <p slot="p3">Waiting To Start Group Order</p>
            <p slot="p4">Completed</p>
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
                <h3>Payment Successful</h3>
                <p>Thank you for your payment.</p>
              </div>
              <div v-if="code === 0">
                <h3>Payment Unsuccessful</h3>
                <p>Pay Again</p>
              </div>
            </div>
            <div class="desc">
              <div class="border"></div>
              <div class="bg">
                <h1 v-if="code === 1">${{price}}</h1>
                <div class="pay-detail" v-if="code === 1">
                  <p>Payment Account：{{payName}}</p>
                  <p>Order Number：{{orderId}}</p>
                  <share style="text-align:center" class="share" :config="config"></share>
                </div>
                <div class="pay-detail" v-if="code === 0">
                  <p>Order No{{orderId}}</p>
                </div>
                <!--<div class="pay-btn" v-if="code === 1">
                  <a-button class="buy-again" @click="alginBtn">Buy Again</a-button>
                  <a-button class="back">Back</a-button>
                </div>-->
                <div class="pay-btn" v-if="code === 0">
                  <a-button class="buy-again" @click="resetBtn">Pay Again</a-button>
                  <a-button class="back" @click="backBtn">Back</a-button>
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
import { status } from "@/api/system";
import { paypalSellerBack } from "@/api/seller";
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
      userId: "",
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "description", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "", // 图片, 默认取网页中第一个img标签
        sites: ["facebook", "wechat", "weibo"], // 启用的站点
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
        wechatQrcodeHelper: "Scan and share this article with friends."
      }
    };
  },
  computed: {},
  created() {
    this._paypalSellerBack();
    this._status();
    this.config.url = window.location.origin + "/#/share" + "?order_id=" + this.userOrderId;
  },
  mounted() {},
  watch: {},
  methods: {
    backBtn() {
      this.$router.push({
        path: "/index"
      });
    },
    _status() {
      const param = {
        user_order_id: this.$ls.get("userOrderId")
      };
      console.log(param);
      status(param).then(res => {
        this.step = parseInt(res.result.schedule);
      });
    },
    _paypalSellerBack() {
      const param = {
        paymentId: this.$route.query.paymentId,
        token: this.$route.query.token,
        PayerID: this.$route.query.PayerID,
        user_order_id: this.$ls.get("userOrderId"),
        order_id: this.$ls.get("orderId"),
        price: this.$ls.get("price")
      };
      console.log(param);
      paypalSellerBack(param).then(res => {
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
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
.shares {
  header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
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
        color: #fff;
      }
      p {
        color: #fff;
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
