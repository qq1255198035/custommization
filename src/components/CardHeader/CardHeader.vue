<template>
  <div class="wrapper">
    <div class="wrapper-box">
      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="left-box">
            <div class="avatar">
              <img :src="detailList.topic_url" alt />
            </div>
            <div class="content">
              <h1 class="title">{{detailList.topic}}</h1>
              <p class="desc">{{detailList.introduction}}</p>
              <h3 class="contant">联系商家：{{detailList.contact}}</h3>
              <div class="contact">
                <span style="padding-right:16px"><a-icon type="phone" style="padding-right:6px" />{{detailList.mobile}}</span>
                <span><a-icon type="mail" style="padding-right:6px"/>{{detailList.email}}</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="right-desc">
            <div class="top">
              <share class="share" :config="config"></share>
            </div>
            <div class="down">
              <p>
                已支付数量
                <br />
                <span>{{detailList.payNum}}</span>
              </p>
              <a-divider type="vertical" class="my-divider" />
              <p>
                订单关闭时间
                <br />
                <span>{{detailList.payEndDate}}</span>
              </p>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailList: {}
  },
  data() {
    return {
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "11", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "222", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
        sites: ["weibo", "wechat", "facebook"], // 启用的站点
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.wrapper {
  margin-top: 40px;
  .wrapper-box {
    .left-box {
      display: flex;
      .avatar {
        width: 200px;
        height: 200px;
        margin-right: 10px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .content {
        padding-right: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 20px;
          color: #ffffff;
          padding-bottom: 24px;
        }
        .contant {
          color: #ffffff;
        }
      }
    }
    .right-desc {
      
      float: right;
      .top{
            text-align: right;
      }
      .down {
            display: flex;
      align-items: center;
      justify-items: center;
      text-align: center;
        p {
          line-height: 36px;
          span {
            font-size: 20px;
          }
        }
      }

      .my-divider {
        margin: 0 50px;
        height: 30px;
      }
    }
  }
}
.social-share .icon-weibo {
  color: #ffffff !important;
  border: #ffffff !important;
}
@media screen and(max-width: 700px) {
  .content {
    padding: 0 !important;
  }
}
</style>
