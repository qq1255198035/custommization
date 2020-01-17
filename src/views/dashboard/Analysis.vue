<template>
    <div id="factoryOrders">
        <my-title :title="'订单列表'" :fontsize="20"></my-title>
        <div class="form-box">
            <a-input placeholder="请输入订单编号" style="width: 25%; margin-right: 20px;" v-model="orderNum"/>
            <a-button type="primary" @click="getOrderList(orderNum,1)">查 询</a-button>
        </div>
        <div class="table-box">
            <a-table
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
                @change="handleTableChange"
            >
                <template slot="orderStatus" slot-scope="text">
                    <a :href="text" class="handle" target="_blank">下载</a>
                </template>
                <template slot="status" slot-scope="text,record">
                    {{
                        filterText(record.approveStatus,text)
                    }}
                </template>
                <template slot="action" slot-scope="text, record">
                    <span 
                        class="handle" 
                        @click="handleActions(record.processStatus,record.approveStatus,record.id,record.orderSn)"
                    >
                        {{ record.processStatus | filterStatus}}
                    </span>
                </template>
            </a-table>
        </div>
        <div class="model-box">
            <a-modal
                :title="modelTitle"
                v-model="visible"
                :footer="null"
                :width="800"
                :destroyOnClose="true"
            >
                <div class="container">
                    <div class="main">
                        <div v-show="modelKey === 1">
                            <h2>单号: {{orderSn}}</h2>
                            <p v-if="approverStatus === 0">
                                驳回原因： {{ opinion }}
                            </p>
                            <a-tabs defaultActiveKey="1">
                                <a-tab-pane tab="生产信息上传" key="1">
                                    <div class="tab-box-left">
                                        <p>附件上传:
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
                                        <a-form>
                                            <a-form-item label="留言备注">
                                                <a-textarea v-model="remarks"></a-textarea>
                                            </a-form-item>
                                        </a-form>
                                    </div>
                                    <div class="btn-box">
                                        <a-button type="danger" @click="closeModel">取消</a-button>
                                        <a-button @click="postSumbitOpinion">确定提交</a-button>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane tab="历史记录" key="2">
                                    <a-table
                                        :columns="tabelTitle"
                                        :dataSource="tabelData"
                                        :pagination="pagination"
                                        @change="pageChange"
                                    >
                                        <template slot="status" slot-scope="text">
                                            {{text | filterStatus}}
                                        </template>
                                    </a-table>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                        <div v-show="modelKey === 2">
                            <p style="text-align: center;padding: 30px 0;font-size:18px;">是否接订单：{{ orderSn }} 定制</p>
                            <div class="btn-box">
                                <a-button type="danger" @click="refuseOrder">拒绝</a-button>
                                <a-button @click="postOrderAffirm">确定</a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </a-modal>
        </div>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import { factoryOrderList,upLoad,callbackShow,sumbitOpinion,historyList,orderAffirm } from "@/api/system";
let filterMap = {
    '1': '订单确认',
    '2': '样衣上传',
    '3': '半成品上传',
    '4': '成品上传',
    '5': '包装上传',
    '6': '确认发货',
    '7': '已发货',
}
export default{
    data(){
        return{
            orderNum: '',
            approverStatus: '',
            opinion: '',
            fileUrlArr: [],
            fileList: [],
            remarks: '',
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
                    dataIndex: 'craftExplain',
                    scopedSlots: { customRender: "orderStatus" }
                },
                {
                    title: '生产状态',
                    align: 'center',
                    scopedSlots: { customRender: "status" },
                    dataIndex: 'processStatus',
                },
                {
                    title: '操作',
                    scopedSlots: { customRender: 'action' },
                    align: 'center'
                }
            ],
            tabelTitle: [
                {
                    title: '时间',
                    dataIndex: 'create_time',
                    align: 'center'
                },
                {
                    title: '处理意见',
                    dataIndex: 'opinion',
                    align: 'center'
                },
                {
                    title: '生产状态',
                    dataIndex: 'factory_status',
                    align: 'center',
                    scopedSlots: { customRender: "status" }
                }
            ],
            tabelData:[],
            dataSource:[],
            ipagination:{
                current: 1,
                pageSize: 12,
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                total: 0
            },
            pagination:{
                current: 1,
                pageSize: 5,
                total: 0
            },
            orderSn: '',
            modelTitle: '',
            modelKey: 0,
            visible: false,
            factoryOrderId: ''
        }
    },
    components:{
        MyTitle
    },
    mounted(){
        this.getOrderList(this.orderNum,1);
    },
    methods:{
        refuseOrder(){
            orderAffirm(this.factoryOrderId,2,'',this.orderSn).then(res => {
                //console.log(res)
                if(res.code === 200){
                    this.$message.success('操作成功！');
                    this.visible = false;
                    this.getOrderList(this.orderNum,this.pagination.current);
                }
            })
        },
        postOrderAffirm(){
            orderAffirm(this.factoryOrderId,1,'',this.orderSn).then(res => {
                //console.log(res)
                if(res.code === 200){
                    this.$message.success('操作成功！');
                    this.visible = false;
                    this.getOrderList(this.orderNum,this.pagination.current);
                }
            })
        },
        pageChange(pagination){
            this.pagination = pagination;
        },
        postSumbitOpinion(){
            sumbitOpinion(this.factoryOrderId,this.fileUrlArr.join(','),this.remarks,this.orderSn).then(res => {
                //console.log(res)
                if(res.code === 200){
                    this.$message.success('操作成功！');
                    this.getOrderList(this.orderNum,this.pagination.current);
                    this.visible = false;
                }
            })
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
                //console.log(res)
                this.fileUrlArr.push(res);
            })
        },
        filterText(a,b){
            if(b === 1){
                if(a === 0){
                    return '订单确认中'
                }else{
                    return '样衣驳回'
                }
            }else if(b === 2){
                if(a === 0){
                    return '等待审批'
                }else if(a === 1){
                    return '半成品生产中'
                }else{
                    return '半成品驳回'
                }
            }else if(b === 3){
                if(a === 0){
                    return '等待审批'
                }else if(a === 1){
                    return '成品生产中'
                }else{
                    return '成品驳回'
                }
            }else if(b === 4){
                if(a === 0){
                    return '等待审批'
                }else if(a === 1){
                    return '包装中'
                }else{
                    return '包装驳回'
                }
            }else if(b === 5){
                if(a === 0){
                    return '等待审批'
                }else if(a === 1){
                    return '确认发货中'
                }else{
                    return '确认发货驳回'
                }
            }else if(b === 6){
                if(a === 0){
                    return '等待审批'
                }else if(a === 1){
                    return '发货中'
                }else{
                    return '已发货驳回'
                }
            }else{
                return '完成'
            }
        },
        handleTableChange(pagination){
            this.ipagination = pagination;
            this.getOrderList(this.orderNum,pagination.current);
        },
        getOrderList(code,pageNo){
            factoryOrderList(code,pageNo).then(res => {
                //console.log(res)
                let key = 'key';
                res.records.forEach((item,index) => {item[key] = index})
                this.dataSource = res.records;
                this.ipagination.total = res.total;
            })
        },
        closeModel(){
            this.visible = false;
        },
        handleActions(a,b,c,d){
            this.orderSn = d;
            this.factoryOrderId = c;
            if(a === 1){
                this.visible = true;
                this.modelTitle = '订单确定';
                this.modelKey = 2;
            }else if(a === 7){
                this.$message.warning('订单已完成！')
            }else{
                if(b === 0){
                    this.$message.error('等待审批，请耐心等待！')
                    return
                }
                
                this.visible = true;
                this.modelTitle = '工作流表单';
                this.modelKey = 1;
                this.getModelInfo(c)
            }
        },
        getModelInfo(id){
            this.factoryOrderId = id;
            historyList(id).then(res => {
                //console.log(res)
                if(res.code === 0){
                    let key = 'key';
                    res.result.forEach((item,index) => {item[key] = index});
                    this.tabelData =res.result;
                    this.pagination.total = this.tabelData.length
                }
            })
            callbackShow(id).then(res => {
                //console.log(res)
                if(res.code === 0){
                    this.approverStatus = res.result.approver_status;
                    this.opinion = res.result.opinion
                }
            })
        }
    },
    filters:{
        filterStatus(val){
            return filterMap[val]
        }
    }
}
</script>
<style lang="less" scoped>
#factoryOrders{
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
        .tab-box-left{
            .img-box{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                cursor: pointer;
                img{
                    width: 33%;
                    margin: 3% 0;
                }
            }
        }
        .btn-box{
            text-align: center;
            border-top: 1px solid #ccc;
            button{
                margin: 10px 10px 0;
            }
        }
        .location-info{
            padding-left: 50px;
            max-height: 400px; 
            overflow-y: scroll;
        }
    }
}
</style>