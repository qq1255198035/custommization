<template>
  <div id="OrderDetails">
    <div class="container">
      <header>
        <p class="icon-logotxt"></p>
        <p>
          <User></User>
        </p>
      </header>
      <my-title :title="'订单详情'" style="padding: 0 30px;margin-top: 20px;">
        <a-button size="small" icon="rollback" @click="$router.push({path: '/grouporder'})">返回</a-button>
      </my-title>
      <a-row type="flex" justify="space-between" align="top" style="height: calc(100% - 167px);">
        <a-col :span="7" class="scroll-box left-side">
          <div class="order-info">
            <dl class="top">
              <dt>订单ID：</dt>
              <dd>{{information.orderId}}</dd>
              <dt>订单时间：</dt>
              <dd>{{information.orderTime}}</dd>
            </dl>
            <ul class="bottom">
              <li v-for="item in information.list" :key="item.id">
                <img :src="item.positive_pic_url" alt />
                <div>
                  <div>
                    <h3>{{item.name}}</h3>
                    <p>颜色：{{item.product_color}}</p>
                    <p>价格：${{item.price}}</p>
                    <p>数量：{{item.quantity}}</p>
                  </div>
                  <p>
                    <a-icon type="edit" @click="showEdModal" />

                    <a-icon type="delete" @click="deletePro(item.id)" />
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </a-col>
        <a-col :span="16" style="padding-right: 30px;padding-bottom: 20px;" class="scroll-box">
          <ul class="forms">
            <li>
              <h3>预期订货数量</h3>
              <a-form :form="myform" style="padding-left: 30px;">
                <a-form-item label="标题" :label-col="{ span: 1 }" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-decorator="[
                                    'note',
                                    {rules: [{ required: true, message: 'Please input your note!' }]}
                                    ]"
                  />
                </a-form-item>
                <a-form-item label="简介" :label-col="{ span: 1 }" :wrapper-col="{ span: 12 }">
                  <a-textarea
                    :rows="4"
                    v-decorator="[
                                    'desc',
                                    {rules: [{ required: true, message: 'Please input your note!' }]}
                                    ]"
                  />
                </a-form-item>
              </a-form>
            </li>
            <li>
              <h3>
                选择付款截止日期
                <span>描述1313213213213232</span>
              </h3>
              <div style="padding-left: 30px;">
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="startValue"
                  placeholder="Start"
                  @openChange="handleStartOpenChange"
                />
                <a-date-picker
                  :disabledDate="disabledEndDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                  v-model="endValue"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  style="margin-left: 10px;"
                />
              </div>
            </li>
            <li>
              <h3>
                运输方式
                <span>描述4465+5+65+66+56+6+</span>
              </h3>
              <div class="select-way">
                <a-radio-group @change="onChange" v-model="value">
                  <a-radio :value="1" style="display: flex; align-items: top;">
                    <h4>统一地址发货</h4>
                  </a-radio>
                  <div style="margin-left: 24px;">
                    <p>用户付款后，我们会统一发送到同一地址，由收到包裹的人员一起发放。</p>
                    <h4>
                      收货地址：
                      <span @click="addressManagement">
                        <a-icon type="edit" />管理地址
                      </span>
                    </h4>
                    <p>{{adress}}</p>
                  </div>
                  <a-radio :value="2" style="display: flex; align-items: top;">
                    <h4>发别发货</h4>
                  </a-radio>
                  <div style="margin-left: 24px;">
                    <p>用户付款后，我们会统一发送到同一地址，由收到包裹的人员一起发放。</p>
                  </div>
                </a-radio-group>
              </div>
            </li>
            <li>
              <h3>开始</h3>
            </li>
          </ul>
          <a-button style="margin-left: 30px;">开始团体订单</a-button>
        </a-col>
      </a-row>
      <a-modal v-model="modelShow1" :footer="null" :width="700" :centered="true" title="管理地址">
        <ul class="adress">
          <li
            v-for="(item,index) in adressList"
            :key="index"
            @click="setDefaultAdress(item.detailInfo)"
          >
            <p>
              {{item.addressName}}{{item.detailInfo}}
              <span>{{item.userName}}</span>
              <span>{{item.telNumber}}</span>
            </p>
            <span>
              <a-icon type="edit" style="margin-right: 10px;" @click="editAddress(item.id)" />
              <a-icon type="delete" @click="postDeleteAddress(item.id)" />
            </span>
          </li>
        </ul>
        <div class="btn-box">
          <a-button icon="plus" style="width: 200px;" @click="inputAdress">添加地址</a-button>
        </div>
      </a-modal>
      <a-modal v-model="modelShow2" :footer="null" :centered="true" title="添加地址">
        <div class="form-box">
          <a-form layout="vertical" :form="form">
            <a-form-item label="地址别名：">
              <a-input
                v-decorator="['bm',{rules: [{ required: true, message: '请填写地址别名（如： 家、公司）！' }]}]"
              />
            </a-form-item>
            <a-form-item label="国家/省/市：">
              <a-cascader
                :options="options"
                placeholder="Please select"
                v-decorator="['country',{rules: [{ required: true, message: '请填写国家、省、市！' }]}]"
              />
            </a-form-item>
            <a-form-item label="详细地址：">
              <a-input
                v-decorator="['adress',{rules: [{ required: true, message: '请填写国家、省、市！' }]}]"
              />
            </a-form-item>
            <a-form-item label="邮编：">
              <a-input v-decorator="['email',{rules: [{ required: true, message: '请填写邮编！' }]}]" />
            </a-form-item>
            <a-form-item label="联系人：">
              <a-input
                v-decorator="['phonesome',{rules: [{ required: true, message: '请填写联系人！' }]}]"
              />
            </a-form-item>
            <a-form-item label="电话：">
              <a-input
                type="tel"
                v-decorator="['tel',{rules: [{ required: true, message: '请填写电话！' }]}]"
              />
            </a-form-item>
          </a-form>
          <div class="btn-box">
            <a-button type="primary" style="padding: 0 30px;" @click="postAddAddress">提 交</a-button>
            <a-button style="padding: 0 30px;">取 消</a-button>
          </div>
        </div>
      </a-modal>
      <a-modal
        class="show-details"
        title="Nike T恤"
        v-model="showVisible"
        @ok="handleOk"
        width="60%"
      >
        <a-row :gutter="20" style="padding:20px">
          <a-col :span="8">
            <a-row :gutter="20">
              <a-col :span="12">
                <img width="290" height="290" src alt />
              </a-col>
              <a-col :span="12">
                <img width="290" height="290" src alt />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="16">
            <div class="title font-18">颜色：蓝色</div>
            <div class="number">
              <div class="font-18">数量：</div>
              <div class="number-box">
                <div class="minus common-radio" @click="minus">
                  <a-icon type="minus" />
                </div>
                <div class="num">
                  <a-input v-model="nums" type="number" />
                </div>
                <div class="plus common-radio" @click="plus">
                  <a-icon type="plus" />
                </div>
              </div>
              <div class="price-right">
                预计代理价格：
                <span>￥80</span>
              </div>
            </div>
            <div class="font-color">最小起订量为15</div>
            <div class="prices">
              <div class="price-box">
                <div class="font-18">价格:</div>
                <div class="price-input">
                  <a-input-number size="200px" :min="1" v-model="prices" @change="onChange" />
                </div>
                <div class="font-18">/件</div>
              </div>
              <div class="price-right">
                预计代理收益：
                <span>￥300</span>
              </div>
            </div>
            <div class="font-color">建议售价：￥100/件</div>
          </a-col>
        </a-row>
      </a-modal>
    </div>
  </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import User from "@/components/Header/User";
import {
  adressList,
  addressOne,
  addAddress,
  queryById,
  deleteAddress,
  teamOrderDetails,
  delProducts
} from "@/api/seller";
export default {
  components: {
    MyTitle,
    User
  },
  data() {
    return {
      nums: 1,
      showVisible: true,
      prices: 100,
      adress: "",
      id: "",
      form: this.$form.createForm(this),
      myform: this.$form.createForm(this),
      modelShow1: false,
      modelShow2: false,
      value: 1,
      number: 0,
      startValue: null,
      endValue: null,
      endOpen: false,
      information: {
        orderId: "",
        orderTime: "",
        list: []
      },
      adressList: [],
      options: []
    };
  },
  mounted() {
    this.getAdressList();
    this.getAddressOne();
    this.id = this.$route.query.id;
    //console.log(this.id)
    this.getTeamOrderDetails(this.id);
  },
  methods: {
    minus() {
      if (this.nums > 1) {
        this.nums--;
      }
    },
    plus() {
      this.nums++;
    },
    showEdModal() {
      this.showVisible = true;
    },
    deletePro(id) {
      let that = this;
      that.$confirm({
        title: "Are you sure delete this task?",
        okText: "Yes",
        cancelText: "No",
        class: "my-modal",
        onOk() {
          console.log("OK");
          that.postDelProducts(id);
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    postDelProducts(id) {
      delProducts(id).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.getTeamOrderDetails(266);
          this.$message.success(res.message);
        }
      });
    },
    getTeamOrderDetails(id) {
      teamOrderDetails(id).then(res => {
        console.log(res);
        this.information.orderId = res.result.orderSn;
        this.information.orderTime = res.result.createTime;
        this.information.list = res.result.list;
      });
    },
    postDeleteAddress(id) {
      deleteAddress(id).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.getAdressList();
          this.$message.success(res.message);
        }
      });
    },
    editAddress(id) {
      this.id = id;
      this.modelShow1 = false;
      this.modelShow2 = true;
      this.queryAddressById(this.id);
    },
    queryAddressById(id) {
      queryById(id).then(res => {
        console.log(res);
        console.log(res.result.addressCode.split(","));
        this.form.setFieldsValue({
          bm: res.result.name,
          country: res.result.addressCode.split(","),
          adress: res.result.detailInfo,
          email: res.result.postalCode,
          phonesome: res.result.userName,
          tel: res.result.telNumber
        });
      });
    },
    postAddAddress() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          let params = {
            id: this.id,
            userName: values.phonesome,
            postalCode: values.email,
            telNumber: values.tel,
            addressName: values.country.join(","),
            detailInfo: values.adress,
            name: values.bm
          };
          console.log(values.country.join(","));
          addAddress(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.message);
              this.modelShow2 = false;
              this.getAdressList();
            }
          });
        }
      });
      //
    },
    getAddressOne() {
      addressOne().then(res => {
        console.log(res);
        this.options = res.result;
      });
    },
    inputAdress() {
      this.id = "";
      this.modelShow1 = false;
      this.modelShow2 = true;
    },
    addressManagement() {
      this.modelShow1 = true;
    },

    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    getAdressList() {
      adressList().then(res => {
        console.log(res);
        this.adressList = res.result;
        this.adress = res.result[0].detailInfo;
      });
    },
    setDefaultAdress(item) {
      this.adress = item;
      this.modelShow1 = false;
      this.$message.success("地址设置成功！");
    }
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    }
  }
};
</script>
<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.form-box {
  padding: 30px 30px 0;
}

.btn-box {
  padding: 20px 0;
  text-align: center;
  button {
    margin: 0 10px;
  }
}
.show-details {
  .title {
  }
  .number {
    display: flex;
    align-items: center;
    padding: 20px 0 10px 0;
    .number-box {
      display: flex;
      align-items: center;
      .common-radio {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #33b8b3;
        text-align: center;
        line-height: 24px;
        color: #fff;
        margin: 4px 0;
        cursor: pointer;
      }
      .minus {
      }
      .num {
        margin: 0 10px;
        text-align: center;
      }
    }
  }
  .prices {
    display: flex;
    align-items: center;
    margin: 20px 0 10px 0;
    .price-box{
        display: flex;
        align-items: center;
        .price-input {
      padding: 0 10px;
      width: 100px;
    }
    }
    
  }
}
.price-right {
  flex: 1;
  text-align: right;
}
.adress {
  padding: 30px 50px;
  margin: 0;
  li {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      background-color: #e3f2f0;
    }
    p {
      font-size: 14px;
      margin: 0;
      span {
        margin: 0 10px;
      }
    }
    > span {
      i {
        font-size: 20px;
        cursor: pointer;
        color: #33b8b3;
      }
    }
  }
}
#OrderDetails {
  width: 100%;
  height: 100%;
  padding: 50px;
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #33b8b3;
      padding: 10px 30px;
      p:nth-child(1) {
        color: #33b8b3;
        font-size: 60px;
        margin-bottom: 0;
        padding-top: 10px;
      }
    }
    .order-info {
      .top {
        padding: 20px 0;
        border-bottom: 1px solid #fff;
        dt {
          color: #33b8b3;
          font-size: 18px;
        }
        dd {
          margin: 10px 0;
          font-size: 16px;
        }
      }
      .bottom {
        li {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #fff;
          padding: 10px 0;
          justify-content: space-between;
          > img {
            width: 120px;
            height: 120px;
          }
          > div {
            display: flex;
            align-items: flex-end;
            height: 100%;
            width: calc(100% - 150px);
            h3 {
              color: #33b8b3;
              font-size: 18px;
            }
            div {
              width: 70%;
              p {
                margin: 0;
                font-size: 16px;
              }
            }
            > p {
              width: 30%;
              margin: 0;
              text-align: right;
              i {
                font-size: 24px;
                margin: 0 5px;
                cursor: pointer;
                color: #33b8b3;
              }
            }
          }
        }
      }
    }
    .forms {
      position: relative;
      .ant-form-item-control-wrapper {
        margin-left: 10px;
      }
      .ant-form-item-label {
        width: 53px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 7px;
        top: 10px;
        background-color: #33b8b3;
        width: 1px;
        height: 97%;
      }
      li {
        h3 {
          position: relative;
          color: #33b8b3;
          margin: 20px 0;
          padding-left: 30px;
          span {
            font-size: 12px;
            margin-left: 10px;
          }
          &:before {
            content: "";
            width: 14px;
            height: 14px;
            border-radius: 7px;
            background-color: #33b8b3;
            position: absolute;
            left: 0;
            top: 6px;
          }
        }
        h4 {
          color: #33b8b3;
          display: flex;
          justify-content: space-between;
          span {
            cursor: pointer;
            color: #33b8b3;
          }
        }
        .select-way {
          padding-left: 30px;
          p {
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
          }
        }
      }
    }
    #stepper {
      padding-left: 30px;
      .stepper-input {
        box-sizing: border-box;
        width: 32px;
        height: 28px;
        padding: 0;
        color: #fff;
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
        background-color: rgba(255, 255, 255, 0.5);
        border: 0;
        border-width: 1px 0;
        border-radius: 0;
        -webkit-appearance: none;
        outline: none;
      }
      .left {
        position: relative;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        margin: 0;
        padding: 5px;
        color: #fff;
        vertical-align: middle;
        background-color: rgba(255, 255, 255, 0.5);
        border: 0;
        border-radius: 4px 0 0 4px;
        border-right: 1px solid #fff;
        outline: none;
        cursor: pointer;
        line-height: 14px;
      }
      .right {
        position: relative;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        margin: 0;
        padding: 5px;
        color: #fff;
        vertical-align: middle;
        background-color: rgba(255, 255, 255, 0.5);
        border: 0;
        border-radius: 0 4px 4px 0;
        border-left: 1px solid #fff;
        outline: none;
        cursor: pointer;
        line-height: 14px;
      }
    }
    .left-side {
      padding: 20px 30px;
      background-color: #eee;
    }
    .scroll-box {
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 6px; /*宽分别对应竖滚动条的尺寸*/
        /*高分别对应横滚动条的尺寸*/
        background-color: #fff;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #33b8b3;
        border-radius: 4px;
        height: 10%;
      }
    }
  }
}
</style>