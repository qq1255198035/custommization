<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="status" slot-scope="status">
                <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
              </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
        
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <goods-modal ref="modalForm" @ok="modalFormOk"></goods-modal>
  </a-card>
</template>

<script>
  import { getAction } from '@/api/manage'
  import goodsModal from '@/views/jeecg/goods/goodsModal'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
const statusMap = {
  0: {
    status: 'warning',
    text: '否'
  },
  1: {
    status: 'success',
    text:'是'
  }
}
  export default {
    name: "TableDemo",
    mixins: [JeecgListMixin],
    components: {
      goodsModal
    },
    data() {
      return {
        // 列表表头
        columns: [{
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: "center",
          customRender: function (t, r, index) {
            return parseInt(index) + 1;
          }
        },
          {
            title: '名称',
            align: "center",
            dataIndex: 'name'
          },
          {
            title: '是否可用',
            align: "center",
            dataIndex: 'enabled',
            scopedSlots: {customRender: 'status'}
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }],
        // 分页参数
        type: "radio",
        url: {
          list: "/attributeCategory/list",
          delete: "/attributeCategory/delete",
          deleteBatch: "/test/order/deleteBatch",
          customerListByMainId: "/test/order/listOrderCustomerByMainId",
        },
      }
    },
    computed: {
      currentId(){
        return this.id;
      }
    },
    methods: {
      /*handleExpand(expanded, record){
        this.expandedRowKeys=[];
        this.innerData=[];
        if(expanded===true){
          this.loading = true;
          this.expandedRowKeys.push(record.id);
          getAction(this.url.customerListByMainId, {mainId: record.id}).then((res) => {
            if (res.success) {
              this.loading = false;
              this.innerData = res.result;
            }
          });
        }
      },*/
    },
    filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  }
  }
</script>
<style scoped>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px
  }

  .ant-btn-danger {
    background-color: #ffffff
  }

  .ant-modal-cust-warp {
    height: 100%
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden
  }
</style>