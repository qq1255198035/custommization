<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;" :form="form">
      <a-form-item label="Login account" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
        <a-input
          placeholder="Email"
          v-decorator="['email',{rules: [{ required: true, message: 'Email' }]}]"
        />
      </a-form-item>
      <a-form-item label="Verify code" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
        <a-row :gutter="32">
          <a-col :span="16">
            <a-input
              size="large"
              type="text"
              placeholder="verify code"
              v-model="captcha"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-col>
          <a-col :span="6">
            <a-button @click="setCode">Get verify code</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">Next</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { passwordEmail,checkCaptcha } from "@/api/system";
export default {
  name: "Step1",
  data() {
    return {
      form: this.$form.createForm(this),
      code: "",
      captcha: ''
    };
  },
  props:{
    
  },
  methods: {
    setCode() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            email: values.email
          };
          passwordEmail(params).then(res => {
            console.log(res);
            this.code = res.code;
            if (res.code == 0) {
              this.$notification["success"]({
                message: "Successful",
                description: "The verification code has been sent to your email, please check your email!",
                duration: 4
              });
            }
            if (res.code == 500) {
              this.$notification["warn"]({
                message: "Email not yet registered",
                description: "Email not yet registered, please sign up!",
                duration: 4
              });
            }
            if (res.code == 300) {
              this.$notification["warn"]({
                message: "Verify code is still valid",
                description: "Verify code is still valid within 10 minutes",
                duration: 4
              });
            }
          });
        }
      });
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.code == 0) {
            if(this.captcha){
              console.log(this.captcha)
              checkCaptcha(values.email, this.captcha).then(res => {
                  console.log(res)
                    if(res.success){
                      this.$emit("nextStep", values.email, this.captcha);
                    }else{
                      this.$message.error(res.message)
                    }
              })
              //
            }else{
              this.$message.error('Please fill in the verify code!')
            }
            
          }
        }
      });
    }
  }
};
</script>

<style>
</style>