<template>
<div id="contentBox">
  <div class="share-boxs" v-if="mobileShow">
    <div class="wrapper-box">
      <header>
        <router-link :to="{name:'index'}">
          <p class="icon-logotxt"></p>
        </router-link>
        <p>
          <User></User>
        </p>
      </header>
      <card-header :detailList="detailList"></card-header>
      <my-title style="margin:40px 0;" :fontsize="20" :title="itemTitle"></my-title>
      <a-row :gutter="40" style="padding:0 8%">
        <!--list1-->
        <div>
          <a-col
            class="scroll-boxs"
            :xxl="12"
            :xl="24"
            v-for="(item,index) in resultData"
            :key="index"
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
  <div class="mobile-box" v-else>
    <header class="mobile-header">
      <img src="@/assets/logoWhite.png" alt="">
    </header>
    <card-header-m :detailList="detailList"></card-header-m>
    <a-row :gutter="40" style="padding:0 8%">
        <!--list1-->
        <div>
          <a-col
            class="scroll-boxs"
            :xxl="12"
            :xl="24"
            v-for="(item,index) in resultData"
            :key="index"
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
import CardHeaderM from "@/components/CardHeader/CardHeaderM";
import TableItem from "@/components/TableItem/TableItem";
import { ACCESS_TOKEN } from "@/store/mutation-types";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  data() {
    return {
      pay_mode: "",
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
      arrtyNew2: [],
      mobileShow: false
    };
  },
  mounted() {
    this._apiPersonOrder();
    this.check();
    this.getWindowScreen();
  },
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
    imgShow() {
      this.previewVisible = true;
    },
    handleCancelImg() {
      this.previewVisible = false;
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
    //价格合计
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
      let newLists = [];
      for (var k = 0; k < this.newListOld.length; k++) {
        let count = 0;
        for (var j = 0; j < newLists.length; j++) {
          if (newLists[j] == this.newListOld[k]) {
            count++;
            break;
          }
        }
        if (count == 0) {
          newLists[newLists.length] = this.newListOld[k];
        }
      }

      this.arrtyNew1 = newLists;
      this.arrtyNew1 = this.arrtyNew1.filter(item => {
        return item.price !== 0;
      });
      this.arrtyAllList = this.arrtyNew1.concat(this.arrtyNew2);
      this.allPrice = this._price(this.arrtyAllList);
      this.listNoPay.data = this.arrtyAllList;
    },
    lists(data) {
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
        if (count == 0) {
          newLists[newLists.length] = this.newListOld1[k];
        }
      }

      this.arrtyNew2 = newLists;
      this.arrtyNew2 = this.arrtyNew2.filter(item => {
        return item.price !== 0;
      });
      this.arrtyAllList = this.arrtyNew2.concat(this.arrtyNew1);
      this.allPrice = this._price(this.arrtyAllList);
      this.listNoPay.data = this.arrtyAllList;
    },
    // 立即支付
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
      //校验尺码，名字，号码
      for (var i = 0; i < this.arrtyAllList.length; i++) {
        console.log(!this.arrtyAllList[i].size);
        if (!this.arrtyAllList[i].size) {
          this.$message.error("Please choose the size.");
          return;
        }
        if (
          this.arrtyAllList[i].is_print_number == 1 &&
          !this.arrtyAllList[i].printNumber
        ) {
          this.$message.error("Please choose the number.");
          return;
        }
        if (
          this.arrtyAllList[i].is_print_text == 1 &&
          !this.arrtyAllList[i].printName
        ) {
          this.$message.error("Please choose your name.");
          return;
        }
      }
      if (this.allPrice && token) {
        const param = {
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
              path: "/payment"
            });
          }
        });
      }
    },
    //初始订单查询
    _apiPersonOrder() {
      apiPersonOrder({
        //token: this.$ls.get("token"),
        //order_id: 266,
        order_id: this.$route.query.order_id,
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.$ls.set("pay_mode", res.result.pay_mode);
        this.pay_mode = res.result.pay_mode;
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
    commonBtn,
    CardHeaderM
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
.scroll-boxs {
  overflow-y: auto;
  overflow-x: hidden;
  height: 560px;
  margin-bottom: 20px;
  max-height: 560px;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*宽分别对应竖滚动条的尺寸*/
    /*高分别对应横滚动条的尺寸*/
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #33b8b3;
    border-radius: 4px;
    height: 10%;
  }
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
      }
    }
  }
}
@media screen and (max-width: 768px) and (min-width: 325px){
  #contentBox{
    height: 100%;
    .mobile-box{
      width: 100%;
      height: 100%;
      background-color: #fff;
      .mobile-header{
        width: 100%;
        background-color: #33b8b3;
        text-align: left;
        padding: 10px 20px;
        img{
          width: 40%;
        }
      }
    }
  }
  
}

</style>
