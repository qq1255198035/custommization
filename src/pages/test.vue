<template>
      <div id="main">
            <a-row>
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
                                                      <a-button type="primary">
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
                                    <span title="右旋转" @click="setTextRotateR"><a-icon type="redo" /></span>
                                    <span title="左旋转" @click="setTextRotateL"><a-icon type="undo" /></span>
                                    <span title="移动到下一层" @click="toNextLayer"><a-icon type="sort-ascending" /></span>
                                    <span title="移动倒上一层" @click="toPreLayer"><a-icon type="sort-descending" /></span>
                              </div>
                              <div class="canvas-container">
                                    <canvas id="canvas" width="600" height="600"></canvas>
                              </div>
                        </div>
                        
                  </a-col>
                  <a-col :span="6">
                        <div class="section3">
                              <h3>选择颜色</h3>
                              <dl class="color-select">
                                    
                                    <dd v-for="(color,index) in colors" :key="color" :class="{active: selected == index}" @click="selectColor(index)">
                                          <i :style="{backgroundColor: color}"></i>
                                    </dd>
                              </dl>
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
                                    <a-button type="primary">保存</a-button>
                                    
                                    <a-button><a class="downLoad" download="downImg" :href="dataUrl">下载</a></a-button>
                              </div>
                        </div>
                        
                  </a-col>
            </a-row>
            <a-drawer placement="right" title="工具箱" :visible="visible" :mask="false" @close="onClose" :width="540">
                  <div v-if="visibletype == 1">
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
                  <div v-else-if="visibletype == 2">
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
                  <div v-else-if="visibletype == 3">
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
            </a-drawer>
      </div>
</template>
<script>
import { fabric } from 'fabric'
import 'fabric-customise-controls'
import initAligningGuidelines from "@/utils/guidelines"
import img1 from '@/assets/0001.png'
import img2 from '@/assets/0002.png'
import img3 from '@/assets/0003.png'
import img7 from '@/assets/0007.png'
import img8 from '@/assets/0008.png'
import img10 from '@/assets/0010.png'
import bgimg1 from '@/assets/white-2fbe8472bccef1a454b2b5e2ceb1e7293a86b971a0aa7522fe8f91.png'
import bgimg2 from '@/assets/black.jpg'
import bgimg3 from '@/assets/jaw.jpg'
import overimg1 from '@/assets/bg.png'
import overimg2 from '@/assets/bg-black.png'
import overimg3 from '@/assets/bg-jaw.png'
import resize from '@/assets/icons/resize.svg'
import remove from '@/assets/icons/remove.svg'
import rotate from '@/assets/icons/rotate.svg'
import diagonal from "@/assets/icons/repair-tools-cross.svg";
function getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
}
export default {
      data () {
            return {
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
                  colors:['#fff','#000','#ccc'],
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
                  bgimgs:[
                        bgimg1,
                        bgimg2,
                        bgimg3
                  ],
                  overimgs:[
                        overimg1,
                        overimg2,
                        overimg3,
                  ],
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
                  uploadId:0
            }
      },
      mounted(){
            
            this.$nextTick(function() {
                  let that = this;
                  that.myCanvas = new fabric.Canvas("canvas");
                  that.bindCanvas(that.selected);
                  that.setEditIcon();
                  that.setEditPointer();
                  initAligningGuidelines(that.myCanvas)
            })
            
      },
      methods: {
            createCircle () {
                  let that = this;
                  let options = Object.assign({ left: 260, top: 200, radius: 40, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)', color: '#000', drawWidth: 0 }, options);
                  let defaultOption = {
                        ...options,
                        fill: options.fillColor,
                        strokeWidth: options.drawWidth,
                        stroke: options.color
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
                  let options = Object.assign({ width: 80, height: 80, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)', left: 260, top: 200,color: '#000', drawWidth: 0 }, options);
                  let rect = new fabric.Rect({
                        ...options,
                        fill: options.fillColor, 
                        strokeWidth: options.drawWidth,
                        stroke: options.color
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
                  let options = Object.assign({ left: 260, top: 200, width: 80, height: 80, shadow:'#000 0 0 0',fillColor: 'rgba(0, 0, 0, 1)', color: '#000', drawWidth: 0 }, options);
                  // console.log(defaultOption);
                  let triangle = new fabric.Triangle({
                        ...options,
                        fill: options.fillColor,
                        strokeWidth: options.drawWidth,
                        stroke: options.color
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
                                    left: 300,
                                    top: 300
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
            bindCanvas(i) {
                  var that = this
                  that.myCanvas.setBackgroundImage(that.bgimgs[i],that.myCanvas.renderAll.bind(that.myCanvas));
                  that.myCanvas.setOverlayImage(that.overimgs[i],that.myCanvas.renderAll.bind(that.myCanvas),
                        {
                        opacity: 1,
                        angle: 0,
                        left: 300,
                        top: 300,
                        originX: "center",
                        originY: "center"
                        }
                  );
            },
            selectColor(i){
                  console.log(i)
                  this.bindCanvas(i)
                  this.selected = i
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
                  options = Object.assign({ fontSize: 30, fillColor: '#000000', shadow:'#000 0 0 0',strokeWidth: 0,stroke: '#000',registeObjectEvent: true, left: 280, top: 250,textBackgroundColor:'' }, options);
                  var canvasObj = new fabric.Textbox('Text', {
                        ...options,
                        fill: options.fillColor,
                        textBackgroundColor: options.textBackgroundColor,
                        strokeWidth:options.strokeWidth,
                        stroke:options.stroke,
                        shadow:options.shadow,
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
                        that.shdowcolor = obj.shadow.color
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
      .active{
            border: 2px solid #ff59a7 !important;
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
      #main{
            padding: 100px;
            background-color: #f8f8f8;
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
                  background-color: #000;
                  .canvas-container{
                        background-color: #fff;
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

