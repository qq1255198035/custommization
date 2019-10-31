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
              <a-form :form="form2" style="display: flex;justify-content: center; flex-wrap: wrap;">
                <a-form-item>
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign1"
                    :showUploadList="false"
                    v-decorator="['frontimg', { rules: [{ required: false, message: '请填上传正面图片!' }] }]"
                  >
                    <img v-if="bgimgs[0].url" :src="bgimgs[0].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传正面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item>
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign2"
                    :showUploadList="false"
                    v-decorator="['backimg', { rules: [{ required: false, message: '请填上传背面图片!' }] }]"
                  >
                    <img v-if="bgimgs[1].url" :src="bgimgs[1].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传背面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item>
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign3"
                    :showUploadList="false"
                    v-decorator="['leftimg', { rules: [{ required: false, message: '请填上传左面图片!' }] }]"
                  >
                    <img v-if="bgimgs[2].url" :src="bgimgs[2].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传左面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item>
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign4"
                    :showUploadList="false"
                    v-decorator="['rightimg', { rules: [{ required: false, message: '请填上传右面图片!' }] }]"
                  >
                    <img v-if="bgimgs[3].url" :src="bgimgs[3].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传右面</div>
                    </div>
                  </a-upload>
                </a-form-item>
              </a-form>
            </div>
            <div class="edit">
              <a-form :form="form2" layout="vertical">
                <a-form-item label="Name">
                  <a-input v-decorator="['name', { rules: [{ required: true, message: '请填写区域名称!' }] }]"/>
                </a-form-item>
                <div class="edit-box">
                  <a-form-item label="Width" style="width: 49%;">
                    <a-input-number v-decorator="['width', { rules: [{ required: true, message: '请填写宽度!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change'] }]" :min="0"/>
                  </a-form-item>
                  <a-form-item label="Height" style="width: 49%;">
                    <a-input-number v-decorator="['height', { rules: [{ required: true, message: '请填写高度!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change']}]" :min="0"/>
                  </a-form-item>
                  <a-form-item label="Left" style="width: 49%;">
                    <a-input-number v-decorator="['left', { rules: [{ required: true, message: '请填写左侧坐标!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change']}]" :min="0"/>
                  </a-form-item>
                  <a-form-item label="Top" style="width: 49%;">
                    <a-input-number v-decorator="['top', { rules: [{ required: true, message: '请填写顶部坐标!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change'] }]" :min="0"/>
                  </a-form-item>
                  <a-form-item style="width: 100%; text-align: right;">
                    <a-button :disabled="abledCancel" @click="cancleEdit" style="margin-right: 10px;">取消修改</a-button>
                    <a-button :disabled="abledEdit" @click="confirmEdit" type="primary">确定修改</a-button>
                  </a-form-item>
                </div>
              </a-form>
            </div>
            <div class="list-box">
              <a-list itemLayout="horizontal" :dataSource="showList" style="padding: 0 50px;">
                <a-list-item slot="renderItem" slot-scope="item,index">
                  <a slot="actions">
                    <a-icon type="edit" style="color: #666; font-size: 18px; margin-right: 10px;" @click="editCanvasObj(index)"></a-icon>
                    <a-icon type="delete" style="color: #666; font-size: 18px;" @click="deleteCanvasObj(index)" v-if="index !== 0"></a-icon>
                  </a>
                  <a-list-item-meta :description="'Width:' + item.width +','+ 'Height:' + item.height +','+'Left:' + item.left +','+ 'Top:' + item.top">
                    <span slot="title">{{item.name}}</span>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
            <div style="display: flex; justify-content: flex-end;" v-show="designModel == 0">
              <a-button type="primary" @click="addFirstQ(1)" :disabled="!addFlag1">添加限制区域</a-button>
              <a-button style="margin: 0 20px;" :disabled="addFlag1" @click="addDesignQ">新增设计区域</a-button>
            </div>
            <div style="display: flex; justify-content: flex-end;" v-show="designModel == 1">
              <a-button type="primary" @click="addFirstQ(2)" :disabled="!addFlag2">添加限制区域</a-button>
              <a-button style="margin: 0 20px;" :disabled="addFlag2" @click="addDesignQ">新增设计区域</a-button>
            </div>
            <div style="display: flex; justify-content: flex-end;" v-show="designModel == 2">
              <a-button type="primary" @click="addFirstQ(3)" :disabled="!addFlag3">添加限制区域</a-button>
              <a-button style="margin: 0 20px;" :disabled="addFlag3" @click="addDesignQ">新增设计区域</a-button>
            </div>
            <div style="display: flex; justify-content: flex-end;" v-show="designModel == 3">
              <a-button type="primary" @click="addFirstQ(4)" :disabled="!addFlag4">添加限制区域</a-button>
              <a-button style="margin: 0 20px;" :disabled="addFlag4" @click="addDesignQ">新增设计区域</a-button>
            </div>
            <div class="submitbtn-box">
              <a-button type="primary" @click="postDesignSize">保存</a-button>
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
      <a-tab-pane tab="其他信息" key="3" forceRender>
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
    <!-- <a-drawer
      title="修改区域"
      placement="right"
      :closable="false"
      :visible="visible"
      :mask="false"
      :width="300"
    >
      <a-form layout="vertical" class="edit-form-box">
        <a-form-item label="Name">
          <a-input placeholder="输入名字" v-model="editName" />
        </a-form-item>
        <a-form-item label="Width">
          <a-input-number placeholder="输入宽度" v-model="editWidth" @change="changeSomething($event,'width')" :min="0"/>
        </a-form-item>
        <a-form-item label="Height">
          <a-input-number placeholder="输入高度" v-model="editHeight" @change="changeSomething($event,'height')" :min="0"/>
        </a-form-item>
        <a-form-item label="Left">
          <a-input-number placeholder="输入左侧坐标值" v-model="editLeft" @change="changeSomething($event,'left')" :min="0"/>
        </a-form-item>
        <a-form-item label="Top">
          <a-input-number placeholder="输入顶部坐标值" v-model="editTop" @change="changeSomething($event,'top')" :min="0"/>
        </a-form-item>
        <a-form-item>
          <a-button @click="cancleEdit" style="margin-right: 10px;">取消</a-button>
          <a-button type="primary" @click="confirmEdit">确 定</a-button>
        </a-form-item>
      </a-form>
    </a-drawer> -->
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
      editName: '',
      editWidth: '',
      editHeight: '',
      editLeft: '',
      editTop: '',
      form: this.$form.createForm(this),
      abledEdit: true,
      abledCancel: true,
      //visible: false,
      imageUrl: '',
      addFlag1: true,
      addFlag2: true,
      addFlag3: true,
      addFlag4: true,
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
      isFirst: -1,
      screenWidth: 600,
      designModel: 0,
      myCanvas1: null,
      myCanvas2: null,
      myCanvas3: null,
      myCanvas4: null,
      myCanvas: null,
      previewVisible: false,
      previewImage: '',
      bgimgs:[{url: ''},{url: ''},{url: ''},{url: ''}],
      uploadA:false,
      dataList:{
        canvas1:[],canvas2:[],canvas3:[],canvas4:[]
      },
      showList:[]
    };
  },
  beforeCreate () {
      this.form2 = this.$form.createForm(this),
      this.form1 = this.$form.createForm(this,{ name: 'dynamic_form_item' });
      this.form1.getFieldDecorator('keys', { initialValue: [id], preserve: true });
  },
  mounted(){
    this.$nextTick(function() {
      this.myCanvas1 = new fabric.Canvas("canvas1");
      this.myCanvas2 = new fabric.Canvas("canvas2");
      this.myCanvas3 = new fabric.Canvas("canvas3");
      this.myCanvas4 = new fabric.Canvas("canvas4");
      this.myCanvas = this.myCanvas1;
      // this.monitorObjectMove(this.myCanvas1);
      // this.monitorObjectMove(this.myCanvas2);
      // this.monitorObjectMove(this.myCanvas3);
      // this.monitorObjectMove(this.myCanvas4);
      this.monitorObjectScale(this.myCanvas1);
      this.monitorObjectScale(this.myCanvas2);
      this.monitorObjectScale(this.myCanvas3);
      this.monitorObjectScale(this.myCanvas4);
    })
  },
  methods: {
    postDesignSize(){
      let dataList = this.dataList;
      let params = {
        canvas1:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas2:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas3:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas4:{width: '',height: '',top: '',left: '',name: '',list:[]},
      }
      let json1 = this.myCanvas1.toJSON();
      let json2 = this.myCanvas2.toJSON();
      let json3 = this.myCanvas3.toJSON();
      let json4 = this.myCanvas4.toJSON();
      params.canvas1.list = dataList.canvas1.slice(1);
      params.canvas2.list = dataList.canvas2.slice(1);
      params.canvas3.list = dataList.canvas3.slice(1);
      params.canvas4.list = dataList.canvas4.slice(1);
      params.canvas1.width = dataList.canvas1.length > 0 ? dataList.canvas1[0].width : '';
      params.canvas1.height = dataList.canvas1.length > 0 ? dataList.canvas1[0].height : '';
      params.canvas1.left = dataList.canvas1.length > 0 ? dataList.canvas1[0].left : '';
      params.canvas1.top = dataList.canvas1.length > 0 ? dataList.canvas1[0].top : '';
      params.canvas1.name = dataList.canvas1.length > 0 ? dataList.canvas1[0].name : '';
      params.canvas2.width = dataList.canvas2.length > 0 ? dataList.canvas2[0].width : '';
      params.canvas2.height = dataList.canvas2.length > 0 ? dataList.canvas2[0].height : '';
      params.canvas2.left = dataList.canvas2.length > 0 ? dataList.canvas2[0].left : '';
      params.canvas2.top = dataList.canvas2.length > 0 ? dataList.canvas2[0].top : '';
      params.canvas2.name = dataList.canvas2.length > 0 ? dataList.canvas2[0].name : '';
      params.canvas3.width = dataList.canvas3.length > 0 ? dataList.canvas3[0].width : '';
      params.canvas3.height = dataList.canvas3.length > 0 ? dataList.canvas3[0].height : '';
      params.canvas3.left = dataList.canvas3.length > 0 ? dataList.canvas3[0].left : '';
      params.canvas3.top = dataList.canvas3.length > 0 ? dataList.canvas3[0].top : '';
      params.canvas3.name = dataList.canvas3.length > 0 ? dataList.canvas3[0].name : '';
      params.canvas4.width = dataList.canvas4.length > 0 ? dataList.canvas4[0].width : '';
      params.canvas4.height = dataList.canvas4.length > 0 ? dataList.canvas4[0].height : '';
      params.canvas4.left = dataList.canvas4.length > 0 ? dataList.canvas4[0].left : '';
      params.canvas4.top = dataList.canvas4.length > 0 ? dataList.canvas4[0].top : '';
      params.canvas4.name = dataList.canvas4.length > 0 ? dataList.canvas4[0].name: '';
      params.canvas1.list.forEach(item => {
        item.left = item.left - params.canvas1.left;
        item.top = item.top - params.canvas1.top;
      });
      params.canvas2.list.forEach(item => {
        item.left = item.left - params.canvas2.left;
        item.top = item.top - params.canvas2.top;
      })
      params.canvas3.list.forEach(item => {
        item.left = item.left - params.canvas3.left;
        item.top = item.top - params.canvas3.top;
      })
      params.canvas4.list.forEach(item => {
        item.left = item.left - params.canvas4.left;
        item.top = item.top - params.canvas4.top;
      })
      console.log(json1,json2,json3,json4)
    },
    cancleEdit(){
      let obj = this.myCanvas.getActiveObject();
      if(this.designModel == 0){
        this.form2.setFieldsValue({
          width: this.dataList.canvas1[this.isFirst].width,
          height: this.dataList.canvas1[this.isFirst].height,
          left: this.dataList.canvas1[this.isFirst].left,
          top: this.dataList.canvas1[this.isFirst].top,
        })
      }else if(this.designModel == 1){
        this.form2.setFieldsValue({
          width: this.dataList.canvas2[this.isFirst].width,
          height: this.dataList.canvas2[this.isFirst].height,
          left: this.dataList.canvas2[this.isFirst].left,
          top: this.dataList.canvas2[this.isFirst].top,
        })
      }else if(this.designModel == 2){
        this.form2.setFieldsValue({
          width: this.dataList.canvas3[this.isFirst].width,
          height: this.dataList.canvas3[this.isFirst].height,
          left: this.dataList.canvas3[this.isFirst].left,
          top: this.dataList.canvas3[this.isFirst].top,
        })
      }else if(this.designModel == 3){
        this.form2.setFieldsValue({
          width: this.dataList.canvas4[this.isFirst].width,
          height: this.dataList.canvas4[this.isFirst].height,
          left: this.dataList.canvas4[this.isFirst].left,
          top: this.dataList.canvas4[this.isFirst].top,
        })
      }
      let width = this.form2.getFieldValue('width');
      let height = this.form2.getFieldValue('height')
      let left = this.form2.getFieldValue('left')
      let top = this.form2.getFieldValue('top')
      obj.set({width: width,height: height,left: left,top: top});
      this.myCanvas.renderAll();
      this.myCanvas.discardActiveObject();
      this.abledEdit = true;
      this.abledCancel = true;
    },
    confirmEdit(){
      this.editWidth = this.form2.getFieldValue("width");
      this.editHeight = this.form2.getFieldValue("height");
      this.editLeft = this.form2.getFieldValue("left");
      this.editTop = this.form2.getFieldValue("top");
      this.editName = this.form2.getFieldValue("name");
      let calcWidth1 = this.editWidth + this.editLeft;
      let calcHeight1 = this.editHeight + this.editTop;
      if(this.designModel == 0){
        if(this.isFirst !== 0){
          let calcHeight2 = this.dataList.canvas1[0].height + this.dataList.canvas1[0].top;
          let calcWidth2 = this.dataList.canvas1[0].width + this.dataList.canvas1[0].left;
          if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || this.editLeft < this.dataList.canvas1[0].left || this.editTop < this.dataList.canvas1[0].top){
            this.$message.error('您输入的值已超出限制区域，请重新输入！')
            return
          }
        }
        this.dataList.canvas1[this.isFirst].width = this.editWidth;
        this.dataList.canvas1[this.isFirst].height = this.editHeight;
        this.dataList.canvas1[this.isFirst].left = this.editLeft;
        this.dataList.canvas1[this.isFirst].top = this.editTop;
        this.dataList.canvas1[this.isFirst].name = this.editName;
        this.showList = this.dataList.canvas1;
      }else if(this.designModel == 1){
        if(this.isFirst == 0){
          this.dataList.canvas2[this.isFirst].width = this.editWidth;
          this.dataList.canvas2[this.isFirst].height = this.editHeight;
          this.dataList.canvas2[this.isFirst].left = this.editLeft;
          this.dataList.canvas2[this.isFirst].top = this.editTop;
          this.dataList.canvas2[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas2;
          this.handleObjectMove(this.myCanvas,this.dataList.canvas2[0].top,600 - this.dataList.canvas2[0].top - this.dataList.canvas2[0].height,this.dataList.canvas2[0].left,600 - this.dataList.canvas2[0].left - this.dataList.canvas2[0].width);
        }else{
          let calcHeight2 = this.dataList.canvas2[0].height + this.dataList.canvas2[0].top;
          let calcWidth2 = this.dataList.canvas2[0].width + this.dataList.canvas2[0].left;
          if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || this.editLeft < this.dataList.canvas2[0].left || this.editTop < this.dataList.canvas2[0].top){
            this.$message.error('您输入的值已超出限制区域，请重新输入！')
            return
          }
          this.dataList.canvas2[this.isFirst].width = this.editWidth;
          this.dataList.canvas2[this.isFirst].height = this.editHeight;
          this.dataList.canvas2[this.isFirst].left = this.editLeft;
          this.dataList.canvas2[this.isFirst].top = this.editTop;
          this.dataList.canvas2[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas2;
        }
      }else if(this.designModel == 2){
        if(this.isFirst == 0){
          this.dataList.canvas3[this.isFirst].width = this.editWidth;
          this.dataList.canvas3[this.isFirst].height = this.editHeight;
          this.dataList.canvas3[this.isFirst].left = this.editLeft;
          this.dataList.canvas3[this.isFirst].top = this.editTop;
          this.dataList.canvas3[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas3;
          this.handleObjectMove(this.myCanvas,this.dataList.canvas3[0].top,600 - this.dataList.canvas3[0].top - this.dataList.canvas3[0].height,this.dataList.canvas3[0].left,600 - this.dataList.canvas3[0].left - this.dataList.canvas3[0].width);
        }else{
          let calcHeight2 = this.dataList.canvas3[0].height + this.dataList.canvas3[0].top;
          let calcWidth2 = this.dataList.canvas3[0].width + this.dataList.canvas3[0].left;
          if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || this.editLeft < this.dataList.canvas3[0].left || this.editTop < this.dataList.canvas3[0].top){
            this.$message.error('您输入的值已超出限制区域，请重新输入！')
            return
          }
          this.dataList.canvas3[this.isFirst].width = this.editWidth;
          this.dataList.canvas3[this.isFirst].height = this.editHeight;
          this.dataList.canvas3[this.isFirst].left = this.editLeft;
          this.dataList.canvas3[this.isFirst].top = this.editTop;
          this.dataList.canvas3[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas3;
        }
      }else if(this.designModel == 3){
        if(this.isFirst == 0){
          this.dataList.canvas4[this.isFirst].width = this.editWidth;
          this.dataList.canvas4[this.isFirst].height = this.editHeight;
          this.dataList.canvas4[this.isFirst].left = this.editLeft;
          this.dataList.canvas4[this.isFirst].top = this.editTop;
          this.dataList.canvas4[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas4;
          this.handleObjectMove(this.myCanvas,this.dataList.canvas4[0].top,600 - this.dataList.canvas4[0].top - this.dataList.canvas4[0].height,this.dataList.canvas4[0].left,600 - this.dataList.canvas4[0].left - this.dataList.canvas4[0].width);
        }else{
          let calcHeight2 = this.dataList.canvas4[0].height + this.dataList.canvas4[0].top;
          let calcWidth2 = this.dataList.canvas4[0].width + this.dataList.canvas4[0].left;
          if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || this.editLeft < this.dataList.canvas4[0].left || this.editTop < this.dataList.canvas4[0].top){
            this.$message.error('您输入的值已超出限制区域，请重新输入！')
            return
          }
          this.dataList.canvas4[this.isFirst].width = this.editWidth;
          this.dataList.canvas4[this.isFirst].height = this.editHeight;
          this.dataList.canvas4[this.isFirst].left = this.editLeft;
          this.dataList.canvas4[this.isFirst].top = this.editTop;
          this.dataList.canvas4[this.isFirst].name = this.editName;
          this.showList = this.dataList.canvas4;
        }
      }
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
      this.abledEdit = true;
      this.abledCancel = true;
    },
    editCanvasObj(index){
      console.log(index);
      let items = this.myCanvas.getObjects();
      this.abledEdit = false;
      this.abledCancel = false;
      this.isFirst = index;
      this.myCanvas.setActiveObject(items[index]);
      this.myCanvas.renderAll();
      if(this.designModel == 0){
        this.handleObjectMove(index,this.dataList.canvas1[0].top,600 - this.dataList.canvas1[0].top - this.dataList.canvas1[0].height,this.dataList.canvas1[0].left,600 - this.dataList.canvas1[0].left - this.dataList.canvas1[0].width);
        this.form2.setFieldsValue({
          name: this.dataList.canvas1[index].name,
          width: this.dataList.canvas1[index].width,
          height:this.dataList.canvas1[index].height,
          left:this.dataList.canvas1[index].left,
          top: this.dataList.canvas1[index].top
        });
      }else if(this.designModel == 1){
        this.handleObjectMove(index,this.dataList.canvas2[0].top,600 - this.dataList.canvas2[0].top - this.dataList.canvas2[0].height,this.dataList.canvas2[0].left,600 - this.dataList.canvas2[0].left - this.dataList.canvas2[0].width);
        this.form2.setFieldsValue({
          name: this.dataList.canvas2[index].name,
          width: this.dataList.canvas2[index].width,
          height:this.dataList.canvas2[index].height,
          left:this.dataList.canvas2[index].left,
          top: this.dataList.canvas2[index].top
        });
      }else if(this.designModel == 2){
        this.handleObjectMove(index,this.dataList.canvas3[0].top,600 - this.dataList.canvas3[0].top - this.dataList.canvas3[0].height,this.dataList.canvas3[0].left,600 - this.dataList.canvas3[0].left - this.dataList.canvas3[0].width);
        this.form2.setFieldsValue({
          name: this.dataList.canvas3[index].name,
          width: this.dataList.canvas3[index].width,
          height:this.dataList.canvas3[index].height,
          left:this.dataList.canvas3[index].left,
          top: this.dataList.canvas3[index].top
        });
      }else if(this.designModel == 3){
        this.handleObjectMove(index,this.dataList.canvas4[0].top,600 - this.dataList.canvas4[0].top - this.dataList.canvas4[0].height,this.dataList.canvas4[0].left,600 - this.dataList.canvas4[0].left - this.dataList.canvas4[0].width);
        this.form2.setFieldsValue({
          name: this.dataList.canvas4[index].name,
          width: this.dataList.canvas4[index].width,
          height:this.dataList.canvas4[index].height,
          left:this.dataList.canvas4[index].left,
          top: this.dataList.canvas4[index].top
        });
      }
    },
    deleteCanvasObj(index){
      console.log(index);
      let items = this.myCanvas.getObjects();
      this.myCanvas.remove(items[index]);
      if(this.designModel == 0){
        this.dataList.canvas1.splice(index,1);
        this.showList = this.dataList.canvas1;
      }else if(this.designModel == 1){
        this.dataList.canvas2.splice(index,1);
        this.showList = this.dataList.canvas2;
      }else if(this.designModel == 2){
        this.dataList.canvas3.splice(index,1);
        this.showList = this.dataList.canvas3;
      }else if(this.designModel == 3){
        this.dataList.canvas4.splice(index,1);
        this.showList = this.dataList.canvas4;
      }
    },
    // changeSomething(e,key){
    //   let obj = this.myCanvas.getActiveObject();
    //   if(obj){
    //     if(key == 'width'){
    //       obj.set({width: e});
    //     }else if(key == 'height'){
    //       obj.set({height: e});
    //     }else if(key == 'left'){
    //       obj.set({left: e});
    //     }else if(key == 'top'){
    //       obj.set({top: e});
    //     }
    //     this.myCanvas.renderAll();
    //   }
    // },
    addFirstQ(key){
      this.form2.validateFields((err, values) => {
        if(!err){
          let json = {name: '',width: '',height: '',left: '',top: ''};
          json.name = values.name;
          json.width = values.width;
          json.height = values.height;
          json.left = values.left;
          json.top = values.top;
          let rect = new fabric.Rect({
              left: values.left,
              top: values.top,
              width: values.width,
              height: values.height,
              stroke: 'black',
              strokeWidth: 1,
              fill: 'rgba(0,0,0,0)',
              id: values.name,
              hasRotatingPoint: false,
              padding: 0
            });
            this.myCanvas.add(rect);
            rect.selectable = false;
          if(this.designModel == 0){
            this.dataList.canvas1.push(json);
            this.showList = this.dataList.canvas1;
          }else if(this.designModel == 1){
            this.dataList.canvas2.push(json);
            this.showList = this.dataList.canvas2;
          }else if(this.designModel == 2){
            this.dataList.canvas3.push(json);
            this.showList = this.dataList.canvas3;
          }else if(this.designModel == 3){
            this.dataList.canvas4.push(json);
            this.showList = this.dataList.canvas4;
          }
          if(key == 1){
            this.addFlag1 = false;
          }else if(key == 2){
            this.addFlag2 = false;
          }else if(key == 3){
            this.addFlag3 = false;
          }else if(key == 4){
            this.addFlag4 = false;
          }
        }
      })
    },
    addDesignQ(){
      this.form2.validateFields((err, values) => {
        if(!err){
          let calcWidth1 = values.width + values.left;
          let calcHeight1 = values.height + values.top;
          let json = {name: '',width: '',height: '',left: '',top: ''};
          json.name = values.name;
          json.width = values.width;
          json.height = values.height;
          json.left = values.left;
          json.top = values.top;
          if(this.designModel == 0){
            let calcHeight2 = this.dataList.canvas1[0].height + this.dataList.canvas1[0].top;
            let calcWidth2 = this.dataList.canvas1[0].width + this.dataList.canvas1[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left < this.dataList.canvas1[0].left || values.top < this.dataList.canvas1[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas1.push(json);
          }else if(this.designModel == 1){
            let calcHeight2 = this.dataList.canvas2[0].height + this.dataList.canvas2[0].top;
            let calcWidth2 = this.dataList.canvas2[0].width + this.dataList.canvas2[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left < this.dataList.canvas2[0].left || values.top < this.dataList.canvas2[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas2.push(json);
          }else if(this.designModel == 2){
            let calcHeight2 = this.dataList.canvas3[0].height + this.dataList.canvas3[0].top;
            let calcWidth2 = this.dataList.canvas3[0].width + this.dataList.canvas3[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left < this.dataList.canvas3[0].left || values.top < this.dataList.canvas3[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas3.push(json);
          }else if(this.designModel == 3){
            let calcHeight2 = this.dataList.canvas4[0].height + this.dataList.canvas4[0].top;
            let calcWidth2 = this.dataList.canvas4[0].width + this.dataList.canvas4[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left < this.dataList.canvas4[0].left || values.top < this.dataList.canvas4[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas4.push(json);
          }
          let rect = new fabric.Rect({
              left: values.left,
              top: values.top,
              width: values.width,
              height: values.height,
              stroke: 'black',
              strokeWidth: 1,
              fill: 'rgba(0,0,0,0)',
              id: values.name,
              hasRotatingPoint: false,
              padding: 0
            });
            this.myCanvas.add(rect);
            rect.selectable = false;
            console.log(this.dataList)
        }
      })
    },
    // monitorObjectMove(object){
    //   let that = this;
    //   object.on('object:moving', function (e) {
    //     let obj = e.target;
    //     console.log(e.target.left)
    //     that.form2.setFieldsValue({
    //       width:parseInt(obj.width),
    //       height:parseInt(obj.height),
    //       left:parseInt(obj.left),
    //       top:parseInt(obj.top)
    //     });
    //   })
    // },
    monitorObjectScale(object){
      let that = this;
      object.on('object:modified', function (e) {
        let obj = e.target;
        console.log(e.target);
        console.log(obj.getBoundingRect().width);
        that.form2.setFieldsValue({
          width:parseInt(obj.getBoundingRect().width) - 1,
          height:parseInt(obj.getBoundingRect().height) - 1,
          left:parseInt(obj.left),
          top:parseInt(obj.top)
        });
      })
    },
    handleObjectMove(index,top,bottom,left,right){
        let items = this.myCanvas.getObjects();
        let that = this;
        let top_margin;
        let bottom_margin;
        let left_margin;
        let right_margin;
        items[index].on('moving', function(e){
         let obj = e.target;
         top_margin = top;
         bottom_margin = bottom;
        left_margin = left;
        right_margin = right;
          if(index !== 0){
            that.myCanvas.requestRenderAll();
            if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
              return;
            }    
            console.log(top_margin,bottom_margin,left_margin,right_margin)    
            obj.setCoords();        
            if(obj.getBoundingRect(true).top < top_margin || obj.getBoundingRect(true).left < left_margin){
              obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect(true).top + top_margin);
              obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect(true).left + left_margin);
            }
            if(obj.getBoundingRect(true).top+obj.getBoundingRect(true).height  > 600 - bottom_margin || obj.getBoundingRect(true).left+obj.getBoundingRect(true).width  > 600 - right_margin){
              obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect(true).height+obj.top-obj.getBoundingRect(true).top - bottom_margin);
              obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect(true).width+obj.left-obj.getBoundingRect(true).left - right_margin);
            } 
          }
        });
    },
    changeModelDesign(i){
        console.log(i)
        this.designModel = i;
        if(i == 0){
            this.myCanvas = this.myCanvas1;
            this.bindCanvas(this.myCanvas,i);
            this.showList = this.dataList.canvas1
        }else if(i == 1){
            this.myCanvas = this.myCanvas2;
            this.bindCanvas(this.myCanvas,i);
            this.showList = this.dataList.canvas2
        }else if(i == 2){
            this.myCanvas = this.myCanvas3;
            this.bindCanvas(this.myCanvas,i);
            this.showList = this.dataList.canvas3
        }else if(i == 3){
            this.myCanvas = this.myCanvas4;
            this.bindCanvas(this.myCanvas,i);
            this.showList = this.dataList.canvas4
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
      if(file.size / 1024 / 1024 < 10){
        let formData = new FormData();
        formData.append("file", file);
        sourceUpload(formData).then(res => {
          console.log(res)
          this.bgimgs[0].url = res.preview_url;
          this.designModel = 0;
          this.myCanvas = this.myCanvas1
          this.bindCanvas(this.myCanvas,0)
        })
      }else{
          this.$message.error('图片大小超出限制！')
          return false
      }
    },
    handleChangeDesign2(file) {
      if(file.size / 1024 / 1024 < 10){
        let formData = new FormData();
        formData.append("file", file);
        sourceUpload(formData).then(res => {
            this.bgimgs[1].url = res.preview_url;
            this.designModel = 1;
            this.myCanvas = this.myCanvas2;
            this.bindCanvas(this.myCanvas,1)
        })
      }else{
        this.$message.error('图片大小超出限制！')
        return false
      }
    },
    handleChangeDesign3(file) {
      if(file.size / 1024 / 1024 < 10){
        let formData = new FormData();
        console.log(file)
        formData.append("file", file);
        sourceUpload(formData).then(res => {
            console.log(res)
            this.bgimgs[2].url = res.preview_url;
            this.designModel = 2;
            this.myCanvas = this.myCanvas3;
            this.bindCanvas(this.myCanvas,2)
        })
      }else{
        this.$message.error('图片大小超出限制！')
        return false
      }
    },
    handleChangeDesign4(file) {
      if(file.size / 1024 / 1024 < 10){
        let formData = new FormData();
        console.log(file)
        formData.append("file", file);
        sourceUpload(formData).then(res => {
            console.log(res)
            this.bgimgs[3].url = res.preview_url;
            this.designModel = 3;
            this.myCanvas = this.myCanvas4;
            this.bindCanvas(this.myCanvas,3)
        })
      }else{
        this.$message.error('图片大小超出限制！')
        return false
      }
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
.edit-form-box{
  .ant-input-number{
    width: 100%;
  }
}
#DictList{
  padding: 0 20px;
  .tab-pane-1{
    .dosomething{
      width: calc(100% - 600px);
      .upload-box{
        .ant-form-item{
          margin-bottom: 5px;
        }
        img{
          width: 86px;
          height: 86px;
        }
      }
      .edit{
        padding:0 50px;
        .edit-box{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .ant-form-item-control-wrapper{
            width: 100%;
          }
          .ant-input-number{
            width: 100%;
          }
        }
        .ant-form-item{
          margin-bottom: 5px; 
        }
      }
      .list-box{
        height: 291px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 6px;
          background-color: #fff;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #33b8b3;
          border-radius:4px;
          height: 10%;
        }
      }
      .submitbtn-box{
        padding: 10px 0;
        margin-top: 20px;
        text-align:right;
        padding-right: 20px;
        border-top: 1px solid #ccc;
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