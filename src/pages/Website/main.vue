<template>
      <div id="main">
            <a-row>
                  <a-col :span="6">
                        <div class="section1">
                              <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" @click="handleClick">
                                    <a-sub-menu key="sub2" class="my-submenu" @titleClick="titleClick">
                                          <span slot="title"><a-icon type="area-chart" /><span>图片</span></span>
                                          <a-sub-menu key="sub3" title="剪贴画" class="img-cell">
                                                <a-menu-item :key="img" v-for="(img,index) in imgs" @click="addImg(img,index)">
                                                      <img :src="img" alt="">
                                                </a-menu-item>
                                                
                                          </a-sub-menu>
                                          
                                    </a-sub-menu>
                                    <a-sub-menu key="sub4" class="my-submenu">
                                          <span slot="title"><a-icon type="pie-chart" /><span>图形</span></span>
                                          <a-menu-item key="9" @click="createTriangle">三角形</a-menu-item>
                                          <a-menu-item key="10" @click="createRect">矩形</a-menu-item>
                                          <a-menu-item key="11" @click="createCircle">圆形</a-menu-item>
                                    </a-sub-menu>
                                    
                              </a-menu>
                              <dl class="shapescolor">
                                    <dt>图形填充颜色：</dt>
                                    <dd><colorPicker v-model="fillcolor" @change="changeFillColor"/></dd>
                                    <dt>图形描边颜色：</dt>
                                    <dd><colorPicker v-model="strokecolor" @change="changeStrokeColor"/></dd>
                              </dl>
                              <dl>
                                    <dt>描边大小</dt>
                                    <dd><a-slider :min="2" :max="10" v-model="drawWidth" @change="changeDrawWidth"/></dd>
                              </dl>
                              <a-upload name="file" :beforeUpload="beforeUpload" class="my-upload">
                                    <a-button type="primary">
                                          <a-icon type="upload"/> 上传图片
                                    </a-button>
                              </a-upload>
                        </div>
                        
                  </a-col>
                  <a-col :span="12">
                        <div class="section2">
                              <div class="controlers">
                                    <a-button type="primary" icon="plus" @click="addText">添加文字</a-button>
                                    <span title="填充颜色" style="position: relative">
                                          <a-icon type="font-colors" />
                                          <colorPicker v-model="color" @change="changeColor"/>
                                    </span>
                                    <span title="背景/描边颜色" style="position: relative">
                                          <a-icon type="bg-colors" />
                                          <colorPicker v-model="bgcolor" @change="changeBgColor"/>
                                    </span>
                                    <span title="左对齐" @click="alignLeft"><a-icon type="align-left" /></span>
                                    <span title="居中" @click="alignCenter"><a-icon type="align-center" /></span>
                                    <span title="右对齐" @click="alignRight"><a-icon type="align-right" /></span>
                                    <span title="删除" @click="delObject"><a-icon type="delete" /></span>
                                    <span title="加粗" @click="changeFontWeight"><a-icon type="bold" /></span>
                                    <span title="倾斜" @click="changeFontStyle"><a-icon type="italic" /></span>
                                    <span title="右旋转" @click="rotateRight"><a-icon type="redo" /></span>
                                    <span title="左旋转" @click="rotateLeft"><a-icon type="undo" /></span>
                                    <span title="移动到下一层" @click="toNextLayer"><a-icon type="sort-ascending" /></span>
                                    <span title="移动倒上一层" @click="toLastLayer"><a-icon type="sort-descending" /></span>
                              </div>
                              <div class="canvas-container">
                                    <vue-fabric ref="canvas" :width="600" :height="600" @selection:created="handleselected"></vue-fabric>
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
                                                @change="(checked) => handleChange(size, checked)"
                                                class="my-tag"
                                          >
                                          {{size}} 
                                          </a-checkable-tag>
                                    </dd>
                              </dl>
                              <div class="btn-box">
                                    <a-button type="primary" @click="saveImg">保存</a-button>
                                    
                                    <a-button><a class="downLoad" download="downImg" @click="downLoadImg" :href="dataUrl">下载</a></a-button>
                              </div>
                        </div>
                        
                  </a-col>
            </a-row>
      </div>
</template>
<script>

import img1 from '@/assets/0001.png'
import img2 from '@/assets/0002.png'
import img3 from '@/assets/0003.png'
import img7 from '@/assets/0007.png'
import img8 from '@/assets/0008.png'
import img10 from '@/assets/0010.png'

import bgimg2 from '@/assets/black.jpg'
import bgimg3 from '@/assets/jaw.jpg'
import overimg1 from '@/assets/bg.png'
import overimg2 from '@/assets/bg-black.png'
import overimg3 from '@/assets/bg-jaw.png'
import resize from '@/assets/icons/resize.svg'
import remove from '@/assets/icons/remove.svg'
import rotate from '@/assets/icons/rotate.svg'

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
                  bgcolor:'#ffffff',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  underline:false,
                  fontSize:25,
                  isDrawingMode:false,
                  dataUrl:'',
                  dataPost:'',
                  bgimgs:[
                        
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
                  drawWidth:2
            }
      },
      mounted(){
            this.bindCanvas(this.selected)
      },
      methods: {
            changeDrawWidth(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text) {
                        text.drawWidth = this.drawWidth
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            changeStrokeColor(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text) {
                        text.color = this.strokecolor
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            changeFillColor(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text) {
                        text.fillColor = this.fillcolor
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            handleselected(){
                  
                 
                 
            },
            beforeUpload (file) {
                  console.log(file)
                  getBase64(file,(imageUrl) => {
                        
                        this.$refs.canvas.createImage(imageUrl,{left:300,top:300,registeObjectEvent:true,originX:'left',originY:'left'})
                  })

            },
            createRect(){
                  this.$refs.canvas.createRect({left:280,top:250,width:50,height: 50,fillColor:this.fillcolor,color:this.strokecolor,drawWidth:this.drawWidth})
            },
            createCircle(){
                  this.$refs.canvas.createCircle({left:250,top:250,fillColor:this.fillcolor,radius: 50,color:this.strokecolor,drawWidth:this.drawWidth})
            },
            createTriangle(){
                  this.$refs.canvas.createTriangle({x:300,y:250,x1:250,y1:300,x2:350,y2:300,left: 250,top:300,color:this.strokecolor,fillColor: this.fillcolor,drawWidth:this.drawWidth})
            },
            addImg(url,i){
                  
                  
                  this.$refs.canvas.createImage(url,{id:i,left:300,top:300,registeObjectEvent:true,originX:'left',originY:'left'})
                  

            },
            changeBgColor(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text.text) {
                        if (text.textBackgroundColor) {
                              this.$refs.canvas.removeCurrentObj();
                              this.left = text.left;
                              this.top = text.top;
                              this.text = text.text;
                              this.fontWeight = text.fontWeight;
                              this.fontStyle = text.fontStyle;
                              this.underline = text.underline;
                              this.fontSize = text.fontSize;
                              this.createText(this.text,this.left,this.top,this.color,this.fontSize,this.bgcolor,this.fontWeight,this.fontStyle,this.underline)
                        }
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
                  
            },
            changeColor(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  
                  if (text.text) {
                        if (text.fillColor) {
                              this.$refs.canvas.removeCurrentObj();
                              this.left = text.left;
                              this.top = text.top;
                              this.text = text.text;
                              this.fontSize = text.fontSize;
                              this.fontWeight = text.fontWeight;
                              this.fontStyle = text.fontStyle;
                              this.underline = text.underline;
                              this.createText(this.text,this.left,this.top,this.color,this.fontSize,this.bgcolor,this.fontWeight,this.fontStyle,this.underline)
                        }
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
                  
            },
            toLastLayer(){
                  this.$refs.canvas.toLastLayer()
            },
            toNextLayer(){
                  this.$refs.canvas.toNextLayer()
            },
            rotateLeft(){
                  this.$refs.canvas.setRotate(-45)
            },
            rotateRight(){
                  this.$refs.canvas.setRotate(45)
            },
            alignRight(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text && text.text) {
                        text.left = 300 + text.width
                        this.$refs.canvas.setEditObj(text)
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            alignLeft(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text && text.text) {
                        text.left = 300 - text.width*2
                        this.$refs.canvas.setEditObj(text)
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            alignCenter(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text && text.text) {
                        text.left = 300 - text.width/2
                        this.$refs.canvas.setEditObj(text)
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            changeFontStyle(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  console.log(text)
                  if (text && text.fontStyle) {
                        if (this.fontStyle == 'normal') {
                              text.fontStyle = 'italic'
                              this.fontStyle = 'italic';
                              this.$refs.canvas.setEditObj(text)
                        }else if (this.fontStyle == 'italic') {
                              text.fontStyle = 'normal'
                              this.fontStyle = 'normal'
                              this.$refs.canvas.setEditObj(text)
                        }
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            changeFontWeight(){
                  var text = this.$refs.canvas.getEditObj() || ''
                  if (text && text.fontWeight) {
                        if (this.fontWeight == 'normal') {
                              this.fontWeight = 'bold';
                              text.fontWeight = 'bold'
                              this.$refs.canvas.setEditObj(text)
                        }else if (text && text.fontWeight) {
                              this.fontWeight = 'normal'
                              text.fontWeight = 'normal'
                              this.$refs.canvas.setEditObj(text)
                        }
                        
                  }else if (text) {
                        this.$refs.canvas.setEditObj(text)
                  }
            },
            delObject(){
                  this.$refs.canvas.removeCurrentObj();
            },
            selectColor(i){
                  console.log(i)
                  this.bindCanvas(i)
                  this.selected = i
            },
            createText(text,left,top,color,fontSize,bgcolor,fontWeight,fontStyle,underline){
                  this.$refs.canvas.createTextbox(text,{left:left,top: top,fillColor:color,fontSize:fontSize,textBackgroundColor:bgcolor,fontWeight:fontWeight,fontStyle:fontStyle,underline:underline,registeObjectEvent: true})
            },
            addText(){
                  this.left = 280;
                  this.top = 200;
                  this.text = '示例';
                  this.fontSize = 25;
                  this.fontWeight = 'normal';
                  this.fontStyle = 'normal';
                  this.underline = false;
                  this.color = '#000000';
                  this.bgcolor = '#ffffff'
                  this.createText(this.text,this.left,this.top,this.color,this.fontSize,this.bgcolor,this.fontWeight,this.fontStyle,this.underline)
            },
            handleChange (tag, checked) {
                  const { selectedTags } = this
                  const nextSelectedTags = checked
                  ? [...selectedTags, tag]
                  : selectedTags.filter(t => t !== tag)
                  console.log('You are interested in: ', nextSelectedTags)
                  this.selectedTags = nextSelectedTags
            },
            
            bindCanvas(i) {
                  this.$refs.canvas.setBackgroundImage(this.bgimgs[i]);
                  this.$refs.canvas.setOverlayImage(this.overimgs[i],{
                              opacity: 1,
                              angle: 0,
                              left: 300,
                              top: 300,
                              originX: "center",
                              originY: "center"
                        }
                  );
            },
            randomColor() {
                  var letters = '0123456789ABCDEF';
                  var color = '#';
                  for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
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
            titleClick (e) {
                  console.log('titleClick', e)
            },
            downLoadImg() {
                  this.dataUrl = this.$refs.canvas.toDataUrl();
            },
            saveImg() {
                  this.dataPost = JSON.stringify(this.$refs.canvas.toJson());
            },
      },
}
</script>

<style lang="less">
      .active{
            border: 2px solid #ff59a7 !important;
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
                  .canvas-container{
                        background-color: #fff;
                        margin-top: 10px;
                        display: flex;
                        justify-content: center;
                  }
                  .controlers{
                        display: flex;
                        align-items: center;
                        .m-colorPicker{
                              position: absolute; 
                              left: 0px; 
                              bottom: 0px;
                              .colorBtn{
                                    width: 24px;
                                    height: 36px;
                                    opacity: 0;
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
                        button{
                              margin:0 10px; 
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

