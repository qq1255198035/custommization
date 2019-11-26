<template>
  <div id="OrderItem">
    <div v-for="items in orderArr" :key="items.id">
      <div class="order-title">
        <p>
          <span>Order number:{{items.orderSn}}</span>
          <span>Order time:{{items.createTime | formatTime}}</span>
          <span>Order Deadline:{{items.payEndDate | formatTime}}</span>
          <span>Status:{{items.orderStatus | statusFilter1}}</span>
        </p>
        <hide-menu
          @handeDetelOrder="handeDetelOrder(items.id)"
          @handeCaleOrder="handeCaleOrder(items.id)"
          @myClick="checkOutDetails(items.id)"
          @myClick1="openMyshareBox(items)"
          @myClick2="goEditing(items.id)"
          @handelCommit="openDatebox(items.id)"
          :isEdit="items.orderStatus"
        ></hide-menu>
      </div>
      <div class="order-content">
        <div class="order-item" v-for="(item,index) in items.interiorList" :key="index + items.id">
          <div class="left">
            <div style="display: flex; align-items:center;">
              <img :src="item.positivePicUrl" v-preview="item.positivePicUrl" width="150" height="150" />
              <div class="desc">
                <h3>{{item.name}}</h3>
                <p>COLOUR:{{item.productColor}}</p>
              </div>
            </div>

            <div>
              <span style="margin-right: 20px;">{{item.buyNum}}/{{item.quantity}}</span>
              <span>Status:{{item.status | statusFilter}}</span>
            </div>
          </div>
          <div class="right">
            <commonBtn
              @btnClick="btnClick(item.id,item.status,item.type)"
              :width="'100%'"
              :title="item.type == 1 ? 'Check Status' : 'Confirm Draft'"
              :height="'32px'"
              :padding="'15px'"
              :radio="'12px'"
              :fontsize="'16px'"
            ></commonBtn>
          </div>
        </div>
      </div>
    </div>
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
    <a-modal
      :visible="openDate"
      @cancel="closeDateBox"
      @ok="commitDate"
      title="Share"
      forceRender
    >
    <div class="select-date">
      <a-date-picker
        @change="onClosingDate"
        :disabledDate="disabledDate"
        format="YYYY-MM-DD"
        style="margin-left: 30px;"
        @openChange="openhandleChange"
      >
        <template slot="dateRender" slot-scope="current, today">
          <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
            {{current.date()}}
          </div>
        </template>
        <template slot="renderExtraFooter">
          <div class="show-box">
            <p>
              <span>

              </span>
              生产日期
            </p>
            <p>
              <span style="background: rgba(255,0,0,0.5)">

              </span>
              加急日期
            </p>
          </div>
        </template>
      </a-date-picker>
    </div>
      
    </a-modal>
  </div>
</template>
<script>
import {getProductionTime,postProductionTim} from '@/api/seller';
import commonBtn from "@/components/commonBtn/commonBtn";
import HideMenu from "@/components/HideMenu/HideMenu";
import moment from "moment";
const statusMap = {
  "1": {
    text: "To Be Confirme"
  },
  "2": {
    text: "Confirmed"
  },
  "3": {
    text: "Design completed"
  },
  "4": {
    text: "Design completed"
  }
};
const statusMap1 = {
  "1": {
    text: "Submit Order"
  },
  "2": {
    text: "Confirm draft"
  },
  "3": {
    text: "Share purchase"
  },
  "4": {
    text: "In production"
  },
  "5": {
    text: "In Transit"
  },
  "6": {
    text: "Completed"
  },
  "7": {
    text: "Cancelled"
  },
  "8": {
    text: "Failed"
  },
  "9": {
    text: "Productive"
  }
};
export default {
  props: {
    orderArr: {
      type: Array
    }
  },
  data() {
    return {
      openShare: false,
      openDate: false,
      id: '',
      config: {
        url: "", // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "description", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
        //sites: ["facebook", "wechat", "weibo"], // 启用的站点
        sites: ["facebook", "wechat"],
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
        wechatQrcodeHelper: "Scan and share this article with friends."
      },
      timeover: '',
      maxDays: 10,
      minDays: 5,
      rate: ''
    };
  },
  components: {
    HideMenu,
    commonBtn
  },
  methods: {
    commitDate(){

    },
    openhandleChange(open){
      console.log(open)
      if(open){
        getProductionTime(this.id).then(res => {
          console.log(res);
          if(res.code == 200){
            this.maxDays = 55;
            this.minDays = 20;
            this.rate = res.result.rate;
          }
        })
      }
    },
    onClosingDate(date, dateString) {
      console.log(dateString);
      this.timeover = dateString;
    },
    disabledDate(current) {
      // add(a,b)第一个参数为添加的天数，从后台动态获取
      
      return current && current < moment().add(this.minDays, 'd');
    },
    getCurrentStyle(current, today) {
        let a = current.date() >= 10 ? current.date() : '0' + current.date();
        let b = today.date() >= 10 ? today.date() : '0' + today.date();
        let currentdate = moment().add(this.maxDays, 'd').date() >= 10 ? moment().add(this.maxDays, 'd').date() : '0' + moment().add(this.maxDays, 'd').date();
        let date =  moment().add(this.minDays, 'd').date() >= 10 ? moment().add(this.minDays, 'd').date() : '0' + moment().add(this.minDays, 'd').date();
        const style = {};
        if(current.year() >= today.year() && current.month() >= today.month()){
          if (current.year() + current.month().toString() + a <= moment().add(this.maxDays, 'd').year() + moment().add(this.maxDays, 'd').month().toString() + currentdate && current.year() + current.month().toString() + a > today.year() + today.month().toString() + b) {
            style.border = '1px solid #1890ff';
            style.borderRadius = '50%';
            style.width = '26px'
          }
          if(moment().add(this.minDays, 'd').year() + moment().add(this.minDays, 'd').month().toString() + date < current.year() + current.month().toString() + a && moment().add(this.maxDays, 'd').year() + moment().add(this.maxDays, 'd').month().toString() + currentdate >= current.year() + current.month().toString() + a){
            style.background = 'rgba(255,0,0,0.5)';
            style.color = '#fff';
            style.width = '26px'
          }
          return style;
        }
      },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    },
    openDatebox(id){
      this.id = id;
      this.openDate = true;
    },
    onCopy() {
      this.$message.success("Replication success");
    },
    onError() {
      this.$message.error("copy failed");
    },
    handeDetelOrder(id) {
      console.log("删除");
      this.$emit("childDelte", id);
    },
    handeCaleOrder(id) {
      console.log("取消");
      this.$emit("childCale", id);
    },
    goEditing(id) {
      this.$router.push({ path: "/orderdetails", query: { id: id } });
    },
    closeShareBox() {
      this.openShare = false;
    },
    closeDateBox() {
      this.openDate = false;
    },
    checkOutDetails(id) {
      this.$router.push({ path: "/myorder", query: { id: id } });
    },
    btnClick(id, status,type) {
      this.$emit("handleMyClick", id, status,type);
    },
    openMyshareBox(item) {
      console.log(item);
      this.openShare = true;
      this.config.url = window.location.origin + "/#/share" + "?order_id=" + item.id;
      this.config.image = item.interiorList[0].positivePicUrl;
    },
  
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text;
    },
    statusFilter1(type) {
      return statusMap1[type].text;
    },
    formatTime(time){
      if(time){
        let d = new Date(time);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset()*60000;   //getTimezoneOffset()返回是以分钟为单位，需要转化成ms
        let utc = localTime + localOffset;
        let offset = d.getTimezoneOffset() / 60; //以韩国时间为例，东9区
        let korean = utc + (3600000 * offset);
        let date = new Date(korean);
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let dr = date.getDate();  
        dr = dr < 10 ? ('0' + dr) : dr;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + dr +' '+ h +':'+ minute + ':' + second;  
      }else{
        return ' '
      }
    }
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
      flex-wrap: wrap;
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

.show-box{
  p{
    display: flex;
    align-items: center;
    span{
      width:20px;
      height: 20px;
      border-radius: 10px; 
      border: 1px solid #33b8b3;
      display: inline-block;
      margin-right: 10px;
    }
  }
}

</style>
