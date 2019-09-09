<template>
  <div class="share-box">
    <div class="wrapper-box">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <card-header :detailList="detailList"></card-header>
      <my-title style="margin:40px 0;" :fontsize="20" :title="itemTitle"></my-title>
      <a-row :gutter="20">
        <!--list1-->
        <a-col :span="2" v-if="showTable"></a-col>
        <a-col :xxl="8" :xl="20" v-if="showTable">
          <table-item :data="img1">
            <a href style="font-size: 18px; color: #999; text-decoration: underline">查看尺寸表</a>
          </table-item>
          <my-table :dataSize="dataSize" :size="size" :dataSizeText="dataSizeText" @getList=" list"></my-table>
        </a-col>
        <!--list2-->
        <a-col :span="2"></a-col>
        <a-col :xxl="10" :xl="20" v-if="showList">
          <table-item :data="img2">
            <a href style="font-size: 18px; color: #999; text-decoration: underline">查看尺寸表</a>
          </table-item>
          <my-tables
            v-if="showList"
            :dataSizes="dataSizes"
            :dataSizeTexts="dataSizeTexts"
            :sizes="sizes"
            @getList=" lists"
          ></my-tables>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <my-title :title="itemTitle"></my-title>
      <!--支付-->
      <div class="paynum">
        <a-row :gutter="20">
          <a-col :span="18"></a-col>
          <a-col :span="4">
            <div class="left">
              <div class="price-title">总价</div>
              <div class="allprice">${{allPrice}}</div>
            </div>
            <div class="right">
              <!--<a data-hover="立即支付" icon="dollar" class="btns" @click="payTo">立即支付</a>-->
              <commonBtn
                @payTo="payTo"
                :width="'100%'"
                :title="'立即支付'"
                :height="'56px'"
                :padding="'15px'"
                :radio="'18px'"
                :fontsize="'18px'"
              >
                <span class="bg-box">
                  <span class="bg-image"></span>
                </span>
              </commonBtn>
            </div>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPersonOrder, apiPay } from "@/api/system";
import commonBtn from "@/components/commonBtn/commonBtn";
import User from "@/components/Header/User";
import MyTable from "@/components/MyTable/MyTable";
import MyTables from "@/components/MyTables/MyTables";
import MyTitle from "@/components/MyTitle/MyTitle";
import CardHeader from "@/components/CardHeader/CardHeader";
import TableItem from "@/components/TableItem/TableItem";
import { ACCESS_TOKEN } from "@/store/mutation-types";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  props: {},
  data() {
    return {
      showList: "",
      showTable: "",
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
      img1: "",
      img2: "",
      name: ""
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
      const token = this.$ls.get(ACCESS_TOKEN);
      if (!token) {
        this.$error({
          title: "未登录",
          content: "您还没有登录，请先登录",
          okText: "去登录",
          mask: false,
          onOk: () => {
            this.$router.push({
              path: "/login",
              query: {
                order_id: this.$route.query.order_id
              }
            });
          }
        });
      } else {
        const param = {
          //token: this.$ls.get("token"),
          order_id: 266,
          order_price: this.bPrice + this.aPrice,
          personOrderNoPrintList: JSON.stringify(this.listNoPay),
          personOrderPrintList: JSON.stringify(this.listPay)
        };
        console.log(param);
        apiPay(param).then(res => {
          console.log(res);
          if (res.code == 1) {
            this.$router.push({
              path: "/payment",
              query: {
                user_order_id: res.result.user_order_id
              }
            });
          }
        });
      }
    },
    _apiPersonOrder() {
      apiPersonOrder({
        //token: this.$ls.get("token"),
        //order_id: 266,
        order_id: this.$route.query.order_id,
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        console.log(res);
        let result = res.result.personOrderNoPrintList[0];
        let result1 = res.result.personOrderPrintList[0];
        this.showList = result1;
        this.showTable = result;
        this.detailList = res.result.list[0];
        this.img1 = result;
        this.img2 = result1;
        if(result) {
          const json = {
          key: "0",
          price: result.price,
          total_price: result.price,
          quantity: 1,
          size: result.sizes.split(","),
          goods_id: result.goods_id,
          des_id: result.des_id
        };
        this.dataSize.push(json);
        this.size = result.sizes.split(",");
        this.dataSizeText = res.result.personOrderNoPrintList;
        }
        
        if (result1) {
          const json1 = {
            key: "0",
            price: result1.price,
            total_price: result1.price,
            printName: "名字",
            printNumber: 0,
            size: result1.sizes.split(","),
            goods_id: result1.goods_id,
            des_id: result1.des_id
          };
          this.dataSizes.push(json1);
          this.dataSizeTexts = res.result.personOrderPrintList;
          this.sizes = result1.sizes.split(",");
        }
        console.log(this.dataSizeText);
      });
    }
  },
  components: {
    MyTitle,
    CardHeader,
    TableItem,
    MyTable,
    MyTables,
    User,
    commonBtn
  }
};
</script>

<style lang="less">
@import url("./../../../components/index.less");
@import url("./../../../assets/style.css");
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
    .paynum {
      border-top: solid 1px #ffffff;
      overflow: hidden;
      padding: 20px 0;
      .left {
        text-align: right;
        .price-title {
          color: #999;
          font-size: 18px;
          padding: 20px 0;
        }
        .allprice {
          font-size: 24px;
          color: #33b8b3;
          padding-bottom: 20px;
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

</style>
