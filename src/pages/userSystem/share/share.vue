<template>
  <div class="share">
    <card-header :detailList="detailList"></card-header>
    <my-title :title="itemTitle"></my-title>
    <a-row :gutter="32">
      <!--list1-->
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <table-item :data="img1">
          <a href style="font-size: 14px; text-decoration: underline">查看尺寸表</a>
        </table-item>
        <my-table :dataSize="dataSize" :size="size" :dataSizeText="dataSizeText" @getList=" list"></my-table>
      </a-col>
      <!--list2-->
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <table-item :data="img2">
          <a href style="font-size: 14px; text-decoration: underline">查看尺寸表</a>
        </table-item>
        <my-tables
          :dataSizes="dataSizes"
          :dataSizeTexts="dataSizeTexts"
          :sizes="sizes"
          @getList=" lists"
        ></my-tables>
      </a-col>
    </a-row>
    <my-title :title="itemTitle"></my-title>
    <!--支付-->
    <div class="paynum">
      <div class="left">
        <p>总价</p>
        <h2>${{allPrice}}</h2>
      </div>
      <div class="right">
        <a-button icon="dollar" @click="payTo" size="large">立即支付</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPersonOrder, apiPay } from "@/api/system";
import MyTable from "@/components/MyTable/MyTable";
import MyTables from "@/components/MyTables/MyTables";
import SysHeader from "@/components/SysHeader/SysHeader";
import MyTitle from "@/components/MyTitle/MyTitle";
import CardHeader from "@/components/CardHeader/CardHeader";
import TableItem from "@/components/TableItem/TableItem";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  props: {},
  data() {
    return {
      aPrice: "",
      bPrice: "",
      allPrice: "",
      listPay: {},
      listNoPay: {},
      size: [],
      sizes: [],
      payData: "",
      dataSize: [],
      dataSizeText: [],
      dataSizeTexts: [],
      dataSizes: [],
      detailList: "",
      dataList: "",
      dataList1: "",
      itemTitle: "",
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
      }
    };
  },
  computed: {},
  created() {
    this._apiPersonOrder();
  },
  mounted() {},
  watch: {},
  methods: {
    _price(datas) {
      let price = 0;
      for (var i = 0; i < datas.length; i++) {
        price += datas[i].total_price;
      }
      return price;
    },
    list(data) {
      console.log(data);
      this.listNoPay.data = data;
      this.aPrice = this._price(data);
      console.log(this.aPrice);
      this.allPrice = this.bPrice + this.aPrice;
    },
    lists(data) {
      console.log(data);
      this.listPay.data = data;
      this.bPrice = this._price(data);
      this.allPrice = this.bPrice + this.aPrice;
    },
    payTo() {
      const param = {
        token: this.$ls.get("token"),
        orderId: 266,
        order_price: this.bPrice + this.aPrice,
        personOrderNoPrintList: JSON.stringify(this.listNoPay),
        personOrderPrintList: JSON.stringify(this.listPay)
      };
      console.log(param);
      apiPay(param).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$router.push({
            path: "/payment"
          });
        }
      });
    },
    _apiPersonOrder() {
      const param = {
        token: this.$ls.get("token"),
        orderId: 266,
        pageNo: 1,
        pageSize: 10
      };
      console.log(param);
      apiPersonOrder(param).then(res => {
        console.log(res);
        let result = res.result.personOrderNoPrintList[0];
        let result1 = res.result.personOrderPrintList[0];
        this.detailList = res.result.list[0];
        this.img1 = result;
        this.img2 = result;
        const json = {
          key: "0",
          price: result.price,
          total_price: result.price,
          quantity: 1,
          size: result.sizes.split(","),
          goods_id: result.goods_id,
          des_id: result.des_id
        };
        const json1 = {
          key: "0",
          price: result1.price,
          total_price: result1.price,
          printName: "名字",
          printNumber: 0,
          size: result1.sizes.split(","),
          goods_id: result.goods_id,
          des_id: result.des_id
        };
        this.dataSize.push(json);
        this.dataSizes.push(json1);
        this.size = result.sizes.split(",");
        this.sizes = result1.sizes.split(",");
        this.dataSizeText = res.result.personOrderNoPrintList;
        this.dataSizeTexts = res.result.personOrderPrintList;
      });
    }
  },
  components: {
    MyTitle,
    CardHeader,
    SysHeader,
    TableItem,
    MyTable,
    MyTables
  }
};
</script>

<style scoped lang="less">
.share {
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
