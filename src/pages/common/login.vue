<template>
  <div class="share">
    <div class="share-box">
      <div class="main">
        <div class="login">
          <img src="@/assets/logo.png" alt />
        </div>
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <p>账户</p>
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

          <a-form-item>
            <p>密码</p>
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
              <router-link class="register" :to="{ name: 'register' }">忘记密码</router-link>
            </div>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >登录</a-button>
          </a-form-item>

          <div class="user-login-other">
            <router-link class="register" :to="{ path: '/register' }">注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
/*import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'*/
import { login,getAction } from "@/api/system";
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
      formLogin:{
        rememberMe:true
      }
    };
  },
  created() {},
  methods: {
    onChange() {},
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
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
          loginParams.password = values.password
          login(loginParams).then(res => {
            console.log(res)
            this.$ls.set('token',res.result.token)
          });
        }
      });
    },

    loginSuccess(res) {
      console.log(res);
      this.$router.push({ name: "index" });
      // 延迟 1 秒显示欢迎信息
      if (res.code != 1000) {
        this.$notification["error"]({
          message: this.$t("login.error"),
          description: this.$t("login.mmyw") || this.$t("login.message"),
          duration: 4
        });
      } else {
        this.$notification.success({
          message: this.$t("login.error1"),
          description: `${timeFix()}，${this.$t("login.message1")}`
        });
      }
    },
    requestFailed(err) {
      console.log(err);
      this.$notification["error"]({
        message: this.$t("login.error"),
        description:
          ((err.response || {}).data || {}).message ||
          this.$t("login.message2"),
        duration: 4
      });
    }
  }
};
</script>

<style lang="less" scoped>
.share {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);

  .share-box {
    padding: 0px 40px;
    .main {
      width: 40%;
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
</style>
