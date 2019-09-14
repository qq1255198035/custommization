<template>
  <div>
    <div class="search-wrapper">
      <div class="left">
        <a-radio-group @change="onChange" v-model="value">
          <a-radio-button value="">全部订单</a-radio-button>
          <a-radio-button value="2">已支付</a-radio-button>
          <a-radio-button value="0">未支付</a-radio-button>
        </a-radio-group>
      </div>
      <div class="right">
        <a-input-search @search="onSearch"></a-input-search>
      </div>
    </div>
    <div class="list" v-for="item in listData" :key="item.index">
      <a-row class="list-title">
        <a-col :xs="24" :sm="6" :md="5">
          <p>订单号：{{item.order_sn}}</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="5">
          <p>订单时间：{{item.confirm_time}}</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="5">
          <p>联系商家：{{item.contact}}</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="5">
          <p>状态：{{item.pay_status | status}}</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="4">
          <p class="list-last" v-if="item.pay_status == 0">
            <commonBtn
              :float="'right'"
              :width="'86px'"
              :title="'去付款'"
              :height="'34px'"
              :padding="'15px'"
              :radio="'6px'"
              :fontsize="'14px'"
              @toAlginPay="toAlginPay(item.user_order_id)"
            ></commonBtn>
          </p>
          <p class="list-last" v-if="item.pay_status == 3">
            <commonBtn
              :float="'right'"
              :width="'80px'"
              :title="'退款'"
              :height="'34px'"
              :padding="'15px'"
              :radio="'6px'"
              :fontsize="'14px'"
              @checkDetail="checkDetail(item.user_order_id)"
            ></commonBtn>
          </p>
        </a-col>
      </a-row>
      <ul class="list-item">
        <li v-for="items in item.interiorList" :key="items.index">
          <div class="listCol">
            <div class="avatar">
              <img :src="items.positive_pic_url" alt />
              <div class>
                <h3>{{items.name}}</h3>
                <div class="desc">
                  <p>颜色：蓝色</p>
                  <p>尺码：{{items.size}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="listCol" v-if="items.print_name">
            <p class="list-p">名称：{{items.print_name}}</p>
          </div>
          <div class="listCol" v-if="items.print_number">
            <p class="list-p">号码：{{items.print_number}}</p>
          </div>
          <div class="listCol">
            <p class="list-p">数量：{{items.quantity}}</p>
          </div>
          <div class="listCol">
            <p class="list-p" style="border: none;">合计：${{items.total_price}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="pages">
      <a-pagination
        @showSizeChange="changeSize"
        @change="changeTotal"
        size="large"
        :pageSize="pageSize"
        :total="total"
        showSizeChanger
        showQuickJumper
      />
    </div>
  </div>
</template>
<script>
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  props: {
    listData: {
      type: Array
    },
    total:{}
  },
  components: {
    commonBtn
  },
  data() {
    return {
      status: "",
      seacher: "",
      pageSize: 10,
      pagination: {
        onChange: page => {
          console.log(page);
        }
      },
      value: '',
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  },
  created() {
    
  },
  filters: {
    status(data) {
      console.log(data);
      switch (data) {
        case 0:
          return "待付款";
        case 1:
          return "付款中";
        case 2:
          return "已付款";
        case 3:
          return "已退款";
      }
      /*switch (data) {
        case 0:
          return "待付款";
        case 101:
          return "订单已取消";
        case 102:
          return "订单已删除";
        case 201:
          return "订单已付款";
        case 300:
          return "订单已发货";
        case 301:
          return "用户确认收货";
        case 401:
          return "退款";
        case 402:
          return "完成";
      }*/
    }
  },
  methods: {
    toAlginPay(id) {
      console.log(id);
      this.$router.push({
        path: "/payment",
        query: {
          user_order_id: id
        }
      });
    },
    checkDetail() {},
    onSearch(value) {
      console.log(value);
      this.seacher = value;
      this.$emit("search", this.seacher);
    },
    onChange(e) {
      console.log(e.target.value);
      this.value = e.target.value;
      this.$emit("radios", this.value);
    },
    /*filterItems(a, b) {
      return a.filter(item => {
        return item.pid == b;
      });
    },*/
    changeSize(current, size) {
      console.log(current, size);
      this.pageSize = size
      this.$emit("page", current, size);
    },
    changeTotal(page,pageSize) {
      console.log(page,pageSize);
      this.$emit("page", page, pageSize);
    }
  }
};
</script>
<style lang="less">
.ant-select-selection {
  background: rgba(255, 255, 255, 0.5);
}
.pages {
  text-align: right;
  padding: 20px 0;
}
/*.ant-pagination {
  float: right;
  padding: 16px;
}*/
.search-wrapper {
  overflow: hidden;
  padding: 14px 0;
  .left {
    float: left;
    padding: 10px 0;
  }
  .right {
    float: right;
    padding: 10px 0;
  }
}
.list {
  .list-title {
    border-bottom: solid 1px #eee;
    padding: 10px 0;
    .list-last {
      text-align: right;
    }
  }
  .list-item {
    li {
      border-bottom: solid 1px #eee;
      padding: 10px 0;
      overflow: hidden;
      .listCol {
        float: left;
        width: 20%;
        .avatar {
          display: flex;

          justify-content: center;
          align-content: center;
          align-items: center;
          border-right: solid 1px #eee;
          h3 {
            color: #ffffff;
          }
          img {
            width: 120px;
            height: 120px;
            padding-right: 10px;
          }
          .desc {
            vertical-align: bottom;
            padding-top: 10px;
          }
        }
      }

      .list-p {
        text-align: center;
        border-right: solid 1px #eee;
        line-height: 120px;
      }
      .list-last {
        text-align: right;
        width: 100%;
      }
    }
  }
}
.ant-input-search-icon {
  color: #33b8b3 !important;
}
@media screen and(max-width: 760px) {
  .list-last {
    text-align: left;
  }
  .search-wrapper {
    .right {
      float: left;
    }
  }
}
</style>
