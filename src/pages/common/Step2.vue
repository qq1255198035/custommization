<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;" :form="form">
      
      <a-form-item
        label="New password"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{
                required: true, message: 'Please fill in your password!',
              }, {
                validator: validateToNextPassword,
              }],
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="Confirm password"
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: compareToFirstPassword,
              }],
            }
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">Submit </a-button>
        <a-button style="margin-left: 8px" @click="prevStep">Previous step</a-button>
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
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Input password is inconsistent!');
      } else {
        callback();
      }
    },
    nextStep() {
      let that = this;
      that.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            username: that.email,
            password: values.confirm
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