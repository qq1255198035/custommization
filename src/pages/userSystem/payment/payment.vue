<template>
  <div class="share-box">
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
            <my-title
              :title="itemTitle"
              :fontsize="20"
              :paddingtop="'40px'"
              :paddingbottom="'20px'"
            ></my-title>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>

        <a-row :gutter="40" type="flex" style="padding:20px 8%;"  justify="start">
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
            <my-title v-if="pay_mode == 2" :title="payTitle" :fontsize="20" :paddingtop="'40px'" :paddingbottom="'20px'"></my-title>
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
                      <p class="textRight font-color">${{pricess.all_price}}</p>
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
                <div class="font-reset">${{pricess.all_price}}</div>
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
</template>

<script>
import {
  payPal,
  wxPay,
  wxOrderQuery,
  apiPay,
  toPaypal,
  payPalOrder,
  paymentSessionInfos
} from "@/api/system";
import MyPrimaryStpes from "@/components/MyPrimaryStpes/MyPrimaryStpes";
import MyTitle from "@/components/MyTitle/MyTitle";
import TableItem from "@/components/TableItem/TableItem";
import TableList from "@/components/TableList/TableList";
import commonBtn from "@/components/commonBtn/commonBtn";
import User from "@/components/Header/User";
import QRCode from "qrcode";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  props: {},
  data() {
    return {
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
      ]
    };
  },
  computed: {},
  created() {
    //this._paymentInfos();
    this._paymentSessionInfos();
  },
  mounted() {},
  watch: {},
  methods: {
    initWebSocket() {
      const wsuri = "ws://192.168.0.122:8080/jeecg-boot/api/wx/payBack";
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      const param = {
        order_id: this.userId,
        user_order_id: this.$route.query.user_order_id,
        price: this.allPrice.order_price
      };
      this.websocketsend(param);
      console.log(111);
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      let _this = this; //数据接收
      console.log(e.data);
      if (e.data == "连接成功") {
        //这个判断是我业务需求才加的
        return;
      }
      //业务需求，将socket接收到的值存进vuex
      _this.$store.store.dispatch("RESET_ID"); //先调用reset方法置空vuex > store里面的scorketId（为什么置空，下面标题3解释）
      _this.$store.store.dispatch("SAVE_ID", JSON.parse(e.data).areaId); //重新给store中的scorketId赋值（数据格式问题先转了json）
      // console.log(_this.$store.store.state.scorketId);
    },
    websocketsend(Data) {
      //数据发送
      this.websocket.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    isHide() {
      this.show = false;
    },
    //回调订单
    _paymentSessionInfos() {
      paymentSessionInfos().then(response => {
        console.log(response);
        this.pricess = response;
        this.allPrice = response.order_price ? response.order_price : 0;
        this.userId = response.order_id;
        this.personOrderList.data = response.personOrderList;
        this.pay_mode = response.pay_mode;
        
        this.tablesList = response.personOrderList;
      });
    },
    resultPsot(data) {
      const that = this;
      console.log(data);
      wxOrderQuery(data).then(res => {
        console.log(res);
        console.log(res.wxPayStatus);
        console.log(!res.wxPayStatus == 0);
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
    payBtnOrder() {
      const pata = {
        personOrderList: JSON.stringify(this.personOrderList),
        order_id: this.pricess.order_id,
        order_price: this.pricess.all_price,
        pay_mode: this.pay_mode
      };
      console.log(pata);
      payPalOrder(pata).then(res => {
        console.log(res);
        if (res.result.code == 1) {
          this.$notification.success({
            message: "Successful submission of orders"
          });
          this.$router.push({
            path: '/orderSuccess'
          })
        }
      });
    },
    payBtn() {
      const pata = {
        personOrderList: JSON.stringify(this.personOrderList),
        order_id: this.pricess.order_id,
        order_price: this.pricess.all_price
      };
      console.log(pata);
      payPalOrder(pata).then(res => {
        console.log(res);
        if (res.code == 1) {
          const param = {
            order_id: this.pricess.order_id,
            user_order_id: res.result.user_order_id,
            price: this.pricess.all_price,
            pay_mode: this.pay_mode
          };
          console.log(param);
          if (this.value == 1) {
            console.log(param);
            payPal(param).then(res => {
              console.log(res);
              
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
          if (this.value == 2) {
            //this.initWebSocket();
            wxPay(param).then(res => {
              console.log(res);

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
              console.log();
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
    MyPrimaryStpes
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
  //position: relative;
  width: 100%;
  //height: 100%;
  padding: 40px;
  //overflow: hidden;
  //padding-top: 139px;

  .wrapper-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    //padding: 20px;

    //overflow: hidden;
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
