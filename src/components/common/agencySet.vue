<template>
  <div id="accountSet">
    <a-row type="flex" justify="center">
      <a-col :lg="14">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item label="公司名称">
              <a-input
                placeholder="公司名称"
                v-decorator="['corporateName',{rules: [{ required: true, message: '公司名称' }]}]"
              />
            </a-form-item>
            <a-form-item label="商业登记号">
              <a-input
                placeholder="商业登记号"
                v-decorator="['business',{rules: [{ required: true, message: '商业登记号' }]}]"
              />
            </a-form-item>
            <a-form-item label="预计销售额(年)">
              <a-input
                placeholder="销售额"
                v-decorator="['salesVolume',{rules: [{ required: true, message: '销售额' }]}]"
              />
            </a-form-item>
            <a-form-item label="员工数量">
              <a-input
                placeholder="员工数量"
                v-decorator="['staff',{rules: [{ required: true, message: '员工数量' }]}]"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="10" style="text-align: center">
        <div class="upload">
          <div class="top">
            <p style="color: #33b8b3">上传证件</p>
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
          :title="'代理申请'"
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
        console.log(res);
        const result = res.result;
        console.log(result);
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
      console.log(111);
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values.countryName);
          const params = {
            company: values.corporateName,
            registration: values.business,
            sale: values.salesVolume,
            employee: values.staff,
            papersImg: this.fileUrl,
          };
          console.log(params);
          agencyEdit(params).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$notification.success({
                message: '代理申请',
                description: '代理申请以成功',
                duration: 4
              });
              window.location.reload()
            }
          });
        }
      });
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t("Unsupported Format, Please Try Again."));
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