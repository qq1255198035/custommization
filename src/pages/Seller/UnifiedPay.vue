<template>
  <div class="share-boxs">
    <div class="wrapper-box">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <div class="step font-reset">Progress</div>
          <MyPrimaryStpes :mycurrent="step">
            <p slot="p1">Select Size</p>
            <p slot="p2">Please Confirm Payment</p>
            <p slot="p3">Waiting To Start Group Order</p>
            <p slot="p4">Completed</p>
          </MyPrimaryStpes>
          <my-title :title="itemTitle" :fontsize="20" :paddingtop="'40px'" :paddingbottom="'20px'"></my-title>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>

      <a-row :gutter="20" style="padding-top:20px">
        <a-col :span="2"></a-col>
        <!--list1-->
        <a-col :xxl="20" :xl="20">
          <!--<table-item :data="listLeft"></table-item>-->
          <a-table :columns="columns" :dataSource="data">
            <img slot="positivePicUrl" style="width:120px" slot-scope="text" :src="text" alt />
          </a-table>
        </a-col>
        <!--list2-->
        <a-col :span="2"></a-col>
      </a-row>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <my-title :title="payTitle" :fontsize="20" :paddingtop="'40px'" :paddingbottom="'20px'"></my-title>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <div class="payment">
        <a-row :gutter="20">
          <a-col :span="2"></a-col>
          <a-col :span="8" style="display:flex">
            <div class="pay-title font-18">Payment method:</div>
            <div>
              <a-radio-group @change="onChange" v-model="value">
                <a-radio :value="1">
                  <img src="@assets/paypal_pay.png" alt />
                </a-radio>
                <a-radio :value="2">
                  <img style="width:50px" src="@assets/weixin_pay.png" alt />
                  <span class="pay-font">WeChat payment</span>
                </a-radio>
              </a-radio-group>
            </div>
          </a-col>
          <a-col :span="2"></a-col>
          <a-col :span="10">
            <ul class="pay-list">
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Commodity amount：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{goodsPrice}}</p>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Service Charge：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{procedureMoney}}</p>
                  </a-col>
                </a-row>
              </li>
              <li style="border-bottom:solid 1px #eee;">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Shipping Fee：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{freight}}</p>
                  </a-col>
                </a-row>
              </li>
              <li style="padding-top:20px">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-color">Total Amount：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{allPrice}}</p>
                  </a-col>
                </a-row>
              </li>
            </ul>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
      </div>
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <my-title></my-title>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <!--支付-->
      <a-row :gutter="20">
        <a-col :span="4" :offset="18">
          <div class="paynum">
            <div class="left textRight">
              <div class="font-18" style="padding-bottom:20px">Total Amount</div>
              <div class="font-reset">${{allPrice}}</div>
            </div>
            <div class="right">
              <commonBtn
                @payBtn="payBtn"
                :width="'100%'"
                :title="'Pay Now'"
                :height="'56px'"
                :padding="'10px'"
                :radio="'12px'"
                :fontsize="'18px'"
                :top="'20px'"
              >
                <span class="bg-box">
                  <span class="bg-image"></span>
                </span>
              </commonBtn>
            </div>
          </div>
        </a-col>
      </a-row>

      <!--展示码-->
      <div>
        <transition name="fade">
          <div class="qrcode-wrapper" @click="isHide" v-show="show">
            <div class="qrcode">
              <canvas id="canvas"></canvas>
              <div @click="isHide" class="close-vcode">x</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { orderFroms, teamPayBack, wxCheckPay ,paypalSeller} from "@/api/seller";
import MyPrimaryStpes from "@/components/MyPrimaryStpes/MyPrimaryStpes";
import MyTitle from "@/components/MyTitle/MyTitle";
import commonBtn from "@/components/commonBtn/commonBtn";
import User from "@/components/Header/User";
import QRCode from "qrcode";
import img from "@/assets/black.jpg";
export default {
  props: {},
  data() {
    return {
      type: '',
      websocket: null,
      prepayId: "",
      show: false,
      step: 1,
      allPrice: "",
      goodsPrice: "",
      procedureMoney: "",
      freight: "",
      value: 1,
      itemTitle: "Order Information",
      payTitle: "Payment Details",
      data: [
        {
          name: "短袖",
          imgUrl: img,
          quantity: 2,
          price: 150,
          money: 300
        },
        {
          name: "裤衩",
          imgUrl: img,
          quantity: 2,
          price: 150,
          money: 300
        }
      ],
      data1: [],
      columns: [
        {
          title: "Trade name",
          width: "20%",
          align: "center",
          dataIndex: "name"
        },
        {
          title: "Picture",
          width: "20%",
          align: "center",
          dataIndex: "positivePicUrl",
          scopedSlots: { customRender: "positivePicUrl" }
        },
        {
          title: "Quantity",
          className: "quantity",
          width: "20%",
          align: "center",
          dataIndex: "quantity"
        },
        {
          title: "Price",
          width: "20%",
          align: "center",
          dataIndex: "price"
        },
        {
          title: "合计",
          align: "center",
          width: "20%",
          dataIndex: "amount"
        }
      ]
    };
  },
  computed: {},
  created() {
    this._orderFroms();
  },
  mounted() {},
  watch: {},
  methods: {
    isHide() {
      this.show = false;
    },
    _orderFroms() {
      const param = {
        orderId: this.$route.query.orderId
      };
      orderFroms(param).then(res => {
        console.log(res);
        this.type = res.result.type;
        this.$ls.set('types', res.result.type)
        this.data = res.result.list;
        this.allPrice = res.result.allin;
        this.goodsPrice = res.result.amountAll;
        this.procedureMoney = res.result.procedureMoney;
        this.freight = res.result.freight;
      });
    },
    resultPsot(data) {
      const that = this;
      console.log(data);
      wxCheckPay(data).then(res => {
        console.log(res);
        if (res.wxPayStatus == 0) {
          this.$router.push({
            path: "/SellerPayWx",
            query: {
              orderId: this.$route.query.orderId
            }
          });
        } else {
          setTimeout(() => {
            that.resultPsot(data);
          }, 2000);
          return;
        }
      });
    },
    payBtn() {
      console.log(this.value);
      const param = {
        order_id: this.$route.query.orderId,
        price: this.allPrice,
        type: this.type
      };
      if (this.value == 1) {
        console.log(param);
        paypalSeller(param).then(res => {
          console.log(res);
          let first = res.toPayHtml.indexOf("href") + 6;
          let last = res.toPayHtml.lastIndexOf('"');
          let url = res.toPayHtml.slice(first, last);
          console.log(url);
          this.$ls.set("userOrderId", res.user_order_id);
          this.$ls.set("orderId", res.order_id);
          this.$ls.set("price", res.price);
          let routeData = this.$router.resolve({
            path: "paylocal",
            query: { url: url }
          });
          window.location.replace(routeData.href, "_blank");
        });
      }
      if (this.value == 2) {
        teamPayBack(param).then(res => {
          console.log(res)
          const url = res.respData.code_url;
          this.show = true;
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, url, function(error) {
            if (error) {
              console.error(error);
            }
          });
          const datas = {
            orderId: this.$route.query.orderId
          };
          console.log();
          this.resultPsot(datas);
        });
      }
    },

    onChange(e) {
      console.log("radio checked", e.target.value);
    }
  },
  components: {
    MyTitle,
    commonBtn,
    User,
    MyPrimaryStpes
  }
};
</script>

<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
.pay-font {
  font-size: 18px;
  padding-left: 8px;
}
.bg-box {
  width: 20px;
  height: 34px;
  display: block;
  position: absolute;
  top: 50%;
  left: 26px;
  margin-top: -17px;
  z-index: 9;
}
.right:hover {
  .bg-image {
    background: url("./../../assets/monry-icon-bar.png") no-repeat transparent;
    width: 100%;
    height: 100%;
    display: block;
    background-size: 100%;
  }
}
.bg-image {
  background: url("./../../assets/monry-icon.png") no-repeat;
  width: 100%;
  height: 100%;
  display: block;
  background-size: 100%;
}
.share-boxs {
  width: 100%;
  //height: 100%;
  padding: 40px;
  .wrapper-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    //overflow: hidden;
    header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #5ba997;
      padding: 30px;
      p:nth-child(1) {
        color: #5ba997;
        font-size: 60px;
        margin-bottom: 0;
      }
    }
    .step {
      padding: 40px 0 20px 0;
    }
    .payment {
      margin-top: 26px;
      overflow: hidden;
      .pay-title {
        padding-right: 10px;
      }
      .pay-list {
        li {
          overflow: hidden;
          padding-bottom: 10px;
        }
      }
      img {
        width: 140px;
        height: auto;
      }
    }
    .paynum {
      border-top: solid 1px #ffffff;
      overflow: hidden;
      padding: 20px 0;
      .left {
        text-align: right;
        h2 {
          color: #fff;
        }
      }
      .right {
        position: relative;
        .ant-btn {
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
.qrcode-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 99;
  height: 100%;
  background: rgba(7, 17, 27, 0.1);
}
.qrcode-wrapper .qrcode {
  position: absolute;
  background: #fff;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 180px;
  border-radius: 6px;
  margin-top: -90px;
  margin-left: -90px;
  text-align: center;
}
#canvas {
  width: 120px;
  height: 120px;
}
.close-vcode {
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: relative;
  bottom: -40px;
  left: 50%;
  margin-left: -15px;
}
.vcodeTitle {
  padding: 10px 0;
  color: #3d3d3d;
}

.textRight {
  text-align: right;
}
</style>
