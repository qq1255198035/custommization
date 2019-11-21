<template>
  <div id="User">
    <!-- <span @click="noticeBtn" style="padding:10px;cursor: pointer;">
      <a-icon style="font-size: 30px; padding: 4px" type="bell" :style="{color: bellcolor}"/>
    </span> -->
    <!--<notice></notice>-->
    <a-popover
      v-model="visible"
      trigger="hover"
      placement="bottomRight"
      overlayClassName="header-notice-wrapper"
      :autoAdjustOverflow="true"
      :arrowPointAtCenter="true"
      :overlayStyle="{ width: '300px', top: '50px' }"
    >
    <template slot="content">
      <a-spin :spinning="loadding">
            <a-list>
              <a-list-item v-for="item in dataList.slice(0,5)" :key="item.id" @click="openMessageModel(item.title,item.content,item.id)" style="cursor: pointer;">
                <a-list-item-meta :title="item.title" :description="item.createtime | formatTime">
                  <!-- <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/> -->
                </a-list-item-meta>
              </a-list-item>
            </a-list>
      </a-spin>
      <div style="text-align:right;">
        <router-link to="/notice" style="color: #33b8b3;text-decoration: underline;">See All</router-link>
      </div>
    </template>
    <span @click="fetchNotice" class="header-notice" style="position: relative;">
      <a-icon style="font-size: 30px; padding: 4px;cursor: pointer;" type="bell" />
      <a-badge v-if="count" class="diount" :count="count" showZero :overflowCount="5"></a-badge>
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
    console.log(process.env.NODE_ENV)
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
    openMessageModel(title,content,id){
      this.$info({
        title: title,
        content: content,
        zIndex: 2000,
        okText: 'Close',
        onOk(){},
      });
      read(id).then(res => {
        console.log(res);
        if(res.code == 200){
          console.log(res)
        }
      })
    },
    initWebSocket(){                
      let token = this.$ls.get(ACCESS_TOKEN);
      let origin =  window.location.host;
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https   
      let url = process.env.NODE_ENV == 'production' ? 'ws://' + origin + '/jeecg-boot/sys/messages/' + token : 'ws://192.168.0.9:8080/jeecg-boot/sys/messages/' + token       
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
        console.log(e.data);  
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
      
      console.log("dddddddddd");
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
    onClick({ key }) {
      console.log(key);
      const that = this;
      this.$confirm({
        title: "Logout",
        content: "Confirm Logout？",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk() {
          that.Logout({}).then(() => {
            that.$router.push({path: '/'});
            window.location.reload()
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
                color: #33b8b3;
                font-size: 30px;
                padding: 4px;
                
            }
        }
        .header-notice{
            position: relative;
            .diount{
                position: absolute;
                top: -15px;
                right: 0px;
            }
        }
    }
  .header-notice {
    position: relative;
    .diount {
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
</style>