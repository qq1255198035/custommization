<template>
  <div class="share">
    <div class="step">流程进度</div>
    <my-stpes :mycurrent="step">
      <p slot="p1">选择尺码</p>
      <p slot="p2">确认支付</p>
      <p slot="p3">等待开团</p>
      <p slot="p4">完成</p>
    </my-stpes>
    <my-title :title="itemTitle"></my-title>
    <a-row :gutter="32">
      <!--list1-->
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <table-item :data="listLeft"></table-item>
        <table-list :columns="columns" :data="data"></table-list>
      </a-col>
      <!--list2-->
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <table-item :data="listRight"></table-item>
        <table-list :columns="columns1" :data="data1"></table-list>
      </a-col>
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
              <h3>商品金额：</h3>
              <p>$2000</p>
            </li>
            <li>
              <h3>手续费</h3>
              <p>$2000</p>
            </li>
            <li style="border-bottom:solid 1px #fff;">
              <h3>运费：</h3>
              <p>$2000</p>
            </li>
            <li style="padding-top:10px">
              <h3>合计总额：</h3>
              <p>${{allPrice.order_price}}</p>
            </li>
          </ul>
        </a-col>
      </a-row>
    </div>
    <!--支付-->
    <div class="paynum">
      <div class="left">
        <p>总价</p>
        <h2>${{allPrice.order_price}}</h2>
      </div>
      <div class="right">
        <a-button icon="dollar" @click="payBtn" size="large">立即支付</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { payPal, paymentInfo, status } from "@/api/system";
import MyStpes from "@/components/MyStpes/MyStpes";
import SysHeader from "@/components/SysHeader/SysHeader";
import MyTitle from "@/components/MyTitle/MyTitle";
import TableItem from "@/components/TableItem/TableItem";
import TableList from "@/components/TableList/TableList";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  props: {},
  data() {
    return {
      step: 1,
      listLeft: {},
      listRight: {},
      value: 1,
      itemTitle: "订单信息",
      payTitle: "支付信息",
      allPrice: "",
      img1: {
        img: [
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg",
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg"
        ]
      },
      img2: {
        img: [
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg",
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg"
        ]
      },
      data: [],
      data1: [],
      columns: [
        {
          title: "尺码",
          dataIndex: "size",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "数量",
          className: "quantity",
          dataIndex: "quantity"
        },
        {
          title: "单价",
          dataIndex: "price"
        },
        {
          title: "总价",
          dataIndex: "total_price"
        }
      ],
      columns1: [
        {
          title: "尺码",
          dataIndex: "size",
          scopedSlots: { customRender: "size" }
        },
        {
          title: "名字",
          className: "printName",
          dataIndex: "printName"
        },
        {
          title: "号码",
          dataIndex: "printNumber"
        },
        {
          title: "单价",
          dataIndex: "price"
        },
        {
          title: "合计价格",
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
    _status() {
      const param = {
        token: this.$ls.get('token'),
        user_order_id: this.$route.query.user_order_id
      }
      console.log(param)
      status(param).then(res => {
        console.log(res)
        this.step = parseInt(res.result.schedule)
      })
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
        this.userId = res.result.userOrderId.user_order_id
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
          console.log(res)
          let first = res.toPayHtml.indexOf("href") + 6;
          let last = res.toPayHtml.lastIndexOf('"');
          let url = res.toPayHtml.slice(first, last);
          this.$ls.set('userOrderId', res.user_order_id)
          this.$ls.set('orderId', res.order_id)
          this.$ls.set('price', res.price)
          let routeData = this.$router.resolve({
            path: "paylocal",
            query: { url: url }
          });
          //window.location.replace(routeData.href, "_blank");
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
    TableList
  }
};
</script>

<style scoped lang="less">
.share {
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
        h3 {
          float: left;
          color: #fff;
        }
        p {
          float: right;
        }
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
      float: left;
      h2 {
        color: #fff;
      }
    }
    .right {
      float: right;
      .ant-btn {
      }
    }
  }
}
</style>
