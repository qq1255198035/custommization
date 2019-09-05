<template>
  <div>
      <div class="layout-box">
        <div class="content">
          <my-title :title="itemTitles" :fontsize="24"></my-title>
          <person-list @search="getSearch" @page="getPage" @radios="getRadios" :listData="listData" :listFrom="listFrom"></person-list>
        </div>
      </div>
    <div>
      <a-button class="open-btn" type="primary" @click="showDrawer" icon="bars"></a-button>
      <a-drawer
       
        placement="left"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <commonHeader></commonHeader>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import {orders} from '@/api/system'
import MyTitle from "@/components/MyTitle/MyTitle";
import PersonList from "@/components/PersonList/PersonList";
import commonHeader from "@/components/commonHeader/commonHeader";
import SysHeader from "@/components/SysHeader/SysHeader";

export default {
  props: {},
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      itemTitles: "个人订单",
      visible: false,
      listData: [],
      listFrom: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
      status: '',
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  },
  computed: {},
  created() {
    this._orders()
  },
  mounted() {},
  watch: {},
  methods: {
    getRadios(data) {
      this.status = data;
      this._orders()
    },
    getPage(data, data1) {
      this.pageNo = data
      this.pageSize = data1
      this._orders()
    },
    getSearch(dataSear) {
      this.search = dataSear;
      this._orders()
    },
    _orders() {
      const param = {
        token: this.$ls.get('token'),
        pay_status: this.status,
        condition :this.search,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      console.log(param)
      orders(param).then(res => {
        console.log(res)
        this.listData = res.result.personalOrdersList
        this.listFrom = res.result.personalOrdersParentList
      })
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  },
  components: {
    commonHeader,
    PersonList,
    MyTitle
  }
};
</script>

<style lang="less">
.ant-drawer-content{
    background-color: #868686 !important;
}
.share {
    .layout-box {
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
  .open-btn{
      position: fixed;
      top: 20%;
      left: 0;
      color: #000 !important;
  }
}
@media screen and(max-width: 760px) {
  .block {
    display: none;
  }
  .open-btn{
      display: block;
  }
}
@media screen and(min-width: 760px) {
  .block {
    display: block;
  }
  .open-btn{
      display: none;
  }
}
</style>
