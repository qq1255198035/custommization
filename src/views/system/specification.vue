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
          <img :src="item.positivePicUrl" alt="">
          <img :src="item.backPicUrl" alt="">
          <img :src="item.leftPicUrl" alt="">
          <img :src="item.rightPicUrl" alt="">
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
                <a-menu-item>
                  <a href="javascript:;">设计方案1</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">创建新设计</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-button @click="handleConfirm(item.id)">确认样稿</a-button>
          </div>
        </div>
      </li>
    </ul>
    <div class="design-show" v-show="show">
        <a-modal :visible="true" title="设计需求" :width="1000" :getContainer="Ele" @cancel="show = false">
          <div class="section">
            <h3>{{productName}} <span>颜色：{{productColor}}</span></h3>
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
            </ul>
            <div class="remarks" v-show="showKey == 2" style="margin-top: 10px;">
              <p>设计备注：{{remarks}}</p>
            </div>
            <div class="show-box" v-show="showKey == 1">
              <div class="canvans-box">
                <canvas id="canvas" width="600" height="600"></canvas>
              </div>
              <div class="desc-box">
                <div class="desc" v-show="showCode == 2">
                  <p>文字： {{text}}</p>
                  <p>字体： {{fontfamily}}</p>
                  <p>字号：{{fontsize}}</p>
                  <p>字体颜色： {{fontcolorName}}<span :style="{backgroundColor: fontcolor,width: '20px',height: '20px',border:'1px solid #ccc',display: 'inline-block'}"></span> <br /> CMYK : {{fontcolorCMYK}}</p>
                  <p>背景色： {{bgcolorName}}<span :style="{backgroundColor:bgcolor,width: '20px',height: '20px',border:'1px solid #ccc',display: 'inline-block'}"></span> <br /> CMYK : {{bgcolorCMYK}}</p>
                  <p>描边： {{strokecolorName}}<span :style="{backgroundColor:strokecolor,width: '20px',height: '20px',border:'1px solid #ccc',display: 'inline-block'}"></span> <br /> CMYK : {{strokecolorCMYK}} 大小： {{strokeWidth}}</p>
                  <p>阴影： {{shadowcolorName}}<span :style="{backgroundColor:shadowcolor,width: '20px',height: '20px',border:'1px solid #ccc',display: 'inline-block'}"></span> <br /> CMYK : {{shadowcolorCMYK}} 大小： {{shadowWidth}}</p>
                </div>
                <ul class="img-desc" v-show="showCode == 1">
                  <li>
                    图片： <img :src="imgUrl" alt="">
                  </li>
                  <li>
                    尺寸： {{width}} * {{height}}
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
    
  </div>
</template>
<script>
import { fabric } from 'fabric';
import MyTitle from "@/components/MyTitle/MyTitle";
// 方法名加括号
import { dealerDesignList,confirmSample,viewDesign,colorInfo,photoInfo } from '@/api/seller'
export default {
  components:{
    MyTitle
  },
  data(){
    return{
      id:'',
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
      Ele: () => document.querySelector(".design-show"),
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
    getColorInfo(color){
      colorInfo(color).then(res => {
        console.log(res)
        if(res.code == 0){
          this.fontcolorCMYK = res.result.fontColorCMYK;
          this.fontcolorName = res.result.fontColorName
        }
      })
    },
    getPhotoInfo(url,obj){
      photoInfo(url).then(res => {
        console.log(res)
        if(res.code == 0){
          // 判断是图片还是文字
          this.showCode = res.result.code;
          if(res.result.code == 1){
            this.imgUrl = obj.src;
            this.width = obj.width;
            this.height = obj.height;
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
      console.log(id)
      this.showKey = 1;
      this.loadFromJSON(this.myCanvas,JSON.parse(this.jsonArr[id]))
    },
    //that.exampleNumber.lockMovementX = true;
    loadFromJSON (canvas,json) {
        canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (
            o,
            object
        ) {
          console.log(o,object)
          object.lockMovementX = true;
          object.lockMovementY = true;
          object.hasControls = false;
        });
    },
    
    onselected(canvas){
      let that = this;
      canvas.on('mouse:down',function(obj){
          console.log(obj.target)
          if(obj.target){
            if(obj.target.src){
              // 图片文字
              that.getPhotoInfo(obj.target.src,obj.target);
              that.fontsize = obj.target.height;
            }else{
              // 纯文字
              that.getColorInfo(obj.target.fill.substr(1))
              that.text = obj.target.text
              that.fontfamily = obj.target.fontFamily;
              that.fontsize = obj.target.fontSize;
              that.fontcolor = obj.target.fill;
            }
          }
      })
    },
    checkOutRequire(id){
      this.show = true;
      this.showKey = 1;
      viewDesign(id).then(res => {
        console.log(res)
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
        console.log(res)
        if(res.code == 0){
          this.data = res.result;
        }
      })
    },
    handleConfirm(id){
      confirmSample(id).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message.success('操作成功！')
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
.section{
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
</style>