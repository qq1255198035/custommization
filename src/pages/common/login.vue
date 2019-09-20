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
            <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form">
              <a-form-item label="Account" class="margin-top-20">
                <a-input
                  size="large"
                  type="text"
                  placeholder="Please fill in the account."
                  v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please fill in the account.' }], validateTrigger: 'change'}
              ]"
                ></a-input>
              </a-form-item>

              <a-form-item label="Password" class="margin-top-20">
                <a-input
                  size="large"
                  type="password"
                  autocomplete="false"
                  placeholder="Please fill in the password."
                  @keyup.enter.native="submitLogin"
                  v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please fill in the password.'}], validateTrigger: 'blur'}
              ]"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <p class="auto-login">
                  <a-checkbox @change="onChange" :checked="formLogin.rememberMe">Automatic logon</a-checkbox>
                </p>
                <div class="forget">
                  <router-link class="register" :to="{ name: 'passwordSet' }">
                    <span class="font-18">Forget password</span>
                  </router-link>
                </div>
              </a-form-item>
              <a-form-item style="margin-top:24px">
                <commonBtn
                  :width="'100%'"
                  :title="'Login'"
                  :height="'44px'"
                  :padding="'15px'"
                  :radio="'18px'"
                  :fontsize="'18px'"
                  @submitLogin="submitLogin"
                ></commonBtn>
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
                  <span class="font-18">Registered accounts</span>
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
    commonBtn
  },
  created() {},
  mounted() {
    this.getCookie();
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    onChange(e) {
      this.formLogin.rememberMe = e.target.checked
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    submitLogin() {
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
          if (this.formLogin.rememberMe) {
            this.setCookie(values.username, values.password, 3);
          } else {
            this.clearCookie();
            this.formLogin.rememberMe = false
          }
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
      if (this.$route.query.order_id) {
        this.$router.push({
          path: "/share",
          query: {
            order_id: this.$route.query.order_id
          }
        });
      } else {
        this.$router.push({ path: "/index" });
      }

      // 延迟 1 秒显示欢迎信息
      if (res.code != 200) {
        this.$notification["error"]({
          message: "Login failed",
          description: res.message,
          duration: 4
        });
      } else {
        this.$notification.success({
          message: "Login successfully"
        });
      }
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "the error message",
        description: ((err.response || {}).data || {}).message || "the error message",
        duration: 4
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            console.log(arr2[1])
            this.form.setFieldsValue({['username']:arr2[1]}) //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.form.setFieldsValue({['password']:arr2[1]})
            //this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>

<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
.share {
  //width: 100%;
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
          padding-top: 20px;
          padding-bottom: 40px;
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
