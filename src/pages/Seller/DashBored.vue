<template>
  <div id="dashbored">
    <my-header :name="name" :level="level" :intro="intro" :imgUrl="imgUrl"></my-header>
    <order-total :num1="price1 | moneyFormat" :num2="price2" :num3="price3 | moneyFormat">
      <p slot="a" style="color:#727272;font-size: 16px;margin:0;">Total Sales</p>
      <p slot="b" style="color:#727272;font-size: 16px;margin:0;">Total Orders</p>
      <p slot="c" style="color:#727272;font-size: 16px;margin:0;">Total Commission</p>
    </order-total>
    <my-title :title="'Order - In Progress'">
      <router-link to="/OrderManagement/grouporder" style="text-decoration: underline;color: #33b8b3">All Orders</router-link>
    </my-title>
    <order-list :orderList="orderList" @openShareBox="openMyshareBox" />
    <my-title :title="'Design - In Progress'">
      <router-link to="/OrderManagement/designList" style="text-decoration: underline;color: #33b8b3">Design List</router-link>
    </my-title>
    <design-list :designList="designList" />
    <a-modal
      :visible="openShare"
      :footer="null"
      @cancel="closeShareBox"
      title="Share"
      :centered="true"
    >
      <div class="share-box1">
        <share class="share" :config="config"></share>
        <div>
          <a-button
            class="copys"
            icon="link"
            v-clipboard:copy="config.url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader/MyHeader";
import OrderTotal from "@/components/OrderTotal/OrderTotal";
import MyTitle from "@/components/MyTitle/MyTitle";
import OrderList from "@/components/OrderList/OrderList";
import DesignList from "@/components/DesignList/DesignList";
import { salesDate, userInfo, orderingList } from "@/api/seller";
export default {
  components: {
    MyHeader,
    OrderTotal,
    MyTitle,
    OrderList,
    DesignList
  },
  data() {
    return {
      price1: "",
      price2: "",
      price3: "",
      name: "",
      level: "",
      intro: "",
      imgUrl: "",
      orderList: [],
      designList: [],
      openShare: false,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "description", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
        //sites: ["facebook", "wechat", "weibo"], // 启用的站点
        sites: ["facebook", "wechat"],
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
        wechatQrcodeHelper:"Scan and share this article with friends."
      }
    };
  },
  mounted() {
    this.getSalesDate();
    this.getUserInfo();
    this.getOrderingList()
  },
  methods: {
    onCopy() {
      this.$message.success("Shareable link Copied.");
    },
    onError() {
      this.$message.error("copy failed");
    },
    closeShareBox() {
      this.openShare = false;
    },
    openMyshareBox(item) {
      this.openShare = true;
      this.config.url = window.location.origin + "/#/share" + "?order_id=" + item.id;
      this.config.title = item.topic;
      this.config.image = item.topic_url;
      this.config.description = item.introduction;
    },
    getSalesDate() {
      salesDate().then(res => {
        if (res.code == 0) {
          this.price1 = res.result.saleAll;
          this.price2 = res.result.orderAll;
          this.price3 = res.result.commissionAll;
        }
      });
    },
    getUserInfo() {
      userInfo().then(res => {
        if (res.code == 0) {
          if(res.result){
            this.name = res.result.username;
            this.level = res.result.levelName;
            this.intro = res.result.intro;
            this.imgUrl = res.result.img;
          }
        }
      });
    },
    getOrderingList() {
      orderingList().then(res => {
        if (res.code == 0) {
          this.orderList = res.result.orderList;
          this.designList = res.result.desginList;
        }
      });
    }
  },
  filters: {
    moneyFormat(number, decimals) {
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = ",",
        dec = ".",
        s = "",
        toFixedFix = function(n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.ceil(n * k) / k;
        };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }
      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    }
  }
};
</script>
<style lang="less">
#dashbored {
  width: 100%;
  padding: 0 20px;
  overflow-x: hidden;
}
.share-box1 {
  padding: 30px;
  display: flex;
  justify-content: center;
  .copys{
      font-size: 30px;
    margin: 0 20px;
    border: 1px solid #33b8b3 !important;
    height: 60px;
    width: 60px;
    color: #33b8b3;
    border-radius: 50%;
  }
  p {
    font-size: 12px !important;
  }
  .qrcode {
    margin: 3px auto !important;
  }
  .share {
    text-align: center;
    a {
      font-size: 30px;
      margin: 0 20px;
      border: 1px solid #33b8b3 !important;
      height: 60px;
      width: 60px;
      padding-top: 14px;
    }
  }
}
</style>