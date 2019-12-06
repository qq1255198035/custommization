<template>
  <div class="share" id="Login">
    <div class="share-box" style="padding: 0 40px;">
      <div class="main" v-if="mobileShow">
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
                  placeholder="Please fill in your email."
                  v-decorator="[
                'username',
                {rules: [{ required: true, message: 'Please fill in your email.' }], validateTrigger: 'change'}
              ]"
                ></a-input>
              </a-form-item>
              <a-form-item label="Password" class="margin-top-20">
                <a-input
                  size="large"
                  type="password"
                  autocomplete="false"
                  placeholder="Please fill in your password."
                  @keyup.enter.native="submitLogin"
                  v-decorator="[
                'password',
                {rules: [{ required: true, message: 'Please fill in your password.'}], validateTrigger: 'blur'}
              ]"
                ></a-input>
              </a-form-item>
              <a-form-item>
                <p class="auto-login">
                  <a-checkbox @change="onChange" :checked="formLogin.rememberMe">Remember Me</a-checkbox>
                </p>
                <div class="forget">
                  <router-link class="register" :to="{ name: 'passwordSet' }">
                    <span class="font-18">Forgot Password?</span>
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
                  <span class="font-18">Register</span>
                </router-link>
              </div>
            </a-form>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
      </div>
      <div class="phone-main" v-else>
        <h1>
          <img src="@/assets/logoWhite.png" alt="">
        </h1>
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form">
              <a-form-item class="margin-top-20">
                <a-input
                  size="large"
                  type="text"
                  placeholder="Please fill in the account."
                  v-decorator="[
                'username1',
                {rules: [{ required: true, message: 'Please fill in the account.' }], validateTrigger: 'blur'}
              ]"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color:rgba(255,255,255,1)"
                  />
                </a-input>
              </a-form-item>

              <a-form-item class="margin-top-20">
                <a-input
                  size="large"
                  type="password"
                  autocomplete="false"
                  placeholder="Please fill in the password."
                  @keyup.enter.native="submitLoginMobile"
                  v-decorator="[
                'password1',
                {rules: [{ required: true, message: 'Please fill in the password.'}], validateTrigger: 'blur'}
              ]"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color:rgba(255,255,255,1)"
                  />
                </a-input>
              </a-form-item>
              
              <a-form-item style="margin-top:24px">
                <commonBtn
                  :width="'100%'"
                  :title="'Login'"
                  :height="'44px'"
                  :padding="'15px'"
                  :radio="'18px'"
                  :fontsize="'18px'"
                  @submitLogin="submitLoginMobile"
                ></commonBtn>
              </a-form-item>

              <div class="user-login-other" style="text-align: center;">
                <router-link class="register" :to="{ path: '/register' }">
                  <span class="font-18" style="color: #fff">Creat New User</span>
                </router-link>
              </div>
              <a-form-item style="margin-top: 30px;">
                <p class="auto-login">
                  <a-checkbox @change="onChange" :checked="formLogin.rememberMe" style="color: #fff;">Remember Me</a-checkbox>
                </p>
                <div class="forget">
                  <router-link class="register" :to="{ name: 'passwordSet' }">
                    <span class="font-18" style="color: #fff;">Forget password</span>
                  </router-link>
                </div>
              </a-form-item>
            </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from "vuex";
/*import { timeFix } from '@/utils/util'*/
import commonBtn from "@/components/commonBtn/commonBtn";
import { ACCESS_TOKEN } from "@/store/mutation-types"
//import { encryption } from '@/utils/encryption/aesEncrypt'
export default {
  data() {
    return {
      loginBtn: false,
      loginType: 0,
      
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      },
      formLogin: {
        rememberMe: false
      },
      mobileShow: false
    };
  },
  components: {
    commonBtn
  },
  created() {
    Vue.ls.remove(ACCESS_TOKEN);
    this.SetRoles();
    this.form = this.$form.createForm(this)
  },
  mounted() {
    this.getWindowScreen();
    
  },
  methods: {
    ...mapActions(["Login", "SetRoles"]),
    getWindowScreen(){
      let screenWidths = window.screen.width;
      if(screenWidths > 768){
        this.mobileShow = true;
        setTimeout(() => {
          if(this.getCookie('remember') == 'true'){
            this.form.setFieldsValue({
              username: this.getCookie('username'),
              password: '******'
            })
            this.formLogin.rememberMe = true;
          }else{
            this.form.setFieldsValue({
              username: '',
              password: ''
            })
            this.formLogin.rememberMe = false;
          }
        },0) 
      }else{
        this.mobileShow = false;
        setTimeout(() => {
          if(this.getCookie('remember') == 'true'){
            this.form.setFieldsValue({
              username1: this.getCookie('username'),
              password1: '******'
            })
            this.formLogin.rememberMe = true;
          }else{
            this.form.setFieldsValue({
              username1: '',
              password1: ''
            })
            this.formLogin.rememberMe = false;
          }
        },0) 
      }
    },
    onChange(e) {
      this.formLogin.rememberMe = e.target.checked
    },
    submitLogin() {
      const {
        form: { validateFields },
        state,
        Login
      } = this;
      state.loginBtn = true;
      if(this.getCookie('remember') == 'true'){
        validateFields(["username", "password"], { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values };
            delete loginParams.username;
            loginParams.username = values.username;
            loginParams.password = values.password == '******' ? '' : values.password;
            loginParams.captcha = this.getCookie('username') == values.username ? 0 : 1;
            Login(loginParams)
              .then(res => this.loginSuccess(res))
              // eslint-disable-next-line
              .catch(err => {})
              .finally(() => {
                state.loginBtn = false;
              });
          }
        });
      }else{
        validateFields(["username", "password"], { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values };
            delete loginParams.username;
            loginParams.username = values.username;
            loginParams.password = values.password;
            loginParams.captcha = 1;
            Login(loginParams)
              .then(res => this.loginSuccess(res))
              // eslint-disable-next-line
              .catch(err => {})
              .finally(() => {
                state.loginBtn = false;
              });
          }
        });
      }
      
    },
    submitLoginMobile() {
      const {
        form: { validateFields },
        state,
        Login
      } = this;
      state.loginBtn = true;
      if(this.getCookie('remember') == 'true'){
        validateFields(["username1", "password1"], { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values };
            delete loginParams.username1;
            loginParams.username = values.username1;
            loginParams.password = values.password1 == '******' ? '' : values.password1;
            loginParams.captcha = this.getCookie('username1') == values.username1 ? 0 : 1;
            Login(loginParams)
              .then(res => this.loginSuccess(res))
              // eslint-disable-next-line
              .catch(err => {})
              .finally(() => {
                state.loginBtn = false;
              });
          }
        });
      }else{
        validateFields(["username1", "password1"], { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values };
            delete loginParams.username1;
            loginParams.username = values.username1;
            loginParams.password = values.password1;
            loginParams.captcha = 1;
            Login(loginParams)
              .then(res => this.loginSuccess(res))
              // eslint-disable-next-line
              .catch(err => {})
              .finally(() => {
                state.loginBtn = false;
              });
          }
        });
      }
    },
    setCookie(name, value, day){
        if(day !== 0){
            let expires = day * 24 * 60 * 60 * 1000;
            let date = new Date(+new Date()+expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
        }else{
            document.cookie = name + "=" + escape(value);
        }
    },
    getCookie(name){
        let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); 
        return false;
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
      if (res.code !== 200) {
        this.$notification["error"]({
          message: "Login failed",
          description: res.message,
          duration: 4
        });
      } else {
        this.$notification.success({
          message: "Login successfully"
        });
        this.setCookie('username',res.result.userInfo.username,30);
        this.setCookie('remember',this.formLogin.rememberMe,30);
      }
    },
    
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
@media screen and (max-width: 768px) and (min-width: 325px){
  #Login{
    .share-box{
      .phone-main{
        .margin-top-20{
          input{
            background-color: rgba(255, 255, 255, 0.2) !important;
            border-radius: 20px;
          }
        }
        h1{
          width: 90%;
          margin: 0 auto;
          padding: 100px 0 50px;
          img{
            width: 100%;
          }
        }
      }
    }
  }
  
  
}
</style>
