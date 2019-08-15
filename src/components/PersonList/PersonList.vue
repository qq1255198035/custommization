<template>
  <div>
    <div class="search-wrapper">
      <div class="left">
        <a-radio-group>
          <a-radio-button value="large">全部订单</a-radio-button>
          <a-radio-button value="default">已支付</a-radio-button>
          <a-radio-button value="small">未支付</a-radio-button>
        </a-radio-group>
      </div>
      <div class="right">
        <a-input-search></a-input-search>
      </div>
    </div>
    <div class="list">
      <a-row class="list-title">
        <a-col :xs="24" :sm="6" :md="6">
          <p>订单ID：xxxxxxx xxx xxx</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="6">
          <p>订单时间：2019-07-02 15：00：30</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="6">
          <p>联系商家：xxxxx</p>
        </a-col>
        <a-col :xs="24" :sm="6" :md="6">
          <p class="list-last">状态：发货中</p>
        </a-col>
      </a-row>
      <ul class="list-item">
        <li>
          <a-row>
            <a-col :xs="24" :sm="6" :md="6">
              <div class="avatar">
                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt />
                <div class>
                  <h3>篮球 训练服</h3>
                  <div class="desc">
                    <p>颜色：蓝色</p>
                    <p>尺码：43xl</p>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="6" :md="6">
              <p class="list-p">订单时间：2019-07-02 15：00：30</p>
            </a-col>
            <a-col :xs="24" :sm="6" :md="6">
              <p class="list-p">联系商家：xxxxx</p>
            </a-col>
            <a-col :xs="24" :sm="6" :md="6">
              <p class="list-p" style="border: none;">状态：发货中</p>
            </a-col>
          </a-row>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://vue.ant.design/",
    title: `ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  }
};
</script>
<style lang="less">
.search-wrapper {
  overflow: hidden;
  padding: 14px 0;
  .left {
    float: left;
    padding: 10px 0;
  }
  .right {
    float: right;
    padding: 10px 0;
  }
}
.list {
  .list-title {
    border-bottom: solid 1px rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    .list-last{
        text-align: right;
    }
  }
  .list-item {
    li {
      border-bottom: solid 1px rgba(255, 255, 255, 0.5);
      padding: 10px 0;
      .avatar {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        border-right: solid 1px rgba(255, 255, 255, 0.5);
        h3 {
          color: #ffffff;
        }
        img {
          width: 120px;
          height: 120px;
        }
        .desc {
          vertical-align: bottom;
          padding-top: 10px;
        }
      }
      .list-p {
        text-align: center;
        border-right: solid 1px rgba(255, 255, 255, 0.5);
        line-height: 120px;
      }
      .list-last {
        text-align: right;
      }
    }
  }
}
.ant-input-search-icon {
  color: #ffffff !important;
}
@media screen and(max-width: 760px) {
  .list-last {
    text-align: left;
  }
  .search-wrapper{
      .right{
          float: left;
      }
  }
}
</style>
