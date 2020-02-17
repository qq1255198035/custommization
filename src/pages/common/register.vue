<template>
  <div class="share" id="Register">
    <div class="share-box">
      <div class="main" v-if="mobileShow">
        <div class="user-layout-register">
          <a-row>
            <a-col :span="4"></a-col>
            <a-col :span="16">
              <my-title :title="itemTitle" :fontsize="24"></my-title>
              <a-form ref="formRegister" :form="form" id="formRegister">
                <a-form-item
                  label="Role selection"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12}"
                >
                  <a-radio-group @change="onChangeRadio" v-model="valueRadio">
                    <a-radio :value="1">User</a-radio>
                    <a-radio :value="2">Distributor</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="Email">
                  <a-input
                    size="large"
                    type="email"
                    placeholder="Email"
                    v-decorator="['email', {rules: [{ required: true, message: 'Please enter your email' },{ type: 'email', message: 'The input is not valid E-mail!' }], validateTrigger: ['blur']}]"
                  ></a-input>
                </a-form-item>
                <a-row :gutter="12">
                  <a-col :span="12">
                    <a-form-item label="First Name">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="First Name"
                        v-decorator="['surname', {rules: [{ required: true, message: 'Surname' }], validateTrigger: ['change', 'blur']}]"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Last Name">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="Last Name"
                        v-decorator="['monicker', {rules: [{ required: true, message: 'Name' }], validateTrigger: ['change', 'blur']}]"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-popover
                  placement="rightBottom"
                  trigger="click"
                  :visible="state.passwordLevelChecked"
                >
                  <template slot="content">
                    <div :style="{ width: '240px'}">
                      <div :class="['user-register', passwordLevelClass]">
                        <span>{{ passwordLevelName }}</span>
                      </div>
                      <a-progress
                        :percent="state.percent"
                        :showInfo="false"
                        :strokeColor="passwordLevelColor "
                      />
                    </div>
                  </template>
                  <a-form-item label="Password">
                    <a-input
                      size="large"
                      type="password"
                      @keydown="insertDown"
                      @keyup="insertUp"
                      autocomplete="false"
                      placeholder="Please fill in the password"
                      v-decorator="['password', {rules: [{ required: true, message: 'Please fill in the password'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                    ></a-input>
                  </a-form-item>
                </a-popover>
                <a-form-item label="Confirm password">
                  <a-input
                    size="large"
                    type="password"
                    @keydown="insertDown"
                    @keyup="insertUp"
                    autocomplete="false"
                    placeholder="Confirm password"
                    v-decorator="['password2', {rules: [{ required: true, message: 'Please fill in the password'}, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                  ></a-input>
                </a-form-item>
                <a-row :gutter="16" type="flex" align="bottom" style="align-items: center;">
                  <a-col class="gutter-row" :span="16">
                    <a-form-item label="Verification code">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="Verification code"
                        v-decorator="['captcha', {rules: [{ required: true, message: 'Verification code' }]}]"
                      >
                        <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                      </a-input>
                    </a-form-item>
                  </a-col>
                  <a-col class="gutter-row" :span="8" style="padding-top:30px;text-align:right">
                    <a-button
                      class="getCaptcha"
                      size="large"
                      :disabled="state.smsSendBtn"
                      @click.stop.prevent="getCaptcha"
                    >
                      {{state.smsSendBtn ? state.time+'s' : 'Get code'}}
                    </a-button>
                  </a-col>
                </a-row>
                <a-form-item style="margin-top: 20px;">
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <router-link class="login" :to="{ path: '/login' }">Existing accounts</router-link>
                    </a-col>
                    <a-col :span="16">
                      <commonBtn
                        :icon="'plus'"
                        @register="register"
                        :width="'50%'"
                        :title="'Register'"
                        :height="'44px'"
                        :padding="'10px'"
                        :radio="'12px'"
                        :fontsize="'18px'"
                        class="borderwidth"
                      ></commonBtn>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </div>
      </div>
      <div class="phone-main-reg" v-else>
        <h2 style="width: 100%; color: #33b8b3;text-align: left; padding:10px 20px;">
            <a-icon type="left" style="cursor: pointer;" @click="$router.go(-1)"/>
        </h2>
        <a-form ref="formRegister" :form="form" id="formRegister">
                <a-form-item label="Role selection" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 ,offset: 1}" style="display: flex;align-items: center;">
                  <a-radio-group @change="onChangeRadio" v-model="valueRadio">
                    <a-radio :value="1">User</a-radio>
                    <a-radio :value="2">Distributor</a-radio>
                  </a-radio-group>
                  </a-form-item>
                <a-form-item>
                  <a-input
                    size="large"
                    type="email"
                    placeholder="Please Enter Your E-mail"
                    v-decorator="['email', {rules: [{ required: true, message: 'Please enter your mailbox' },{ type: 'email', message: 'The input is not valid E-mail!' }], validateTrigger: ['change', 'blur']}]"
                  >
                    <a-icon slot="prefix" type="mail" style="color:#33b8b3;font-size: 15px;"/>
                  </a-input>
                  
                </a-form-item>
                <a-row type="flex" >
                  <a-col class="gutter-row" :span="24">
                    <a-form-item>
                      <a-input
                        style="width: 50%;"
                        size="large"
                        type="text"
                        placeholder="Verification code"
                        v-decorator="['captcha', {rules: [{ required: true, message: 'Verification code' }]}]"
                      >
                        <a-icon slot="prefix" type="key" style="color:#33b8b3;font-size: 15px;" />
                      </a-input>
                      <a-button
                        class="getCaptcha"
                        size="small"
                        :disabled="state.smsSendBtn"
                        @click.stop.prevent="getCaptcha"
                        style="border-radius: 0; border: none; border-left: 1px solid #33b8b3"
                      >
                        {{state.smsSendBtn ? state.time+'s' : 'Get code'}}
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item>
                      <a-input
                        size="large"
                        type="text"
                        placeholder="Last Name"
                        v-decorator="['surname', {rules: [{ required: true, message: 'Your Last Name' }], validateTrigger: ['change', 'blur']}]"
                      >
                        <a-icon slot="prefix" type="user-delete" style="color:#33b8b3;font-size: 15px;" />
                      </a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item>
                      <a-input
                        size="large"
                        type="text"
                        placeholder="First Name"
                        v-decorator="['monicker', {rules: [{ required: true, message: 'Your First Name' }], validateTrigger: ['change', 'blur']}]"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-popover
                  placement="topRight"
                  trigger="click"
                  :visible="state.passwordLevelChecked"
                >
                  <template slot="content">
                    <div :style="{ width: '240px'}">
                      <div :class="['user-register', passwordLevelClass]">
                        <span>{{ passwordLevelName }}</span>
                      </div>
                      <a-progress
                        :percent="state.percent"
                        :showInfo="false"
                        :strokeColor="passwordLevelColor "
                      />
                    </div>
                  </template>
                  <a-form-item>
                    <a-input
                      size="large"
                      type="password"
                      @keydown="insertDown"
                      @keyup="insertUp"
                      autocomplete="false"
                      placeholder="Please fill in the password"
                      v-decorator="['password', {rules: [{ required: true, message: 'Please fill in the password'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                    >
                      <a-icon slot="prefix" type="lock" style="color:#33b8b3;font-size: 15px;" />
                    </a-input>
                  </a-form-item>
                </a-popover>
                <a-form-item>
                  <a-input
                    size="large"
                    type="password"
                    @keydown="insertDown"
                    @keyup="insertUp"
                    autocomplete="false"
                    placeholder="Confirm password"
                    v-decorator="['password2', {rules: [{ required: true, message: 'Please fill in the password'}, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                  >
                    <a-icon slot="prefix" type="lock" style="color:#33b8b3;font-size: 15px;" />
                  </a-input>
                </a-form-item>
              </a-form>
              <p style="text-align: right;padding: 10px 20px;">
                <router-link class="login" :to="{ path: '/login' }" style="color: #33b8b3;text-decoration: underline;">Use An Existing Account</router-link>
              </p>      
              <div style="width: 80%;margin: 10px auto;">
                <a-button type="primary" @register="register" block style="border-radius: 20px;height: 40px;">REGISTER</a-button>
              </div>  
      </div>
    </div>
  </div>
</template>

<script>
/*import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'*/
import { register, registerSubmit } from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import commonBtn from "@/components/commonBtn/commonBtn";
const levelNames = {
  0: "At least 6-digit passwords, case-sensitive",
  1: "Password strength: WEAK",
  2: "Password strength: MEDIUM",
  3: "Password strength: STRONG"
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success"
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a"
};
export default {
  data() {
    return {
      valueRadio: 1,
      roleValue: "",
      role: [
        {
          name: "用户",
          key: 1
        },
        {
          name: "经销商",
          key: 2
        }
      ],
      emailText: "Please enter your email",
      itemTitle: "Register",
      registerBtn: false,
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      getCode: "Get code",
      // stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      mobileShow: false
    }
  },
  components: {
    MyTitle,
    commonBtn
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    }
  },
  mounted(){
    this.getWindowScreen();
  },
  methods: {
    getWindowScreen(){
      let screenWidths = window.screen.width;
      if(screenWidths > 768){
        this.mobileShow = true;
      }else{
        this.mobileShow = false;
      }
    },
    onChangeRadio(e) {
      this.valueRadio = e.target.value;
    },
    handlePasswordLevel(rule, value, callback) {
      let level = 0;
      let reg = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
      if (!reg.test(value)) {
        callback(new Error('The password must contain numbers and letters (minimum 6 digits)!'))
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
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
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
    insertDown() {
      this.state.passwordLevelChecked = true;
    },
    insertUp() {
      setTimeout(() => {
        this.state.passwordLevelChecked = false;
      }, 1500);
    },
    register() {
      this.registerActor("/sys/user/register");
    },
    
    registerActor(api) {
      const {
        form: { validateFields },
        $router,
        $notification
      } = this;
      validateFields((err, values) => {
        if (!err) {
          registerSubmit(api, {
            username: values.email,
            password: values.password,
            smscode: values.captcha,
            surname: values.surname,
            monicker: values.monicker,
            status: this.valueRadio
            //internationalization: localStorage.lang
          }).then(res => {
            if (res.code == 200) {
              this.$message.success('Register successfully, please login');
              $router.push({ path: "/login", params: { ...values } });
            } else {
              $notification["error"]({
                message: "error",
                description: res.message,
                duration: 8
              });
            }
          });
        }
      });
    },
    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields }
      } = this;
      validateFields(["email"], { force: true }, (err, values) => {
        if (!err) {
          if(values.email){
          register({
            email: values.email
          }).then(res => {
              if (res.success) {
                const interval = window.setInterval(() => {
                    this.state.smsSendBtn = true;
                    this.state.time--;
                    if(this.state.time == 0){
                      this.state.time = 60;
                      this.state.smsSendBtn = false;
                      clearInterval(interval)
                    }
                  }, 1000);
                  this.$notification.success({
                    message: "Successfully",
                    description: 'The verification code has been sent to your email, please check your email!',
                    duration: 4
                  });
              }else{
                this.$message.error(res.message);
                this.state.time = 60;
                this.state.smsSendBtn = false;
              }
            })
            .catch(err => {
              this.state.time = 60;
              this.state.smsSendBtn = false;
              this.requestFailed(err);
            });
          }else{
            this.$message.error('Please enter your email!')
          }
        }
      });
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "Error",
        description: ((err.response || {}).data || {}).message || "Error",
        duration: 4
      });
      this.registerBtn = false;
    }
  }
};
</script>

<style lang="less">
@import url("./../../components/index.less");
.share {
  width: 100%;
  height: 100%;
  .share-box {
    padding: 0px 40px;
    .main {
      background: #fff;
      box-shadow: 0 4px 10px #666;
      border-radius: 10px;
      width: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      .login {
        padding-bottom: 20px;
        text-align: center;
        &:hover{
          color: #33b8b3;
        }
      }
      .user-layout-login {
        label {
          font-size: 14px;
        }

        .getCaptcha {
          display: block;
          width: 100%;
          height: 40px;
        }

        .forge-password {
          font-size: 14px;
        }

        button.login-button {
          padding: 0 15px;
          font-size: 16px;
          height: 40px;
          width: 100%;
        }

        .user-login-other {
          text-align: left;
          margin-top: 24px;
          line-height: 22px;

          .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
              color: #1890ff;
            }
          }

          .register {
            float: right;
          }
        }
      }
    }
  }
}
.auto-login {
  float: left;
}
.forget {
  float: right;
}
.register-button {
  float: right;
}
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}
#formRegister{
  .borderwidth{
    a{
      border-width: 2px;
    }
  }
}
@media screen and (max-width: 768px) and (min-width: 325px){
  #Register{
    .share-box{
      width: 100%;
      height: 100%;
      padding: 0;
      .phone-main-reg{
        width: 100%;
        height: 100%;
        background-color: #fff;
        #formRegister{
          padding: 0 20px;
          .ant-form-item{
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            margin: 10px 0;
            .ant-form-item-label{
              padding: 0;
            }
          }
          input{
            border: none;
            background-color: rgba(0, 0, 0, 0)
          }
        }
      }
    }
  }
}
</style>
