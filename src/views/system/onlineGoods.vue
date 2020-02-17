<template>
  <div id="designRequire">
    <my-title :title="'设计列表'" :fontsize="20" style="padding: 0 20px;">
      <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
    </my-title>
    <div class="title">
      <h3>
        单号：{{data.orderSn}}
      </h3>
      <ul>
        
        <li>
          <p>
            <span>创建人:</span>
            {{data.contact}}
          </p>
          <p>
            <span>创建时间:</span>
            {{data.createTime}}
          </p>
        </li>
        <li>
          <p>
            <span>备注：</span>
            {{data.introduction}}
          </p>
        </li>
      </ul>
    </div>
    <ul class="list-box">
      <li v-for="(item,index) in data.list" :key="item.id">
        <div class="img-box">
          <img :src="item.positivePicUrl" v-preview="item.positivePicUrl">
          <img :src="item.backPicUrl" v-preview="item.backPicUrl">
          <img :src="item.leftPicUrl" v-preview="item.leftPicUrl">
          <img :src="item.rightPicUrl" v-preview="item.rightPicUrl">
        </div>
        <div class="content">
          <dl>
            <dt>{{item.name}}</dt>
            <dd>编号：{{index + 1}}</dd>
            <dd>颜色：{{item.productColor}}</dd>
          </dl>
          <div class="btn-box">
            <a-button @click="checkOutRequire(item.id)">查看需求</a-button>
            <a-dropdown>
              <a-button class="ant-dropdown-link">
                设计方案 <a-icon type="down"/>
              </a-button>
              <a-menu slot="overlay">
                <template v-if="item.listMap.length > 0">
                  <a-menu-item v-for="(aitem,index) in item.listMap" :key="index" >
                    <a-tooltip placement="left" >
                    <template slot="title">
                      <span>{{aitem.status == 0 ? '未通过' : aitem.status == 1 ? '通过' : aitem.status == 2 ? '未审批' : ''}}</span>
                    </template>
                    <a href="javascript:;" @click="viewDesignCase(aitem.id,aitem.status)">设计方案{{index + 1}}</a>
                  </a-tooltip>
                  </a-menu-item>
                </template>
                
                <a-menu-item v-else>
                  <a href="javascript:;">暂无数据</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </li>
    </ul>
    <div class="design-show" v-show="show">
        <a-modal :visible="true" title="设计需求" :width="1000" :getContainer="Ele" @cancel="show = false">
          <div class="section1">
            <h3 style="padding-left: 20px;">{{productName}} <span>颜色：{{productColor}}</span></h3>
            <div class="img-box">
              <div class="imgs">
                <img v-for="(item,index) in imgList" :key="index" :src="item" @click="viewImgs(index)">
              </div>
              <div class="btn-box">
                <a-button @click="showKey = 2">设计备注</a-button>
                <a-button @click="showKey = 3">参考设计</a-button>
              </div>
              
            </div>
            <ul class="exImg" v-show="showKey == 3">
              <li v-for="(item,index) in eximgList" :key="index">
                <div>
                  <img :src="item.picUrl" alt="">
                  <span>{{item.remarks}}</span>
                </div>
                <a :href="item.fileUrl" download="img" target="_blank">下载</a>
              </li>
              <li v-if="eximgList.length <= 0" style="align-items: flex-end;">暂无参考设计</li>
            </ul>
            <div class="remarks" v-show="showKey == 2" style="margin-top: 10px;">
              <p style="color: #000;">设计备注：{{remarks}}</p>
            </div>
            <div class="show-box" v-show="showKey == 1">
              <div class="canvans-box">
                <canvas id="canvas" width="600" height="600"></canvas>
              </div>
              <div class="desc-box">
                <div class="desc" v-show="showCode == 2">
                  <p>文字： {{text}}</p>
                  <p>字体： {{fontfamily}}</p>
                  <p>字号：{{fontsize}} cm</p>
                  <p v-if="fontcolorName">字体颜色： {{fontcolorName}}<span :style="{backgroundColor: fontcolor}"></span> <br /> CMYK : {{fontcolorCMYK}}</p>
                  <p v-if="bgcolorName">背景色： {{bgcolorName}}<span :style="{backgroundColor:bgcolor}"></span> <br /> CMYK : {{bgcolorCMYK}}</p>
                  <p v-if="strokecolorName">描边： {{strokecolorName}}<span :style="{backgroundColor:strokecolor}"></span> <br /> CMYK : {{strokecolorCMYK}} 大小： {{strokeWidth}}</p>
                  <p v-if="shadowcolorName">阴影： {{shadowcolorName}}<span :style="{backgroundColor:shadowcolor}"></span> <br /> CMYK : {{shadowcolorCMYK}} 大小： {{shadowWidth}}</p>
                </div>
                <ul class="img-desc" v-show="showCode == 1">
                  <li>
                    图片： <img :src="imgUrl" alt="">
                  </li>
                  <li>
                    尺寸： {{width}} cm * {{height}} cm
                  </li>
                  <li>
                    源文件： <a :href="imgUrl" download="img" target="_blank">下载</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <template slot="footer">
            <a-button @click="show = false">关闭</a-button>
          </template>
        </a-modal>
    </div>
    <a-modal :visible="newDesign" title="上传设计样稿" :width="700" @ok="confirmDesign" @cancel="newDesign = false" okText="确认" cancelText="关闭" forceRender>
      <a-form :form="form" style="display: flex;flex-wrap: wrap;padding: 20px 30px; 10px 0">
        <a-form-item
          label="上传正面"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }"
          style="width: 45%;"
        >
          <img :src="positivePicUrl" alt="" width="100" height="100" v-preview="positivePicUrl" />
          <a-upload
            :customRequest="beforeUploadEx"
            accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
            :showUploadList="false"
            v-decorator="['img1',{rules: [{ required: true, message: '请上传图片！'}]}]"
          >
              <a-button :disabled="editDisabled">
                <a-icon type="upload"/> 点击上传
              </a-button>
          </a-upload>
        </a-form-item>
        <p style="width: 45%;">备注：{{remarks1}}</p>
        <a-form-item
          label="上传背面"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }"
          style="width: 45%;"
        >
          <img :src="backPicUrl" alt="" width="100" height="100" v-preview="backPicUrl" />
          <a-upload
            :customRequest="beforeUploadEx1"
            :showUploadList="false"
            accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
            v-decorator="['img2',{rules: [{ required: true, message: '请上传图片！'}]}]"
          >
              <a-button :disabled="editDisabled">
                <a-icon type="upload" /> 点击上传
              </a-button>
          </a-upload>
        </a-form-item>
        <p style="width: 45%;">备注：{{remarks2}}</p>
        <a-form-item
          label="上传左面"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }"
          style="width: 45%;"
        >
          <img :src="leftPicUrl" alt="" width="100" height="100" v-preview="leftPicUrl" />
          <a-upload
            :customRequest="beforeUploadEx2"
            :showUploadList="false"
            accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
            v-decorator="['img3',{rules: [{ required: true, message: '请上传图片！'}]}]"
          >
              <a-button :disabled="editDisabled">
                <a-icon type="upload" /> 点击上传
              </a-button>
          </a-upload>
        </a-form-item>
        <p style="width: 45%;">备注：{{remarks3}}</p>
        <a-form-item
          label="上传右面"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }"
          style="width: 45%;"
        >
          <img :src="rightPicUrl" alt="" width="100" height="100" v-preview="rightPicUrl" />
          <a-upload
            :customRequest="beforeUploadEx3"
            :showUploadList="false"
            accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
            v-decorator="['img4',{rules: [{ required: true, message: '请上传图片！'}]}]"
          >
              <a-button :disabled="editDisabled">
                <a-icon type="upload" /> 点击上传
              </a-button>
          </a-upload>
        </a-form-item>
        <p style="width: 45%;">备注：{{remarks4}}</p>
      </a-form>
    </a-modal> 
    <a-modal :visible="reject" title="设计方案" :width="700" @cancel="reject = false">
      <div class="reject-box">
        <ul>
          <li>
            正面: <img :src="rejpositivePicUrl" width="100" height="100" v-preview="rejpositivePicUrl">
          </li>
          <li>
            背面: <img :src="rejbackPicUrl" width="100" height="100" v-preview="rejbackPicUrl">
          </li>
          <li>
            左面: <img :src="rejleftPicUrl" width="100" height="100" v-preview="rejleftPicUrl">
          </li>
          <li>
            右面: <img :src="rejrightPicUrl" width="100" height="100" v-preview="rejrightPicUrl">
          </li>
        </ul>
        <p>
          客户留言： {{opinion}}
        </p>
      </div>
      <template slot="footer">
        <a-button @click="reject = false">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { fabric } from 'fabric';
import MyTitle from "@/components/MyTitle/MyTitle";
// 方法名加括号
import { dealerDesignList,viewDesign,colorInfo,photoInfo,sourceUpload,designingScheme,rejectDesign,updateDespic } from '@/api/seller'
export default {
  components:{
    MyTitle
  },
  data(){
    return{
      id:'',
      reject:false,
      newDesign: false,
      data:{},
      show:false,
      imgList:[],
      eximgList:[],
      jsonArr:[],
      productColor:'',
      productName: '',
      remarks:'',
      showKey: 1,
      myCanvas: null,
      text:'',
      fontfamily:'',
      fontsize: '',
      fontcolor: '',
      fontcolorName: '',
      fontcolorCMYK: '',
      bgcolor: '',
      strokecolor:'',
      shadowcolor: '',
      bgcolorName: '',
      strokecolorName:'',
      shadowcolorName: '',
      bgcolorCMYK: '',
      strokecolorCMYK:'',
      shadowcolorCMYK: '',
      shadowWidth: '',
      strokeWidth: '',
      showCode: 2,
      imgUrl: '',
      width: '',
      height: '',
    
      uploadA: false,
      uploadA1: false,
      uploadA2: false,
      uploadA3: false,
      Ele: () => document.querySelector(".design-show"),
      form: this.$form.createForm(this),
      positivePicUrl:'',
      leftPicUrl:'',
      rightPicUrl:'',
      backPicUrl:'',
      positivePicFile:'',
      leftPicFile:'',
      rightPicFile:'',
      backPicFile:'',
      // 修改id
      id1:'',
      //设计id
      id2:'',
      rejpositivePicUrl:'',
      rejleftPicUrl:'',
      rejrightPicUrl:'',
      rejbackPicUrl:'',
      opinion:'',
      editDisabled: false,
      remarks1:'',
      remarks2:'',
      remarks3:'',
      remarks4:''
    }
  },
  mounted(){
    this.id = this.$route.query.orderId;
    this.getDealerDesignList(this.id);
    this.$nextTick(function() {
      this.myCanvas = new fabric.Canvas("canvas");
      this.onselected(this.myCanvas);
    })
  },
  methods:{
    viewDesignCase(id,key){
      if(key == 0){
        // 查看被否定的修改
        this.reject = true
        rejectDesign(id).then(res => {
          this.rejpositivePicUrl = res.result.despic.positivePicUrl,
          this.rejleftPicUrl = res.result.despic.leftPicUrl,
          this.rejrightPicUrl = res.result.despic.rightPicUrl,
          this.rejbackPicUrl = res.result.despic.backPicUrl,
          this.opinion = res.result.despic.opinion
        })
      }else if(key == 1){
        // 修改设计回显
        this.newDesign = true;
        this.editDisabled = true;
        designingScheme(id).then(res => {
          if(res.code == 0){
            this.id1 = res.result.id;
            this.positivePicUrl = res.result.positivePicUrl;
            this.backPicUrl = res.result.backPicUrl;
            this.leftPicUrl = res.result.leftPicUrl;
            this.rightPicUrl = res.result.rightPicUrl;
            this.remarks1 = res.result.porsitiveDescription;
            this.remarks2 = res.result.backDescription;
            this.remarks3 = res.result.leftDescription;
            this.remarks4 = res.result.rightDescription;
            this.form.setFieldsValue({
              img1:res.result.positivePicUrl,
              img2:res.result.backPicUrl,
              img3:res.result.leftPicUrl,
              img4:res.result.rightPicUrl
            })
          }
        })
      }else{
        this.newDesign = true;
        this.editDisabled = false;
        designingScheme(id).then(res => {
          if(res.code == 0){
            this.id1 = res.result.id;
            this.positivePicUrl = res.result.positivePicUrl;
            this.backPicUrl = res.result.backPicUrl;
            this.leftPicUrl = res.result.leftPicUrl;
            this.rightPicUrl = res.result.rightPicUrl;
            this.remarks1 = res.result.porsitiveDescription;
            this.remarks2 = res.result.backDescription;
            this.remarks3 = res.result.leftDescription;
            this.remarks4 = res.result.rightDescription;
            this.form.setFieldsValue({
              img1:res.result.positivePicUrl,
              img2:res.result.backPicUrl,
              img3:res.result.leftPicUrl,
              img4:res.result.rightPicUrl
            })
          }
        })
      }
      
    },
    confirmDesign(){
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = {
            id:this.id1,positivePicUrl:values.img1,leftPicUrl:values.img3,rightPicUrl:values.img4,backPicUrl:values.img2,backPicFile:this.backPicFile,
            positivePicFile:this.positivePicFile,leftPicFile:this.leftPicFile,rightPicFile:this.rightPicFile,picId:this.id2,porsitiveDescription:this.remarks1,
            backDescription:this.remarks2,leftDescription:this.remarks3,rightDescription:this.remarks4
          }
          updateDespic(params).then(res => {
            if(res.code == 0){
              this.newDesign = false;
              this.$message.success('操作成功！')
              this.getDealerDesignList(this.id);
            }
          })
        }
      });
    },
    postSourceUpload(file,type){
      let formData = new FormData();
      formData.append("file", file);
      sourceUpload(formData).then(res => {
          if(type == 0){
            this.positivePicUrl = res.preview_url;
            this.positivePicFile = res.source_url;
            this.form.setFieldsValue({
              img1:res.preview_url
            })
          }else if(type == 1){
            this.backPicUrl = res.preview_url;
            this.backPicFile = res.source_url;
            this.form.setFieldsValue({
              img2:res.preview_url
            })
          }else if(type == 2){
            this.leftPicUrl = res.preview_url;
            this.leftPicFile = res.source_url;
            this.form.setFieldsValue({
              img3:res.preview_url
            })
          }else if(type == 3){
            this.rightPicUrl = res.preview_url;
            this.rightPicFile = res.source_url;
            this.form.setFieldsValue({
              img4:res.preview_url
            })
          }
      })
    },
    beforeUploadEx(file){
      let files = file.file;
      if(files.size / 1024 / 1024 < 10){
          this.uploadA = true
          this.postSourceUpload(files,0)
      }else{
          this.$message.error('图片大小超出限制，请重新选择！');
          this.uploadA = false
          return;
      }
    },
    beforeUploadEx1(file){
      let files = file.file;
      if(files.size / 1024 / 1024 < 10){
          this.uploadA1 = true
          this.postSourceUpload(files,1)
      }else{
          this.$message.error('图片大小超出限制，请重新选择！');
          this.uploadA = false
          return;
      }
    },
    beforeUploadEx2(file){
      let files = file.file;
      if(files.size / 1024 / 1024 < 10){
          this.uploadA2 = true
          this.postSourceUpload(files,2)
      }else{
          this.$message.error('图片大小超出限制，请重新选择！');
          this.uploadA = false
          return;
      }
    },
    beforeUploadEx3(file){
      let files = file.file;
      if(files.size / 1024 / 1024 < 10){
          this.uploadA3 = true
          this.postSourceUpload(files,3)
      }else{
          this.$message.error('图片大小超出限制，请重新选择！');
          this.uploadA = false
          return;
      }
    },
    getColorInfo(color){
      colorInfo(color).then(res => {
        if(res.code == 0){
          this.fontcolorCMYK = res.result.fontColorCMYK;
          this.fontcolorName = res.result.fontColorName
        }
      })
    },
    getPhotoInfo(url,obj){
      photoInfo(url).then(res => {
        if(res.code == 0){
          // 判断是图片还是文字
          this.showCode = res.result.code;
          if(res.result.code == 1){
            this.imgUrl = obj.src;
            this.width = parseInt(obj.getBoundingRect().width / 6);
            this.height = parseInt(obj.getBoundingRect().height / 6);
          }else{
            this.text = res.result.text;
            this.fontfamily = res.result.fontName;

            this.bgcolorName = res.result.backGroundName;
            this.bgcolor = res.result.backGround;
            this.bgcolorCMYK = res.result.backGroundCMYK;

            this.fontcolorName = res.result.fontColorName;
            this.fontcolor = res.result.fontColor;
            this.fontcolorCMYK = res.result.fontColorCMYK;

            this.strokecolorName = res.result.outLineColorName;
            this.strokecolor = res.result.outLineColor;
            this.strokecolorCMYK = res.result.outLineColorCMYK;

            this.shadowcolorName = res.result.shadowColorName;
            this.shadowcolor = res.result.shadowColor;
            this.shadowcolorCMYK = res.result.shadowColorCMYK;

            this.strokeWidth = res.result.lineWeight;
            this.shadowWidth = res.result.smudge;
          }
        }
      })
    },
    viewImgs(id){
      this.showKey = 1;
      this.loadFromJSON(this.myCanvas,JSON.parse(this.jsonArr[id]))
    },
    //that.exampleNumber.lockMovementX = true;
    loadFromJSON (canvas,json) {
        canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), (o,object) => {
          object.lockMovementX = true;
          object.lockMovementY = true;
          object.hasControls = false;
          this.getPhotoInfo(object.src,object)
        });
    },
    onselected(canvas){
      let that = this;
      canvas.on('mouse:down',function(obj){
          if(obj.target){
            if(obj.target.src){
              // 图片文字
              that.getPhotoInfo(obj.target.src,obj.target);
              that.fontsize = parseInt(obj.target.getBoundingRect().height / 6);
            }else{
              // 纯文字
              that.getColorInfo(obj.target.fill.substr(1))
              that.text = obj.target.text
              that.fontfamily = obj.target.fontFamily;
              that.fontsize = parseInt(obj.target.getBoundingRect().height);
              that.fontcolor = obj.target.fill;
            }
          }
      })
    },
    checkOutRequire(id){
      this.show = true;
      this.showKey = 1;
      viewDesign(id).then(res => {
        if(res.code == 0){
          this.imgList = res.result.list1;
          this.eximgList = res.result.list3;
          this.jsonArr = res.result.list2;
          this.productName = res.result.productName;
          this.productColor = res.result.productColor;
          this.remarks = res.result.remarks;
          this.loadFromJSON(this.myCanvas,JSON.parse(this.jsonArr[0]))
        }
      })
    },
    getDealerDesignList(id){
      dealerDesignList(id).then(res => {
        if(res.code == 0){
          this.data = res.result;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#designRequire{
  .title {
    padding: 20px;
    h3{
      margin: 0;
    }
    ul {
      display: flex;
      li {
        width: 33.33%;
        color: #999;
        p {
          font-size: 14px;
          margin: 5px 0;
        }
        span {
          color: #666;
        }
      }
    }
  }
  .list-box{
    padding: 0 20px;
    li{
      display: flex;
      justify-content: space-between;
      background-color: #f1f1f1;
      align-items: center;
      padding: 20px;
      margin: 10px 0;
      .img-box{
        width: 45%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          width: 24%;
        }
      }
      .content{
        width: 55%;
        display: flex;
        justify-content: space-between;
        .btn-box{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        dl{
           margin-bottom: 0;
          margin-left: 10px;
          dt{
            font-size: 18px;
            color: #33b8b3;
          }
          dd{
            margin: 10px 0;
          }
        }
      }
    }
  }
}
.section1{
  h3{
    span{
      font-size: 12px;
      margin-left: 10px;
      color: #666;
    }
  }
  .exImg{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li{
      width: 50%;
      display: flex;
      margin: 10px 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 60%;
      }
      span{
        margin-top: 10px;
      }
    }
    a{
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #333;
      width: 20%;
      text-align: center;
    }
  }
  .img-box{
    display: flex;
    padding: 20px 0;
    justify-content: center;
    background-color: #f1f1f1;
    .imgs{
      width: 80%;
      display: flex;
      justify-content: center;
      img{
        width: 20%;
        margin: 0 10px;
        border:1px solid #ccc;
        padding: 10px;
        cursor: pointer;
      }
    }
    .btn-box{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
  .show-box{
    display: flex;
    margin-top: 10px;
    .desc-box{
      background-color: #f1f1f1;
      width: calc(100% - 400px;);
      .desc{
        width: 100%;
        padding: 20px;
        p{
          margin: 10px 0;
          span{
            margin: 0 5px;
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            display: inline-block
          }
        }
      }
      .img-desc{
        padding: 20px;
        li{
          margin: 10px 0;
          a{
            border:1px solid #ccc;
            color: #333;
            padding: 2px 10px;
            border-radius: 2px;
          }
          img{
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
}
.reject-box{
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 50%;
      text-align: center;
      margin: 10px 0;
      img{
        margin-left: 10px;
      }
    }
  }
}
</style>