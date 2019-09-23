<template>
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 主表单区域 -->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名称"
          hasFeedback>
          <a-input
            placeholder="请输入名称"
            v-decorator="['name', {rules: [{ required: true, message: '请输入订单号!' }]}]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number
          v-decorator="['sortOrder',{}]"
            :min="0"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {httpAction} from '@/api/manage'
  //import JDate from '@/components/jeecg/JDate'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "JeecgOrderDMainModal",
    components: {
      //JDate
    },
    data() {
      return {
        title: "操作",
        visible: false,
        orderMainModel: {
          jeecgOrderCustomerList: [{}],
          jeecgOrderTicketList: [{}]
        },
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {},
        url: {
          add: "/specifications/add",
          edit: "/specifications/edit",
          orderCustomerList: "/test/order/listOrderCustomerByMainId",
          orderTicketList: "/test/order/listOrderTicketByMainId",
        },
      }
    },
    methods: {
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        console.log(record)
        this.orderMainModel = Object.assign({}, record);
        //初始化明细表数据
        console.log(this.orderMainModel.id)
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.orderMainModel, 'name', 'sortOrder'))
          this.form.setFieldsValue({orderDate: this.orderMainModel.orderDate ? moment(this.orderMainModel.orderDate) : null}) //时间格式化
        });
        console.log(this.orderMainModel)
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.orderMainModel.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'post';
            }
            let orderMainData = Object.assign(this.orderMainModel, values);
            console.log(orderMainData)
            //时间格式化
            //orderMainData.orderDate = orderMainData.orderDate ? orderMainData.orderDate.format('YYYY-MM-DD HH:mm:ss') : null;
            let formData = {
              ...orderMainData
            }
            console.log(formData)
            httpAction(httpurl, formData, method).then((res) => {
              console.log(res)
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
        })
      },
      handleCancel() {
        this.close()
      }
    }
  }
</script>

<style scoped>
  .ant-btn {
    padding: 0 10px;
    margin-left: 3px;
  }

  .ant-form-item-control {
    line-height: 0px;
  }

  /** 主表单行间距 */
  .ant-form .ant-form-item {
    margin-bottom: 10px;
  }

  /** Tab页面行间距 */
  .ant-tabs-content .ant-form-item {
    margin-bottom: 0px;
  }
</style>