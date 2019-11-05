<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="订单号">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select placeholder="请选择状态" v-model="queryParam.status">
                <a-select-option value>请选择状态</a-select-option>
                <a-select-option value="1">订单提交</a-select-option>
                <a-select-option value="2">样稿确认</a-select-option>
                <a-select-option value="3">分享购买</a-select-option>
                <a-select-option value="4">生产中</a-select-option>
                <a-select-option value="5">运输中</a-select-option>
                <a-select-option value="6">完成</a-select-option>
                <a-select-option value="7">已取消</a-select-option>
                <a-select-option value="8">已失败</a-select-option>
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
    <!-- table区域-begin -->
    <div style="margin-top: 16px">
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="orderStatus" slot-scope="text">
          <div class="anty-img-wrap">
            {{ text | statusFilter }}
          </div>
        </template>
        <template slot="payStatus" slot-scope="text">
          <div class="anty-img-wrap">
            {{ text | statusPayFilter }}
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <a @click="handleList(record.id)">查看详情</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-has="'user:start'" v-if="record.designStatus == 1">
                <a href="javascript:;" @click="startToDesign(record.id)">开始设计</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="$router.push({path:'/specification',query:{orderId: record.id}})">设计需求</a>
              </a-menu-item>
              <a-menu-item v-has="'user:send'" v-if="record.designStatus == 3">
                <a href="javascript:;" @click="sendExample(record.id)">发送样稿</a>
              </a-menu-item>
              <a-menu-item v-has="'user:confirm'" v-if="record.designStatus == 5">
                <a href="javascript:;" @click="confirmSend(record.id)">确认发货</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <a-modal title="物流信息" v-model="visible" @ok="beConfirmed" okText="确认" cancelText="取消" :width="600">
      <a-form :form="form">
      <a-form-item
          label="物流公司"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'gender',
              {rules: [{ required: true, message: '请选择物流公司!' }]}
            ]"
            placeholder="请选择物流公司"
          >
            <a-select-option v-for="item in componyList" :key="item.itemText" :value="item.itemValue">
              {{item.itemText}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="物流单号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {rules: [{ required: true, message: '请填写物流单号!' }]}
            ]"
            placeholder="请填写物流单号"
          />
        </a-form-item>
        <a-form-item
          label="发件人姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: false, message: '请填写发件人姓名!' }]}
            ]"
            placeholder="请填写发件人姓名"
          />
        </a-form-item>
        <a-form-item
          label="发件人电话"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {rules: [{ required: false, message: '请填写发件人电话!' }]}
            ]"
            placeholder="请填写发件人电话"
          />
        </a-form-item>
        <a-input-group compact style="display: flex;align-items: flex-end;">
          <a-form-item
            label="地址："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }" class="my-form-item-1"
          >
            <a-input
              style="width: 95%;"
              v-decorator="[
                'province',
                {rules: [{ required: false, message: '请填写省!' }]}
              ]"
              placeholder="请填写省"
            />
          </a-form-item>
          <a-form-item class="my-form-item-2">
            <a-input
              style="width: 95%;"
              v-decorator="[
                'city',
                {rules: [{ required: false, message: '请填写市!' }]}
              ]"
              placeholder="请填写市"
            />
          </a-form-item>
          <a-form-item class="my-form-item-3">
            <a-input
              style="width: 95%;"
              v-decorator="[
                'quire',
                {rules: [{ required: false, message: '请填写区!' }]}
              ]"
              placeholder="请填写区"
            />
          </a-form-item>
        </a-input-group>
        <a-form-item style="padding-left: 55px;margin-top: -10px;">
        <a-input
          v-decorator="[
            'details',
            {rules: [{ required: false, message: '请填写详细地址!' }]}
          ]"
          placeholder="请填写详细地址"
        />
      </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>
<script>
const statusMap = {
    4: {
        text: '生产中'
    },
    1: {
        text: '订单提交'
    },
    3: {
        text: '分享购买'
    },
    2: {
        text: '样稿确认'
    },
    5: {
        text: '运输中'
    },
    6: {
        text: '完成'
    },
    7: {
        text: '已取消'
    },
    8: {
        text: '已失败'
    }
}
const statusPayMap = {
    0: {
        text: '待付款 '
    },
    1: {
        text: '付款中'
    },
    3: {
        text: '退款'
    },
    2: {
        text: '已付款'
    }
}
import { checkOutOrders,startDesign,sendSample, logistics,confirmLogistics } from '@/api/seller'
export default {
  components: {
  },
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '订单号',
          align: 'center',
          dataIndex: 'orderSn',
          width: 120
        },
        {
          title: '邮箱',
          align: 'center',
          width: 100,
          dataIndex: 'email'
        },
        {
          title: '已购买数量',
          align: 'center',
          width: 80,
          dataIndex: 'buyCount',
        },
        {
          title: '总商品数',
          align: 'center',
          width: 80,
          dataIndex: 'allCount',
        },
        {
          title: '订单截止日期',
          align: 'center',
          width: 120,
          dataIndex: 'payEndDate',
        },
        {
          title: '订单状态',
          align: 'center',
          width: 80,
          dataIndex: 'orderStatus',
          scopedSlots: { customRender: "orderStatus" }
        },
        {
          title: '支付状态',
          align: 'center',
          width: 100,
          dataIndex: 'payStatus',
          scopedSlots: { customRender: "payStatus" }
        },
        {
          title: '订单创建日期',
          align: 'center',
          width: 100,
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 170
        }
      ],
      dataSource:[],
      queryParam: {
        name: '',
        status: ''
      },
      /* 分页参数 */
      ipagination:{
        current: 1,
        pageSize: 12,
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        total: 0
      },
      loading:false,
      current: 0,
      componyList: [],
      postId:''
    }
  },
  mounted(){
    this.loading = true;
    this.getCheckOutOrders(1,'','');
    this.getLogistics();
  },
  filters:{
    statusFilter (type){
      return statusMap[type].text || ''
    },
    statusPayFilter (type){
      return statusPayMap[type].text || ''
    },
  },
  methods: {
    getLogistics(){
      logistics().then(res => {
        console.log(res)
        if(res.code == 0){
          this.componyList = res.result;
        }
      })
    },
    
    confirmSend(id){
      this.visible = true;
      this.postId = id;
    },
    beConfirmed(){
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.postConfirmLogistics(this.postId,values.note,values.gender,values.name,values.phone,values.details,values.province,values.city,values.quire)
        }
      });
    },
    postConfirmLogistics(orderId,shippingNo,transportMode,senderName,senderPhone,senderAddress,senderProvince,senderCity,senderDistrict){
      confirmLogistics(orderId,shippingNo,transportMode,senderName,senderPhone,senderAddress,senderProvince,senderCity,senderDistrict).then(res => {
        console.log(res)
        if(res.code == 0){
          this.visible = false;
          this.$message.success('发货成功！');
          this.getCheckOutOrders(this.current,this.queryParam.name,this.queryParam.status);
        }
      })
    },
    startToDesign(id){
      this.loading = true;
      startDesign(id).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$notification.success({
            duration: 3,
            message: '订单状态更改成功！',
            description: '订单设计已经开始，请于2个工作日内提供样稿设计，并在平台内上传。'
          });
          this.getCheckOutOrders(this.current,this.queryParam.name,this.queryParam.status);
        }
      })
    },
    searchReset(){
      this.queryParam = {};
      this.loading = true;
      this.getCheckOutOrders(1,'','');
    },
    searchQuery(){
      this.loading = true;
      console.log(this.queryParam.name)
      this.getCheckOutOrders(1,this.queryParam.name,this.queryParam.status);
    },
    handleTableChange(pagination) {
      console.log(pagination)
      this.ipagination = pagination;
      this.current = pagination.current;
      this.loading = true;
      this.getCheckOutOrders(pagination.current,this.queryParam.name,this.queryParam.status);
    },
    handleList(data) {
      console.log(data)
      this.$router.push({
        path: '/orderListDetails',
        query: {id: data}
      })
    },
    getCheckOutOrders(pageNo,content,status){
      checkOutOrders(pageNo,content,status).then(res => {
        console.log(res)
        this.ipagination.total = res.total;
        this.dataSource = res.records;
        this.loading = false;
      })
    },
    sendExample(id){
      let that = this;
      that.$confirm({
        title: "您确认要发送设计样稿给用户吗？",
        content: "确认请点击继续",
        okText: "继续",
        cancelText: "取消",
        onOk() {
          sendSample(id).then(res => {
            console.log(res)
            if(res.code == 0){
              console.log(111)
              that.$notification.success({
                duration: 3,
                message: '订单状态更改成功！',
                description: '样稿已发送成功！'
              });
              that.getCheckOutOrders(that.current,that.queryParam.name,that.queryParam.status);
            }
          })
        },
        onCancel() {}
      });
      
    }
  }
}
</script>
<style scoped lang="less">
@import '~@assets/less/common.less';
.table-page-search-wrapper a:hover{
  color: #666;
}

</style>
