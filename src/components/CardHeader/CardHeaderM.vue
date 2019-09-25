<template>
  <div class="wrappers-mobile">
    <div class="wrappers-box">
    <a-row type="flex" align="top" :gutter="16">
        <a-col :span="8">
            <div class="left-box">
                <div class="avatar">
                    <img :src="detailList.topic_url"/>
                </div>
            </div>
        </a-col>
        <a-col :span="16">
            <div class="content">
                <div class="title font-reset" style="display: flex;justify-content: space-between;align-items: center;">
                    {{detailList.topic}}
                    <a style="color: #333;font-size: 14px;" @click="openMobileSharebox">
                        <a-icon type="upload" style="color: #33b8b3;font-size: 16px;"/>    
                        Share
                    </a>    
                </div>
                <div class="desc">{{detailList.introduction}}</div>
                <div class="contant">
                    <span class="font-reset" style="font-size: 14px">Contact Seller：</span>
                    {{detailList.contact}}
                </div>
                <div class="contact">
                    <a-row style="display: flex;flex-direction: column;">
                        <a-col :span="24">
                        <span>
                            <a-icon class="font-color" type="phone" style="padding-right:6px;" />
                            {{detailList.mobile}}
                        </span>
                        </a-col>
                        <a-col :span="24">
                        <span>
                            <a-icon class="font-color" type="mail" style="padding-right:6px;display: inline"/>
                            {{detailList.email}}
                        </span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-col>
      </a-row>
      <div class="down">
            <div class="texts">
                <p>Paid Quantity</p>
                <span class="font-reset">{{detailList.payNum}}</span>
            </div>
            <a-divider type="vertical" class="my-divider" />
            <div class="texts">
                <p>Order Deadline</p>
                <span class="font-reset">{{detailList.payEndDate}}</span>
            </div>
        </div>
        <a-drawer
            title="Share"
            placement="bottom"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :height="200"
            >
            <a-col :xxl="5" :xl="6">
                <div class="right-desc">
                    <div class="top" style="line-height:40px;display: flex;justify-content: center; align-items: center;">
                        <share v-if="share" class="share mobile-share" :config="config" ></share>
                        <span>
                            <a-button
                                class="copys mobile-copys"
                                icon="link"
                                v-clipboard:copy="config.url"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                            ></a-button>
                        </span>
                    </div>
                </div>
            </a-col>
        </a-drawer>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  props: {
    detailList: {}
  },
  data() {
    return {
        visible: false,
        shareWxs: false,
        newUrl: '',
        share: false,
        config: {
            url: window.location.href, // 网址，默认使用 window.location.href
            source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
            title: "title", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
            description: "description", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
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
  mounted() {
    this.codeSet()
  },
  watch: {},
  methods: {
    openMobileSharebox(){
        this.visible = true
    },
    onClose() {
        this.visible = false
    },
    codeSet() {
      var canvas = document.getElementById("canvas");
      const url = this.config.url
      QRCode.toCanvas(canvas, url,{
        width: 120,
        height:120
      }, function(error) {
          if (error) {
            console.error(error);
          }
        });
    },
    shareWx() {
      this.shareWxs = true;
    },
    shareWxOut() {
      this.shareWxs = false;
    },
    _detailList() {
      this.share = true;
      if (this.share) {
        this.config.image = this.detailList.topic_url;
        this.config.title = this.detailList.topic;
        this.config.description = this.detailList.introduction;
      }
    },
    onCopy() {
      this.$message.success("Replication success");
    },
    onError() {
      this.$message.error("copy failed");
    }
  },
  components: {}
};
</script>

<style lang="less">
.wx-font {
  font-size: 20px;
  color: #33b8b3;
  line-height: 0
}
.newWx{
  position: absolute;
  bottom: 40px;
  margin-left: -60px;
  text-align: center;
  padding: 10px;
  background: #fff;
  box-shadow: 0 1px 2px #eee;
  line-height: 16px;
}
.mobile-copys {
  width: 50px;
  height: 50px;
  padding: 0;
  border: 1px solid #33b8b3;
  box-shadow: none;
  border-radius: 50%;
  margin-left: 20px;
  i{
      font-size: 30px;
  }
}
.wrappers-mobile {
  margin-top: 20px;
  .wrappers-box {
        padding: 0 20px;
        .left-box {
            .avatar {
                width: 100%;
                img {
                    width: 100%;
                    max-height: 125px;
                    text-align: right;
                }
            }
        }
        .content{
            .contact{
                .font-color{
                    svg{
                        display: inline;
                    }
                }
            }
        }
        .down {
            display: flex;
            align-items: flex-start;
            text-align: center;
            justify-content: space-between;
            padding: 20px;
            border-bottom: 1px solid #ccc;
        }
        .right-desc {
        //float: right;
            .top {
                text-align: right;
                position: relative;
                top: -40px;
            }
        }
        .my-divider {
            margin: 0 30px;
            height: 50px;
        }
    }
}
.mobile-share{
    .social-share-icon{
        font-size: 30px;
        width: 50px;
        height: 50px;
        border: 1px solid #33b8b3 !important;
        line-height: 50px;
        margin: 0 20px;
    }
}
</style>
