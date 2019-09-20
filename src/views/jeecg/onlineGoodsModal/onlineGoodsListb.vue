<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
        <!-- 主表单区域 -->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品类型"
          hasFeedback>
          <a-input
          disabled="disabled"
            placeholder="请输入名称"
            v-decorator="['orderCode', {rules: [{ required: true, message: '请输入订单号!' }]}]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="商品序列号">
          <a-input
            placeholder="请输入名称"
            v-decorator="['orderCode', {rules: [{ required: true, message: '请输入订单号!' }]}]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="['orderCode', {rules: [{ required: true, message: '请输入订单号!' }]}]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="品牌">
          <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类别">
          <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
        </a-form-item>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
        },
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss">
</style>
