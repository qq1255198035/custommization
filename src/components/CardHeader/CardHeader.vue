<template>
  <div class="wrappers">
    <div class="wrappers-box">
      <a-row :gutter="20" type="flex" align="bottom">
        <a-col :span="2"></a-col>
        <a-col :span="4">
          <div class="left-box">
            <div class="avatar">
              <img :src="detailList.topic_url" alt />
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="content">
            <div class="title font-reset">{{detailList.topic}}</div>
            <div class="desc">{{detailList.introduction}}</div>
            <div class="contant">
              <span class="font-reset">联系商家：</span>
              {{detailList.contact}}
            </div>
            <div class="contact">
              <a-row :gutter="20">
                <a-col :span="12">
                  <span>
                    <a-icon class="font-color" type="phone" style="padding-right:6px;" />
                    {{detailList.mobile}}
                  </span>
                </a-col>
                <a-col :span="12">
                  <span>
                    <a-icon class="font-color" type="mail" style="padding-right:6px;"/>
                    {{detailList.email}}
                  </span>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col :xxl="4" :xl="2"></a-col>
        <a-col :xxl="4" :xl="6">
          <div class="right-desc">
            <div class="top" style="overflow:hidden;line-height:40px">
              <span style="float:left">分享给朋友：</span>
              <share  class="share" :config="config">
                
              </share>
            </div>
            <div class="down">
              <div class="texts">
                已支付数量
                <br />
                <span class="font-reset">{{detailList.payNum}}</span>
              </div>
              <a-divider type="vertical" class="my-divider" />
              <div class="texts">
                订单关闭时间
                <br />
                <span class="font-reset">{{detailList.payEndDate}}</span>
              </div>
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
        sites: ["facebook", "wechat", "weibo"], // 启用的站点
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

<style lang="less">
.wrappers {
  margin-top: 40px;
  .wrappers-box {
    .left-box {
      .avatar {
        width: 100%;
        img {
          width: 100%;
          text-align: right;
        }
      }
    }
    .content {
      .title {
        
        padding: 20px 0;
      }
      .contant {
        padding: 20px 0;
      }
    }
    .right-desc {
      float: right;
      .top {
        text-align: right;
        position: relative;
        top: -40px;
      }
      .down {
        display: flex;
        align-items: center;
        justify-items: center;
        text-align: center;
        .texts {
          line-height: 36px;
        }
      }

      .my-divider {
        margin: 0 30px;
        height: 30px;
      }
    }
  }
}

</style>
