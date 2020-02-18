<template>
  <div id="accountSet">
    <a-row type="flex" justify="center">
      <a-col :lg="14">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item label="Email">
              <a-input
                placeholder="Email"
                :disabled="true"
                v-decorator="['email',{rules: [{ required: true, message: 'Please input your email' }]}]"
              />
            </a-form-item>

            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="First name">
                  <a-input
                    placeholder="First name"
                    v-decorator="['surname',{rules: [{ required: true, message: 'Please input your first name' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="Last name">
                  <a-input
                    placeholder="Last name"
                    v-decorator="['monicker',{rules: [{ required: true, message: 'Please input your last name' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="Bio">
              <a-input
                placeholder="Bio"
                v-decorator="['company',{rules: [{ required: true, message: 'Please input the bio' }]}]"
              />
            </a-form-item>

            <a-form-item label="Place">
              <a-input 
                placeholder="Please input the location"
                v-decorator="['countryName',{rules: [{ required: true, message: 'Please input the location' }]}]" 
              />
            </a-form-item>
            <a-row :gutter="32">
              <a-col :span="12">
                <a-form-item label="Province where">
                  <a-input 
                    placeholder="Please input province"
                    v-decorator="['province',{rules: [{ required: true, message: 'Please input province' }]}]" 
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="City where">
                  <a-input 
                    placeholder="Please input city"
                    v-decorator="['city',{rules: [{ required: true, message: 'Please input city' }]}]" 
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="Street">
              <a-input
                placeholder="Please input street"
                v-decorator="['streetName',{rules: [{ required: true, message: 'Please input street' }]}]"
              />
            </a-form-item>
            <a-row :gutter="32">
              <a-col :span="4">
                <a-form-item label="Phone number">
                  <a-input
                    placeholder="86"
                    v-decorator="['phoneName1',{rules: [{ required: true, message: 'Please input your phone number' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="20">
                <a-form-item style="padding-top: 29px;">
                  <a-input
                  placeholder="Phone number"
                  v-decorator="['phoneName2',{rules: [{ required: true, message: 'Please input your phone number' }]}]"
                />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="10" style="text-align: center">
        <div class="upload">
          <div class="top">
            <p style="color: #33b8b3">Head Portrait</p>
            <img
              v-if="imgurl"
              :src="imgurl"
              width="130"
              height="130"
              style="border-radius:50%;background:#808080;margin:0 auto;"
            />
            <a-avatar v-else icon="user" :size="130" />
            <template>
              <a-upload accept="image/jpeg,image/png" name="avatar" :showUploadList="false" :customRequest="beforeUpload">
                <commonBtn
                  :icon="'upload'"
                  :width="'100%'"
                  :title="'Change Profile Picture'"
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
          :title="'Update'"
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
import {
  personSet,
  personEdit,
  upLoad
} from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  data() {
    return {
      itemTitle: "",
      imgurl: ""
    };
  },
  components: {
    MyTitle,
    commonBtn
  },
  mounted() {
    this._personSet();
  },
  methods: {
    _personSet() {
      personSet().then(res => {
        const result = res.result;
        const phone1 = result.phone ? result.phone.split(",")[0] : "86";
        const phone2 = result.phone ? result.phone.split(",")[1] : "";
        this.form.setFieldsValue({
          surname: result.surname,
          monicker: result.monicker,
          company: result.intro,
          email: result.email,
          countryName: result.country,
          province: result.province,
          city: result.city,
          streetName: result.address,
          phoneName1: phone1,
          phoneName2: phone2
        });
        this.imgurl = result.img
      });
    },
    submitPerson() {
      this.form.validateFields((err, values) => {
        if(values.phoneName2){
          if (!err){
            const params = {
              email: values.email,
              surname: values.surname,
              monicker: values.monicker,
              intro: values.company,
              country: values.countryName,
              province: values.province,
              city: values.city,
              address: values.streetName,
              img: this.imgurl,
              phone: values.phoneName1 + "," + values.phoneName2
            };
            personEdit(params).then(res => {
              if (res.code == 200) {
                this.$notification.success({
                  message: "Update Success",
                  description: "The information has been updated.",
                  duration: 4
                });
                this._personSet();
              }
            });
          }
        }else{
          this.$message.error('Please input your phone number!')
        }
      });
    },
    beforeUpload(file) {
      let files = file.file
      const isJPG = files.type === "image/jpeg";
      const isPNG = files.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("Unsupported Format, Please Try Again."));
        return isJPG;
      }
      const isLt2M = files.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        `this`.$message.error(this.$t("Image Size Over 2MB"));
        return isLt2M;
      }
      const formData = new FormData();
      formData.append("file", files);
      upLoad(formData).then(res => {
        this.imgurl = res;
      });
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
  padding: 16px 20px 0;
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
      align-items: center;
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