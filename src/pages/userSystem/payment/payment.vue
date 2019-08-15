<template>
  <div class="share">
    <div class="share-box">
      <sys-header></sys-header>
      <div class="step">流程进度</div>
      <my-stpes :mycurrent="1">
        <p slot="p1">选择尺码</p>
        <p slot="p2">确认支付</p>
        <p slot="p3">等待开团</p>
        <p slot="p4">完成</p>
      </my-stpes>
      <my-title :title="itemTitle"></my-title>
      <a-row :gutter="32">
        <!--list1-->
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <table-item :data="img1"></table-item>
          <table-list :columns="columns" :data="data"></table-list>
        </a-col>
        <!--list2-->
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <table-item :data="img2"></table-item>
          <table-list :columns="columns1" :data="data1"></table-list>
        </a-col>
      </a-row>
      <my-title :title="payTitle"></my-title>
      <div class="payment">
        <a-row>
          <!--list1-->
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="pay-title">支付方式:</span>
            <a-radio-group @change="onChange" v-model="value">
              <a-radio :value="1">
                <img src="@assets/paypal.png" alt />
              </a-radio>
              <a-radio :value="2">
                <img src="@assets/weixin.png" alt />
              </a-radio>
            </a-radio-group>
          </a-col>
          <!--list2-->
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <ul class="pay-list">
              <li>
                <h3>商品金额：</h3>
                <p>$2000</p>
              </li>
              <li>
                <h3>商品金额：</h3>
                <p>$2000</p>
              </li>
              <li style="border-bottom:solid 1px #fff;">
                <h3>商品金额：</h3>
                <p>$2000</p>
              </li>
              <li style="padding-top:10px">
                <h3>商品金额：</h3>
                <p>$2000</p>
              </li>
            </ul>
          </a-col>
        </a-row>
      </div>
      <!--支付-->
      <div class="paynum">
        <div class="left">
          <p>总价</p>
          <h2>$5000</h2>
        </div>
        <div class="right">
          <a-button icon="dollar" size="large">立即支付</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MyStpes from "@/components/MyStpes/MyStpes";
import SysHeader from "@/components/SysHeader/SysHeader";
import MyTitle from "@/components/MyTitle/MyTitle";
import TableItem from "@/components/TableItem/TableItem";
import TableList from "@/components/TableList/TableList";
//import MyTable from "@/components/MyTable/MyTable";
export default {
  props: {},
  data() {
    return {
      value: 1,
      itemTitle: "订单信息",
      payTitle: "支付信息",
      img1: {
        img: [
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg",
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg"
        ]
      },
      img2: {
        img: [
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg",
          "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190603/1405508244cff9.jpg"
        ]
      },
      data: [
        {
          key: "1",
          name: "John Brown",
          money: "￥300,000.00",
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          money: "￥1,256,000.00",
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney No. 1 Lake Park"
        }
      ],
      data1: [
        {
          key: "1",
          name: "John Brown",
          money: "￥300,000.00",
          address: "New York No. 1 Lake Park",
          num: 42
        },
        {
          key: "2",
          name: "Jim Green",
          money: "￥1,256,000.00",
          address: "London No. 1 Lake Park",
          num: 42
        },
        {
          key: "3",
          name: "Joe Black",
          money: "￥120,000.00",
          address: "Sidney No. 1 Lake Park",
          num: 42
        }
      ],
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Cash Assets",
          className: "column-money",
          dataIndex: "money"
        },
        {
          title: "Address",
          dataIndex: "address"
        }
      ],
      columns1: [
        {
          title: "Name",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Cash Assets",
          className: "column-money",
          dataIndex: "money"
        },
        {
          title: "Address",
          dataIndex: "address"
        },
        {
          title: "Num",
          dataIndex: "num"
        }
      ]
    };
  },
  computed: {},
  created() {
    
  },
  mounted() {},
  watch: {},
  methods: {
   
    onChange(e) {
      console.log("radio checked", e.target.value);
    }
  },
  components: {
    MyTitle,
    SysHeader,
    TableItem,
    MyStpes,
    TableList
  }
};
</script>

<style scoped lang="less">
.share {
  width: 100%;
  height: 100%;
 
  .share-box {
     background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
    padding: 0px 40px;
    .step {
      padding: 16px 0;
    }
    .payment {
      margin-top: 26px;
      overflow: hidden;
      .pay-title {
        padding-right: 10px;
      }
      .pay-list {
        li {
          overflow: hidden;
          padding-bottom: 10px;
          h3 {
            float: left;
            color: #fff;
          }
          p {
            float: right;
          }
        }
      }
      img {
        width: 140px;
        height: auto;
      }
    }
    .paynum {
      border-top: solid 1px #ffffff;
      overflow: hidden;
      padding: 20px 0;
      .left {
        float: left;
        h2{
          color: #fff;
        }
      }
      .right {
        float: right;
        .ant-btn {
        }
      }
    }
  }
}
</style>
