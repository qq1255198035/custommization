<template>
  <div id="accountSet">
    <page-header :title="pageTitle"></page-header>
    <a-row type="flex" justify="center">
      <a-col :lg="14">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item label="邮箱">
              <a-input
                placeholder="邮箱"
                v-decorator="['email',{rules: [{ required: true, message: '邮箱' }]}]"
              />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                placeholder="邮箱"
                v-decorator="['companyName',{rules: [{ required: true, message: '邮箱' }]}]"
              />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                placeholder="邮箱"
                v-decorator="['webName',{rules: [{ required: true, message: '邮箱' }]}]"
              />
            </a-form-item>

            <a-form-item label="地点">
              <a-select
                @change="countryBtn"
                v-decorator="['countryName',{rules: [{ required: true, message: '邮箱' }]}]"
              >
                <a-select-option
                  v-for="(item, index) in city"
                  :key="index"
                  :value="item.label"
                >{{item.value}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="邮箱">
              <div class>
                <a-select
                  placeholder="邮箱"
                  v-decorator="['addressName',{rules: [{ required: true, message: '邮箱' }]}]"
                >
                  <a-select-option
                    v-for="(item, index) in activeityPlace"
                    :key="index"
                    :value="item.label"
                  >{{item.value}}</a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                placeholder="邮箱"
                :autosize="{ minRows: 6 }"
                v-decorator="['placeName',{rules: [{ required: true, message: '邮箱'}]}]"
              />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input
                placeholder="邮箱"
                :autosize="{ minRows: 6 }"
                v-decorator="['contactName',{rules: [{ required: true, message: '邮箱' }]}]"
              />
            </a-form-item>
            <a-input-group compact>
              <a-form-item label="邮箱">
                <div class>
                  <a-input
                    placeholder="邮箱"
                    v-decorator="['phoneName',{rules: [{pattern: new RegExp(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/), required: true, message: '邮箱'}]}]"
                  />
                </div>
              </a-form-item>
            </a-input-group>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="10" style="text-align: center">
        <div class="upload">
          <div class="top">
            <p>头像</p>
            <img
              v-if="imgurl"
              :src="imgurl"
              width="130"
              height="130"
              style="border-radius:50%;background:#808080;margin-bottom: 10px;"
            />
            <a-avatar v-else style="backgroundColor:#23C6C8" :size="130">Sponsor Cube</a-avatar>
            <template>
              <a-upload name="avatar" :showUploadList="false" :beforeUpload="beforeUpload">
                <a-button>
                  <a-icon type="upload" />+
                </a-button>
              </a-upload>
            </template>
          </div>
        </div>
      </a-col>
    </a-row>
    <my-title :title="itemTitle"></my-title>
    <a-button
      style="float:right;margin:10px 0;padding:4px 50px"
      icon="dollar"
      size="large"
      @click="submitPerson"
    >更新</a-button>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import MyTitle from "@/components/MyTitle/MyTitle";
export default {
  data() {
    return {
      itemTitle: "",
      city: [{ label: "0", value: "中国" }, { label: "1", value: "香港" }],
      personInfo: {},
      places: "",
      companyName: "",
      companyWeb: "",
      companyDesc: "",
      address: "",
      contact: "",
      phoneFirst: "",
      phoneLast: "",
      activeityPlace: [],
      areaId: "",
      country: "",
      fileUrl: "",
      fileUrl1: "",
      imgurl: "",
      imgurl1: "",
      flag: "1"
    };
  },
  components: {
    MyTitle
  },
  mounted() {
    //this._getUserInformation();
  },
  methods: {
    /*checkedTel(rule, value, callback) {
      console.log(value)
      const reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!reg.test(value)) {
        callback(new Error('请输入正确电话号'))
      }
    },
    _getUserInformation() {
      const token = this.$ls.get("Access-Token");
      const params = {
        token: token
      };
      getUserInformation(params).then(res => {
        console.log(res);
        this.personInfo = res.data;
        this.form.setFieldsValue({
          companyName: res.data.name,
          webName: res.data.web,
          email: res.data.email,
          textName: res.data.intro,
          countryName: res.data.flag,
          addressName: res.data.area,
          placeName: res.data.comp_addr,
          contactName: res.data.contact,
          phoneName: res.data.phone
        });
        this.flag = res.data.flag;
        console.log(this.flag);
        this.imgurl = res.data.logo ? res.data.logo : "";
        this.fileUrl = res.data.logo;
        console.log(this.imgurl);
        this.imgurl1 = res.data.business_img ? res.data.business_img : "";
        this.fileUrl1 = res.data.business_img;
        console.log(this.imgurl1);
        const params1 = {
          flag: res.data.flag,
          internationalization: localStorage.lang
        };
        console.log(params1);
        getBooleanPlace(params1).then(res => {
          console.log(res);
          this.activeityPlace = res.data;
        });
      });
    },
    // 更新
    submitPerson() {
      console.log(111);
      const token = this.$ls.get("Access-Token");
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values.countryName);
          const params = {
            token: token,
            email: values.email,
            name: values.companyName,
            web: values.webName,
            intro: values.textName,
            country: values.countryName,
            area: values.addressName,
            compAddr: values.placeName,
            contact: values.contactName,
            phone: values.phoneName,
            logo: this.fileUrl,
            business_img: this.fileUrl1
          };
          console.log(params);
          getChangeInformation(params).then(res => {
            console.log(res);
            if (res.code == 1000) {
              this.$notification.success({
                message: this.$t("issuer.hdgl.successNmae"),
                description: this.$t("issuer.accountInfo.updateCompleted"),
                duration: 4
              });
              this.$router.push({
                path: "/zhxx"
              });
            }
          });
        }
      });
    },
    countryBtn(value) {
      console.log(value);
      this.form.setFieldsValue({
        addressName: ""
      });
      this.flag = value;
      const params = {
        flag: value,
        internationalization: localStorage.lang
      };
      getBooleanPlace(params).then(res => {
        console.log(res);
        this.activeityPlace = res.data;
      });
      //this.personInfo.country = value
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("issuer.accountInfo.onlyImage"));
        return isJPG;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t("issuer.accountInfo.onlyM"));
        return isLt2M;
      }
      getBase64(file, imageUrl => {
        this.imgurl = imageUrl;
      });
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      getUpload(formData).then(res => {
        console.log(res);
        this.fileUrl = res.location;
      });
    },
    beforeUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("issuer.accountInfo.onlyImage"));
        return isJPG;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t("issuer.accountInfo.onlyM"));
        return isLt2M;
      }
      getBase64(file, imageUrl => {
        this.imgurl1 = imageUrl;
      });
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      getUpload(formData).then(res => {
        console.log(res);
        this.fileUrl1 = res.location;
      });
    },
    onChange(value) {
      console.log(value);
    }*/
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  }
};
</script>
<style lang="less">
#accountSet {
  //background-color: #fff;

  .ant-form-item {
    width: 100%;
  }
  .input-group {
    display: flex;
    justify-content: space-between;
  }
  .select-box {
    display: flex;
    justify-content: space-between;
    .ant-select {
      width: 49%;
    }
  }
  .upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .ant-avatar {
        margin: 20px 0;
      }
      p {
        color: #333;
      }
    }
    .top {
      margin-bottom: 40px;
    }
  }
}
.ant-btn-primaryion {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
.ant-form-item-label label {
  color: #ffffff !important;
}
.ant-select-selection{
  background-color: rgba(255, 255, 255, 0.5) !important;
}
.ant-select-dropdown-menu-item{
  color: #333 !important
}
</style>