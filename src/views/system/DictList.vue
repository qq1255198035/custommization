<template>
  <div id="DictList">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="设计区域" key="1">
        <div style="display:flex;" class="tab-pane-1">
          <div class="design-box">
            <div class="container">
                <div class="canvas-container" v-show="designModel == 0">
                    <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                </div>
                <div class="canvas-container" v-show="designModel == 1">
                    <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                </div>
                <div class="canvas-container" v-show="designModel == 2">
                    <canvas id="canvas3" :width="screenWidth" :height="screenWidth"></canvas>
                </div>
                <div class="canvas-container" v-show="designModel == 3">
                    <canvas id="canvas4" :width="screenWidth" :height="screenWidth"></canvas>
                </div>
                <ul class="top">
                    <li v-for="(item,index) in bgimgs" :key="index" class="li" @click="changeModelDesign(index)">
                        <img :src="item.url" alt="">
                    </li>
                </ul>
            </div>
          </div>
          <div class="dosomething">
            <div class="upload-box">
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                @change="handleChangeDesign1"
                accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
              >
                <img v-if="bgimgs[0].url" :src="bgimgs[0].url" alt="avatar" />
                <div v-else>
                  <a-icon type='plus'/>
                  <div class="ant-upload-text">上传正面</div>
                </div>
              </a-upload>
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                @change="handleChangeDesign2"
                accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
              >
                <img v-if="bgimgs[1].url" :src="bgimgs[1].url" alt="avatar" />
                <div v-else>
                  <a-icon type='plus'/>
                  <div class="ant-upload-text">上传背面</div>
                </div>
              </a-upload>
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                @change="handleChangeDesign3"
                accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
              >
                <img v-if="bgimgs[2].url" :src="bgimgs[2].url" alt="avatar" />
                <div v-else>
                  <a-icon type='plus'/>
                  <div class="ant-upload-text">上传左面</div>
                </div>
              </a-upload>
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                @change="handleChangeDesign4"
                accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
              >
                <img v-if="bgimgs[3].url" :src="bgimgs[3].url" alt="avatar" />
                <div v-else>
                  <a-icon type='plus'/>
                  <div class="ant-upload-text">上传右面</div>
                </div>
              </a-upload>
            </div>
          </div>
        </div>
        
        
      </a-tab-pane>
      <a-tab-pane tab="基本信息" key="2">
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
      <a-tab-pane tab="添加颜色" key="3" forceRender>
        <div class="tab-pane-2">
          <a-form :form="form1" @submit="handleSubmitColor">
            <a-form-item v-for="k in form1.getFieldValue('keys')" :key="k" :required="false" style="display:flex;width: 100%;">
              <a-form-item>
                  <a-upload
                    v-decorator="[`eximgurl[${k}]`,{rules: [{required: true,message: '请上传缩略图',}],}]"
                    name="avatar"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :beforeUpload="beforeUpload"
                    @change="handleChangeColor1"
                    
                  >
                    <img v-if="imgUrlArr[k].eximgurl" :src="imgUrlArr[k].eximgurl" alt="avatar" />
                    <div v-else @click="sendKey(k)" style="width: 100%;height: 100%;padding-top: 20px;">
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传缩略图</div>
                    </div>
                    </a-upload>
              </a-form-item>
              <a-form-item>
                <a-upload
                  v-decorator="[`frontimgurl[${k}]`,{rules: [{required: true,message: '请上传正面图',}],}]"
                  name="avatar"
                  accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChangeColor2"  
                >
                  <img v-if="imgUrlArr[k].frontimgurl" :src="imgUrlArr[k].frontimgurl" alt="avatar" />
                  <div v-else>
                    <a-icon type='plus'/>
                    <div class="ant-upload-text">上传正面图</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item>
                <a-upload
                  v-decorator="[`backimgurl[${k}]`,{rules: [{required: true,message: '请上传背面图',}],}]"
                  name="avatar"
                  accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChangeColor3"  
                >
                  <img v-if="imgUrlArr[k].backimgurl" :src="imgUrlArr[k].backimgurl" alt="avatar" />
                  <div v-else>
                    <a-icon type='plus'/>
                    <div class="ant-upload-text">上传背面图</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item>
                <a-upload
                  v-decorator="[`leftimgurl[${k}]`,{rules: [{required: true,message: '请上传左面图',}],}]"
                  name="avatar"
                  accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChangeColor4"  
                >
                  <img v-if="imgUrlArr[k].leftimgurl" :src="imgUrlArr[k].leftimgurl" alt="avatar" />
                  <div v-else>
                    <a-icon type='plus'/>
                    <div class="ant-upload-text">上传左面图</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item>
                <a-upload
                  v-decorator="[`rightimgurl[${k}]`,{rules: [{required: true,message: '请上传右面图',}],}]"
                  name="avatar"
                  accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                  @change="handleChangeColor5"  
                >
                  <img v-if="imgUrlArr[k].rightimgurl" :src="imgUrlArr[k].rightimgurl" alt="avatar" />
                  <div v-else>
                    <a-icon type='plus'/>
                    <div class="ant-upload-text">上传右面图</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-icon
                v-if="form1.getFieldValue('keys').length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="form1.getFieldValue('keys').length === 1"
                @click="() => removeInput(k)"
              />
            </a-form-item>
            <a-form-item>
              <a type="dashed" style="width: 60%;color: #33b8b3" @click="add">
                <a-icon type="plus" /> Add more
              </a>
            </a-form-item>
            <a-form-item style="text-align: center;">
              <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      
    </a-tabs>
  </div>
</template>
<script>
let id = 0;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { fabric } from 'fabric';
import { sourceUpload } from "@/api/seller";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      imageUrl: '',
      imgUrlArr:[
        {
          eximgurl:'',
          frontimgurl:'',
          backimgurl: '',
          leftimgurl: '',
          rightimgurl: ''
        }
      ],
      key: 0,
      screenWidth: 600,
      designModel: 0,
      myCanvas1: null,
      myCanvas2: null,
      myCanvas3: null,
      myCanvas4: null,
      myCanvas: null,
      previewVisible: false,
      previewImage: '',
      bgimgs:[
        {
          url: ''
        },
        {
          url: ''
        },
        {
          url: ''
        },
        {
          url: ''
        }
      ],
      uploadA:false
    };
  },
  beforeCreate () {
      this.form1 = this.$form.createForm(this,{ name: 'dynamic_form_item' });
      this.form1.getFieldDecorator('keys', { initialValue: [id], preserve: true });
  },
  mounted(){
    this.$nextTick(function() {
      this.myCanvas1 = new fabric.Canvas("canvas1");
      this.myCanvas2 = new fabric.Canvas("canvas2");
      this.myCanvas3 = new fabric.Canvas("canvas3");
      this.myCanvas4 = new fabric.Canvas("canvas4");
      this.myCanvas = this.myCanvas1
    })
  },
  methods: {
    changeModelDesign(i){
        console.log(i)
        this.designModel = i;
        if(i == 0){
            this.myCanvas = this.myCanvas1
            this.bindCanvas(this.myCanvas,i);
        }else if(i == 1){
            this.myCanvas = this.myCanvas2
            this.bindCanvas(this.myCanvas,i);
        }else if(i == 2){
            this.myCanvas = this.myCanvas3
            this.bindCanvas(this.myCanvas,i);
        }else if(i == 3){
            this.myCanvas = this.myCanvas4
            this.bindCanvas(this.myCanvas,i);
        }
    },
    bindCanvas(canvas,i) {
        let that = this
        let img = new Image();
        let imgInstance;
        //设置图片跨域访问
        img.crossOrigin = 'anonymous';
        img.src = that.bgimgs[i].url+"?timeStamp="+new Date().getTime();
        img.onload = function () {
          imgInstance = new fabric.Image(img, {
              opacity: 1,
              angle: 0,
              left: that.screenWidth / 2,
              top: that.screenWidth / 2,
              originX: "center",
              originY: "center",
              scaleX: 0.5,
              scaleY: 0.5,
              crossOrigin: '*'
          });
          canvas.setBackgroundImage(imgInstance,canvas.renderAll.bind(canvas));
        }
    },
    handleChangeDesign1(file) {
      let formData = new FormData();
      formData.append("file", file.file.originFileObj);
      sourceUpload(formData).then(res => {
          console.log(res)
          this.bgimgs[0].url = res.preview_url;
          this.bindCanvas(this.myCanvas,0)
      })
      
    },
    handleChangeDesign2(file) {
      let formData = new FormData();
      console.log(file)
      formData.append("file", file.file.originFileObj);
      sourceUpload(formData).then(res => {
          console.log(res)
          this.bgimgs[1].url = res.preview_url;
          this.bindCanvas(this.myCanvas,1)
      })
    },
    handleChangeDesign3(file) {
      let formData = new FormData();
      console.log(file)
      formData.append("file", file.file.originFileObj);
      sourceUpload(formData).then(res => {
          console.log(res)
          this.bgimgs[2].url = res.preview_url;
          this.bindCanvas(this.myCanvas,2)
      })
    },
    handleChangeDesign4(file) {
      let formData = new FormData();
      console.log(file)
      formData.append("file", file.file.originFileObj);
      sourceUpload(formData).then(res => {
          console.log(res)
          this.bgimgs[3].url = res.preview_url;
          this.bindCanvas(this.myCanvas,3)
      })
    },
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
    sendKey(k){
      console.log(k);
      this.key = k;
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
    },
    handleChangeColor1(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.imgUrlArr[this.key].eximgurl = imageUrl;
      });
    },
    handleChangeColor2(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.imgUrlArr[this.key].frontimgurl = imageUrl;
      });
    },
    handleChangeColor3(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.imgUrlArr[this.key].backimgurl = imageUrl;
      });
    },
    handleChangeColor4(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.imgUrlArr[this.key].leftimgurl = imageUrl;
      });
    },
    handleChangeColor5(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.imgUrlArr[this.key].rightimgurl = imageUrl;
      });
    },
    removeInput(k) {
      const { form1 } = this;
      // can use data-binding to get
      const keys = form1.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
          return;
      }
      form1.setFieldsValue({
          keys: keys.filter(key => key !== k),
      });
      console.log(keys)
      console.log(k)
      setTimeout(() => {
        this.imgUrlArr.splice(k,1)
        console.log(this.imgUrlArr)
      },10)
      
    },
    add(){
      let a = {
          eximgurl:'',
          frontimgurl:'',
          backimgurl: '',
          leftimgurl: '',
          rightimgurl: ''
        };
      const { form1 } = this;
      const keys = form1.getFieldValue('keys');
      const nextKeys = keys.concat(++id);
      form1.setFieldsValue({
          keys: nextKeys,
      });
      this.imgUrlArr.push(a)
      console.log(keys)
    },
    handleSubmitColor(e){
      e.preventDefault();
      this.form1.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log('Received values of form: ', values);
            this.$message.success('successful!')
          }
      });
    },
  },
}
</script>
<style lang="less">
#DictList{
  padding: 0 20px;
  .tab-pane-1{
    .dosomething{
      width: calc(100% - 600px);
      .upload-box{
        display: flex;
        justify-content: center;
        img{
          width: 86px;
          height: 86px;
        }
      }
    }
  }
  .tab-pane-2{
    .ant-form-item-children{
      display: flex;
      align-items: center;
      .ant-form-item{
        margin: 0;
        min-height: 131px;
        img{
          width: 86px;
          height: 86px;
        }
      }
    }
  }
  .design-box{
    display: flex;
    .active{
        background-color: #fff;
        color: #33b8b3 !important;
        span{
            color: #33b8b3 !important;
        }
    }
    .container{
      width: 65%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 640px;
      position: relative;
      .canvas-container{
        z-index: 100;
        position: relative;
        .moving-box{
          position:absolute;
          border: 1px solid #333;
          z-index: 200;
          > div{
            position: absolute;
            border: 1px solid #333;
          }
        }
      }
      .top{
        position: absolute;
        right: 20px;
        top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        z-index: 100;
        .li{
          border: 1px solid #ccc;
          margin-bottom: 20px;
          padding: 5px;
          width: 50px;
          height: 50px;
          cursor: pointer;
          img{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>