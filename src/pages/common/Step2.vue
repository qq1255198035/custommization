<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;" :form="form">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="新密码"
          v-decorator="['password', {rules: [{ required: true, message: '新密码' }], validateTrigger: 'blur'}]"
        >
          <!--<a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />-->
        </a-input>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { passwordSet } from "@/api/system";
export default {
  name: "Step2",
  props: ["email"],
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    nextStep() {
      let that = this;
      that.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            username: that.email,
            password: values.password
          };
          console.log(params)
          passwordSet(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              that.loading = true;
              setTimeout(function() {
                that.$emit("nextStep");
              }, 1500);
            }
          });
        }
      });
    },
    prevStep() {
      this.$emit("prevStep");
    }
  }
};
</script>

<style lang="less">
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
</style>