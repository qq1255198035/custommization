<template>
    <div id="Producting">
        <my-title :title="'生产中订单'" :fontsize="20"></my-title>
        <div class="form-box">
            <a-input placeholder="请输入订单编号" v-model="orderNum" style="width: 25%; margin-right: 20px;"/>
            <a-button type="primary" @click="getProductsList(orderNum,1)">查 询</a-button>
        </div>
        <div class="table-box">
            <a-table
                :columns="columns"
                :dataSource="dataSource"
                @change="handleTableChange"
                :pagination="ipagination"
            >
                <template slot="orderStatus" slot-scope="text">
                    <a :href="text" class="handle" target="_blank">下载</a>
                </template>
                <template slot="status" slot-scope="text">
                    <p>{{text | filterStatus}}</p>
                </template>
                <template slot="action" slot-scope="text, record">
                    <span 
                        class="handle" 
                        @click="handleActions(record.processStatus,record.id,record.orderSn,record.approveStatus)"
                        :style="{color: record.processStatus === 7 ? '#FF8000' : record.processStatus === 8 ? '#0292FF' : record.approveStatus === 0 ? '#33b8b3' : record.approveStatus === 1 ? '#87DB4B' : 'red'}"
                    >
                        {{record.processStatus === 7 ? '添加物流' : record.processStatus === 8 ? '查看物流' : record.approveStatus === 0 ? '审批' : record.approveStatus === 1 ? '已通过' : '已拒绝'}}
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
                        <h2 v-show="modelKey !== 3">
                            单号: {{orderSn}}
                        </h2>
                        <div v-show="modelKey === 1">
                            <a-tabs defaultActiveKey="1">
                                <a-tab-pane tab="生产信息" key="1">
                                    <div class="tab-box-left">
                                        <a-row type="flex" :gutter="16">
                                            <a-col :span="12">
                                                <a-form>
                                                    <a-form-item label="生产状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        {{productStatus | filterStatus}}
                                                    </a-form-item>
                                                    <a-form-item label="照片" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        <div class="img-box">
                                                            <img v-for="(item,i) in imgUrl" :key="i" :src="item" v-preview="item">
                                                        </div>
                                                    </a-form-item>
                                                    <a-form-item label="留言备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        {{remarks}}
                                                    </a-form-item>
                                                </a-form>
                                            </a-col>
                                            <a-col :span="12">
                                                <a-form>
                                                    <a-form-item label="处理意见" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        <a-textarea :autosize="{ minRows: 6}" v-model="idea"></a-textarea>
                                                    </a-form-item>
                                                </a-form>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="btn-box">
                                        <a-button type="danger" @click="postInfo(factoryOrderId,2,idea,orderSn)">驳回</a-button>
                                        <a-button @click="postInfo(factoryOrderId,1,idea,orderSn)">通过</a-button>
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
                        <div v-show="modelKey === 2" style="margin-top: 20px;">
                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form :form="form">
                                        <a-form-item label="物流公司" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                            <a-select
                                                v-decorator="[
                                                    'gender',
                                                    {rules: [{ required: true, message: 'Please select your gender!' }]}
                                                ]"
                                                placeholder="Select"
                                            >
                                                <a-select-option :value="item.itemValue" v-for="item in lists" :key="item.itemText">
                                                    {{item.itemText}}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-item>
                                        <a-form-item label="发件人姓名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                                            <a-input
                                                v-decorator="[
                                                    'name',
                                                    {rules: [{ required: true, message: 'Please select your gender!' }]}
                                                ]"
                                                placeholder="enter"
                                            />
                                        </a-form-item>
                                        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="地址">
                                            <a-cascader 
                                                :options="options" 
                                                placeholder="Please select" 
                                                v-decorator="[
                                                    'location',
                                                    {rules: [{ required: true, message: 'Please select!' }]}
                                                ]"
                                            />
                                        </a-form-item>
                                    </a-form>
                                </a-col>
                                <a-col :span="12">
                                    <a-form :form="form">
                                        <a-form-item label="物流单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                            <a-input
                                                v-decorator="[
                                                    'no',
                                                    {rules: [{ required: true, message: 'Please select your gender!' }]}
                                                ]"
                                                placeholder="Select"
                                            />
                                                
                                            
                                        </a-form-item>
                                        <a-form-item label="发件人电话" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                                            <a-input-number
                                                style="width: 100%;"
                                                v-decorator="[
                                                    'number',
                                                    {
                                                        rules: [
                                                            { required: true, message: '请填写电话号码!' },
                                                            { type: 'number', message: '请填写数字!' }
                                                        ]
                                                    }
                                                ]"
                                                placeholder="enter"
                                            /> 
                                        </a-form-item>
                                        <a-form-item>
                                            <a-input 
                                                v-decorator="[
                                                    'location2',
                                                    {rules: [{ required: true, message: '请填写！' }]}
                                                ]"
                                                placeholder="请输入详细地址！"
                                            />
                                        </a-form-item>
                                    </a-form>
                                </a-col>
                            </a-row>
                            <div class="btn-box">
                                <a-button @click="cancelAddTransport">取消</a-button>
                                <a-button type="primary" @click="confirmAddTransport">确定</a-button>
                            </div>
                        </div>
                        <div v-show="modelKey === 3">
                            <div class="location-info">
                                <a-timeline>
                                    <a-timeline-item v-for="(item,index) in logisticsList" :key="index">
                                        <!-- 自定义图标组件，根据状态  渲染 -->
                                        <a-icon type="up" slot="dot" style="font-size: 10px;" />
                                        <p>{{ item.checkpointTime | filterTime }}</p>
                                        <p>{{ item.message }}</p>
                                    </a-timeline-item>
                                </a-timeline>
                            </div>
                            <div class="btn-box">
                                <a-button @click="visible = false">关闭</a-button>
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
import { logisticsInfo,getProductList,logisticsList,saveLogistics,checkOutInfo,historyList,adminOrderAffirm } from "@/api/system";
import { addressOne } from "@/api/seller";
import moment from 'moment';
let filterMap = {
    '0': '等待确认',
    '1': '订单确认',
    '2': '样衣上传',
    '3': '半成品上传',
    '4': '成品上传',
    '5': '包装上传',
    '6': '确认发货',
    '7': '已确认发货',
}
export default{
    data(){
        return{
            form: this.$form.createForm(this),
            logisticsList: [],
            orderNum: '',
            idea: '',
            productStatus: '',
            remarks: '',
            lists: [],
            options: [],
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
            imgUrl:[],
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
        this.getProductsList(this.orderNum,1)
    },
    methods:{
        postInfo(factoryOrderId,approverStatus,opinion,orderSn){
            adminOrderAffirm(factoryOrderId,approverStatus,opinion,orderSn).then(res => {
                console.log(res)
                if(res.code === 200){
                    this.$message.success('操作成功！');
                    this.getProductsList(this.orderNum,this.ipagination.current);
                    this.visible = false
                }
            })
        },
        pageChange(pagination){
            this.pagination = pagination;
        },
        handleTableChange(pagination){
            this.ipagination = pagination;
            this.getProductsList(this.orderNum,pagination.current);
        },
        getAddressOne() {
            addressOne().then(res => {
                this.options = res.result;
            });
        },
        getProductsList(code,pageNo){
            getProductList(code,pageNo).then(res => {
                console.log(res)
                let key = 'key';
                res.records.forEach((item,index) => item[key] = index);
                this.dataSource = res.records;
                this.ipagination.total = res.total;
            })
        },
        cancelAddTransport(){
            this.visible = false;

        },
        confirmAddTransport(){
            this.form.validateFields((err, values) => {
                if (!err) {
                    let params = {
                        id: this.factoryOrderId,
                        logisticsCompany: values.gender,
                        trackingNumber: values.no,
                        recipients: values.name,
                        recipientsPhone: values.number,
                        province: values.location[1],
                        city: values.location[2],
                        district: values.location[0],
                        address: values.location2
                    }
                    console.log(JSON.stringify(params))
                    saveLogistics(params).then(res => {
                        console.log(res)
                        if(res.code === 200){
                            this.getProductsList(this.orderNum,1)
                            this.$message.success('操作成功！');
                            this.visible = false;
                        }
                    })
                }
            });
        },
        handleActions(status,id,orderSn,approveStatus){
            
            if(status === 8){
                this.visible = true;
                this.orderSn = orderSn;
                this.modelTitle = '物流信息';
                this.modelKey = 3;
                logisticsInfo(id).then(res => {
                    console.log(res)
                    if(res.code === 0){
                        this.logisticsList = res.result.logisticsList;
                    }
                })
            }else if(status === 7){
                this.visible = true;
                this.orderSn = orderSn;
                this.modelTitle = '添加物流';
                this.modelKey = 2;
                    if(this.lists.length === 0){
                        logisticsList().then(res => {
                            console.log(res)
                            if(res.code === 0){
                                this.lists = res.result
                            }
                        })
                        this.getAddressOne();
                    }
            }else{
                if(approveStatus === 0){
                    this.visible = true;
                    this.orderSn = orderSn;
                    this.modelTitle = '工作流审批';
                    this.modelKey = 1;
                    this.getModelInfo(id)
                }
            }
            
        },
        getModelInfo(id){
            this.factoryOrderId = id;
            historyList(id).then(res => {
                console.log(res)
                if(res.code === 0){
                    let key = 'key';
                    res.result.forEach((item,index) => {item[key] = index});
                    this.tabelData =res.result;
                    this.pagination.total = this.tabelData.length
                }
            })
            checkOutInfo(id).then(res => {
                if(res.code === 0){
                    this.remarks = res.result.opinion;
                    this.imgUrl = res.result.reference.split(',')
                    this.productStatus = res.result.factoryStatus;
                }
            })
        }
    },

    filters:{
        filterStatus(val){
            return filterMap[val]
        },
        filterTime(val){
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>
<style lang="less" scoped>
#Producting{
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
            padding: 30px 50px;
            max-height: 400px; 
            overflow-y: scroll;
        }
    }
}
</style>