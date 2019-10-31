<template>
  <div id="GoodsManagement">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row style="padding-left: 20px;line-height: 39px;">
          <a-col :md="6">
            <a-form-item label="商品类型">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :md="8">
            <a-button type="primary" icon="plus">添加</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="ipagination"
    >
    <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" style="color: #333;">
            更多<a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <!-- record.id -->
            <a-menu-item>
              <a href="javascript:;" style="color: #333;">修改</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" style="color: #333;">颜色</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" style="color: #333;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>
<script>
  const columns = [
    {
      title: '商品类型',
      dataIndex: 'category_id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '最小订货量',
      dataIndex: 'min_order',
    },
    {
      title: '添加日期',
      dataIndex: 'create_time',
    },
    {
      title: '零售价格',
      dataIndex: 'price',
    },
    {
      title: '最高价格',
      dataIndex: 'max_price',
    },
    {
      title: '商品简介',
      dataIndex: 'goods_brief',
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      category_id: '校服',
      name: `Edward King ${i}`,
      create_time: '2019-10-12',
      price: 110,
      max_price:11,
      goods_brief: '11',
      min_order: 10,
    });
  }

  export default {
    data() {
      return {
        data,
        columns,
        //selectedRowKeys: [],
        queryParam: {
          name: '',
          status: ''
        },
        loading: false,
        ipagination:{
          current: 1,
          pageSize: 10,
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          total: 47
        },
      };
    },
    computed: {
      // hasSelected() {
      //   return this.selectedRowKeys.length > 0;
      // },
    },
    methods: {
      searchQuery(){
        this.loading = true;
        this.getDealerList(this.queryParam.name,this.queryParam.status,1)
      },
      searchReset(){
        this.queryParam.name = '';
        this.queryParam.status = '';
        this.getDealerList('','',1)
      },
      // onSelectChange(selectedRowKeys,selectedRows) {
      //   console.log('selectedRowKeys changed: ', selectedRowKeys);
      //   console.log(selectedRows);
      //   this.selectedRowKeys = selectedRowKeys;
      // },
    },
  };
</script>
<style lang="less" scoped>
#GoodsManagement{
  padding: 30px 20px 0;
  .table-page-search-wrapper{
    padding-bottom: 20px;
  }
}
</style>