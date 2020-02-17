<template>
  <div class="user-container">
    <div class="layout-box" v-if="mobileShow">
      <div class="content">
        <my-title :title="itemTitles" :fontsize="24"></my-title>
        <person-list
          @search="getSearch"
          @page="getPage"
          @radios="getRadios"
          :listData="listData"
          :total="total"
        ></person-list>
      </div>
    </div>
    <div class="mobile-layout-box" v-else>
      <div class="title">
        Order List
      </div>
      <div class="mobile-container">
        <a-tabs defaultActiveKey="1" @change="callback" size="small">
          <a-tab-pane tab="All" key="1">
            <div class="tab-box">
              <div class="header">
                <a-input-search @search="getSearch"></a-input-search>
              </div>
              <ul class="card-box">
                <li v-for="item in listData" :key="item.index">
                  <h2>Order Number：{{item.order_sn}}</h2>
                  <p>Order time：{{item.confirm_time | formatTime}}</p>
                  <p>Contact Seller：{{item.contact}} Status：{{item.pay_status | status}}</p>
                  <div v-for="items in item.interiorList" :key="items.index">
                    <img :src="items.positive_pic_url" v-preview="items.positive_pic_url"/>
                    <div>
                      <h3 style="color:#33b8b3">{{items.name}}</h3>
                      <div class="desc">
                        <p>Color：{{items.color}},SIZE：{{items.size}}</p>
                        <p class="list-p">
                          <span v-if="items.print_name">
                            Name：{{items.print_name}}
                          </span>
                          <span v-if="items.print_name && items.print_number">
                            ,
                          </span>
                          <span v-if="items.print_number">
                            Number：{{items.print_number}}
                          </span>
                        </p>
                        <p class="list-p">Quantity：{{items.quantity}}</p>
                        <p class="list-p" style="border: none;">Total：${{items.total_price}}</p>
                      </div>
                    </div>
                  </div>
                  <div style="padding: 10px 0 0;margin: 0;display:flex;justify-content: flex-end;" v-if="item.pay_status == 0">
                    <a-button type="primary" @click="toAlginPay(item.user_order_id)" size="small">Proceed to Payment</a-button>
                  </div>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="Paid Quantity" key="2" forceRender>
            <div class="tab-box">
              <div class="header">
                <a-input-search @search="getSearch"></a-input-search>
              </div>
              <ul class="card-box">
                <li v-for="item in listData" :key="item.index">
                  <h2>Order Number：{{item.order_sn}}</h2>
                  <p>Order time：{{item.confirm_time | formatTime}}</p>
                  <p>Contact Seller：{{item.contact}} Status：{{item.pay_status | status}}</p>
                  <div v-for="items in item.interiorList" :key="items.index">
                    <img :src="items.positive_pic_url" v-preview="items.positive_pic_url"/>
                    <div>
                      <h3 style="color:#33b8b3">{{items.name}}</h3>
                      <div class="desc">
                        <p>Color：{{items.color}},SIZE：{{items.size}}</p>
                        <p class="list-p">
                          <span v-if="items.print_name">
                            Name：{{items.print_name}}
                          </span>
                          <span v-if="items.print_name && items.print_number">
                            ,
                          </span>
                          <span v-if="items.print_number">
                            Number：{{items.print_number}}
                          </span>
                        </p>
                        <p class="list-p">Quantity：{{items.quantity}}</p>
                        <p class="list-p" style="border: none;">Total：${{items.total_price}}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="Pending" key="0">
            <div class="tab-box">
              <div class="header">
                <a-input-search @search="getSearch"></a-input-search>
              </div>
              <ul class="card-box">
                <li v-for="item in listData" :key="item.index">
                  <h2>Order Number：{{item.order_sn}}</h2>
                  <p>Order time：{{item.confirm_time | formatTime}}</p>
                  <p>Contact Seller：{{item.contact}} Status：{{item.pay_status | status}}</p>
                  <div v-for="items in item.interiorList" :key="items.index">
                    <img :src="items.positive_pic_url" v-preview="items.positive_pic_url"/>
                    <div>
                      <h3 style="color:#33b8b3">{{items.name}}</h3>
                      <div class="desc">
                        <p>Color：{{items.color}},SIZE：{{items.size}}</p>
                        <p class="list-p">
                          <span v-if="items.print_name">
                            Name：{{items.print_name}}
                          </span>
                          <span v-if="items.print_name && items.print_number">
                            ,
                          </span>
                          <span v-if="items.print_number">
                            Number：{{items.print_number}}
                          </span>
                        </p>
                        <p class="list-p">Quantity：{{items.quantity}}</p>
                        <p class="list-p" style="border: none;">Total：${{items.total_price}}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { orders } from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import PersonList from "@/components/PersonList/PersonList";


export default {
  props: {},
  data() {
    return {
      mobileShow: false,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      itemTitles: "Your Orders",
      visible: false,
      listData: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 0
      },
      status: "",
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  },
  computed: {},
  created() {
    this._orders();
    this.getWindowScreen();
  },
  mounted() {},
  watch: {},
  methods: {
    toAlginPay(id) {
      this.$router.push({
        path: "/payment",
        query: {
          user_order_id: id
        }
      });
    },
    callback (key) {
      this.status = key == 1 ? '' : key;
      this._orders();
    },
    getWindowScreen(){
      let screenWidths = window.screen.width;
      if(screenWidths > 768){
        this.mobileShow = true;
      }else{
        this.mobileShow = false;
      }
    },
    getRadios(data) {
      this.status = data;
      this._orders();
    },
    getPage(data, data1) {
      this.pageNo = data;
      this.pageSize = data1;
      this._orders();
    },
    getSearch(dataSear) {
      this.search = dataSear;
      this._orders();
    },
    _orders() {
      const param = {
        pay_status: this.status,
        condition: this.search,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      orders(param).then(res => {
        
        this.listData = res.records;
        this.total = res.total
      });
    }
  },
  filters: {
    status(data) {
      switch (data) {
        case 0:
          return "Awaiting for Payment";
        case 1:
          return "Processing Payment";
        case 2:
          return "Paid";
        case 3:
          return "Refunded";
      }
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
  
  },
  components: {
    PersonList,
    MyTitle
  }
};
</script>

<style lang="less">
.ant-drawer-content {
  background-color: #868686 !important;
}

.layout-box {
  padding: 20px;
  display: flex;
  .menu {
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 120px;
    width: 200px;
  }
  .content {
    flex: 1;
  }
}
.open-btn {
  position: fixed;
  top: 20%;
  left: 0;
  color: #000 !important;
}

@media screen and(max-width: 760px) {
  .block {
    display: none;
  }
  .open-btn {
    display: block;
  }
}
@media screen and(min-width: 760px) {
  .block {
    display: block;
  }
  .open-btn {
    display: none;
  }
}
@media screen and (max-width: 768px) and (min-width: 325px){
  .user-container{
    width: 100%;
    height: 100%;
    .mobile-layout-box{
      width: 100%;
      height: 100%;
      background-color: #fff;
      .tab-box{
        .header{
          padding: 0 20px;
          input{
            border-radius: 20px;
          }
        }
        .card-box{
          background-color: #f1f1f1;
          padding: 10px;
          margin-top: 20px;
          margin-bottom: 0;
          li{
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 10px;
            margin: 10px 0;
            h2{
              font-size: 14px;
            }
            img{
              width: 100px;
              height: 100px;
              border: 1px solid #ccc;
              padding: 5px;
            }
            > div{
              display: flex;
              padding: 10px 0;
              align-items: center;
              border-top: 1px solid #ccc;
              margin: 10px;
              > div{
                margin-left: 10px;
                h3{
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
      }
      .title{
        height: 40px;
        width: 100%;
        background-color: #33b8b3;
        color: #fff;
        line-height: 40px;
        text-align: center;
      }
    }
    .ant-tabs-nav-scroll{
      display: flex;
      justify-content: center;
    }
  }
}
</style>
