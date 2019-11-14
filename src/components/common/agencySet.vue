<template>
  <div id="accountSet">
    <a-row type="flex" justify="center">
      <a-col :lg="14">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item label="Corporate Name">
              <a-input
                placeholder="Corporate Name"
                v-decorator="['corporateName',{rules: [{ required: true, message: 'Corporate Name' }]}]"
              />
            </a-form-item>
            <a-form-item label="Business Registration Number">
              <a-input
                placeholder="Business Registration Number"
                v-decorator="['business',{rules: [{ required: true, message: 'Business Registration Number' }]}]"
              />
            </a-form-item>
            <a-form-item label="Projected Sales(year)">
              <a-input
                placeholder="Sales Volume"
                v-decorator="['salesVolume',{rules: [{ required: true, message: 'Sales Volume' }]}]"
              />
            </a-form-item>
            <a-form-item label="Number of employees">
              <a-input
                placeholder="Number of employees"
                v-decorator="['staff',{rules: [{ required: true, message: 'Number of employees' }]}]"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="10" style="text-align: center">
        <div class="upload">
          <div class="top">
            <p style="color: #33b8b3">Upload Documents</p>
            <img
              v-if="imgurl"
              :src="imgurl"
              width="130"
              height="130"
              style="border-radius:50%;background:#808080;margin-bottom: 10px;"
            />
            <a-avatar v-else style="backgroundColor:#23C6C8" :size="130">Sponsor Cube</a-avatar>
            <template>
              <a-upload accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif" name="avatar" :showUploadList="false" :customRequest="beforeUpload">
                <commonBtn
                  :icon="'upload'"
                  :width="'100%'"
                  :title="'Upload photo'"
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
          :title="'Agent Application'"
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
  agencyInfo,
  agencyEdit,
  upLoad
} from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import commonBtn from "@/components/commonBtn/commonBtn";
export default {
  data() {
    return {
      itemTitle: '',
      corporateName: '',
      business: '',
      salesVolume: '',
      staff: '',
      imgurl: ''
    };
  },
  components: {
    MyTitle,
    commonBtn
  },
  mounted() {
    this._agencyInfo();
  },
  methods: {
    _agencyInfo() {
      agencyInfo().then(res => {
        const result = res.result;
        this.form.setFieldsValue({
          corporateName: result.company,
          business: result.registration,
          salesVolume: result.sale,
          staff: result.employee,
        });
        this.imgurl = result.papers_img
        this.fileUrl = result.papers_img
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

      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            company: values.corporateName,
            registration: values.business,
            sale: values.salesVolume,
            employee: values.staff,
            papersImg: this.fileUrl,
          };
          agencyEdit(params).then(res => {
            if (res.code == 200) {
              this.$notification.success({
                message: 'Agent Application',
                description: 'The application for agency has been successful',
                duration: 4
              });
              window.location.reload()
            }
          });
        }
      });
    },
    beforeUpload(file) {
      let files = file.file;
      const isLt2M = files.size / 1024 / 1024 < 2;
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
    },
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