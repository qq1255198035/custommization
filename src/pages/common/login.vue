<template>
  <div class="share">
    <div class="share-box">
      <div class="main">
        <header>
          <p class="icon-logotxt"></p>
        </header>
        <a-row>
          <a-col :span="4"></a-col>
          <a-col :span="16">
            <a-form
              id="formLogin"
              class="user-layout-login"
              ref="formLogin"
              :form="form"
            >
              <a-form-item label="账户" class="margin-top-20">
                <a-input
                  size="large"
                  type="text"
                  placeholder="账户"
                  v-decorator="[
                'username',
                {rules: [{ required: true, message: '账户' }], validateTrigger: 'change'}
              ]"
                ></a-input>
              </a-form-item>

              <a-form-item label="密码" class="margin-top-20">
                <a-input
                  size="large"
                  type="password"
                  autocomplete="false"
                  placeholder="密码"
                  v-decorator="[
                'password',
                {rules: [{ required: true, message: '密码'}], validateTrigger: 'blur'}
              ]"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <p class="auto-login">
                  <a-checkbox @change="onChange" v-model="formLogin.rememberMe">自动登录</a-checkbox>
                </p>
                <div class="forget">
                  <router-link class="register" :to="{ name: 'passwordSet' }">
                    <span class="font-18">忘记密码</span>
                  </router-link>
                </div>
              </a-form-item>
              <a-form-item style="margin-top:24px">
                <commonBtn
                  :width="'100%'"
                  :title="'登录'"
                  :height="'68px'"
                  :padding="'15px'"
                  :radio="'18px'"
                  :fontsize="'24px'"
                  @submitLogin="submitLogin"
                >
                </commonBtn>
                <!--<a-button
                  size="large"
                  htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn"
                >登录</a-button>-->
              </a-form-item>

              <div class="user-login-other">
                <router-link class="register" :to="{ path: '/register' }">
                  <span class="font-18">注册账户</span>
                </router-link>
              </div>
            </a-form>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
/*import { timeFix } from '@/utils/util'*/
import { login, getAction } from "@/api/system";
import MyHeader from "@/components/Header/Header";
import commonBtn from "@/components/commonBtn/commonBtn";
//import { encryption } from '@/utils/encryption/aesEncrypt'
export default {
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,

      // stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      formLogin: {
        rememberMe: true
      }
    };
  },
  components: {
    MyHeader,
    commonBtn
  },
  created() {},
  methods: {
    ...mapActions(["Login", "Logout"]),
    onChange() {},
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    submitLogin(e) {
      let loginParams = {
        remember_me: this.formLogin.rememberMe
      };
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === "tab1"
          ? ["username", "password"]
          : ["mobile", "captcha"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          delete loginParams.username;
          loginParams.username = values.username;
          loginParams.password = values.password;
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        }
      });
    },

    loginSuccess(res) {
      console.log(res);
      console.log(this.$router);
      this.$router.push({ path: "/" });
      // 延迟 1 秒显示欢迎信息
      if (res.code != 200) {
        this.$notification["error"]({
          message: "error",
          description: "222",
          duration: 4
        });
      } else {
        this.$notification.success({
          message: "success"
        });
      }
    },
    requestFailed(err) {
      console.log(err);
      this.$notification["error"]({
        message: "err",
        description: ((err.response || {}).data || {}).message || "11",
        duration: 4
      });
    }
  }
};
</script>

<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
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
      header {
        display: flex;
        width: 100%;
        justify-content: center;
        border-bottom: 1px solid #33b8b3;
        padding: 30px;
        p:nth-child(1) {
          color: #5ba997;
          font-size: 60px;
          margin-bottom: 0;
        }
      }
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
</style>
