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
              <a-select style="width: 100%" v-model="queryParam.status" placeholder="请选择状态">
                <a-select-option value>请选择状态</a-select-option>
                <a-select-option value="0">未审批</a-select-option>
                <a-select-option value="1">通过</a-select-option>
                <a-select-option value="2">未通过</a-select-option>
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
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />批量通过
          </a-menu-item>
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />批量拒绝
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
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <template slot="status" slot-scope="text">
          <div class="anty-img-wrap">
            {{ text | statusFilter }}
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定操作吗?"
            :visible="popvisible == record.id"
            @confirm="confirm"
            @cancel="cancel"
            okText="通过"
            cancelText="拒绝"
          >
            <a @click="popvisible = record.id">审批</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a @click="handleDetail(record.id)">查看详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-modal title="审批通过" v-model="visiblePast" @ok="handleOkPast">
      <p>折扣比例</p>
      <p><a-input></a-input></p>
    </a-modal>
    <a-modal title="审批不通过" v-model="visibleNoPast" @ok="handleNoPast">
      <p>原因</p>
      <p><a-textarea>原因</a-textarea></p>
    </a-modal>
  </a-card>
</template>

<script>
import { dealerList } from '@/api/seller';
const statusMap = {
    0: {
        text: '未审批'
    },
    1: {
        text: '通过'
    },
    2: {
        text: '未通过'
    }
}
export default {
  name: "UserList",
 
  components: {
   
  },
  data() {
    return {
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
      current:1
    };
  },
  filters:{
    statusFilter (type){
      return statusMap[type].text || ''
    },
  },
  mounted(){
    this.getDealerList('','',1)
  },
  methods: {
    handleTableChange(pagination) {
      console.log(pagination)
      this.loading = true;
      this.ipagination = pagination;
      this.current = this.ipagination.current;
      this.getDealerList(this.queryParam.name,this.queryParam.status,this.current)
    },
    onClearSelected() {
      this.selectedRowKeys = [];
      this.selectionRows = [];
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectionRows = selectionRows;
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    batchDel(){

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
        console.log(res)
        this.dataSource = res.records
        this.ipagination.total = res.total
        this.loading = false;
      })
    },
    confirm () {
      
    },
    cancel () {
      
    },
    handleOkPast() {
      this.visiblePast = false;
    },
    handleNoPast() {
      this.visibleNoPast = false
    },
    handleDetail(data) {
      console.log(data)
      this.$router.push({
        path: "/sellerInfo",
        query: {id: data}
      });
    },
   
   
  }
};
</script>
<style scoped lang="less">
@import "~@assets/less/common.less";
</style>
