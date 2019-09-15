<template>
  <div class="share-boxs">
    <div class="wrapper-box">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <card-header :detailList="detailList"></card-header>
      <my-title style="margin:40px 0;" :fontsize="20" :title="itemTitle"></my-title>
      <a-row :gutter="40">
        <!--list1-->
        <div style="padding:0 20px">
          <a-col
            :xxl="12"
            :xl="20"
            v-for="(item,index) in resultData"
            :key="index"
            style="overflow-y: auto;overflow-x: hidden;height:560px;max-height:560px"
          >
            <table-item :datas="item" ref="myTable">
              <a
                @click="imgShow"
                href="javascript:;"
                style="font-size: 18px; color: #999; text-decoration: underline"
              >View the size chart</a>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
                <img alt="example" style="width: 100%" :src="item.size_chart_url" />
              </a-modal>
            </table-item>
            <div v-if="!item.is_print_numbe && !item.is_print_text">
              <my-table :dataSize="[item]" @getList="list" ref="mychild"></my-table>
            </div>

            <div v-if="item.is_print_numbe || item.is_print_text">
              <my-tables :dataName="[item]" @getList="lists"></my-tables>
            </div>
          </a-col>
        </div>
      </a-row>
      <my-title :title="itemTitle"></my-title>
      <!--支付-->
      <div class="paynum">
        <a-row :gutter="20">
          <a-col :span="18"></a-col>
          <a-col :span="4">
            <div class="left">
              <div class="price-title">Total Amount</div>
              <div class="allprice">${{allPrice}}</div>
            </div>
            <div class="right">
              <!--<a data-hover="立即支付" icon="dollar" class="btns" @click="payTo">立即支付</a>-->
              <commonBtn
                @payTo="payTo"
                :width="'100%'"
                :title="'Pay Now'"
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
      pay_mode: '',
      previewVisible: false,
      showList: "",
      showTable: "",
      aPrice: "",
      bPrice: "",
      allPrice: 0,
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
      imgs: "",
      name: "",
      resultData: [],
      map: "",
      columns: [],
      data: [],
      newList: [],
      newListOld: [],
      newListOld1: [],
      arrtyNew1: [],
      arrtyNew2: []
    };
  },
  computed: {},
  created() {
    this._apiPersonOrder();
    console.log(this.check());
    this.check();
  },
  mounted() {},
  watch: {},
  methods: {
    imgShow() {
      this.previewVisible = true
    },
    handleCancelImg() {
      this.previewVisible = false
    },
    check() {
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array(
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      );
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },

    _price(datas) {
      let price = 0;
      for (var i = 0; i < datas.length; i++) {
        price += datas[i].price;
      }
      return price;
    },
    list(data) {
      for (var i = 0; i < data.length; i++) {
        this.newListOld.push(data[i]);
      }
      console.log(this.newListOld);
      let newLists = [];
      for (var k = 0; k < this.newListOld.length; k++) {
        let count = 0;
        for (var j = 0; j < newLists.length; j++) {
          if (newLists[j] == this.newListOld[k]) {
            count++;
            break;
          }
        }
        console.log(count);
        if (count == 0) {
          newLists[newLists.length] = this.newListOld[k];
        }
      }

      this.arrtyNew1 = newLists;
      console.log(this.arrtyNew1);
      this.arrtyNew1 = this.arrtyNew1.filter(item => {
        return item.price !== 0;
      });
      console.log(this.arrtyNew1);
      this.arrtyAllList = this.arrtyNew1.concat(this.arrtyNew2);
      console.log(this.arrtyAllList);
      this.allPrice = this._price(this.arrtyAllList);
      this.listNoPay.data = this.arrtyAllList;
    },
    lists(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        this.newListOld1.push(data[i]);
      }
      let newLists = [];
      for (var k = 0; k < this.newListOld1.length; k++) {
        let count = 0;
        for (var j = 0; j < newLists.length; j++) {
          if (newLists[j] == this.newListOld1[k]) {
            count++;
            break;
          }
        }
        console.log(count);
        if (count == 0) {
          newLists[newLists.length] = this.newListOld1[k];
        }
      }

      this.arrtyNew2 = newLists;
      this.arrtyNew2 = this.arrtyNew2.filter(item => {
        return item.price !== 0;
      });
      console.log(this.arrtyNew2);
      this.arrtyAllList = this.arrtyNew2.concat(this.arrtyNew1);
      console.log(this.arrtyAllList);
      this.allPrice = this._price(this.arrtyAllList);
      this.listNoPay.data = this.arrtyAllList;
    },
    payTo() {
      const token = this.$ls.get(ACCESS_TOKEN);
      if (!token) {
        this.$error({
          title: "Not Signed In",
          content:
            "You are currently not signed in, please sign-in to continue",
          okText: "Proceed to Sign-In",
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
      }
      if (this.allPrice && token) {
        const param = {
          //token: this.$ls.get("token"),
          user_order_id: this.$route.query.user_order_id,
          order_id: this.$route.query.order_id,
          order_price: this.allPrice,
          personOrderList: JSON.stringify(this.listNoPay),
          pay_mode: this.pay_mode
        };
        console.log(param);
        apiPay(param).then(res => {
          console.log(res);
          if (res.code == 1) {
            this.$router.push({
              path: "/payment",
              query: {
                user_order_id: this.$route.query.order_id
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
        this.$ls.set("pay_mode", res.result.pay_mode);
        this.pay_mode = res.result.pay_mode
        this.resultData = res.result.personOrderNoPrintList;
        this.detailList = res.result;
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
