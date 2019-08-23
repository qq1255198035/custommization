<template>
    <div id="Design">
        <a-modal
            v-model="show"
            :footer="null"
            width="90%"
        >
            <template slot="title">
                <div>
                        <span class="icon-logotxt" style="font-size: 35px;color: #5BA997"></span>
                </div>
            </template>
            <div class="design-box">
                <ul class="side-bar">
                    <li v-for="(item,index) in list" :key="item.className" @click="toolsBtnClick(item.key)" :class="{active: index == liClick}">
                        <span :class="item.className"></span>
                        {{item.text}}
                    </li>
                </ul>
                <div class="container">
                    <div class="canvas-container"  v-show="designModel == 0">
                        <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                    </div>
                    <div class="canvas-container"  v-show="designModel == 1">
                        <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                    </div>
                    <div class="canvas-container"  v-show="designModel == 2">
                        <canvas id="canvas3" :width="screenWidth" :height="screenWidth"></canvas>
                        
                    </div>
                    <div class="canvas-container"  v-show="designModel == 3">
                        <canvas id="canvas4" :width="screenWidth" :height="screenWidth"></canvas>
                    </div>
                    <ul class="top">
                        <li v-for="(item,index) in bgimgs" :key="index">
                            <img :src="item" alt="" @click="changeModelDesign(index)">
                        </li>
                    </ul>
                    <ul class="bottom">
                        <li @click="zoomIn">
                            <span class="icon-zoomin"></span>
                        </li>
                        <li @click="zoomOut">
                            <span class="icon-zoomout"></span>
                        </li>
                    </ul>
                </div>
                <div class="tools-box">
                    <div style="width: 100%; height: 100%;max-height: 732px; overflow-y:scroll;">
                        <div class="drawer">
                            
                            <div class="tool-box" v-show="visibletype == -1">
                                <h2>你想怎么开始？</h2>
                                <ul class="btn-box">
                                    <li @click="startTo(0)">
                                        <span class="icon-txt"></span>
                                        添加文字
                                    </li>
                                    <li @click="startTo(1)">
                                        <span class="icon-icon-image"></span>
                                        添加艺术
                                    </li>
                                    <li>
                                        <span class="icon-change_product"></span>
                                        改变产品
                                    </li>
                                </ul>
                                <p>或<a>重新开始</a></p>
                            </div>
                            <div class="tool-box1" v-show="visibletype == 0">
                                <div v-if="visibletype !== -1">
                                    <h3 style="color: #5BA997;padding-bottom: 3px; border-bottom: 1px solid #333;">图层</h3>
                                    <div class="controlers">
                                        <span title="移动到下一层" @click="toNextLayer"><a-icon type="up" /></span>
                                        <span title="移动倒上一层" @click="toPreLayer"><a-icon type="down" /></span>
                                        <span title="移动到顶层" @click="toTopLayer"><i class="icon-top_layer "></i></span>
                                        <span title="移动倒底层" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                    </div>
                                </div>
                                <div class="add-text">
                                        <p>Add Text</p>
                                        <a-input v-model="addText"></a-input>
                                        <a-button @click="addItext">Add To Design</a-button>
                                </div>
                                <div class="second">
                                        <div class="text-tool">
                                            <p>
                                                    <span @click="setObjCenter">
                                                        <i class="icon-center "></i>
                                                    </span>
                                                    Center
                                            </p>
                                            <p>
                                                    <span @click="setTextalignLeft">
                                                        <a-icon type="align-left"/>
                                                    </span>
                                                    <span @click="setTextalignCenter">
                                                        <a-icon type="align-center"/>
                                                    </span>
                                                    <span @click="setTextalignRight">
                                                        <a-icon type="align-right"/><br/>
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
                            <div class="tool-box6" v-show="visibletype == 1">
                                <div v-if="visibletype !== -1">
                                    <h3 style="color: #5BA997;padding-bottom: 3px; border-bottom: 1px solid #333;">图层</h3>
                                    <div class="controlers">
                                        <span title="移动到下一层" @click="toNextLayer"><a-icon type="up" /></span>
                                        <span title="移动倒上一层" @click="toPreLayer"><a-icon type="down" /></span>
                                        <span title="移动到顶层" @click="toTopLayer"><i class="icon-top_layer "></i></span>
                                        <span title="移动倒底层" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                    </div>
                                </div>
                                <h3>艺术插图：</h3>
                                <div  style="padding-bottom: 10px; border-bottom: 1px solid #ccc;">
                                    <a-input-search @search="onSearch"/>
                                </div>
                                <dl :key="img.className" v-for="(img,index) in imgs" @click="addImg(img,index)">
                                    <dt>
                                        <p @click="moreImgs(index + 11)">
                                            <span>{{img.className}}</span>
                                            <a-icon type="right" />
                                        </p>
                                    </dt>
                                    <dd v-for="(item,index) in img.imgURL" :key="item + index">
                                        <img :src="item" alt="">
                                    </dd>
                                </dl>
                                <div class="upload-box">
                                    <h4>请选择要上传的文件</h4>
                                    <a-upload-dragger name="file" class="my-upload" :beforeUpload="beforeUpload">
                                            <p class="ant-upload-drag-icon">
                                                <a-icon type="cloud" />
                                            </p>
                                            <p class="ant-upload-text">拖放或浏览您的计算机</p>
                                    </a-upload-dragger>
                                    <p>接受的文件类型(最大大小： 10MB)</p>
                                    <p>
                                        <span>.jpg</span>
                                        <span>.png</span>
                                    </p>
                                </div>
                                
                            </div>
                           
                            <div class="tool-box3" v-show="visibletype == 7">
                                <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 0"/>
                                </h2>
                                <ul class="font-family-list">
                                    <li v-for="item in fontFamilyArr" :key="item.id" @click="changeFontFamily(item.name)">
                                        <span :style="{fontFamily: item.name}" >ABC</span>
                                        <span>{{item.name}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="tool-box4" v-show="visibletype == 8">
                                <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 0"/>
                                </h2>
                                <ul class="font-color-list">
                                        <li v-for="item in fontColorArr" :key="item.name" :style="{backgroundColor: item.color}" @click="changeFillColor(item.color,item.name)"></li>
                                </ul>
                            </div>
                            <div class="tool-box5" v-show="visibletype == 9">
                                <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 0"/>
                                </h2>
                                <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth"/>
                                <ul class="font-color-list">
                                        <li v-for="item in fontColorArr" :key="item.name" :style="{backgroundColor: item.color}" @click="changestrokeColor(item.color)"></li>
                                </ul>
                            </div>
                             <div class="tool-box2" v-show="visibletype == 10">
                                <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 1"/>
                                </h2>
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
                            <div class="tool-box7" v-show="visibletype == 11">
                                 <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 1"/>
                                </h2>
                                <ul>
                                    <li v-for="(item,index) in imgs[0].imgURL" :key="index">
                                        <img :src="item" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="tool-box7" v-show="visibletype == 12">
                                 <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                    <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 1"/>
                                </h2>
                                <ul>
                                    <li v-for="(item,index) in imgs[1].imgURL" :key="index">
                                        <img :src="item" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import FontFaceObserver from 'fontfaceobserver';
import initAligningGuidelines from "@/utils/guidelines";
import imgUrl from '@/assets/jaw.jpg';
import imgUrl1 from '@/assets/black.jpg';
import resize from '@/assets/icons/resize.svg';
import remove from '@/assets/icons/remove.svg';
import rotate from '@/assets/icons/rotate.svg';
import diagonal from "@/assets/icons/repair-tools-cross.svg";
import img1 from '@/assets/0001.png';
export default {
    data(){
        return{
            color:'#000000',
            bgcolor:'#000000',
            resize,
            remove,
            rotate,
            diagonal,
            show: true,
            liClick: -1,
            designModel: 0,
            screenWidth: 600,
            myCanvas1: null,
            myCanvas2: null,
            myCanvas3: null,
            myCanvas4: null,
            visibletype:-1,
            transitionName:'vux-pop-in',
            strokeWidth:0,
            skewx:0,
            skewy:0,
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
            filpx:false,
            filpy:false,
            fontfamily:'',
            colorName:'',
            rotateNum:0,
            addText:'',
            lineHeight: 1,
            opacity:1,
            bgimgs:[
                imgUrl,
                imgUrl1,
                imgUrl,
                imgUrl1
            ],
            imgs:[
                {
                    className: '图片',
                    imgURL:[img1]
                },
                {
                    className: '剪贴画',
                    imgURL:[
                        img1,img1,img1,img1,img1,
                    ]
                }
            ],
            list:[
                {
                    key:0,
                    className: 'icon-txt',
                    text: '文字'
                },
                {
                    key:1,
                    className: 'icon-icon-image',
                    text: '图片'
                },
                {
                    key:2,
                    className: 'icon-No',
                    text: '号码'
                },
                {
                    key:3,
                    className: 'icon-ling',
                    text: '领型'
                },
                {
                    key:4,
                    className: 'icon-color',
                    text: '产品颜色'
                },
                {
                    key:5,
                    className: 'icon-bz',
                    text: '设计备注'
                },
                {
                    key:6,
                    className: 'icon-cankao',
                    text: '参考图片'
                }
            ]
        }
    },
    mounted(){
        this.$nextTick(function() {
            this.myCanvas1 = new fabric.Canvas("canvas1");
            this.myCanvas2 = new fabric.Canvas("canvas2");
            this.myCanvas3 = new fabric.Canvas("canvas3");
            this.myCanvas4 = new fabric.Canvas("canvas4");
            this.myCanvas = this.myCanvas1
            initAligningGuidelines(this.myCanvas1);
            initAligningGuidelines(this.myCanvas2);
            initAligningGuidelines(this.myCanvas3);
            initAligningGuidelines(this.myCanvas4);
            this.handleObjectMove(this.myCanvas1);
            this.handleObjectMove(this.myCanvas2);
            this.handleObjectMove(this.myCanvas3);
            this.handleObjectMove(this.myCanvas4);
            this.bindCanvas(this.myCanvas1,0);
            this.setEditIcon();
            this.setEditPointer();
            
        })
        
    },
    methods:{
        moreImgs(i){
            this.visibletype = i;
        },
        beforeUpload (file) {
            console.log(file)
            this.uploadId ++;
            if(file.type == 'image/png' || file.type == 'image/jpeg'){
                if(file.size / 1024 / 1024 < 10){
                    this.getBase64(file,(imageUrl) => {
                        this.selectImg(imageUrl,'upload' + this.uploadId);
                    })
                }else{
                    this.$message.error('图片大小超出限制！')
                }
            }else{
                this.$message.error('格式错误，请重新选择！')
            }
        },
        getBase64 (img, callback) {
            const reader = new FileReader()
            reader.addEventListener('load', () => callback(reader.result))
            reader.readAsDataURL(img)
        },
        onSearch (value) {
            console.log(value)
        },
        startTo(i){
            this.visibletype = i;
            this.liClick = i;
        },
        addImg(imgUrl,id){
            this.selectImg(imgUrl,id);
        },
        selectImg(imgUrl,id) {
            let that = this;
            fabric.Image.fromURL(imgUrl, function(oImg) {
                oImg.on("selected", function() {
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
        toolsBtnClick(key){
            this.liClick = key;
            if(this.visibletype !== key){
                
                this.visibletype = key;
            }
        },
        bindCanvas(canvas,i) {
            var that = this
            canvas.setBackgroundImage(that.bgimgs[i],canvas.renderAll.bind(canvas),{
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
        zoomIn(){
            var zoom = this.myCanvas.getZoom();
            console.log(zoom)
            zoom = zoom + 0.4;
            if (zoom > 1.4) zoom = 1.4;
            this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
        },
        zoomOut(){
            var zoom = this.myCanvas.getZoom();
            console.log(zoom)
            zoom = zoom - 0.4;
            if (zoom < 1) zoom = 1;
            this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
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
        setObjCenter(){
            let t = this.myCanvas.getActiveObject();
            t.center();
            t.setCoords(); 
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
        setTextRotate(){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                obj.rotate(this.rotateNum);
                this.myCanvas.requestRenderAll();
            }
        },
        openFontFamilyBox(){
            this.visibletype = 7;
        },
        openFontColorBox(){
            this.visibletype = 8;
        },
        openFontOutlineBox(){
            this.visibletype = 9;
        },
        changeLineHeight(){
            let that = this;
            let obj = that.myCanvas.getActiveObject()
            if (obj) {
                obj.set("lineHeight", that.lineHeight);
                that.myCanvas.requestRenderAll();
            }
        },
        changeOpacity(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set("opacity", this.opacity);
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
        changeFontFamily(value){
            console.log(`selected ${value}`);
            this.fontfamily = value;
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
        changeFillColor(val,name){
            let obj = this.myCanvas.getActiveObject();
            this.color = val;
            if (obj) {
                obj.set("fill", val);
                this.myCanvas.requestRenderAll();
            }
            this.colorName = name;
        },
        changestrokeColor(val){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('stroke', val);
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
        setEditPointer(){
            let that = this;
            fabric.Canvas.prototype.customiseControls({
                tr: {
                        action: "scale"
                },
                br: {
                        action: function(e, target) {
                            that.myCanvas.remove(target);
                        },
                        cursor: "pointer"
                },
                bl: {
                        action: function(e, target) {
                            console.log(target);
                            if(that.liClick == 0){
                                that.visibletype = 0
                            }else if(that.liClick == 1){
                                that.visibletype = 10
                            }
                        },
                        cursor: "pointer"
                },
                mtr: {
                        action: "rotate"
                }
            });
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
                    bl: {
                        icon: diagonal,
                        settings: {
                                cornerBackgroundColor: that.randomColor()
                        }
                    },
                    br: {
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
        randomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
    },
    filters:{
        sliceArr(arr){
            return arr.slice(0,2)
        }
    }
}
</script>
<style lang="less" scoped>
@import url("./../../assets/style.css");
@import url("./../../components/index.less");
@font-face {
    font-family:'testFont';
    src:url('https://cdnjs.loli.net/ajax/libs/MaterialDesign-Webfont/3.8.95/fonts/materialdesignicons-webfont.ttf')
}
#Design{

}

.design-box{
    display: flex;
    
    .active{
        background-color: #fff;
        color: #5BA997 !important;
        span{
            color: #5BA997;
        }
    }
    .side-bar{
        width: 80px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #F2F2F3;
        margin: 0;
        border-radius: 0 0 0 10px;
        li{
            display: flex;
           
            width: 100%;
            padding: 15px 0 10px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #7F7F7F;
            font-size: 16px;
            
            cursor: pointer;
            span{
                font-size: 24px;
            }
        }
    }
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        min-width: 640px;
        padding: 20px;
        position: relative;
        .top{
            position: absolute;
            right: 20px;
            top: 20px;
            li{
                width: 40px;
                height: 40px;
                border: 1px solid #ccc;
                margin-bottom: 10px;
                cursor: pointer; 
                img{
                    width: 100%;
                }
            }
        }
        .bottom{
            position: absolute;
            right: 20px;
            bottom: 20px;
            li{
                margin-top: 15px;
                cursor: pointer;
                span{
                    color: #5BA997;
                    font-size: 25px;
                }
            }
            
        }
    }
    .tools-box{
        width: calc(30% - 80px);
        background-color: #F6F6F6;
        overflow: hidden;
        border-radius:  0 0 10px 0;
        .drawer{
            width: 100%;
            border-radius: 10px;
            padding: 20px 10px;
            
            .controlers{
                    display: flex;
                    align-items: center;
                    > span{
                        font-size: 24px;
                        margin: 0 10px;
                        cursor: pointer;
                        color: #5BA997;
                    }
            }
            .tool-box{
                h2{
                    color: #5BA997;
                    text-align: center;
                    padding: 50px 0;
                }
                p{
                    text-align: center;
                    margin: 50px 0;
                    color: #333;
                    a{
                        color: #5BA997;
                    }
                }
                .btn-box{
                    display: flex;
                    width: 60%;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    margin: 0 auto;
                    align-items: flex-start;
                    li{
                        width: 36%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 10px 7%;
                        border: 1px solid #666;
                        border-radius: 10px;
                        color: #333;
                        padding: 15px 5px;
                        cursor: pointer;
                        span{
                            font-size: 20px;
                            margin-bottom: 5px;
                        }
                        &:hover{
                            border-color: #5BA997;
                            color: #5BA997;
                            span{
                                color: #5BA997;
                            }
                        }
                    }
                }
            }
            .tool-box1{
                    .second{
                        padding: 10px;
                        border-radius: 6px;
                        .text-tool{
                            display: flex;
                            margin: 30px 0;
                            p{
                                text-align: center;
                                margin: 0 10px;
                                span{
                                        border: 1px solid #5BA997;
                                        border-radius: 4px;
                                        display: inline-block;
                                        padding: 4px 10px;
                                        margin: 0 2px;
                                        cursor: pointer;
                                        i{
                                            color: #5BA997;
                                            font-size: 20px;
                                        }
                                }
                                &:nth-child(2){
                                    span{
                                        margin: 0;
                                        &:nth-child(1){
                                            border-top-right-radius: 0;
                                            border-bottom-right-radius: 0;
                                        }
                                        &:nth-child(2){
                                            border-radius: 0;
                                            border-left: none;
                                            border-right: none;
                                        }
                                        &:nth-child(3){
                                            border-top-left-radius: 0;
                                            border-bottom-left-radius: 0;
                                        }
                                    }
                                }
                            }
                                
                        }
                        
                    }
                    
                    .add-text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 20px 0;
                        p{
                            color: #333;
                        }
                        input{
                                margin: 10px 0;
                        }
                    }
                    .tool-list{
                        margin-top: 10px;
                        padding-top: 10px;
                        border-top: 1px solid #5BA997;
                        .square{
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                margin-left: 5px;
                        }
                        li{
                                padding: 10px 0;
                                border-bottom:1px solid #5BA997; 
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                cursor: pointer;
                                > span{
                                    color: #5BA997;
                                }
                                p{
                                    display: flex;
                                    align-items: center;
                                    margin: 0;
                                    span{
                                            margin-right: 5px;
                                            display: flex;
                                            align-items: center;
                                            
                                    }
                                }
                                
                        }
                    }
            }
            .tool-box2{
                dl{
                    margin-top: 30px;
                }
            }
            .tool-box3{
                    .font-family-list{
                        margin-top: 20px;
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
                                background-color: #5BA997;
                                color: #fff;
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
            .tool-box6{
                h3{
                    padding: 10px 0;
                    border-bottom: 1px solid #ccc;
                    color: #5BA997;
                }
                .upload-box{
                    h4{
                        color: #5BA997;
                        margin: 10px 0 15px;
                    }
                    p{
                        color: #ccc;
                        margin: 10px 0;
                        span{
                            background-color: #fff;
                            margin: 0 2px;
                            padding: 0 2px 2px;
                        }
                    }
                }
                dl{
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    dt{
                        p{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 0;
                            cursor: pointer;
                            i{
                                font-size: 12px;
                            }
                        }
                        span{
                            color: #5BA997;

                        }
                    }
                    dd{
                        padding: 10px;
                        width: 50%;
                        height: auto;
                        display: inline-block;
                        margin: 0;
                        cursor: pointer;
                        img{
                                width: 100%;
                                max-width: 168px;
                                max-height: 83px;
                        }
                    }
                }
            }
            .tool-box7{
                ul{
                    margin: 0;
                    li{
                        margin: 0;
                        padding: 10px;
                        width: 50%;
                        height: auto;
                        display: inline-block;
                        margin: 0;
                        cursor: pointer;
                        img{
                                width: 100%;
                                max-width: 168px;
                                max-height: 83px;
                        }
                    }
                }
            }
        }
    }
}
</style>