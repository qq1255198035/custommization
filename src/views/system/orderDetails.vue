<template>
  <div id="my-order">
    <my-title :title="'订单详情'" :fontsize="20">
      <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
    </my-title>
    <div class="side">
      <p>
        <span>
          <a-icon type="file-text" />订单号:
        </span>
        {{orderId}}
      </p>
    </div>
    <div class="title">
      <ul>
        <li>
          <p>
            <span>联系人: </span>
            {{ contact }}
          </p>
          <p>
            <span>创建时间: </span>
            {{ createTime }}
          </p>
        </li>
        <li>
          <p>
            <span>备注：</span>
            {{ introduction }}
          </p>
        </li>
      </ul>
      <div class="status">
        <div>
          <div>
            <p>订单关闭时间</p>
            <span>{{payEndDate}}</span>
          </div>
          <a-divider type="vertical" style="height: 40px; margin: 0 50px;" />
          <div>
            <p>状态</p>
            <span>{{topic}}</span>
          </div>
          <a-divider type="vertical" style="height: 40px; margin: 0 50px;" />
          <div>
            <p>订单数量</p>
            <span>$ {{orderPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="详情" key="1">
        <div class="details">
          <h3>订单进度</h3>
          <my-stpes :mycurrent="mycurrent - 1" stpesnum="6">
            <p slot="p1">提交订单</p>
            <p slot="p2">样稿确认</p>
            <p slot="p3">分享购买</p>
            <p slot="p4">生产中</p>
            <p slot="p5">运输中</p>
            <p slot="p6">完成</p>
          </my-stpes>
          <my-title :title="'产品信息'" :fontsize="16" style="margin-top: 20px;"></my-title>
          <a-row type="flex" class="content" v-for="item in infoList" :key="item.id">
            <a-col :span="10">
              <div class="left">
                <h3>{{item.name}}</h3>
                <ul class="img-box">
                  <li>
                    <img :src="item.positivePicUrl" v-preview="item.positivePicUrl"/>
                    <span>正面</span>
                  </li>
                  <li>
                    <img :src="item.backPicUrl" v-preview="item.backPicUrl"/>
                    <span>背面</span>
                  </li>
                </ul>
                <p>
                  价格：
                  <span>$ {{item.price}}</span>
                </p>
                <p>
                  <span>颜色：{{item.productColor}}</span>
                  <span style="margin-left: 10px;">
                    数量：
                    <i>{{item.buyNum}}</i>
                    /{{item.quantity}}
                  </span>
                </p>
              </div>
            </a-col>
            <a-col :span="14">
              <div class="right">
                <h3>支付信息</h3>
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
      <a-tab-pane tab="物流信息" key="2">
        <div class="info">
          <h3>订单进度</h3>
          <ul class="perInfo">
            <li>
              收货人:
              <span>{{ mydata.mapAddress.userName }}</span>
            </li>
            <li>
              邮政编码:
              <span>{{ mydata.mapAddress.postalCode }}</span>
            </li>
            <li>
              电话:
              <span>{{ mydata.mapAddress.telNumber }}</span>
            </li>
            <li>
              交货地址:
              <span>{{ mydata.mapAddress.address }}</span>
            </li>
          </ul>
          <h3>物流跟踪</h3>
          <ul class="perInfo">
            <li>
              物流公司：
              <span>{{ mydata.mapExpressage.itemText ? mydata.mapExpressage.itemText : ''}}</span>
            </li>
            <li>
              运输编号：
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
  </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import MyStpes from "@/components/systemSteps/systemSteps";
import { orderDetailUp, orderDetailDown,getTrackingData } from "@/api/seller";
const statusMap = {
  0: {
    status: "success",
    text: "已付款"
  },
  1: {
    status: "warning",
    text: "申请中"
  },
  3: {
    status: "error",
    text: "支付失败"
  },
  2: {
    status: "processing",
    text: "付款中"
  }
};
export default {
  components: {
    MyTitle,
    MyStpes
  },
  data() {
    return {
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
          title: "尺寸",
          dataIndex: "size"
        },
        {
          title: "数量",
          dataIndex: "number"
        },
        {
          title: "时间",
          dataIndex: "pay_time"
        },
        {
          title: "状态",
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
      mycurrent: 3
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getOrderDetailUp(this.id);
    this.getOrderDetailDown(this.id);
    this.getTrackingData(this.id);
  },
  methods: {
    getOrderDetailDown(id) {
      orderDetailDown(id).then(res => {
        this.infoList = res.result;
      });
    },

    getOrderDetailUp(id) {
      orderDetailUp(id).then(res => {
        if (res.code == 0) {
          this.orderId = res.result.orderSn;
          this.contact = res.result.contact;
          this.createTime = res.result.createTime;
          this.topic = res.result.topic;
          this.orderPrice = res.result.orderPrice;
          this.introduction = res.result.introduction;
          this.payEndDate = res.result.payEndDate;
          this.mycurrent = res.result.orderStatus;
          
        }
      });
    },
    getTrackingData(id) {
      getTrackingData(id).then(res =>{
        if(res.code == 0) {
          this.mydata.logisticsList = res.result.logisticsList ? res.result.logisticsList : [];
          this.mydata.mapAddress = res.result.mapAddress ? res.result.mapAddress : {};
          this.mydata.mapExpressage = res.result.mapExpressage ? res.result.mapExpressage : {};
        }
      });
    },
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
          p{
            min-height: 42px;
            font-size: 16px;
          }
          span {
            font-size: 14px;
            color: #33b8b3;
            min-height: 42px;
            display: inline-block;
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