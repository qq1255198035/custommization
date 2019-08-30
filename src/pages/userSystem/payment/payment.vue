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
          <my-stpes :mycurrent="step">
            <p slot="p1">选择尺码</p>
            <p slot="p2">确认支付</p>
            <p slot="p3">等待开团</p>
            <p slot="p4">完成</p>
          </my-stpes>
          <my-title :title="itemTitle"></my-title>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>

      <a-row :gutter="20">
        <a-col :span="2"></a-col>
        <!--list1-->
        <a-col :span="8">
          <table-item :data="listLeft"></table-item>
          <table-list :columns="columns" :data="data"></table-list>
        </a-col>
        <!--list2-->
        <a-col :span="2"></a-col>
        <a-col :span="10">
          <table-item :data="listRight"></table-item>
          <table-list :columns="columns1" :data="data1"></table-list>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <my-title :title="payTitle"></my-title>
      <div class="payment">
        <a-row>
          <!--list1-->
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="pay-title">支付方式:</span>
            <a-radio-group @change="onChange" v-model="value">
              <a-radio :value="1">
                <img src="@assets/paypal.png" alt />
              </a-radio>
              <a-radio :value="2">
                <img src="@assets/weixin.png" alt />
              </a-radio>
            </a-radio-group>
          </a-col>
          <!--list2-->
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ul class="pay-list">
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">商品金额：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-reset">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li>
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">手续费：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-reset">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li style="border-bottom:solid 1px #eee;">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-18">运费：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-reset">$2000</p>
                  </a-col>
                </a-row>
              </li>
              <li style="padding-top:10px">
                <a-row>
                  <a-col :span="12">
                    <h3 class="font-reset">合计总额：</h3>
                  </a-col>
                  <a-col :span="12">
                    <p class="textRight font-reset">${{allPrice.order_price}}</p>
                  </a-col>
                </a-row>
              </li>
            </ul>
          </a-col>
        </a-row>
      </div>
      <!--支付-->
      <div class="paynum">
        <div class="left textRight">
          <a-row>
            <a-col :span="6" :offset="18">
              <p>总价</p>
              <h2>${{allPrice.order_price}}</h2>
            </a-col>
          </a-row>
        </div>
        <div class="right">
          <a-row>
            <a-col :span="6" :offset="18">
              <commonBtn
                :icon="'dollar'"
                @payBtn="payBtn"
                :width="'100%'"
                :title="'立即支付'"
                :height="'45px'"
                :padding="'10px'"
                :radio="'12px'"
                :fontsize="'22px'"
                :top="'20px'"
              ></commonBtn>
            </a-col>
          </a-row>
        </div>
      </div>
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
import { payPal, paymentInfo, status, wxPay } from "@/api/system";
import MyStpes from "@/components/MyStpes/MyStpes";
import SysHeader from "@/components/SysHeader/SysHeader";
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
      data: [],
      data1: [],
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
    this._paymentInfo();
    this._status();
  },
  mounted() {},
  watch: {},
  methods: {
    isHide() {
      this.show = false;
    },
    _status() {
      const param = {
        token: this.$ls.get("token"),
        user_order_id: this.$route.query.user_order_id
      };
      console.log(param);
      status(param).then(res => {
        console.log(res);
        this.step = parseInt(res.result.schedule);
      });
    },
    _paymentInfo() {
      const param = {
        token: this.$ls.get("token"),
        user_order_id: this.$route.query.user_order_id
      };
      paymentInfo(param).then(res => {
        console.log(res);
        this.data = res.result.confirmNoPrintPayList;
        this.data1 = res.result.confirmPrintPayList;
        this.listLeft = res.result.confirmNoPrintPayList[0];
        this.listRight = res.result.confirmPrintPayList[0];
        this.allPrice = res.result.userOrderId ? res.result.userOrderId : 0;
        this.userId = res.result.userOrderId.user_order_id;
      });
    },
    payBtn() {
      console.log(this.value);
      const param = {
        token: this.$ls.get("token"),
        order_id: this.$route.query.user_order_id,
        user_order_id: this.userId,
        price: this.allPrice.order_price
      };
      if (this.value == 1) {
        console.log(param);
        payPal(param).then(res => {
          console.log(res);
          let first = res.toPayHtml.indexOf("href") + 6;
          let last = res.toPayHtml.lastIndexOf('"');
          let url = res.toPayHtml.slice(first, last);
          this.$ls.set("userOrderId", res.user_order_id);
          this.$ls.set("orderId", res.order_id);
          this.$ls.set("price", res.price);
          let routeData = this.$router.resolve({
            path: "paylocal",
            query: { url: url }
          });
          //window.location.replace(routeData.href, "_blank");
        });
      }
      if (this.value == 2) {
        wxPay(param).then(res => {
          console.log(res);
          const url = "hhttps://www.baidu.com/";
          this.show = true;
          var canvas = document.getElementById("canvas");
          QRCode.toCanvas(canvas, url, function(error) {
            if (error) {
              //console.error(error);
            }
          });
        });
      }
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    }
  },
  components: {
    MyTitle,
    SysHeader,
    TableItem,
    MyStpes,
    TableList,
    commonBtn,
    User
  }
};
</script>

<style lang="less">
@import url("./../../../components/index.less");
@import url("./../../../assets/style.css");
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
      padding: 16px 0;
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
        margin-bottom: 40px;
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
