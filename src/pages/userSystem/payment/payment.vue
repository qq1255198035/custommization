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
          <div class="step font-reset">流程进度</div>
          <MyPrimaryStpes :mycurrent="step">
            <p slot="p1">选择尺码</p>
            <p slot="p2">确认支付</p>
            <p slot="p3">等待开团</p>
            <p slot="p4">完成</p>
          </MyPrimaryStpes>
          <my-title :title="itemTitle" :fontsize="20" :paddingtop="'40px'" :paddingbottom="'20px'"></my-title>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>

      <a-row :gutter="20" style="padding-top:20px">
        <a-col :span="2"></a-col>
        <!--list1-->
        <a-col :xxl="8" :xl="20" v-if="dataList1.length>0">
          <table-item :data="listLeft"></table-item>
          <table-list :columns="columns" :data="dataList1"></table-list>
        </a-col>
        <!--list2-->
        <a-col :span="2" v-if="dataList1.length>0"></a-col>
        <a-col :xxl="10" :xl="20" v-if="dataList2.length>0">
          <table-item :data="listRight"></table-item>
          <table-list :columns="columns1" :data="dataList2"></table-list>
        </a-col>
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
            <div class="pay-title font-18">支付方式:</div>
            <div>
              <a-radio-group @change="onChange" v-model="value">
                <a-radio :value="1">
                  <img src="@assets/paypal_pay.png" alt />
                </a-radio>
                <a-radio :value="2">
                  <img style="width:50px" src="@assets/weixin_pay.png" alt />
                  <span class="pay-font">微信支付</span>
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
                    <h3 class="font-18">商品金额：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">手续费：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li style="border-bottom:solid 1px #eee;">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">运费：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li style="padding-top:20px">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-color">合计总额：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-color">${{allPrice.order_price}}</p>
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
              <div class="font-18" style="padding-bottom:20px">总价</div>
              <div class="font-reset">${{allPrice.order_price}}</div>
            </div>
            <div class="right">
              <commonBtn
                @payBtn="payBtn"
                :width="'100%'"
                :title="'立即支付'"
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
import {
  payPal,
  paymentInfos,
  status,
  wxPay,
  wxOrderQuery
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
      websocket: null,
      prepayId: "",
      show: false,
      step: 1,
      listLeft: {},
      listRight: {},
      value: 1,
      itemTitle: "订单信息",
      payTitle: "支付信息",
      allPrice: "",
      img1: {},
      img2: {},
      dataList1: [],
      dataList2: [],
      columns: [
        {
          title: "尺码",
          dataIndex: "size",
          width: "25%",
          align: "center",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "数量",
          className: "quantity",
          width: "25%",
          align: "center",
          dataIndex: "quantity"
        },
        {
          title: "单价",
          width: "25%",
          align: "center",
          dataIndex: "price"
        },
        {
          title: "总价",
          align: "center",
          dataIndex: "total_price"
        }
      ],
      columns1: [
        {
          title: "尺码",
          dataIndex: "size",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "名字",
          className: "printName",
          align: "center",
          width: "20%",
          dataIndex: "printName"
        },
        {
          title: "号码",
          width: "20%",
          align: "center",
          dataIndex: "printNumber"
        },
        {
          title: "单价",
          width: "20%",
          align: "center",
          dataIndex: "price"
        },
        {
          title: "合计价格",
          width: "20%",
          align: "center",
          dataIndex: "total_price"
        }
      ]
    };
  },
  computed: {},
  created() {
    this._paymentInfos();
    this._status();
    
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
      console.log(e.data)
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
    _status() {
      const param = {
        user_order_id: this.$route.query.user_order_id
      };
      console.log(param);
      status(param).then(res => {
        console.log(res);
        this.step = parseInt(res.result.schedule);
      });
    },
    _paymentInfos() {
      const param = {
        user_order_id: this.$route.query.user_order_id
      };
      paymentInfos(param).then(response => {
        console.log(response);
        this.dataList1 = response.confirmNoPrintPayList;
        this.dataList2 = response.confirmPrintPayList;
        this.listLeft = response.confirmNoPrintPayList[0];
        this.listRight = response.confirmPrintPayList[0];
        this.allPrice = response.userOrderId[0] ? response.userOrderId[0] : 0;
        this.userId = response.userOrderId[0].order_id;
      });
    },
    resultPsot(data) {
      const that = this;
      console.log(data);
      wxOrderQuery(data).then(res => {
        console.log(res)
        console.log(res.wxPayStatus)
        console.log(!res.wxPayStatus == 0);
        if (res.wxPayStatus == 0) {
          console.log(5555)
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
    payBtn() {
      console.log(this.value);
      const param = {
        order_id: this.userId,
        user_order_id: this.$route.query.user_order_id,
        price: this.allPrice.order_price,
        type: this.$ls.get('types')
      };
      if (this.value == 1) {
        console.log(param);
        payPal(param).then(res => {
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
        //this.initWebSocket();
        wxPay(param).then(res => {
          console.log(res);
          this.prepayId = res.respData.prepay_id;

          const url = res.respData.code_url;
          this.show = true;
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, url, function(error) {
            if (error) {
              console.error(error);
            }
          });
          const datas = {
            prepay_id: res.respData.prepay_id,
            user_order_id: res.payInfoList[0].user_order_id
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
