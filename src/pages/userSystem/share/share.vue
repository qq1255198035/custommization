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
    <div class="mobile-main">
      <template v-for="(item,index) in resultData">
        <!-- item.is_print_numbe || item.is_print_text -->
        <template v-if="item.is_print_numbe || item.is_print_text">
          <div class="share-type" :key="item.des_id">
            <div class="title">
              <h2>
                {{item.name}}
                <span @click="imgShow">View the size chart</span>
              </h2>
              <span @click="delshow = -1" v-if="delshow == index"><a-icon type="close-circle"></a-icon>cancel</span>
              <span @click="delshow = index" v-else><a-icon type="edit"></a-icon>edit</span>
            </div>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
              <img alt="example" style="width: 100%" :src="item.size_chart_url" />
            </a-modal>
            <ul class="img-box">
              <li>
                <img :src="item.positive_pic_url" v-preview="item.positive_pic_url">
              </li>
              <li>
                <img :src="item.back_pic_url" v-preview="item.back_pic_url">
              </li>
              <li>
                <img :src="item.left_pic_url" v-preview="item.left_pic_url">
              </li>
              <li>
                <img :src="item.right_pic_url" v-preview="item.right_pic_url">
              </li>
            </ul>
            <ul class="share-desc">
              <li v-for="(aitem,aindex) in mobileData['list' + index]" :key="aindex">
                Name: <span>{{aitem.name}}</span> No: <span>{{aitem.no}}</span> Size: <span>{{aitem.size}}</span> <span>${{item.price}}</span> <a-icon type="delete" v-if="delshow == index" @click="delectItem(index,aindex)"/>
              </li>
            </ul>
            <a-button block style="margin: 10px 0;" @click="addDataList(index,1)">ADD</a-button>
          </div>
        </template>
        <!-- !item.is_print_numbe && !item.is_print_text -->
        <template v-if="!item.is_print_numbe && !item.is_print_text">
          <div class="share-type" :key="item.des_id">
            <div class="title">
              <h2>
                {{item.name}}
                <span @click="imgShow">View the size chart</span>
              </h2>
              <span @click="delshow = -1" v-if="delshow == index"><a-icon type="close-circle"></a-icon>cancel</span>
              <span @click="delshow = index" v-else><a-icon type="edit"></a-icon>edit</span>
            </div>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
              <img alt="example" style="width: 100%" :src="item.size_chart_url" />
            </a-modal>
            <ul class="img-box">
              <li>
                <img :src="item.positive_pic_url" v-preview="item.positive_pic_url">
              </li>
              <li>
                <img :src="item.back_pic_url" v-preview="item.back_pic_url">
              </li>
              <li>
                <img :src="item.left_pic_url" v-preview="item.left_pic_url">
              </li>
              <li>
                <img :src="item.right_pic_url" v-preview="item.right_pic_url">
              </li>
            </ul>
            <ul class="share-desc">
              <li v-for="(aitem,aindex) in mobileData['list' + index]" :key="aindex">
                Size: <span>{{aitem.size}}</span> Quantify: <span>{{aitem.quantify}}</span> Price: <span>${{aitem.quantify * aitem.price}}</span><a-icon type="delete" v-if="delshow == index" @click="delectItem(index,aindex)"/>
              </li>
            </ul>
            <a-button block style="margin: 10px 0;" @click="addDataList(index,0)">ADD</a-button>
          </div>
        </template>
      </template>

    </div>
    <div class="total-price">
      <p>
        Total Amount: $ {{myPrice}}
      </p>
      <a-button type="primary" @click="goToPay">Pay Now</a-button>
    </div>
  </div>
  <a-drawer
    title="ADD"
    placement="bottom"
    @close="onClose"
    :visible="mobildvisible"
    :height="drawerH"
    :destroyOnClose="true"
  >
    <div class="add-type-1">
      <div class="img-title">
        <img :src="mobileImgArr[sizeIndex]" v-preview="mobileImgArr[sizeIndex]" width="100" height="100">
        <div>
          <h2>${{priceArr[sizeIndex]}}</h2>
          <span style="margin-right: 10px;">size: {{size ? size : 'Select Size'}}</span>
          <span>quantify: {{defaultNum}}</span>
        </div>
      </div>
      <div class="size-box">
        <h3>Size</h3>
        <span v-for="(size,index) in sizes[sizeIndex]" @click="choseSize(index,size)" :key="index" 
          :style="{backgroundColor: activeIndex == index ? 'rgba(0,0,0,0)' : '#ccc', 
          color: activeIndex == index ? '#33b8b3' : '#333', border: activeIndex == index ? '1px solid #33b8b3' : 'none'}">{{size}}</span>
      </div>
      <a-form :form="form" v-if="drawerShow == 1">
        <a-form-item label="Name" style="border-bottom: 1px solid #ccc;padding: 10px 0;">
          <a-input v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Please fill in the name.'}], validateTrigger: 'blur'}
          ]"></a-input>

        </a-form-item>
        <a-form-item label="No" style="border-bottom: 1px solid #ccc;padding: 10px 0;">
          <a-input v-decorator="[
            'no',
            {rules: [{ required: true, message: 'Please fill in the number.' }], validateTrigger: 'blur'}
          ]" type="Number"></a-input>
        </a-form-item>
      </a-form>
      <div v-else class="stepper-box">
        <span>Quantify</span>
        <div id="steppers">
          <button class="left" @click="clickLeftbtn">-</button>
          <input type="number" min="1" max="Infinity" class="stepper-input" v-model="defaultNum" />
          <button class="right" @click="clickRightbtn">+</button>
        </div>
      </div>
      <div>
        <a-button type="primary" block @click="insertData">Sure</a-button>
      </div>
    </div>
  </a-drawer>
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
      defaultNum: 1,
      drawerH:0,
      form:this.$form.createForm(this),
      mobileImgArr:[],
      activeIndex: -1,
      sizeIndex: -1,
      mobildvisible:false,
      delshow:-1,
      pay_mode: "",
      previewVisible: false,
      showList: "",
      showTable: "",
      aPrice: "",
      bPrice: "",
      allPrice: 0,
      listPay: {},
      listNoPay: {},
      size: '',
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
      mobileShow: false,
      mobileData:{},
      drawerShow: -1,
      calcPrice:0,
      priceArr:[],
      totalPriceArr:[],
      totalPriceArrB:[],
      myPostList:[],
      myPostListB:[]
    };
  },
  mounted() {
    this._apiPersonOrder();
    this.check();
    this.getWindowScreen();
    console.log(this.$route.query)
  },
  computed:{
    myPrice(){
      let s = 0;
      this.totalPriceArrB.forEach(val => {
        s += val;
      });
      return s;
    },
  },
  methods: {
    calcPostlist(){
      let newArr = [];
      for (let va of this.myPostList) {
        for (let vq of Array.from(va)) {
          newArr.push(vq);
          this.myPostListB = newArr;
          console.log(this.myPostListB)
        }
      }
    },
    calcTotalPrice(){
      let newArr = [];
      for (let va of this.totalPriceArr) {
        for (let vq of Array.from(va)) {
          newArr.push(vq);
          this.totalPriceArrB = newArr;
          console.log(this.totalPriceArrB)
        }
      }
    },
    clickRightbtn(){
      this.defaultNum ++;
    },
    clickLeftbtn(){
      if(this.defaultNum > 1){
        this.defaultNum --;
      }else{
        this.defaultNum = 1
      }
    },
    delectItem(index,aindex){
      console.log(index,aindex)
      let that = this;
      that.$confirm({
        title: 'Are you sure delete this task?',
        okText: 'Yes',
        cancelText: 'No',
        onOk() {
          let a = [];
          let b = [];
         
          that.mobileData['list' + index].splice(aindex,1);
          a = that.mobileData['list' + index].concat(a);
          that.$delete(that.mobileData,'list' + index);
          that.$set(that.mobileData,'list' + index,a);

          that.totalPriceArr[index].splice(aindex,1);
          b =  that.totalPriceArr[index].concat(b);
          that.$delete(that.totalPriceArr,index);
          that.$set(that.totalPriceArr,index,b);
          that.calcTotalPrice();

          that.myPostList[index].splice(aindex,1);
          that.calcPostlist();
          console.log(that.myPostListB)
          that.$message.success('Successful operation!')
        }
      })
    },
    insertData(){
      this.form.validateFields((err,values) => {
        if (!err) {
          if(this.size){
            let that = this;
            let dataArr = [];
            let priceArrA = [];
            let postList = [];
            let key = 'list' + that.sizeIndex.toString()
            dataArr.push({
              size: that.size,
              name: values.name ? values.name : '',
              no: values.no ? values.no : '',
              quantify: that.defaultNum,
              price: that.calcPrice
            })
            priceArrA.push(dataArr[0].quantify * dataArr[0].price);
            
            if(that.totalPriceArr[that.sizeIndex]){
              that.totalPriceArr[that.sizeIndex] = priceArrA.concat(that.totalPriceArr[that.sizeIndex])
            }else{
              that.totalPriceArr[that.sizeIndex] = priceArrA
            }
            
            if(that.mobileData[key]){
              dataArr = dataArr.concat(that.mobileData[key]);
              that.mobileData[key] = dataArr;
              console.log(that.mobileData)
            }else{
              that.mobileData[key] = dataArr;
              console.log(that.mobileData)
            }
            postList.push({
              price: that.resultData[that.sizeIndex].price,
              number: dataArr[0].quantify,
              printName:that.resultData[that.sizeIndex].printName,
              printNumber:that.resultData[that.sizeIndex].printNumber,
              size: that.size,
              goods_id: that.resultData[that.sizeIndex].goods_id,
              des_id: that.resultData[that.sizeIndex].des_id,
              total_price: dataArr[0].price * dataArr[0].quantify,
              positive_pic_url: that.resultData[that.sizeIndex].positive_pic_url,
              back_pic_url: that.resultData[that.sizeIndex].positive_pic_url,
              left_pic_url: that.resultData[that.sizeIndex].positive_pic_url,
              right_pic_url: that.resultData[that.sizeIndex].positive_pic_url,
              color: that.resultData[that.sizeIndex].color,
              weight: that.resultData[that.sizeIndex].weight,
              name: that.resultData[that.sizeIndex].name
            })
            if(that.myPostList[that.sizeIndex]){
              that.myPostList[that.sizeIndex] = postList.concat(that.myPostList[that.sizeIndex])
            }else{
              that.myPostList[that.sizeIndex] = postList
            }
            console.log(that.myPostList)
            that.mobildvisible = false;
            that.size = '';
            that.activeIndex = -1;
            that.defaultNum = 1;
            that.calcTotalPrice();
            that.calcPostlist();
            that.$message.success('Successful operation!')
          }else{
            this.$message.error('Please Select Size!')
          }
        }
      });
    },
    choseSize(index,size){
      console.log(size);
      this.size = size;
      this.activeIndex = index;
    },
    addDataList(index,type){
      console.log(index)
      this.mobildvisible = true;
      this.sizeIndex = index;
      this.drawerShow = type;
      this.calcPrice = this.resultData[index].price;
      if(type == 1){
        this.drawerH = 550;
      }else{
        this.drawerH = 380;
      }
    },
    onClose() {
      this.mobildvisible = false
    },
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
      if(this.arrtyAllList){
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
      }else{
        this.$message.error("Please add at least one item!");
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
    goToPay(){
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
      }else{
        if(this.myPrice > 0){
          const param = {
            user_order_id: this.$route.query.user_order_id,
            order_id: this.$route.query.order_id,
            order_price: this.myPrice,
            personOrderList: JSON.stringify({data:this.myPostListB}),
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
        }else{
          this.$message.error('Please add at least one item');
        }
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
        console.log(res)
        this.$ls.set("pay_mode", res.result.pay_mode);
        this.pay_mode = res.result.pay_mode;
        this.resultData = res.result.personOrderNoPrintList;
        this.detailList = res.result;
        
        this.resultData.forEach(el => {
          this.sizes.push(el.sizes);
          this.mobileImgArr.push(el.positive_pic_url);
          this.priceArr.push(el.price)
          
        })
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
      min-height: 100%;
      background-color: #fff;
      
      padding-bottom: 75px;
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
      .mobile-header{
        width: 100%;
        background-color: #33b8b3;
        text-align: left;
        padding: 10px 20px;
        img{
          width: 40%;
        }
      }
      .mobile-main{
        padding: 20px;
        .title{
          display: flex;
          justify-content: space-between;
          h2{
            font-size: 16px;
            color: #33b8b3;
            span{
              font-size: 14px;
              color: #333;
            }
          }
          span{
            i{
              margin-right: 5px; 
            }
          }
        }
        .share-type{
          .img-box{
            display: flex;
            justify-content: space-between;
            li{
              width: 24%;
              border: 1px solid #ccc;
              padding: 5px;
              img{
                width: 100%;
              }
            }
          }
          .share-desc{
            li{
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #ccc;
              font-size: 14px;
              margin: 10px 0;
              align-items: center;
              i{
                font-size: 16px;
                vertical-align: middle;
                color: red;
                margin-left: 10px;
              }
              span{
                color: #33b8b3;
              }
            }
          }
        }
      }
    }
  }
  .add-type-1{
    .stepper-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
    .size-box{
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
      span{
        padding: 2px 10px;
        background-color: #ccc;
        border-radius: 5px;
        margin: 5px;
        min-width: 35px;
        display: inline-block;
        text-align: center;
      }
    }
    .img-title{
      display: flex;
      align-items: center;
      img{
        margin-right: 10px;
      }
    }
  }
}
#steppers {
  .stepper-input {
    box-sizing: border-box;
    width: 32px;
    height: 28px;

    padding: 0;
    color: #999;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    background-color: rgba(255, 255, 255, 0.5);
    border: 0;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .left {
    position: relative;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 5px;
    color: #999;
    vertical-align: middle;
    background-color: rgba(255, 255, 255);
    border: 0;
    border-radius: 4px 0 0 4px;
    border: 1px solid #eee;
    outline: none;
    cursor: pointer;
    line-height: 14px;
  }
  .right {
    position: relative;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0;
    padding: 5px;
    color: #999;
    vertical-align: middle;
    background-color: rgba(255, 255, 255);
    border: 0;
    border-radius: 0 4px 4px 0;
    border: 1px solid #eee;
    outline: none;
    cursor: pointer;
    line-height: 14px;
  }
}
</style>
