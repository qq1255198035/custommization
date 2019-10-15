<template>
  <div id="my-order">
    <my-title :title="'Order details'" :fontsize="20">
      <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
    </my-title>
    <div class="side">
      <p>
        <span>
          <a-icon type="file-text" />Single number:
        </span>
        {{orderId}}
      </p>
      <a-button size="small" style="font-size: 14px;" @mouseover="hidemenu = true">Main operation</a-button>
      <ul v-show="hidemenu" @mouseover="hidemenu = true" @mouseout="hidemenu = false">
        <li
          style="border-bottom: 1px solid #fff;"
          @click="$router.push({path:'/orderdetails',query:{id: id}})"
          v-if="orderStatus < 3"
        >
          <a-icon type="edit" />Edit
        </li>
        <li @click="openMyshareBox(id)" v-if="orderStatus == 3">
          <a-icon type="share-alt" />Share
        </li>
      </ul>
    </div>
    <div class="title">
      <ul>
        <li>
          <p>
            <span>Order number：</span>
            {{ contact }}
          </p>
          <p>
            <span>Creation time:</span>
            {{ createTime }}
          </p>
        </li>
        <li>
          <p>
            <span>Note：</span>
            {{ introduction }}
          </p>
        </li>
      </ul>
      <div class="status">
        <div>
          <div>
            <p>Standby Closing Time</p>
            <span>{{payEndDate}}</span>
          </div>
          <a-divider type="vertical" style="height: 40px; margin: 0 50px;" />
          <div>
            <p>Status</p>
            <span>Pending approval</span>
          </div>
          <a-divider type="vertical" style="height: 40px; margin: 0 50px;" />
          <div>
            <p>Order amount</p>
            <span>$ {{orderPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="Details" key="1">
        <div class="details">
          <h3>Order progress</h3>
          <my-stpes :mycurrent="mycurrent" stpesnum="4">
            <p slot="p1" style="color: #33b8b3;">Submit order</p>
            <p slot="p2" style="color: #33b8b3;">Confirm draft</p>
            <p slot="p3">Share purchase</p>
            <p slot="p4">Completed</p>
          </my-stpes>
          <my-title :title="'Product Information'" :fontsize="16" style="margin-top: 20px;"></my-title>
          <a-row type="flex" class="content" v-for="item in infoList" :key="item.id">
            <a-col :span="10">
              <div class="left">
                <h3>{{item.name}}</h3>
                <ul class="img-box">
                  <li>
                    <img :src="item.positivePicUrl" v-preview="item.positivePicUrl"/>
                    <span>Front</span>
                  </li>
                  <li>
                    <img :src="item.backPicUrl" v-preview="item.backPicUrl"/>
                    <span>Back</span>
                  </li>
                </ul>
                <p>
                  Price：
                  <span>$ {{item.price}}</span>
                </p>
                <p>
                  <span>COLOR：{{item.productColor}}</span>
                  <span style="margin-left: 10px;">
                    Quantity：
                    <i>{{item.buyNum}}</i>
                    /{{item.quantity}}
                  </span>
                </p>
              </div>
            </a-col>
            <a-col :span="14">
              <div class="right">
                <h3>Payment information</h3>
                <a-table
                  :columns="columns"
                  :dataSource="item.interiorList"
                  size="middle"
                  :pagination="false"
                >
                  <span slot="status" slot-scope="text">
                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                  </span>
                </a-table>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="Logistics information" key="2">
        <div class="info">
          <h3>Order progress</h3>
          <ul class="perInfo">
            <li>
              Consignee:
              <span>{{ mydata.mapAddress.userName }}</span>
            </li>
            <li>
              Zip code:
              <span>{{ mydata.mapAddress.postalCode }}</span>
            </li>
            <li>
              Phone:
              <span>{{ mydata.mapAddress.telNumber }}</span>
            </li>
            <li>
              Delivery address:
              <span>{{ mydata.mapAddress.address }}</span>
            </li>
          </ul>
          <h3>Logistics track</h3>
          <ul class="perInfo">
            <li>
              Logistics company：
              <span>{{ mydata.mapExpressage.itemText ? mydata.mapExpressage.itemText : ''}}</span>
            </li>
            <li>
              Shipping number：
              <span>{{ mydata.mapExpressage.shippingNo ? mydata.mapExpressage.shippingNo : ''}}</span>
            </li>
          </ul>
          <ul class="logistics-info">
            
            <li v-for="(item,index) in mydata.logisticsList" :key="index">
              {{item.createdAt}}  {{item.tag}} {{item.location}}  {{item.message}}  
            </li>
            
          </ul>
        </div>
      </a-tab-pane>
    </a-tabs>
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
import MyTitle from "@/components/MyTitle/MyTitle";
import MyStpes from "@/components/MyPrimaryStpes/MyPrimaryStpes";
import { orderDetailUp, orderDetailDown,getTrackingData } from "@/api/seller";
const statusMap = {
  0: {
    status: "success",
    text: "Money Received"
  },
  1: {
    status: "warning",
    text: "Applying"
  },
  3: {
    status: "error",
    text: "Payment Unsuccessful"
  },
  2: {
    status: "processing",
    text: "Processing Payment"
  }
};
export default {
  components: {
    MyTitle,
    MyStpes
  },
  data() {
    return {
      shareText: '',
      hidemenu: false,
      id: "",
      orderStatus: "",
      orderId: "",
      contact: "",
      createTime: "",
      topic: "",
      orderPrice: "",
      introduction: "",
      payEndDate: "",
      columns: [
        {
          title: "SIZE",
          dataIndex: "size"
        },
        {
          title: "Quantity",
          dataIndex: "number"
        },
        {
          title: "Operating time",
          dataIndex: "pay_time"
        },
        {
          title: "Status",
          dataIndex: "pay_status",
          scopedSlots: { customRender: "status" }
        }
      ],
      mydata: {
        logisticsList: [],
        mapAddress:{},
        mapExpressage:{}
      },
      infoList: [],
      openShare: false,
      config: {
        url: "", // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "Title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "description", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "", // 图片, 默认取网页中第一个img标签
        //sites: ["facebook", "wechat", "weibo"], // 启用的站点
        sites: ["facebook", "wechat"],
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
        wechatQrcodeHelper: "Scan and share this article with friends."
      },
      mycurrent: 3
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getOrderDetailUp(this.id);
    this.getOrderDetailDown(this.id);
    this.getTrackingData(this.id);
    console.log(window.location)
    console.log(this.config.url)
  },
  methods: {
    onCopy() {
      this.$message.success("Replication success!");
    },
    onError() {
      this.$message.error("copy failed!");
    },
    openMyshareBox(id) {
      console.log(id);
      this.openShare = true;
      this.config.url = window.location.origin + "/#/share" + "?order_id=" + id;
      this.config.title = this.shareText.topic;
      this.config.image = this.shareText.topic_url;
      this.config.description = this.shareText.introduction;
      console.log(this.config.url);
    },
    closeShareBox() {
      this.openShare = false;
    },
    getOrderDetailDown(id) {
      orderDetailDown(id).then(res => {
        console.log(res);
        this.infoList = res.result;
      });
    },
    getTrackingData(id) {
      getTrackingData(id).then(res =>{
        if(res.code == 0) {
          console.log(res.result)
          this.mydata.logisticsList = res.result.logisticsList ? res.result.logisticsList : [];
          this.mydata.mapAddress = res.result.mapAddress ? res.result.mapAddress : {};
          this.mydata.mapExpressage = res.result.mapExpressage ? res.result.mapExpressage : {};
          console.log(this.mydata.mapAddress.userName)
          console.log(this.mydata)
        }
      });
    },
    getOrderDetailUp(id) {
      orderDetailUp(id).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.shareText = res.result;
          this.orderId = res.result.orderSn;
          this.contact = res.result.contact;
          this.createTime = res.result.createTime;
          this.topic = res.result.topic;
          this.orderPrice = res.result.orderPrice;
          this.introduction = res.result.introduction;
          this.payEndDate = res.result.payEndDate;
          this.orderStatus = res.result.orderStatus;
          if (this.orderStatus == 1) {
            this.mycurrent = 0;
          } else if (this.orderStatus == 2) {
            this.mycurrent = 1;
          } else if (this.orderStatus == 3) {
            this.mycurrent = 2;
          } else if (this.orderStatus == 6) {
            this.mycurrent = 3;
          }
        }
      });
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusTypeFilter(type) {
      return statusMap[type].status;
    }
  }
};
</script>
<style lang="less">
@import url("./../../components/index.less");
#my-order {
  padding: 0 20px;
  .side {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    position: relative;
    ul {
      width: 67px;
      padding: 3px 10px;
      position: absolute;
      top: 25px;
      right: 0;
      background-color: #33b8b3;
      border-radius: 4px;
      li {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin: 2px 0;
        i {
          margin-right: 5px;
          color: #fff;
        }
      }
    }
    p {
      font-size: 16px;
      color: #999;
      span {
        color: #33b8b3;
        i {
          color: #33b8b3;
        }
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    ul {
      display: flex;
      width: 48%;
      justify-content: space-between;
      padding-left: 20px;
      li {
        width: 50%;
        color: #999;
        p {
          font-size: 14px;
          margin: 10px 0;
        }
        span {
          color: #666;
        }
      }
    }
    .status {
      display: flex;
      align-items: flex-start;
      > div {
        display: flex;
        align-items: center;
        > div {
          text-align: center;
          span {
            font-size: 18px;
            color: #33b8b3;
          }
        }
      }
    }
  }
  .details {
    padding: 0 40px;
    h3 {
      padding: 10px 0;
      color: #33b8b3;
      margin: 0;
    }
    .content {
      h3 {
        font-size: 18px;
        color: #33b8b3;
      }
      .left {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        background-color: #eee;
        .img-box {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          li {
            width: 48%;
            text-align: center;

            span {
              color: #999;
            }
            img {
              width: 100%;
              display: block;
              margin-bottom: 5px;
            }
          }
        }
        p:nth-child(3) {
          span {
            font-size: 18px;
            font-weight: bold;
            color: #33b8b3;
          }
        }
        p:nth-child(4) {
          span {
            i {
              font-style: normal;
              font-size: 18px;
              font-weight: bold;
              color: #666;
            }
          }
        }
      }
      .right {
        padding: 20px 10px;
      }
    }
  }
  .info {
    padding: 0 30px;
    h3 {
      font-size: 18px;
      color: #33b8b3;
    }
    .perInfo {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      li {
        width: 33.33333%;
        color: #666;
        margin: 5px 0;
        span {
          color: #999;
        }
      }
    }
  }
  .logistics-info {
    background-color: #eee;
    padding: 20px 20px 100px;
  }
}
.share-box1 {
  padding: 30px;
  display: flex;
  justify-content: center;
  .copys {
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