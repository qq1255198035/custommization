<template>
  <div>
    <div class="order-details">
      <h1>单号：255421212</h1>
      <p>创建人：丽丽</p>
      <a-row :gutter="20" class="downs">
        <a-col :span="12" class="details-left">
          <p>
            创建时间:
            <span>2019-10-09</span>
          </p>
          <p class="bezu">备注：梵蒂冈梵蒂冈电饭锅的</p>
        </a-col>
        <a-col :span="12" class="details-right">
          <div class="dowmflex">
            <div>
              付款关闭时间
              <br />
              <span>2019/10/15</span>
            </div>

            <a-divider type="vertical" class="my-divider" />
            <div>
              状态
              <br />
              <span>待审批</span>
            </div>

            <a-divider type="vertical" class="my-divider" />
            <div>
              订单金额
              <br />
              <span>￥524.01</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <!---->
      <div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="详情" key="1">
            <div class="details">
              <h3>订单进度</h3>
              <my-stpes :mycurrent="1" stpesnum="6">
                <p slot="p1" style="color: #33b8b3;">提交订单</p>
                <p slot="p2" style="color: #33b8b3;">样稿确认</p>
                <p slot="p3">分享购买</p>
                <p slot="p4">生产中</p>
                <p slot="p5">运输中</p>
                <p slot="p6">完成</p>
              </my-stpes>
              <my-title :title="'商品信息'" :fontsize="16" style="margin-top: 20px;"></my-title>
              <a-row type="flex" class="content" v-for="item in infoList" :key="item.id">
                <a-col :span="10">
                  <div class="left">
                    <h3>{{item.name}}</h3>
                    <ul class="img-box">
                      <li>
                        <img :src="item.positivePicUrl" alt />
                        <span>正面</span>
                      </li>
                      <li>
                        <img :src="item.backPicUrl" alt />
                        <span>背面</span>
                      </li>
                    </ul>
                    <p>
                      价格：
                      <span>$ {{item.price}}</span>
                    </p>
                    <p>
                      <span>颜色：{{item.productColor}}</span>
                      <span style="margin-left: 10px;">
                        数量：
                        <i>{{item.buyNum}}</i>
                        /{{item.quantity}}
                      </span>
                    </p>
                  </div>
                </a-col>
                <a-col :span="14">
                  <div class="right">
                    <h3>已付款信息</h3>
                    <a-table
                      :columns="columns"
                      :dataSource="data"
                      size="middle"
                      :pagination="false"
                    >
                      <span slot="status" slot-scope="text">
                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                      </span>
                      <span slot="userName" slot-scope="text">
                        <div @click="contactInfo(text.id)">{{text}}</div>
                      </span>
                    </a-table>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="物流信息" key="2" forceRender>
            <div class="info">
              <h3>订单进度</h3>
              <ul class="perInfo">
                <li>
                  收货人:
                  <span>曲丽丽</span>
                </li>
                <li>
                  邮编:
                  <span>123456</span>
                </li>
                <li>
                  电子邮件:
                  <span>曲丽丽</span>
                </li>
                <li>
                  收货地址:
                  <span>紧邻生长处是此时此刻</span>
                </li>
              </ul>
              <h3>物流轨迹</h3>
              <ul class="perInfo">
                <li>
                  物流公司：
                  <span>申通快递</span>
                </li>
                <li>
                  运单号：
                  <span>1444554</span>
                </li>
              </ul>
              <ul class="logistics-info">
                <li>cddcdcddddccdcdcdcdcdccdcd</li>
                <li>cddcdcddddccdcdcdcdcdccdcd</li>
                <li>cddcdcddddccdcdcdcdcdccdcd</li>
              </ul>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import MyStpes from "@/components/systemSteps/systemSteps";
import MyTitle from "@/components/MyTitle/MyTitle";
export default {
  props: {},
  data() {
    return {
      mycurrent: 3,
      infoList: [
        {
          backPicUrl:
            "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190906/145350178eca49.png",
          buyNum: 0,
          id: 3344,
          interiorList: [],
          leftPic:
            "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190906/145459344bf76d.png",
          name: "T-shirt",
          positivePicUrl:
            "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190906/14520094634c3f.png",
          price: 80,
          productColor: "pantone 1685",
          quantity: 53,
          rightPicUrl:
            "https://wxmall-1253858660.cos.ap-beijing.myqcloud.com/wxmall/20190906/14552075187e27.png"
        }
      ],
      columns: [
        {
          title: "NAME",
          dataIndex: "userName",
          scopedSlots: { customRender: "userName" }
        },
        {
          title: "EMAIL",
          dataIndex: "email"
        },
        {
          title: "SIZE",
          dataIndex: "size"
        },
        {
          title: "Quantity",
          dataIndex: "number"
        },
        {
          title: "Operating time",
          dataIndex: "pay_time"
        },
        {
          title: "Status",
          dataIndex: "pay_status",
          scopedSlots: { customRender: "status" }
        }
      ],
      data: [
        {
          userName: '张三',
          email: '11595437@qq.com',
          size: 'M',
          number: 2,
          pay_time: '2019-8-1',
          pay_status: 0,
          id:1
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    contactInfo(id) {
      console.log(id)
    }
  },
  components: {
    MyStpes,
    MyTitle
  }
};
</script>

<style lang="less">
.order-details {
  background: #fff;
  padding: 20px;
  .downs {
    padding: 10px 0;
  }
}
.my-divider {
  margin: 0 30px;
  height: 30px;
}
.dowmflex {
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  justify-content: flex-end;
}
.details-left {
  display: flex;
  .bezu {
    padding-left: 120px;
  }
}
.details-right {
  
}


  .details {
    padding: 0 40px;
    h3 {
      padding: 10px 0;
      color: #33b8b3;
      margin: 0;
    }
    .content {
      h3 {
        font-size: 18px;
        color: #33b8b3;
      }
      .left {
        padding: 20px;
        border-bottom: 1px solid #ccc;
        background-color: #eee;
        .img-box {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          li {
            width: 48%;
            text-align: center;

            span {
              color: #999;
            }
            img {
              width: 100%;
              display: block;
              margin-bottom: 5px;
            }
          }
        }
        p:nth-child(3) {
          span {
            font-size: 18px;
            font-weight: bold;
            color: #33b8b3;
          }
        }
        p:nth-child(4) {
          span {
            i {
              font-style: normal;
              font-size: 18px;
              font-weight: bold;
              color: #666;
            }
          }
        }
      }
      .right {
        padding: 20px 10px;
      }
    }
  }
  .info {
    padding: 0 30px;
    h3 {
      font-size: 18px;
      color: #33b8b3;
    }
    .perInfo {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      li {
        width: 33.33333%;
        color: #666;
        margin: 5px 0;
        span {
          color: #999;
        }
      }
    }
  }
  .logistics-info {
    background-color: #eee;
    padding: 20px 20px 100px;
  }

</style>
