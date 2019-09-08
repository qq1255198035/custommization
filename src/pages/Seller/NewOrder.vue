<template>
    <div id="NewOrder">
        <div class="content">
            <a-row style="min-height: 100%;height: 100%;">
                <a-col :span="6" style="height: 100%;">
                    <div class="left">
                        <My-Header></My-Header>
                        <a-menu
                            mode="inline"
                            :defaultSelectedKeys="['sub00']" 
                            :openKeys="openKeys"
                            @click="handleClick"
                            @openChange="onOpenChange"
                        >
                            <a-sub-menu  v-for="(item, index) in menuList" :key="index.toString()">
                                <span slot="title" style="display: flex;align-items: center;"><a-avatar :size="20" :src="item.icon" style="margin-right: 5px;"/><span>{{item.title}}</span></span>
                                <a-menu-item v-for="(sub,sindex) in item.subMenu" :key="'sub'+ index + sindex.toString()" @click="handleGetList(sub.categoryId)">{{sub.title}}</a-menu-item>
                            </a-sub-menu>
                        </a-menu>
                    </div>
                </a-col>
                <a-col :span="18" style="height: 100%;">
                    <User style="background-color: #fff; padding-top: 20px;border-top-right-radius: 10px;"></User>
                    
                    <div class="right">
                        <my-title :title="'新建订单'" :fontsize="20">
                            <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.push({path:'/grouporder'})">返回</a-button>
                        </my-title>
                        <goods-list :goodsArr="goodsList" @on-click="openDesignModal($event)"></goods-list>
                        <div class="btn-box">
                            <a-button :loading="loading" @click="loadMore" :disabled="btnable">
                                加载更多
                            </a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        
        <div id="Design" v-show="show">
            <a-modal
                :visible="true"
                :footer="null"
                width="90%"
                :centered="true"
                style="padding: 0;"
                @cancel="closeDesignBox"
                :getContainer="Ele"
            >
                <template slot="title">
                    <div>
                            <img src="@/assets/logo-title.png" alt="" height="60">
                    </div>
                </template>
                <div id="DesignBox">
                    <div class="design-box">
                        <ul class="side-bar">
                            <li v-for="item in list" :key="item.className" @click="toolsBtnClick(item.key)" :class="{active: item.key == liClick}">
                                <span :class="item.className"></span>
                                {{item.text}}
                            </li>
                            <li @click="$router.push({path: '/neworder'})">
                                <span class="icon-change_product"></span>
                                更换产品
                            </li>
                        </ul>
                        <div class="container">
                            <h2>CUSTOM KING T-Shirt<span>查看尺寸表</span></h2>
                            <div class="canvas-container"  v-show="designModel == 0">
                                <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: '200px',height: '300px',top: '150px', left: '200px'}" v-show="movingBox">
                                    成人
                                    <div>
                                        儿童
                                    </div>
                                    <div>胸章</div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 1">
                                <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: '200px',height: '300px',top: '150px', left: '200px'}" v-show="movingBox">
                                    成人
                                    <div>
                                        儿童
                                    </div>
                                    <div>胸章</div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 2">
                                <canvas id="canvas3" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: '200px',height: '300px',top: '150px', left: '200px'}" v-show="movingBox">
                                    成人
                                    <div>
                                        儿童
                                    </div>
                                    <div>胸章</div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 3">
                                <canvas id="canvas4" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: '200px',height: '300px',top: '150px', left: '200px'}" v-show="movingBox">
                                    成人
                                    <div>
                                        儿童
                                    </div>
                                    <div>胸章</div>
                                </div>
                            </div>
                            <a-row class="top">
                                <a-col v-for="(item,index) in bgimgs" :key="index" :span="3" class="li" @click="changeModelDesign(index)">
                                    <img :src="item" alt="">
                                </a-col>
                            </a-row>
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
                            <div style="" class="scroll-box">
                                <div class="drawer">
                                    <div class="tool-box" v-show="visibletype == -1">
                                        <h2>你想怎么开始？</h2>
                                        <ul class="btn-box">
                                            <li @click="startTo(0)" v-intro="'The content of tooltip'" v-intro-step="1" class="active-btn">
                                                <span class="icon-txt"></span>
                                                添加文字
                                            </li>
                                            <li @click="startTo(1)">
                                                <span class="icon-icon-image"></span>
                                                添加艺术
                                            </li>
                                        </ul>
                                        <ul class="btn-box">
                                            <li @click="startTo(6)">
                                                <span class="icon-upload"></span>
                                                上传设计
                                            </li>
                                            <li @click="$router.push({path: '/neworder'})">
                                                <span class="icon-change_product"></span>
                                                改变产品
                                            </li>
                                        </ul>
                                        <p>或<a>重新开始</a></p>
                                    </div>
                                    <div class="tool-box1" v-show="visibletype == 0">
                                        <!-- <div v-if="visibletype !== -1">
                                            <h3 style="color: #33b8b3;padding-bottom: 3px; border-bottom: 1px solid #333;">图层</h3>
                                            <div class="controlers">
                                                <span title="移动到下一层" @click="toNextLayer"><a-icon type="up" /></span>
                                                <span title="移动倒上一层" @click="toPreLayer"><a-icon type="down" /></span>
                                                <span title="移动到顶层" @click="toTopLayer"><i class="icon-top_layer "></i></span>
                                                <span title="移动倒底层" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                            </div>
                                        </div> -->
                                        <h2 style="color: #33b8b3;text-align: left; border-bottom: 1px solid #999; padding-bottom: 5px; font-size: 18px;">
                                            <!-- <a-icon type="left" style="cursor: pointer;" @click="visibletype = -1"/> -->
                                            添加文字
                                        </h2>
                                        <div class="add-text">
                                            <p>Add Text</p>
                                            <a-input v-model="addText"></a-input>
                                            <a-button type="primary" @click="addItext" :disabled="!addText" style="border-radius: 12px;">添加设计</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box6" v-show="visibletype == 1">
                                        <!-- <div v-if="visibletype !== -1">
                                            <h3 style="color: #33b8b3;padding-bottom: 3px; border-bottom: 1px solid #333;">图层</h3>
                                            <div class="controlers">
                                                <span title="移动到下一层" @click="toNextLayer"><a-icon type="up" /></span>
                                                <span title="移动倒上一层" @click="toPreLayer"><a-icon type="down" /></span>
                                                <span title="移动到顶层" @click="toTopLayer"><i class="icon-top_layer "></i></span>
                                                <span title="移动倒底层" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                            </div>
                                        </div> -->
                                        <h3>艺术插图：</h3>
                                        <div  style="padding-bottom: 10px; border-bottom: 1px solid #ccc;">
                                            <a-input-search @search="onSearch"/>
                                        </div>
                                        <dl v-for="img in imgs" :key="img.className">
                                            <dt>
                                                <p @click="moreImgs">
                                                    <span>{{img.className}}</span>
                                                    <a-icon type="right" />
                                                </p>
                                            </dt>
                                            <dd v-for="(item,index) in img.imgURL" :key="item + index" @click="addImg(item,'img'+index)">
                                                <img :src="item" alt="">
                                            </dd>
                                        </dl>
                                        <div class="upload-box">
                                            <h4>请选择要上传的文件</h4>
                                            <a-upload-dragger name="file" class="my-upload" :beforeUpload="beforeUpload">
                                                    <p class="ant-upload-drag-icon">
                                                        <a-icon type="cloud-upload" />
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
                                    <div class="tool-box8" v-show="visibletype == 2">
                                        <dl>
                                            <dt>
                                                名字和号码：
                                            </dt>
                                            <dd>
                                                <span style="min-width: 52px;">步骤1：</span>
                                                <div>
                                                    <p>
                                                        <a-checkbox @change="addName">添加名称</a-checkbox>
                                                    </p>
                                                    <p>
                                                        <a-checkbox @change="addNumber">添加号码</a-checkbox>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>位置：</span>
                                                <div>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 95%;" @change="changeNamePosition">
                                                            <a-select-option value="0">胸部</a-select-option>
                                                            <a-select-option value="1">背部</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 100%;" @change="changeNumberPosition">
                                                            <a-select-option value="0">胸部</a-select-option>
                                                            <a-select-option value="1">背部</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>高度：</span>
                                                <div>
                                                    <p>
                                                        <a-select defaultValue="6cm" style="width: 95%;" @change="changeNameSize">
                                                            <a-select-option value="20">6cm</a-select-option>
                                                            <a-select-option value="30">7cm</a-select-option>
                                                            <a-select-option value="40">8cm</a-select-option>
                                                            <a-select-option value="50">9cm</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="15cm" style="width: 100%;" @change="changeNumberSize">
                                                            <a-select-option value="150">15cm</a-select-option>
                                                            <a-select-option value="170">18cm</a-select-option>
                                                            <a-select-option value="190">20cm</a-select-option>
                                                            <a-select-option value="200">25cm</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>字体：</span>
                                                <div>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 95%;">
                                                            <a-select-option value="0">黑体</a-select-option>
                                                            <a-select-option value="1">2英寸</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 100%;">
                                                            <a-select-option value="0">黑体</a-select-option>
                                                            <a-select-option value="1">2英寸</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>颜色：</span>
                                                <div class="color-picker">
                                                    <p>
                                                        黑色<span :style="{backgroundColor: 'black'}" @click="openChangeColorBox(5,'名称颜色')"></span>
                                                    </p>
                                                    <p>
                                                        黑色<span :style="{backgroundColor: 'black'}" @click="openChangeColorBox(6,'号码颜色')"></span>
                                                    </p>
                                                </div>
                                            </dd>
                                        </dl>
                                        <div style="text-align: center;">
                                            <a-button type="primary" :disabled="!addNameData && !addNumberData" @click="visibletype = 9">
                                                输入号码和名称
                                            </a-button>
                                        </div>
                                    </div>

                                    <div class="tool-box9" v-show="visibletype == 3">
                                        <my-title :title="'添加文字'"></my-title>
                                        <div class="second">
                                            <div class="text-tool">
                                                
                                                <div class="text-align">
                                                        <span @click="setTextalignLeft">
                                                            <a-icon type="align-left"/>
                                                        </span>
                                                        <span @click="setTextalignCenter">
                                                            <a-icon type="align-center"/>
                                                        </span>
                                                        <span @click="setTextalignRight">
                                                            <a-icon type="align-right"/><br/>
                                                        </span>
                                                        <p>对齐方式</p>
                                                </div>
                                                <div class="font-style">
                                                        <span @click="setFontWeight">
                                                            <a-icon type="bold" />
                                                        </span>
                                                        <span @click="setFontStyle">
                                                            <a-icon type="italic" />
                                                        </span>
                                                        <span @click="setTextDown">
                                                            <a-icon type="underline" />
                                                        </span>
                                                        <span @click="setTextThrough">
                                                            <a-icon type="strikethrough" />
                                                        </span>
                                                        <br/>
                                                        <p>字体样式</p>
                                                </div>
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
                                            <li @click="openChangeColorBox(1,'字体颜色')">
                                                <span>字体颜色</span>
                                                <p>
                                                    <span>{{colorName}} <i class="square" :style="{backgroundColor:color}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                            <li @click="openChangeColorBox(2,'字体背景颜色')">
                                                <span>字体背景颜色</span>
                                                <p>
                                                    <span>{{fontBgColorName}} <i class="square" :style="{backgroundColor:bgcolor}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                        </ul>
                                        <dl class="stroke-style">
                                            <dt class="title">描边</dt>
                                            <dd @click="openChangeColorBox(3,'描边颜色')">
                                                <span>颜色：</span>
                                                <p>
                                                        <span>{{strokeColorName}} <i class="square" :style="{backgroundColor: strokeColor}"></i></span>
                                                        <a-icon type="right" />
                                                </p>
                                            </dd>
                                            <dd>
                                                <span>大小：</span>
                                                <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth" style="width: 85%;margin:0;"/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt class="title">阴影</dt>
                                            <dd @click="openChangeColorBox(4,'阴影颜色')">
                                                <span>颜色：</span>
                                                <p>
                                                    <span>{{shadowColorName}} <i class="square" :style="{backgroundColor: shadowColor}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </dd>
                                            <dd>
                                                <span>大小：</span>
                                                <div style="width: 85%;">
                                                    <a-slider :min="-10" :max="10" v-model="Shadow1" :step="1" @change="changeShadowWidth1" style="width: 100%;margin: 10px 0;"/>
                                                    <a-slider :min="-10" :max="10" v-model="Shadow2" :step="1" @change="changeShadowWidth2" style="width: 100%;margin: 10px 0;"/>
                                                    <a-slider :min="0" :max="10" v-model="Shadow3" :step="1" @change="changeShadowWidth3" style="width: 100%;margin: 10px 0;"/>
                                                </div>
                                            </dd>
                                        </dl>
                                        <p><a>重置</a>或<a>重新开始</a></p>
                                    </div>
                                    <div class="tool-box10" v-show="visibletype == 4">
                                        <h2>颜色：</h2>
                                        <p>选择颜色： <span :style="{backgroundColor: '#fff'}"></span> 白色</p>
                                        <ul class="color-list">
                                            <li v-for="(item,index) in colorList" :key="index" :style="{backgroundColor: item.color}" @click="changeProductColor(index)">
                                                <a-icon type="check" v-show="productColorIcon == index"/>
                                            </li>
                                        </ul>
                                        <div style="text-align: center; margin-top: 20px;">
                                            <a-button type="primary">保存更改</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box11" v-show="visibletype == 5">
                                        <h2>设计备注：</h2>
                                        <a-textarea placeholder="Basic usage" :rows="8" v-model="remark"/>
                                        <div style="text-align: center;margin-top: 10px;">
                                            <a-button type="primary" :disabled="!remark">保存更改</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box12" v-show="visibletype == 6">
                                        <h2>参考图片：</h2>
                                        <div class="upload-box">
                                            <a-button type="primary" @click="example = true">
                                                上传照片
                                            </a-button>
                                            <p>
                                                可以上传您喜欢的设计作为参考，并附加说明
                                            </p>
                                        </div>
                                        <ul class="info-list">
                                            <li v-for="(item,index) in dataList" :key="index">

                                                <img src="@/assets/0001.png" alt="" width="100" height="100">
                                                <div>
                                                    <p>{{item.title}}</p>
                                                    <span>
                                                        <a-icon type="delete" />
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box3" v-show="visibletype == 7">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="visibletype = 3"/>
                                        </h2>
                                        <ul class="font-family-list">
                                            <li v-for="item in fontFamilyArr" :key="item.id" @click="changeFontFamily(item.name)">
                                                <span :style="{fontFamily: item.name}" >ABC</span>
                                                <span>{{item.name}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box4" v-show="visibletype == 8">
                                        <h2 style="color: #33b8b3;text-align: left; border-bottom: 1px solid #999; padding-bottom: 5px; font-size: 18px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="goBackPage"/>
                                            {{colorTitle}}
                                        </h2>
                                        <!-- <my-title :title="colorTitle"></my-title> -->
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;">选择颜色： <span :style="{backgroundColor: color}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{colorName}}</p>
                                        <ul class="color-list-box">
                                            <li v-for="(item,index) in colorList" :key="item.name" :style="{backgroundColor: item.color}" @click="changeAllColor(item.color,item.name,index)">
                                                <a-icon type="check" v-show="fontColorIcon == index"></a-icon>
                                            </li>
                                        </ul>
                                        <div style="text-align: center;">
                                            <a-button type="primary" style="font-size: 18px;height: 45px;padding: 0 30px;border-radius: 12px;">保存更改</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box5" v-show="visibletype == 9">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="goBackPage"/>
                                        </h2>
                                        <h3>名字和号码</h3>
                                        <div>
                                            <ul style="display:flex;background-color: #ccc;padding: 5px 0;">
                                                <li style="width: 40%; color:#33b8b3;padding-left: 10px;">名称</li>
                                                <li style="width: 20%; color:#33b8b3;padding-left: 10px;">号码</li>
                                                <li style="width: 30%; color:#33b8b3;padding-left: 10px;">尺寸</li>
                                            </ul>
                                            <a-form
                                                :form="form1"
                                                @submit="handleSubmit"
                                            >
                                                <a-form-item v-for="k in form1.getFieldValue('keys')" :key="k" :required="false" style="width: 100%; margin: 0">
                                                    <a-input-group compact style="display: flex; align-items: center;width: 100%;">
                                                        <a-form-item style="width: 40%; margin: 0;min-height: 58px;">
                                                            <a-input v-decorator="[
                                                                `names[${k}]`,
                                                                {
                                                                    validateTrigger: ['change', 'blur'],
                                                                    rules: [{
                                                                    required: addNameData,
                                                                    whitespace: true,
                                                                    message: '请填写名称',
                                                                    }],
                                                                }
                                                                ]"
                                                                :disabled="!addNameData"
                                                                placeholder="名称" 
                                                                style="width: 100%;border-top-right-radius: 0px;border-bottom-right-radius: 0px; border-right: none;"/>
                                                            </a-form-item>
                                                        
                                                            <a-form-item style="width: 20%; margin: 0;min-height: 58px;">
                                                                <a-input v-decorator="[
                                                                `number[${k}]`,
                                                                {
                                                                    validateTrigger: ['change', 'blur'],
                                                                    rules: [{
                                                                    required: addNumberData,
                                                                    whitespace: true,
                                                                    message: '请填写名称',
                                                                    }],
                                                                }
                                                                ]"
                                                                :disabled="!addNumberData"
                                                                placeholder="名称" style="width: 100%;border-radius: 0;border-right: none"/>
                                                            </a-form-item>
                                                            <a-form-item style="width: 30%; margin: 0;min-height: 58px;">
                                                                <a-select 
                                                                    v-decorator="[
                                                                        `size[${k}]`,
                                                                        {
                                                                            rules: [{
                                                                            required: true,
                                                                            message: '请填写尺寸',
                                                                            }],
                                                                        }
                                                                        ]"
                                                                        style="width: 100%; border-top-left-radius: 0;border-bottom-left-radius: 0;"
                                                                        placeholder="尺寸"
                                                                >
                                                                    <a-select-option value="Zhejiang">Zhejiang</a-select-option>
                                                                    <a-select-option value="Jiangsu">Jiangsu</a-select-option>
                                                                </a-select>
                                                            </a-form-item>
                                                            <a-icon
                                                                v-if="form1.getFieldValue('keys').length > 1"
                                                                class="dynamic-delete-button"
                                                                type="minus-circle-o"
                                                                :disabled="form1.getFieldValue('keys').length === 1"
                                                                @click="() => removeInput(k)"
                                                            />
                                                            
                                                    </a-input-group>
                                                    
                                                </a-form-item> 
                                                <a-form-item>
                                                <a
                                                    type="dashed"
                                                    style="width: 60%;color: #33b8b3"
                                                    @click="add"
                                                >
                                                    <a-icon type="plus" /> 添加更多
                                                </a>
                                                </a-form-item>
                                                <a-form-item style="text-align: center;">
                                                <a-button
                                                    type="primary"
                                                    html-type="submit"
                                                >
                                                    保存
                                                </a-button>
                                                </a-form-item>
                                            </a-form>
                                        </div>
                                    
                                    </div>
                                    <div class="tool-box2" v-show="visibletype == 10">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="visibletype = 1"/>
                                        </h2>
                                        <ul class="first">
                                            <li class="set-obj-center">
                                                <p @click="setObjCenter">
                                                    <i class="icon-center "></i>
                                                </p>
                                                Center
                                            </li>
                                            <li class="set-layer">
                                                <span title="移动到顶层" @click="toTopLayer"><i class="icon-top_layer "></i></span>
                                                
                                                <span title="移动倒底层" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                                <p>分层</p>
                                            </li>
                                            <li class="set-filp">
                                                <span title="移动到顶层" @click="changeFilPx"><a-icon type="vertical-left" /></span>
                                                <span title="移动倒底层" @click="changeFilPy"><a-icon type="vertical-left" style="transform:rotate(90deg)"/></span>
                                                <p>翻转</p>
                                            </li>
                                        </ul>
                                        <div class="set-rotate">
                                            <p>旋转</p>
                                            <a-slider :min="0" :max="360" :step="10" @change="setRotate" v-model="rotateNum"/>
                                        </div>
                                        <ul class="tool-list">
                                            <li>
                                                <span>删除白色</span>
                                                <a-switch v-model="delWhite"/>
                                            </li>
                                        </ul>
                                        
                                        <!-- <dl>
                                                <dt>
                                                    透明度：
                                                </dt>
                                                <dd>
                                                    <a-slider :min="0" :max="1" v-model="opacity" :step="0.1" @change="changeOpacity"/>
                                                </dd>
                                        </dl> -->
                                        <!-- <ul style="display: flex;justify-content: space-around;margin:20px 0">
                                            <li>
                                                X轴翻转：
                                                <a-switch @change='changeFilPx' v-model="filpx"/>
                                            </li>
                                            <li>
                                                Y轴翻转：
                                                <a-switch @change='changeFilPy' v-model="filpy"/>
                                            </li>
                                        </ul>          -->
                                        <!-- <ul>
                                                <li>
                                                    X轴斜切：
                                                    <a-slider :min="0" :max="80" :step="1" @change='changeSkewX' v-model="skewx"/>
                                                </li>
                                                <li>
                                                    Y轴斜切：
                                                    <a-slider :min="0" :max="80" :step="1" @change='changeSkewY' v-model="skewy"/>
                                                </li>
                                        </ul> -->

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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="submit-box">
                        <li>每件价格 <span>$26.40 To $51.2</span></li>
                        <li>
                            <a-button icon="plus" v-intro="'The content of tooltip'" v-intro-step="2" @click="$router.push({path: '/neworder'})">添加产品</a-button>
                            <a-button type="primary" v-intro="'The content of tooltip'" v-intro-step="3"><span class="icon-save" style="margin-right: 10px;vertical-align: middle"></span><a @click="saveEndDesign">保存设计</a></a-button>
                        </li>
                    </ul>
                </div>
            </a-modal>
            <a-modal
                v-model="example"
                title="参考图片上传："
                :centered="true"
                width="45%"
                :footer="null"
            >
                <div class="upLoadExampleImg">
                    <a-form :form="form" style="display: flex;justify-content: space-between;">
                        <a-form-item
                            label="附件上传"
                            :label-col="{ span: 7 }"
                            :wrapper-col="{ span: 17 }"
                            style="width: 45%;"
                        >   
                            <a-upload
                            listType="picture-card"
                            @preview="handlePreview"
                            :fileList="fileList"
                            :beforeUpload="beforeUploadEx"
                            @change="handleChange"
                            v-decorator="['img',{rules: [{ required: true, message: '请上传图片！' }]}]"
                            >
                                <div v-if="fileList.length < 1">
                                    <a-icon type="plus" />
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                            </a-modal>
                            <div class="desc">
                                <p>接受的文件类型(最大大小： 10MB)</p>
                                <p>
                                    <span>.jpg</span>
                                    <span>.png</span>
                                </p>
                            </div>
                            
                        </a-form-item>
                        <a-form-item
                            label="图片说明"
                            :label-col="{ span: 7 }"
                            :wrapper-col="{ span: 17 }"
                            style="width: 55%;"
                        >
                            <a-textarea :rows="4" v-decorator="['bz',{rules: [{ required: true, message: '请填写说明！' }]}]"/>
                        </a-form-item>
                    </a-form>
                    <div class="btn-box">
                        <a-button @click="clickOk">提交</a-button>
                        <a-button style="color:#ccc;border-color: #ccc;" @click="closeUploadModal">取消</a-button>
                    </div>
                </div>
            </a-modal>
            <a-modal
                v-model="endDsign"
                title="保存设计"
                :centered="true"
                width="40%"
                :footer="null"
            >
                <div class="end-design">
                    <div class="content">
                        <div class="title">
                            <a-icon type="smile" theme="filled"/>
                            <div>
                                <h3>操作成功！</h3>
                                <p>感谢您的信赖</p>
                            </div>
                        </div>
                        <p>附加提示，此成功提示出现一系列任务之后，比如在弹窗操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用Message提示。</p>
                    </div>
                    <div class="btn-box">
                        <a-button icon="file-text">订单列表</a-button>
                        <a-button type="primary" icon="" style="vertical-align: middle;">
                            <img src="@/assets/monry-icon-bar.png" alt="" width="12" height="19" style="margin-right: 5px;">
                            立即下单
                        </a-button>
                    </div>
                </div>
            </a-modal>
        </div>
        
    </div>
</template>
<script>
let id = 0;
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import FontFaceObserver from 'fontfaceobserver';
import MyTitle from '@/components/MyTitle/MyTitle'
import initAligningGuidelines from "@/utils/guidelines";

import resize from '@/assets/icons/resize.svg';
import remove from '@/assets/icons/remove.svg';
import rotate from '@/assets/icons/rotate.svg';
import diagonal from "@/assets/icons/repair-tools-cross.svg";
import img1 from '@/assets/0001.png';
import GoodsList from "@/components/GoodsList/GoodsList";
import User from '@/components/Header/User';
import MyHeader from '@/components/Header/Header';
import { listAll,categoryList,selectById,saveDesign } from "@/api/seller";


export default {
    components:{
        MyTitle,
        GoodsList,
        User,
        MyHeader,
        
    },
    data () {
        return {
            show: false,
            loading:false,
            goodsList:[],
            menuList:[],
            defaultSelectedKeys:'',
            defaultOpenKeys:'',
            pageNum: 1,
            id:'',
            btnable:false,
            
            nameSize:20,
            numberSize:150,
            namePosition:0,
            numberPosition:0,
            exampleName:'',
            exampleNumber:'',
            endDsign: false,
            remark: '',
            addNumberData: false,
            addNameData: false,
            delWhite: false,
            // 判断改变颜色关键字
            colorKey:'',
            //TODO 颜色数组按修改类型，添加key值做区分
            colorIconShoW:'',
            // 改变颜色盒子标题
            colorTitle:'',
            // 文字阴影样式开始
            Shadow1:0,
            Shadow2:0,
            Shadow3:0,
            shadowColorName: '黑色',
            shadowColor: '#000',
            // 文字阴影样式结束
            previewVisible: false,
            fontColorIcon: -1,
            previewImage:'',
            example:false,
            uploadId:0,
            colorIcon: -1,
            productColorIcon: -1,
            //字体颜色值 | 颜色名
            color:'#000',
            colorName:'黑色',
            //字体背景颜色值 | 颜色名
            bgcolor:'#000',
            fontBgColorName:'黑色',
            resize,
            remove,
            rotate,
            diagonal,
            movingBox: false,
            liClick: -1,
            designModel: 0,
            screenWidth: 600,
            myCanvas1: null,
            myCanvas2: null,
            myCanvas3: null,
            myCanvas4: null,
            visibletype:-1,
            form: this.$form.createForm(this),
            // 描边样式
            strokeWidth:1,
            strokeColor: '#000',
            strokeColorName: '黑色',

            // skewx:0,
            // skewy:0,
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
            colorList:[
                {
                        name: '黑色',
                        color: '#000'
                },
                {
                        name: '红色',
                        color: '#ff0000'
                },
                {
                        name: '绿色',
                        color: '#00ff00'
                },
                {
                        name: '蓝色',
                        color: '#0000ff'
                }
            ],
            fileList: [],
            filpx:false,
            filpy:false,
            fontfamily:'',
            
            // 旋转数值
            rotateNum:0,
            addText:'',
            lineHeight: 1,
            opacity:1,
            bgimgs:[],
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
                    className: 'icon-icon-04',
                    text: '号码'
                },
                {
                    key:4,
                    className: 'icon-icon-06',
                    text: '产品颜色'
                },
                {
                    key:5,
                    className: 'icon-bz',
                    text: '设计备注'
                },
                {
                    key:6,
                    className: 'icon-upload',
                    text: '上传设计'
                }
            ],
            dataList:[
                {
                    title: 'Ant Design Title 1',
                },
                {
                    title: 'Ant Design Title 2',
                },
                {
                    title: 'Ant Design Title 3',
                },
                {
                    title: 'Ant Design Title 4',
                },
            ],
            uploadA:false,
            Ele: () => document.querySelector("#Design"),
            rootSubmenuKeys: ['0', '1', '2'],
            openKeys: ['0'],
            dataUrl1:'',
            dataUrl2:'',
            dataUrl3:'',
            dataUrl4:'',
            dataPost1:'',
            dataPost2:'',
            dataPost3:'',
            dataPost4:''
        }
    },
    created(){
        this.getAllList();
        
    },
    beforeCreate () {
        this.form1 = this.$form.createForm(this);
        this.form1.getFieldDecorator('keys', { initialValue: [0], preserve: true });
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
            this.onUnselected(this.myCanvas1);
            this.onUnselected(this.myCanvas2);
            this.onUnselected(this.myCanvas3);
            this.onUnselected(this.myCanvas4);
            this.onMouseUp(this.myCanvas1);
            this.onMouseUp(this.myCanvas2);
            this.onMouseUp(this.myCanvas3);
            this.onMouseUp(this.myCanvas4);
            this.delSelected(this.myCanvas1);
            this.delSelected(this.myCanvas2);
            this.delSelected(this.myCanvas3);
            this.delSelected(this.myCanvas4);
            this.handleObjectScale(this.myCanvas1);
            this.handleObjectScale(this.myCanvas2);
            this.handleObjectScale(this.myCanvas3);
            this.handleObjectScale(this.myCanvas4);
            this.setEditIcon();
            this.setEditPointer();
            
            //console.log(this.form)
        })
        
    },
    
    methods:{
        saveEndDesign(){
            
            this.saveImg();
            this.downLoadImg();
            let params = {
                positivePicUrl: this.dataUrl1,backPicUrl: this.dataUrl2,leftPicUrl: this.dataUrl3,rightPicUrl: this.dataUrl4,
                positiveDesignArea: this.dataPost1, backDesignArea: this.dataPost2, leftDesignArea: this.dataPost3, rightDesignArea: this.dataPost4
            }
            console.log(params)
            this.postSaveDesign(params)
        },
        downLoadImg(){
            this.dataUrl1 = this.myCanvas1.toDataURL();
            this.dataUrl2 = this.myCanvas2.toDataURL();
            this.dataUrl3 = this.myCanvas3.toDataURL();
            this.dataUrl4 = this.myCanvas4.toDataURL();
        },
        saveImg(){
            let json1 = this.myCanvas1.toJSON();
            let json2 = this.myCanvas2.toJSON();
            let json3 = this.myCanvas3.toJSON();
            let json4 = this.myCanvas4.toJSON();
            this.dataPost1 = JSON.stringify(json1);
            this.dataPost2 = JSON.stringify(json2)
            this.dataPost3 = JSON.stringify(json3)
            this.dataPost4 = JSON.stringify(json4)
            console.log(json1)
        },
        postSaveDesign(params){
            saveDesign(params).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.endDsign = true;
                }
            })
        },
        onOpenChange (openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        },
        getSelectById(id){
            selectById(id).then(res => {
                console.log(res);
                this.bgimgs = res.result.imgs;
                this.bindCanvas(this.myCanvas1,0);
                this.bindCanvas(this.myCanvas2,1);
                this.bindCanvas(this.myCanvas3,2);
                this.bindCanvas(this.myCanvas4,3);
            })
        },
        closeDesignBox(){
            this.show = false;
        },
        openDesignModal(id){
            console.log(id)
            this.show = true;
            setTimeout(() => {
                    this.$intro().setOptions({
                        prevLabel: "上一步",
                        nextLabel: "下一步",
                        skipLabel: "跳过",
                        doneLabel: "结束",
                        overlayOpacity: "0",
                        highlightClass: "white",
                        tooltipClass:"tool-tip",
                        disableInteraction: false,
                    }).start();
            },10)
            this.getSelectById(id)
        },
        loadMore(){
            let that = this;
            that.pageNum ++;
            that.loading = true;
            categoryList(this.id,this.pageNum).then(res => {
                that.loading = false;
                console.log(res)
                if(res.current <= res.total){
                    that.goodsList = that.goodsList.concat(res.records);
                }else{
                    that.btnable = true;
                    that.$message.error('无更多数据！');
                }
            })

        },
        handleClick (e) {
            console.log('click', e.key)
        },
        getAllList(){
            listAll().then(res => {
                console.log(res)
                if(res.code == 0){
                    if(res.total == 1){
                        this.btnable = true;
                    }
                    this.menuList = res.result;
                    this.defaultSelectedKeys = res.result[0].subMenu[0].categoryId.toString();
                    this.id = res.result[0].subMenu[0].categoryId.toString();
                    this.defaultOpenKeys = res.result[0].categoryId.toString();
                    this.getcategoryList(this.defaultSelectedKeys,1)
                }
            })
        },
        getcategoryList(id,num){
            categoryList(id,num).then(res => {
                console.log(res)
                this.goodsList = res.records;
            })
        },
        handleGetList(id){
            this.id = id;
            this.getcategoryList(id,1)
        },


        //设计
        changeNameSize(value) {
            console.log(`selected ${value}`);
            this.nameSize = value;
            if(this.addNameData){
                let obj = this.myCanvas.getActiveObject();
                console.log(obj)
                if(obj.id === 'Name'){
                    obj.set('fontSize',value);
                    this.myCanvas.requestRenderAll();
                }
            }
        },
        changeNumberSize(value) {
            console.log(`selected ${value}`);
            this.numberSize = value;
            if(this.addNumberData){
                let obj = this.myCanvas.getActiveObject();
                if(obj.id === 'Number'){
                    obj.set('fontSize',value);
                    this.myCanvas.requestRenderAll();
                }
            }
        },
        onUnselected(object){
            let that = this;
            object.on('mouse:down',function(obj){
                console.log(obj)
                if(!obj.target){
                    that.visibletype = -1;
                    that.liClick = -1;
                }
            })
        },
        onMouseUp(object){
            let that = this;
            object.on('mouse:up',function(){
                that.movingBox = false;
            })
        },
        changeNamePosition(value) {
            console.log(`selected ${value}`);
            this.namePosition = value;
            if(this.addNameData){
                if(this.namePosition == 0){
                    this.myCanvas = this.myCanvas1;
                    this.designModel = 0;
                    this.bindCanvas(this.myCanvas,0)
                    this.myCanvas2.remove(this.exampleName)
                    this.addExampleName('testFont2');
                }else{
                    this.myCanvas = this.myCanvas2;
                    this.designModel = 1;
                    this.bindCanvas(this.myCanvas,1);
                    this.myCanvas1.remove(this.exampleName);
                    this.addExampleName('testFont2')
                }
            }
        },
        changeNumberPosition(value){
            console.log(`selected ${value}`);
            this.numberPosition = value;
            if(this.addNumberData){
                if(this.numberPosition == 0){
                    this.myCanvas = this.myCanvas1;
                    this.designModel = 0;
                    this.bindCanvas(this.myCanvas,0)
                    this.myCanvas2.remove(this.exampleNumber)
                    this.addExampleNumber('testFont2');
                }else{
                    this.myCanvas = this.myCanvas2;
                    this.designModel = 1;
                    this.bindCanvas(this.myCanvas,1);
                    this.myCanvas1.remove(this.exampleNumber);
                    this.addExampleNumber('testFont2');
                }
            }
        },
        delSelected(obj) {
            var that = this;
            obj.on("mouse:down", function(options) {
                if (options.target) {
                    if(options.target.lockScalingX || options.target.lockScalingY){
                        options.target.lockScalingX = false;
                        options.target.lockScalingY = false;
                        options.target.scale(options.target.scaleX);
                    }
                
                document.onkeydown = function(e) {
                    if (e.keyCode == 8) {
                    that.myCanvas.remove(options.target);
                    }
                };
                }
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

            // can use data-binding to set
            form1.setFieldsValue({
                keys: keys.filter(key => key !== k),
            });
        },
        add  () {
            const { form1 } = this;
            // can use data-binding to get
            const keys = form1.getFieldValue('keys');
            console.log(keys)
            const nextKeys = keys.concat(++id);
            // can use data-binding to set
            // important! notify form to detect changes
            form1.setFieldsValue({
                keys: nextKeys,
            });
        },
        handleSubmit  (e) {
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                console.log(this.form1)
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        // 设置文字字重
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
        // 设置文字样式
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
        // 设置文字下划线
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
        // 设置文字删除线
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
        /** 
         * 1：改变字体颜色的
         * 2：改变字体背景颜色
         * 3：改变描边颜色
         * 4：改变阴影颜色
         * 5：改变名字颜色
         * 6：改变号码颜色
         * 7：改变产品颜色
         * 
        */
        changeAllColor(val,name,i){
            if(this.colorKey == 1){
                this.changeFillColor(val,name,i)
            }else if(this.colorKey == 2){
                this.changeTextBgColor(val,name,i)
            }else if(this.colorKey == 3){
                this.changestrokeColor(val,name,i)
            }else if(this.colorKey == 4){
                this.changeShadowColor(val,name,i)
            }else if(this.colorKey == 5){
                this.changeFillColor(val,name,i)
            }else if(this.colorKey == 6){
                this.changeFillColor(val,name,i)
            }
        },
        // 字体背景色
        changeTextBgColor(val,name,i){
            // let obj = this.myCanvas.getActiveObject()
            // if (obj) {
            //     obj.set("textBackgroundColor", this.bgcolor);
            //     this.myCanvas.requestRenderAll();
            // }
            let obj = this.myCanvas.getActiveObject();
            this.bgcolor = val;
            if (obj) {
                obj.set("textBackgroundColor", val);
                this.fontColorIcon = i;
                this.myCanvas.requestRenderAll();
            }
            this.fontBgColorName = name;
        },
        // 设置字体阴影开始
        changeShadowColor(val,name,i){
                let obj = this.myCanvas.getActiveObject();
                this.shadowColor = val;
                if (obj) {
                    obj.set('shadow', this.shadowColor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                    this.fontColorIcon = i;
                    this.myCanvas.requestRenderAll();
                }
                this.shadowColorName = name;
        },
        changeShadowWidth1(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('shadow', this.shadowColor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                this.myCanvas.requestRenderAll();
                }
        },
        changeShadowWidth2(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('shadow', this.shadowColor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                this.myCanvas.requestRenderAll();
            }
        },
        changeShadowWidth3(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('shadow', this.shadowColor +' '+ this.Shadow1 +' '+ this.Shadow2 +' '+ this.Shadow3);
                this.myCanvas.requestRenderAll();
            }
        },
        // 设置字体阴影结束

        handleChange ({ fileList }) {
            if(this.uploadA){
                this.fileList = fileList
            }
            
        },
        handlePreview (file) {
            this.previewImage = file.url || file.thumbUrl
            this.previewVisible = true
        },
        handleCancel() {
            this.previewVisible = false
        },
        clickOk(){
            this.form.validateFields((err,values) => {
                if (!err) {
                        this.example = false
                        console.log(values)
                }
            },);
        },
        closeUploadModal(){
            this.example = false
        },
        changeProductColor(i){
            this.productColorIcon = i;
        },
        // 选择颜色容器返回上一级
        goBackPage(){
            console.log(this.liClick)
            // 字体选择颜色返回上一级
            if(this.liClick == 0){
                this.visibletype = 3
                // 图片选择颜色返回上一级
            }else if(this.liClick == 2){
                this.visibletype = 2
            }
        },
        addNumber (e) {
            console.log(`checked = ${e.target.checked}`)
            let that = this;
            that.addNumberData = e.target.checked
            if(that.addNumberData){
                if(that.numberPosition == 0){
                    that.myCanvas = that.myCanvas1;
                    that.bindCanvas(that.myCanvas,0);
                    that.designModel = 0;
                }else{
                    that.myCanvas = that.myCanvas2;
                    that.bindCanvas(that.myCanvas,1);
                    that.designModel = 1;
                }
                that.addExampleNumber('testFont2')
            }else{
                if(that.exampleNumber){
                    that.myCanvas1.remove(that.exampleNumber);
                    that.myCanvas2.remove(that.exampleNumber);
                }
            }
        },
        addExampleNumber(font){
            let that = this;
            let myfont = new FontFaceObserver(font);
            myfont.load().then(function() {
                // when font is loaded, use it.
                that.exampleNumber = new fabric.Text("00", {
                    id: 'Number',
                    fontFamily: font,
                    originX:'center',
                    originY:'center',
                    left: that.screenWidth / 2,
                    top: 200,
                    fontSize: that.numberSize
                });
                that.myCanvas.add(that.exampleNumber).setActiveObject(that.exampleNumber);
                that.exampleNumber.on("selected", function() {
                    
                    that.liClick = 2;
                    that.visibletype = 2;
                })
            }).catch(function(e) {
                console.log(e)
                
            });
        },

        addExampleName(font){
            let that = this;
            let myfont = new FontFaceObserver(font);
            myfont.load().then(function() {
                // when font is loaded, use it.
                that.exampleName = new fabric.Text("EXAMPLE", {
                    id: 'Name',
                    fontFamily: font,
                    originX:'center',
                    originY:'center',
                    left: that.screenWidth / 2,
                    top: 100,
                    fontSize: that.nameSize
                });
                that.myCanvas.add(that.exampleName).setActiveObject(that.exampleName);
                that.exampleName.on("selected", function() {
                    
                    that.liClick = 2;
                    that.visibletype = 2;
                })
            }).catch(function(e) {
                console.log(e)
                
            });
        },
        
        addName (e) {
            console.log(`checked = ${e.target.checked}`)
            let that = this;
            that.addNameData = e.target.checked;

            if(that.addNameData){
                if(that.namePosition == 0){
                    that.myCanvas = that.myCanvas1;
                    that.bindCanvas(that.myCanvas,0);
                    that.designModel = 0;
                }else{
                    that.myCanvas = that.myCanvas2;
                    that.bindCanvas(that.myCanvas,1);
                    that.designModel = 1;
                }
                that.addExampleName('testFont2')
            }else{
                if(that.exampleName){
                    that.myCanvas1.remove(that.exampleName);
                    that.myCanvas2.remove(that.exampleName);
                }
            }
            
        },
        moreImgs(){
            this.visibletype = 11;
        },
        beforeUploadEx(file){
            if(file.type == 'image/png' || file.type == 'image/jpeg'){
                if(file.size / 1024 / 1024 < 10){
                    this.uploadA = true
                    
                }else{
                    this.$message.error('图片大小超出限制！');
                    this.uploadA = false
                }
            }else{
                this.$message.error('格式错误，请重新选择！')
                this.uploadA = false
            }
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

        // 添加图片开始
        addImg(imgUrl,id){
            this.selectImg(imgUrl,id);
        },
        selectImg(imgUrl,id) {
            let that = this;
            fabric.Image.fromURL(imgUrl, function(oImg) {
                oImg.on("selected", function() {
                    let obj = that.myCanvas.getActiveObject();
                    that.liClick = 1;
                    that.visibletype = 10;
                    that.opacity = obj.opacity;
                    // that.filpx = obj.flipX;
                    // that.filpy = obj.flipY;
                    // that.skewx = obj.skewX;
                    // that.skewy = obj.skewY;
                    that.rotateNum = obj.angle;
                });
                oImg.crossOrigin='Anonymous';
                that.myCanvas.add(
                        oImg.set({
                            id: id,
                            flipX:false,
                            flipY:false,
                            skewX:0,
                            skewY:0,
                            
                            left: 200,
                            top: 150,
                            scaleX: 0.5,
                            scaleY:0.5,
                            maxWidth: 200
                        })
                        
                ).setActiveObject(oImg);
                console.log(oImg)
            });
                
        },
        // 添加图片结束
        handleObjectMove(object){
            let that = this;
            object.on("object:moving", function(e) {
                that.movingBox = true;
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
                        top_margin = 150;
                        bottom_margin = 150;
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

        handleObjectScale(object){
            let that = this;
            
            object.on("object:scaling",that.onObjectScaled)
            
        },
        onObjectScaled(e){
            var scaledObject = e.target;
            scaledObject.lockScalingFlip = true;
            var startX =scaledObject.getPointByOrigin("left","top").x.toFixed();
            var startY =scaledObject.getPointByOrigin("left","top").y.toFixed();
            var maxWidth = 400 - startX;// scaledObject.aCoords.tl.x; 
            var maxHeight = 450 -startY;
            scaledObject.setCoords();
            // console.log("xy:",startX,startY);
            // console.log("max:",maxWidth,maxHeight);
            var isOnScreen = scaledObject.isContainedWithinRect({x:200,y:150},{x:400,y:450},true,true);
            // console.log("onscreen:",isOnScreen);
            if(!isOnScreen) {

                if( (maxHeight) <( maxWidth)){

                    var h = scaledObject.scaleToHeight(maxHeight,true);

                } else{
                    var w = scaledObject.scaleToWidth(maxWidth,true);
                }
            }
        },
        
        
        // 切换正反左右面
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
        // 设置设计背景图
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
                scaleY: that.screenWidth / 600,
                // *圖片跨域
                crossOrigin: "*"
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
        // 添加文字
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
                    let obj = that.myCanvas.getActiveObject();
                    that.liClick = 0;
                    that.visibletype = 3
                    console.log(obj.angle)
                    that.color = obj.fill;
                    
                    that.bgcolor = obj.textBackgroundColor || '#000000';
                    that.stroke = obj.stroke;
                    that.strokeWidth = obj.strokeWidth;
                    that.Shadow1 = obj.shadow.offsetX;
                    that.Shadow2 = obj.shadow.offsetY;
                    that.Shadow3 = obj.shadow.blur;
                    that.shadowColor = obj.shadow.color;
                    that.fontfamily = obj.fontFamily
                });
                console.log(canvasObj)
                that.myCanvas.add(canvasObj).setActiveObject(canvasObj);
                that.visibletype = 3;
            }
        },
        // 加载资源字体
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
        // 左右垂直居中
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
        // 旋转
        setRotate(){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                obj.rotate(this.rotateNum);
                this.myCanvas.requestRenderAll();
            }
        },
        openFontFamilyBox(){
            this.visibletype = 7;
        },
        openChangeColorBox(key,title){
            this.visibletype = 8;
            this.colorTitle = title;
            this.colorKey = key;
            console.log(key,title)
        },
        // 打开改变描边样式盒子
        // openFontOutlineBox(){
        //     this.visibletype = 9;
        // },
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
                this.filpx = !this.filpx;
                obj.set('flipX',this.filpx);
                this.myCanvas.requestRenderAll();
            }
        },
        changeFilPy(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                this.filpy = !this.filpy;
                obj.set('flipY',this.filpy);
                this.myCanvas.requestRenderAll();
            }
        },
        // changeSkewY(){
        //     let obj = this.myCanvas.getActiveObject()
        //     if (obj) {
        //         obj.set('skewY', this.skewy).setCoords();
        //         this.myCanvas.requestRenderAll();
        //     }
        // },
        // changeSkewX(){
        //     let obj = this.myCanvas.getActiveObject()
        //     if (obj) {
        //         obj.set('skewX', this.skewx).setCoords();
        //         this.myCanvas.requestRenderAll();
        //     }
        // },
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
        changeFillColor(val,name,i){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                obj.set("fill", val);
                this.fontColorIcon = i;
                this.myCanvas.requestRenderAll();
                this.colorName = name;
                this.color = val;
            }
            
        },
        // 改变描边样式开始
        changestrokeColor(val,name,i){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('stroke', val);
                this.fontColorIcon = i;
                this.myCanvas.requestRenderAll();
            }
            this.strokeColorName = name;
            this.strokeColor = val;
        },
        changestrokeWidth(){
            let obj = this.myCanvas.getActiveObject()
            if (obj) {
                obj.set('strokeWidth', this.strokeWidth);
                this.myCanvas.requestRenderAll();
            }
        },
        // 改变描边样式结束
        setEditPointer(){
            let that = this;
            fabric.Canvas.prototype.customiseControls({
                br: {
                        action: "scale"
                       
                },
                ml:{
                    action: "scale"
                },
                mr:{
                    action: "scale"
                },
                mb:{
                    action: "scale"
                },
                tl: {
                        action: function(e, target) {
                            that.myCanvas.remove(target);
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

                    br: {
                        icon: resize,
                        settings: {
                                cornerBackgroundColor: that.randomColor()
                        }
                    },
                    tl: {
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
}
</script>
<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
@font-face {
    font-family:'testFont';
    src:url('https://cdnjs.loli.net/ajax/libs/MaterialDesign-Webfont/3.8.95/fonts/materialdesignicons-webfont.ttf')
}
@font-face {
    font-family:'testFont2';
    src:url('./../../assets/FZZYJW_0.TTF')
}
@normal-fontsize: 18px;
@normal-fontcolor: #999;
.white{
    background-color:rgba(255,255,255,.0);
    border-color: #33b8b3;
}
.tool-tip{
    .introjs-tooltipbuttons{
        a:hover{
            color: #33b8b3;
        }
    }
} 

#NewOrder{
    width: 100%;
    height: 100%;
    padding: 50px;
    .content{
        height: 100%;
        .left{
            background-color: #33b8b3;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            padding-top: 50px;
            min-height: 100%;
            .ant-menu-item{
                font-size: 18px;
            }
        }
        .right{
            background-color: #fff;
            
            border-bottom-right-radius: 10px;
            padding: 20px;
            height: calc(100% - 78px);
            position: relative;
            overflow-y: scroll;
            &::-webkit-scrollbar {  /*滚动条整体样式*/
                    width: 6px;  /*宽分别对应竖滚动条的尺寸*/
                    /*高分别对应横滚动条的尺寸*/
                    background-color: #fff;
                    
            }
            &::-webkit-scrollbar-thumb {
                background-color: #33b8b3;
                border-radius:4px;
                height: 10%;
            }
            .btn-box{
                margin-top: 20px; 
                position: absolute;
                bottom: 10px;
                left: 50%;
            }
        }
    }
    
}
#DesignBox{
    width: 100%;
    .design-box{
        display: flex;
        .active{
            background-color: #fff;
            color: #33b8b3 !important;
            span{
                color: #33b8b3 !important;
            }
        }
        .side-bar{
            width: 90px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background-color: #eee;
            margin: 0;
            padding-bottom: 130px;
            position: relative;
            li{
                display: flex;
                width: 100%;
                padding: 10px 0;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #999;
                font-size: 16px;
                cursor: pointer;
                span{
                    font-size: 30px;
                    margin-bottom: 5px;
                    color: #999;
                }
                &:last-child{
                    position: absolute;
                    bottom: 0;
                }
            }
        }
        .container{
            width: 65%;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 640px;
            padding: 20px;
            position: relative;
            .canvas-container{
                z-index: 100;
                position: relative;
                .moving-box{
                    position:absolute; 
                    border: 1px solid #000;
                    z-index: 200;
                    > div:nth-child(1){
                        width: 150px;
                        height: 250px;
                        position: absolute; 
                        left: 25px;
                        top: 25px;
                        border: 1px solid #000;
                    }
                    > div:nth-child(2){
                        width:80px;
                        height: 80px;
                        position: absolute; 
                        right: 10px;
                        top: 10px;
                        border: 1px solid #000;
                    }
                }
            }
            h2{
                position: absolute;
                left: 0;
                top: 0;
                padding:10px 15px;
                color: #33b8b3;
                z-index: 101;
                span{
                    font-size: 14px;
                    color: #999;
                    cursor: pointer;
                    margin-left: 10px;
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
                z-index: 99;
                .li{
                    border: 1px solid #ccc;
                    margin-bottom: 20px;
                    padding: 10px;
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
                    margin-top:20px;
                    cursor: pointer;
                    span{
                        color: #33b8b3;
                        font-size: 30px;
                    }
                }
                
            }
            
        }
        .tools-box{
            width: calc(35% - 90px);
            background-color: #eee;
            overflow: hidden;
            border-radius:  0 0 10px 0;
            .scroll-box{
                width: 100%; 
                height: 100%;
                max-height: 640px; 
                overflow-y:scroll;
                &::-webkit-scrollbar {  /*滚动条整体样式*/
                    width: 6px;  /*宽分别对应竖滚动条的尺寸*/
                    /*高分别对应横滚动条的尺寸*/
                    background-color: #fff;
                    
                }
                &::-webkit-scrollbar-thumb {
                    background-color: #33b8b3;
                    border-radius:4px;
                    height: 10%;
                }
                
            }
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
                            color: #33b8b3;
                        }
                }
                .tool-box{
                    h2{
                        color: #33b8b3;
                        text-align: center;
                        padding: 40px 0;
                        font-size: 20px;
                        margin:0;
                    }
                    p{
                        text-align: center;
                        margin: 20px 0;
                        color: #999;
                        font-size: 16px;
                        a{
                            color: #33b8b3;
                        }
                    }
                    .btn-box{
                        display: flex;
                        width: 100%;
                        flex-wrap: wrap;
                        justify-content: center;
                        margin: 0 auto;
                        align-items: center;
                        .active-btn{
                            background-color: #33b8b3;
                            color: #fff;
                            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
                            border-color: #33b8b3;
                            span{
                                color: #fff;
                            }
                        }
                        li{
                            width: 35%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            margin: 10px 7%;
                            border: 1px solid #666;
                            border-radius: 10px;
                            color: #333;
                            padding: 15px 5px;
                            max-width: 95px;
                            max-height:95px;
                            min-width: 95px;
                            min-height: 95px;
                            cursor: pointer;
                            span{
                                font-size: 30px;
                                margin-bottom: 10px;
                            }
                            &:hover{
                                background-color: #33b8b3;
                                color: #fff;
                                box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
                                border-color: #33b8b3;
                                span{
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .tool-box1{
                    .add-text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 20px 0;
                        p{
                            color: #999;
                            font-size: 18px;
                        }
                        input{
                                margin: 20px 0;
                                width: 80%;
                                
                                border-color: #33b8b3;
                                border-radius: 12px;
                        }
                    }
                    
                }
                .tool-box2{
                    .tool-list{
                        margin-top: 10px;
                        li{
                            display: flex;
                            justify-content: space-between;
                            padding: 5px 0;
                            border-bottom: 1px solid #ccc;
                        }
                    }
                    dl{
                        margin-top: 30px;
                    }
                    .first{
                        display: flex;
                        .set-obj-center{
                            color: #33b8b3;
                            p{
                                text-align: center;
                                border: 1px solid #33b8b3;
                                border-radius: 4px;
                                padding: 2px 10px;
                                margin: 0 2px;
                                color: #33b8b3;
                                cursor: pointer;
                            }
                        }
                        .set-layer,.set-filp{
                            margin: 0 20px;
                            > p{
                                text-align: center;
                                color: #33b8b3;
                            }
                            span{
                                border: 1px solid #33b8b3;
                                border-radius: 4px;
                                padding: 2px 10px;
                                color: #33b8b3;
                                display: inline-block;
                                cursor: pointer;
                                &:nth-child(1){
                                   
                                    border-top-right-radius: 0;
                                    border-bottom-right-radius: 0;
                                }
                                &:nth-child(2){
                                    border-left: none;
                                    border-top-left-radius: 0;
                                    border-bottom-left-radius: 0;
                                }
                            }
                            
                        }
                    }
                    .set-rotate{
                        border-bottom: 1px solid #ccc;
                        padding-bottom: 10px;
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
                                    background-color: #33b8b3;
                                    color: #fff;
                                }
                            }
                        }
                }
                .tool-box4{
                        margin-top: 20px;
                        .color-list-box{
                            display: flex;
                            border-bottom: 1px solid #ccc;
                            margin-bottom: 20px;
                            li{
                                    width: 26px;
                                    height: 26px;
                                    margin: 20px 10px;
                                    cursor: pointer;
                                    line-height: 25px;
                                    text-align: center;
                                    border-radius: 3px;
                                    border: 1px solid #ddd;
                            }
                        }
                        
                }
                .tool-box5{
                    h3{
                        color: #33b8b3;
                    }
                    .dynamic-delete-button{
                        color: #ff0000;
                        font-size: 16px;
                        margin-left: 10px;
                    }
                    .ant-select-selection{
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                    }
                }
                .tool-box6{
                    h3{
                        padding: 10px 0;
                        border-bottom: 1px solid #ccc;
                        color: #33b8b3;
                    }
                    .upload-box{
                        h4{
                            color: #33b8b3;
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
                                color: #33b8b3;

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
                .tool-box8{
                    dl{
                        dt{
                            padding: 10px 0;
                            border-bottom: 1px solid #ccc;
                            font-size: 18px;
                            color: #33b8b3;
                        }
                        dd{
                            display: flex;
                            padding: 10px 0;
                            border-bottom: 1px solid #ccc;
                            span{
                               
                                color: #33b8b3;
                            }
                            > div{
                                width: 85%;
                                display: flex;
                                justify-content: space-between;
                                p{
                                    width: 50%;
                                    margin: 0;
                                }
                            }
                            .color-picker{
                                p{
                                    display: flex;
                                    justify-content: flex-end;
                                    align-items: center;
                                    span{
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 4px;
                                        margin-left: 5px;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                }
                .tool-box9{
                    > p{
                        text-align: center;
                        a{
                            color: #33b8b3;
                            text-decoration: underline;
                            margin: 0 4px;
                        }
                    }
                    .second{
                        padding: 10px;
                        border-radius: 6px;
                        .text-tool{
                            display: flex;
                            margin-bottom: 10px;
                            justify-content: space-between;
                            .text-align{
                                p{
                                    color: #33b8b3;
                                }
                                span{
                                    border: 1px solid #33b8b3;
                                    border-radius: 4px;
                                    display: inline-block;
                                    padding: 4px 10px;
                                    margin: 0 2px;
                                    cursor: pointer;
                                    i{
                                        color: #33b8b3;
                                        font-size: 20px;
                                    }
                                }
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
                            .font-style{
                                span{
                                    border: 1px solid #33b8b3;
                                    border-radius: 4px;
                                    display: inline-block;
                                    padding: 4px 10px;
                                    margin: 0;
                                    cursor: pointer;
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
                                        border-radius: 0;
                                       
                                        border-right: none;
                                    }
                                    &:nth-child(4){
                                        border-top-left-radius: 0;
                                        border-bottom-left-radius: 0;
                                    }
                                    i{
                                        color: #33b8b3;
                                        font-size: 20px;
                                    }
                                }
                                > p{
                                    color: #33b8b3;
                                }
                            }
                            p{
                                text-align: center;
                                margin: 0 10px;
                            }
                                
                        }
                    }
                    .stroke-style{
                        dd{
                            align-items: center;
                        }
                    }
                    > dl{
                       
                        padding-bottom: 10px;
                        border-bottom: 1px solid #ccc;
                        .title{
                            color: #33b8b3;
                        }
                        dd{
                            display: flex;
                            justify-content: space-between;
                            padding-left: 20px;
                            .square{
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                margin-left: 5px;
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
                            &:nth-child(2){
                                cursor: pointer;
                            }
                        }
                    }
                    
                    .tool-list{
                        margin-top: 10px;
                        padding-top: 10px;
                        border-top: 1px solid #ccc;
                        .square{
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                margin-left: 5px;
                        }
                        li{
                            padding: 10px 0;
                            border-bottom:1px solid #ccc; 
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            > span{
                                color: #33b8b3;
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
                .tool-box10{
                    h2{
                        font-size: 18px;
                        color: #33b8b3;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ccc;
                        padding: 15px 0;
                    }
                    p{
                        margin: 20px 0;
                        display: flex;
                        align-items: center;
                        span{
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            border: 1px solid #ccc;
                            margin: 0 10px;
                        }
                    }
                    .color-list{
                        display: flex;
                        flex-wrap: wrap;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #ccc;
                        li{
                            width: 25px;
                            height: 25px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 0 5px;
                            cursor: pointer;
                            position: relative;
                            
                        }
                    }
                }
                .tool-box11{
                    h2{
                        font-size: 18px;
                        color: #33b8b3;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #ccc;
                        padding: 15px 0;
                    }
                }
                .tool-box12{
                    h2{
                        font-size: 18px;
                        color: #33b8b3;
                        margin-bottom: 0;
                        border-bottom: 1px solid #ccc;
                        padding: 15px 0;
                    }
                    .upload-box{
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #ccc;
                        p{
                            margin: 0;
                            margin-left: 5px;
                        }
                    }
                    .info-list{
                        li{
                            padding: 10px 0;
                            border-bottom: 1px solid #ccc;
                            display: flex;
                            align-items: flex-start;
                            > div{
                                margin-left: 10px;
                                display: flex;
                                width: calc(100% - 100px);
                                height: 100%;
                                justify-content: space-between;
                                align-items: flex-start; 
                                p{
                                    margin: 0;
                                }
                                span{
                                    i{
                                        font-size: 20px;
                                        color: #33b8b3;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .submit-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-top: 1px solid #ccc;
        li{
            &:nth-child(1){
                font-size: 15px;
                span{
                    color: #33b8b3;
                    font-size: 18px;
                    margin-left: 10px;
                }
                
            }
            
        }
        li{
            button{
                    margin-left: 20px;
                    
                    border-radius: 12px;
                    font-size: 16px;
                    &:nth-child(2){
                        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
                    }
                    
                    
                    i{
                        font-size: 16px;
                        vertical-align: middle;
                    }
                    
                    &:hover{
                        background-color: #33b8b3;
                        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
                        color: #fff;
                        span{
                            color: #fff;
                        }
                    }
                    
                }
        }
    }
}

.upLoadExampleImg{
    padding: 20px;
    .btn-box{
        text-align: center;
        padding: 20px 0 0;
        border-top: 1px solid #ccc;
        button{
            margin: 0 10px;
        }
    }
    .desc{
        clear: left;
        p{
            color: #ccc;
            margin: 2px;
            line-height: 20px;
            span{
                background-color: #666;
                margin: 0 2px;
                padding: 0 2px 2px;
            }
        }
    }
}
.end-design{
    padding: 0 20px 30px;
    .content{
        .title{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px; 
            > i{
                font-size: 100px;
                color: #33b8b3;
            }
            > div{
                margin-left: 20px;
                p{
                    margin: 0;
                    color: #999;
                }
                h3{
                    color: #33b8b3;
                    font-size: 20px;
                }
            }
           
        }
        > p{
            width: 70%;
            margin: 30px auto;
            text-align: center;
        }
    }
    .btn-box{
        text-align: center;
        padding: 20px 0 0;
        border-top: 1px solid #ccc;
        button{
            margin: 0 10px;
        }
    }
}
</style>