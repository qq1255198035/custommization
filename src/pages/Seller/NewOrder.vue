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
                            <span slot="title" style="display: flex;align-items: center;"><a-avatar :size="20" :src="item.icon" style="margin-right: 5px;" v-if="item.icon"/><span>{{item.title}}</span></span>
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
                            <li @click="handleChangePRO">
                                <span class="icon-change_product"></span>
                                更换产品
                            </li>
                        </ul>
                        <div class="container">
                            <h2>CUSTOM KING T-Shirt<span>查看尺寸表</span></h2>
                            <div class="canvas-container"  v-show="designModel == 0">
                                <canvas id="canvas1" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: boxSize1.width + 'px',height: boxSize1.height + 'px',top: boxSize1.top + 'px', left: boxSize1.left + 'px'}" v-show="movingBox">
                                    <div v-for="(item,index) in boxSize1.list" :key="index" :style="{width: item.width + 'px',height: item.height + 'px',top: item.top + 'px', left: item.left + 'px'}">
                                    </div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 1">
                                <canvas id="canvas2" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: boxSize2.width + 'px',height: boxSize2.height + 'px',top: boxSize2.top + 'px', left: boxSize2.left + 'px',border:'none'}" v-show="movingBox">
                                    <div v-for="(item,index) in boxSize2.list" :key="index" :style="{width: item.width + 'px',height: item.height + 'px',top: item.top + 'px', left: item.left + 'px'}">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 2">
                                <canvas id="canvas3" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: boxSize3.width + 'px',height: boxSize3.height + 'px',top: boxSize3.top + 'px', left: boxSize3.left + 'px'}" v-show="movingBox">
                                    <div v-for="(item,index) in boxSize3.list" :key="index" :style="{width: item.width + 'px',height: item.height + 'px',top: item.top + 'px', left: item.left + 'px'}"></div>
                                </div>
                            </div>
                            <div class="canvas-container"  v-show="designModel == 3">
                                <canvas id="canvas4" :width="screenWidth" :height="screenWidth"></canvas>
                                <div class="moving-box" :style="{width: boxSize4.width + 'px',height: boxSize4.height + 'px',top: boxSize4.top + 'px', left: boxSize4.left + 'px'}" v-show="movingBox">
                                    <div v-for="(item,index) in boxSize4.list" :key="index" :style="{width: item.width + 'px',height: item.height + 'px',top: item.top + 'px', left: item.left + 'px'}"></div>
                                </div>
                            </div>
                            <ul class="top">
                                <li v-for="(item,index) in bgimgs" :key="index" class="li" @click="changeModelDesign(index)">
                                    <img :src="item" alt="">
                                </li>
                            </ul>
                            <!-- <ul class="bottom">
                                <li @click="zoomIn">
                                    <span class="icon-zoomin"></span>
                                </li>
                                <li @click="zoomOut">
                                    <span class="icon-zoomout"></span>
                                </li>
                            </ul> -->

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
                                        <p>或<a @click="reStart">重新开始</a></p>
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
                                            <a-button type="primary" @click="addItext(addText,false)" :disabled="!addText" style="border-radius: 12px;">添加设计</a-button>
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
                                        <dl v-for="(img,index) in imgs" :key="img.catalog">
                                            <dt>
                                                <p @click="moreImgs(index)">
                                                    <span>{{img.catalog}}</span>
                                                    <a-icon type="right" />
                                                </p>
                                            </dt>
                                            <dd v-for="(item,index) in img.pic.length > 4 ? img.pic.slice(0,4) : img.pic" :key="item + index" @click="addImg(item.pic_url,'img'+index)">
                                                <img :src="item.pic_url" alt="">
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
                                                        <a-select defaultValue="0" style="width: 95%;" @change="changeNamePosition" :disabled="!addNameData">
                                                            <a-select-option value="0">胸部</a-select-option>
                                                            <a-select-option value="1">背部</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 100%;" @change="changeNumberPosition" :disabled="!addNumberData">
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
                                                        <a-select defaultValue="6cm" style="width: 95%;" @change="changeNameSize" :disabled="!addNameData">
                                                            <a-select-option value="20">6cm</a-select-option>
                                                            <a-select-option value="30">7cm</a-select-option>
                                                            <a-select-option value="40">8cm</a-select-option>
                                                            <a-select-option value="50">9cm</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="15cm" style="width: 100%;" @change="changeNumberSize" :disabled="!addNumberData">
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
                                                        <a-select style="width: 95%;" :disabled="!addNameData" placeholder="请选择" @change="changeNameFamily">
                                                            <a-select-option v-for="item in fontFamilyArr" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
                                                            
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select style="width: 100%;" :disabled="!addNumberData" placeholder="请选择" @change="changeNumberFamily">
                                                            <a-select-option v-for="item in fontFamilyArr" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>颜色：</span>
                                                <div class="color-picker">
                                                    <p>
                                                        {{numberColorName}}<span :style="{backgroundColor: numberColor}" @click="openChangeColorBox(5,'名称颜色')"></span>
                                                    </p>
                                                    <p>
                                                        {{nameColorName}}<span :style="{backgroundColor: nameColor}" @click="openChangeColorBox(6,'号码颜色')"></span>
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
                                        <my-title :title="'修改文字'"></my-title>
                                        <div class="second">
                                            <div class="text-tool">
                                                <a-input v-model="addText" style="width: 70%"></a-input>
                                                <a-button type="primary" @click="addItext(addText,true)" :disabled="!addText" style="border-radius: 12px;">更改文字</a-button>
                                                
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
                                            <li @click="visibletype = 12">
                                                <span>改变字形</span>
                                                <p>
                                                    <span>{{fontShape}}</span>
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
                                        </dl>
                                        
                                    </div>
                                    <div class="tool-box10" v-show="visibletype == 4">
                                        <h2>颜色：</h2>
                                        <p>选择颜色： <span :style="{backgroundColor: productColor ? productColor : '#fff'}"></span> {{productColorName ? productColorName : '白色'}}</p>
                                        <ul class="color-list">
                                            <li v-for="(item,index) in colorList.list" :key="index" :style="{backgroundColor: item.itemValue}" @click="changeProductColor(item.itemValue,item.itemText,index)">
                                                <a-icon type="check" v-show="productColorIcon == index"/>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                    <div class="tool-box11" v-show="visibletype == 5">
                                        <h2>设计备注：</h2>
                                        <a-textarea placeholder="请填写备注" :rows="8" v-model="remark"/>
                                        <div style="text-align: center;margin-top: 10px;">
                                            <a-button type="primary" :disabled="!remark" @click="postAddRemarksBtn">保存更改</a-button>
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

                                                <img :src="item.picUrl" alt="" width="100" height="100">
                                                <div>
                                                    <p>{{item.remarks}}</p>
                                                    <span>
                                                        <a-icon type="delete" @click="postDeleteEXimg(item.id)"/>
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
                                            <li v-for="(item,index) in fontFamilyArr" :key="item.id" @click="changeFontFamily(item.name,index)" :style="{backgroundColor: fontfamilydata == index ? '#33b8b3' : '',color: fontfamilydata == index ? '#fff' : '#666'}">
                                                <span :style="{fontFamily: item.name}" >ABCDEFGHIJKLMN</span>
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
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;">选择颜色： <span :style="{backgroundColor: colorShow}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{colorShowName}}</p>
                                        <ul class="color-list-box">
                                            <li v-for="(item,index) in colorList.list" :key="item.itemText" :style="{backgroundColor: item.itemValue}" @click="changeAllColor(item.itemValue,item.itemText,index)">
                                                <template v-if="colorList.key == 1">
                                                    <a-icon type="check" v-show="fontColorIcon1 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 2">
                                                    <a-icon type="check" v-show="fontColorIcon2 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 3">
                                                    <a-icon type="check" v-show="fontColorIcon1 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 4">
                                                    <a-icon type="check" v-show="fontColorIcon2 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 5">
                                                    <a-icon type="check" v-show="fontColorIcon1 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 6">
                                                    <a-icon type="check" v-show="fontColorIcon2 == index"></a-icon>
                                                </template>
                                            </li>
                                        </ul>
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
                                                <a-switch v-model="delWhite" @change='removeColor'/>
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
                                            <li v-for="(item,index) in imgs1" :key="index" @click="addImg(item.pic_url,'img'+index)">
                                                <img :src="item.pic_url" alt="">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box3" v-show="visibletype == 12">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="visibletype = 3"/>
                                        </h2>
                                        <ul class="font-family-list">
                                            <li v-for="(item,index) in fontShapeArr" :key="item.itemText" @click="changeFontShape(item.itemText,index)" :class="{active: shapeActive == index}">
                                                <span>
                                                    <img :src="item.itemValue" alt="">
                                                </span>
                                            </li>
                                        </ul>
                                        <div style="text-align: center;padding-top: 20px;">
                                            <a-button type="primary" @click="saveFontShapeDesign(fontShape,true)">保存设计</a-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="submit-box">
                        <a-button type="primary" @click="showEdModal(postId)">获取价格</a-button>
                        <li style="display: flex; align-item">
                            <commonBtn
                                @handleLink1="addNewPro"
                                :width="'130px'"
                                :height="'32px'"
                                :padding="'15px'"
                                :radio="'12px'"
                                :fontsize="'16px'"
                                :title="'添加产品'"
                                :icon="'plus'"
                                v-intro="'The content of tooltip'" v-intro-step="2"
                            >
                            </commonBtn>
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
                        <a-button icon="file-text" @click="$router.push({path:'/designList'})">订单列表</a-button>
                        <a-button type="primary" icon="" style="vertical-align: middle;" @click="posteDesignList">
                            <img src="@/assets/monry-icon-bar.png" alt="" width="12" height="19" style="margin-right: 5px;">
                            立即下单
                        </a-button>
                    </div>
                </div>
            </a-modal>
            <a-modal
                class="show-details"
                title="获取价格"
                v-model="showVisible"
                width="50%"
                :footer="null"
                
            >
                <a-row :gutter="20" style="padding:20px">
                <a-col :span="8">
                    <a-row :gutter="20">
                    <a-col :span="12">
                        <img width="100%" :src="designDetail.positivePicUrl" alt />
                    </a-col>
                    <a-col :span="12">
                        <img width="100%" :src="designDetail.backPicUrl" alt />
                    </a-col>
                    </a-row>
                </a-col>
                <a-col :span="16">
                    <div class="number">
                    <div class="font-18">数量：</div>
                    <div class="number-box">
                        <div class="minus common-radio" @click="minus(designDetail.minOrder)">
                        <a-icon type="minus" />
                        </div>
                        <div class="num">
                        <a-input v-model="nums" @blur="onChangeNums" type="number"/>
                        </div>
                        <div class="plus common-radio" @click="plus(designDetail.minOrder)">
                        <a-icon type="plus" />
                        </div>
                    </div>
                    <div class="price-right">
                        预计代理价格：
                        <span>￥{{onePrice}}</span>
                    </div>
                    </div>
                    <div class="font-color">最小起订量为{{designDetail.minOrder}}</div>
                    <div class="prices">
                    <div class="price-box">
                        <div class="font-18">价格:</div>
                        <div class="price-input">
                        <a-input :value="prices" type="number" @change="onChangeValues" style="width: 120px" />
                        </div>
                        <div class="font-18">/件</div>
                    </div>
                    <div class="price-right">
                        预计代理收益：
                        <span>￥{{twoPrice}}</span>
                    </div>
                    </div>
                    <div class="font-color">建议售价：￥{{designDetail.price}}/件</div>
                </a-col>
                </a-row>
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
import commonBtn from "@/components/commonBtn/commonBtn"
import resize from '@/assets/icons/resize.svg';
import remove from '@/assets/icons/remove.svg';
import rotate from '@/assets/icons/rotate.svg';
import diagonal from "@/assets/icons/repair-tools-cross.svg";
import img1 from '@/assets/0001.png';
import GoodsList from "@/components/GoodsList/GoodsList";
import User from '@/components/Header/User';
import MyHeader from '@/components/Header/Header';
import {
        listAll,
        categoryList,
        selectById,
        saveDesign,
        referencePic,
        sourceUpload,
        addEximg,
        deleteEXimg,
        addRemarks,
        colorList,
        changeFontFamily,
        changeGoodsColor,
        artFontList,
        changeFont,
        discountEdit1,
        discount,
        getPic,
        handleDesignList
    } from "@/api/seller";


export default {
    components:{
        MyTitle,
        GoodsList,
        User,
        MyHeader,
        commonBtn
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
            fontShapeArr:[],
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
            shadowColorName: '',
            shadowColor: '',
            // 文字阴影样式结束
            previewVisible: false,
            fontColorIcon1: -1,
            fontColorIcon2: -1,
            fontColorIcon3: -1,
            fontColorIcon4: -1,
            fontColorIcon5: -1,
            fontColorIcon6: -1,
            previewImage:'',
            example:false,
            uploadId:0,
            colorIcon: -1,
            productColorIcon: -1,
            productColor: '',
            productColorName: '',
            //字体颜色值 | 颜色名
            color:'#000',
            colorName:'黑色',
            //字体背景颜色值 | 颜色名
            bgcolor:'',
            fontBgColorName:'',
            // 选择展示的颜色及颜色名
            fontShape: '',
            colorShow: '#000',
            colorShowName: '黑色',
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
            strokeWidth:0,
            strokeColor: '',
            strokeColorName: '',
            nameFontFamily: 'NBA-Hawks',
            numberFontFamily: 'NBA-Hawks',
            // skewx:0,
            // skewy:0,
            fontFamilyArr:[
                {
                    id:1,
                    name: 'College-Regular'
                },
                {
                    id:2,
                    name: 'NBA-Cavaliers'
                },
                {
                    id:3,
                    name: 'NBA-Grizzlies'
                },
                {
                    id:4,
                    name: 'NBA-Hawks'
                },
                {
                    id:5,
                    name: 'NBA-Knicks'
                },
                {
                    id:6,
                    name: 'NBA-Pacers'
                },
                {
                    id:7,
                    name: 'NBA-Pistons'
                },
                {
                    id:8,
                    name: 'NBA-Rockets'
                },
                {
                    id:9,
                    name: 'NBA-Trailblazers'
                },
                {
                    id:10,
                    name: 'NCAA-Utah-Utes'
                },
                {
                    id:11,
                    name: 'Stahls-Tiffany---2000'
                },
                {
                    id:12,
                    name: 'UA-Cadet'
                }
            ],
            colorList:{},
            fileList: [],
            filpx:false,
            filpy:false,
            fontfamily:'微软雅黑',

            // 旋转数值
            rotateNum:0,
            addText:'',
            lineHeight: 1,
            opacity:1,
            bgimgs:[],
            imgs:[],
            imgs1:[],
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
            dataList:[],
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
            dataPost4:'',
            postId: '',
            preview_url: '',
            source_url: '',
            designId: '',
            picId: '',
            designDetail: '',
            showVisible: false,
            nums: "",
            onePrice: "",
            twoPrice: "",
            prices: '',
            shapeActive: -1,
            numberColorName: 'Black',
            numberColor: '#000',
            nameColorName: 'Black',
            nameColor: '#000',
            discounts: '',
            fontfamilydata: -1,
            imgIndex: 0,
            boxSize1: [],
            boxSize2: [],
            boxSize3: [],
            boxSize4: []
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
            
            this.setEditIcon();
            this.setEditPointer();
            if(this.$route.query.show){
                this.loadFromJSON(this.myCanvas1,JSON.parse(this.$route.query.res.posititveDesignArea));
                this.loadFromJSON(this.myCanvas2,JSON.parse(this.$route.query.res.backDesignArea))
                this.loadFromJSON(this.myCanvas3,JSON.parse(this.$route.query.res.leftDesignArea))
                this.loadFromJSON(this.myCanvas4,JSON.parse(this.$route.query.res.rightDesignArea))
                this.bgimgs = this.$route.query.res.list;
                this.postId = this.$route.query.res.goodsId;
                this.picId = this.$route.query.res.picId
                console.log(this.bgimgs)
                
            }
            
            //console.log(this.form)
        })
        //this.getWindowScreen();
        this.getArtFontList();
        this.show = this.$route.query.show ? this.$route.query.show : false
        this.handleGetPic('');
        console.log(this.boxSize1)
        
    },

    methods:{
        removeColor(){
            let that = this;
            let f = fabric.Image.filters;
            if(that.delWhite){
                that.applyFilter(2, true && new f.RemoveColor({
                    distance: 0.1,
                    color: '#fff',
                }));
                that.applyFilterValue(2, 'color', that.removecolor);
            }else{
                that.applyFilter(2, true && new f.RemoveColor({
                    distance: 0,
                    color: '#fff',
                }));
                that.applyFilterValue(2, 'color', that.removecolor);
            }
            
        },
        applyFilterValue(index, prop, value) {
            var obj = this.myCanvas.getActiveObject();
            if (obj.filters[index]) {
                obj.filters[index][prop] = value;
                obj.applyFilters();
                this.myCanvas.renderAll();
            }
        },
        applyFilter(index, filter) {
                  
            var obj = this.myCanvas.getActiveObject();
            obj.filters[index] = filter;
            obj.applyFilters();
            this.myCanvas.renderAll();
        },
        posteDesignList(){
            handleDesignList().then(res => {
                console.log(res)
                if(res.code == 200){
                    this.$router.push({path: '/orderres'})
                }
            })
        },
        handleChangePRO(){
            this.closeDesignBox();
        },
        handleGetPic(content){
            getPic(content).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.imgs = res.result;
                }
            })
        },
        changeNameFamily(e){
            console.log(e)
            this.nameFontFamily = e;
            let obj = this.myCanvas.getActiveObject();
            obj.set('fontFamily', e)
            this.myCanvas.requestRenderAll();
        },
        changeNumberFamily(e){
            console.log(e)
            this.numberFontFamily = e;
            let obj = this.myCanvas.getActiveObject();
            obj.set('fontFamily', e)
            this.myCanvas.requestRenderAll();
        },
        reStart(){
            console.log(1)
            
        },
        minus(data) {
            console.log(data);
            if (this.nums && this.nums > data) {
                this.nums--;
                this.disCounts(this.nums, this.resPrice);
                if (this.prices) {
                this.twoPrice = (this.prices - this.onePrice) * this.nums;
                }
            }
        },
        plus() {
            this.nums++;
            this.disCounts(this.nums, this.resPrice);
            if (this.prices) {
                this.twoPrice = (this.prices - this.onePrice) * this.nums;
            }
        },
        onChangeValues(e) {
            console.log("radio checked", e.target.value);
            this.prices = e.target.value;
            this.twoPrice = (e.target.value - this.onePrice) * this.nums;
        },
        onChangeNums() {
            if(this.nums < this.minNums) {
                this.nums = this.minNums
            }
            this.disCounts(this.nums, this.resPrice);
            this.twoPrice = (this.prices - this.onePrice) * this.nums;
        },
        showEdModal(id) {
            console.log(id);

            this.showVisible = true;
            discount().then(res => {
                console.log(res);
                this.discounts = res.result;
            });
            const param = {
                picId: id
            };
            setTimeout(() => {
                discountEdit1(param).then(res => {
                console.log(res);
                this.designDetail = res.result;
                this.nums = res.result.quantity
                    ? res.result.quantity
                    : res.result.minOrder;
                this.prices = res.result.actualPrice
                    ? res.result.actualPrice
                    : res.result.price;
                this.pid = res.result.id;
                const numbers = this.nums;
                this.minNums = res.result.minOrder
                this.disCounts(numbers, res.result.maxPrice);
                console.log(res.result.price - this.onePrice);
                this.resPrice = (res.result.maxPrice * this.discounts) / 100;
                this.twoPrice = (this.prices - this.onePrice) * this.nums;
                });
            }, 1000);
        },
        disCounts(datas, datanum) {
            if (datas >= 1 && datas <= 20) {
                this.onePrice = ((datanum * this.discounts) / 100) * 1;
            } else if (datas >= 21 && datas <= 50) {
                this.onePrice = ((datanum * this.discounts) / 100) * 0.95;
            } else if (datas >= 51 && datas <= 100) {
                this.onePrice = ((datanum * this.discounts) / 100) * 0.9;
            } else if (datas >= 101 && datas <= 500) {
                this.onePrice = ((datanum * this.discounts) / 100) * 0.85;
            } else {
                this.onePrice = ((datanum * this.discounts) / 100) * 0.8;
            }
        },
        addNewPro(){
            this.show = false;
            this.saveEndDesign()
        },
        loadFromJSON (canvas,json) {
            let that = this;
            canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (
                o,
                object
            ) {
                console.log(o,object)
            });
        },
        handleChangeFont(params,isAdd){
            let that = this;
            changeFont(params).then(res => {
                console.log(res)
                if(res.code == 0){
                    let img = new Image();
                    let imgInstance;
                    //设置图片跨域访问
                    img.crossOrigin = 'anonymous';
                    img.src = res.result+"?timeStamp="+new Date();
                    img.onload = function () {
                        if(isAdd){
                            if(that.myCanvas.getActiveObject()){
                                let obj = that.myCanvas.getActiveObject();
                                let left = obj.left;
                                let top = obj.top;
                                that.myCanvas.remove(obj)
                                imgInstance = new fabric.Image(img, {
                                    mytext:that.addText,
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: left,
                                    top: top,
                                });
                            }
                        }else{
                            imgInstance = new fabric.Image(img, {
                                lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                left: 200,
                                top: 150,
                                mytext:that.addText,
                            });
                        }
                        if(imgInstance.width > 200){
                            imgInstance.set('width', 200)
                        }
                        that.myCanvas.add(imgInstance).setActiveObject(imgInstance);
                        that.myCanvas.requestRenderAll();
                        that.liClick = 0;
                        that.visibletype = 3;
                        imgInstance.on("selected", function() {
                            let obj = that.myCanvas.getActiveObject();
                            that.liClick = 0;
                            that.visibletype = 3;
                            that.addText = obj.mytext;
                        });
                    }
                }
            })
        },
        saveFontShapeDesign(fontShape,isAdd){
            //fontShape
            let params = {text: this.addText,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: fontShape,backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)}
            this.handleChangeFont(params,isAdd)
            console.log(this.color)
        },
        getArtFontList(){
            artFontList().then(res => {
                console.log(res)
                this.fontShapeArr = res.result;
            })
        },
        changeFontShape(item,index){
            this.fontShape = item;
            this.shapeActive = index
        },
        getWindowScreen(){
            let screenWidths = window.screen.width;
            console.log(screenWidths)
            if(screenWidths > 1366){
                this.screenWidth = 600;
            }else if(screenWidths <= 1366){
                this.screenWidth = 550;
            }
        },
        PostChangeGoodsColor(id,color){
            changeGoodsColor(id,color).then(res => {
                console.log(res);
                this.bgimgs = res.result;
                this.bindCanvas(this.myCanvas1,0);
                //this.postId
            })
        },

        PostChangeFontFamily(){

        },
        getColorList(status){
            colorList(status).then(res => {
                console.log(res)
                this.colorList = res.result
            })
        },
        postAddRemarksBtn(){
            this.postAddRemarks(this.designId,this.remark)
        },
        postAddRemarks(id,remarks){
            addRemarks(id,remarks).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.$message.success('操作成功！')
                    if(res.result){
                        this.designId = res.result
                    }
                }


            })
        },
        postDeleteEXimg(id){
            let that = this;
            that.$confirm({
                title: "确定删除吗?",
                okText: "确定",
                cancelText: "取消",
                class: "my-modal",
                onOk() {
                    deleteEXimg(id).then(res =>{
                        console.log(res)
                        if(res.code == 200){
                            that.$message.success('操作成功！');
                            that.getReferencePic(that.designId);
                        }
                    })
                },
                onCancel() {
                    console.log("Cancel");
                }
            });
        },
        getReferencePic(pidStr){
            referencePic(pidStr).then(res => {
                console.log(res)
                this.dataList = res.result

            })
        },
        saveEndDesign(){
            this.saveImg();
            this.downLoadImg();
            let params = {
                positivePicUrl: this.dataUrl1,backPicUrl: this.dataUrl2,leftPicUrl: this.dataUrl3,rightPicUrl: this.dataUrl4,
                positiveDesignArea: this.dataPost1, backDesignArea: this.dataPost2, leftDesignArea: this.dataPost3, rightDesignArea: this.dataPost4,
                goodsId: this.postId, id: this.picId
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
                    this.visibletype = -1;
                    this.liClick = -1;
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
                let SIZE= JSON.parse(res.result.boxSizes)
                console.log(SIZE)
                this.boxSize1 = SIZE.canvas1;
                this.boxSize2 = SIZE.canvas2;
                this.boxSize3 = SIZE.canvas3;
                this.boxSize4 = SIZE.canvas4;
                this.handleObjectMove(this.myCanvas1,this.boxSize1.top,600 - this.boxSize1.top - this.boxSize1.height,this.boxSize1.left,600 - this.boxSize1.left - this.boxSize1.width);
                this.handleObjectMove(this.myCanvas2,this.boxSize2.top,600 - this.boxSize2.top - this.boxSize2.height,this.boxSize2.left,600 - this.boxSize2.left - this.boxSize2.width);
                this.handleObjectMove(this.myCanvas3,this.boxSize3.top,600 - this.boxSize3.top - this.boxSize3.height,this.boxSize3.left,600 - this.boxSize3.left - this.boxSize3.width);
                this.handleObjectMove(this.myCanvas4,this.boxSize4.top,600 - this.boxSize4.top - this.boxSize4.height,this.boxSize4.left,600 - this.boxSize4.left - this.boxSize4.width);
                this.handleObjectScale(this.myCanvas1,this.boxSize1.left,this.boxSize1.top,this.boxSize1.width,this.boxSize1.height);
                // this.handleObjectScale(this.myCanvas2);
                // this.handleObjectScale(this.myCanvas3);
                // this.handleObjectScale(this.myCanvas4);
            })
        },
        closeDesignBox(){
            let that = this;
            if(that.liClick == -1 && that.visibletype == -1){
                that.show = false;
            }else{
                that.$confirm({
                    title: "确定离开吗？",
                    content: "未保存的设计将被自动删除",
                    okText: "确认",
                    cancelText: "取消",
                    onOk() {
                        that.show = false;
                        window.location.reload();
                    },
                    onCancel() {}
                });
            }
            
            
        },
        openDesignModal(id){
            console.log(id)
            this.postId = id;
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
            this.getSelectById(id);

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
                console.log(obj.target)
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
                    this.addExampleName(this.nameFontFamily);
                }else{
                    this.myCanvas = this.myCanvas2;
                    this.designModel = 1;
                    this.bindCanvas(this.myCanvas,1);
                    this.myCanvas1.remove(this.exampleName);
                    this.addExampleName(this.nameFontFamily)
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
                    this.addExampleNumber(this.numberFontFamily);
                }else{
                    this.myCanvas = this.myCanvas2;
                    this.designModel = 1;
                    this.bindCanvas(this.myCanvas,1);
                    this.myCanvas1.remove(this.exampleNumber);
                    this.addExampleNumber(this.numberFontFamily);
                }
            }
        },
        delSelected(obj) {
            var that = this;
            obj.on("mouse:down", function(options) {
                if (options.target) {
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
                this.changeFillColor(val,name,true)
                this.fontColorIcon1 = i

            }else if(this.colorKey == 2){
                this.changeTextBgColor(val,name,true)
                this.fontColorIcon2 = i

            }else if(this.colorKey == 3){
                this.changestrokeColor(val,name,true)
                this.fontColorIcon3 = i

            }else if(this.colorKey == 4){
                this.changeShadowColor(val,name,true)
                this.fontColorIcon4 = i

            }else if(this.colorKey == 5){
                this.changeNumberColor(val,name)
                this.fontColorIcon5 = i

            }else if(this.colorKey == 6){
                this.changeFontColor(val,name,i)
                this.fontColorIcon6 = i
            }
            this.handleColorShow();
        },
        
        changeNumberColor(val,name){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                obj.set("fill", val);
                this.myCanvas.requestRenderAll();
                this.numberColorName = name;
                this.numberColor = val;
            }
        },
        changeNameColor(val,name){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                obj.set("fill", val);
                this.myCanvas.requestRenderAll();
                this.nameColorName = name;
                this.nameColor = val;
            }
        },
        changeTextBgColor(val,name,isAdd){
            let params = {
                text: this.addText,style:'outline',fontName:this.fontfamily,
                fontHeight: 50, fontColor: this.color.substr(1), 
                lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), 
                effect: this.fontShape,backGround: val.substr(1),shadowColor: this.shadowColor.substr(1)}
            this.handleChangeFont(params,isAdd)
            
            this.fontBgColorName = name;
            this.bgcolor = val;
        },
        // 设置字体阴影开始
        changeShadowColor(val,name,isAdd){
            let params = {
                    text: this.addText,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: val.substr(1)
                }
            this.handleChangeFont(params,isAdd)
            this.shadowColorName = name;
            this.shadowColor = val;
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
        postAddEximg(pid,picUrl,remarks,fileUrl){
            addEximg(pid,picUrl,remarks,fileUrl).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.example = false;
                    this.$message.success('提交成功！');

                    if(res.result){
                        this.designId = res.result;
                    }
                    this.getReferencePic(this.designId);
                    console.log(this.designId)


                }
            })
        },
        clickOk(){
            this.form.validateFields((err,values) => {
                if (!err) {
                    console.log(values.bz)
                    this.postAddEximg(this.designId,this.preview_url,values.bz,this.source_url);
                }
            },);
        },
        closeUploadModal(){
            this.example = false
        },
        changeProductColor(value,name,i){
            this.productColorIcon = i;
            this.productColor = value;
            this.productColorName = name;
            this.PostChangeGoodsColor(this.postId,value.substr(1))
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
                that.addExampleNumber(that.numberFontFamily)
            }else{
                if(that.exampleNumber){
                    that.myCanvas1.remove(that.exampleNumber);
                    that.myCanvas2.remove(that.exampleNumber);
                }
            }
        },
        addExampleNumber(font){
            let that = this;
            // let myfont = new FontFaceObserver(font);
            // myfont.load().then(function() {
                // when font is loaded, use it.
                that.exampleNumber = new fabric.Text("00", {
                    id: 'Number',
                    fontFamily: font,
                    originX:'center',
                    originY:'center',
                    left: that.screenWidth / 2,
                    top: 300,
                    fontSize: that.numberSize
                });
                that.exampleNumber.lockScalingX = true;
                that.exampleNumber.lockScalingY = true;
                that.myCanvas.add(that.exampleNumber).setActiveObject(that.exampleNumber);
                that.exampleNumber.on("selected", function() {

                    that.liClick = 2;
                    that.visibletype = 2;
                })
            // }).catch(function(e) {
            //     console.log(e)

            // });
        },

        addExampleName(font){
            let that = this;
            // let myfont = new FontFaceObserver(font);
            // myfont.load().then(function() {
                // when font is loaded, use it.
                that.exampleName = new fabric.Text("EXAMPLE", {
                    id: 'Name',
                    fontFamily: font,
                    originX:'center',
                    originY:'center',
                    left: that.screenWidth / 2,
                    top: 200,
                    fontSize: that.nameSize,
                    lockUniScaling:true,
                    
                });
                that.exampleName.lockScalingX = true;
                that.exampleName.lockScalingY = true;
                that.myCanvas.add(that.exampleName).setActiveObject(that.exampleName);
                that.exampleName.on("selected", function() {

                    that.liClick = 2;
                    that.visibletype = 2;
                })
            // }).catch(function(e) {
            //     console.log(e)

            // });
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
                that.addExampleName(that.nameFontFamily)
            }else{
                if(that.exampleName){
                    that.myCanvas1.remove(that.exampleName);
                    that.myCanvas2.remove(that.exampleName);
                }
            }

        },
        moreImgs(index){
            this.visibletype = 11;
            
            this.imgs1 = this.imgs[index].pic
            console.log(this.imgs1)
        },
        beforeUploadEx(file){
            if(file.size / 1024 / 1024 < 10){
                this.uploadA = true
                this.postSourceUpload(file)

            }else{
                this.$message.error('图片大小超出限制！');
                this.uploadA = false
            }
        },
        postSourceUpload(file){
            const formData = new FormData()
            formData.append('file', file)
            sourceUpload(formData).then(res => {
                console.log(res)
                this.preview_url = res.preview_url;
                this.source_url = res.source_url;
            })
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
            this.handleGetPic(value)
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
            let img = new Image();
            let imgInstance;
            //设置图片跨域访问
            img.crossOrigin = 'anonymous';
            img.src = imgUrl+"?timeStamp="+new Date();
            img.onload = function () {
                if(that.designModel == 0 || that.designModel == 1){
                    imgInstance = new fabric.Image(img, {
                        id: id,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: 200,
                        top:  200,
                        scaleX: 0.3,
                        scaleY:0.3,
                    });
                }else{
                    imgInstance = new fabric.Image(img, {
                        id: id,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: 275,
                        top:  170,
                        scaleX: 0.1,
                        scaleY:0.1,
                    });
                }
                that.myCanvas.add(imgInstance);
                that.myCanvas.setActiveObject(imgInstance);
                that.myCanvas.requestRenderAll();
                that.liClick = 1;
                that.visibletype = 10;
                imgInstance.on("selected", function() {
                    let obj = that.myCanvas.getActiveObject();
                    that.liClick = 1;
                    that.visibletype = 10;
                    that.opacity = obj.opacity;
                    that.rotateNum = obj.angle;
                });
            };
        },
        // 添加图片结束
        handleObjectMove(object,top_margin,bottom_margin,left_margin,right_margin){
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

                
                if(zoom > 1){
                        top_margin = 0;
                        bottom_margin = 40;
                        left_margin = 70;
                        right_margin = 140;
                }else{
                    var top_bound = top_margin + top_adjust - pan_y;
                    var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
                    var left_bound = left_margin + left_adjust - pan_x;
                    var right_bound = c_width - right_adjust - right_margin - pan_x;
                }

                

                if( w > c_width ) {
                    obj.set('left',left_bound);
                } else {
                    obj.set('left',Math.min(Math.max(left, left_bound), right_bound));
                }

                if( h > c_height ) {
                        obj.set('top',top_bound);
                } else {
                        obj.set('top',Math.min(Math.max(top, top_bound), bottom_bound));
                }
            });
        },

        handleObjectScale(object,x,y,width,height){
            object.on("object:scaling",function(e){
                var scaledObject = e.target;
                console.log(x,y,width,height)
                scaledObject.lockScalingFlip = true;
                var startX =scaledObject.getPointByOrigin("left","top").x.toFixed();
                var startY =scaledObject.getPointByOrigin("left","top").y.toFixed();
                var maxWidth = width - startX;// scaledObject.aCoords.tl.x;
                var maxHeight = height -startY;
                scaledObject.setCoords();
                
                var isOnScreen = scaledObject.isContainedWithinRect({x:x,y:y},{x:width + x,y:height + y},true,true);
                // console.log("onscreen:",isOnScreen);
                if(!isOnScreen) {
                    // console.log("xy:",startX,startY);
                    // console.log("max:",maxWidth,maxHeight);
                    var w = scaledObject.width;
                    var h = scaledObject.height;
                    // console.log("wh:",w,h);
                    // console.log("obj:",maxWidth-w,maxHeight-h);
                    // console.log("obj:",Math.min(maxWidth,w),Math.min(maxHeight,h));
                    if( (maxHeight-h) < (maxWidth-w)){

                        scaledObject.scaleToHeight(Math.min(maxHeight,h),true);

                    } else{
                        scaledObject.scaleToWidth(Math.min(maxWidth,w),true);
                    }
                }
                return true;
            })
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
            if(key == 4){
                this.getColorList(7);
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
                scaleX: 0.5,
                scaleY: 0.5,

                // *圖片跨域
                crossOrigin: "*",
            });

        },
        // zoomIn(){
        //     var zoom = this.myCanvas.getZoom();
        //     console.log(zoom)
        //     zoom = zoom + 0.4;
        //     if (zoom > 1.4) zoom = 1.4;
        //     this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
        //     this.handleObjectMove(this.myCanvas1,105,264,138,138);
        // },
        // zoomOut(){
        //     var zoom = this.myCanvas.getZoom();
        //     console.log(zoom)
        //     zoom = zoom - 0.4;
        //     if (zoom < 1) zoom = 1;
        //     this.myCanvas.zoomToPoint({ x: 300, y: 300 }, zoom);
        //     this.handleObjectMove(this.myCanvas1,128,150,175,175);
        // },
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
        addItext(text,isAdd) {
            
            let params = {
                    text: text,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)
                }
            this.handleChangeFont(params,isAdd)

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
            console.log(key)
            if(key == 5){
                if(this.addNameData){
                    this.visibletype = 8;
                    this.colorTitle = title;
                    this.colorKey = key;
                }
            }else if(key == 6){
                if(this.addNumberData){
                    this.visibletype = 8;
                    this.colorTitle = title;
                    this.colorKey = key;
                }
            }else{
                this.visibletype = 8;
                this.colorTitle = title;
                this.colorKey = key;
            }
            console.log(key,title);
            this.getColorList(key);
            this.handleColorShow();

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
        changeFontFamily(value,index){
            console.log(`selected ${value}`);
            this.fontfamily = value;
            this.fontfamilydata = index
            let params = {
                    text:  this.addText,style:'outline',fontName: value,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)
                }
            this.handleChangeFont(params,true)
        },
        changeFillColor(val,name,isAdd){
            //let obj = this.myCanvas.getActiveObject();
            
            let params = {
                    text:  this.addText,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: val.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)
                }
            this.handleChangeFont(params,isAdd)
            this.colorName = name;
            this.color = val;
            

        },
        // 改变描边样式开始
        changestrokeColor(val,name,isAdd){
            
            let params = {
                    text:  this.addText,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1),
                    lineweight: this.strokeWidth, outLineColor: val.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)
                }
            this.handleChangeFont(params,isAdd)
            this.strokeColorName = name;
            this.strokeColor = val;
        },
        changestrokeWidth(){
            let params = {
                    text:  this.addText,style:'outline',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1),
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1)
                }
            this.handleChangeFont(params,true)
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
        handleColorShow(){
            console.log(33)
            if(this.colorKey == 1){
                this.colorShow = this.color;
                this.colorShowName = this.colorName;
            }else if(this.colorKey == 2){
                this.colorShow = this.bgcolor;
                this.colorShowName = this.fontBgColorName;
            }else{
                this.colorShow = '#000';
                this.colorShowName = '黑色';
            }
        }
    },
    computed:{

    }
}
</script>
<style lang="less">
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
@font-face {
    font-family:'College-Regular';
    src:url('./../../fonts/CHEISF.ttf')format('truetype')
}
@font-face {
    font-family:'NBA-Cavaliers';
    src:url('./../../fonts/NBACAVAL.TTF')
}
@font-face {
    font-family:'NBA-Grizzlies';
    src:url('./../../fonts/NBAGRIZZ_0.TTF')
}
@font-face {
    font-family:'NBA-Hawks';
    src:url('./../../fonts/NBAHAWKS.TTF')
}
@font-face {
    font-family:'NBA-Knicks';
    src:url('./../../fonts/NBAKNICK.TTF')
}
@font-face {
    font-family:'NBA-Pacers';
    src:url('./../../fonts/NBAPACER.TTF')
}
@font-face {
    font-family:'NBA-Pistons';
    src:url('./../../fonts/NBAPISTO.TTF')
}
@font-face {
    font-family:'NBA-Rockets';
    src:url('./../../fonts/NBAROCKE.TTF')
}
@font-face {
    font-family:'NBA-Trailblazers';
    src:url('./../../fonts/NBATRAIL.TTF')
}
@font-face {
    font-family:'NCAA-Utah-Utes';
    src:url('./../../fonts/NCAAUtahUtes.ttf')
}
@font-face {
    font-family:'Stahls-Tiffany---2000';
    src:url('./../../fonts/StahlsTiffany-2000.ttf')
}
@font-face {
    font-family:'UA-Cadet';
    src:url('./../../fonts/UACadet.ttf')
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
            padding: 51px;
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
                    padding: 5px;
                    width: 50px;
                    height: 50px;
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
                max-height: 700px;
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
                            .active{
                                background-color: #33b8b3 !important;
                            }
                        }
                }
                .tool-box4{
                        margin-top: 20px;
                        .color-list-box{
                            display: flex;
                            border-bottom: 1px solid #ccc;
                            flex-wrap: wrap;
                            margin-bottom: 20px;
                            padding: 10px 0;
                            li{
                                    width: 26px;
                                    height: 26px;
                                    margin: 4px;
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
                            width: 25%;
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
                            width: 25%;
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
                            // .font-style{
                            //     span{
                            //         border: 1px solid #33b8b3;
                            //         border-radius: 4px;
                            //         display: inline-block;
                            //         padding: 4px 10px;
                            //         margin: 0;
                            //         cursor: pointer;
                            //         &:nth-child(1){
                            //             border-top-right-radius: 0;
                            //             border-bottom-right-radius: 0;
                            //         }
                            //         &:nth-child(2){
                            //             border-radius: 0;
                            //             border-left: none;
                            //             border-right: none;
                            //         }
                            //         &:nth-child(3){
                            //             border-radius: 0;

                            //             border-right: none;
                            //         }
                            //         &:nth-child(4){
                            //             border-top-left-radius: 0;
                            //             border-bottom-left-radius: 0;
                            //         }
                            //         i{
                            //             color: #33b8b3;
                            //             font-size: 20px;
                            //         }
                            //     }
                            //     > p{
                            //         color: #33b8b3;
                            //     }
                            // }
                            .active{
                                background-color: #33b8b3 !important;
                                i{
                                    color: #fff !important;
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
                            margin: 4px;
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
.show-details {
  .number {
    display: flex;
    align-items: center;
    padding: 20px 0 10px 0;
    .number-box {
      display: flex;
      align-items: center;
      .common-radio {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #33b8b3;
        text-align: center;
        line-height: 24px;
        color: #fff;
        margin: 4px 0;
        cursor: pointer;
      }
      .num {
        margin: 0 10px;
        text-align: center;
      }
    }
  }
  .prices {
    display: flex;
    align-items: center;
    margin: 20px 0 10px 0;
    .price-box {
      display: flex;
      align-items: center;
      .price-input {
        padding: 0 10px;
        width: 100px;
      }
    }
  }
  .price-right {
    flex: 1;
    text-align: right;
}
}
</style>