<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;" :form="form">
      <a-form-item
        label="New password"
      >
        <a-input v-decorator="['password', {rules: [{required: true}, {validator: this.handlePasswordLevel}]} ]" type="password" />
      </a-form-item>
      <a-form-item
        label="Confirm password"
      >
        <a-input v-decorator="['confirm',{rules: [{required: true}, {validator: this.handlePasswordCheck}]}]" type="password" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button style="margin-right: 8px" @click="prevStep">Previous step</a-button>
        <a-button :loading="loading" type="primary" @click="nextStep">Submit </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { passwordSet } from "@/api/system";
export default {
  props: {
    email: {
      required: true
    }
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
      state: {
          percent: 10,
      }
    };
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0;
      let reg = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
      if (!reg.test(value)) {
        callback(new Error('The password consists of 6 numbers and letters!'))
      }
      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error("At least 6-digit password"));
      }
    },
    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      if (value === undefined) {
        callback(new Error("Please fill in the confirmation password again."));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("Two passwords are different"));
      }
      callback();
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if(!err){
          const params = {
            username: this.email,
            password: values.confirm
          };
          passwordSet(params).then(res => {
            if (res.code == 200) {
              this.loading = true;
              this.$emit("nextStep");
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