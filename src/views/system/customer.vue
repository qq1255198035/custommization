<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select style="width: 100%" v-model="queryParam.status" placeholder="请选择状态" :dropdownMatchSelectWidth="false">
                <a-select-option value>请选择状态</a-select-option>
                <a-select-option value="0">未审批</a-select-option>
                <a-select-option value="1">通过</a-select-option>
                <a-select-option value="2">未通过</a-select-option>
                <a-select-option value="3">未申请</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="margin-top: 5px;margin-left: 30px;">
      <a-dropdown v-if="selectedRowKeys.length > 1">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel(1)">
            <a-icon type="check-circle" />批量通过
          </a-menu-item>
          <a-menu-item key="2"  @click="batchDel(2)">
            <a-icon type="close-circle" />批量拒绝
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
      
    </div>
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="rowSelection"
        @change="handleTableChange"
      >
        <template slot="status" slot-scope="text">
          <div class="anty-img-wrap">
            {{ text | statusFilter }}
          </div>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定操作吗?"
            :visible="popvisible == record.id"
            @confirm="confirm(record.id)"
            @cancel="cancel(record.id)"
            okText="通过"
            cancelText="拒绝"
          >
            <a @click="popvisible = record.id" v-if="record.status == 0">审批</a>
          </a-popconfirm>
          <a-divider type="vertical" v-if="record.status == 0"/>
          <a @click="handleDetail(record.id)">查看详情</a>
        </template>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-modal v-model="show" title="经销商审批" okText="确认" cancelText="取消" @ok="hideModal">
        <div>
            <a-form :form="form">
                <a-form-item
                    label="拒绝原因"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }"
                    v-if="key == 2"
                >
                    <a-textarea 
                        v-decorator="[
                        'note',
                        {rules: [{ required: true, message: '请填写拒绝原因!' }]}
                        ]"
                    ></a-textarea>
                </a-form-item>
                <a-form-item
                    label="折扣等级"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }"
                    v-if="key == 1"
                >
                    <a-select placeholder="请选择折扣等级" style="width: 100%;"
                        v-decorator="[
                        'leavel',
                        {rules: [{ required: true, message: '请选择折扣等级!' }]}
                        ]"
                    >
                        <a-select-option v-for="item in options" :key="item.id" :value="item.id">{{item.discount}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
  </a-card>
</template>

<script>
import { dealerList,dealerGrade,approvalDealer } from '@/api/seller';
const statusMap = {
    0: {
        text: '未审批'
    },
    1: {
        text: '通过'
    },
    2: {
        text: '未通过'
    },
    3: {
        text: '未申请'
    }
}
export default {
  name: "UserList",
 
  components: {
   
  },
  data() {
    return {
      show:false,
      key:0,
      loading:false,
      popvisible: -1,
      visiblePast: false,
      visibleNoPast: false,
      queryParam: {
        name: '',
        status: ''
      },
      columns: [
        {
          title: "名称",
          align: "center",
          dataIndex: "name",
          width: 120
        },
        {
          title: "邮箱",
          align: "center",
          width: 100,
          dataIndex: "email"
        },
        {
          title: "员工",
          align: "center",
          width: 120,
          dataIndex: "employee",
         
        },

        {
          title: "销售额",
          align: "center",
          width: 80,
          dataIndex: "sale",
      
        },
        {
          title: "状态",
          align: "center",
          dataIndex: "status",
          width: 100,
          scopedSlots: { customRender: "status" }
        },
        {
          title: "备注",
          align: "center",
          width: 100,
          dataIndex: "remark"
        },

        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 170
        }
      ],
      dataSource:[],
      selectedRowKeys: [],
      selectionRows: [],
      ipagination:{
        current: 1,
        pageSize: 12,
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        total: 0
      },
      current:1,
      options:[],
      form: this.$form.createForm(this),
      dealerId:''
    };
  },
  filters:{
    statusFilter (type){
      return statusMap[type].text || ''
    },
  },
  mounted(){
    this.getDealerList('','',1);
    this.getDealerGrade();
  },
  methods: {
    hideModal(){
      if(this.key == 1){
          this.form.validateFields((err, values) => {
              if (!err) {
                  this.postApprovalDealer(this.dealerId,1,'',values.leavel)
              }
          })
      }else if(this.key == 2){
          this.form.validateFields((err, values) => {
              if (!err) {
                  this.postApprovalDealer(this.dealerId,2,values.note,'')
              }
          })
      }
    },
    postApprovalDealer(ids,status,remark,level){
      approvalDealer(ids,status,remark,level).then(res => {
          
          if(res.code == 0){
              this.show = false;
              this.$message.success('操作成功！');
              window.location.reload();
          }
      })
    },
    getDealerGrade(){
      dealerGrade().then(res => {
        
        if(res.code == 0){
          this.options = res.result;
        }
      })
    },
    handleTableChange(pagination) {
      console.log(pagination)
      this.loading = true;
      this.ipagination = pagination;
      this.current = this.ipagination.current;
      this.getDealerList(this.queryParam.name,this.queryParam.status,this.current)
    },
    batchDel(key){
      this.key = key;
      this.show = true;
      this.dealerId = this.selectedRowKeys.join(',')
      console.log(this.dealerId);
      console.log(this.selectedRowKeys)
    },
    searchQuery(){
      this.loading = true;
      this.getDealerList(this.queryParam.name,this.queryParam.status,1)
    },
    searchReset(){
      this.queryParam.name = '';
      this.queryParam.status = '';
      this.getDealerList('','',1)
    },
    getDealerList(name,status,pageNo){
      dealerList(name,status,pageNo).then(res => {
        
        this.dataSource = res.records
        this.ipagination.total = res.total
        this.loading = false;
      })
    },
    confirm(id) {
      this.key = 1;
      this.dealerId = id;
      this.show = true;
      this.popvisible = -1;
    },
    cancel(id) {
      this.key = 2;
      this.dealerId = id;
      this.show = true;
      this.popvisible = -1;
    },
   
    handleDetail(data) {
      console.log(data)
      this.$router.push({
        path: "/sellerInfo",
        query: {id: data}
      });
    },
  },
  computed: {
    rowSelection() {
       /* eslint-disable */
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          this.selectionRows = selectedRows;
          console.log(this.selectedRowKeys);
          console.log(this.selectionRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.status == 1 || record.status == 2, // Column configuration not to be checked
          }
        }),
      }
    }
  },
};
</script>
<style scoped lang="less">
@import "~@assets/less/common.less";
</style>
