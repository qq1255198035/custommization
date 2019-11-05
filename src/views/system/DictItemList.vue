<template>
  <div id="DictItemList">
    <my-title :title="'商品类别'"></my-title>
    <a-form layout="inline">
      <a-row style="line-height: 39px;padding-top: 20px;">
        <a-col :md="7">
          <a-form-item label="商品类型">
            <a-input placeholder="请输入名称" v-model="name"></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="5">
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
          </span>
        </a-col>
        <a-col :md="12" style="text-align:right;">
          <a-button type="primary" icon="plus" @click="showDrawer">新 增</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table :columns="columns" :dataSource="data" :pagination="false" rowKey="key">
      <span slot="action" slot-scope="text, record">
          <a style="color: #33b8b3;" @click="delType(record.value)">删除</a>
      </span>  
    </a-table>
    <a-drawer
      title="新增"
      :width="360"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
     <!-- hideRequiredMark 隐藏星号-->
      <a-form :form="form" layout="vertical">
        <a-form-item label="类型名称">
          <a-radio-group v-model="value">
            <a-radio :value="1">一级菜单</a-radio>
            <a-radio :value="2">二级菜单</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="类型名称">
          <a-input placeholder="类型名称" v-decorator="['name', { rules: [{ required: true, message: '请填写类型名称!' }] }]" />
        </a-form-item>
        <a-form-item label="商品类别" v-if="value == 2">
          <a-tree-select
            style="width: 300px"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder="请选择父级类型"
            v-decorator="['type', { rules: [{ required: true, message: '请选择父级类型!' }] }]"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="类型描述">
          <a-textarea placeholder="类型描述" v-decorator="['desc', { rules: [{ required: true, message: '请填写类型描述!' }] }]" />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">
          取消
        </a-button>
        <a-button @click="save" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import MyTitle from '@/components/MyTitle/MyTitle'; 
import { proTypeList,delProType,syscategoryList,addProType} from '@/api/seller';
export default {
  data() {
    return {
      name:'',
      treeData:[],
      value: 1,
      form: this.$form.createForm(this),
      visible: false,
      columns:[
        {
          title: 'ID',
          dataIndex: 'value',
          key: 'value',
        },
        {
          title: '分类名称',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: '描述',
          dataIndex: 'frontDesc',
          key: 'frontDesc',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data:[
        
      ]
    };
  },
  components:{
    MyTitle
  },
  mounted(){
    this.getProTypeList(this.name);
    this.getSyscategoryList();
  },
  methods: {
    save(){
      this.form.validateFields((err, values) => {
        if(!err){
          if(this.value == 1){
            addProType('',1,values.name,values.desc).then(res => {
              console.log(res,'1ji');
              this.visible = false;
              this.$message.success('添加成功！')
              this.getProTypeList('');
            })
          }else{
            addProType(values.type,2,values.name,values.desc).then(res => {
              console.log(res,'2ji');
              this.visible = false;
              this.$message.success('添加成功！')
              this.getProTypeList('');
            })
          }
        }
      })
    },
    getSyscategoryList(){
      syscategoryList().then(res => {
        console.log(res)
        if(res.code == 0){
          this.treeData = res.result
        }
      })
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    delType(id){
      console.log(id)
      delProType(id).then(res => {
        console.log(res)
        if(res.code == 200){
          this.$message.success(res.message);
          this.getProTypeList(this.name)
        }
      })
    },
    searchQuery(){
      this.getProTypeList(this.name)
    },
    getProTypeList(name){
      proTypeList(name).then(res => {
        console.log(res)
        if(res.code == 0){
          this.data = res.result;
          this.data.forEach((item) => {
            let key = 'key';
            item[key] = item.value;
            item.children.forEach((aitem) => {
              let key1 = 'key';
              aitem[key1] = aitem.value;
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#DictItemList{
  padding: 0 20px;
}
</style>