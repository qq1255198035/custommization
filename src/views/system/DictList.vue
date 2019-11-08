<template>
  <div id="DictList">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="商品图片" key="1">
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
                        <span style="display: block; text-align:center; margin-top: 5px; font-size: 10px; color:#999;">{{index == 0 ? 'Front' : index == 1 ? 'Back' : index == 2 ? 'Left' : index == 3 ? 'Right' : ''}}</span>
                    </li>
                </ul>
            </div>
          </div>
          <div class="dosomething">
            <div class="upload-box">
              <a-form :form="form" style="display: flex; padding: 0 50px;" layout="inline">
                <a-form-item v-show="designModel == 0" label="1.上传服装">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign1"
                    :showUploadList="false"
                    v-decorator="['frontimg', { rules: [{ required: true, message: '请填上传正面图片!' }] }]"
                  >
                    <img v-if="bgimgs[0].url" :src="bgimgs[0].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传正面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item v-show="designModel == 1" label="1.上传服装">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign2"
                    :showUploadList="false"
                    v-decorator="['backimg', { rules: [{ required: true, message: '请填上传背面图片!' }] }]"
                  >
                    <img v-if="bgimgs[1].url" :src="bgimgs[1].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传背面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item v-show="designModel == 2" label="1.上传服装">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign3"
                    :showUploadList="false"
                    v-decorator="['leftimg', { rules: [{ required: true, message: '请填上传左面图片!' }] }]"
                  >
                    <img v-if="bgimgs[2].url" :src="bgimgs[2].url" alt="avatar" />
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传左面</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item v-show="designModel == 3" label="1.上传服装">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :beforeUpload="handleChangeDesign4"
                    :showUploadList="false"
                    v-decorator="['rightimg', { rules: [{ required: true, message: '请填上传右面图片!' }] }]"
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
            <a-collapse :bordered="false" :activeKey="activeKey" accordion>
              <a-collapse-panel header="2.添加限定区域" key="1">
                <div class="edit">
                  <a-form :form="form" layout="vertical">
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
                      <div v-show="designModel == 0" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel_1" @click="cancleEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit_1" @click="confirmEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 1" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel_2" @click="cancleEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit_2" @click="confirmEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 2" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel_3" @click="cancleEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit_3" @click="confirmEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 3" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel_4" @click="cancleEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit_4" @click="confirmEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div style="width: 100%;">
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 0">
                          <a-button type="primary" @click="addFirstQ(1)" :disabled="!addFlag1">添加限制区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 1">
                          <a-button type="primary" @click="addFirstQ(2)" :disabled="!addFlag2">添加限制区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 2">
                          <a-button type="primary" @click="addFirstQ(3)" :disabled="!addFlag3">添加限制区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 3">
                          <a-button type="primary" @click="addFirstQ(4)" :disabled="!addFlag4">添加限制区域</a-button>
                        </div>
                      </div>
                    </div>
                  </a-form>
                </div>
              </a-collapse-panel>
              <a-collapse-panel header="3.添加设计区域" key="2">
                <div class="edit">
                  <a-form :form="form" layout="vertical">
                    <a-form-item label="Name">
                      <a-input v-decorator="['name', { rules: [{ required: true, message: '请填写区域名称!' }] }]"/>
                    </a-form-item>
                    <div class="edit-box">
                      <a-form-item label="Width" style="width: 49%;">
                        <a-input-number v-decorator="['width1', { rules: [{ required: true, message: '请填写宽度!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change'] }]" :min="0"/>
                      </a-form-item>
                      <a-form-item label="Height" style="width: 49%;">
                        <a-input-number v-decorator="['height1', { rules: [{ required: true, message: '请填写高度!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change']}]" :min="0"/>
                      </a-form-item>
                      <a-form-item label="Left" style="width: 49%;">
                        <a-input-number v-decorator="['left1', { rules: [{ required: true, message: '请填写左侧坐标!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change']}]" :min="0"/>
                      </a-form-item>
                      <a-form-item label="Top" style="width: 49%;">
                        <a-input-number v-decorator="['top1', { rules: [{ required: true, message: '请填写顶部坐标!' },{ type: 'number', message: '请填写数字!' }],validateTrigger: ['change'] }]" :min="0"/>
                      </a-form-item>
                      <div v-show="designModel == 0" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel1_1" @click="cancleDesignEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit1_1" @click="confirmDesignEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 1" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel1_2" @click="cancleDesignEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit1_2" @click="confirmDesignEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 2" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel1_3" @click="cancleDesignEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit1_3" @click="confirmDesignEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div v-show="designModel == 3" style="width: 100%;">
                        <a-form-item style="width: 100%; text-align: right;">
                          <a-button :disabled="abledCancel1_4" @click="cancleDesignEdit" style="margin-right: 10px;">取消修改</a-button>
                          <a-button :disabled="abledEdit1_4" @click="confirmDesignEdit" type="primary">确定修改</a-button>
                        </a-form-item>
                      </div>
                      <div style="width: 100%;">
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 0">
                          <a-button :disabled="addFlag1" @click="addDesignQ">新增设计区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 1">
                          <a-button :disabled="addFlag2" @click="addDesignQ">新增设计区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 2">
                          <a-button :disabled="addFlag3" @click="addDesignQ">新增设计区域</a-button>
                        </div>
                        <div style="display: flex; justify-content: flex-end;" v-show="designModel == 3">
                          <a-button :disabled="addFlag4" @click="addDesignQ">新增设计区域</a-button>
                        </div>
                      </div>
                    </div>
                  </a-form>
                </div>
              </a-collapse-panel>
            </a-collapse>
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
            <!-- <div class="submitbtn-box">
              <a-button type="primary" @click="postDesignSize">保存</a-button>
            </div> -->
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="通用信息" key="2">
        <a-form :form="form" layout="vertical" class="common-info">
          <a-form-item label="商品名称">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请填写商品名称!' }] }]"/>
          </a-form-item>
          <a-form-item label="商品编号">
            <a-input style="width: 40%;" v-decorator="['number', { rules: [{ required: true, message: '请填写商品名称!' }] }]"/>
          </a-form-item>
          <a-form-item label="商品类别" class="cascader">
            <a-cascader :options="options" @change="onChange" placeholder="Please select" 
              v-decorator="['protype', { rules: [{ required: true, message: '请填写最高价格!' }] }]"
            />
          </a-form-item>
          <a-input-group style="display: flex;align-items: flex-end;">
            <a-form-item label="价格">
              <a-input-number
                placeholder="最高"
                style="width: 100%;"
                v-decorator="['minprice', { rules: [{ required: true, message: '请填写最高价格!' }] }]" 
              />
            </a-form-item>
            <a-form-item style="margin-left: 20px;">
              <a-input-number
                placeholder="最低"
                style="width: 100%;"
                v-decorator="['maxprice', { rules: [{ required: true, message: '请填写最低价格!' }] }]" 
              />
            </a-form-item>
          </a-input-group>
          <a-input-group style="display: flex;align-items: flex-end;">
            <a-form-item label="生产周期">
              <a-input-number
                placeholder="最大"
                style="width: 100%;"
                v-decorator="['productionTime', { rules: [{ required: true, message: '请填写最大生产周期!' }] }]" 
              />
            </a-form-item>
            <a-form-item style="margin-left: 20px;">
              <a-input-number
                placeholder="最小"
                style="width: 100%;"
                v-decorator="['minProductionTime', { rules: [{ required: true, message: '请填写最小生产周期!' }] }]" 
              />
            </a-form-item>
          </a-input-group>
          <a-input-group style="display: flex;align-items: flex-end;" class="suffix">
            <a-form-item label="单件重量">
              <a-input
                placeholder="最小"
                style="width: 100%;"
                v-decorator="['weight', { rules: [{ required: true, message: '请填写最小生产周期!' }] }]" 
              >
                <span slot="suffix">g</span>
              </a-input>
            </a-form-item>
            <a-form-item label="起订量"  style="margin-left: 20px;">
              <a-input 
                style="width: 100%;"
                v-decorator="['minOrder', { rules: [{ required: true, message: '请填写数量!' }] }]" 
              >
              <span slot="suffix">件</span>
              </a-input>
            </a-form-item>
          </a-input-group> 
        </a-form>
      </a-tab-pane>
      <a-tab-pane  tab="详细描述" key="3">
        <a-form :form="form" layout="horizontal">
          <a-form-item label="上传尺寸图片" style="display: flex;">
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
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-form>
        <Editor></Editor>
      </a-tab-pane>
      <a-tab-pane tab="其他信息" key="4" forceRender>
        <div class="tab-pane-2">
          <ul class="radio-box">
            <li>
              <span>
                是否在售
              </span>
              <a-radio-group v-model="value1">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </li>
            <li>
              <span>
                是否热销
              </span>
              <a-radio-group v-model="value2">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </li>
            <li>
              <span>
                是否纯色
              </span>
              <a-radio-group v-model="value3">
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </li>
          </ul>
          <a-form>
            <a-form-item label="关键字">
              <a-input placeholder="请输入关键字" v-model="keywords"/>
            </a-form-item>
            <a-form-item label="商品简介">
              <a-textarea placeholder="请输入简介" v-model="desc"/>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" @click="handleSubmit">保 存</a-button>
    </a-tabs>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { fabric } from 'fabric';
import { sourceUpload,syscategoryList,editProShow } from "@/api/seller";
import Editor from '@/components/Editor/Editor'
export default {
  data() {
    return {
      desc: '',
      keywords: '',
      value1: '',
      value2: '',
      value3: '',
      options:[],
      activeKey: '1',
      editName: '',
      editWidth: '',
      editHeight: '',
      editLeft: '',
      editTop: '',
      form: this.$form.createForm(this),
      abledEdit_1: true,
      abledCancel_1: true,
      abledEdit_2: true,
      abledCancel_2: true,
      abledEdit_3: true,
      abledCancel_3: true,
      abledEdit_4: true,
      abledCancel_4: true,
      abledEdit1_1: true,
      abledCancel1_1: true,
      abledEdit1_2: true,
      abledCancel1_2: true,
      abledEdit1_3: true,
      abledCancel1_3: true,
      abledEdit1_4: true,
      abledCancel1_4: true,
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
      showList:[],
      resData:{}
    };
  },
  
  mounted(){
    this.$nextTick(function() {
      this.myCanvas1 = new fabric.Canvas("canvas1");
      this.myCanvas2 = new fabric.Canvas("canvas2");
      this.myCanvas3 = new fabric.Canvas("canvas3");
      this.myCanvas4 = new fabric.Canvas("canvas4");
      this.myCanvas = this.myCanvas1;
      this.onUnselected(this.myCanvas1);
      this.onUnselected(this.myCanvas2);
      this.onUnselected(this.myCanvas3);
      this.onUnselected(this.myCanvas4);
      this.monitorObjectScale(this.myCanvas1);
      this.monitorObjectScale(this.myCanvas2);
      this.monitorObjectScale(this.myCanvas3);
      this.monitorObjectScale(this.myCanvas4);
      this.monitorObjectMove(this.myCanvas1);
    })
    this.getSyscategoryList();
    console.log(this.$route.query.id)
    if(this.$route.query.id){
      editProShow(this.$route.query.id).then(res => {
        console.log(res);
        if(res.code == 0){
          this.resData = res.result;
          this.setBoxSize1(res);
          this.setBoxSize2(res);
          this.setBoxSize3(res);
          this.setBoxSize4(res);
          this.showList = this.dataList.canvas1;
          this.setformAndImg(res);
          // this.loadFromJSON(this.myCanvas1,res.result.positiveDesignArea);
          // this.loadFromJSON(this.myCanvas2,res.result.backDesignArea);
          // this.loadFromJSON(this.myCanvas3,res.result.leftDesignArea);
          // this.loadFromJSON(this.myCanvas4,res.result.rightDesignArea);
          this.addFlag1 = false;
          this.addFlag2 = false;
          this.addFlag3 = false;
          this.addFlag4 = false;
        }
        
      })
    }
  },
  components:{
    Editor
  },
  methods: {
    loadFromJSON (canvas,json) {
      canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (
          o,
          object
      ) {
          console.log(o,object)
      });
    },
    setformAndImg(res){
      this.bgimgs[0].url = res.result.positivePicUrl;
      this.bgimgs[1].url = res.result.backPicUrl;
      this.bgimgs[2].url = res.result.leftPicUrl;
      this.bgimgs[3].url = res.result.rightPicUrl;
      this.form.setFieldsValue({
        frontimg: res.result.positivePicUrl,
        backimg: res.result.backPicUrl,
        leftimg: res.result.leftPicUrl,
        rightimg: res.result.rightPicUrl,
      })
    },
    setBoxSize4(res){
      let arr1 = [{width: '',height: '',left: '',top: ''}];
      let boxSizes = JSON.parse(res.result.boxSizes);
      arr1[0].width = boxSizes.canvas4.width;
      arr1[0].height = boxSizes.canvas4.height;
      arr1[0].left = boxSizes.canvas4.left;
      arr1[0].top = boxSizes.canvas4.top;
      boxSizes.canvas4.list.forEach(item => {
        item.left = item.left + arr1[0].left;
        item.top = item.left + arr1[0].top
        arr1.push(item)
      });
      this.dataList.canvas4 = arr1;
    },
    setBoxSize3(res){
      let arr1 = [{width: '',height: '',left: '',top: ''}];
      let boxSizes = JSON.parse(res.result.boxSizes);
      arr1[0].width = boxSizes.canvas3.width;
      arr1[0].height = boxSizes.canvas3.height;
      arr1[0].left = boxSizes.canvas3.left;
      arr1[0].top = boxSizes.canvas3.top;
      boxSizes.canvas3.list.forEach(item => {
        item.left = item.left + arr1[0].left;
        item.top = item.left + arr1[0].top
        arr1.push(item)
      });
      this.dataList.canvas3 = arr1;
    },
    setBoxSize2(res){
      let arr1 = [{width: '',height: '',left: '',top: ''}];
      let boxSizes = JSON.parse(res.result.boxSizes);
      arr1[0].width = boxSizes.canvas2.width;
      arr1[0].height = boxSizes.canvas2.height;
      arr1[0].left = boxSizes.canvas2.left;
      arr1[0].top = boxSizes.canvas2.top;
      boxSizes.canvas2.list.forEach(item => {
        item.left = item.left + arr1[0].left;
        item.top = item.left + arr1[0].top
        arr1.push(item)
      });
      this.dataList.canvas2 = arr1;
    },
    setBoxSize1(res){
      let arr1 = [{width: '',height: '',left: '',top: ''}];
      let boxSizes = JSON.parse(res.result.boxSizes);
      arr1[0].width = boxSizes.canvas1.width;
      arr1[0].height = boxSizes.canvas1.height;
      arr1[0].left = boxSizes.canvas1.left;
      arr1[0].top = boxSizes.canvas1.top;
      boxSizes.canvas1.list.forEach(item => {
        item.left = item.left + arr1[0].left;
        item.top = item.left + arr1[0].top
        arr1.push(item)
      });
      this.dataList.canvas1 = arr1;
    },
    onChangeradio(e){
      console.log('radio checked', e.target.value);
    },
    getSyscategoryList(){
      syscategoryList().then(res => {
        console.log(res)
        if(res.code == 0){
          this.options = res.result
        }
      })
    },
    onChange(value) {
      console.log(value);
    },
    postDesignSize(){
      let dataList = this.dataList;
      let params = {
        canvas1:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas2:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas3:{width: '',height: '',top: '',left: '',name: '',list:[]},
        canvas4:{width: '',height: '',top: '',left: '',name: '',list:[]},
      }
      /* eslint-disable */ 
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
      console.log(params,this.dataList)
    },
    onUnselected(object){
      object.on('mouse:down',(obj) => {
        console.log(obj.target)
        if(!obj.target){
          if(this.designModel == 0){
            if(this.isFirst == 0){
              this.abledEdit_1 = true;
              this.abledCancel_1 = true;
              console.log(this)
            }else{
              this.abledEdit1_1 = true;
              this.abledCancel1_1 = true;
            }
          }else if(this.designModel == 1){
            if(this.isFirst == 0){
              this.abledEdit_2 = true;
              this.abledCancel_2 = true;
            }else{
              this.abledEdit1_2 = true;
              this.abledCancel1_2 = true;
            }
          }else if(this.designModel == 2){
            if(this.isFirst == 0){
              this.abledEdit_3 = true;
              this.abledCancel_3 = true;
            }else{
              this.abledEdit1_3 = true;
              this.abledCancel1_3 = true;
            }
          }else if(this.designModel == 3){
            if(this.isFirst == 0){
              this.abledEdit_4 = true;
              this.abledCancel_4 = true;
            }else{
              this.abledEdit1_4 = true;
              this.abledCancel1_4 = true;
            }
          }
        }
      })
    },
    cancleEdit(){
      let obj = this.myCanvas.getActiveObject();
      if(this.designModel == 0){
        this.form.setFieldsValue({
          width: this.dataList.canvas1[this.isFirst].width,
          height: this.dataList.canvas1[this.isFirst].height,
          left: this.dataList.canvas1[this.isFirst].left,
          top: this.dataList.canvas1[this.isFirst].top,
        })
        this.abledEdit_1 = true;
        this.abledCancel_1 = true;
      }else if(this.designModel == 1){
        this.form.setFieldsValue({
          width: this.dataList.canvas2[this.isFirst].width,
          height: this.dataList.canvas2[this.isFirst].height,
          left: this.dataList.canvas2[this.isFirst].left,
          top: this.dataList.canvas2[this.isFirst].top,
        })
        this.abledEdit_2 = true;
        this.abledCancel_2 = true;
      }else if(this.designModel == 2){
        this.form.setFieldsValue({
          width: this.dataList.canvas3[this.isFirst].width,
          height: this.dataList.canvas3[this.isFirst].height,
          left: this.dataList.canvas3[this.isFirst].left,
          top: this.dataList.canvas3[this.isFirst].top,
        })
        this.abledEdit_3 = true;
        this.abledCancel_3 = true;
      }else if(this.designModel == 3){
        this.form.setFieldsValue({
          width: this.dataList.canvas4[this.isFirst].width,
          height: this.dataList.canvas4[this.isFirst].height,
          left: this.dataList.canvas4[this.isFirst].left,
          top: this.dataList.canvas4[this.isFirst].top,
        })
        this.abledEdit_4 = true;
        this.abledCancel_4 = true;
      }
      let width = this.form.getFieldValue('width');
      let height = this.form.getFieldValue('height')
      let left = this.form.getFieldValue('left')
      let top = this.form.getFieldValue('top')
      obj.set({width: width,height: height,left: left,top: top});
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    },
    cancleDesignEdit(){
      let obj = this.myCanvas.getActiveObject();
      if(this.designModel == 0){
        this.form.setFieldsValue({
          width1: this.dataList.canvas1[this.isFirst].width,
          height1: this.dataList.canvas1[this.isFirst].height,
          left1: this.dataList.canvas1[this.isFirst].left,
          top1: this.dataList.canvas1[this.isFirst].top,
          name: this.dataList.canvas4[this.isFirst].name,
        })
        this.abledEdit1_1 = true;
        this.abledCancel1_1 = true;
      }else if(this.designModel == 1){
        this.form.setFieldsValue({
          width1: this.dataList.canvas2[this.isFirst].width,
          height1: this.dataList.canvas2[this.isFirst].height,
          left1: this.dataList.canvas2[this.isFirst].left,
          top1: this.dataList.canvas2[this.isFirst].top,
          name: this.dataList.canvas4[this.isFirst].name,
        })
        this.abledEdit1_2 = true;
        this.abledCancel1_2 = true;
      }else if(this.designModel == 2){
        this.form.setFieldsValue({
          width1: this.dataList.canvas3[this.isFirst].width,
          height1: this.dataList.canvas3[this.isFirst].height,
          left1: this.dataList.canvas3[this.isFirst].left,
          top1: this.dataList.canvas3[this.isFirst].top,
          name: this.dataList.canvas4[this.isFirst].name,
        })
        this.abledEdit1_3 = true;
        this.abledCancel1_3 = true;
      }else if(this.designModel == 3){
        this.form.setFieldsValue({
          width1: this.dataList.canvas4[this.isFirst].width,
          height1: this.dataList.canvas4[this.isFirst].height,
          left1: this.dataList.canvas4[this.isFirst].left,
          top1: this.dataList.canvas4[this.isFirst].top,
          name: this.dataList.canvas4[this.isFirst].name,
        })
        this.abledEdit1_4 = true;
        this.abledCancel1_4 = true;
      }
      let width = this.form.getFieldValue('width1');
      let height = this.form.getFieldValue('height1')
      let left = this.form.getFieldValue('left1')
      let top = this.form.getFieldValue('top1')
      obj.set({width: width,height: height,left: left,top: top});
      this.myCanvas.renderAll();
      this.myCanvas.discardActiveObject();
    },
    confirmEdit(){
      this.editWidth = this.form.getFieldValue("width");
      this.editHeight = this.form.getFieldValue("height");
      this.editLeft = this.form.getFieldValue("left");
      this.editTop = this.form.getFieldValue("top");
      if(this.designModel == 0){
        this.dataList.canvas1[this.isFirst].width = this.editWidth;
        this.dataList.canvas1[this.isFirst].height = this.editHeight;
        this.dataList.canvas1[this.isFirst].left = this.editLeft;
        this.dataList.canvas1[this.isFirst].top = this.editTop;
        this.showList = this.dataList.canvas1;
        this.abledEdit_1 = true;
        this.abledCancel_1 = true;
      }else if(this.designModel == 1){
        this.dataList.canvas2[this.isFirst].width = this.editWidth;
        this.dataList.canvas2[this.isFirst].height = this.editHeight;
        this.dataList.canvas2[this.isFirst].left = this.editLeft;
        this.dataList.canvas2[this.isFirst].top = this.editTop;
        this.showList = this.dataList.canvas2;
        this.abledEdit_2 = true;
        this.abledCancel_2 = true;
      }else if(this.designModel == 2){
        this.dataList.canvas3[this.isFirst].width = this.editWidth;
        this.dataList.canvas3[this.isFirst].height = this.editHeight;
        this.dataList.canvas3[this.isFirst].left = this.editLeft;
        this.dataList.canvas3[this.isFirst].top = this.editTop;
        this.showList = this.dataList.canvas3;
        this.abledEdit_3 = true;
        this.abledCancel_3 = true;
      }else if(this.designModel == 3){
        this.dataList.canvas4[this.isFirst].width = this.editWidth;
        this.dataList.canvas4[this.isFirst].height = this.editHeight;
        this.dataList.canvas4[this.isFirst].left = this.editLeft;
        this.dataList.canvas4[this.isFirst].top = this.editTop;
        this.showList = this.dataList.canvas4;
        this.abledEdit_4 = true;
        this.abledCancel_4 = true;
      }
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    },
    confirmDesignEdit(){
      let calcWidth1;
      let calcHeight1;
      let calcHeight2;
      let calcWidth2;
      this.editWidth = this.form.getFieldValue("width1");
      this.editHeight = this.form.getFieldValue("height1");
      this.editLeft = this.form.getFieldValue("left1");
      this.editTop = this.form.getFieldValue("top1");
      this.editName = this.form.getFieldValue("name");
      calcWidth1 = this.editWidth + this.editLeft;
      calcHeight1 = this.editHeight + this.editTop;
      if(this.designModel == 0){
        calcHeight2 = this.dataList.canvas1[0].height + this.dataList.canvas1[0].top;
        calcWidth2 = this.dataList.canvas1[0].width + this.dataList.canvas1[0].left;
        if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || this.editLeft < this.dataList.canvas1[0].left || this.editTop < this.dataList.canvas1[0].top){
          this.$message.error('您输入的值已超出限制区域，请重新输入')
          return
        }
        this.dataList.canvas1[this.isFirst].width = this.editWidth;
        this.dataList.canvas1[this.isFirst].height = this.editHeight;
        this.dataList.canvas1[this.isFirst].left = this.editLeft;
        this.dataList.canvas1[this.isFirst].top = this.editTop;
        this.dataList.canvas1[this.isFirst].name = this.editName;
        this.showList = this.dataList.canvas1;
        this.abledEdit1_1 = true;
        this.abledCancel1_1 = true;
      }else if(this.designModel == 1){
        calcHeight2 = this.dataList.canvas2[0].height + this.dataList.canvas2[0].top;
        calcWidth2 = this.dataList.canvas2[0].width + this.dataList.canvas2[0].left;
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
        this.abledEdit1_2 = true;
        this.abledCancel1_2 = true;
      }else if(this.designModel == 2){
          calcHeight2 = this.dataList.canvas3[0].height + this.dataList.canvas3[0].top;
          calcWidth2 = this.dataList.canvas3[0].width + this.dataList.canvas3[0].left;
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
          this.abledEdit1_3 = true;
          this.abledCancel1_3 = true;
      }else if(this.designModel == 3){
        calcHeight2 = this.dataList.canvas4[0].height + this.dataList.canvas4[0].top;
        calcWidth2 = this.dataList.canvas4[0].width + this.dataList.canvas4[0].left;
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
        this.abledEdit1_4 = true;
        this.abledCancel1_4 = true;
      }
      this.myCanvas.discardActiveObject();
      this.myCanvas.renderAll();
    },
    editCanvasObj(index){
      console.log(index);
      let items = this.myCanvas.getObjects();
      this.isFirst = index;
      this.myCanvas.setActiveObject(items[index]);
      this.myCanvas.renderAll();
      
      if(this.designModel == 0){
        if(index == 0){
          this.form.setFieldsValue({
            width: this.dataList.canvas1[index].width,
            height:this.dataList.canvas1[index].height,
            left:this.dataList.canvas1[index].left,
            top: this.dataList.canvas1[index].top
          });
          this.abledEdit_1 = false;
          this.abledCancel_1 = false;
          this.activeKey = '1';
        }else{
          this.form.setFieldsValue({
            name: this.dataList.canvas1[index].name,
            width1: this.dataList.canvas1[index].width,
            height1:this.dataList.canvas1[index].height,
            left1:this.dataList.canvas1[index].left,
            top1: this.dataList.canvas1[index].top
          });
          this.abledEdit1_1 = false;
          this.abledCancel1_1 = false;
          this.activeKey = '2';
        }
      }else if(this.designModel == 1){
        if(index == 0){
          this.form.setFieldsValue({
            width: this.dataList.canvas2[index].width,
            height:this.dataList.canvas2[index].height,
            left:this.dataList.canvas2[index].left,
            top: this.dataList.canvas2[index].top
          });
          this.abledEdit_2 = false;
          this.abledCancel_2 = false;
          this.activeKey = '1';
        }else{
          this.form.setFieldsValue({
            name: this.dataList.canvas2[index].name,
            width1: this.dataList.canvas2[index].width,
            height1:this.dataList.canvas2[index].height,
            left1:this.dataList.canvas2[index].left,
            top1: this.dataList.canvas2[index].top
          });
          this.abledEdit1_2 = false;
          this.abledCancel1_2 = false;
          this.activeKey = '2';
        }
      }else if(this.designModel == 2){
        if(index == 0){
          this.form.setFieldsValue({
            width: this.dataList.canvas3[index].width,
            height:this.dataList.canvas3[index].height,
            left:this.dataList.canvas3[index].left,
            top: this.dataList.canvas3[index].top
          });
          this.abledEdit_3 = false;
          this.abledCancel_3 = false;
          this.activeKey = '1';
        }else{
          this.form.setFieldsValue({
            name: this.dataList.canvas2[index].name,
            width1: this.dataList.canvas3[index].width,
            height1:this.dataList.canvas3[index].height,
            left1:this.dataList.canvas3[index].left,
            top1: this.dataList.canvas3[index].top
          });
          this.abledEdit1_3 = false;
          this.abledCancel1_3 = false;
          this.activeKey = '2';
        }
      }else if(this.designModel == 3){
        if(index == 0){
          this.form.setFieldsValue({
            width: this.dataList.canvas4[index].width,
            height:this.dataList.canvas4[index].height,
            left:this.dataList.canvas4[index].left,
            top: this.dataList.canvas4[index].top
          });
          this.abledEdit_4 = false;
          this.abledCancel_4 = false;
          this.activeKey = '1';
        }else{
          this.form.setFieldsValue({
            name: this.dataList.canvas4[index].name,
            width1: this.dataList.canvas4[index].width,
            height1:this.dataList.canvas4[index].height,
            left1:this.dataList.canvas4[index].left,
            top1: this.dataList.canvas4[index].top
          });
          this.abledEdit1_4 = false;
          this.abledCancel1_4 = false;
          this.activeKey = '2';
        }
      }
    },
    deleteCanvasObj(index){
      console.log(index);
      let items = this.myCanvas.getObjects();
      this.myCanvas.remove(items[index]);
      if(this.designModel == 0){
        this.dataList.canvas1.splice(index,1);
        this.showList = this.dataList.canvas1;
        if(this.isFirst == 0){
          this.abledEdit_1 = true;
          this.abledCancel_1 = true;
        }else{
          this.abledEdit1_1 = true;
          this.abledCancel1_1 = true;
        }
      }else if(this.designModel == 1){
        this.dataList.canvas2.splice(index,1);
        this.showList = this.dataList.canvas2;
        if(this.isFirst == 0){
          this.abledEdit_2 = true;
          this.abledCancel_2 = true;
        }else{
          this.abledEdit1_2 = true;
          this.abledCancel1_2 = true;
        }
      }else if(this.designModel == 2){
        this.dataList.canvas3.splice(index,1);
        this.showList = this.dataList.canvas3;
        if(this.isFirst == 0){
          this.abledEdit_3 = true;
          this.abledCancel_3 = true;
        }else{
          this.abledEdit1_3 = true;
          this.abledCancel1_3 = true;
        }
      }else if(this.designModel == 3){
        this.dataList.canvas4.splice(index,1);
        this.showList = this.dataList.canvas4;
        if(this.isFirst == 0){
          this.abledEdit_4 = true;
          this.abledCancel_4 = true;
        }else{
          this.abledEdit1_4 = true;
          this.abledCancel1_4 = true;
        }
      }
    },
    
    addFirstQ(key){
      this.form.validateFields(['width','height','left','top'],(err, values) => {
        if(!err){
          let json = {name: '',width: '',height: '',left: '',top: ''};
          json.name = '限定区域';
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
      this.form.validateFields(['width1','height1','left1','top1','name'],(err, values) => {
        if(!err){
          let calcWidth1 = values.width1 + values.left1;
          let calcHeight1 = values.height1 + values.top1;
          let json = {name: '',width: '',height: '',left: '',top: ''};
          console.log(values)
          json.name = values.name;
          json.width = values.width1;
          json.height = values.height1;
          json.left = values.left1;
          json.top = values.top1;
          if(this.designModel == 0){
            let calcHeight2 = this.dataList.canvas1[0].height + this.dataList.canvas1[0].top;
            let calcWidth2 = this.dataList.canvas1[0].width + this.dataList.canvas1[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left1 < this.dataList.canvas1[0].left || values.top1 < this.dataList.canvas1[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas1.push(json);
          }else if(this.designModel == 1){
            let calcHeight2 = this.dataList.canvas2[0].height + this.dataList.canvas2[0].top;
            let calcWidth2 = this.dataList.canvas2[0].width + this.dataList.canvas2[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left1 < this.dataList.canvas2[0].left || values.top1 < this.dataList.canvas2[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas2.push(json);
          }else if(this.designModel == 2){
            let calcHeight2 = this.dataList.canvas3[0].height + this.dataList.canvas3[0].top;
            let calcWidth2 = this.dataList.canvas3[0].width + this.dataList.canvas3[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left1 < this.dataList.canvas3[0].left || values.top1 < this.dataList.canvas3[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas3.push(json);
          }else if(this.designModel == 3){
            let calcHeight2 = this.dataList.canvas4[0].height + this.dataList.canvas4[0].top;
            let calcWidth2 = this.dataList.canvas4[0].width + this.dataList.canvas4[0].left;
            if(calcWidth1 > calcWidth2 || calcHeight1 > calcHeight2 || values.left1 < this.dataList.canvas4[0].left || values.top1 < this.dataList.canvas4[0].top){
              this.$message.error('您输入的值已超出限制区域，请重新输入！')
              return
            }
            this.dataList.canvas4.push(json);
          }
          let rect = new fabric.Rect({
              left: values.left1,
              top: values.top1,
              width: values.width1,
              height: values.height1,
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
    monitorObjectMove(object){
      object.on('object:scaling', (e) => {
        var o = e.target;
        if (!o.strokeWidthUnscaled && o.strokeWidth) {
          o.strokeWidthUnscaled = o.strokeWidth;
        }
        if (o.strokeWidthUnscaled) {
          if(o.objectCaching) o.objectCaching = false;
          o.strokeWidth = o.strokeWidthUnscaled / ((o.scaleX + o.scaleY) / 2);
        }
      });
    },
    monitorObjectScale(object){
      let that = this;
      object.on('object:modified',function(e){
        let obj = e.target;
        if(!obj.objectCaching) obj.objectCaching = true;
        object.renderAll();
        if(that.isFirst == 0){
          that.form.setFieldsValue({
            width:parseInt(obj.getBoundingRect().width) - 1,
            height:parseInt(obj.getBoundingRect().height) - 1,
            left:parseInt(obj.left),
            top:parseInt(obj.top)
          });
        }else{
          that.form.setFieldsValue({
            width1:parseInt(obj.getBoundingRect().width) - 1,
            height1:parseInt(obj.getBoundingRect().height) - 1,
            left1:parseInt(obj.left),
            top1:parseInt(obj.top)
          });
        }
      })
    },
    // handleObjectMove(index,top,bottom,left,right){
    //     let items = this.myCanvas.getObjects();
    //     let that = this;
    //     let top_margin;
    //     let bottom_margin;
    //     let left_margin;
    //     let right_margin;
    //     items[index].on('moving', function(e){
    //      let obj = e.target;
    //      top_margin = top;
    //      bottom_margin = bottom;
    //     left_margin = left;
    //     right_margin = right;
    //       if(index !== 0){
    //         that.myCanvas.requestRenderAll();
    //         if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
    //           return;
    //         }    
    //         console.log(top_margin,bottom_margin,left_margin,right_margin)    
    //         obj.setCoords();        
    //         if(obj.getBoundingRect(true).top < top_margin || obj.getBoundingRect(true).left < left_margin){
    //           obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect(true).top + top_margin);
    //           obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect(true).left + left_margin);
    //         }
    //         if(obj.getBoundingRect(true).top+obj.getBoundingRect(true).height  > 600 - bottom_margin || obj.getBoundingRect(true).left+obj.getBoundingRect(true).width  > 600 - right_margin){
    //           obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect(true).height+obj.top-obj.getBoundingRect(true).top - bottom_margin);
    //           obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect(true).width+obj.left-obj.getBoundingRect(true).left - right_margin);
    //         } 
    //       }
    //     });
    // },
    changeModelDesign(i){
      this.designModel = i;
      this.activeKey = '1';
      this.form.setFieldsValue({
        width: '',
        height: '',
        left: '',
        top: '',
        width1: '',
        height1: '',
        left1: '',
        top1: '',
        name: ''
      });
      if(i == 0){
          this.myCanvas = this.myCanvas1;
          this.bindCanvas(this.myCanvas,i);
          this.showList = this.dataList.canvas1;
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
    handleSubmit() {
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);
      //   }
      // });
    },
    callback(key) {
      console.log(key);
      if(this.$route.query.id){
        if(key == 2){
          setTimeout(() => {
            this.form.setFieldsValue({
              name: this.resData.name,
              number: this.resData.code,
              protype: this.resData.category,
              minprice: this.resData.minPrice,
              maxprice: this.resData.maxPrice,
              productionTime: this.resData.productionTime,
              minProductionTime: this.resData.minProductionTime,
              weight: this.resData.weight,
              minOrder:this.resData.minOrder
            })
          }, 0);
        }else if(key == 3){
          this.imageUrl = this.resData.sizePicUrl;
          this.form.setFieldsValue({
            img: this.resData.sizePicUrl
          })
        }else if(key == 4){
          this.value1 = this.resData.isOnSale;
          this.value2 = this.resData.isHot;
          this.value3 = this.resData.colorType;
          this.keywords = this.resData.keywords;
          this.desc = this.resData.goodsBrief;
        }
      }
      
      
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
    }
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
  .ant-collapse .ant-collapse-item .ant-collapse-header .anticon {
    left: initial;
    right: 16px;
  }
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
        padding-bottom: 20px;
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
    input{
      width: 40%;
    }
    textarea{
      width: 40%;
    }
    .radio-box{
      li{
        display: flex;
        margin: 10px 0;
        > span{
          min-width: 80px;
        }
      }
    }
  }
  .common-info{
    .cascader{
      .ant-cascader-picker{
        width: 40%;
        input{
          width: 100%;
        }
      }
    }
    input{
      width: 40%;
    }
    textarea{
      width: 40%;
    }
    .suffix{
      input{
        width: 100%;
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
      min-width: 640px;
      position: relative;
      padding-top: 50px;
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