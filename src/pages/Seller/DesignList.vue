<template>
  <div class="wrapper-design">
    <div style="position: relative; height: 100%">
      <my-title :title="'Design List'" :fontsize="20" style="padding: 0 20px;">
          <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
      </my-title>
      <div class="wrapper-box">
        <div style="padding: 30px;">
          <a-table :columns="columns" :dataSource="dataDesign" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="false">
            <div slot="positivePicUrl" slot-scope="text" style="display: flex;">
              <div v-for="item in text" :key="item.index" style="width: 25%;">
                <img :src="item" style="width: 100%;" v-preview="item"/>
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
          <a-button type="primary" icon="plus" @click="goNewOrder">ADDING DESIGN</a-button>
          <a-button style="margin-left: 10px;" @click="posteDesignList(selectedRowKeys)">Submit </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { designList,updateShow,delDesignList,handleDesignList,queryByIdA } from "@/api/seller"
import MyTitle from '@/components/MyTitle/MyTitle'
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
    width: "20%"
  },
  {
    title: "Active",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    width: "20%",
    key: "action"
  }
];
export default {
  data() {
    return {
      dataDesign:[],
      columns,
      list:[],
      selectedRowKeys: [],
    };
  },
  components: {
    MyTitle
  },
  mounted(){
    this.getDesignList();
  },
  methods:{
    goNewOrder(){
        queryByIdA().then(res => {
          console.log(res)
          if(res.code == 0){
            if(res.result == 1){
              this.$router.push({path:'/neworder'});
            }else if(res.result == 0){
              let that = this;
              this.$error({
                title: 'Error',
                content: 'Sorry,Not examined and approved,Please go to the account settings page to apply.',
                onOk() {
                  console.log(11);
                  that.$router.push({path: '/dealerInfo'})
                },
              });
            }else if(res.result == 2){
              let that = this;
              this.$error({
                title: 'Error',
                content: 'Sorry,Failure to pass the examination and approval',
                onOk() {
                  console.log(11);
                  that.$router.push({path: '/dealerInfo'})
                },
              });
            }else if(res.result == 3){
              let that = this;
              this.$error({
                title: 'Error',
                content: 'Sorry, please apply first.',
                onOk() {
                  console.log(11);
                  that.$router.push({path: '/dealerInfo'})
                },
              });
            }
          }
        })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    editDesign(a,b){
      console.log(a,b)
      updateShow(b.id).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$router.push({path:'/neworder', query:{res: res.result,show: true}})
        }
      })
    },
    delDesign(a,b){
      console.log(a,b)
      let that = this;
      that.$confirm({
        title: "Delete",
        content: "Are you sure to delete?",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk() {
            delDesignList(b.key).then(res => {
              console.log(res)
              if(res.code == 200){
                that.getDesignList();
                if(that.selectedRowKeys.indexOf(b.key) >= 0){
                  that.selectedRowKeys.splice(that.selectedRowKeys.indexOf(b.key),1)
                }
              }
            })
        },
        onCancel() {}
      });
      
    },
    getDesignList(){
      designList().then(res => {
        this.dataDesign = res.result;
      })
    },
    posteDesignList(id){
      console.log(id.join(','))
      if(id.length > 0){
        handleDesignList(id.join(',')).then(res => {
          console.log(res)
          console.log(id)
          if(res.code == 200){
            this.getDesignList();
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
  }
}
</style>
