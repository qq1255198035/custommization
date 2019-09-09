<template>
      <div id="main">
            <my-title :title="'新建订单'">
                  <a-button size="small">返回</a-button>
            </my-title>
            <a-row id="myrow">
                  <a-col :span="6">
                        <div class="section1">
                              <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" @click="handleClick">
                                    <a-sub-menu key="sub1" class="my-submenu">
                                          <span slot="title"><a-icon type="edit" /><span>文字</span></span>
                                          <a-menu-item @click="addItext">
                                                添加文字
                                          </a-menu-item>
                                    </a-sub-menu>
                                    <a-sub-menu key="sub2" class="my-submenu">
                                          <span slot="title"><a-icon type="area-chart" /><span>图片</span></span>
                                          <a-sub-menu key="sub3" title="剪贴画" class="img-cell">
                                                <a-menu-item :key="img" v-for="(img,index) in imgs" @click="addImg(img,index)">
                                                      <img :src="img" alt="">
                                                </a-menu-item>
                                                
                                          </a-sub-menu>
                                          <a-menu-item style="display: flex; align-items:center;justify-content: center">
                                                <a-upload name="file" class="my-upload" :beforeUpload="beforeUpload">
                                                      <a-button>
                                                            <a-icon type="upload"/> 上传图片
                                                      </a-button>
                                                </a-upload>
                                          </a-menu-item>
                                    </a-sub-menu>
                                    <a-sub-menu key="sub4" class="my-submenu">
                                          <span slot="title"><a-icon type="pie-chart" /><span>图形</span></span>
                                          <a-menu-item key="9" @click="createEqualTriangle">三角形</a-menu-item>
                                          <a-menu-item key="10" @click="createRect">矩形</a-menu-item>
                                          <a-menu-item key="11" @click="createCircle">圆形</a-menu-item>
                                          
                                    </a-sub-menu>
                              </a-menu>
                        </div>
                  </a-col>
                  <a-col :span="12">
                        <div class="section2">
                              <div class="controlers">
                                    <span title="放大" @click="zoomIn"><a-icon type="zoom-in" /></span>
                                    <span title="缩小" @click="zoomOut"><a-icon type="zoom-out" /></span>
                                    <span title="右旋转" @click="setTextRotateR"><a-icon type="redo" /></span>
                                    <span title="左旋转" @click="setTextRotateL"><a-icon type="undo" /></span>
                                    <span title="移动到下一层" @click="toNextLayer"><a-icon type="sort-ascending" /></span>
                                    <span title="移动倒上一层" @click="toPreLayer"><a-icon type="sort-descending" /></span>
                              </div>
                              <div class="canvas-container"  v-show="model == 'front'">
                                    <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                                    
                              </div>
                              <div class="canvas-container"  v-show="model == 'back'">
                                    <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                              </div>
                        </div>
                        
                  </a-col>
                  <a-col :span="6" id="box">
                        <a-drawer placement="right" title="工具箱" :visible="visible" :mask="false" @close="onClose" :width="540" :getContainer="ele">
                              <div class="tools">
                                    <div v-if="visibletype == 1" class="text-tools">
                                          <dl style="display: flex">
                                                <dt>选择字体：</dt>
                                                <dd>
                                                      <a-select placeholder="选择字体" @change="changeFontFamily" :value="fontfamily" style="width: 240px;">
                                                            <a-select-option value="test-font">test-font</a-select-option>
                                                            <a-select-option value="Microsoft YaHei">Microsoft YaHei</a-select-option>
                                                            <a-select-option value="Corbel">Corbel</a-select-option>
                                                            <a-select-option value="Impact">Impact</a-select-option>
                                                            <a-select-option value="Ink Free">Ink Free</a-select-option>
                                                            <a-select-option value="Raleway">Raleway</a-select-option>
                                                            <a-select-option value="Helvetica">Helvetica</a-select-option>
                                                            <a-select-option value="Arial">Arial</a-select-option>
                                                            <a-select-option value="sans-serif">sans-serif</a-select-option>
                                                      </a-select>
                                                </dd>
                                          </dl>
                                          
                                          <ul class="textcolor-control">
                                                <li>
                                                      
                                                            字体颜色:
                                                            
                                                                  <span title="字体颜色" style="position: relative">
                                                                        <a-icon type="font-colors" :style="{color:color}"/>
                                                                        <colorPicker v-model="color" @change="changeFillColor"/>
                                                                  </span>
                                                
                                                      
                                                </li>
                                                <li>
                                                      
                                                            字体背景颜色:
                                                      
                                                                  <span title="背景颜色" style="position: relative">
                                                                        <a-icon type="bg-colors" :style="{color:bgcolor}"/>
                                                                        <colorPicker v-model="bgcolor" @change="changeTextBgColor"/>
                                                                  </span>
                                                      
                                                      
                                                      
                                                </li>
                                                
                                          </ul>
                                          <dl class="textalign-control">
                                                <dt>
                                                      对齐方式：
                                                </dt>
                                                <dd>
                                                      <span title="左对齐" @click="setTextalignLeft"><a-icon type="align-left" /></span>
                                                      
                                                </dd>
                                                <dd>
                                                      <span title="居中" @click="setTextalignCenter"><a-icon type="align-center" /></span>
                                                      
                                                </dd>
                                                <dd>
                                                      <span title="右对齐" @click="setTextalignRight"><a-icon type="align-right" /></span>
                                                </dd>
                                          </dl>
                                          <dl class="fonTstyle-control">
                                                <dt>
                                                      字体样式：
                                                </dt>
                                                <dd>
                                                      <span title="加粗" @click="setFontWeight"><a-icon type="bold" /></span>
                                                      
                                                </dd>
                                                <dd>
                                                      <span title="倾斜" @click="setFontStyle"><a-icon type="italic" /></span>
                                                      
                                                </dd>
                                                <dd>
                                                      <span title="下划线" @click="setTextDown"><a-icon type="underline" /></span>
                                                      
                                                </dd>
                                                <dd>
                                                      <span title="删除线" @click="setTextThrough"><a-icon type="strikethrough" /></span>
                                                </dd>
                                          </dl>
                                          <ul class="stroke-control">
                                                <li>
                                                      描边颜色：
                                                      <colorPicker v-model="stroke" @change="changestrokeColor"/>
                                                </li>
                                                <li>
                                                      描边大小：
                                                      <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth"/>
                                                </li>
                                                
                                          </ul>
                                          <ul class="stroke-control">
                                                <li>
                                                      阴影颜色：
                                                      <colorPicker v-model="shdowcolor" @change="changeShadowColor"/>
                                                </li>
                                                <li>
                                                      阴影大小：
                                                      <a-slider :min="-10" :max="10" v-model="Shadow1" :step="1" @change="changeShadowWidth1"/>
                                                      <a-slider :min="-10" :max="10" v-model="Shadow2" :step="1" @change="changeShadowWidth2"/>
                                                      <a-slider :min="0" :max="10" v-model="Shadow3" :step="1" @change="changeShadowWidth3"/>
                                                </li>
                                                
                                          </ul>
                                    </div>
                                    <div v-else-if="visibletype == 2" class="imgs-tools">
                                          <dl>
                                                <dt>
                                                      透明度：
                                                </dt>
                                                <dd>
                                                      <a-slider :min="0" :max="1" v-model="opacity" :step="0.1" @change="changeOpacity"/>
                                                </dd>
                                          </dl>
                                          <ul style="display: flex;justify-content: space-around;margin:20px 0">
                                                <li>
                                                      X轴翻转：
                                                      <a-switch @change='changeFilPx' v-model="filpx"/>
                                                </li>
                                                <li>
                                                      Y轴翻转：
                                                      <a-switch @change='changeFilPy' v-model="filpy"/>
                                                </li>
                                          </ul>         
                                          <ul>
                                                <li>
                                                      X轴斜切：
                                                      <a-slider :min="0" :max="80" :step="1" @change='changeSkewX' v-model="skewx"/>
                                                </li>
                                                <li>
                                                      Y轴斜切：
                                                      <a-slider :min="0" :max="80" :step="1" @change='changeSkewY' v-model="skewy"/>
                                                </li>
                                          </ul>
                                          <dl class="filters-part1">
                                                <dt>滤镜：</dt>
                                                <dd><a-checkbox @change="selectGrayscale">灰阶</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectInvert">倒置</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectSepia">深棕色</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectblackwhite">黑白</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectBrownie">棕色</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectVintage">复古</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectKodachrome">Kodachrome</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectTechnicolor">Technicolor</a-checkbox></dd>
                                                <dd><a-checkbox @change="selectPolaroid">Polaroid</a-checkbox></dd>
                                          </dl>
                                          <ul>
                                                <li>
                                                      删除颜色:<br>
                                                      color: <colorPicker v-model="removecolor" @change="changeRemoveColor"/><br>
                                                      distance: <a-slider :min="0" :max="1" :step="0.01" @change='changeDistance' v-model="distance"/>
                                                </li>
                                                <li>
                                                      明度：
                                                      <a-slider :min="-1" :max="1" :step="0.01" @change='changeBrightness' v-model="brightness"/>
                                                </li>
                                                <li>
                                                      Gamma：
                                                      <a-slider :min="0" :max="2" :step="0.01" @change='changeGammaRed' v-model="red"/>
                                                      <a-slider :min="0" :max="2" :step="0.01" @change='changeGammaGreen' v-model="green"/>
                                                      <a-slider :min="0" :max="2" :step="0.01" @change='changeGammaBlue' v-model="blue"/>
                                                </li>
                                                <li>
                                                      对比度：
                                                      <a-slider :min="-1" :max="1" :step="0.01" @change='changeContrast' v-model="contrast"/>
                                                </li>
                                                <li>
                                                      饱和度：
                                                      <a-slider :min="-1" :max="1" :step="0.01" @change='changeSaturation' v-model="saturation"/>
                                                </li>
                                                <li>
                                                      色调：
                                                      <a-slider :min="-2" :max="2" :step="0.01" @change='changeHue' v-model="hue"/>
                                                </li>
                                                <li>
                                                      噪声：
                                                      <a-slider :min="0" :max="1000" :step="50" @change='changeNoise' v-model="noise"/>
                                                </li>
                                                <li>
                                                      像素化：
                                                      <a-slider :min="1" :max="20" :step="1" @change='changePixelate' v-model="pixelate"/>
                                                </li>
                                                <li>
                                                      模糊：
                                                      <a-slider :min="0" :max="1" :step="0.01" @change='changeBlur' v-model="blur"/>
                                                </li>
                                                <li><a-checkbox @change="selectSharpen">锐化</a-checkbox></li>
                                                <li><a-checkbox @change="selectEmboss">浮雕</a-checkbox></li>
                                          </ul>
                                    </div>
                                    <div v-else-if="visibletype == 3" class="rect-tools">
                                          <ul class="color-control">
                                                <li>
                                                      描边颜色：
                                                      <colorPicker v-model="stroke" @change="changestrokeColor"/>
                                                </li>
                                                <li>
                                                      填充颜色：
                                                      <colorPicker v-model="color" @change="changeFillColor"/>
                                                </li>
                                          </ul>
                                          <p>
                                                描边大小：
                                                <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth"/>
                                          </p>
                                          <ul class="stroke-control">
                                                <li>
                                                      阴影颜色：
                                                      <colorPicker v-model="shdowcolor" @change="changeShadowColor"/>
                                                </li>
                                                <li>
                                                      阴影大小：
                                                      <a-slider :min="-10" :max="10" v-model="Shadow1" :step="1" @change="changeShadowWidth1"/>
                                                      <a-slider :min="-10" :max="10" v-model="Shadow2" :step="1" @change="changeShadowWidth2"/>
                                                      <a-slider :min="0" :max="10" v-model="Shadow3" :step="1" @change="changeShadowWidth3"/>
                                                </li>
                                                
                                          </ul>
                                                
                                          <ul>
                                                <li>
                                                      X轴斜切：
                                                      <a-slider :min="0" :max="80" :step="1" @change='changeSkewX' v-model="skewx"/>
                                                </li>
                                                <li>
                                                      Y轴斜切：
                                                      <a-slider :min="0" :max="80" :step="1" @change='changeSkewY' v-model="skewy"/>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </a-drawer>
                  </a-col>
                  <!-- <a-col :span="6">
                        <div class="section3">
                              <h3>选择颜色</h3>
                              <dl class="color-select">
                                    
                                    <dd v-for="(color,index) in colors" :key="color" :class="{active: selected == index}" @click="selectColor(index,color)">
                                          <i :style="{backgroundColor: color}"></i>
                                    </dd>
                              </dl>
                              <h3>选择领型</h3>
                              <ul style="display: flex;">
                                    <li v-for="(img,index) in lximgs" :key="img" style="cursor:pointer" @click="selectLx(index)">
                                          <img :src="img" alt="" width="200" height="50">
                                    </li>
                              </ul>
                              <h3>选择尺寸</h3>
                              <dl class="size-select">
                                    <dd v-for="(size,index) in sizes" :key="size">
                                          <a-checkable-tag
                                                :key="index"
                                                :checked="selectedTags.indexOf(size) > -1"
                                                class="my-tag"
                                          >
                                          {{size}} 
                                          </a-checkable-tag>
                                    </dd>
                              </dl>
                              <div class="btn-box">
                                    <a-button @click="$router.push({path:'/swiper'})">保存</a-button>
                                    <a-button @click="saveImg">保存</a-button>
                                    <a-button @click="handleSetFront">正面</a-button>
                                    <a-button @click="handleSetback">背面</a-button>
                                    <a-button><a class="downLoad" download="downImg" @click="downLoadImg" :href="dataUrl">下载</a></a-button>
                              </div>
                        </div>
                        
                  </a-col> -->
            </a-row>
            
      </div>
</template>
<script>
import { fabric } from 'fabric'
import 'fabric-customise-controls'
import FontFaceObserver from 'fontfaceobserver'
import initAligningGuidelines from "@/utils/guidelines"
import img1 from '@/assets/0001.png'
import img2 from '@/assets/0002.png'
import img3 from '@/assets/0003.png'
import img7 from '@/assets/0007.png'
import img8 from '@/assets/0008.png'
import img10 from '@/assets/0010.png'

import bgimg2 from '@/assets/black.jpg'
import bgimg3 from '@/assets/jaw.jpg'
import resize from '@/assets/icons/resize.svg'
import remove from '@/assets/icons/remove.svg'
import rotate from '@/assets/icons/rotate.svg'
import diagonal from "@/assets/icons/repair-tools-cross.svg";
import lximg from '@/assets/lximg.png'
import lximg2 from '@/assets/lximg2.png'
import MyTitle from "@/components/MyTitle/MyTitle";
function getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
}
export default {
      data () {
            var bgimg1;
            return {
                  ele:document.querySelector('#box'),
                  rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
                  openKeys: ['sub1'],
                  imgs:[
                        img1,
                        img2,
                        img3,
                        img7,
                        img8,
                        img10
                  ],
                  colors:['#ccc','red','#456865'],
                  sizes: ['S', 'M', 'L', 'XL'],
                  resize,
                  remove,
                  rotate,
                  selected:0,
                  checked1: false,
                  checked2: false,
                  checked3: false,
                  selectedTags: [],
                  text:'示例',
                  left: 280,
                  top: 200,
                  color:'#000000',
                  bgcolor:'#000000',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  underline:false,
                  fontSize:25,
                  isDrawingMode:false,
                  dataUrl:'',
                  dataPost:'',
                  lximgs:[
                        lximg,
                        lximg2,
                  ],
                  suits:{
                        frontimg:{
                              bgimgs:[
                                    bgimg1,
                                    bgimg1,
                                    bgimg1
                              ]
                              
                        },
                        backimg:{
                              bgimgs:[
                                    bgimg1,
                                    bgimg2,
                                    bgimg3
                              ]
                              
                        },
                  },
                  strokecolor:'#000000',
                  fillcolor:'#000000',
                  drawWidth:2,
                  myCanvas: null,
                  visible:false,
                  visibletype:0,
                  opacity:1,
                  filpx:false,
                  filpy:false,
                  skewx:0,
                  skewy:0,
                  strokeWidth:0,
                  stroke: '#000000',
                  shdowcolor:'#000000',
                  Shadow1:0,
                  Shadow2:0,
                  Shadow3:0,
                  uploadId:0,
                  grayscale:false,
                  removecolor: '#000',
                  distance:0,
                  brightness:0,
                  red:1,
                  green:1,
                  blue:1,
                  contrast:0,
                  saturation:0,
                  hue:0,
                  noise:0,
                  pixelate:1,
                  blur:0,
                  fontfamily:'Microsoft YaHei',
                  model: 'front',
                  myCanvas1: null,
                  myCanvas2: null,
                  screenWidth: 600
                  
            }
      },
      components:{
            MyTitle
      },
      created(){
            this.watchScreenWidth();
      },
      mounted(){
            console.log(this.$refs.myrow)
            this.$nextTick(function() {
                  //11：当选择画布中的对象时，该对象不出现在顶层。
                  //canvas.preserveObjectStacking = true;
                  this.myCanvas1 = new fabric.Canvas("canvas1");
                  this.myCanvas2 = new fabric.Canvas("canvas2");
                  this.myCanvas = this.myCanvas1
                  this.bindCanvas1(this.selected);
                  this.bindCanvas2(this.selected);
                  this.setEditIcon();
                  this.setEditPointer();
                  initAligningGuidelines(this.myCanvas1);
                  initAligningGuidelines(this.myCanvas2);
                  this.handleObjectMove(this.myCanvas1);
                  this.handleObjectMove(this.myCanvas2);
                  //this.selectLx(0)
                  //14: 画布对象居中设置：
                  //var t = canvas.getActiveObject();
                  //t.center();    全部居中
                  //t.centerH();   水平居中
                  //t.centerV();   垂直居中
                  //t.setCoords(); 注：必须设coords以上设置才会有效。
                  //object.set('selectable',false) 单个元素禁止选中
            })
            console.log(22);
      },
      watch:{
           
      },
      methods: {
            selectLx(i){
                  var that = this
                  that.model = 'front'
                  that.myCanvas1.setOverlayImage(that.lximgs[i],that.myCanvas1.renderAll.bind(that.myCanvas1),{
                              opacity: 1,
                              angle: 0,
                              left: that.screenWidth / 2,
                              top: 60,
                              originX: "center",
                              originY: "center",
                              scaleX: that.screenWidth / 600,
                              scaleY: 1
                  });
            },
            watchScreenWidth(){
                  if (screen.width >= 1024 && screen.width <= 1366) {
                        this.screenWidth = 400; 
                  }else if (screen.width >= 320 && screen.width < 1024) {
                        this.screenWidth = 240;
                  }
            },
            //设置绘图区域
            handleObjectMove(object){
                  object.on("object:moving", function(e) {
                        //console.log(e.target)
                        var obj = e.target;
                        var canvas = obj.canvas;
                        var top = obj.top;
                        var left = obj.left;
                        var zoom = canvas.getZoom();
                        var pan_x = canvas.viewportTransform[4];
                        var pan_y = canvas.viewportTransform[5];
                        // width & height we are constraining to must be calculated by applying the inverse of the current viewportTransform
                        var c_width = canvas.width / zoom;
                        var c_height = canvas.height / zoom;
                        var w = obj.width * obj.scaleX
                        var left_adjust, right_adjust
                        if(obj.originX == "center") {
                        left_adjust = right_adjust = w / 2;
                        } else {
                              left_adjust = 0;
                              right_adjust = w;
                        }
                        var h = obj.height * obj.scaleY;
                        var top_adjust, bottom_adjust;
                        if(obj.originY == "center") {
                              top_adjust = bottom_adjust = h / 2;
                        } else {
                              top_adjust = 0;
                              bottom_adjust = h;
                        }

                        // if you need margins set them here
                        
                        var top_margin,bottom_margin,left_margin,right_margin
                        if(zoom > 1){
                              top_margin = 0;
                              bottom_margin = 40;
                              left_margin = 70;
                              right_margin = 140;
                        }else{
                              top_margin = 120;
                              bottom_margin = 100;
                              left_margin = 200;
                              right_margin = 200;
                        }

                        var top_bound = top_margin + top_adjust - pan_y;
                        var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
                        var left_bound = left_margin + left_adjust - pan_x;
                        var right_bound = c_width - right_adjust - right_margin - pan_x;

                        if( w > c_width ) {
                        obj.set('left',left_bound);
                        } else {
                        obj.set('left',Math.min(Math.max(left, left_bound), right_bound));          
                        }

                        if( h > c_height ) {
                              obj.set('top',top_bound);
                              console.log(top_bound)
                              
                        } else {
                              obj.set('top',Math.min(Math.max(top, top_bound), bottom_bound)); 
                              console.log(top_bound)       
                        }
                  });
            },
            handleSetFront(){
                  this.myCanvas = this.myCanvas1;
                  this.model = 'front'
            },
            handleSetback(){
                  this.myCanvas = this.myCanvas2;
                  this.model = 'back'
            },
            loadAndUse(font) {
                  let that = this;
                  var myfont = new FontFaceObserver(font)
                  myfont.load().then(function() {
                        // when font is loaded, use it.
                        that.myCanvas.getActiveObject().set("fontFamily", font);
                        that.myCanvas.requestRenderAll();
                  }).catch(function(e) {
                        console.log(e)
                        alert('font loading failed ' + font);
                  });
            },
            zoomIn(){
                  var zoom = this.myCanvas.getZoom();
                  console.log(zoom)
                  zoom = zoom + 0.4;
                  if (zoom > 1.4) zoom = 1.4;
                  this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
                  console.log(11)
            },
            zoomOut(){
                  var zoom = this.myCanvas.getZoom();
                  console.log(zoom)
                  zoom = zoom - 0.4;
                  if (zoom < 1) zoom = 1;
                  this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
            },
            changeFontFamily(value){
                  console.log(`selected ${value}`);
                  if (value == 'test-font') {
                        this.loadAndUse(value);
                        this.fontfamily = value;
                  }else{
                        let obj = this.myCanvas.getActiveObject()
                        if (obj) {
                              obj.set('fontFamily', value);
                              this.fontfamily = value;
                              this.myCanvas.requestRenderAll();
                        }
                  }
                  
            },
            selectEmboss(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(13, e.target.checked && new f.Convolute({
                        matrix: [ 1,   1,  1,
                              1, 0.7, -1,
                              -1,  -1, -1 ]
                  }));
            },
            selectSharpen(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(12, e.target.checked && new f.Convolute({
                        matrix: [  0, -1,  0,
                              -1,  5, -1,
                              0, -1,  0 ]
                  }));
            },
            changeBlur(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(11, true && new f.Blur({
                        value: that.blur
                  }));
                  that.applyFilterValue(11, 'blur', that.blur);
            },
            changePixelate(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(10, true && new f.Pixelate({
                        blocksize: that.pixelate
                  }));
                  that.applyFilterValue(10, 'blocksize', that.pixelate);
            },
            changeNoise(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(8, true && new f.Noise({
                        noise: that.noise
                  }));
                  that.applyFilterValue(8, 'noise', that.noise);
            },
            changeHue(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(21, true && new f.HueRotation({
                        rotation: that.hue
                  }));
                  that.applyFilterValue(21, 'rotation', that.hue);
            },
            changeSaturation(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(7, true && new f.Saturation({
                        saturation: that.saturation
                  }));
                  that.applyFilterValue(7, 'saturation', that.saturation);
            },
            changeContrast(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(6, true && new f.Contrast({
                        contrast: that.contrast
                  }));
                  that.applyFilterValue(6, 'contrast', that.contrast);
            },
            changeGammaRed(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(17, true && new f.Gamma({
                        gamma: [that.red, that.green,that.blue]
                  }));
                  var current = that.getFilter(17).gamma;
                  current[0] = that.red;
                  that.applyFilterValue(17, 'gamma', current);
            },
            changeGammaGreen(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(17, true && new f.Gamma({
                        gamma: [that.red, that.green,that.blue]
                  }));
                  var current = that.getFilter(17).gamma;
                  current[1] = that.green;
                  that.applyFilterValue(17, 'gamma', current);
            },
            changeGammaBlue(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(17, true && new f.Gamma({
                        gamma: [that.red, that.green,that.blue]
                  }));
                  var current = that.getFilter(17).gamma;
                  current[2] = that.blue;
                  that.applyFilterValue(17, 'gamma', current);
            },
            changeBrightness(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(5, true && new f.Brightness({
                        brightness: that.brightness
                  }));
            },
            changeDistance(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(2, true && new f.RemoveColor({
                        distance: that.distance,
                        color: that.removecolor,
                  }));
                  that.applyFilterValue(2, 'distance', that.distance);
            },
            changeRemoveColor(){
                  let that = this;
                  let f = fabric.Image.filters;
                  that.applyFilter(2, true && new f.RemoveColor({
                        distance: that.distance,
                        color: that.removecolor,
                  }));
                  that.applyFilterValue(2, 'color', that.removecolor);
            },
            
            selectPolaroid(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Polaroid());
            },
            selectTechnicolor(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Technicolor());
            },
            selectKodachrome(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Kodachrome());
            },
            selectVintage(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Vintage());
            },
            selectBrownie(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Brownie());
            },
            selectblackwhite(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.BlackWhite());
            },
            selectSepia(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(3, e.target.checked && new f.Sepia());
            },
            selectInvert(e){
                  let f = fabric.Image.filters;
                  this.applyFilter(1, e.target.checked && new f.Invert());
            },
            selectGrayscale(e){
                  console.log(`checked = ${e.target.checked}`)
                  let f = fabric.Image.filters;
                  this.applyFilter(4, e.target.checked && new f.Grayscale());
            },
            getFilter(index) {
                  var obj = this.myCanvas.getActiveObject();
                  return obj.filters[index];
            },
            applyFilter(index, filter) {
                  
                  var obj = this.myCanvas.getActiveObject();
                  obj.filters[index] = filter;
                  obj.applyFilters();
                  this.myCanvas.renderAll();
            },
            applyFilterValue(index, prop, value) {
                  var obj = this.myCanvas.getActiveObject();
                  if (obj.filters[index]) {
                        obj.filters[index][prop] = value;
                        obj.applyFilters();
                        this.myCanvas.renderAll();
                  }
            },
            downLoadImg(){
                  this.dataUrl = this.myCanvas.toDataURL();
            },
            saveImg(){
                  let json = this.myCanvas.toJSON();
                  this.dataPost = JSON.stringify(json)
                  console.log(json)
            },
            createCircle () {
                  let that = this;
                  let options = Object.assign({ radius: 40, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)', color: '#000', drawWidth: 0 }, options);
                  let defaultOption = {
                        ...options,
                        fill: options.fillColor,
                        strokeWidth: options.drawWidth,
                        stroke: options.color,
                        originX:'center',
                        originY: 'center',
                        left: that.screenWidth / 2,
                        top: that.screenWidth / 2,
                  };
                  let Circle = new fabric.Circle(defaultOption);
                  Circle.on("selected", function() {
                        that.visibletype = 3;
                        let obj = that.myCanvas.getActiveObject();
                        that.color = obj.fill;
                        that.stroke = obj.stroke;
                        that.strokeWidth = obj.strokeWidth;
                        that.Shadow1 = obj.shadow.offsetX;
                        that.Shadow2 = obj.shadow.offsetY;
                        that.Shadow3 = obj.shadow.blur;
                        that.shdowcolor = obj.shadow.color;
                        that.skewx = obj.skewX;
                        that.skewy = obj.skewY;
                        console.log(obj)
                        
                  });
                  that.myCanvas.add(Circle).setActiveObject(Circle);
                  that.visibletype = 2
                  that.myCanvas.renderAll();
            },
            createRect () {
                  let that = this;
                  let options = Object.assign({ width: 80, height: 80, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)',color: '#000', drawWidth: 0 }, options);
                  let rect = new fabric.Rect({
                        ...options,
                        fill: options.fillColor, 
                        strokeWidth: options.drawWidth,
                        stroke: options.color,
                        originX:'center',
                        originY: 'center',
                        left: that.screenWidth / 2,
                        top: that.screenWidth / 2,
                  });
                  rect.on("selected", function() {
                        that.visibletype = 3;
                        let obj = that.myCanvas.getActiveObject();
                        that.color = obj.fill;
                        that.stroke = obj.stroke;
                        that.strokeWidth = obj.strokeWidth;
                        that.Shadow1 = obj.shadow.offsetX;
                        that.Shadow2 = obj.shadow.offsetY;
                        that.Shadow3 = obj.shadow.blur;
                        that.shdowcolor = obj.shadow.color;
                        that.skewx = obj.skewX;
                        that.skewy = obj.skewY;
                        console.log(obj)
                        
                  });
                  that.myCanvas.add(rect).setActiveObject(rect);
                  that.visibletype = 3;
                  that.myCanvas.renderAll();
            },
            createEqualTriangle () {
                  let that = this;
                  let options = Object.assign({ width: 80, height: 80, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)', color: '#000', drawWidth: 0 }, options);
                  // console.log(defaultOption);
                  let triangle = new fabric.Triangle({
                        ...options,
                        fill: options.fillColor,
                        strokeWidth: options.drawWidth,
                        stroke: options.color,
                        originX:'center',
                        originY: 'center',
                        left: that.screenWidth / 2,
                        top: that.screenWidth / 2
                  });
                  triangle.on("selected", function() {
                        that.visibletype = 3;
                        let obj = that.myCanvas.getActiveObject()
                        that.color = obj.fill;
                        that.stroke = obj.stroke;
                        that.strokeWidth = obj.strokeWidth;
                        that.Shadow1 = obj.shadow.offsetX;
                        that.Shadow2 = obj.shadow.offsetY;
                        that.Shadow3 = obj.shadow.blur;
                        that.shdowcolor = obj.shadow.color
                        that.skewx = obj.skewX;
                        that.skewy = obj.skewY;
                  });
                  that.myCanvas.add(triangle).setActiveObject(triangle);
                  that.visibletype = 3;
                  that.myCanvas.renderAll();
            },
            beforeUpload (file) {
                  console.log(file)
                  this.uploadId ++;

                  getBase64(file,(imageUrl) => {
                        this.selectImg(imageUrl,'upload' + this.uploadId);
                        
                  })

            },
            changeShadowWidth1(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('shadow', this.shdowcolor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeShadowWidth2(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('shadow', this.shdowcolor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeShadowWidth3(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('shadow', this.shdowcolor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeShadowColor(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('shadow', this.shdowcolor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changestrokeColor(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('stroke', this.stroke);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changestrokeWidth(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('strokeWidth', this.strokeWidth);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeSkewY(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('skewY', this.skewy).setCoords();
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeSkewX(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('skewX', this.skewx).setCoords();
                        this.myCanvas.requestRenderAll();
                  }
            },
               
            changeFilPx(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('flipX',this.filpx);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeFilPy(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('flipY',this.filpy);
                        this.myCanvas.requestRenderAll();
                  }
            },
            changeOpacity(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("opacity", this.opacity);
                        this.myCanvas.requestRenderAll();
                  }
            },
            onClose() {
                  this.visible = false
            },
            //设置选中框外观
            setEditIcon(){
                  let that = this;
                  fabric.Object.prototype.customiseCornerIcons(
                        {
                              settings: {
                                    borderColor: "#0094dd",
                                    cornerSize: 25,
                                    cornerShape: "circle",
                                    cornerPadding: 10
                              },

                              tr: {
                                    icon: resize,
                                    settings: {
                                          cornerBackgroundColor: that.randomColor()
                                    }
                              },
                              br: {
                                    icon: diagonal,
                                    settings: {
                                          cornerBackgroundColor: that.randomColor()
                                    }
                              },
                              bl: {
                                    icon: remove,
                                    settings: {
                                          cornerBackgroundColor: that.randomColor()
                                    }
                              },
                              mtr: {
                                    icon:rotate,
                                    settings: {
                                          cornerBackgroundColor: that.randomColor()
                                    }
                              }
                        },
                              function() {
                                    that.myCanvas.renderAll();
                              }
                  );
            },
            setEditPointer(){
                  let that = this;
                  fabric.Canvas.prototype.customiseControls({
                        tr: {
                              action: "scale"
                        },
                        bl: {
                              action: function(e, target) {
                                    that.myCanvas.remove(target);
                              },
                              cursor: "pointer"
                        },
                        br: {
                              action: function(e, target) {
                                    console.log(target);
                                    that.visible = true
                              },
                              cursor: "pointer"
                        },
                        mtr: {
                              action: "rotate"
                        }
                  });
            },
            addImg(imgUrl,id){
                  this.selectImg(imgUrl,id);
                  this.visibletype = 2
            },
            selectImg(imgUrl,id) {
                  let that = this;
                  fabric.Image.fromURL(imgUrl, function(oImg) {
                        oImg.on("selected", function() {
                              that.visibletype = 2
                              let obj = that.myCanvas.getActiveObject();
                              that.opacity = obj.opacity;
                              that.filpx = obj.flipX;
                              that.filpy = obj.flipY;
                              that.skewx = obj.skewX;
                              that.skewy = obj.skewY;
                        });
                        
                        that.myCanvas.add(
                              oImg.set({
                                    id: id,
                                    flipX:false,
                                    flipY:false,
                                    skewX:0,
                                    skewY:0,
                                    originX: "center",
                                    originY: "center",
                                    left: that.screenWidth / 2,
                                    top: that.screenWidth / 2
                              })
                        ).setActiveObject(oImg);
                  });
                  
            },
            randomColor() {
                  var letters = '0123456789ABCDEF';
                  var color = '#';
                  for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
            },
            bindCanvas1(i) {
                  var that = this
                  that.myCanvas1.setBackgroundImage(that.suits.frontimg.bgimgs[i],that.myCanvas1.renderAll.bind(that.myCanvas1),{
                              opacity: 1,
                              angle: 0,
                              left: that.screenWidth / 2,
                              top: that.screenWidth / 2,
                              originX: "center",
                              originY: "center",
                              scaleX: that.screenWidth / 600,
                              scaleY: that.screenWidth / 600
                  });
                  
            },
            bindCanvas2(i) {
                  var that = this
                  that.myCanvas2.setBackgroundImage(that.suits.backimg.bgimgs[i],that.myCanvas2.renderAll.bind(that.myCanvas2),
                        {
                              opacity: 1,
                              angle: 0,
                              left: that.screenWidth / 2,
                              top: that.screenWidth / 2,
                              originX: "center",
                              originY: "center",
                              scaleX: that.screenWidth / 600,
                              scaleY: that.screenWidth / 600
                        });
            },
            selectColor(i,color){
                  let that = this
                  that.bindCanvas1(i)
                  that.bindCanvas2(i)
                  that.selected = i
                  that.myCanvas.setBackgroundColor(color, that.myCanvas.renderAll.bind(that.myCanvas))
            },
            onOpenChange (openKeys) {
                  const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
                  if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                        this.openKeys = openKeys
                  } else {
                        this.openKeys = latestOpenKey ? [latestOpenKey] : []
                  }
            },
            handleClick (e) {
                  console.log('click', e)
            },
            addItext(text, options) {
                  let that = this;
                  that.visibletype = 1
                  options = Object.assign({ fontSize: 30, fillColor: '#000000', shadow:'#000 0 0 0',strokeWidth: 0,stroke: '#000',registeObjectEvent: true,textBackgroundColor:'' }, options);
                  var canvasObj = new fabric.Textbox('Text', {
                        ...options,
                        fill: options.fillColor,
                        textBackgroundColor: options.textBackgroundColor,
                        strokeWidth:options.strokeWidth,
                        stroke:options.stroke,
                        shadow:options.shadow,
                        fontFamily: 'Microsoft YaHei',
                        originX:'center',
                        originY:'center',
                        left: that.screenWidth / 2,
                        top: that.screenWidth / 2
                  });
                  canvasObj.on("selected", function() {
                        that.visibletype = 1
                        let obj = that.myCanvas.getActiveObject()
                        console.log(obj)
                        that.color = obj.fill;
                        that.bgcolor = obj.textBackgroundColor || '#000000';
                        that.stroke = obj.stroke;
                        that.strokeWidth = obj.strokeWidth;
                        that.Shadow1 = obj.shadow.offsetX;
                        that.Shadow2 = obj.shadow.offsetY;
                        that.Shadow3 = obj.shadow.blur;
                        that.shdowcolor = obj.shadow.color;
                        that.fontfamily = obj.fontFamily
                  });
                  that.myCanvas.add(canvasObj).setActiveObject(canvasObj);
                  
                  
                  
                  
            },
            changeFillColor(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("fill", this.color);
                        this.myCanvas.requestRenderAll();
                  }
                  
            },
            changeTextBgColor(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("textBackgroundColor", this.bgcolor);
                        this.myCanvas.requestRenderAll();
                  }
            },
            setTextalignLeft(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("textAlign", 'left');
                        this.myCanvas.requestRenderAll();
                  }
            },
            setTextalignCenter(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("textAlign", 'center');
                        this.myCanvas.requestRenderAll();
                  }
            },
            setTextalignRight(){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("textAlign", 'right');
                        this.myCanvas.requestRenderAll();
                  }
                  
            },
            setFontWeight(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        if(obj.get("fontWeight") == 'normal'){
                              obj.set("fontWeight", 'bold');
                              this.myCanvas.requestRenderAll();
                        }else{
                              obj.set("fontWeight", 'normal');
                              this.myCanvas.requestRenderAll();
                        }
                  }
                  
            },
            setFontStyle(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        if(obj.get("fontStyle") == 'normal'){
                              obj.set("fontStyle", 'italic');
                              this.myCanvas.requestRenderAll();
                        }else{
                              obj.set("fontStyle", 'normal');
                              this.myCanvas.requestRenderAll();
                        }
                  }
                  
            },
            setTextDown(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        if(obj.get("underline")){
                              obj.set("underline", false);
                              this.myCanvas.requestRenderAll();
                        }else{
                              obj.set("underline", true);
                              this.myCanvas.requestRenderAll();
                        }
                  }
            },
            setTextThrough(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        if(obj.get("linethrough")){
                              obj.set("linethrough", false);
                              this.myCanvas.requestRenderAll();
                        }else{
                              obj.set("linethrough", true);
                              this.myCanvas.requestRenderAll();
                        }
                  }
                  
            },
            setTextRotateR(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        let angle = obj.angle;
                        obj.rotate(angle + 45);
                        this.myCanvas.requestRenderAll();
                  }
                  
            },
            setTextRotateL(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        let angle = obj.angle;
                        obj.rotate(angle - 45);
                        this.myCanvas.requestRenderAll();
                  }
                  
            },
            toNextLayer(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        obj.sendBackwards(true);
                        this.myCanvas.renderTop();
                        this.myCanvas.discardActiveObject();
                        this.myCanvas.requestRenderAll();
                  }
            },
            toPreLayer(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        obj.bringForward(true);
                        this.myCanvas.renderTop();
                        this.myCanvas.discardActiveObject();
                        this.myCanvas.requestRenderAll();
                  }
            }
      },
      computed:{

      }
}
</script>

<style lang="less">
      @font-face {
            font-family:'test-font';
            src:url('https://cdnjs.loli.net/ajax/libs/MaterialDesign-Webfont/3.8.95/fonts/materialdesignicons-webfont.ttf')
      }
      .active{
            border: 2px solid #ff59a7 !important;
      }
      .tools{
            .m-colorPicker .box{
                  z-index: 1000;
            }
            .textcolor-control{
                  display: flex;
                  align-items: center;
                  list-style: none;
                  li:nth-child(2){
                  margin-left: 120px;
                  }
                  li{
                        display: flex;
                        align-items: center;
                        .m-colorPicker{
                              position: absolute !important; 
                              left: 0px; 
                              bottom: 0px;
                              .colorBtn{
                                    width: 24px !important;
                                    height: 36px !important;
                                    opacity: 0 !important;
                              }
                              .box{
                                    z-index: 1000;
                              }
                        }
                        > span{
                              font-size: 24px;
                              margin: 0 10px;
                              cursor: pointer;
                        }
                        
                  }
                  
            }
            .textalign-control{
                  display: flex;
                  align-items: center;
                  dd{
                        > span{
                              font-size: 24px;
                              margin: 0 10px;
                              cursor: pointer;
                        }
                  }
            }
            .fonTstyle-control{
                  display: flex;
                  align-items: center;
                  dd{
                        > span{
                              font-size: 24px;
                              margin: 0 10px;
                              cursor: pointer;
                        }
                  }
            }
            .stroke-control{
                  li{
                        margin: 20px 0;
                  }
                  
            }
            .color-control{
                  display: flex;
                  align-items: center;
                  list-style: none;
                  li:nth-child(2){
                  margin-left: 120px;
                  }
            }
            .filters-part1{
                  display: flex;
                  justify-content: space-around;
                  flex-wrap: wrap;
            }
      }
      .ant-drawer{
            color: #000;
      }
      #main{
            padding: 150px 80px 0;
            height: 100%;
            background-image: linear-gradient( 45deg, #11bbe8 10%, #4ac37a 100%);
            .section1{
                  padding: 0 10px;
                  .my-upload{
                        display: flex;
                        justify-content: center;
                        span{
                              font-size: 14px !important;
                        }
                        .ant-upload-list{
                              display: none;
                        }
                  }
                  .shapescolor{
                        display: flex;
                        margin: 40px 0;
                        dt{
                              margin-left: 10px;
                        }
                  }
                  .my-submenu{
                        .img-cell{
                              > div{
                                    font-size: 16px;
                              }
                              .ant-menu{
                                    display: flex;
                                    flex-wrap: wrap;
                                    li{
                                          padding: 20px !important;
                                          width: 25%;
                                          height: auto;
                                          display: flex;
                                          justify-content: center;
                                          align-items: center;
                                          &::after{
                                                border-right: none;
                                          }
                                          
                                          img{
                                                width: 50px;
                                                height: 50px;
                                          }
                                    }
                              }
                        }
                        span{
                              font-size: 18px;
                        }
                  }
            }
            .section2{
                  
                  .canvas-container{
                        
                        display: flex;
                        justify-content: center;
                  }
                  .controlers{
                        display: flex;
                        align-items: center;
                        > span{
                              font-size: 24px;
                              margin: 0 10px;
                              cursor: pointer;
                              color: #f1f1f1;
                        }
                  }
            }
            .section3{
                  padding: 0 10px;
                  .size-select{
                        display: flex;
                        .my-tag{
                              padding: 0 20px;
                        }
                  }
                  .color-select{
                        display: flex;
                        height: 64px;
                        dd{
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              padding: 5px;
                              border-radius: 100%;
                              margin: 10px 4px;
                              width: 44px;
                              height: 44px;
                              i{
                                    width: 30px;
                                    height: 30px;
                                    border-radius: 100%;
                                    display: inline-block;
                                    cursor: pointer;
                                    
                              }
                              &:hover{
                                    border: 2px solid #ebebeb;
                                    
                              }
                        }
                  }
                  .btn-box{
                        display: flex;
                        justify-content: center;
                        button{
                              margin: 20px;
                        }
                        
                  }
            }
      }
</style>

