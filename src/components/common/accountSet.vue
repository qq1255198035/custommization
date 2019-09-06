<template>
  <div id="accountSet">
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

            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="姓">
                  <a-input
                    placeholder="姓"
                    v-decorator="['surname',{rules: [{ required: true, message: '姓' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="名">
                  <a-input
                    placeholder="名"
                    v-decorator="['monicker',{rules: [{ required: true, message: '名' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="个人简介">
              <a-input
                placeholder="个人简介"
                v-decorator="['company',{rules: [{ required: true, message: '个人简介' }]}]"
              />
            </a-form-item>

            <a-form-item label="地点">
              <a-select
                @change="countryBtn"
                v-decorator="['countryName',{rules: [{ required: true, message: '邮箱' }]}]"
              >
                <a-select-option
                  v-for="(item, index) in country"
                  :key="index"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="所在省">
                  <div class>
                    <a-select
                      @change="onProvince"
                      placeholder="请选择"
                      v-decorator="['province',{rules: [{ required: true, message: '邮箱' }]}]"
                    >
                      <a-select-option
                        v-for="(item, index) in province"
                        :key="index"
                        :value="item.id"
                      >{{item.name}}</a-select-option>
                    </a-select>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="所在市">
                  <div class>
                    <a-select
                      @change="onCity"
                      placeholder="请选择"
                      v-decorator="['city',{rules: [{ required: true, message: '邮箱' }]}]"
                    >
                      <a-select-option
                        v-for="(item, index) in city"
                        :key="index"
                        :value="item.id"
                      >{{item.name}}</a-select-option>
                    </a-select>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="街道地址">
              <a-input
                placeholder="街道地址"
                :autosize="{ minRows: 6 }"
                v-decorator="['streetName',{rules: [{ required: true, message: '街道地址' }]}]"
              />
            </a-form-item>
            <a-input-group compact>
              <a-form-item label="电话">
                <a-row :gutter="32">
                  <a-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                    <a-input
                      @change="phoneFirstBtn"
                      placeholder="86"
                      v-decorator="['phoneName1',{rules: [{ required: true, message: '' }]}]"
                    />
                  </a-col>
                  <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <a-input
                      @change="phoneLastBtn"
                      placeholder="电话号"
                      v-decorator="['phoneName2',{rules: [{ required: true, message: '电话' }]}]"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
            </a-input-group>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="10" style="text-align: center">
        <div class="upload">
          <div class="top">
            <p style="color: #fff">头像</p>
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
                <commonBtn
                  :icon="'upload'"
                  :width="'100%'"
                  :title="'更换头像'"
                  :height="'40px'"
                  :padding="'7px'"
                  :radio="'6px'"
                  :fontsize="'18px'"
                  :top="'10px'"
                ></commonBtn>
              </a-upload>
            </template>
          </div>
        </div>
      </a-col>
    </a-row>
    <my-title :title="itemTitle"></my-title>
    <a-row>
      <a-col :span="6" :offset="18">
        <commonBtn
          :icon="'upload'"
          @submitPerson="submitPerson"
          :width="'100%'"
          :title="'更新'"
          :height="'45px'"
          :padding="'10px'"
          :radio="'12px'"
          :fontsize="'18px'"
          :top="'10px'"
        ></commonBtn>
      </a-col>
    </a-row>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import {
  personSet,
  personEdit,
  country,
  province,
  city,
  upLoad
} from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  data() {
    return {
      countryValue: "",
      province: "",
      provinceId: "",
      cityId: "",
      city: "",
      itemTitle: "",
      country: "",
      personInfo: {},
      places: "",
      companyName: "",
      companyWeb: "",
      companyDesc: "",
      address: "",
      contact: "",
      phoneFirst: "",
      phoneLast: "",
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
    MyTitle,
    commonBtn
  },
  mounted() {
    this._personSet();
    this._country();
  },
  methods: {
    _personSet() {
      personSet().then(res => {
        console.log(res);
        const result = res.result;
        console.log(result);
        const phone1 = result.phone ? result.phone.split(",")[0] : "86";
        const phone2 = result.phone ? result.phone.split(",")[1] : "";
        this.form.setFieldsValue({
          surname: result.surname,
          monicker: result.monicker,
          company: result.intro,
          email: result.email,
          countryName: result.countryName,
          province: result.provinceName,
          city: result.cityName,
          streetName: result.address,
          phoneName1: phone1,
          phoneName2: phone2
        });
        this.imgurl = result.img
        this.provinceId = result.province;
        this.cityId = result.city;
        this.countryValue = result.country;
      });
    },
    _country() {
      country().then(res => {
        console.log(res);
        this.country = res.result;
      });
    },
    /*checkedTel(rule, value, callback) {
      console.log(value)
      const reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!reg.test(value)) {
        callback(new Error('请输入正确电话号'))
      }
    },*/
    // 更新
    submitPerson() {
      console.log(111);
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values.countryName);
          const params = {
            email: values.email,
            surname: values.surname,
            monicker: values.monicker,
            intro: values.company,
            country: this.countryValue,
            province: this.provinceId,
            city: this.cityId,
            address: values.streetName,
            img: this.fileUrl,
            phone: values.phoneName1 + "," + values.phoneName2
          };
          console.log(params);
          personEdit(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$notification.success({
                message: '更新成功',
                description: '信息已经更新完成',
                duration: 4
              });
              window.location.reload()
            }
          });
        }
      });
    },
    commonCity() {},
    countryBtn(value) {
      console.log(value);
      this.countryValue = value;
      const params = {
        areaId: value
      };
      province(params).then(res => {
        console.log(res);
        this.province = res.result;
      });
    },
    onProvince(value) {
      console.log(value);
      this.provinceId = value;
      const params = {
        areaId: value
      };
      city(params).then(res => {
        console.log(res);
        this.city = res.result;
      });
    },
    onCity(value) {
      this.cityId = value;
    },
    phoneFirstBtn(e) {
      console.log(e.target.value);
    },
    phoneLastBtn(e) {
      console.log(e.target.value);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("不支持此格式"));
        return isJPG;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t("图片超过2M"));
        return isLt2M;
      }
      getBase64(file, imageUrl => {
        this.imgurl = imageUrl;
      });
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      upLoad(formData).then(res => {
        console.log(res);
        this.fileUrl = res;
      });
    },
    onChange(value) {
      console.log(value);
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  }
};
</script>
<style lang="less">
@import url("./../../components/index.less");
#accountSet {
  //background-color: #fff;
  padding-top: 16px;

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
.ant-select-selection {
  background-color: rgba(255, 255, 255, 0.5) !important;
}
.ant-select-dropdown-menu-item {
  color: #333 !important;
}
</style>