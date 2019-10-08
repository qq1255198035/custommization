<template>
  <div class="shares">
    <div class="share-boxs" v-if="mobileShow">
      <header>
        <router-link :to="{name:'index'}">
          <p class="icon-logotxt"></p>
        </router-link>
        <p>
          <User :bellcolor="'#fff'" :usercolor="'#fff'"></User>
        </p>
      </header>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <div class="step" style="color:#fff">Progress</div>
          <my-stpes :mycurrent="step">
            <p slot="p1" class="text-centers">Select Size</p>
            <p slot="p2" class="text-centers">Please Confirm Payment</p>
            <p slot="p3" class="text-centers">Waiting To Start Group Order</p>
            <p slot="p4" class="text-centers">Completed</p>
          </my-stpes>
          <div class="content">
            <div class="title">
              <span>
                <a-icon type="smile" />
              </span>
              <div>
                <h3>Payment Successful</h3>
                <p>Thank you for your payment.</p>
              </div>
            </div>
            <div class="desc">
              <div class="border"></div>
              <div class="bg">
                <h1>${{price}}</h1>
                <div class="pay-detail">
                  <p>Order No: {{orderId}}</p>
                </div>
                <div class="pay-btn">
                  <a-button class="buy-again" @click="alginBtn">Buy Again</a-button>
                  <a-button class="back" @click="backBtn">Back</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
    </div>
    <div class="mobile-box-payment" v-else>
      <div class="mobile-title">
        <h1>
          <a-icon type="left" />
          Order Fetails
        </h1>
      </div>
      <stpes-mobile :mycurrent="step" style="padding: 20px 10px;">
        <p slot="p1">Select Size</p>
        <p slot="p2">Please Confirm Payment</p>
        <p slot="p3">Waiting To Start Group Order</p>
        <p slot="p4">Completed</p>
      </stpes-mobile>
      <div class="content">
        <div class="title">
          <span>
            <a-icon type="smile" theme="filled"/>
          </span>
          <div>
            <h3>Payment Successful !</h3>
            <p>Thank you for your payment.</p>
          </div>
        </div>
        <div class="white-bg">
          <div class="desc">
            <div class="border"></div>
            <div class="bg">
              <h1>${{price}}</h1>
              <div class="pay-detail">
                <p>Order No: {{orderId}}</p>
              </div>
              <div class="pay-btn">
                <a-button class="buy-again" @click="alginBtn">Buy Again</a-button>
                <a-button class="back" @click="backBtn">Back</a-button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
import { sumbitOrder } from "@/api/system";
import MyStpes from "@/components/MyStpes/MyStpes";
import User from "@/components/Header/User";
import stpesMobile from "@/components/MyPrimaryStpes/stpesMobile";
//import { paypalSellerBack } from "@/api/seller";
export default {
  data() {
    return {
      order_ids: "",
      pay_mode: "",
      step: 2,
      value: 1,
      price: "",
      orderId: "",
      orderAgain: "",
      mobileShow: false
    };
  },
  computed: {},
  created() {
    this._sumbitOrder();
    this.getWindowScreen();
    //this._status();

    //this.config.url = 'localhost:3000/#/sellerShare' + '?order_id='+this.userOrderId
  },
  mounted() {},
  watch: {},
  methods: {
    getWindowScreen(){
      let screenWidths = window.screen.width;
      console.log(screenWidths)
      if(screenWidths > 768){
        this.mobileShow = true;
      }else{
        this.mobileShow = false;
      }
    },
    backBtn() {
      this.$router.push({
        path: "/index"
      });
    },
    _sumbitOrder() {
      const param = {
        user_order_id: this.$route.query.user_order_id
      };

      sumbitOrder(param).then(res => {
          this.price = res.result.order_price;
          this.orderId = res.result.order_sn;
          this.userOrderId = res.result.order_id;
      });
    },
    alginBtn() {
      this.$router.push({
        path: "/share",
        query: {
          order_id: this.userOrderId
          //user_order_id: this.userOrderId
        }
      });
    }
  },
  components: {
    MyStpes,
    User,
    stpesMobile
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
@media screen and (max-width: 768px) and (min-width: 325px){
  .shares{
    height: 100%;
    .mobile-box-payment{
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      .mobile-title{
        border-bottom: 1px solid #fff;
        position: relative;
        h1{
          padding: 10px 20px;
          width: calc(57% + 40px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          color: #fff;
          text-align: center;
          margin: 0;
        }
      }
      .content{
        height: calc(100% - 265px);
        margin-top: 0;
        .title{
          align-items: center;
          h3{
            font-size: 14px;
            margin: 0;
          }
          p{
            font-size: 12px;
          }
        }
        .white-bg{
          width: 100%;
          height: 100%;
          background-color: #fff;
          position: relative;
          margin-top: 40px;
          .desc{
            width: 100%;
            padding: 0 20px;
            position: absolute;
            top: -40px;
            
            .bg{
              box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.4);
              h1{
                font-size: 16px;
                color: #33b8b3;
              }
              .pay-detail{
                p{
                  font-size: 14px;
                }
              }
              .pay-btn{
                width: 100%;
              }
            }
          }
        }
        
      }
    }
  }
  
}
</style>
