<template>
  <div id="OrderItem">
    <div v-for="items in orderArr" :key="items.id">
      <div class="order-title">
        <p>
          <span>订单Id:{{items.orderSn}}</span>
          <span>订单时间: {{items.createTime}}</span>
          <span>订单关闭时间： {{items.payEndDate}}</span>
          <span>状态：{{items.orderStatus | statusFilter1}}</span>
        </p>
        <hide-menu @myClick="checkOutDetails(items.id)" @myClick1="openMyshareBox(items.id)" @myClick2="goEditing(items.id)" :isEdit="items.orderStatus"></hide-menu>
      </div>
      <div class="order-content">
        <div class="order-item" v-for="(item,index) in items.interiorList" :key="index + items.id">
          <div class="left">
            <div style="display: flex; align-items:center;">
              <img :src="item.positivePicUrl" alt width="150" height="150" />
              <div class="desc">
                <h3>{{item.name}}</h3>
                <p>颜色： {{item.productColor}}</p>
              </div>
            </div>
            
            <div>
              <span style="margin-right: 20px;">{{item.buyNum}}/{{item.quantity}}</span>
              <span>状态： {{item.status | statusFilter}}</span>
            </div>
          </div>
          <div class="right">
            
            <commonBtn
              @btnClick="btnClick(item.id,item.status)"
              :width="'100%'"
              :title="'样稿确认'"
              :height="'32px'"
              :padding="'15px'"
              :radio="'12px'"
              :fontsize="'16px'"
            ></commonBtn>
            <!--<a-button style="color: #33b8b3;" @click="btnClick(item.id)">样稿确认</a-button>-->
          </div>
        </div>
      </div>
    </div>
    <a-modal :visible="openShare" :footer="null" @cancel="closeShareBox" title="分享给朋友" :centered="true">
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
    text: "未确认"
  },
  '2': {
    text: "已确认"
  },
};
const statusMap1 = {
  '1': {
    text: "订单提交"
  },
  '2': {
    text: "样稿确认"
  },
  '3': {
    text: "分享购买"
  },
  '4': {
    text: "生产中"
  },
  '5': {
    text: "运输中"
  },
  '6': {
    text: "完成"
  },
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
              wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
              wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
        }
      }
  },
  components: {
    HideMenu,
    commonBtn
  },
  methods: {
    goEditing(id){
          this.$router.push({path: '/orderdetails',query:{id: id}})
    },
    closeShareBox(){
          this.openShare = false;
    },
    checkOutDetails(id){
          console.log(id);
          this.$router.push({path: '/myorder',query: {id: id}})
    },
    btnClick(id,status){
      this.$emit('handleMyClick',id,status)
    },
    openMyshareBox(id){
          console.log(id)
          this.openShare = true;
          this.config.url = 'http://192.168.0.9/#/share' + '?order_id='+id
          console.log(this.config.url)
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
