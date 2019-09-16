<template>
  <div class="wrapper-design">
    <div style="position: relative; height: 100%">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <div class="wrapper-box">
      
      <div style="padding: 30px;">
        <a-table :columns="columns" :dataSource="dataDesign" :rowSelection="rowSelection" :pagination="false">
          <div slot="positivePicUrl" slot-scope="text" style="display: flex;">
            <div v-for="item in text" :key="item.index" style="width: 25%;">
              <img :src="item" alt style="width: 100%;"/>
            </div>
          </div>
          <div slot="goodsInfo" slot-scope="text" style="display: flex;">
            <div style="width: 100%;">
              <h2>{{text.title}}</h2>
              <p>COLOUR:{{text.color}}</p>
            </div>
          </div>
          <template slot="action" slot-scope="text,record">
            <a-button style="margin-right: 10px;" @click="editDesign(text,record)">Edit</a-button>
            <a-button @click="delDesign(text,record)">Delete</a-button>
          </template>
        </a-table>
      </div>
      <div style="text-align: center; padding: 20px 0;">
        <a-button type="primary" icon="plus" @click="$router.push({path: '/neworder'})">ADDING DESIGN</a-button>
        <a-button style="margin-left: 10px;" @click="posteDesignList(idArr)">Submit </a-button>
      </div>
    </div>
    </div>
    
  </div>
</template>
<script>
import User from "@/components/Header/User";
import { designList,updateShow,delDesignList,handleDesignList } from "@/api/seller"
const columns = [
  {
    title: "Image",
    dataIndex: "positivePicUrl",
    scopedSlots: { customRender: "positivePicUrl" },
    key: "positivePicUrl",
    width: "60%"
  },
  {
    title: "Product Information",
    dataIndex: "goodsInfo",
    scopedSlots: { customRender: "goodsInfo" },
    key: "goodsInfo",
    width: "30%"
  },
  {
    title: "Active",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    width: "10%",
    key: "action"
  }
];


let idArr = [];
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
    idArr.push(record.key)
    console.log(idArr)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};

export default {
  data() {
    return {
      dataDesign:[],
      columns,
      rowSelection,
      list:[],
      idArr
    };
  },
  components: {
    User
  },
  mounted(){
    this.getDesignList();
  },
  methods:{
    editDesign(a,b){
      console.log(a,b)
      updateShow(b.id).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$router.push({path:'/neworder', query:{res: res.result,show: true}})
        }
        // 
      })
    },
    delDesign(a,b){
      console.log(a,b)
      let that = this;
      that.$confirm({
        title: "Delete",
        content: "Do you confirm deletion?",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk() {
            delDesignList(b.key).then(res => {
              console.log(res)
              if(res.code == 200){
                that.getDesignList();
              }
            })
        },
        onCancel() {}
      });
      
    },
    getDesignList(){
      designList().then(res => {
        console.log(res)
        this.dataDesign = res.result;
      })
    },
    posteDesignList(id){
      console.log(id)
      if(id.length > 0){
        handleDesignList(id.join(',')).then(res => {
          console.log(res)
          console.log(id)
          if(res.code == 200){
            this.$router.push({path: '/orderres'})
          }
        })
      }else{
        this.$message.error('Please select at least one order.')
      }
      
    }
    
  }
};
</script>
<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
.wrapper-design {
  width: 100%;
  height: 100%;
  padding: 40px;
  
  header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #33b8b3;
      padding: 30px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #fff;
      z-index: 999;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      p:nth-child(1) {
        color: #33b8b3;
        font-size: 60px;
        margin-bottom: 0;
      }
    }
  .wrapper-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    padding-top: 139px;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {  /*滚动条整体样式*/
        width: 6px;  /*宽分别对应竖滚动条的尺寸*/
        /*高分别对应横滚动条的尺寸*/
        background-color: #33b8b3;
        
    }
    &::-webkit-scrollbar-thumb {
        background-color: #33b8b3;
        border-radius:4px;
        height: 10%;
    }
    
  }
}
</style>
