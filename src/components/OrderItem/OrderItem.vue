<template>
  <div id="OrderItem">
    <div v-for="items in orderArr" :key="items.id">
      <div class="order-title">
        <p>
          <span>Order ID:{{items.orderSn}}</span>
          <span>Order time: {{items.createTime}}</span>
          <span>Order Deadline： {{items.payEndDate}}</span>
          <span>Status：{{items.orderStatus | statusFilter1}}</span>
        </p>
        <hide-menu @handeDetelOrder="handeDetelOrder(items.id)" @handeCaleOrder="handeCaleOrder(items.id)" @myClick="checkOutDetails(items.id)" @myClick1="openMyshareBox(items.id)" @myClick2="goEditing(items.id)" :isEdit="items.orderStatus"></hide-menu>
      </div>
      <div class="order-content">
        <div class="order-item" v-for="(item,index) in items.interiorList" :key="index + items.id">
          <div class="left">
            <div style="display: flex; align-items:center;">
              <img :src="item.positivePicUrl" alt width="150" height="150" />
              <div class="desc">
                <h3>{{item.name}}</h3>
                <p>COLOUR： {{item.productColor}}</p>
              </div>
            </div>
            
            <div>
              <span style="margin-right: 20px;">{{item.buyNum}}/{{item.quantity}}</span>
              <span>Status: {{item.status | statusFilter}}</span>
            </div>
          </div>
          <div class="right">
            
            <commonBtn
              @btnClick="btnClick(item.id,item.status)"
              :width="'100%'"
              :title="'Confirm draft'"
              :height="'32px'"
              :padding="'15px'"
              :radio="'12px'"
              :fontsize="'16px'"
            ></commonBtn>
            <!--<a-button style="color: #33b8b3;" @click="btnClick(item.id)">Confirm draft</a-button>-->
          </div>
        </div>
      </div>
    </div>
    <a-modal :visible="openShare" :footer="null" @cancel="closeShareBox" title="Share to a Friend" :centered="true">
          <div class="share-box1">
                <share class="share" :config="config"></share>
          </div>
    </a-modal>
  </div>
</template>
<script>
import commonBtn from "@/components/commonBtn/commonBtn";
import HideMenu from "@/components/HideMenu/HideMenu";
const statusMap = {
  '1': {
    text: "To Be Confirmed"
  },
  '2': {
    text: "Confirmed"
  },
};
const statusMap1 = {
  '1': {
    text: "Submit Order"
  },
  '2': {
    text: "Confirm draft"
  },
  '3': {
    text: "Share purchase"
  },
  '4': {
    text: "In production"
  },
  '5': {
    text: "In Transit"
  },
  '6': {
    text: "Completed"
  },
  '7': {
    text: 'Cancelled'
  },
  '8': {
    text: 'Failed'
  }
};
export default {
  props: {
    orderArr: {
      type: Array
    }
  },
  data(){
    return{
      openShare:false,
        config: {
              url: '', // 网址，默认使用 window.location.href
              source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
              title: "11", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
              description: "222", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
              image:
                    "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
              sites: ["facebook", "wechat", "weibo"], // 启用的站点
              //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
              wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
              wechatQrcodeHelper: "Scan and share this article with friends."
        }
      }
  },
  components: {
    HideMenu,
    commonBtn
  },
  methods: {
    handeDetelOrder(id) {
      console.log('删除')
      this.$emit('childDelte', id)
    },
    handeCaleOrder(id) {
      console.log('取消')
      this.$emit('childCale', id)
    },
    goEditing(id){
          this.$router.push({path: '/orderdetails',query:{id: id}})
    },
    closeShareBox(){
          this.openShare = false;
    },
    checkOutDetails(id){
          this.$router.push({path: '/myorder',query: {id: id}})
    },
    btnClick(id,status){
      this.$emit('handleMyClick',id,status)
    },
    openMyshareBox(id){
          this.openShare = true;
          this.config.url = 'http://192.168.0.9/#/share' + '?order_id='+id
    },
    statusFilter (type) {
      return statusMap[type].text
    },
  },
  filters:{
    statusFilter (type) {
      return statusMap[type].text
    },
    statusFilter1 (type) {
      return statusMap1[type].text
    },
  }
};
</script>
<style lang="less">
#OrderItem {
  .order-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #757575;
    padding: 10px 0;
    margin-top: 20px;
    p {
      width: 90%;
      display: flex;
      justify-content: space-between;
      span {
        width: 33%;
        color: #33b8b3;
      }
    }
  }
  .order-content {
    .order-item {
      padding: 20px 50px;
      border-bottom: 1px solid #757575;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        width: 60%;
        align-items: center;
        justify-content: space-between;
        .desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 20px;
          h3 {
            color: #33b8b3;
            padding: 10px;
          }
          p {
            padding: 10px;
            color: #757575;
          }
        }
      }
      .order-content {
        .order-item {
          padding: 20px 0;
          border-bottom: 1px solid #757575;
          display: flex;
          justify-content: space-between;
          .left {
            display: flex;
            width: 40%;
            .desc {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 20px;
              h3 {
                color: #33b8b3;
                padding: 10px;
              }
              p {
                padding: 10px;
                color: #757575;
              }
            }
          }
          .right {
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            > p {
              color: #757575;
              display: flex;
              .ant-badge-status-dot {
                width: 8px;
                height: 8px;
              }
            }
            > span {
              color: #757575;
            }
          }
        }
      }
    }
  }
}
.share-box1 {
  padding: 30px;
  p{
    font-size: 12px !important;
  }
  .qrcode{
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
