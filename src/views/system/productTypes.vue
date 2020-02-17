<template>
  <div>
    <div style="padding: 10px 20px;">
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
        <template slot="action" slot-scope="text, record">
          <a-popconfirm
            title="确定操作吗?"
            :visible="popvisible == record.id"
            @confirm="confirm(record.id)"
            @cancel="cancel(record.id)"
            okText="通过"
            cancelText="拒绝"
          >
            <a-button type="primary" :disabled="record.status !== 1" @click="popvisible = record.id">审批</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-modal v-model="show" title="经销商审批" okText="确认" cancelText="取消" @ok="hideModal">
        <div>
          <a-form :form="form">
            <a-form-item
              label="拒绝原因"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
                <a-textarea 
                    v-decorator="[
                    'note',
                    {rules: [{ required: true, message: '请填写拒绝原因!' }]}
                    ]"
                ></a-textarea>
            </a-form-item>
          </a-form>
        </div>
    </a-modal>
  </div>
</template>
<script>
import { withdrawList,approveWithdraw } from '@/api/seller';
const statusMap = {
    4: {
        text: '已到帐'
    },
    1: {
        text: '申请中'
    },
    3: {
        text: '申请失败'
    },
    2: {
        text: '打款中'
    }
}
export default {
  data(){
    return{
      pageNo: 1,
      popvisible: -1,
      show:false,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '提现单号',
          align: 'center',
          width: 80,
          dataIndex: 'order_id',
        },
        {
          title: '账号',
          align: 'center',
          width: 100,
          dataIndex: 'account'
        },
        {
          title: '金额',
          align: 'center',
          dataIndex: 'amount',
          width: 120
        },
        {
          title: '申请状态',
          align: 'center',
          width: 80,
          dataIndex: 'status',
          scopedSlots: { customRender: "orderStatus" }
        },
        {
          title: '创建日期',
          align: 'center',
          width: 100,
          dataIndex: 'created_time'
        },
        {
          title: '审批时间',
          align: 'center',
          width: 100,
          dataIndex: 'updated_time'
        },
        {
          title: '备注',
          align: 'center',
          width: 100,
          dataIndex: 'remark'
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
      /* 分页参数 */
      ipagination:{
        current: 1,
        pageSize: 10,
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        total: 0
      },
      loading:true,
      postId: 0
    }
  },
  mounted(){
    this.getWithdrawList(this.pageNo)
  },
  methods:{
    hideModal(){
      this.form.validateFields((err, values) => {
          if (!err) {
            approveWithdraw(this.postId,values.note,3).then(res => {
              if(res.code == 0){
                this.popvisible = -1;
                this.show = false;
                this.$message.success(res.result);
                this.getWithdrawList(this.pageNo)
              }
            })
          }
      })
      
    },
    confirm(id) {
      approveWithdraw(id,'',2).then(res => {
        if(res.code == 0){
          this.popvisible = -1;
          this.$message.success(res.result);
          this.getWithdrawList(this.pageNo)
        }
      })
    },
    cancel(id) {
      this.show = true;
      this.postId = id;
      this.popvisible = -1;
    },
    getWithdrawList(pageNo){
      withdrawList(pageNo).then(res => {
        this.dataSource = res.records;
        this.ipagination.total = res.total;
        this.loading = false;
      })
    },
    handleTableChange(pagination) {
      this.ipagination = pagination;
      this.pageNo = pagination.current;
      this.loading = true;
      this.getWithdrawList(this.pageNo)
    },
  },
  filters:{
    statusFilter (type){
      return statusMap[type].text || ''
    }
  },
}
</script>
<style lang="less" scoped>

</style>