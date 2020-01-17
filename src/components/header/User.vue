<template>
  <div id="User">
    <a-popover
      v-model="visible"
      trigger="hover"
      placement="bottomRight"
      overlayClassName="user-notice-wrapper"
      :autoAdjustOverflow="true"
      :arrowPointAtCenter="true"
      :overlayStyle="{ width: '350px', top: '50px' }"
    >
    <template slot="content">
      <a-spin :spinning="loadding">
            <a-list>
              <a-list-item v-for="item in dataList.slice(0,5)" :key="item.id" @click="openMessageModel(item.title,item.content,item.id,item.order_id,item.type)" style="cursor: pointer;">
                <a-list-item-meta :description="item.content">
                  <p slot="title">{{item.title}} <span style="font-size: 12px;color:#999;margin-left: 20px;font-weight: normal;">{{ item.createtime | formatTime }}</span></p>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
      </a-spin>
      <div style="text-align:right;">
        <router-link to="/notice" style="color: #33b8b3;text-decoration: underline;">See All</router-link>
      </div>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-icon type="bell" :style="{color: bellcolor}" />
      <a-badge v-if="count" class="diount" :count="count" showZero :overflowCount="5">
        
      </a-badge>
    </span>
  </a-popover>
    <span>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <a-icon type="user" :style="{color: usercolor}"/>
        </a>
        <a-menu slot="overlay" @click="onClick">
          <a-menu-item key="1"><a-icon type="logout" />Logout</a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <span></span>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { read } from '@/api/seller'
//import notice from '@/components/notice/notice'
export default {
  data() {
    return {
      count: 0,
      visible: false,
      loadding: false,
      dataList:[]
    };
  },
  props:{
    bellcolor:{
      default: '#33b8b3'
    },
    usercolor:{
      default: '#33b8b3'
    }
  },
  components: {
      //notice
  },
  created() {
    this.initWebSocket();
  },
  destroyed(){
    this.websocketclose(); 
  },
  filters: {
    formatTime(time){
      if(time){
        let d = new Date(time);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset()*60000;
        let utc = localTime + localOffset;
        let offset = d.getTimezoneOffset() / 60;
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
  },
  methods: {
    ...mapActions(["Logout"]),
    openMessageModel(title,content,id,order_id,type){
      let that = this;
      that.$confirm({
        title: title,
        content: content,
        zIndex: 2000,
        okButtonProps:{
          props: {disabled: order_id == 0}
        },
        okText: '查看',
        cancelText: '关闭',
        onOk(){
          if(type == 0){
            that.$router.push({path: '/myorder',query:{id: order_id}})
          }else{
            that.$router.push({path: '/specification',query:{orderId: order_id}})
          }
        },
      });
      read(id).then(res => {
        if(res.code == 200){
          //console.log('w')
        }
      })
    },
    initWebSocket(){                
      let token = this.$ls.get(ACCESS_TOKEN);
      let origin =  window.location.host;
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https   
      let url = process.env.NODE_ENV == 'production' ? 'wss://' + origin + '/jeecg-boot/sys/messages/' + token : 'ws://192.168.0.128:8080/jeecg-boot/sys/messages/' + token       
      this.websock = new WebSocket(url); 
			this.websock.onopen = this.websocketonopen;                
			this.websock.onerror = this.websocketonerror;                
			this.websock.onmessage = this.websocketonmessage;                
			this.websock.onclose = this.websocketclose;              
		},              
		websocketonopen() {                
			console.log("WebSocket连接成功");              
		},              
		websocketonerror(e){                
			console.log(e,"WebSocket连接发生错误");              
		},              
		websocketonmessage(e){                  
        this.dataList = JSON.parse(e.data); 
        this.count = this.dataList.length; 
		},              
		websocketclose(e){                
			console.log("connection closed (" + e + ")");              
		},              
		getWebsocket(){                
			// let url = "http://localhost:8185/api/teachStf/import?shipId=DPS007"                
			// // 这里只是一个基于axios的ajax请求，你可以换成你的请求格式                
      // this.$ajax.get(url)   
		}, 
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        this.visible = false
        setTimeout(() => {
          this.loadding = false
        },100)
      }else{
        this.loadding = false
      }
      this.visible = !this.visible
    },
    noticeBtn() {
      this.$router.push({
        path: '/notice'
      })
    },
    onClick() {
      //console.log(key);
      const that = this;
      this.$confirm({
        title: "Logout",
        content: "Confirm Logout？",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk() {
          that.Logout({}).then(() => {
            that.$router.push({name: 'home'});
            setTimeout(() => {
              window.location.reload();
            },10)
          });
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style lang="less" scope>
#User{
  text-align: right;
  padding: 20px 0;
  > span{
    margin: 0 10px;
    i{
      font-size: 30px;
      padding: 4px;  
      cursor: pointer;
      }
  }
  .header-notice{
    position: relative;
    .diount{
      position: absolute;
      top: -15px;
      right: 0px;
      .ant-scroll-number-only > p{
        width: 10px;
      }
    }
  }
}
.user-notice-wrapper{
  .ant-list-item-meta-description{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 90%;
  }
}
</style>