<template>
  <div id="PayMent">
    <div class="share-box" v-if="mobileShow">
      <div class="wrapper-box">
        <header>
          <router-link :to="{name:'index'}">
            <p class="icon-logotxt"></p>
          </router-link>
          <p>
            <User></User>
          </p>
        </header>
        <div style="padding-top: 20px;" class="artical-box">
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
          <a-row :gutter="40" type="flex" style="padding:20px 8%;" justify="start">
            <a-col
              :xxl="12"
              :xl="24"
              v-for="(item,index) in tablesList"
              :key="index"
              style="margin:20px 0"
            >
              <div v-if="!item.is_print_number && !item.is_print_text">
                <table-item :datas="item" ref="myTable"></table-item>
                <table-list :columns="columns" :data="[item]"></table-list>
              </div>
              <div v-if="item.is_print_number || item.is_print_text">
                <table-item :datas="item" ref="myTable"></table-item>
                <table-list :columns="columns1" :data="[item]"></table-list>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="20">
              <my-title
                v-if="pay_mode == 2"
                :title="payTitle"
                :fontsize="20"
                :paddingtop="'40px'"
                :paddingbottom="'20px'"
              ></my-title>
            </a-col>
            <a-col :span="2"></a-col>
          </a-row>
          <div class="payment">
            <a-row :gutter="20" v-if="pay_mode == 2">
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
                      <span class="pay-font">WeChat Pay</span>
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
                        <h3 class="font-18">Item Amount：</h3>
                      </a-col>
                      <a-col :span="12">
                        <p class="textRight font-color">${{pricess.order_price}}</p>
                      </a-col>
                    </a-row>
                  </li>
                  <li>
                    <a-row>
                      <a-col :span="12">
                        <h3 class="font-18">Service Fee：</h3>
                      </a-col>
                      <a-col :span="12">
                        <p class="textRight font-color">${{pricess.commission}}</p>
                      </a-col>
                    </a-row>
                  </li>
                  <li style="border-bottom:solid 1px #eee;">
                    <a-row>
                      <a-col :span="12">
                        <h3 class="font-18">Shipping Fee：</h3>
                      </a-col>
                      <a-col :span="12">
                        <p class="textRight font-color">${{pricess.shipping_fee}}</p>
                      </a-col>
                    </a-row>
                  </li>
                  <li style="padding-top:20px">
                    <a-row>
                      <a-col :span="12">
                        <h3 class="font-color">Total Amount：</h3>
                      </a-col>
                      <a-col :span="12">
                        <p class="textRight font-color">${{pricess.all_price | moneyFormat}}</p>
                      </a-col>
                    </a-row>
                  </li>
                </ul>
              </a-col>
              <a-col :span="2"></a-col>
            </a-row>
          </div>
          <a-row v-if="pay_mode == 2">
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
                <div class="left textRight" v-if="pay_mode == 2">
                  <div class="font-18" style="padding-bottom:20px">Total Amount</div>
                  <div class="font-reset">${{pricess.all_price | moneyFormat}}</div>
                </div>
                <div class="right" v-if="pay_mode == 2">
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
                <div class="right" v-if="pay_mode == 1">
                  <commonBtn
                    @payBtnOrder="payBtnOrder"
                    :width="'100%'"
                    :title="'Submit Order'"
                    :height="'56px'"
                    :padding="'10px'"
                    :radio="'12px'"
                    :fontsize="'18px'"
                    :top="'20px'"
                  ></commonBtn>
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
    </div>
    <div class="mobile-box-payment" v-else>
      <div class="mobile-title">
        <h1>
          <a-icon type="left" @click="$router.go(-1)"/>
          Order Details
        </h1>
      </div>
      <stpes-mobile :mycurrent="step" style="padding: 20px 10px;">
        <p slot="p1">Select Size</p>
        <p slot="p2">Please Confirm Payment</p>
        <p slot="p3">Waiting To Start Group Order</p>
        <p slot="p4">Completed</p>
      </stpes-mobile>
      <div class="main-box">
        <h2>Order Information</h2>
        <template v-for="(item,index) in tablesList">
          <template v-if="!item.is_print_number && !item.is_print_text">
            <div :key="index" class="card-box">
              <h2 style="border-bottom: 1px solid #ccc">Product Information</h2>
              <table-item :datas="item" ref="myTable" ></table-item>
              <dl class="card-item" :key="index">
                <dd :key="index">
                  Size: {{item.size}} * {{item.number}} 
                  <span>
                    ${{item.total_price}}
                  </span>
                </dd>
              </dl>
              <p style="text-align: right;">Iump Sum: <span style="font-size: 18px;color:#33b8b3;">${{item.total_price}}</span></p>
            </div>
          </template>
          <template v-if="item.is_print_number || item.is_print_text">
            <table-item :datas="item" ref="myTable" :key="index"></table-item>
            <div :key="index" class="card-box">
              <h2 style="border-bottom: 1px solid #ccc">Product Information</h2>
              <table-item :datas="item" ref="myTable" ></table-item>
              <dl class="card-item" :key="index">
                <dd :key="index">
                  Name: {{item.printName}} No: {{item.printNumber}} Size: {{item.size}}
                  <span>
                    ${{item.total_price}}
                  </span>
                </dd>
              </dl>
              <p style="text-align: right;">Iump Sum: <span style="font-size: 18px;color:#33b8b3;">${{item.total_price}}</span></p>
            </div>
          </template>
        </template>
        <div class="card-box">
          <h2 style="border-bottom: 1px solid #ccc">PayMent Information</h2>
          <dl>
            <dt>
              Payment Method
            </dt>
            <dd>
              <a-radio-group @change="onChange" v-model="value">
                  <a-radio :value="1">
                    <img src="@assets/paypal_pay.png" alt width="80"/>
                  </a-radio>
                  <a-radio :value="2">
                    <img style="width:25px" src="@assets/weixin_pay.png"/>
                    <span class="pay-font">WeChat Pay</span>
                  </a-radio>
              </a-radio-group>
            </dd>
          </dl>
          <!-- pay_mode == 2 -->
          <div v-if="pay_mode == 2">
            <ul class="pay-list">
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Item Amount：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{pricess.order_price}}</p>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Service Fee：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{pricess.commission}}</p>
                  </a-col>
                </a-row>
              </li>
              <li style="border-bottom:solid 1px #eee;">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">Shipping Fee：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{pricess.shipping_fee}}</p>
                  </a-col>
                </a-row>
              </li>
              <li style="padding-top:20px">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-color">Total Amount：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">$ {{pricess.all_price}}</p>
                  </a-col>
                </a-row>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="total-price" v-if="pay_mode == 2">
        <p>
          Total Amount: $ {{pricess.all_price | moneyFormat}}
        </p>
        <a-button type="primary" @click="payBtn">Pay Now</a-button>
      </div>
      <div class="total-price" v-if="pay_mode == 1">
        <p>
          Total Amount: $ {{pricess.all_price | moneyFormat}}
        </p>
        <a-button type="primary" @click="payBtnOrder">Submit Order</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  payPal,
  wxPay,
  wxOrderQuery,
  payPalOrder,
  paymentSessionInfos
} from "@/api/system";
import MyPrimaryStpes from "@/components/MyPrimaryStpes/MyPrimaryStpes";
import stpesMobile from "@/components/MyPrimaryStpes/stpesMobile";
import MyTitle from "@/components/MyTitle/MyTitle";
import TableItem from "@/components/TableItem/TableItem";
import TableList from "@/components/TableList/TableList";
import commonBtn from "@/components/commonBtn/commonBtn";
import User from "@/components/Header/User";
import QRCode from "qrcode";
export default {
  props: {},
  data() {
    return {
      myLise:[],
      tablesList: "",
      pay_mode: "",
      personOrderList: {},
      pricess: "",
      websocket: null,
      show: false,
      step: 1,
      value: 1,
      itemTitle: "Order Information",
      payTitle: "Payment Details",
      allPrice: "",
      img1: {},
      img2: {},
      columns: [
        {
          title: "SIZE",
          dataIndex: "size",
          width: "25%",
          align: "center",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "Quantity",
          className: "number",
          width: "25%",
          align: "center",
          dataIndex: "number"
        },
        {
          title: "Price",
          width: "25%",
          align: "center",
          dataIndex: "total_price"
        },
        {
          title: "Total Amount",
          align: "center",
          dataIndex: "price"
        }
      ],
      columns1: [
        {
          title: "SIZE",
          dataIndex: "size",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "Name",
          className: "printName",
          align: "center",
          width: "20%",
          dataIndex: "printName"
        },
        {
          title: "Number",
          width: "20%",
          align: "center",
          dataIndex: "printNumber"
        },
        {
          title: "Order Price",
          width: "20%",
          align: "center",
          dataIndex: "total_price"
        },
        {
          title: "Total Price",
          width: "20%",
          align: "center",
          dataIndex: "price"
        }
      ],
      mobileShow: true
    };
  },
  computed: {
    
  },
  mounted(){
    this._paymentSessionInfos();
    this.getWindowScreen();
  },
  filters:{
    moneyFormat(number, decimals) {
      number = (number + '').replace(/[^0-9+-Ee.]/g, '');
      var n = !isFinite( + number) ? 0 : +number,
          prec = !isFinite( + decimals) ? 2 : Math.abs(decimals),
          sep = ',',
          dec = '.',
          s = '',
          toFixedFix = function(n, prec) {
              var k = Math.pow(10, prec);
              return '' + Math.ceil(n * k) / k;
          };
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
          s[0] = s[0].replace(re, "$1" + sep + "$2");
      }
      if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    },
  },
  methods: {
    getWindowScreen(){
      let screenWidths = window.screen.width;
      if(screenWidths > 768){
        this.mobileShow = true;
      }else{
        this.mobileShow = false;
      }
    },
    isHide() {
      this.show = false;
    },
    //回调订单
    _paymentSessionInfos() {
      const param = {
        user_order_id: this.$route.query.user_order_id ? this.$route.query.user_order_id : ''
      }
      paymentSessionInfos(param).then(response => {
        this.pricess = response;
        this.allPrice = response.order_price ? response.order_price : 0;
        this.userId = response.order_id;
        this.personOrderList.data = response.personOrderList;
        this.pay_mode = response.pay_mode;
        this.tablesList = response.personOrderList;
      });
    },
    //微信轮询
    resultPsot(data) {
      const that = this;
      wxOrderQuery(data).then(res => {
        if (res.wxPayStatus == 0) {
          this.$router.push({
            path: "/wxSuccess",
            query: {
              user_order_id: res.user_order_id
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
    //提交订单
    payBtnOrder() {
      const pata = {
        personOrderList: JSON.stringify(this.personOrderList),
        user_order_id: this.$route.query.user_order_id ? this.$route.query.user_order_id : '',
        order_id: this.pricess.order_id,
        order_price: this.pricess.all_price,
        pay_mode: this.pay_mode,
        shipping_fee: this.pricess.shipping_fee,
        goods_price: this.pricess.order_price
      };
      payPalOrder(pata).then(res => {
        if (res.result.code == 1) {
          this.$notification.success({
            message: "Successful submission of orders"
          });
          this.$router.push({
            path: "/orderSuccess",
            query: {
              user_order_id: res.result.user_order_id
            }
          });
        }
      });
    },
    //立即支付
    payBtn() {
      const pata = {
        personOrderList: JSON.stringify(this.personOrderList),
        order_id: this.pricess.order_id,
        order_price: this.pricess.all_price,
        shipping_fee: this.pricess.shipping_fee,
        goods_price: this.pricess.order_price,
        user_order_id: this.$route.query.user_order_id ? this.$route.query.user_order_id : ''
      };
      payPalOrder(pata).then(res => {
        
        if (res.code == 1) {
          const param = {
            order_id: this.pricess.order_id,
            user_order_id: res.result.user_order_id,
            price: this.pricess.all_price,
            pay_mode: this.pay_mode
          };

          //paypal
          if (this.value == 1) {
            payPal(param).then(res => {
              let first = res.toPayHtml.indexOf("href") + 6;
              let last = res.toPayHtml.lastIndexOf('"');
              let url = res.toPayHtml.slice(first, last);
              let routeData = this.$router.resolve({
                path: "paylocal",
                query: { url: url }
              });
              window.location.replace(routeData.href, "_blank");
            });
          }
          //weixin
          if (this.value == 2) {
            //this.initWebSocket();
            wxPay(param).then(res => {
              const url = res.respData.code_url;
              this.show = true;
              var canvas = document.getElementById("canvas");
              QRCode.toCanvas(canvas, url, function(error) {
                if (error) {
                  console.error(error);
                }
              });
              const datas = {
                //prepay_id: res.respData.prepay_id,
                //user_order_id: res.payInfoList[0].user_order_id
                user_order_id: res.userOrderId
              };
              this.resultPsot(datas);
            });
          }
        }
      });
    },

    onChange(e) {
      console.log("radio checked", e.target.value);
    }
  },
  components: {
    MyTitle,
    TableItem,
    TableList,
    commonBtn,
    User,
    MyPrimaryStpes,
    stpesMobile
  }
};
</script>

<style lang="less">
@import url("./../../../components/index.less");
@import url("./../../../assets/style.css");
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
    background: url("./../../../assets/monry-icon-bar.png") no-repeat
      transparent;
    width: 100%;
    height: 100%;
    display: block;
    background-size: 100%;
  }
}
.bg-image {
  background: url("./../../../assets/monry-icon.png") no-repeat;
  width: 100%;
  height: 100%;
  display: block;
  background-size: 100%;
}
.share-box {
  width: 100%;
  padding: 40px;
  .wrapper-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    .artical-box{
      overflow-y: scroll;
      overflow-x: hidden;
      height: 734px;
      &::-webkit-scrollbar {  /*滚动条整体样式*/
          width: 6px;  /*宽分别对应竖滚动条的尺寸*/
          /*高分别对应横滚动条的尺寸*/
          background-color: #fff;
          
      }
      &::-webkit-scrollbar-thumb {
          background-color: #33b8b3;
          border-radius:4px;
          height: 10%;
      }
    }
    header {
      width: 100%;
      //position: fixed;
      //z-index: 9;
      display: flex;
      background: #fff;
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
@media screen and (max-width: 1366px){
  #PayMent{
    .share-box{
      .wrapper-box {
        .artical-box{
          height: 640px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) and (min-width: 325px){
  #PayMent{
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    .total-price{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 20px;
      border-top: 1px solid #ccc;
      background-color: #fff;
      p{
        margin-right: 10px;
      }
    }
    .mobile-box-payment{
      
      height: 100%;
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
      .main-box{
        background-color: #f2f2f2;
        padding: 0 10px 10px;
        min-height: calc(100% - 165px);
        padding-bottom: 75px;
        h2{
          font-size: 14px;
          padding: 10px;
          
        }
        .card-box{
          padding: 0 10px 10px;
          background-color: #fff;
          border-radius: 10px;
          margin: 10px 0;
          .card-item{
            margin-top: 10px;
            dd{
              padding: 5px;
              display:flex;
              width: 100%;
              justify-content: space-between;
              border-bottom: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
  
}
</style>
