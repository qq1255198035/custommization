<template>
  <div id="DictList">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="基本信息" key="1">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="商品名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请填写商品名称!' }] }]"/>
          </a-form-item>
          <a-form-item label="最小订货量" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-input v-decorator="['quantify', 
            { rules: [{ required: true, message: '请填写数量!' },{ type: 'number', message: '请填写数字!' }] }]" />
          </a-form-item>
          <a-form-item label="商品类别" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-select v-decorator="['type', { rules: [{ required: true, message: '请选择商品类别!' }] }]" placeholder="选择商品类别">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="零售价格" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-input
            v-decorator="['price', 
            { rules: [{ required: true, message: '请填写零售价格!' },{ type: 'number', message: '请填写数字!' }] }]">
              <a-icon slot="prefix" type="dollar" style="color: rgba(0,0,0,0.4)" />
            </a-input>
          </a-form-item>
          <a-form-item label="最高价格" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-input
            v-decorator="['maxprice', 
            { rules: [{ required: true, message: '请填写最高价格!' },{ type: 'number', message: '请填写数字!' }] }]">
              <a-icon slot="prefix" type="dollar" style="color: rgba(0,0,0,0.4)" />
            </a-input>
          </a-form-item>
          <a-form-item label="最低价格" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-input
            v-decorator="['minprice', 
            { rules: [{ required: true, message: '请填写最低价格!' },{ type: 'number', message: '请填写数字!' }] }]">
              <a-icon slot="prefix" type="dollar" style="color: rgba(0,0,0,0.4)" />
            </a-input>
          </a-form-item>
          <a-form-item label="商品简介" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-textarea v-decorator="['desc', 
            { rules: [{ required: false}]}]" />
          </a-form-item>
          <a-form-item label="尺寸图片" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
            <a-upload
              name="avatar"
              accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
              @change="handleChange"
              v-decorator="['img', { rules: [{ required: true,message: '请上传尺寸图片!'}]}]" 
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon type='plus'/>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 8, offset: 3 }">
            <a-button type="primary" html-type="submit">
              Submit
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="添加颜色" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="设计区域" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    callback(key) {
      console.log(key);
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 10MB!');
      }
      return isLt2M;
    },
    handleChange(info) {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
        });
    }
  },
}
</script>
<style lang="less" scoped>
#DictList{
  padding: 0 20px;

}
</style>