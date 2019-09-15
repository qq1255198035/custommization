<template>
  <div class="shares">
    <div class="share-boxs">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <!--<div class="step" style="color:#fff">Progress</div>
          <my-stpes :mycurrent="step">
            <p slot="p1" class="text-centers">Select Size</p>
            <p slot="p2" class="text-centers">Please Confirm Payment</p>
            <p slot="p3" class="text-centers">Waiting To Start Group Order</p>
            <p slot="p4" class="text-centers">Completed</p>
          </my-stpes>-->
          <div class="content">
            
            <div class="desc">
                
              <div class="bg">
                  <p><a-icon style="font-size:20px;padding-right:16px" type="smile" /><span>The order has been completed</span></p>
                  
                <p>We will reply you within 3 working days</p>
                        <p>We will provide a design mockup within 4 working days.</p>
                <a-button class="back" @click="backBtn">Back</a-button>
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

export default {
  props: {},
  data() {
    return {
      float: '',
      order_ids: '',
      type: "",
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
        title: "11", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "222", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
        sites: ["facebook", "wechat", "weibo"], // 启用的站点
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Pay", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>WeChat Scan: Share</p>"
      }
    };
  },
  computed: {},
  created() {
    this._payBack();
    //this._status();
    this.float = this.$route.query.flaot
    //this.config.url = 'localhost:3000/#/sellerShare' + '?order_id='+this.userOrderId
  },
  mounted() {},
  watch: {},
  methods: {
    backBtn() {
      this.$router.push({
        path: '/index'
      })
    },
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
      let param ={}
      const types = this.$ls.get('types')
      console.log(types)
      const data = {
        paymentId: this.$route.query.paymentId,
        token: this.$route.query.token,
        PayerID: this.$route.query.PayerID,
        order_id: this.$ls.get("orderId"),
        price: this.$ls.get("price"),
        type: this.$ls.get('types')
      };
      const data1 = {
        paymentId: this.$route.query.paymentId,
        token: this.$route.query.token,
        PayerID: this.$route.query.PayerID,
        user_order_id: this.$ls.get("userOrderId"),
        order_id: this.$ls.get("orderId"),
        price: this.$ls.get("price"),
        type: this.$ls.get('types')
      };
      
      if(types == 1) {
        param = data
      }else{
        param = data1
      }
      
      console.log(param);
      payBack(param).then(res => {
        console.log(res);
        this.type = res.type
        if (res.code == 1) {
          this.code = 1;
          let result = res.payInfoList[0];
          this.price = result.order_price;
          this.payName = result.pay_name;
          this.orderId = result.order_sn;
          this.orderAgain = result.order_id;
          this.userOrderId = result.user_order_id;
          this.config.url = 'http://192.168.0.9/index#/share' + '?order_id='+result.user_order_id
        }
        if (res.code == 0) {
          this.code = 0;
          this.orderId = res.payInfoList[0].order_sn;
          this.order_ids = res.payInfoList[0].user_order_id
        }
      });
    },
    alginBtn() {
      if (this.type == 0) {
        this.$router.push({
          path: "/share",
          query: {
            order_id: this.orderAgain,
            //user_order_id: this.userOrderId
            
          }
        });
      }
      if (this.type == 1) {
        this.$router.push({
          path: "/share",
          query: {
            order_id: this.userOrderId
          }
        });
      }
    },
    resetBtn() {
      if (this.type == 0) {
        this.$router.push({
          path: "/payment",
          query: {
            order_id: this.orderAgain,
            user_order_id: this.userOrderId
            
          }
        });
      }
      if(this.type == 1) {
        this.$router.push({
          path: "/unifiedpay",
          query: {
            orderId: this.order_ids
          }
        });
      }
    }
  },
  components: {
    
  }
};
</script>

<style lang="less">
@import url("./../../../components/index.less");
@import url("./../../../assets/style.css");
.text-centers {
  text-align: center;
}
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
      
      .bg {
        width: 50%;
        margin: 0 auto;
        padding: 40px;
        background: #ffffff;
        text-align: center;
        border-radius: 10px;
        p{
            padding-bottom: 16px;
        }

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
