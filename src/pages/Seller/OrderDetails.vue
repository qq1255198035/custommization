<template>
  <div id="OrderDetails">
    <div class="container">
      <header>
        <router-link to="/index">
          <p class="icon-logotxt"></p>
        </router-link>
        <p>
          <User></User>
        </p>
      </header>
      <my-title :title="'Group Order Details:'" style="padding: 0 30px;margin-top: 10px;overflow:hidden;">
        <a-button size="small" icon="rollback" @click="$router.go(-1)">Back</a-button>
      </my-title>
      <a-row type="flex" justify="space-between" align="top" style="height: calc(100% - 157px);">
        <a-col :span="7" class="scroll-box left-side">
          <div class="order-info">
            <dl class="top">
              <dt>Order ID: </dt>
              <dd>{{information.orderId}}</dd>
              <dt>Order time: </dt>
              <dd>{{information.orderTime | formatTime}}</dd>
            </dl>
            <ul class="bottom">
              <li v-for="item in information.list" :key="item.id">
                <img :src="item.positive_pic_url" v-preview="item.positive_pic_url"/>
                <div>
                  <div>
                    <h3>{{item.name}}</h3>
                    <p>Colour: {{item.product_color}}</p>
                    <p>Price: ${{item.price}}</p>
                    <p>Quantity: {{item.quantity}}</p>
                  </div>
                  <p>
                    <a-icon type="edit" @click="showEdModal(item.id)" />
                    <a-icon type="delete" @click="deletePro(item.id)" />
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </a-col>
        <a-col :span="16" style="padding-right: 30px;padding-bottom: 20px;" class="scroll-box">
          <ul class="forms">
            <a-form :form="myform">
              <li>
                <h3>Title & Introduction</h3>
                <a-form-item label="Title" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }">
                  <a-input v-decorator="[ 'note', {rules: [{ required: true, message: 'Please input your Headings' }]} ]"/>
                </a-form-item>
                <a-form-item label="Introduction" :label-col="{ span: 4}" :wrapper-col="{ span: 12 }">
                  <a-textarea :rows="4" v-decorator="[ 'desc', {rules: [{ required: true, message: 'Please input your Introduction' }]}]"/>
                </a-form-item>
                <a-form-item label="Upload photo" :label-col="{ span: 4}" :wrapper-col="{ span: 12 }">
                  <a-upload
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    name="avatar"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :customRequest="beforeUpload"
                  >
                    <img width="120" height="120" v-if="imgurl" :src="imgurl" alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                  <span @click="handImg" style="cursor: pointer;">
                    <a-icon type="eye" />Preview Image
                  </span>
                  <a-modal class="show-details" v-model="imgChecked" width="50%" :footer="null">
                    <div style>
                      <img alt="example" style="width: 100%" :src="imgurl" />
                    </div>
                  </a-modal>
                </a-form-item>
              </li>
              <li>
                <h3>Contact method</h3>
                <a-form-item label="Full Name:" :label-col="{ span: 4}" :wrapper-col="{ span: 12 }">
                  <a-input v-decorator="['contanct',{rules: [{ required: true, message: 'Please input your Contacts' }]}]"/>
                </a-form-item>
                <a-form-item label="Email" :label-col="{ span: 4}" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-decorator="[
                            'email',
                              {
                                rules: [{
                                  type: 'email', message: 'Please enter a valid email address.',
                                }, {
                                  required: true, message: 'Please input your E-mail!',
                                }]
                              }
                            ]"
                  />
                </a-form-item>
                <a-form-item label="Phone Number" :label-col="{ span: 4}" :wrapper-col="{ span: 12 }">
                  <a-input
                    v-decorator="[
                                    'phone',
                                    {rules: [{ required: true, message: 'Please input your Phone Number' }]}
                                    ]"
                  />
                </a-form-item>
              </li>
              <li>
                <h3>
                  Select payment due Date
                  <!-- <span>描述1313213213213232</span> -->
                </h3>
                <a-form-item
                  class="my-form-item"
                  :label-col="{ span: 2}"
                  :wrapper-col="{ span: 12 }"
                  style="margin-left: 30px;"
                >
                  <a-date-picker
                    @change="onClosingDate"
                    :disabledDate="disabledDate"
                    format="YYYY-MM-DD"
                    v-decorator="['closingDate',{rules: [{ required: true, message: 'Please fill in the time' }]}]"
                  >
                  </a-date-picker>
                </a-form-item>
              </li>
            </a-form>
            <li>
              <h3>
                Delivery type
                <!-- <span>描述4465+5+65+66+56+6+</span> -->
              </h3>
              <div class="select-way">
                <a-radio-group @change="onChangeOne" v-model="value">
                  <a-radio :value="1" style="display: flex; align-items: top;">
                    <h4>Ship Order To One Address</h4>
                  </a-radio>
                  <div style="margin-left: 24px;">
                    <p>After the user pays, we will send it to the unified address uniformly. Issued by the person receiving the package，All items will be grouped and shipped to one address only。</p>
                    <h4>
                      Delivery address：
                      <span @click="addressManagement" :style="{color: adressErr ? 'red' : '#33b8b3'}">
                        <a-icon type="edit" :style="{color: adressErr ? 'red' : '#33b8b3','margin-right': '5px'}"/>Manage address
                      </span>
                    </h4>
                    <p v-if="adress">
                      <span style="color: #33b8b3;font-weight: bold;">Address: </span>{{adressShow.addressName}}{{adressShow.detailInfo}}
                      <span style="margin-left: 10px;color: #33b8b3;font-weight: bold;">Full Name: </span>{{adressShow.userName}}
                      <span style="margin-left: 10px;color: #33b8b3;font-weight: bold;">Phone number: </span>{{adressShow.telNumber}}
                    </p>
                    <p v-else style="color: red;">{{adressErr}}</p>
                  </div>
                </a-radio-group>
              </div>
            </li>
            <li>
              <h3>Payment Method</h3>
              <div class="select-way">
                <a-radio-group @change="onChange" v-model="adressValue">
                  <a-radio :value="2" style="display: flex; align-items: top;">
                    <h4>Individual Payments</h4>
                  </a-radio>
                  <div style="margin-left: 24px;">
                    <p>Multiple users can order and pay through a shareable link.</p>
                  </div>
                  <a-radio :value="1" style="display: flex; align-items: top;">
                    <h4>Pay for the Whole Order</h4>
                  </a-radio>
                  <div style="margin-left: 24px;">
                    <p>Pay Full Order Amount</p>
                  </div>
                </a-radio-group>
              </div>
            </li>
            <li>
              <h3>Start</h3>
            </li>
          </ul>
          <a-button @click="startGroupBtn" style="margin-left: 30px;">Start group order</a-button>
        </a-col>
      </a-row>
      <a-modal v-model="modelShow1" :footer="null" :width="870" :centered="true" title="Manage address">
        <ul class="adress">
          <li v-for="(item,index) in adressList" :key="index" @click="setDefaultAdress(item)">
            <p>
              <span style="color: #33b8b3;font-weight: bold">Address: </span> {{item.addressName}}{{item.detailInfo}}
              <span style="margin-left: 10px;color: #33b8b3;font-weight: bold">Full Name: </span>{{item.userName}}
              <span style="margin-left: 10px;color: #33b8b3;font-weight: bold">Phone number: </span>{{item.telNumber}}
            </p>
            <span>
              <a-icon type="edit" style="margin-right: 10px;" @click.stop="editAddress(item.id)" />
              <a-icon type="delete" @click="postDeleteAddress(item.id)" />
            </span>
          </li>
        </ul>
        <div class="btn-box">
          <a-button icon="plus" style="width: 200px;" @click="inputAdress">Add address</a-button>
        </div>
      </a-modal>
      <a-modal v-model="modelShow2" :footer="null" :centered="true" title="Add address">
        <div class="form-box">
          <a-form layout="vertical" :form="form">
            <a-form-item label="Address alias：">
              <a-input
                v-decorator="['bm',{rules: [{ required: true, message: 'Please Fill In Address (Eg. Home, Company)！' }]}]"
              />
            </a-form-item>
            <a-form-item label="Country / Province / City：">
              <a-cascader
                :options="options"
                placeholder="Please select"
                v-decorator="['country',{rules: [{ required: true, message: 'Please Fill In Country, Province, City' }]}]"
              />
            </a-form-item>
            <a-form-item label="Address：">
              <a-input
                v-decorator="['adress',{rules: [{ required: true, message: 'Please Fill In Country, Province, City' }]}]"
              />
            </a-form-item>
            <a-form-item label="Postal Code：">
              <a-input v-decorator="['email',{rules: [{ required: true, message: 'Please Fill In Postal Code！' }]}]" />
            </a-form-item>
            <a-form-item label="Contact Person：">
              <a-input
                v-decorator="['phonesome',{rules: [{ required: true, message: 'Please Fill In Conact Person' }]}]"
              />
            </a-form-item>
            <a-form-item label="Phone number：">
              <a-input
                type="tel"
                v-decorator="['tel',{rules: [{ required: true, message: 'Please Fill In Phone number' }]}]"
              />
            </a-form-item>
          </a-form>
          <div class="btn-box">  
            <a-button @click="handColse" style="padding: 0 30px;">Cancel</a-button>
            <a-button type="primary" style="padding: 0 30px;" @click="postAddAddress">Submit</a-button>
          </div>
        </div>
      </a-modal>
      <a-modal
        class="show-details"
        :title="designDetail.name"
        v-model="showVisible"
        @ok="handleOk"
        width="50%"
      >
        <a-row :gutter="20" style="padding:20px">
          <a-col :span="8">
            <a-row :gutter="20">
              <a-col :span="12">
                <img width="100%" :src="designDetail.positivePicUrl" alt />
              </a-col>
              <a-col :span="12">
                <img width="100%" :src="designDetail.backPicUrl" alt />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="16">
            <div class="title font-18">Colour: {{designDetail.productColor}}</div>
            <div class="number">
              <div class="font-18">Quantity: </div>
              <div class="number-box">
                <div class="minus common-radio" @click="minus(designDetail.minOrder)">
                  <a-icon type="minus" />
                </div>
                <div class="num">
                  <a-input v-model="nums" @blur="onChangeNums" type="number" />
                </div>
                <div class="plus common-radio" @click="plus(designDetail.minOrder)">
                  <a-icon type="plus" />
                </div>
              </div>
              <div class="price-right">
                Your Price:
                <span>${{onePrice | moneyFormat}}</span>
              </div>
            </div>
            <div class="font-color">Minimum Order Quantity:{{designDetail.minOrder}}</div>
            <div class="prices">
              <div class="price-box">
                <div class="font-18">Price:</div>
                <div class="price-input">
                  <a-input
                    :value="prices"
                    type="number"
                    @change="onChangeValues"
                  />
                </div>
                <div class="font-18">/piece</div>
              </div>
              <div class="price-right" v-if="twoPrice >= 0">
                Your Profit:
                <span>${{twoPrice | moneyFormat}}</span>
              </div>
              <div class="price-right" v-else style="color: red;">
                Your Loss:
                <span>${{twoPrice | moneyFormat}}</span>
              </div>
            </div>
            <div class="font-color">MSRP: ${{designDetail.price}}/piece</div>
          </a-col>
        </a-row>
      </a-modal>
      <!--去分享-->
      <a-modal
        class="show-details"
        v-model="shareChecked"
        @ok="handleOkShare"
        okText="Share"
        cancelText="Back"
        width="50%"
        title="Group order details saved">
        <div class="share-box">
          <div class="success">You can now share your awesome design with your friends and family!</div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import moment from "moment";
import MyTitle from "@/components/MyTitle/MyTitle";
import User from "@/components/Header/User";
import {
  adressList,
  addressOne,
  addAddress,
  queryById,
  deleteAddress,
  teamOrderDetails,
  delProducts,
  startGroup,
  discount,
  discountEdit,
  discountSure
} from "@/api/seller";
import { upLoad } from "@/api/system";
export default {
  components: {
    MyTitle,
    User
  },
  data() {
    return {
      adressShow: {addressName:'',detailInfo:'',userName:'',telNumber:''},
      adressErr: '',
      orderPid: "",
      resPrice: "",
      priceChange: "",
      onePrice: "",
      twoPrice: "",
      designDetail: "",
      imgChecked: false,
      shareChecked: false,
      loading: false,
      addressId: "",
      adressValue: 1,
      imgurl: "",
      nums: "",
      showVisible: false,
      prices: "",
      adress: "",
      id: "",
      form: this.$form.createForm(this),
      myform: this.$form.createForm(this),
      personform: this.$form.createForm(this),
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
    this.getAddressOne();
    this.id = this.$route.query.id;
    this.getTeamOrderDetails(this.id);
  },
  methods: {
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      return current && current < moment().endOf('day');
    },
    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56]
      };
    },
    handImg() {
      this.imgChecked = true;
    },
    handColse() {
      this.modelShow2 = false;
    },
    handleOkShare() {
      this.$router.push({
        path: "/share",
        query: {
          order_id: this.$route.query.id
        }
      });
    },
    handleOk() {
      if (this.twoPrice < 0) {
        this.$notification.error({
          message: "You will be incurring a lost for this order.",
          description: "Please fill in again.",
          duration: 4
        });
        return
      }
      if (this.pid) {
        const param = {
          picId: this.pid,
          quantity: this.nums,
          price: this.prices
        };
        discountSure(param).then(res => {
          if (res.code == 200) {
            //window.location.reload();
            this.getTeamOrderDetails(this.id);
            this.showVisible = false;
            this.$message.success('Successful！')
          }
        });
      }
    },
    onClosingDate(date, dateString) {
      this.timeover = dateString;
    },
    startGroupBtn() {
      this.myform.validateFields((err, values) => {
        if (!err) {
          if(this.information.list.length !== 0) {
            if (this.adress) {
            const param = {
              topic: values.note,
              introduction: values.desc,
              topicUrl: this.fileUrl,
              payEndDate: this.timeover,
              orderId: this.$route.query.id,
              contact: values.contanct,
              mobile: values.phone,
              email: values.email,
              address: this.adress,
              addressId: this.addressId,
              payMode: this.adressValue
            };
            if (this.adressValue == 2) {
              startGroup(param).then(res => {
                if (res.code == 200) {
                  this.shareChecked = true;
                }
              });
            } else {
              startGroup(param).then(res => {
                if (res.code == 200) {
                  this.$router.push({
                    path: "/unifiedpay",
                    query: {
                      orderId: this.orderPid
                    }
                  });
                }
              });
            }
          } else {
            this.$notification["error"]({
              message: "Please fill in delivery address.",
              duration: 4
            });
            this.adressErr = 'Please fill in delivery address.'
          }
          }else{
            this.$notification.error({
              message: "Order list cannot be empty",
              duration: 4
            })
          }
        }
      });
    },
    minus(data) {
      if (this.nums && this.nums > data) {
        this.nums--;
        this.disCounts(this.nums, this.resPrice);
        if (this.prices) {
          this.twoPrice = ((this.prices - this.onePrice) * this.nums).toFixed(
            2
          );
        }
      }
    },
    plus() {
      this.nums++;
      this.disCounts(this.nums, this.resPrice);
      if (this.prices) {
        this.twoPrice = ((this.prices - this.onePrice) * this.nums).toFixed(2);
      }

    },

    showEdModal(id) {
      this.showVisible = true;
      discount().then(res => {
        this.discounts = res.result;
      });
      const param = {
        picId: id
      };
      setTimeout(() => {
        discountEdit(param).then(res => {
          this.designDetail = res.result;
          this.nums = res.result.quantity
            ? res.result.quantity
            : res.result.minOrder;
          this.prices = res.result.actualPrice
            ? res.result.actualPrice
            : res.result.price;
          this.pid = res.result.id;
          const numbers = this.nums;
          this.minNums = res.result.minOrder;
          this.disCounts(numbers, res.result.maxPrice);
          this.resPrice = (res.result.maxPrice * this.discounts) / 100;
          this.twoPrice = ((this.prices - this.onePrice) * this.nums).toFixed(
            2
          );
        });
      }, 1000);
    },
    disCounts(datas, datanum) {
      if (datas >= 1 && datas <= 20) {
        this.onePrice = (((datanum * this.discounts) / 100) * 1).toFixed(2);
      } else if (datas >= 21 && datas <= 50) {
        this.onePrice = (((datanum * this.discounts) / 100) * 0.95).toFixed(2);
      } else if (datas >= 51 && datas <= 100) {
        this.onePrice = (((datanum * this.discounts) / 100) * 0.9).toFixed(2);
      } else if (datas >= 101 && datas <= 500) {
        this.onePrice = (((datanum * this.discounts) / 100) * 0.85).toFixed(2);
      } else {
        this.onePrice = (((datanum * this.discounts) / 100) * 0.8).toFixed(2);
      }
    },
    deletePro(id) {
      let that = this;
      that.$confirm({
        title: "Determine to delete this information?",
        okText: "CONFIRM",
        cancelText: "Cancel",
        class: "my-modal",
        onOk() {
          that.postDelProducts(id);
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    postDelProducts(id) {
      delProducts(id).then(res => {
        if (res.code == 200) {
          this.information.list = this.information.list.filter(item => item.id !== id)
          //this.getTeamOrderDetails(this.id);
          this.$message.success(res.message);
        }
      })
    },
    getTeamOrderDetails(id) {
      teamOrderDetails(id).then(res => {
        const formList = res.result;
        this.orderPid = formList.id;
        this.addressId = formList.addressId;
        this.timeover = formList.payEndDate
        this.fileUrl = formList.topicUrl;
        this.imgurl = formList.topicUrl;
        this.adressValue = parseInt(formList.payMode);
        this.adress = formList.address;
        this.information.orderId = res.result.orderSn;
        this.information.orderTime = res.result.createTime;
        this.information.list = res.result.list;
      });
    },
    postDeleteAddress(id) {
      deleteAddress(id).then(res => {
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
          let params = {
            id: this.id,
            userName: values.phonesome,
            postalCode: values.email,
            telNumber: values.tel,
            addressName: values.country.join(","),
            detailInfo: values.adress,
            name: values.bm
          };
          addAddress(params).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message);
              this.modelShow2 = false;
              this.getAdressList()
            }
          });
        }
      });
      //
    },
    getAddressOne() {
      addressOne().then(res => {
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
      this.getAdressList();
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
      this.adressValue = e.target.value
    },
    onChangeOne(e) {
      console.log(e);
    },
    onChangeNums() {
      if (this.nums < this.minNums) {
        this.nums = this.minNums;
      }
      this.disCounts(this.nums, this.resPrice);
      this.twoPrice = ((this.prices - this.onePrice) * this.nums).toFixed(2);
    },
    onChangeValues(e) {
      this.prices = e.target.value;
      this.twoPrice = ((e.target.value - this.onePrice) * this.nums).toFixed(2);
    },
    getAdressList() {
      adressList().then(res => {
        this.adressList = res.result;
        //this.adress = res.result[0].addressName + res.result[0].detailInfo +res.result[0].userName+res.result[0].telNumber;
      });
    },
    setDefaultAdress(item) {
      this.adress = item.addressName + item.detailInfo + item.userName + item.telNumber;
      this.adressShow.addressName = item.addressName;
      this.adressShow.detailInfo = item.detailInfo;
      this.adressShow.userName = item.userName;
      this.adressShow.telNumber = item.telNumber;
      this.addressId = item.id;
      this.modelShow1 = false;
      this.$message.success("Address Successfully Updated!");
      this.adressErr = '';
    },
    beforeUpload(file) {
      let files = file.file;
      const isJPG = files.type === "image/jpeg";
      const isPNG = files.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("Unsupported Format, Please Try Again."));
        return isJPG;
      }
      const isLt2M = files.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error(this.$t("Image Size Over 2MB"));
        return isLt2M;
      }
      getBase64(files, imageUrl => {
        this.imgurl = imageUrl;
      });
      const formData = new FormData();
      formData.append("file", files);
      upLoad(formData).then(res => {
        this.fileUrl = res.preview_url;
      });
    }
  },
  watch: {
    
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  filters:{
    formatTime(time){
      if(time){
        let d = new Date(time);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset()*60000;   //getTimezoneOffset()返回是以分钟为单位，需要转化成ms
        let utc = localTime + localOffset;
        let offset = d.getTimezoneOffset() / 60; //以韩国时间为例，东9区
        let korean = utc + (3600000 * offset);
        let date = new Date(korean);
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let dr = date.getDate();  
        dr = dr < 10 ? ('0' + dr) : dr;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + dr +' '+ h +':'+ minute + ':' + second;  
      }else{
        return ' '
      }
    },
    moneyFormat(number, decimals) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite( + number) ? 0 : +number,
            prec = !isFinite( + decimals) ? 2 : Math.abs(decimals),
            sep = ',',
            dec = '.',
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },
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
.share-box{
  text-align: center;
  padding: 20px;
  .success {
    font-size: 24px;
    color: #000;
  }
  div {
    padding-bottom: 20px;
    font-size: 18px;
    color: #999;
  }
}

.btn-box {
  padding: 20px 0;
  text-align: center;
  button {
    margin: 0 10px;
  }
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
            width: calc(100% - 130px);
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
              width: 100%;
              margin: 0;
              text-align: right;
              i {
                font-size: 20px;
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
        min-width: 60px;
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
.show-details {
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
    .price-box {
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
</style>