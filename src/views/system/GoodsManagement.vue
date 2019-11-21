<template>
  <div id="GoodsManagement">
    <my-title :title="'商品列表'" :fontsize="20"></my-title>
    <div class="table-page-search-wrapper" style="margin-top: 20px;">
      <a-form layout="inline">
        <a-row style="padding-left: 20px;line-height: 39px;">
          <a-col :md="7">
            <a-form-item label="商品类型">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            </span>
          </a-col>
          <a-col :md="12" style="text-align:right;">
            <a-button type="primary" icon="plus" @click="$router.push({path: '/management/DictList'})">添加</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" -->
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
      rowKey="id"
    >
    
      <p slot="isOnSale" slot-scope="text" style="text-align: center;">
        {{ text ? '是' : '否'}}
      </p>
      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" style="color: #333;">
            更多<a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <!-- record.id -->
            <a-menu-item>
              <a href="javascript:;" style="color: #333;" @click="$router.push({path: '/management/DictList',query:{id: record.id}})">修改</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" style="color: #333;" @click="openColorBox(record.id)">颜色</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" style="color: #333;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
    <a-modal v-model="visible" :closable="false" :width="600" :maskClosable="false">
      <template slot="title">
        <div style="display: flex; justify-content:space-between;">
          <span>颜色列表</span>
          <a-button type="primary" @click="openAddColorbox">新增</a-button>
        </div>
      </template>
      <template slot="footer">
        <a-button @click="visible = false">关闭</a-button>
      </template>
      <div style="padding: 0 20px;">
        <a-table
          :columns="colorColumns"
          :dataSource="colorData"
          :pagination="cpagination"
          @change="handleColorChange"
          rowKey="id"
        >
        <template slot="colorAndName" slot-scope="text">
          <div v-if="text.thumbnail.indexOf('#') == 0" style="display: flex; align-items:center;">
            <span :style="{backgroundColor: text.thumbnail,width: '20px',height: '20px',display: 'inline-block','margin-right': '5px',border: '1px solid #ccc','border-radius': '2px'}"></span><span>{{text.name}}</span>
          </div>
          <div v-else style="display: flex; align-items:center;">
            <img :src="text.thumbnail" width="20" height="20" style="margin-right: 5px;"><span>{{text.name}}</span>
          </div>
        </template>
        <template slot="action" slot-scope="text,record">
          <a @click="editColor(record.id,record.name,record.thumbnail)" style="color: #33b8b3;margin-right: 10px;">修改</a>
          <a @click="handleDeleteColor(record.id)" style="color: #666;">删除</a>
        </template>
      </a-table>
      </div>
    </a-modal>
    <a-modal v-model="visibleA" :maskClosable="false" title="颜色添加/修改" okText="确定" cancelText="关闭" @ok="postColor" @cancel="closeColorBox">
      <div class="add-colorbox">
        <div class="header">
          <img src="@/assets/bookmarks.png"><span class="name">商品名称：{{addColorData.name}}</span><span class="number">商品编号：{{addColorData.code}}</span>
        </div>
        <div class="container">
          <div v-if="addColorData.colorType == 0">
            <dl class="color-box">
              <dt>
                系统颜色:
              </dt>
              <dd v-for="(item,index) in addColorData.list" :key="index" :style="{backgroundColor: item.itemValue}" @click="selectColor(item.itemText,item.itemValue)">
                <a-icon type="check" v-show="selectedColor.indexOf(item.itemText) > -1" />
              </dd>
            </dl>
            <dl class="select-color">
              <dt>
                选择的颜色:
              </dt>
              <dd v-for="(item,index) in colorResult" :key="index">
                <span :style="{backgroundColor: item.value}"></span>
                <span>{{item.name}}</span>
              </dd>
            </dl>
          </div>
          <div v-else >
            <a-form :form="form" layout="horizontal">
              <a-form-item label="颜色名:" :label-col="{ span: 4 }" :wrapper-col="{span: 14}">
                <a-input v-decorator="['colorname', { rules: [{ required: true, message: '请填写颜色名称!' }] }]"/>
              </a-form-item>
              <a-form-item label="上传预览图:" :label-col="{ span: 5 }" :wrapper-col="{span: 4}">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :customRequest="handleChangeDesign1"
                    :showUploadList="false"
                    v-decorator="['viewimg', { rules: [{ required: true, message: '请上传预览图!' }] }]"
                  >
                    <img v-if="viewimg" :src="viewimg" alt="avatar" width="102" height="102"/>
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
              <div style="display: flex; flex-wrap:wrap; justify-content: space-between;">
                <a-form-item label="上传正面:" :label-col="{ span: 10 }" :wrapper-col="{span: 14}">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :customRequest="handleChangeDesign2"
                    :showUploadList="false"
                    v-decorator="['frontimg', { rules: [{ required: true, message: '请上传正面!' }] }]"
                  >
                    <img v-if="frontimg" :src="frontimg" alt="avatar" width="102" height="102"/>
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item label="上传背面:" :label-col="{ span: 10 }" :wrapper-col="{span: 14}">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :customRequest="handleChangeDesign3"
                    :showUploadList="false"
                    v-decorator="['backimg', { rules: [{ required: true, message: '请上传背面!' }] }]"
                  >
                    <img v-if="backimg" :src="backimg" alt="avatar" width="102" height="102"/>
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item label="上传左面:" :label-col="{ span: 10 }" :wrapper-col="{span: 14}">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :customRequest="handleChangeDesign4"
                    :showUploadList="false"
                    v-decorator="['leftimg', { rules: [{ required: true, message: '请上传左面!' }] }]"
                  >
                    <img v-if="leftimg" :src="leftimg" alt="avatar" width="102" height="102"/>
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item label="上传右面:" :label-col="{ span: 10 }" :wrapper-col="{span: 14}">
                  <a-upload
                    listType="picture-card"
                    accept="image/jpeg,image/png,image/jpg.pdf,.bmp,.psd,.ai,.eps,.gif"
                    :customRequest="handleChangeDesign5"
                    :showUploadList="false"
                    v-decorator="['rightimg', { rules: [{ required: true, message: '请上传右面!' }] }]"
                  >
                    <img v-if="rightimg" :src="rightimg" alt="avatar" width="102" height="102"/>
                    <div v-else>
                      <a-icon type='plus'/>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import { sysgoodsList,deleteColor,getColorList,addColorList,sourceUpload,addColor,editColorList} from "@/api/seller"
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'code',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '类别',
      dataIndex: 'categoryName',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '最小订货量',
      dataIndex: 'minOrder',
    },
    {
      title: '生产时间（天）',
      dataIndex: 'productionTime',
    },
    {
      title: '是否在售',
      dataIndex: 'isOnSale',
      scopedSlots: { customRender: 'isOnSale' },
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ];
  export default {
    data() {
      return {
        form:this.$form.createForm(this),
        viewimg:'',
        frontimg: '',
        backimg: '',
        leftimg: '',
        rightimg: '',
        colorFlag:false,
        selectedColor: [],
        selectedColorval: [],
        visible: false,
        visibleA: false,
        goodsId: '',
        addColorData:{},
        colorResult: [],
        data:[],
        colorData:[],
        columns,
        colorColumns:[
          {
            title: '商品编号',
            dataIndex: 'code',
          },
          {
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '颜色',
            dataIndex: 'colorAndName',
            scopedSlots: { customRender: 'colorAndName' },
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center'
          }
        ],
        //selectedRowKeys: [],
        queryParam: {
          name: '',
          status: ''
        },
        loading: false,
        ipagination:{
          current: 1,
          pageSize: 10,
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          total: 0
        },
        cpagination:{
          current: 1,
          pageSize: 10,
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          total: 0
        },
        current: 1,
        colorId: ''
      };
    },
    components:{
      MyTitle
    },
    computed: {
      
    },
    mounted(){
      this.getSysgoodsList(1,'');
    },
    methods: {
      closeColorBox(){
        if(this.addColorData.colorType == 0){
          this.colorResult = [];
          this.selectedColor = [];
          this.selectedColorval = []
        }else{
          this.viewimg = this.frontimg = this.backimg = this.leftimg = this.rightimg = '';
          this.form.setFieldsValue({
            viewimg: '',
            frontimg: '',
            backimg: '',
            leftimg: '',
            rightimg: ''
          });
        }
      },
      editColor(id,name,val){
        console.log(id)
        this.colorId = id
        this.visible = false;
        this.visibleA = true;
        if(this.addColorData.colorType == 0){
          let obj = {
            name: name,
            value: val
          }
          this.colorResult.push(obj);
          this.selectedColor.push(name);
          console.log(this.selectedColor)
          this.selectedColorval.push(val);
        }else{
          editColorList(id).then(res => {
            console.log(res)
            if(res.code == 0){
              this.viewimg = res.result.thumbnail;
              this.frontimg = res.result.positivePicUrl;
              this.backimg = res.result.backPicUrl;
              this.leftimg = res.result.leftimg;
              this.rightimg = res.result.rightimg;
              this.form.setFieldsValue({
                viewimg: res.result.thumbnail,
                frontimg: res.result.positivePicUrl,
                backimg: res.result.backPicUrl,
                leftimg: res.result.leftimg,
                rightimg: res.result.rightimg,
                colorname: res.result.name
              })
            }
          })
        }
      },
      postColor(){
        if(this.addColorData.colorType == 1){
          this.form.validateFields((err, values) => {
            if(!err){
              console.log(values)
              console.log(this)
              this.postAddColor(this.goodsId,this.addColorData.colorType,values.colorname,values.viewimg,values.frontimg,values.backimg,values.leftimg,values.rightimg,this.colorId)
              this.viewimg = this.frontimg = this.backimg = this.leftimg = this.rightimg = '';
              this.form.setFieldsValue({
                viewimg: '',
                frontimg: '',
                backimg: '',
                leftimg: '',
                rightimg: '',
                colorname: ''
              })
            }
          })
        }else{
          this.postAddColor(this.goodsId,this.addColorData.colorType,'',JSON.stringify(this.colorResult),'','','','',this.colorId)
          this.colorResult = [];
          this.selectedColor = [];
          this.selectedColorval = []
        }
      },
      postAddColor(goodsId,colorType,name,thumbnail,positivePicUrl,backPicUrl,leftPicUrl,rightPicUrl,id){
        console.log(11)
        addColor(goodsId,colorType,name,thumbnail,positivePicUrl,backPicUrl,leftPicUrl,rightPicUrl,id).then(res => {
          if(res.code == 200){
            console.log(res)
            this.$message.success(res.message);
            this.visibleA = false;
            this.openColorBox(this.goodsId);
            this.colorId = '';
          }else{
            return false
          }
        })
      },
      handleChangeDesign1(file) {
        let files = file.file;
        if(files.size / 1024 / 1024 < 10){
          let formData = new FormData();
          formData.append("file", files);
          sourceUpload(formData).then(res => {
            console.log(res)
            this.viewimg = res.preview_url;
            this.form.setFieldsValue({
              viewimg: res.preview_url
            });
          })
        }else{
            this.$message.error('图片大小超出限制！')
            return false
        }
      },
      handleChangeDesign2(file) {
        let files = file.file;
        if(files.size / 1024 / 1024 < 10){
          let formData = new FormData();
          formData.append("file", files);
          sourceUpload(formData).then(res => {
            console.log(res)
            this.frontimg = res.preview_url;
            this.form.setFieldsValue({
              frontimg: res.preview_url
            });
          })
        }else{
            this.$message.error('图片大小超出限制！')
            return false
        }
      },
      handleChangeDesign3(file) {
        let files = file.file;
        if(files.size / 1024 / 1024 < 10){
          let formData = new FormData();
          formData.append("file", files);
          sourceUpload(formData).then(res => {
            console.log(res)
            this.backimg = res.preview_url;
            this.form.setFieldsValue({
              backimg: res.preview_url
            });
          })
        }else{
            this.$message.error('图片大小超出限制！')
            return false
        }
      },
      handleChangeDesign4(file) {
        let files = file.file;
        if(files.size / 1024 / 1024 < 10){
          let formData = new FormData();
          formData.append("file", files);
          sourceUpload(formData).then(res => {
            console.log(res)
            this.leftimg = res.preview_url;
            this.form.setFieldsValue({
              leftimg: res.preview_url
            });
          })
        }else{
            this.$message.error('图片大小超出限制！')
            return false
        }
      },
      handleChangeDesign5(file) {
        let files = file.file;
        if(files.size / 1024 / 1024 < 10){
          let formData = new FormData();
          formData.append("file", files);
          sourceUpload(formData).then(res => {
            console.log(res)
            this.rightimg = res.preview_url;
            this.form.setFieldsValue({
              rightimg: res.preview_url
            });
          })
        }else{
            this.$message.error('图片大小超出限制！')
            return false
        }
      },
      selectColor(tag,color){
        console.log(tag);
        if(this.selectedColor.indexOf(tag) > -1){
          this.colorFlag = false;
        }else{
          this.colorFlag = true;
        }
        const { selectedColor,selectedColorval } = this;
        const nextSelectedTags = this.colorFlag
          ? [...selectedColor, tag]
          : selectedColor.filter(t => t !== tag);

        const nextSelectedVals = this.colorFlag
          ? [...selectedColorval, color]
          : selectedColorval.filter(t => t !== color);
        console.log('You are interested in: ', nextSelectedTags);
        console.log('You are interested in: ', nextSelectedVals);
        this.selectedColor = nextSelectedTags;
        this.selectedColorval = nextSelectedVals;
        this.colorResult = this.selectedColor.map((date,i) => ({name:date, value: this.selectedColorval[i]}));
      },
      openAddColorbox(){
        this.visible = false;
        this.visibleA = true;
        
      },
      openColorBox(id){
        getColorList(id).then(res => {
          console.log(res)
          if(res.code == 0){
            this.colorData = res.result;
            this.goodsId = id;
            this.visible = true;
            addColorList(this.goodsId).then(res => {
              console.log(res)
              if(res.code == 0){
                this.addColorData = res.result;
              }
            })
          }
        })
        
      },
      handleDeleteColor(id){
        deleteColor(id).then(res => {
          if(res.code == 200){
            this.$message.success(res.message);
            this.openColorBox(this.goodsId);
          }
        })
      },
      searchQuery(){
        this.loading = true;
        this.getSysgoodsList(1,this.queryParam.name);
      },
      getSysgoodsList(pageNo,name){
        sysgoodsList(pageNo,name).then(res => {
          console.log(res)
            this.data = res.records;
            this.ipagination.total = res.total;
            this.loading = false
        })
      },
      handleTableChange(pagination) {
        this.ipagination = pagination;
        this.current = pagination.current;
        this.loading = true;
        this.getSysgoodsList(pagination.current,this.queryParam.name)
      },
      handleColorChange(pagination){
        this.cpagination = pagination;
      }
    },
  };
</script>
<style lang="less" scoped>
#GoodsManagement{
  padding: 0 20px;
  .table-page-search-wrapper{
    padding-bottom: 20px;
  }
}
.add-colorbox{
  .header{
    width: 95%;
    margin: 0 auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .name{
      margin-left: 10px;
    }
    .number{
      margin-left: 50px;
    }
  }
  .container{
    padding: 20px 30px;
    .select-color{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 20px;
      dt{
        margin-right: 10px; 
      }
      dd{
        margin: 5px 5px;
        display: flex;
        flex-wrap: wrap;
        span{
          font-size: 10px;
        }
        span:nth-child(1){
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-right: 5px;
          border: 1px solid #ccc;
          border-radius: 2px;
        }
      }
    }
    .color-box{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 20px;
      dt{
        margin-right: 10px; 
      }
      dd{
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 5px 5px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 20px;
        border-radius: 2px;
      }
    }
  }
}
</style>