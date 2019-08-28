<template>
      <div id="main">
            <my-title :title="'新建订单'">
                  <a-button size="small">返回</a-button>
            </my-title>
            <a-row id="myrow">
                  <a-col :span="6">
                        <div class="section1">
                              <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" @click="handleClick">
                                    <a-menu-item @click="openAddText">
                                          <a-icon type="edit" />
                                          <span style="font-size: 18px;" >文字</span>
                                    </a-menu-item>
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
                                          <span slot="title"><a-icon type="pie-chart" /><span>产品颜色</span></span>
                                          <a-menu-item key="9" class="color-picker">
                                                
                                          </a-menu-item>
                                    </a-sub-menu>
                              </a-menu>
                        </div>
                  </a-col>
                  <a-col :span="12">
                        <div class="section2">
                              
                              <div class="canvas-container"  v-show="model == 'front'">
                                    <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                                    
                              </div>
                              <div class="canvas-container"  v-show="model == 'back'">
                                    <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                              </div>
                              <div class="left-side">
                                    <span @click="zoomIn">
                                          <img src="@/assets/zoom-in.png" alt="">
                                    </span>
                                    <span @click="zoomOut">
                                          <img src="@/assets/zoom-out.png" alt="">
                                    </span>
                              </div>
                              <div class="bottom-side">
                                    <span class="btn">
                                          
                                    </span>
                              </div>
                        </div>
                        
                  </a-col>
                  <a-col :span="6">
                        <transition :name="transitionName" mode="out-in">
                              <div v-show="drawerShow" style="width: 100%;">
                                    <div class="drawer">
                                          <h2 style="color: #fff;text-align: right;">
                                                <a-icon type="arrow-left" style="cursor: pointer;" @click="goBackDrawer" v-if="visibletype > 2"/>
                                                <a-icon type="close" style="cursor: pointer;" @click="closeDrawer" v-else/>
                                          </h2>
                                          <h3 style="color: #fff;padding-bottom: 3px; border-bottom: 1px solid #fff;">图层</h3>
                                          <div class="controlers">
                                                <span title="移动到下一层" @click="toNextLayer"><a-icon type="up" /></span>
                                                <span title="移动倒上一层" @click="toPreLayer"><a-icon type="down" /></span>
                                                <span title="移动到顶层" @click="toTopLayer"><img src="@/assets/top-layer.png" alt=""></span>
                                                <span title="移动倒底层" @click="toBottomLayer"><img src="@/assets/bottom-layer.png" alt=""></span>
                                          </div>
                                          <div class="tool-box1" v-if="visibletype == 1">
                                                <div class="add-text">
                                                      <p>Add Text</p>
                                                      <a-input v-model="addText"></a-input>
                                                      <a-button @click="addItext">Add To Design</a-button>
                                                </div>
                                                <div class="second">
                                                      <div class="text-tool">
                                                            <p>
                                                                  <span @click="setObjCenter">
                                                                        <img src="@/assets/obj-center.png" alt=""><br/>
                                                                  </span>
                                                                  Center
                                                            </p>
                                                            <p>
                                                                  <span @click="setTextalignLeft">
                                                                        <a-icon type="align-left" style="font-size: 24px;"/>
                                                                  </span>
                                                                  <span @click="setTextalignCenter">
                                                                        <a-icon type="align-center" style="font-size: 24px;"/>
                                                                  </span>
                                                                  <span @click="setTextalignRight">
                                                                        <a-icon type="align-right" style="font-size: 24px;"/><br/>
                                                                  </span>
                                                                  Text Align
                                                            </p>
                                                      </div>
                                                      <div>
                                                            <p>Rotation</p>
                                                            <a-slider :min="0" :max="360" :step="10" @change="setTextRotate" v-model="rotateNum"/>
                                                      </div>
                                                </div>
                                                <ul class="tool-list">
                                                      <li @click="openFontFamilyBox">
                                                            <span>Change Font</span>
                                                            <p>
                                                                  <span>{{fontfamily}}</span>
                                                                  <a-icon type="right" />
                                                            </p>
                                                      </li>
                                                      <li @click="openFontColorBox">
                                                            <span>Text Color</span>
                                                            <p>
                                                                  <span>{{colorName}} <i class="square" :style="{backgroundColor:color}"></i></span>
                                                                  <a-icon type="right" />
                                                            </p>
                                                      </li>
                                                      <li @click="openFontOutlineBox">
                                                            <span>Text Outline</span>
                                                            <p>
                                                                  <span v-if="strokeWidth > 0">Add Outline</span>
                                                                  <a-icon type="right" />
                                                            </p>
                                                      </li>
                                                      <li>
                                                            <span>Font Height</span>
                                                            <p>
                                                                  <a-input type="number" @change="changeLineHeight" v-model="lineHeight"></a-input>
                                                            </p>
                                                      </li>
                                                </ul>
                                          </div>
                                          <div class="tool-box2" v-else-if="visibletype == 2">
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
                                          </div>
                                          <div class="tool-box3" v-else-if="visibletype == 3">
                                                <ul class="font-family-list">
                                                      <li v-for="item in fontFamilyArr" :key="item.id" @click="changeFontFamily(item.name)">
                                                            <span :style="{fontFamily: item.name}" >ABC</span>
                                                            <span>{{item.name}}</span>
                                                      </li>
                                                </ul>
                                          </div>
                                          <div class="tool-box4" v-else-if="visibletype == 4">
                                                <ul class="font-color-list">
                                                      <li v-for="item in fontColorArr" :key="item.name" :style="{backgroundColor: item.color}" @click="changeFillColor(item.color,item.name)"></li>
                                                </ul>
                                          </div>
                                          <div class="tool-box5" v-else-if="visibletype == 5">
                                                <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth"/>
                                                <ul class="font-color-list">
                                                      <li v-for="item in fontColorArr" :key="item.name" :style="{backgroundColor: item.color}" @click="changestrokeColor(item.color)"></li>
                                                </ul>
                                          </div>
                                    </div>
                                    
                              </div>
                        </transition>
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
            return {
                  suitsList:[
                        bgimg3,
                        bgimg3,
                        bgimg3,
                        bgimg3
                  ],
                  fontFamilyArr:[
                        {
                              id:1,
                              name: 'Microsoft YaHei'
                        },
                        {
                              id:2,
                              name: 'testFont'
                        }
                  ],
                  lineHeight: 1,
                  colorName:'',
                  fontColorArr:[
                        {
                              name: 'Black',
                              color: '#000'
                        },
                        {
                              name: 'Red',
                              color: '#ff0000'
                        }
                  ],
                  addText:'',
                  rotateNum:0,
                  drawerShow:false,
                  transitionName:'vux-pop-in',
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
                              
                              
                        },
                        backimg:{
                              bgimgs:[
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
                  fontfamily:'',
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
                  console.log(this.myCanvas2.getImageData)
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
            goBackDrawer(){
                  this.toogleDrawer();
                  this.visibletype = 1;
            },
            changeLineHeight(){
                  let that = this;
                  let obj = that.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set("lineHeight", that.lineHeight);
                        that.myCanvas.requestRenderAll();
                  }
            },
            setObjCenter(){
                  let t = this.myCanvas.getActiveObject();
                  t.center();
                  t.setCoords(); 
            },
            openAddText(){
                  if(this.visibletype !== 1){
                        this.toogleDrawer();
                        this.visibletype = 1;
                  }
            },
            openFontFamilyBox(){
                  this.toogleDrawer();
                  this.visibletype = 3;
            },
            openFontColorBox(){
                  this.toogleDrawer();
                  this.visibletype = 4;
            },
            openFontOutlineBox(){
                  this.toogleDrawer();
                  this.visibletype = 5;
            },
            toogleDrawer(){
                  this.closeDrawer();
                  setTimeout(() => {
                        this.openDrawer();
                  },300)
            },
            openDrawer(){
                  this.drawerShow = true;
                  this.transitionName = 'vux-pop-in'
            },
            closeDrawer(){
                  this.drawerShow = false;
                  this.transitionName = 'vux-pop-out'
            },
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
                  if (value == 'testFont') {
                        this.loadAndUse(value);
                  }else{
                        let obj = this.myCanvas.getActiveObject()
                        if (obj) {
                              obj.set('fontFamily', value);
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
            //描边颜色
            changestrokeColor(val){
                  let obj = this.myCanvas.getActiveObject()
                  if (obj) {
                        obj.set('stroke', val);
                        this.myCanvas.requestRenderAll();
                  }
            },
            //描边大小
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
                                    that.openDrawer();
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
                  if(this.visibletype !== 2){
                        this.visibletype = 2;
                        this.toogleDrawer();
                  }
            },
            selectImg(imgUrl,id) {
                  let that = this;
                  fabric.Image.fromURL(imgUrl, function(oImg) {
                        oImg.on("selected", function() {
                              
                              if(that.visibletype !== 2){
                                    that.visibletype = 2;
                                    that.toogleDrawer();
                              }
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
            //改变衣服颜色
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
                  if(that.addText){
                        options = Object.assign({ fontSize: 30, fillColor: '#000000', shadow:'#000 0 0 0',strokeWidth: 0,stroke: '#000',registeObjectEvent: true,textBackgroundColor:'' }, options);
                        var canvasObj = new fabric.Textbox(that.addText, {
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
                              
                              if(that.visibletype !== 1){
                                    that.toogleDrawer();
                                    that.visibletype = 1;
                              }
                              let obj = that.myCanvas.getActiveObject()
                              console.log(obj.angle)
                              that.color = obj.fill;
                              that.rotateNum = obj.angle;
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
                  }
            },
            //改变字体颜色
            changeFillColor(val,name){
                  let obj = this.myCanvas.getActiveObject();
                  this.color = val;
                  if (obj) {
                        obj.set("fill", val);
                        this.myCanvas.requestRenderAll();
                  }
                  this.colorName = name;
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
            setTextRotate(){
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        obj.rotate(this.rotateNum);
                        this.myCanvas.requestRenderAll();
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
            toTopLayer () {
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        obj.bringToFront();
                        this.myCanvas.renderTop();
                        this.myCanvas.discardActiveObject();
                        this.myCanvas.requestRenderAll();
                  }
            },
            toBottomLayer () {
                  let obj = this.myCanvas.getActiveObject();
                  if (obj) {
                        obj.sendToBack();
                        this.myCanvas.renderTop();
                        this.myCanvas.discardActiveObject();
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
            font-family:'testFont';
            src:url('https://cdnjs.loli.net/ajax/libs/MaterialDesign-Webfont/3.8.95/fonts/materialdesignicons-webfont.ttf')
      }
      .vux-pop-out-enter-active,
      .vux-pop-out-leave-active,
      .vux-pop-in-enter-active,
      .vux-pop-in-leave-active {
            will-change: transform;
            transition: all 300ms;
            height: 100%;
            position: absolute;
            backface-visibility: hidden;
            perspective: 1000;
      }
      .vux-pop-out-enter {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
      }
      .vux-pop-out-leave-active {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
      }
      .vux-pop-in-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
      }
      .vux-pop-in-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
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
            overflow: hidden;
            #myrow{
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
                        position: relative;
                        .left-side{
                              position: absolute;
                              right: 20px;
                              bottom: 10px;
                              display: flex;
                              flex-direction: column;
                              cursor: pointer;
                              span{
                                    margin: 10px 0;
                                    width: 30px;
                                    height: 30px;
                                    img{
                                          width: 100%;
                                    }
                              }
                        }
                        .canvas-container{
                              
                              display: flex;
                              justify-content: center;
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
                  .drawer{
                        background-color: rgba(255, 255, 255, 0.3);
                        width: 100%;
                        border-radius: 10px;
                        padding: 20px 25px;
                        
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
                        .tool-box1{
                              .second{
                                    padding: 10px;
                                    background-color: rgba(80, 168, 176, 0.507);
                                    border-radius: 6px;
                                    .text-tool{
                                          display: flex;
                                          margin: 30px 0;
                                          p{
                                                text-align: center;
                                                margin: 0 10px;
                                                span{
                                                      background-color: rgba(255, 255, 255, 0.3);
                                                      border-radius: 4px;
                                                      display: inline-block;
                                                      padding: 4px 10px;
                                                      margin: 0 2px;
                                                      cursor: pointer;
                                                }
                                          }
                                    }
                                    
                              }
                              
                              .add-text{
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    margin: 30px 0;
                                    input{
                                          margin: 10px 0;
                                    }
                              }
                              .tool-list{
                                    margin-top: 30px;
                                    .square{
                                          width: 14px;
                                          height: 14px;
                                          display: inline-block;
                                          margin-left: 5px;
                                    }
                                    li{
                                          padding: 10px 0;
                                          border-bottom:1px solid #fff; 
                                          display: flex;
                                          justify-content: space-between;
                                          align-items: center;
                                          cursor: pointer;
                                          p{
                                                display: flex;
                                                align-items: center;
                                                span{
                                                      margin-right: 5px;
                                                      display: flex;
                                                      align-items: center;
                                                }
                                          }
                                          
                                    }
                              }
                        }
                        .tool-box3{
                              .font-family-list{
                                    li{
                                          display: flex;
                                          flex-direction: column;
                                          align-items: center;
                                          justify-content: center;
                                          margin: 10px 0;
                                          cursor: pointer;
                                          span:nth-child(1){
                                                font-size: 18px;
                                          }
                                          &:hover{
                                                background-color: rgba(255, 255, 255, 0.3);
                                          }
                                    }
                              }
                        }
                        .tool-box4{
                              margin-top: 20px;
                              .font-color-list{
                                    display: flex;
                                    li{
                                          width: 25px;
                                          height: 25px;
                                          margin: 0 5px;
                                          cursor: pointer;
                                    }
                              }
                              
                        }
                        .tool-box5{
                              margin-top: 20px;
                              .font-color-list{
                                    display: flex;
                                    li{
                                          width: 25px;
                                          height: 25px;
                                          margin: 0 5px;
                                          cursor: pointer;
                                    }
                              }
                              
                        }
                  }
            }
            
      }
</style>

