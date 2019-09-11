<template>
  <div class="share">
    <div class="share-box">
      <div class="main">
        <header>
          <p class="icon-logotxt"></p>
          <p>
            <User></User>
          </p>
        </header>

        <div class="user-layout-register">
          <a-row>
            <a-col :span="4"></a-col>
            <a-col :span="16">
              <my-title :title="itemTitle" :fontsize="24"></my-title>
              <a-form ref="formRegister" :form="form" id="formRegister">
                <a-form-item label="选择角色">
              <a-select
                @change="roleChange"
                v-decorator="['namerole',{rules: [{ required: true, message: '选择角色' }]}]"
              >
                <a-select-option
                  v-for="(item, index) in role"
                  :key="index"
                  :value="item.key"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
                <a-form-item label="邮箱">
                  <a-input
                    size="large"
                    type="text"
                    placeholder="邮箱"
                    v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱' }], validateTrigger: ['change', 'blur']}]"
                  ></a-input>
                  <div v-if="formShow" class="font-splic">
                    <span><a-icon type="close-circle" /></span>
                    <span>{{emailText}}</span>
                  </div>
                </a-form-item>
                <a-row :gutter="12">
                  <a-col :span="12">
                    <a-form-item label="姓">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="姓"
                        v-decorator="['surname', {rules: [{ required: true, message: '请填写姓' }], validateTrigger: ['change', 'blur']}]"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="名">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="名"
                        v-decorator="['monicker', {rules: [{ required: true, message: '请填写名' }], validateTrigger: ['change', 'blur']}]"
                      ></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-popover
                  placement="rightTop"
                  trigger="click"
                  :visible="state.passwordLevelChecked"
                >
                  <template slot="content">
                    <div :style="{ width: '240px'}">
                      <div :class="['user-register', passwordLevelClass]">
                        密码强度
                        <span>{{ passwordLevelName }}</span>
                      </div>
                      <a-progress
                        :percent="state.percent"
                        :showInfo="false"
                        :strokeColor=" passwordLevelColor "
                      />
                      <div style="margin-top: 10px;">
                        <span>请至少输入6位密码，最好包含数字和字母</span>
                      </div>
                    </div>
                  </template>
                  <a-form-item label="密码">
                    <a-input
                      size="large"
                      type="password"
                      @keydown="insertDown"
                      @keyup="insertUp"
                      autocomplete="false"
                      placeholder="密码"
                      v-decorator="['password', {rules: [{ required: true, message: '请填写密码'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                    ></a-input>
                  </a-form-item>
                </a-popover>
                <a-form-item label="确认密码">
                  <a-input
                    size="large"
                    type="password"
                    @keydown="insertDown"
                    @keyup="insertUp"
                    autocomplete="false"
                    placeholder="确认密码"
                    v-decorator="['password2', {rules: [{ required: true, message: '请填写密码'}, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                  ></a-input>
                </a-form-item>
                <a-row :gutter="16" type="flex" align="bottom">
                  <a-col class="gutter-row" :span="16">
                    <a-form-item label="验证码">
                      <a-input
                        size="large"
                        type="text"
                        placeholder="验证码"
                        v-decorator="['captcha', {rules: [{ required: true, message: '验证码' }], validateTrigger: 'blur'}]"
                      >
                        <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                      </a-input>
                    </a-form-item>
                  </a-col>
                  <a-col class="gutter-row" :span="8" style="text-align:right">
                    <a-button
                      v-if="state.smsSendBtn"
                      class="getCaptcha"
                      size="large"
                      :disabled="state.smsSendBtn"
                      @click.stop.prevent="getCaptcha"
                      v-text="(state.time+' s')"
                    >获取验证码</a-button>
                    <a-button
                      v-if="!state.smsSendBtn"
                      class="getCaptcha"
                      size="large"
                      :disabled="state.smsSendBtn"
                      @click.stop.prevent="getCaptcha"
                      v-text="getCode"
                    >获取验证码</a-button>
                  </a-col>
                </a-row>

                <a-form-item>
                  <a-row :gutter="16">
                    <a-col :span="16">
                      <router-link class="login" :to="{ path: '/login' }">已有账户</router-link>
                    </a-col>
                    <a-col :span="8">
                      <commonBtn
                        :icon="'plus'"
                        @register="register"
                        :width="'100%'"
                        :title="'注册'"
                        :height="'44px'"
                        :padding="'10px'"
                        :radio="'12px'"
                        :fontsize="'18px'"
                        :top="'20px'"
                      ></commonBtn>
                    </a-col>
                  </a-row>

                  <!--<a-button
                size="large"
                htmlType="submit"
                class="register-button"
                :loading="registerBtn"
                @click.stop.prevent="handleSubmit"
                :disabled="registerBtn"
                  >注册</a-button>-->
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
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
  0: "至少6位密码，区分大小写 密码强度不够",
  1: "密码强度不够",
  2: "密码强度中级",
  3: "密码强度高"
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
      roleValue: '',
      role:[{
        name: '用户',
        key: 1
      },
      {
        name: '经销商',
        key: 2
      }],
      formShow: false,
      emailText: '',
      itemTitle: "注册",
      registerBtn: false,
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      getCode: "获取验证码",
      // stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      }
    };
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
  methods: {
    roleChange(value) {
      console.log(value)
      this.roleValue = value
    },
    handlePasswordLevel(rule, value, callback) {
      console.log(value);
      let level = 0;
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
      console.log(level);
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error("至少6位密码"));
      }
    },
    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      if (value === undefined) {
        callback(new Error("请再次填写确认密码"));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("两次密码不相同"));
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
      console.log(111);
      this.registerActor("/sys/user/register");
    },
    goRegister() {
      if (!this.activeIndex) {
        this.$message.error("ee");
        console.log(this.current);
      } else {
        this.current = "1";
      }
    },
    registerActor(api) {
      const {
        form: { validateFields },
        $router,
        $notification
      } = this;
      validateFields((err, values) => {
        console.log(values);
        if (!err) {
          registerSubmit(api, {
            username: values.email,
            password: values.password,
            smscode: values.captcha,
            surname: values.surname,
            monicker: values.monicker,
            status: this.roleValue
            //internationalization: localStorage.lang
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
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
        form: { validateFields },
        state,
        $notification
      } = this;
      validateFields(["email"], { force: true }, (err, values) => {
        console.log(values, err);
        if (!err) {
          state.smsSendBtn = true;
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);
          //const hide = $message.loading(this.$t("login.yzmfsz"), 1);
          register({
            email: values.email
            //internationalization: localStorage.lang
          })
            .then(res => {
              console.log(res);
              if(res.code == 500) {
                this.formShow = true,
                this.emailText = res.message
              }
              if (res.status == 200) {
                //setTimeout(hide, 1);
                $notification["success"]({
                  message: "登陆成功",
                  description: "成功",
                  duration: 8
                });
                this.$route.push({
                  path: '/login'
                })
              } else if (res.status == 201) {
                this.$message.error(res.info);
                state.time = 60;
                state.smsSendBtn = false;
              }
            })
            .catch(err => {
              //setTimeout(hide, 1);
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
              this.requestFailed(err);
            });
        }
      });
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "失败",
        description: ((err.response || {}).data || {}).message || "失败",
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
  //background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);

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
        img {
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
    

</style>
