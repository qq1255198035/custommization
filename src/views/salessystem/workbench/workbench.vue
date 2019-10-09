<template>
  <div id="sys-index">
    <div class="mycontent">
      <img src="./../../../assets/logo-title.png" alt="">
      <p>欢迎来到The Custom King 管理平台！</p>
      <p>
        <router-link to="/OrderManagement">订单管理</router-link>
        <router-link to="/sellerUserList" v-has="'jxs'">经销商审批</router-link>
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
#sys-index{
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100%;
  p{
    color:#33b8b3;
    text-align: center;
    margin: 10px 0;
  }
  a{
    color: #333;
    margin: 0 10px;
    text-decoration: underline;
  }
}
</style>
