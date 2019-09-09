<template>
  <div id="OrderItem">
    <div v-for="items in orderArr" :key="items.id">
      <div class="order-title">
        <p>
          <span>订单Id:{{items.orderSn}}</span>
          <span>订单时间: {{items.createTime}}</span>
          <span>订单关闭时间： {{items.payEndDate}}</span>
        </p>
        <hide-menu @myClick="checkOutDetails(items.id)"></hide-menu>
      </div>
      <div class="order-content">
        <div class="order-item" v-for="(item,index) in items.interiorList" :key="index + items.id">
          <div class="left">
            <img src="@/assets/jaw.jpg" alt width="100" height="120" />
            <div class="desc">
              <h3>{{item.name}}</h3>
              <p>颜色： {{item.productColor}}</p>
            </div>
          </div>
          <div class="right">
            <span>{{item.buyNum}}/{{item.quantity}}</span>
            <span>状态： {{item.status}}</span>
            <commonBtn
              @btnClick="btnClick(item.id)"
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
  </div>
</template>
<script>
import commonBtn from "@/components/commonBtn/commonBtn";
import HideMenu from "@/components/HideMenu/HideMenu";
// const statusMap = {
//   1: {
//     status: "warning",
//     text: "团购中"
//   },
//   3: {
//     status: "success",
//     text: "设计中"
//   },
//   2: {
//     status: "processing",
//     text: "发货中"
//   }
// };
export default {
  props: {
    orderArr: {
      type: Array
    }
  },
  components: {
    HideMenu,
    commonBtn
  },
  methods: {
    checkOutDetails(id) {
      console.log(id);
      this.$router.push({ path: "/orderdetails", query: { id: id } });
    },
    btnClick(id) {
      this.$emit("handleMyClick", id);
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
      span {
        width: 33%;
        color: #33b8b3;
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
        width: 30%;
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
.share-box {
  padding: 30px;
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
