<template>
  <div class="wrapper-design">
    <div class="wrapper-box">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <a-table :columns="columns" :dataSource="dataDesign" :rowSelection="rowSelection">
        <div slot="positivePicUrl" slot-scope="text">
          <div v-for="item in text" :key="item.index">
            <img :src="item" alt />
          </div>
        </div>
        <template slot="action">
          <a-button>编辑</a-button>
          <a-button>删除</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import User from "@/components/Header/User";
import img from "@/assets/black.jpg";
const columns = [
  {
    title: "图片",
    dataIndex: "positivePicUrl",
    scopedSlots: { customRender: "positivePicUrl" },
    key: "positivePicUrl"
  },
  {
    title: "商品信息",
    dataIndex: "goosInfo",
    key: "goosInfo",
    width: "12%"
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    width: "30%",
    key: "action"
  }
];

const dataDesign = [
  {
    key: 1,
    positivePicUrl: [img],
    goosInfo: "短袖"
  },
  {
    key: 2,
    positivePicUrl: [img],
    goosInfo: "短袖"
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};

export default {
  data() {
    return {
      dataDesign,
      columns,
      rowSelection
    };
  },
  components: {
    User
  }
};
</script>
<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
.wrapper-design {
  width: 100%;
  padding: 40px;
  .wrapper-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #33b8b3;
      padding: 30px;
      p:nth-child(1) {
        color: #33b8b3;
        font-size: 60px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
