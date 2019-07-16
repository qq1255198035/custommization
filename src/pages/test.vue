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
                                          
                                    </a-sub-menu>
                                    <a-sub-menu key="sub4" class="my-submenu">
                                          <span slot="title"><a-icon type="pie-chart" /><span>图形</span></span>
                                          <a-menu-item key="9">三角形</a-menu-item>
                                          <a-menu-item key="10">矩形</a-menu-item>
                                          <a-menu-item key="11">圆形</a-menu-item>
                                    </a-sub-menu>
                                    
                              </a-menu>
                              <dl class="shapescolor">
                                    <dt>图形填充颜色：</dt>
                                    <dd><colorPicker v-model="fillcolor"/></dd>
                                    <dt>图形描边颜色：</dt>
                                    <dd><colorPicker v-model="strokecolor"/></dd>
                              </dl>
                              <dl>
                                    <dt>描边大小</dt>
                                    <dd><a-slider :min="2" :max="10" v-model="drawWidth"/></dd>
                              </dl>
                              <a-upload name="file" class="my-upload">
                                    <a-button type="primary">
                                          <a-icon type="upload"/> 上传图片
                                    </a-button>
                              </a-upload>
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
                                    <dl>
                                          <dt>字体颜色:</dt>
                                          <dd>
                                                <span title="字体颜色" style="position: relative">
                                                      <a-icon type="font-colors" :style="{color:color}"/>
                                                      <colorPicker v-model="color" @change="changeTextColor"/>
                                                </span>
                                          </dd>
                                    </dl>
                                    
                              </li>
                              <li>
                                    <dl>
                                          <dt>字体背景颜色:</dt>
                                          <dd>
                                                <span title="背景颜色" style="position: relative">
                                                      <a-icon type="bg-colors" :style="{color:bgcolor}"/>
                                                      <colorPicker v-model="bgcolor" @change="changeTextBgColor"/>
                                                </span>
                                          </dd>
                                    </dl>
                                    
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
                  </div>
                  <div v-else-if="visibletype == 2">
                        <p>Some2 contents...</p>
                        <p>Some2 contents...</p>
                        <p>Some2 contents...</p>
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
                  bgcolor:'#f1f1f1',
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
                  visibletype:0
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
                        // oImg.filters.push(new fabric.Image.filters.Grayscale());
                        // oImg.applyFilters(that.myCanvas.renderAll.bind(that.myCanvas));
                        oImg.on("selected", function() {
                              that.visibletype = 2
                              console.log(that.visibletype)
                        });
                        
                        that.myCanvas.add(
                              oImg.set({
                                    id: id,
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
                  options = Object.assign({ fontSize: 25, fillColor: that.color, registeObjectEvent: false, left: 280, top: 250,textBackgroundColor:that.bgcolor }, options);
                  var canvasObj = new fabric.Textbox('Text', {
                        ...options,
                        fill: options.fillColor,
                        textBackgroundColor: options.textBackgroundColor
                  });
                  that.myCanvas.add(canvasObj).setActiveObject(canvasObj);
                  canvasObj.on("selected", function() {
                        that.visibletype = 1
                        console.log(that.visibletype)
                  });
                  
                  
            },
            changeTextColor(){
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
            dl{
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
                  dd{
                        > span{
                              font-size: 24px;
                              margin: 0 10px;
                              cursor: pointer;
                        }
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
      #main{
            padding: 100px;
            background-color: #f8f8f8;
            .section1{
                  padding: 0 10px;
                  .my-upload{
                        display: flex;
                        justify-content: center;
                        margin-top: 30px;
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

