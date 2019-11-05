<template>
  <div id="GoodsManagement">
    <my-title :title="'商品列表'" :fontsize="20"></my-title>
    <div class="table-page-search-wrapper" style="margin-top: 20px;">
      <a-form layout="inline">
        <a-row style="padding-left: 20px;line-height: 39px;">
          <a-col :md="7">
            <a-form-item label="商品类型">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            </span>
          </a-col>
          <a-col :md="12" style="text-align:right;">
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
      :loading="loading"
      @change="handleTableChange"
      rowKey="id"
    >
    <p slot="isOnSale" slot-scope="text, record" style="text-align: center;">
      {{ text ? '是' : '否'}}
    </p>
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
import MyTitle from "@/components/MyTitle/MyTitle";
import { sysgoodsList } from "@/api/seller"
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'code',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '类别',
      dataIndex: 'categoryName',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '最小订货量',
      dataIndex: 'minOrder',
    },
    {
      title: '生产时间（天）',
      dataIndex: 'productionTime',
    },
    {
      title: '是否在售',
      dataIndex: 'isOnSale',
      scopedSlots: { customRender: 'isOnSale' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];
  export default {
    data() {
      return {
        data:[],
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
          total: 0
        },
        current: 1
      };
    },
    components:{
      MyTitle
    },
    computed: {
      
    },
    mounted(){
      this.getSysgoodsList(1,'');
    },
    methods: {
      searchQuery(){
        this.loading = true;
        this.getSysgoodsList(1,this.queryParam.name);
      },
      getSysgoodsList(pageNo,name){
        sysgoodsList(pageNo,name).then(res => {
          console.log(res)
          this.data = res.records;
          this.ipagination.total = res.total;
          this.loading = false
        })
      },
      handleTableChange(pagination) {
        console.log(pagination)
        this.ipagination = pagination;
        this.current = pagination.current;
        this.loading = true;
        this.getSysgoodsList(pagination.current,this.queryParam.name)
      },
    },
  };
</script>
<style lang="less" scoped>
#GoodsManagement{
  padding: 0 20px;
  .table-page-search-wrapper{
    padding-bottom: 20px;
  }
}
</style>