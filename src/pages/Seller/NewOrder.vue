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
                        <a-sub-menu  v-for="(item, index) in menuList" :key="index">
                            <span slot="title" style="display: flex;align-items: center;"><a-avatar :size="20" :src="item.icon" style="margin-right: 5px;" v-if="item.icon"/><span>{{item.title}}</span></span>
                            <a-menu-item v-for="(sub,sindex) in item.subMenu" :key="'sub'+ index + sindex.toString()" @click="handleGetList(sub.categoryId)">{{sub.title}}</a-menu-item>
                        </a-sub-menu>

                        </a-menu>
                    </div>
                </a-col>
                <a-col :span="18" style="height: 100%;">
                    <User style="background-color: #fff; padding-top: 20px;border-top-right-radius: 10px;"></User>

                    <div class="right">
                        <my-title :title="'New Order'" :fontsize="20">
                            <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
                        </my-title>
                        <goods-list :goodsArr="goodsList" @on-click="openDesignModal($event)"></goods-list>
                        <div class="btn-box">
                            <a-button :loading="loading" @click="loadMore" :disabled="btnable">
                                MORE
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
                                Replace product
                            </li>
                        </ul>
                        <div class="container">
                            <h2>CUSTOM KING T-Shirt<span @click="sizeList = true">View Size Chart</span></h2>
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
                                        <h2>HOW DO YOU WANT TO GET STARTED?</h2>
                                        <ul class="btn-box">
                                            <li @click="startTo(0)" v-intro="'start your design from here'" v-intro-step="1" class="active-btn">
                                                <span class="icon-txt"></span>
                                                Add text
                                            </li>
                                            <li @click="startTo(1)">
                                                <span class="icon-icon-image"></span>
                                                Add Cliparts
                                            </li>
                                        </ul>
                                        <ul class="btn-box">
                                            <li @click="startTo(6)">
                                                <span class="icon-upload"></span>
                                                Upload design
                                            </li>
                                            <li @click="changeProductType">
                                                <span class="icon-change_product"></span>
                                                Change Product
                                            </li>
                                        </ul>
                                        <p>OR<a @click="reStart">START OVER</a></p>
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
                                            Add text
                                        </h2>
                                        <div class="add-text">
                                            <p>ADD TO DESIGN</p>
                                            <a-input v-model="addText"></a-input>
                                            <a-button type="primary" @click="addItext(addText,false)" :disabled="!addText" style="border-radius: 12px;">ADDING DESIGN</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box6" v-show="visibletype == 1">
                                        <div class="upload-box">
                                            <h4>PLEASE SELECT THE FILE TO UPLOAD</h4>
                                            <a-upload-dragger name="file" class="my-upload" :beforeUpload="beforeUpload" accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif">
                                                    <p class="ant-upload-drag-icon">
                                                        <a-icon type="cloud-upload" />
                                                    </p>
                                                    <p class="ant-upload-text">DRAG AND DROP OR BROWSE YOUR COMPUTER</p>
                                            </a-upload-dragger>
                                            <p>ACCEPTED FILE TYPE(MAXIMUM SIZE: 10MB)</p>
                                            <p>
                                                <span>.JPG</span>
                                                <span>.JPEG</span>
                                                <span>.GIF</span>
                                                <span>.PNG</span>
                                                <span>.BMP</span>
                                                <span>.PDF</span>
                                                <span>.AI</span>
                                                <span>.PSD</span>
                                                <span>.EPS</span>
                                            </p>
                                        </div>
                                        <h3>Insert Clipart：</h3>
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
                                        

                                    </div>
                                    <div class="tool-box8" v-show="visibletype == 2">
                                        <dl>
                                            <dt>
                                                Name And Number：
                                            </dt>
                                            <dd>
                                                <span style="min-width: 52px;">Step 1：</span>
                                                <div>
                                                    <p>
                                                        <a-checkbox @change="addName">ADD A NAME</a-checkbox>
                                                    </p>
                                                    <p>
                                                        <a-checkbox @change="addNumber">Add a number</a-checkbox>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>Position：</span>
                                                <div>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 95%;" @change="changeNamePosition" :disabled="!addNameData">
                                                            <a-select-option value="0">Chest</a-select-option>
                                                            <a-select-option value="1">BACK</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="0" style="width: 100%;" @change="changeNumberPosition" :disabled="!addNumberData">
                                                            <a-select-option value="0">Chest</a-select-option>
                                                            <a-select-option value="1">BACK</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>HEIGHT：</span>
                                                <div>
                                                    <p>
                                                        <a-select defaultValue="6cm" style="width: 95%;" @change="changeNameSize" :disabled="!addNameData || keyId !== 'Name'">
                                                            <a-select-option value="20">6cm</a-select-option>
                                                            <a-select-option value="30">7cm</a-select-option>
                                                            <a-select-option value="40">8cm</a-select-option>
                                                            <a-select-option value="50">9cm</a-select-option>
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select defaultValue="15cm" style="width: 100%;" @change="changeNumberSize" :disabled="!addNumberData || keyId !== 'Number'">
                                                            <a-select-option value="150">15cm</a-select-option>
                                                            <a-select-option value="170">18cm</a-select-option>
                                                            <a-select-option value="190">20cm</a-select-option>
                                                            <a-select-option value="200">25cm</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>Font：</span>
                                                <div>
                                                    <p>
                                                        <a-select style="width: 95%;" :disabled="!addNameData || keyId !== 'Name'" placeholder="Please choose" @change="changeNameFamily">
                                                            <a-select-option v-for="item in fontFamilyArr" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
                                                            
                                                        </a-select>
                                                    </p>
                                                    <p>
                                                        <a-select style="width: 100%;" :disabled="!addNumberData || keyId !== 'Number'" placeholder="Please choose" @change="changeNumberFamily">
                                                            <a-select-option v-for="item in fontFamilyArr" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
                                                        </a-select>
                                                    </p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <span>COLOR：</span>
                                                <div class="color-picker">
                                                    <p>
                                                        {{nameColorName}}<span :style="{backgroundColor: nameColor}" @click="openChangeColorBox(5,'Name Color')"></span>
                                                    </p>
                                                    <p>
                                                        {{numberColorName}}<span :style="{backgroundColor: numberColor}" @click="openChangeColorBox(6,'Number Color')"></span>
                                                    </p>
                                                </div>
                                            </dd>
                                        </dl>
                                        <div style="text-align: center;">
                                            <a-button type="primary" :disabled="!addNameData && !addNumberData" @click="visibletype = 9">
                                                Input Number and Name
                                            </a-button>
                                        </div>
                                    </div>

                                    <div class="tool-box9" v-show="visibletype == 3">
                                        <!-- 文字编辑栏 -->
                                        <my-title :title="'Edit Text'"></my-title>
                                        <div class="second">
                                            <div class="text-tool">
                                                <a-input v-model="editText" style="width: 70%"></a-input>
                                                <a-button type="primary" @click="addItext(editText,true)" :disabled="!editText" style="border-radius: 12px;">Modifying text</a-button>
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
                                                <span>Text Shape</span>
                                                <p>
                                                    <span>{{fontShape}}</span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                            <li @click="openChangeColorBox(1,'Font colour')">
                                                <span>Font colour</span>
                                                <p>
                                                    <span>{{colorName}} <i class="square" :style="{backgroundColor:color}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                            <li @click="openChangeColorBox(2,'Text Background Colour')">
                                                <span>Text Background Colour</span>
                                                <p>
                                                    <span>{{fontBgColorName}} <i class="square" :style="{backgroundColor:bgcolor}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                            <li @click="openChangeColorBox(3,'Outline Color')">
                                                <span>Outline Color:</span>
                                                <p>
                                                    <span>{{strokeColorName}} <i class="square" :style="{backgroundColor: strokeColor}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                            <li @click="openChangeColorBox(4,'Shadow Color')">
                                                <span>Shadow：</span>
                                                <p>
                                                    <span>{{shadowColorName}} <i class="square" :style="{backgroundColor: shadowColor}"></i></span>
                                                    <a-icon type="right" />
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box10" v-show="visibletype == 4">
                                        <h2>COLOR：</h2>
                                        <p>Choose Color： <span :style="{backgroundColor: productColor ? productColor : '#fff'}"></span> {{productColorName ? productColorName : 'White'}}</p>
                                        <ul class="color-list">
                                            <li v-for="(item,index) in colorList.list" :key="index" :style="{backgroundColor: item.itemValue}" @click="changeProductColor(item.itemValue,item.itemText,index)">
                                                <a-icon type="check" v-show="productColorIcon == index"/>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                    <div class="tool-box11" v-show="visibletype == 5">
                                        <h2>Design notes：</h2>
                                        <a-textarea placeholder="Please Add Notes" :rows="8" v-model="remark"/>
                                        <div style="text-align: center;margin-top: 10px;">
                                            <a-button type="primary" :disabled="!remark" @click="postAddRemarksBtn">Save changes</a-button>
                                        </div>
                                    </div>
                                    <div class="tool-box12" v-show="visibletype == 6">
                                        <h2>Reference pictures：</h2>
                                        <div class="upload-box">
                                            <a-button type="primary" @click="example = true">
                                                Upload photos
                                            </a-button>
                                            <p>
                                                You can upload your design as a reference and attach an explanation
                                            </p>
                                        </div>
                                        <ul class="info-list">
                                            <li v-for="(item,index) in dataList" :key="index">
                                                <img :src="item.picUrl" alt="" width="100" height="100" v-preview="item.picUrl">
                                                <div>
                                                    <p>{{item.remarks}}</p>
                                                    <span>
                                                        <a-icon type="delete" @click="postDeleteEXimg(item.id)"/>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box3" v-show="visibletype == 7" style="padding-bottom: 70px;padding-top: 20px;">
                                        <h2 style="width: 100%;background-color:#eee; color: #333;text-align: left; border-bottom: 1px solid #333; padding: 5px;position: absolute;top: 0;left: 0">
                                            <a-icon type="left" style="cursor: pointer;" @click="visibletype = 3"/>
                                            Font Family
                                        </h2>
                                        <ul class="font-family-list1">
                                            <li v-for="(item,index) in fontFamilyArr" :key="item.id" @click="changeFontFamily(item.name,index)" :style="{backgroundColor: fontfamilydata == index ? '#33b8b3' : '',color: fontfamilydata == index ? '#fff' : '#666'}">
                                                <span :style="{fontFamily: item.name}" >ABCDEFGHIJKLMN</span>
                                                <span>{{item.name}}</span>
                                            </li>
                                        </ul>
                                        <p class="bottom-btn-box" style="position: absolute;bottom: 0;left: 0;width: 100%;padding-bottom: 20px;background-color: #eee;">
                                            <a-button style="margin-right: 10px;" @click="removeFontFamily">Remove Font Family</a-button>
                                            <a-button type="primary" @click="PostChangeFontFamily">Change</a-button>
                                        </p>
                                        
                                    </div>
                                    <div class="tool-box4" v-show="visibletype == 8">
                                        <h2 style="color: #33b8b3;text-align: left; border-bottom: 1px solid #999; padding-bottom: 5px; font-size: 18px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="goBackPage"/>
                                            {{colorTitle}}
                                        </h2>
                                        <dl>
                                            <dd style="padding: 0 10px;" v-if="changeWidthShow == 3">
                                                <span style="margin-bottom: 5px;">SIZE：</span>
                                                <a-slider :min="0" :max="10" v-model="strokeWidth" :step="1" @change="changestrokeWidth" style="width: 95%;margin:10px auto;"/>
                                            </dd>
                                            <dd style="padding: 0 10px;" v-if="changeWidthShow == 4">
                                                <span>SIZE：</span>
                                                <a-slider :min="0" :max="30" v-model="Shadow1" :step="5" @change="changeShadowWidth" style="width: 95%;margin:10px auto;"/>
                                            </dd>
                                        </dl>
                                        <!-- <my-title :title="colorTitle"></my-title> -->
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 1">Choose Color： 
                                            <span :style="{backgroundColor: color}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{colorName}}
                                        </p>
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 2">Choose Color： 
                                            <span :style="{backgroundColor: bgcolor}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{fontBgColorName}}
                                        </p>
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 3">Choose Color： 
                                            <span :style="{backgroundColor: strokeColor}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{strokeColorName}}
                                        </p>
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 4">Choose Color： 
                                            <span :style="{backgroundColor: shadowColor}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{shadowColorName}}
                                        </p>
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 5">Choose Color： 
                                            <span :style="{backgroundColor: nameColor}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{nameColorName}}
                                        </p>
                                        <p style="display:flex;align-items: center;margin-top: 20px; font-size: 18px;color: #999;" v-if="colorKey == 6">Choose Color： 
                                            <span :style="{backgroundColor: numberColor}" style="width: 20px;height: 20px;display: inline-block;margin:0 10px;border:1px solid #ccc;"></span>{{numberColorName}}
                                        </p>
                                        <ul class="color-list-box">
                                            <li v-for="(item,index) in colorList.list" :key="item.itemText" :style="{backgroundColor: item.itemValue}" @click="changeAllColor(item.itemValue,item.itemText,index)">
                                                <template v-if="colorList.key == 1">
                                                    <a-icon type="check" v-show="fontColorIcon1 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 2">
                                                    <a-icon type="check" v-show="fontColorIcon2 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 3">
                                                    <a-icon type="check" v-show="fontColorIcon3 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 4">
                                                    <a-icon type="check" v-show="fontColorIcon4 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 5">
                                                    <a-icon type="check" v-show="fontColorIcon5 == index"></a-icon>
                                                </template>
                                                <template v-if="colorList.key == 6">
                                                    <a-icon type="check" v-show="fontColorIcon6 == index"></a-icon>
                                                </template>
                                            </li>
                                        </ul>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 1">
                                            <a-button style="margin-right: 10px;" @click="removeFontColor">Remove Font Color</a-button>
                                            <a-button type="primary" @click="changeFillColor(color,colorName,true)">Change</a-button>
                                        </p>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 2">
                                            <a-button style="margin-right: 10px;" @click="removeFontBgColor">Remove FontBg Color</a-button>
                                            <a-button type="primary" @click="changeTextBgColor(bgcolor,fontBgColorName,true)">Change</a-button>
                                        </p>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 3">
                                            <a-button style="margin-right: 10px;" @click="removeStrokeColor">Remove Stroke</a-button>
                                            <a-button type="primary" @click="changestrokeColor(strokeColor,strokeColorName,true)">Change</a-button>
                                        </p>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 4">
                                            <a-button style="margin-right: 10px;" @click="removeShadowColor">Remove Shadow</a-button>
                                            <a-button type="primary" @click="changeShadowColor(shadowColor,shadowColorName,true)">Change</a-button>
                                        </p>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 5">
                                            <a-button style="margin-right: 10px;" @click="removeNameColor">Remove Name Color</a-button>
                                            <a-button type="primary" @click="changeNameColor(nameColor)">Change</a-button>
                                        </p>
                                        <p class="bottom-btn-box" v-if="changeWidthShow == 6">
                                            <a-button style="margin-right: 10px;" @click="removeNumberColor">Remove Number Color</a-button>
                                            <a-button type="primary" @click="changeNumberColor(numberColor)">Change</a-button>
                                        </p>
                                    </div>
                                    <div class="tool-box5" v-show="visibletype == 9">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="goBackPage"/>
                                        </h2>
                                        <h3>NAME AND NUMBER</h3>
                                        <div>
                                            <ul style="display:flex;background-color: #ccc;padding: 5px 0;">
                                                <li style="width: 40%; color:#33b8b3;padding-left: 10px;">Name</li>
                                                <li style="width: 20%; color:#33b8b3;padding-left: 10px;">Number</li>
                                                <li style="width: 30%; color:#33b8b3;padding-left: 10px;">Size</li>
                                            </ul>
                                            <a-form :form="form1" @submit="handleSubmit">
                                                <a-form-item v-for="k in form1.getFieldValue('keys')" :key="k" :required="false" style="width: 100%; margin: 0">
                                                    <a-input-group compact style="display: flex;width: 100%;">
                                                        <a-form-item style="width: 40%; margin: 0;min-height: 79px;">
                                                            <a-input v-decorator="[
                                                                `names[${k}]`,
                                                                {
                                                                    validateTrigger: ['change', 'blur'],
                                                                    rules: [{
                                                                    required: addNameData,
                                                                    whitespace: true,
                                                                    message: 'Please Fill In Name',
                                                                    }],
                                                                }
                                                                ]"
                                                                :disabled="!addNameData"
                                                                placeholder="Name"
                                                                style="width: 100%;border-top-right-radius: 0px;border-bottom-right-radius: 0px; border-right: none;"/>
                                                            </a-form-item>

                                                            <a-form-item style="width: 20%; margin: 0;min-height: 79px;">
                                                                <a-input v-decorator="[
                                                                `number[${k}]`,
                                                                {
                                                                    validateTrigger: ['change', 'blur'],
                                                                    rules: [{
                                                                    required: addNumberData,
                                                                    whitespace: true,
                                                                    message: 'Please Fill In Name',
                                                                    }],
                                                                }
                                                                ]"
                                                                :disabled="!addNumberData"
                                                                placeholder="Name" style="width: 100%;border-radius: 0;border-right: none"/>
                                                            </a-form-item>
                                                            <a-form-item style="width: 30%; margin: 0;min-height: 79px;">
                                                                <a-select
                                                                    v-decorator="[
                                                                        `size[${k}]`,
                                                                        {
                                                                            rules: [{
                                                                            required: true,
                                                                            message: 'Please Fill In Size(s)',
                                                                            }],
                                                                        }
                                                                        ]"
                                                                        style="width: 100%; border-top-left-radius: 0;border-bottom-left-radius: 0;"
                                                                        placeholder="Size"
                                                                >
                                                                    <a-select-option value="S">S</a-select-option>
                                                                    <a-select-option value="M">M</a-select-option>
                                                                    <a-select-option value="L">L</a-select-option>
                                                                    <a-select-option value="XL">XL</a-select-option>
                                                                    <a-select-option value="XXL">XXL</a-select-option>
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
                                                        <a-icon type="plus" /> Add more
                                                    </a>
                                                </a-form-item>
                                                <a-form-item style="text-align: center;">
                                                <a-button
                                                    type="primary"
                                                    html-type="submit"
                                                >
                                                    Save
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
                                                <span title="Bring to Front" @click="toTopLayer"><i class="icon-top_layer "></i></span>

                                                <span title="Send to Back" @click="toBottomLayer"><i class="icon-last_layer"></i></span>
                                                <p>Layer</p>
                                            </li>
                                            <li class="set-filp">
                                                <span title="Bring to Front" @click="changeFilPx"><a-icon type="vertical-left" /></span>
                                                <span title="Send to Back" @click="changeFilPy"><a-icon type="vertical-left" style="transform:rotate(90deg)"/></span>
                                                <p>Flip</p>
                                            </li>
                                        </ul>
                                        <div class="set-rotate">
                                            <p>Rotate</p>
                                            <a-slider :min="0" :max="360" :step="10" @change="setRotate" v-model="rotateNum"/>
                                        </div>
                                        <ul class="tool-list">
                                            <li>
                                                <span>Remove white</span>
                                                <a-switch v-model="delWhite" @change='removeColor'/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box7" v-show="visibletype == 11">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="arrow-left" style="cursor: pointer;" @click="visibletype = 1"/>
                                        </h2>
                                        <ul>
                                            <li v-for="(item,index) in imgs1" :key="index" @click="addImg(item.pic_url)">
                                                <img :src="item.pic_url" alt="">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tool-box3" v-show="visibletype == 12">
                                        <h2 style="color: #333;text-align: left; border-bottom: 1px solid #333; padding-bottom: 5px;">
                                            <a-icon type="left" style="cursor: pointer;" @click="visibletype = 3"/>
                                            Text Shape
                                        </h2>
                                        <ul class="font-family-list">
                                            <li v-for="(item,index) in fontShapeArr" :key="index" @click="changeFontShape(item.itemText,index)" :class="{active: shapeActive == index}">
                                                <span>
                                                    <img :src="item.itemValue" alt="">
                                                </span>
                                            </li>
                                        </ul>
                                        <div style="text-align: center;padding-top: 20px;">
                                            <a-button style="margin-right: 10px;" @click="removeShape">Remove Shape</a-button>
                                            <a-button type="primary" @click="saveFontShapeDesign(fontShape,true)">Change</a-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="submit-box">
                        <a-button type="primary" @click="showEdModal(postId)">Quote Now</a-button>
                        <li style="display: flex; align-item">
                            <commonBtn
                                @handleLink1="addNewPro"
                                :width="'143px'"
                                :height="'32px'"
                                :padding="'15px'"
                                :radio="'12px'"
                                :fontsize="'16px'"
                                :title="'Add Product'"
                                :icon="'plus'"
                                v-intro="'Here will take you to new miles'" v-intro-step="2"
                            >
                            </commonBtn>
                            <a-button type="primary" v-intro="'Here is the attribution of your design.'" v-intro-step="3"><span class="icon-save" style="margin-right: 10px;vertical-align: middle"></span><a @click="saveEndDesign"> Save Design</a></a-button>
                        </li>
                    </ul>
                </div>
            </a-modal>
            <a-modal
                v-model="example"
                title="Reference picture upload："
                :centered="true"
                width="45%"
                :footer="null"
            >
                <div class="upLoadExampleImg">
                    <a-form :form="form" style="display: flex;justify-content: space-between;">
                        <a-form-item
                            label="Attachment"
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
                            accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                            v-decorator="['img',{rules: [{ required: true, message: 'Please upload pictures！' }]}]"
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
                                <p>ACCEPTED FILE TYPE(MAXIMUM SIZE: 10MB)</p>
                                <p>
                                    <span>.JPG</span>
                                    <span>.JPEG</span>
                                    <span>.GIF</span>
                                    <span>.PNG</span>
                                    <span>.BMP</span>
                                    <span>.PDF</span>
                                    <span>.AI</span>
                                    <span>.PSD</span>
                                    <span>.EPS</span>
                                </p>
                            </div>

                        </a-form-item>
                        <a-form-item
                            label="Description "
                            :label-col="{ span: 7 }"
                            :wrapper-col="{ span: 17 }"
                            style="width: 55%;"
                        >
                            <a-textarea :rows="4" v-decorator="['bz',{rules: [{ required: true, message: 'Please Fill In Description!' }]}]"/>
                        </a-form-item>
                    </a-form>
                    <div class="btn-box">
                        
                        <a-button style="color:#ccc;border-color: #ccc;" @click="closeUploadModal">Cancel</a-button>
                        <a-button @click="clickOk">Submit</a-button>
                    </div>
                </div>
            </a-modal>
            <a-modal
                v-model="endDsign"
                title=" Save the design"
                :centered="true"
                width="40%"
                :footer="null"
            >
                <div class="end-design">
                    <div class="content">
                        <div class="title">
                            <a-icon type="smile" theme="filled"/>
                            <div>
                                <h3>Successful！</h3>
                                <p>Thank you for your trust.</p>
                            </div>
                        </div>
                        <p>Additional tips. This success prompt appears after a series of tasks, such as a step-by-step form task in the pop-up window, and a prompt after completing the final step. Simple pop-up tasks use the Message prompt directly.</p>
                    </div>
                    <div class="btn-box">
                        <a-button icon="file-text" @click="$router.push({path:'/grouporder/designList'})">Order list</a-button>
                        <a-button type="primary" icon="" style="vertical-align: middle;" @click="posteDesignList">
                            <img src="@/assets/monry-icon-bar.png" alt="" width="12" height="19" style="margin-right: 5px;">
                            Order now
                        </a-button>
                    </div>
                </div>
            </a-modal>
            <a-modal
                class="show-details"
                title="Quote Now"
                v-model="showVisible"
                width="50%"
                :footer="null"
                
            >
                <a-row :gutter="20" style="padding:20px">
                <a-col :span="8">
                    <a-row :gutter="20">
                    <h3 style="color: #33b8b3;padding-left: 20px;">{{ designDetail.name }}</h3>
                    <a-col :span="12">
                        <img width="100%" :src="designDetail.positivePicUrl" v-preview="designDetail.positivePicUrl"/>
                    </a-col>
                    <a-col :span="12">
                        <img width="100%" :src="designDetail.backPicUrl" v-preview="designDetail.backPicUrl"/>
                    </a-col>
                    </a-row>
                </a-col>
                <a-col :span="16">
                    <div class="number">
                    <div class="font-18">Quantity：</div>
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
                        Your Price：
                        <span>${{onePrice | moneyFormat}}</span>
                    </div>
                    </div>
                    <div class="font-color">Minimum Order Quantity{{designDetail.minOrder}}</div>
                    <div class="prices">
                    <div class="price-box">
                        <div class="font-18">Selling Price:</div>
                        <div class="price-input">
                        <a-input :value="prices" type="number" @change="onChangeValues" style="width: 120px" />
                        </div>
                        <div class="font-18">/PC</div>
                    </div>
                    <div class="price-right">
                        Your Profit：
                        <span>${{twoPrice | moneyFormat}}</span>
                    </div>
                    </div>
                    <div class="font-color">Suggested selling price：${{designDetail.price}}/PC</div>
                </a-col>
                </a-row>
            </a-modal>
        </div>
        <a-modal :visible="sizeList" :footer="null" width="40%" :centered="true" style="padding: 0;" title="Size chart:" @cancel="sizeList = false">
            <img :src="sizePicUrl" alt="" style="width: 100%;">
        </a-modal>
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
        changeGoodsColor,
        artFontList,
        changeFont,
        discountEdit1,
        discount,
        getPic,
        handleDesignList,
        rmWhite,
        queryByUrl
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
            editText: '',
            sizePicUrl:'',
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
            productColorIcon: -1,
            productColor: '',
            productColorName: '',
            //字体颜色值 | 颜色名
            color:'#B17700',
            colorName:'Pantone 1395',
            //字体背景颜色值 | 颜色名
            bgcolor:'',
            fontBgColorName:'',
            // 选择展示的颜色及颜色名
            fontShape: '',
            colorShow: '#000',
            colorShowName: 'BLACK',
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
            reImgColorurl: '',
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
            fontfamily:'FZCHYFW',

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
                    text: 'Text'
                },
                {
                    key:1,
                    className: 'icon-icon-image',
                    text: 'Image'
                },
                {
                    key:2,
                    className: 'icon-icon-04',
                    text: 'Number'
                },
                {
                    key:4,
                    className: 'icon-icon-06',
                    text: 'Product colour'
                },
                {
                    key:5,
                    className: 'icon-bz',
                    text: 'Design notes'
                },
                {
                    key:6,
                    className: 'icon-upload',
                    text: 'Upload design'
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
            designDetail: '',
            showVisible: false,
            nums: "",
            onePrice: "",
            twoPrice: "",
            prices: '',
            shapeActive: -1,
            numberColorName: 'Pantone 1395',
            numberColor: '#B17700',
            nameColorName: 'Pantone 1395',
            nameColor: '#B17700',
            discounts: '',
            fontfamilydata: -1,
            imgIndex: 0,
            boxSize1: {},
            boxSize2: {},
            boxSize3: {},
            boxSize4: {},
            sizeList: false,
            changeWidthShow:0,
            keyId:'sss'
        }
    },
    created(){
        this.getAllList();
    },
    filters:{
        moneyFormat(number, decimals) {
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite( + number) ? 0 : +number,
                prec = !isFinite( + decimals) ? 2 : Math.abs(decimals),
                sep = ',',
                dec = '.',
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
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
            this.setEditIcon();
            this.setEditPointer();
            if(this.$route.query.show){
                let SIZE= JSON.parse(this.$route.query.res.boxSizes);
                this.remark = this.$route.query.res.remarks;
                this.dataList = this.$route.query.res.picDesList;
                this.loadFromJSON(this.myCanvas1,JSON.parse(this.$route.query.res.posititveDesignArea));
                this.loadFromJSON(this.myCanvas2,JSON.parse(this.$route.query.res.backDesignArea))
                this.loadFromJSON(this.myCanvas3,JSON.parse(this.$route.query.res.leftDesignArea))
                this.loadFromJSON(this.myCanvas4,JSON.parse(this.$route.query.res.rightDesignArea))
                this.bgimgs = this.$route.query.res.list;
                this.postId = this.$route.query.res.goodsId;
                this.designId = this.$route.query.res.picId;
                this.productColor = this.$route.query.res.productColorValue;
                this.productColorName = this.$route.query.res.productColor;
                this.boxSize1 = SIZE.canvas1;
                this.boxSize2 = SIZE.canvas2;
                this.boxSize3 = SIZE.canvas3;
                this.boxSize4 = SIZE.canvas4;
                this.handleObjectMove(this.myCanvas1,this.boxSize1.top,600 - this.boxSize1.top - this.boxSize1.height,this.boxSize1.left,600 - this.boxSize1.left - this.boxSize1.width);
                this.handleObjectMove(this.myCanvas2,this.boxSize2.top,600 - this.boxSize2.top - this.boxSize2.height,this.boxSize2.left,600 - this.boxSize2.left - this.boxSize2.width);
                this.handleObjectMove(this.myCanvas3,this.boxSize3.top,600 - this.boxSize3.top - this.boxSize3.height,this.boxSize3.left,600 - this.boxSize3.left - this.boxSize3.width);
                this.handleObjectMove(this.myCanvas4,this.boxSize4.top,600 - this.boxSize4.top - this.boxSize4.height,this.boxSize4.left,600 - this.boxSize4.left - this.boxSize4.width);
                this.handleObjectScale(this.myCanvas1,this.boxSize1.left,this.boxSize1.top,this.boxSize1.width,this.boxSize1.height);
                this.handleObjectScale(this.myCanvas2,this.boxSize2.left,this.boxSize2.top,this.boxSize2.width,this.boxSize2.height);
                this.handleObjectScale(this.myCanvas3,this.boxSize3.left,this.boxSize3.top,this.boxSize3.width,this.boxSize3.height);
                this.handleObjectScale(this.myCanvas4,this.boxSize4.left,this.boxSize4.top,this.boxSize4.width,this.boxSize4.height);
            }
        })
        //this.getWindowScreen();
        this.getArtFontList();
        this.show = this.$route.query.show ? this.$route.query.show : false
        this.handleGetPic('');
    },

    methods:{
        // 更换衣服，保留设计
        changeProductType(){
            this.show = false;
        },
        removeColor(){
            let that = this;
            let obj = that.myCanvas.getActiveObject();
            if(obj){
                let left = obj.left;
                let top = obj.top;
                let id = obj.id;
                let width = obj.getBoundingRect().width;
                let img = new Image();
                let imgInstance;
                console.log(obj)
                //设置图片跨域访问
                img.crossOrigin = 'anonymous';
                if(that.delWhite){
                    rmWhite(id).then(res => {
                        console.log(res)
                        if(res.code == 0){
                            img.src = res.result.out + "?timeStamp="+new Date().getTime();
                            img.onload = function () {
                                imgInstance = new fabric.Image(img, {
                                    id: id,
                                    flipX:false,
                                    flipY:false,
                                    skewX:0,
                                    skewY:0,
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: left,
                                    top:  top,
                                    scaleY: 0.3,
                                    scaleX: 0.3,
                                    removeColor: true,
                                    crossOrigin: '*'
                                });
                                that.myCanvas.remove(obj);
                                imgInstance.scaleToWidth(width);
                                that.myCanvas.add(imgInstance);
                                that.myCanvas.setActiveObject(imgInstance);
                                that.myCanvas.requestRenderAll();
                                imgInstance.on("selected", function() {
                                    let obj1 = that.myCanvas.getActiveObject();
                                    that.liClick = 1;
                                    that.visibletype = 10;
                                    that.opacity = obj1.opacity;
                                    that.rotateNum = obj1.angle;
                                    that.reImgColorurl = obj1.id
                                    that.delWhite = obj1.removeColor;
                                });
                            }
                        }
                    })
                }else{
                    img.src = id + "?timeStamp="+new Date().getTime();
                    img.onload = function () {
                        imgInstance = new fabric.Image(img, {
                            id: id,
                            flipX:false,
                            flipY:false,
                            skewX:0,
                            skewY:0,
                            lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                            left: left,
                            top:  top,
                            scaleY: 0.3,
                            scaleX: 0.3,
                            removeColor: false,
                            crossOrigin: '*'
                        });
                        that.myCanvas.remove(obj);
                        imgInstance.scaleToWidth(width);
                        that.myCanvas.add(imgInstance);
                        that.myCanvas.setActiveObject(imgInstance);
                        that.myCanvas.requestRenderAll();
                        imgInstance.on("selected", function() {
                            let obj2 = that.myCanvas.getActiveObject();
                            that.liClick = 1;
                            that.visibletype = 10;
                            that.opacity = obj2.opacity;
                            that.rotateNum = obj2.angle;
                            that.reImgColorurl = obj2.id
                            that.delWhite = obj2.removeColor;
                        });
                    }
                }
            }
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
            let obj = this.myCanvas.getActiveObject();
            if(obj){
                this.nameFontFamily = e;
                if(obj.myId == "Name"){
                    obj.set('fontFamily', e)
                    this.myCanvas.requestRenderAll();
                }
            }
            
        },
        changeNumberFamily(e){
            console.log(e)
            let obj = this.myCanvas.getActiveObject();
            if(obj){
                this.numberFontFamily = e;
                if(obj.myId == 'Number'){
                    obj.set('fontFamily', e)
                    this.myCanvas.requestRenderAll();
                }
            }
        },
        reStart(){
            //console.log(1)
            this.closeDesignBox()
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
            this.saveImg();
            this.downLoadImg();
            let params = {
                positivePicUrl: this.dataUrl1,backPicUrl: this.dataUrl2,leftPicUrl: this.dataUrl3,rightPicUrl: this.dataUrl4,
                positiveDesignArea: this.dataPost1, backDesignArea: this.dataPost2, leftDesignArea: this.dataPost3, rightDesignArea: this.dataPost4,
                goodsId: this.postId, id: this.designId,textFront: this.nameFontFamily, textColor: this.nameColor, textLocation: this.namePosition,textHeight: this.nameSize,
                numberLocation: this.numberPosition,numberHeight: this.numberSize,numberFront:this.numberFontFamily, numberColor: this.numberColor, isPrintText: this.addNameData ? 1 : 0,isPrintNumber: this.addNumberData ? 1 : 0,
                productColor: this.productColorName
            }
            this.postSaveDesign1(params)
        },
        loadFromJSON (canvas,json) {
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
                    img.src = res.result+"?timeStamp="+new Date().getTime();
                    img.onload = function () {
                        if(isAdd){
                            if(that.myCanvas.getActiveObject()){
                                let obj = that.myCanvas.getActiveObject();
                                let left = obj.left;
                                let top = obj.top;
                                let width = obj.getBoundingRect().width;
                                that.myCanvas.remove(obj);
                                imgInstance = new fabric.Image(img, {
                                    mytext: res.result,
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: left,
                                    top: top,
                                    myId: 'Text',
                                    crossOrigin: '*'
                                });
                                imgInstance.scaleToWidth(width);
                            }
                        }else{
                            if(that.designModel == 0){
                                imgInstance = new fabric.Image(img, {
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: that.boxSize1.left + 5,
                                    top: that.boxSize1.top + 5,
                                    mytext: res.result,
                                    myId: 'Text',
                                    crossOrigin: '*'
                                });
                                if(imgInstance.width > that.boxSize1.width){
                                    imgInstance.scaleToWidth(that.boxSize1.width/2)
                                }
                            }else if(that.designModel == 1){
                                imgInstance = new fabric.Image(img, {
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: that.boxSize2.left + 5,
                                    top: that.boxSize2.top + 5,
                                    mytext: res.result,
                                    myId: 'Text',
                                    crossOrigin: '*'
                                });
                                if(imgInstance.width > that.boxSize2.width){
                                    imgInstance.scaleToWidth(that.boxSize2.width/2)
                                }
                            }else if(that.designModel == 2){
                                imgInstance = new fabric.Image(img, {
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: that.boxSize3.left + 5,
                                    top: that.boxSize3.top + 5,
                                    mytext: res.result,
                                    myId: 'Text',
                                    crossOrigin: '*'
                                });
                                if(imgInstance.width > that.boxSize3.width){
                                    imgInstance.scaleToWidth(that.boxSize3.width/2)
                                }
                            }else if(that.designModel == 3){
                                imgInstance = new fabric.Image(img, {
                                    lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                                    left: that.boxSize4.left + 5,
                                    top: that.boxSize4.top + 5,
                                    mytext: res.result,
                                    myId: 'Text',
                                    crossOrigin: '*'
                                });
                                if(imgInstance.width > that.boxSize4.width){
                                    imgInstance.scaleToWidth(that.boxSize4.width/2)
                                }
                            }
                        }
                        that.myCanvas.add(imgInstance).setActiveObject(imgInstance);
                        that.myCanvas.requestRenderAll();
                        queryByUrl(res.result).then(res => {
                            console.log(res)
                            if(res.code == 0){
                                that.editText = res.result.text;
                            }
                        })
                        that.liClick = 0;
                        that.visibletype = 3;
                        imgInstance.on("selected", function() {
                            
                            that.colorKey = 1;
                            that.liClick = 0;
                            that.visibletype = 3;
                        });
                    }
                }
            })
        },
        saveFontShapeDesign(fontShape,isAdd){
            //fontShape
            let params = {text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: fontShape,backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1}
            this.handleChangeFont(params,isAdd)
        },
        removeShape(){
            this.fontShape = '';
            let params = {text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1}
            this.handleChangeFont(params,true)
        },
        getArtFontList(){
            artFontList().then(res => {
                console.log(res)
                this.fontShapeArr = res.result;
            })
        },
        changeFontShape(item,index){
            this.fontShape = item;
            console.log(this.fontShape)
            this.shapeActive = index
        },
        
        PostChangeGoodsColor(id,color){
            changeGoodsColor(id,color).then(res => {
                console.log(res);
                this.bgimgs = res.result;
                this.bindCanvas(this.myCanvas1,0);
                this.bindCanvas(this.myCanvas2,1);
                this.bindCanvas(this.myCanvas3,2);
                this.bindCanvas(this.myCanvas4,3);
            })
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
                    this.$message.success('Successful！')
                    if(res.result){
                        this.designId = res.result
                    }
                }
            })
        },
        postDeleteEXimg(id){
            let that = this;
            that.$confirm({
                title: "Are you sure you want to delete??",
                okText: "CONFIRM",
                cancelText: "Cancel",
                class: "my-modal",
                onOk() {
                    deleteEXimg(id).then(res =>{
                        console.log(res)
                        if(res.code == 200){
                            that.$message.success('Successful！');
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
                goodsId: this.postId, id: this.designId,textFront: this.nameFontFamily, textColor: this.nameColor, textLocation: this.namePosition,textHeight: this.nameSize,
                numberLocation: this.numberPosition,numberHeight: this.numberSize,numberFront:this.numberFontFamily, numberColor: this.numberColor, isPrintText: this.addNameData ? 1 : 0,isPrintNumber: this.addNumberData ? 1 : 0,
                productColor: this.productColorName
            }
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
        },
        postSaveDesign(params){
            saveDesign(params).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.endDsign = true;
                    this.visibletype = -1;
                    this.liClick = -1;
                    this.designId = res.result.id
                }
            })
        },
        postSaveDesign1(params){
            saveDesign(params).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.visibletype = -1;
                    this.liClick = -1;
                    this.$success({
                        title: 'Successful preservation',
                        content: (  // JSX support
                        <div>
                            <p>please re-select the goods!</p>
                        </div>
                        ),
                        onOk:function(){
                            window.location.reload();
                        }
                    });
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
                this.sizePicUrl = res.result.sizePicUrl
                this.bgimgs = res.result.imgs;
                this.productColor = res.result.productColorValue;
                this.productColorName = res.result.productColor;
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
                this.handleObjectScale(this.myCanvas2,this.boxSize2.left,this.boxSize2.top,this.boxSize2.width,this.boxSize2.height);
                this.handleObjectScale(this.myCanvas3,this.boxSize3.left,this.boxSize3.top,this.boxSize3.width,this.boxSize3.height);
                this.handleObjectScale(this.myCanvas4,this.boxSize4.left,this.boxSize4.top,this.boxSize4.width,this.boxSize4.height);
            })
        },
        closeDesignBox(){
            let that = this;
            let obj1 = that.myCanvas1.getObjects();
            let obj2 = that.myCanvas2.getObjects();
            let obj3 = that.myCanvas3.getObjects();
            let obj4 = that.myCanvas4.getObjects();
            //console.log(obj)
            if(obj1 || obj2 || obj3 || obj4){
                that.$confirm({
                    title: "Are you sure you want to leave?",
                    content: "Unsaved designs will be automatically deleted!",
                    okText: "Confirm",
                    cancelText: "Cancel",
                    onOk() {
                        that.show = false;
                        that.$router.push({path: '/neworder'})
                        window.location.reload();
                        
                    },
                    onCancel() {}
                });
            }else{
                that.show = false;
            }
            // if(that.liClick == -1 && that.visibletype == -1){
            //     that.show = false;
            // }else{
            //     that.$confirm({
            //         title: "Are you sure you want to leave?",
            //         content: "Unsaved designs will be automatically deleted!",
            //         okText: "Confirm",
            //         cancelText: "Cancel",
            //         onOk() {
            //             that.show = false;
            //             window.location.reload();
            //         },
            //         onCancel() {}
            //     });
            // }
        },
        openDesignModal(id){
            console.log(id)
            this.postId = id;
            this.show = true;
            if(!this.getCookie('introFlag')){
                setTimeout(() => {
                    this.$intro().setOptions({
                        prevLabel: "Previous",
                        nextLabel: "Next",
                        skipLabel: "Skip",
                        doneLabel: "End",
                        overlayOpacity: "0",
                        highlightClass: "white",
                        tooltipClass:"tool-tip",
                        disableInteraction: false,
                    }).oncomplete(() => {
                        this.setCookie("introFlag", true,7)
                    }).onexit(() => {
                        this.setCookie("introFlag", true,7)
                    }).start();
                },10)
            }
            this.getSelectById(id);
        },
        setCookie(name, value, day){
            if(day !== 0){
                let expires = day * 24 * 60 * 60 * 1000;
                let date = new Date(+new Date()+expires);
                document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
            }else{
                document.cookie = name + "=" + escape(value);
            }
        },
        getCookie(name){
            let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null) return unescape(arr[2]); 
            return false;
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
                if(obj.myId === 'Name'){
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
                if(obj.myId === 'Number'){
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
                }else{
                    queryByUrl(obj.target.mytext).then(res => {
                        console.log(res)
                        if(res.code == 0){
                            if(res.result.text){
                                that.editText = res.result.text;
                                that.fontfamily = res.result.fontName;
                                that.color = res.result.fontColor;
                                that.colorName = res.result.fontColorName;
                                that.fontShape = res.result.effect;
                                that.bgcolor = res.result.backGround;
                                that.fontBgColorName = res.result.backGroundName;
                                that.strokeWidth = parseInt(res.result.lineweight);
                                that.strokeColor = res.result.outLineColor;
                                that.strokeColorName = res.result.outLineColorName;
                                that.shadowColor = res.result.shadowColor;
                                that.shadowColorName = res.result.shadowColorName;
                                that.Shadow1 = parseInt(res.result.smudge);
                                console.log(that.colorKey)
                                console.log(that.colorName)
                            }
                        }
                    })
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
        // delSelected(obj) {
        //     var that = this;
        //     obj.on("mouse:down", function(options) {
        //         if (options.target) {
        //             document.onkeydown = function(e) {
        //                 if (e.keyCode == 8) {
        //                     that.myCanvas.remove(options.target);
        //                 }
        //             };
        //         }
        //     });
        // },

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
        },
        add(){
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
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                console.log(values)
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.$message.success('successful!')
                }
            });
        },
        
        /**
         * 1：改变字体颜色的
         * 2：改变字体背景颜色
         * 3：改变描边颜色
         * 4：改变阴影颜色
         * 5：改变名字颜色
         * 6：改变号码颜色
         * 7：改变Product colour
         *
        */
        changeAllColor(val,name,i){
            if(this.colorKey == 1){
                this.colorName = name;
                this.color = val;
                this.fontColorIcon1 = i

            }else if(this.colorKey == 2){
                this.fontBgColorName = name;
                this.bgcolor = val;
                this.fontColorIcon2 = i
            }else if(this.colorKey == 3){
                this.strokeColorName = name;
                this.strokeColor = val;
                this.fontColorIcon3 = i

            }else if(this.colorKey == 4){
                this.shadowColorName = name;
                this.shadowColor = val;
                this.fontColorIcon4 = i

            }else if(this.colorKey == 5){
                this.nameColorName = name;
                this.nameColor = val;
                this.fontColorIcon5 = i

            }else if(this.colorKey == 6){
                this.numberColorName = name;
                this.numberColor = val;
                this.fontColorIcon6 = i
            }
            this.handleColorShow();
        },
        
        changeNumberColor(val){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                if(obj.myId == 'Number'){
                    obj.set("fill", val);
                    this.myCanvas.requestRenderAll();
                    this.visibletype = 2;
                }
            }
        },
        removeNumberColor(){
            this.numberColor = '#000';
            this.numberColorName = 'BLACK';
            this.fontColorIcon6 = -1;
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                if(obj.myId == 'Number'){
                    obj.set("fill", this.numberColor);
                    this.myCanvas.requestRenderAll();
                }
            }
        },
        changeNameColor(val){
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                if(obj.myId == 'Name'){
                    obj.set("fill", val);
                    this.myCanvas.requestRenderAll();
                    this.visibletype = 2;

                }
            }
        },
        removeNameColor(){
            this.nameColorName = 'BLACK';
            this.nameColor = '#000';
            this.fontColorIcon5 = -1;
            let obj = this.myCanvas.getActiveObject();
            if (obj) {
                if(obj.myId == 'Name'){
                    obj.set("fill", this.nameColor);
                    this.myCanvas.requestRenderAll();
                }
            }
        },
        changeTextBgColor(val,name,isAdd){
            let params = {
                text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,
                fontHeight: 50, fontColor: this.color.substr(1), 
                lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), 
                effect: this.fontShape,backGround: val.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1}
            this.handleChangeFont(params,isAdd)
        },
        removeFontBgColor(){
            this.fontBgColorName = '';
            this.bgcolor = '';
            this.fontColorIcon2 = -1;
            let params = {
                text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,
                fontHeight: 50, fontColor: this.color.substr(1), 
                lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), 
                effect: this.fontShape,backGround: this.bgcolor,shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1}
            this.handleChangeFont(params,true)
        },
        // 设置字体阴影开始
        changeShadowColor(val,name,isAdd){
            let params = {
                    text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: val.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,isAdd)
        },
        removeShadowColor(){
            this.shadowColorName = '';
            this.shadowColor = '';
            this.fontColorIcon4 = -1;
            this.Shadow1 = 0;
            let params = {
                    text: this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColorName,smudge: this.Shadow1
                }
            this.handleChangeFont(params,true)
        },
        
        changeShadowWidth(e){
            this.Shadow1 = e;
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
                    this.$message.success('Successful submission!');
                    if(res.result){
                        this.designId = res.result;
                    }
                    this.getReferencePic(this.designId);
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
                    myId: 'Number',
                    fontFamily: font,
                    originX:'center',
                    originY:'center',
                    left: that.screenWidth / 2,
                    top: 300,
                    fontSize: that.numberSize,
                    fill: that.numberColor
                });
                that.exampleNumber.lockScalingX = true;
                that.exampleNumber.lockScalingY = true;
                that.exampleNumber.hasControls = false;
                that.keyId = 'Number'
                that.exampleNumber.lockMovementX = true;
                that.myCanvas.add(that.exampleNumber).setActiveObject(that.exampleNumber);
                that.exampleNumber.on("selected", function() {
                    that.keyId = 'Number'
                    that.liClick = 2;
                    that.visibletype = 2;
                })
            
        },

        addExampleName(font){
            let that = this;
            that.exampleName = new fabric.Text("EXAMPLE", {
                myId: 'Name',
                fontFamily: font,
                originX:'center',
                originY:'center',
                left: that.screenWidth / 2,
                top: 200,
                fontSize: that.nameSize,
                lockUniScaling:true,
                fill: that.nameColor
            });
            that.exampleName.lockScalingX = true;
            that.exampleName.lockScalingY = true;
            that.exampleName.hasControls = false;
            that.keyId = 'Name'
            that.exampleName.lockMovementX = true;
            that.myCanvas.add(that.exampleName).setActiveObject(that.exampleName);
            that.exampleName.on("selected", function() {
                that.liClick = 2;
                that.visibletype = 2;
                that.keyId = 'Name'
            })
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
                console.log(file)
                this.postSourceUpload(file)

            }else{
                
                this.$message.error('Image Size Exceeds Limit');
                this.uploadA = false
                return;
            }
        },
        postSourceUpload(file){
            let formData = new FormData();
            formData.append("file", file);
            console.log(file)
            console.log(formData.get("file"))
            sourceUpload(formData).then(res => {
                console.log(res)
                this.preview_url = res.preview_url;
                this.source_url = res.source_url;
            })
        },
        beforeUpload (file) {
            console.log(file)
            this.uploadId ++;
            if(file.size / 1024 / 1024 < 10){
                let formData = new FormData();
                formData.append("file", file);
                sourceUpload(formData).then(res => {
                    console.log(res)
                    this.selectImg(res.preview_url);
                })
            }else{
                this.$message.error('Image Size Exceeds Limit')
                return false
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
        addImg(imgUrl){
            this.selectImg(imgUrl);
        },
        selectImg(imgUrl) {
            let that = this;
            let img = new Image();
            let imgInstance;
            let left = 0;
            let top = 0;
            that.delWhite = false;
            //设置图片跨域访问
            img.crossOrigin = 'anonymous';
            img.src = imgUrl+"?timeStamp="+new Date().getTime();
            img.onload = function () {
                if(that.designModel == 0){
                    left = that.boxSize1.left + 5;
                    top = that.boxSize1.top + 5;
                    imgInstance = new fabric.Image(img, {
                        id: imgUrl,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: left,
                        top:  top,
                        removeColor: false,
                        myId: 'Img',
                        crossOrigin: '*'
                    });
                    if(imgInstance.width > that.boxSize1.width){
                        imgInstance.scaleToWidth(that.boxSize1.width/2)
                    }
                }else if(that.designModel == 1){
                    left = that.boxSize2.left + 5;
                    top = that.boxSize2.top + 5;
                    imgInstance = new fabric.Image(img, {
                        id: imgUrl,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: left,
                        top:  top,
                        removeColor: false,
                        myId: 'Img',
                        crossOrigin: '*'
                    });
                    if(imgInstance.width > that.boxSize2.width){
                        imgInstance.scaleToWidth(that.boxSize2.width/2)
                    }
                }else if(that.designModel == 2){
                    left = that.boxSize3.left + 5;
                    top = that.boxSize3.top + 5;
                    imgInstance = new fabric.Image(img, {
                        id: imgUrl,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: left,
                        top:  top,
                        removeColor: false,
                        myId: 'Img',
                        crossOrigin: '*'
                    });
                    if(imgInstance.width > that.boxSize3.width){
                        imgInstance.scaleToWidth(that.boxSize3.width/2)
                    }
                }else if(that.designModel == 3){
                    left = that.boxSize4.left + 5;
                    top = that.boxSize4.top + 5;
                    imgInstance = new fabric.Image(img, {
                        id: imgUrl,
                        flipX:false,
                        flipY:false,
                        skewX:0,
                        skewY:0,
                        lockUniScaling:true, // When `true`, object non-uniform scaling is locked
                        left: left,
                        top:  top,
                        removeColor: false,
                        myId: 'Img',
                        crossOrigin: '*'
                    });
                    if(imgInstance.width > that.boxSize4.width){
                        imgInstance.scaleToWidth(that.boxSize4.width/2)
                    }
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
                    that.reImgColorurl = obj.id
                    that.delWhite = obj.removeColor;
                });
            };
        },
        // 添加图片结束
        handleObjectMove(object,top_margin,bottom_margin,left_margin,right_margin){
            let that = this;
            object.on('object:moving', function (e) {
                    var obj = e.target;
                    that.movingBox = true;
                    // if object is too big ignore
                    if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
                        return;
                    }        
                    obj.setCoords();        
                    // top-left  corner
                    if(obj.getBoundingRect().top < top_margin || obj.getBoundingRect().left < left_margin){
                        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + top_margin);
                        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + left_margin);
                    }
                    // bot-right corner
                    if(obj.getBoundingRect().top+obj.getBoundingRect().height  > 600 - bottom_margin || obj.getBoundingRect().left+obj.getBoundingRect().width  > 600 - right_margin){
                        obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - bottom_margin);
                        obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - right_margin);
                    } 
            });
        },
        handleObjectScale(object,x,y,width,height){
            object.on("object:scaling",function(e){
                var scaledObject = e.target;
                scaledObject.lockScalingFlip = true;
                var startX = scaledObject.getBoundingRect().left;
                var startY = scaledObject.getBoundingRect().top;
                var maxWidth = width - startX;// scaledObject.aCoords.tl.x;
                var maxHeight = height -startY;
                scaledObject.setCoords();
                var isOnScreen = scaledObject.isContainedWithinRect({x:x,y:y},{x:width + x,y:height + y},true,true);
                if(!isOnScreen) {
                    var w = scaledObject.getBoundingRect().width;
                    var h = scaledObject.getBoundingRect().height;
                    if( (maxHeight-h) < (maxWidth-w)){
                        scaledObject.scaleToHeight(height + y - startY - 1);
                    } else{
                        scaledObject.scaleToWidth(width + x - startX - 1);
                    }
                }
                return true;
            })
        },
        // 切换正反左右面
        changeModelDesign(i){
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
            this.myCanvas.discardActiveObject();
            this.visibletype = -1;
        },
        toolsBtnClick(key){
            this.liClick = key;
            if(this.visibletype !== key){
                this.visibletype = key;
            }
            if(key == 4){
                this.getColorList(7);
            }
            this.myCanvas.discardActiveObject();
        },
        // 设置设计背景图
        bindCanvas(canvas,i) {
            var that = this
            let img = new Image();
            let imgInstance;
            //设置图片跨域访问
            img.crossOrigin = 'anonymous';
            img.src = that.bgimgs[i]+"?timeStamp="+new Date().getTime();
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
            console.log(this.editText)
            if(isAdd){
                console.log(text);
                
                if(this.myCanvas.getActiveObject()){
                    let params = {
                        text: text,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                        lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                        backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                    }
                    this.handleChangeFont(params,isAdd);
                }else{
                    let params = {
                        text: text,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                        lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                        backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                    }
                    this.handleChangeFont(params,false);
                }
            }else{
                this.fontfamily = 'FZCHYFW';
                this.color = '#B17700';
                this.colorName = 'Pantone 1395';
                this.fontShape = 'normal';
                this.bgcolor = '';
                this.fontBgColorName = '';
                this.strokeWidth = 0;
                this.strokeColor = '';
                this.strokeColorName = '';
                this.shadowColor = '';
                this.shadowColorName = '';
                this.Shadow1 = 0;
                this.fontColorIcon1 = -1;
                this.fontColorIcon2 = -1;
                this.fontColorIcon3 = -1;
                this.fontColorIcon4 = -1;
                let params = {
                    text: text,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
                this.handleChangeFont(params,isAdd);
            }
            
            this.addText = '';
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
            this.changeWidthShow = key;
            colorList(key).then(res => {
                console.log(res)
                this.colorList = res.result
                let colors = this.colorList.list;
                if(key == 5){
                    console.log(this.keyId)
                    if(this.addNameData){
                        if(this.keyId == 'Name'){
                            this.visibletype = 8;
                            this.colorTitle = title;
                            this.colorKey = key;
                        }else{
                            this.$message.error('Please select name first.')
                        }
                    }
                }else if(key == 6){
                    if(this.addNumberData){
                        console.log(this.keyId)
                        if(this.keyId == 'Number'){
                            this.visibletype = 8;
                            this.colorTitle = title;
                            this.colorKey = key;
                        }else{
                            this.$message.error('Please select number first.')
                        }
                    }
                }else if(key == 2){
                    //后加 不严谨
                    if(this.shadowColorName){
                        this.$message.error('Please remove the shadows first.')
                    }else if(this.strokeColorName){
                        this.$message.error('Please remove the outline first.')
                    }else{
                        this.visibletype = 8;
                        this.colorTitle = title;
                        this.colorKey = key;
                        if(this.bgcolor){
                            for(let i = 0; i < colors.length; i++) {
                                if (colors[i].itemValue === this.bgcolor) {
                                    console.log(i);
                                    this.fontColorIcon2 = i
                                }
                            }
                        }
                    }
                }else if(key == 3){
                    //后加 不严谨
                    if(this.bgcolor){
                        this.$message.error('Please remove the Text Background Colour first.')
                    }else{
                        this.visibletype = 8;
                        this.colorTitle = title;
                        this.colorKey = key;
                        if(this.strokeColor){
                            for(let i = 0; i < colors.length; i++) {
                                if (colors[i].itemValue === this.strokeColor) {
                                    console.log(i);
                                    this.fontColorIcon3 = i
                                }
                            }
                        }
                    }
                }else if(key == 4){
                    if(this.bgcolor){
                        this.$message.error('Please remove the Text Background Colour first.')
                    }else{
                        this.visibletype = 8;
                        this.colorTitle = title;
                        this.colorKey = key;
                        if(this.shadowColor){
                            for(let i = 0; i < colors.length; i++) {
                                if (colors[i].itemValue === this.shadowColor) {
                                    console.log(i);
                                    this.fontColorIcon4 = i
                                }
                            }
                        }
                    }
                }else if(key == 1){
                    this.visibletype = 8;
                    this.colorTitle = title;
                    this.colorKey = key;
                    if(this.color){
                        for(let i = 0; i < colors.length; i++) {
                            if (colors[i].itemValue === this.color){
                                console.log(i);
                                this.fontColorIcon1 = i
                            }
                        }
                    }
                }
                console.log(key,title);
            })
            
            
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
            this.fontfamily = value;
            this.fontfamilydata = index
            
        },
        PostChangeFontFamily(){
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName: this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,true)
        },
        removeFontFamily(){
            this.fontfamily = 'FZCHYFW';
            this.fontfamilydata = -1;
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName: this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,true)
        },
        changeFillColor(val,name,isAdd){
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: val.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,isAdd)
        },
        removeFontColor(){
            this.color = '#000';
            this.colorName = 'BLACK';
            this.fontColorIcon1 = -1;
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1), 
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,true)
        },
        // 改变描边样式开始
        changestrokeColor(val,name,isAdd){
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1),
                    lineweight: this.strokeWidth, outLineColor: val.substr(1), effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,isAdd)
        },
        removeStrokeColor(){
            this.strokeColor = '';
            this.strokeColorName = '';
            this.fontColorIcon3 = -1;
            this.strokeWidth = 0;
            let params = {
                    text:  this.editText,style:this.bgcolor ? '' : 'softshadow',fontName:this.fontfamily,fontHeight: 50, fontColor: this.color.substr(1),
                    lineweight: this.strokeWidth, outLineColor: this.strokeColor, effect: this.fontShape,
                    backGround: this.bgcolor.substr(1),shadowColor: this.shadowColor.substr(1),smudge: this.Shadow1
                }
            this.handleChangeFont(params,true);
        },
        changestrokeWidth(e){
            console.log(e)
            this.strokeWidth = e;
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
            }else if(this.colorKey == 3){
                this.colorShow = this.strokeColor;
                this.colorShowName = this.strokeColorName;
            }else if(this.colorKey == 4){
                this.colorShow = this.shadowColor;
                this.colorShowName = this.shadowColorName;
            }
            else if(this.colorKey == 5){
                this.colorShow = this.nameColor;
                this.colorShowName = this.nameColorName;
            }else if(this.colorKey == 6){
                this.colorShow = this.numberColor;
                this.colorShowName = this.numberColorName;
            }
            else{
                this.colorShow = '#000';
                this.colorShowName = 'BLACK';
            }
        }
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
                text-align: center;
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
            position: relative;
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
                .bottom-btn-box{
                    display: flex; 
                    justify-content: center; 
                    margin-top: 10px; 
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
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
                            text-align: center;
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
                            margin-top: 2px;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            padding:0 30px;
                            li{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                margin: 4px 0;
                                width: 32%;
                                box-sizing: border-box;
                                transition: 0.3s;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                }
                                span:nth-child(1){
                                    font-size: 18px;
                                }
                                &:hover{
                                    transform: scale(1.1);
                                    box-shadow: 1px 2px 3px #ccc;
                                }
                            }
                            .active{
                                border: 1px solid #33b8b3;
                                img{
                                    width: calc(100% - 2px);
                                }
                            }
                        }
                        .font-family-list1{
                            margin-top: 2px;
                            
                            padding:0 30px;
                            li{
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                margin: 4px 0;
                                box-sizing: border-box;
                                cursor: pointer;
                                &:hover{
                                    background-color: #33b8b3;
                                    color: #fff !important;
                                }
                                span:nth-child(1){
                                    font-size: 18px;
                                }
                            }
                            .active{
                                border: 1px solid #33b8b3;
                            }
                        }
                }
                .tool-box4{
                        margin-top: 20px;
                        .color-list-box{
                            display: flex;
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
                        margin-top: 12px;
                        cursor: pointer;
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
                            padding: 10px 5px;
                            border-bottom:1px solid #ccc;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            transition: 0.3s;
                            &:hover{
                                background-color: #fff;
                                box-shadow: 1px 2px 3px #ccc;
                            }
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