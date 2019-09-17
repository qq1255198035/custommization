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
              <span class="font-reset">Contact Seller：</span>
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
                    <a-icon class="font-color" type="mail" style="padding-right:6px;" />
                    {{detailList.email}}
                  </span>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col :xxl="3" :xl="2"></a-col>
        <a-col :xxl="5" :xl="6">
          <div class="right-desc">
            <div class="top" style="line-height:40px;display: flex;">
              <span>Share to a Friend：</span>
              <share v-if="share" class="share" :config="config"></share>
              <span>
                <a-button
                  class="copys"
                  icon="link"
                  v-clipboard:copy="config.url"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                ></a-button>
              </span>
            </div>
            <div class="down">
              <div class="texts">
                Paid Quantity
                <br />
                <span class="font-reset">{{detailList.payNum}}</span>
              </div>
              <a-divider type="vertical" class="my-divider" />
              <div class="texts">
                Order Deadline
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
      share: false,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "标题", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "描述", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
        //sites: ["facebook", "wechat", "weibo"], // 启用的站点
        sites: ["facebook", "wechat"],
        //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "WeChat Scan: Share", // 微信二维码提示文字
        wechatQrcodeHelper: "Scan and share this article with friends."
      }
    };
  },
  computed: {},
  created() {},
  beforeUpdate() {
    this._detailList();
  },
  mounted() {},
  watch: {},
  methods: {
    _detailList() {
      this.share = true;
      if (this.share) {
        this.config.image = this.detailList.topic_url;
        this.config.title = this.detailList.topic;
        this.config.description = this.detailList.introduction;
      }
    },
    onCopy() {
      this.$message.success("复制成功");
    },
    onError() {
      this.$message.error("复制失败");
    }
  },
  components: {}
};
</script>

<style lang="less">
.copys {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  box-shadow: none;
}
.wrappers {
  margin-top: 40px;
  .wrappers-box {
    .left-box {
      .avatar {
        width: 100%;
        img {
          width: 200px;
          height: 200px;
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
      //float: right;
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
