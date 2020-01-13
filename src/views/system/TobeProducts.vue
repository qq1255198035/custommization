<template>
    <div id="TobePro">
        <my-title :title="'待生产订单'" :fontsize="20"></my-title>
        <div class="form-box">
            <a-input placeholder="请输入订单编号" style="width: 25%; margin-right: 20px;" v-model="orderNum"/>
            <a-button type="primary" @click="getProductsList(orderNum,1)">查 询</a-button>
        </div>
        <div class="table-box">
            <a-table
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                @change="handleTableChange"
            >
                <template slot="orderStatus" slot-scope="text, record">
                    <span class="handle" @click="openUploadBox(record.orderId,record.orderSn,record.id)">上传</span>
                </template>
                <template slot="action" slot-scope="text, record">
                    <span class="handle" @click="selectFactory(record.orderId,record.orderSn,record.id)">选择工厂</span>
                </template>
            </a-table>
        </div>
        <div class="model-box">
            <a-modal
                :title="modelTitle"
                v-model="visible"
                :footer="null"
                :width="700"
                :destroyOnClose="true"
            >
                <div class="container">
                    <div class="main">
                        <h2>
                            单号： {{orderSn}}
                        </h2>
                        <div v-show="modelKey === 2">
                            <p>
                                已选择厂家：{{selectedShow.realname}} {{selectedShow.principal}} {{selectedShow.phone}}
                            </p>
                            <a-table
                                :columns="tableTitle"
                                :dataSource="tableData"
                                :pagination="false"
                                :rowSelection="rowSelection"
                            />
                            <a-form>
                                <a-form-item label="留言备注">
                                    <a-textarea v-model="remarks"></a-textarea>
                                </a-form-item>
                            </a-form>
                        </div>
                        <p v-show="modelKey === 1">工艺说明：
                            <a-upload
                                :fileList="fileList"
                                :remove="handleRemove"
                                :customRequest="beforeUpload"
                                accept=".rar,.zip,.doc,.docx,.pdf"
                            >
                                <a-button>
                                    <a-icon type="upload" /> 上传文件
                                </a-button>
                                <span>
                                    支持扩展名： .rar .zip .doc .docx .pdf
                                </span>
                            </a-upload>
                        </p>
                    </div>
                    <div class="footer">
                        <a-button @click="cancelModel">取消</a-button>
                        <a-button type="primary" @click="handleSelect" :disabled="!isSelect" v-show="modelKey === 2">确定</a-button>
                        <a-button type="primary" @click="handleUpload" :disabled="fileList.length === 0" v-show="modelKey === 1">确定</a-button>
                    </div>
                </div>
            </a-modal>
        </div>
    </div>
</template>

<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import { getProductingList,getFactoryList,upLoad,chooseFactory } from "@/api/system"

export default {
    data(){
        return{
            modelKey: 0,
            modelTitle: '',
            orderNum: '',
            visible: false,
            orderSn: '',
            orderId: '',
            fileList: [],
            factoryId: '',
            factoryIdOrderid: '',
            isSelect: false,
            remarks: '',
            selectedShow: {},
            fileUrlArr:[],
            rowSelection:{
                type: 'radio',
                onSelect: this.onSelect
            },
            tableTitle:[
                {
                    title: '厂家名称',
                    align: 'center',
                    dataIndex: 'realname'
                },
                {
                    title: '生产中订单',
                    align: 'center',
                    dataIndex: 'num'
                },
                {
                    title: '负责人',
                    align: 'center',
                    dataIndex: 'principal'
                },
                {
                    title: '电话',
                    align: 'center',
                    dataIndex: 'phone'
                },
                {
                    title: '邮件',
                    align: 'center',
                    dataIndex: 'email'
                }
            ],
            tableData:[],
            columns: [
                {
                    title: '订单编号',
                    align: 'center',
                    dataIndex: 'orderSn',
                },
                {
                    title: '款式数量',
                    align: 'center',
                    dataIndex: 'styleNum'
                },
                {
                    title: '生产数量',
                    align: 'center',
                    dataIndex: 'allNum',
                },
                {
                    title: '派单日期',
                    align: 'center',
                    dataIndex: 'createTime',
                },
                {
                    title: '交货日期',
                    align: 'center',
                    dataIndex: 'updateTime',
                },
                {
                    title: '工艺声明',
                    align: 'center',
                    scopedSlots: { customRender: "orderStatus" }
                },
                {
                    title: '操作',
                    scopedSlots: { customRender: 'action' },
                    align: 'center'
                }
            ],
            dataSource:[],
            ipagination:{
                current: 1,
                pageSize: 10,
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                total: 0
            }
        }
    },
    components:{
        MyTitle
    },
    mounted(){
        this.getProductsList(this.orderNum,1);
    },
    methods:{
        postChooseFactory(orderId,orderSn,factoryOrderId,opinion,reference,factoryId){
            chooseFactory(orderId,orderSn,factoryOrderId,opinion,reference,factoryId).then(res => {
                console.log(res)
                if(res.code === 200){
                    this.$message.success('操作成功！');
                    this.getProductsList(this.orderNum,this.ipagination.current);
                    this.visible = false;
                }
            })
        },
        getProductsList(code,pageNo){
            getProductingList(code,pageNo).then(res => {
                console.log(res)
                let key = 'key';
                res.records.forEach((item,index) => item[key] = index);
                this.dataSource = res.records;
                this.ipagination.total = res.total;
            })
        },
        handleTableChange(pagination){
            this.ipagination = pagination;
            this.getProductsList(this.orderNum,pagination.current);
        },
        onSelect(record,selected){
            this.factoryId = record.id;
            this.isSelect = selected;
            this.selectedShow = record;
        },
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileUrlArr.splice(index, 1);
            this.fileList = newFileList;
        },
        beforeUpload(file) {
            this.fileList = [...this.fileList, file.file]
            const formData = new FormData();
            formData.append('file', file.file);
            upLoad(formData).then(res => {
                this.fileUrlArr.push(res);
            })
        },
        handleUpload() {
            this.postChooseFactory(this.orderId,this.orderSn,this.factoryIdOrderid,this.remarks,this.fileUrlArr.join(','),this.factoryId)
        },
        handleSelect(){
            if(this.isSelect){
                this.postChooseFactory(this.orderId,this.orderSn,this.factoryIdOrderid,this.remarks,this.fileUrlArr.join(','),this.factoryId)
            }else{
                this.$message.error('请选择工厂！')
            }
        },
        cancelModel(){
            this.visible = false;
            this.isSelect = false;
            this.modelKey = 0;
            this.selectedShow = {};
            this.modelTitle = '';
            this.orderSn = '';
            this.orderId = '';
            this.factoryIdOrderid = '';
            this.factoryId = '';
            this.fileUrlArr = [];
            this.fileList = []
        },
        selectFactory(id,name,fid){
            console.log(id)
            this.modelKey = 2;
            this.orderSn = name;
            this.orderId = id;
            this.factoryIdOrderid = fid;
            this.modelTitle = '选择工厂';
            this.visible = true;
            getFactoryList(id).then(res => {
                console.log(res)
                let key = 'key'
                if(res.code === 0){
                    res.result.list.forEach((item,index) => item[key] = index);
                    this.tableData = res.result.list;
                }
            })
        },
        openUploadBox(id,name,fid){
            console.log(id)
            this.orderId = id;
            this.factoryIdOrderid = fid;
            this.modelKey = 1;
            this.orderSn = name;
            this.modelTitle = '上传';
            this.visible = true;
        }
    }
}
</script>

<style lang="less" scoped>
#TobePro{
    padding: 0 20px;
    .form-box{
        padding: 20px 0;
    }
    .table-box{
        padding: 0 30px;
        .handle{
            color: #666;
            cursor: pointer;
            &:hover{
                color: #33b8b3;
            }
        }
    }
}
.container{
    padding: 20px;
    .main{
        h2{
            font-size: 18px;
        }
        p{
            display: flex;
            align-items: flex-start;
            span{
                margin-left: 10px;
                width: 80%;
            }
        }
    }
    .footer{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        align-items: center;
        padding: 20px 0 0;
        border-top: 1px solid #ccc;
        button{
            margin: 0 10px;
        }
    }
}
</style>