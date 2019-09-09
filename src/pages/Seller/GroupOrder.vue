<template>
  <div id="GroupOrder">
    <my-title :title="'团体订单'"></my-title>
    <ul class="input-box">
      <li>
        <a-button icon="plus" @click="$router.push({name: 'neworder'})">新建订单</a-button>
        <a-radio-group defaultValue="9" style="margin-left: 10px;" @change="changeStatus">
          <a-radio-button value="9">全部订单</a-radio-button>
          <a-radio-button value="2">已支付</a-radio-button>
          <a-radio-button value="0">未支付</a-radio-button>
        </a-radio-group>
      </li>
      <li>
        <div id="input-box">
          <input type="text" v-model="key" />
          <span @click="search">
            <a-icon type="search" />
          </span>
        </div>
      </li>
    </ul>
    <div class="content">
      <template v-if="orderList">
        <order-item :orderArr="orderList" @handleMyClick="openConfirmBox" style="margin-bottom: "></order-item>
      </template>
      <p v-else>暂无数据</p>
    </div>
    <div class="pagination-box">
      <a-pagination
        showQuickJumper
        :defaultCurrent="1"
        :total="totalnum"
        @change="onChange($event)"
        :pageSize="5"
      />
    </div>
    <a-modal v-model="modelShow" :footer="null" :centered="true" title="样稿确认" width="40%">
      <ul class="example-box">
        <li v-for="(item,index) in exList" :key="item.id">
          <h2>方案{{index + 1}}</h2>
          <div style="text-align: center;margin: 10px 0;">
            <span v-for="(img,index) in item.imgList" :key="index">
              <img :src="img" alt />
              <i v-if="index == 0" style="font-style: normal;">正面</i>
              <i v-if="index == 1" style="font-style: normal;">背面</i>
              <i v-if="index == 2" style="font-style: normal;">左面</i>
              <i v-if="index == 3" style="font-style: normal;">右面</i>
            </span>
          </div>
          <div v-if="item.checked" style="width: 70%;margin:20px auto;">
            <a-textarea v-model="texts" :autosize="{ minRows: 2, maxRows: 6 }" />
          </div>
          <div v-show="textshow">{{item.opinion}}</div>
          <a-button @click="textShowOne(item.id,index)" v-show="!item.opinion && !item.checked">添加描述</a-button>
          <a-button @click="textShowTwo(item.id,item.pic_id)" v-show="!item.opinion && item.checked">保存</a-button>
          <a-button @click="programmeBtn(item.id)" v-show="item.status == 0">选用此方案</a-button>
          <a-button @click="programmeBtn(item.id,item.pic_id)" v-show="item.status == 1" disabled="disabled">方案已选择</a-button>
        </li>

        <a-button @click="newSchemeBtn" type="primary">申请新方案</a-button>
      </ul>
    </a-modal>
  </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import OrderItem from "@/components/OrderItem/OrderItem";
import { groupOrderList, exampleConfirm, texts, programme, newScheme } from "@/api/seller";

export default {
  components: {
    MyTitle,
    OrderItem
  },
  data() {
    return {
        orderId: '',
        texts: "",
        orderList: [],
        inList: [],
        num: 1,
        status: 9,
        content: "",
        totalnum: 0,
        key: "",
        modelShow: false,
        textshow: true,
        exList: []
    };
  },
  methods: {
      newSchemeBtn() {
          const param = {
              orderId: this.orderId
          }
          newScheme(param).then(res => {
              console.log(res)
              if(res.code == 200) {
                  window.location.reload()
              } 
          })
      },
      programmeBtn(id) {
          const param = {
              designId: id
          }
          programme(param).then(res => {
              console.log(res)
              if(res.code == 200) {
                  window.location.reload()
              }
          })
      },
    textShowOne(id, index) {
      this.textshow = false;
      console.log(id, index);
      const newList = [...this.exList];
      const target = newList.find(item => item.id == id);
      target.checked = true;
      this.exList = newList;
      console.log(newList);
    },
    textShowTwo(id,pid) {
      const param = {
        opinion: this.texts,
        id: id
      };
      texts(param).then(res => {
        console.log(res);
        if (res.code == 200) {
          const newList = [...this.exList];
          const target = newList.find(item => item.id == id);
          target.checked = false;
          this.exList = newList;
          this.textshow = true;
          this.openConfirmBox(pid)
        }
      });
    },
    openConfirmBox(id) {
      this.modelShow = true;
      console.log(id);
      this.getExampleConfirm(id);
    },
    getExampleConfirm(id) {
      exampleConfirm(id).then(res => {
        console.log(res);
        this.exList = res.result;
        console.log(res.result.pic_id)
        this.orderId = res.result[0].pic_id
        
      });
    },
    search() {
      this.getGroupOrderList(1, this.status, this.key);
    },
    changeStatus(e) {
      console.log(e.target.value);
      this.status = e.target.value;
      this.getGroupOrderList(1, this.status, "");
    },
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
      this.num = pageNumber;
      this.getGroupOrderList(this.num, this.status, this.content);
    },
    getGroupOrderList(num, status, orderid) {
      groupOrderList(num, status, orderid).then(res => {
        console.log(res);
        this.orderList = res.records;
        this.totalnum = parseInt(res.total);
      });
    }
  },
  mounted() {
    console.log(this.totalnum);
  },
  created() {
    this.getGroupOrderList(this.num, this.status, this.content);
  }
};
</script>
<style lang="less">
@import "./../../components/index.less";
#GroupOrder {
  padding: 0 20px;
  height: 100%;

  padding-bottom: 70px;
  .input-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    li {
      display: flex;
      #input-box {
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        padding: 5px 10px;
        width: 250px !important;
        border: 1px solid #33b8b3 !important;
        input {
          border: none;
          outline: none;
          background-color: rgba(255, 255, 255, 0);
          padding: 0;
          width: calc(100% - 35px);
        }
        span {
          cursor: pointer;
          i {
            font-size: 25px;
            color: #33b8b3;
          }
        }
      }
    }
  }

  .content {
    margin-bottom: 30px;
    height: auto;
  }
  .pagination-box {
    display: flex;
    margin: 20px 0;
    justify-content: flex-end;
  }
}
.example-box {
  padding: 20px;
  max-height: 710px;
  overflow-y: scroll;
  text-align: center;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*宽分别对应竖滚动条的尺寸*/
    /*高分别对应横滚动条的尺寸*/
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #33b8b3;
    border-radius: 4px;
    height: 10%;
  }
  > button {
    margin-top: 20px;
  }
  li {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #33b8b3;
    button {
      margin: 10px;
    }
    h2 {
      font-size: 16px;
      color: #33b8b3;
      text-align: left;
    }
    > div {
      span {
        display: inline-block;
        margin: 0 10px;
        width: 20%;
        text-align: center;
        border: 1px solid #ccc;
        color: #33b8b3;
        padding: 10px;
      }
      img {
        width: 100%;
      }
    }
    p {
      text-align: center;
      font-size: 14px;
      color: #999;
      margin: 20px 0;
    }
  }
}
</style>