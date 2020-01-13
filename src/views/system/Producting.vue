<template>
    <div id="Producting">
        <my-title :title="'生产中订单'" :fontsize="20"></my-title>
        <div class="form-box">
            <a-input placeholder="请输入订单编号" v-model="orderNum" style="width: 25%; margin-right: 20px;"/>
            <a-button type="primary">查 询</a-button>
        </div>
        <div class="table-box">
            <a-table
                :columns="columns"
                :dataSource="dataSource"
                :pagination="ipagination"
            >
                <template slot="orderStatus" slot-scope="text">
                    <a :href="text" class="handle" target="_blank">下载</a>
                </template>
                <template slot="status" slot-scope="text">
                    <p>{{text | filterStatus}}</p>
                </template>
                <template slot="action" slot-scope="text, record">
                    <span class="handle" @click="handleActions(text,record.key,record.orderSn)">{{text === 1 ? '添加物流' : text === 0 ? '审批' : '查看物流'}}</span>
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
                                                        111
                                                    </a-form-item>
                                                    <a-form-item label="照片" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        <div class="img-box">
                                                            <img v-for="(item,i) in imgUrl" :key="i" :src="item" v-preview="item">
                                                        </div>
                                                    </a-form-item>
                                                    <a-form-item label="留言备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        111
                                                    </a-form-item>
                                                </a-form>
                                            </a-col>
                                            <a-col :span="12">
                                                <a-form>
                                                    <a-form-item label="处理意见" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                                                        <a-textarea :autosize="{ minRows: 6}"></a-textarea>
                                                    </a-form-item>
                                                </a-form>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="btn-box">
                                        <a-button type="danger">驳回</a-button>
                                        <a-button>通过</a-button>
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane tab="历史记录" key="2">
                                    <a-table
                                        :columns="tabelTitle"
                                        :dataSource="tabelData"
                                        :pagination="pagination"
                                    >
                                        <template slot="status" slot-scope="text">
                                            {{text}}
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
                                            <a-input
                                                v-decorator="[
                                                    'number',
                                                    {rules: [{ required: true, message: 'Please select your gender!' }]}
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
                                    <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
                                    <a-timeline-item>
                                        <!-- 自定义图标组件，根据状态  渲染 -->
                                        
                                        <a-icon type="up" slot="dot" style="font-size: 10px;"/>
                                        Create a services site 2015-09-01
                                    </a-timeline-item>
                                    <a-timeline-item color="green">

                                        <p>Solve initial network problems 1</p>
                                        <p>Solve initial network problems 2</p>
                                        <p>Solve initial network problems 3 2015-09-01</p>
                                    </a-timeline-item>
                                    <a-timeline-item>
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </a-timeline-item>
                                    <a-timeline-item>
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </a-timeline-item>
                                    <a-timeline-item>
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
                                    </a-timeline-item>
                                    <a-timeline-item>
                                        <p>Technical testing 1</p>
                                        <p>Technical testing 2</p>
                                        <p>Technical testing 3 2015-09-01</p>
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
import { getProductList,logisticsList } from "@/api/system";
import { addressOne } from "@/api/seller";

let filterMap = {
    '0': '等待确认',
    '1': '订单确认',
    '2': '样衣上传',
    '3': '半成品上传',
    '4': '成品上传',
    '5': '包装上传',
    '6': '确认发货',
}
export default{
    data(){
        return{
            form: this.$form.createForm(this),
            orderNum: '',
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
                    dataIndex: 'time',
                    align: 'center'
                },
                {
                    title: '处理意见',
                    dataIndex: 'idea',
                    align: 'center'
                },
                {
                    title: '生产状态',
                    dataIndex: 'status',
                    align: 'center',
                    scopedSlots: { customRender: "c" }
                }
            ],
            tabelData:[
                {
                    key: '1',
                    time: '2019-10-10 15:50:10',
                    idea: 'vevevevevevevveveeveevevevev',
                    status: 1
                }
            ],
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
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                total: 0
            },
            imgUrl:[
                'http://hbimg.b0.upaiyun.com/b8a2f3cb90ebfdcc8f432e55137d8008d8e0b53c656d-LYlEC1_fw658',
                'http://hbimg.b0.upaiyun.com/b8a2f3cb90ebfdcc8f432e55137d8008d8e0b53c656d-LYlEC1_fw658',
                'http://hbimg.b0.upaiyun.com/b8a2f3cb90ebfdcc8f432e55137d8008d8e0b53c656d-LYlEC1_fw658'
            ],
            orderSn: '',
            modelTitle: '',
            modelKey: 0,
            visible: false,
        }
    },
    components:{
        MyTitle
    },
    mounted(){
        this.getProductsList(this.orderNum,1)
    },
    methods:{
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
                console.log('Received values of form: ', values);
                }
            });
        },
        handleActions(a,b,c){
            this.visible = true;
            this.orderSn = c;
            // if(a === 0){
            //     this.modelTitle = '工作流审批';
            //     this.modelKey = 1;
            // }else if(a === 1){
            //     this.modelTitle = '添加物流';
            //     this.modelKey = 2;
            // }else{
            //     this.modelTitle = '物流信息';
            //     this.modelKey = 3;
            // }
            this.modelTitle = '添加物流';
            this.modelKey = 2;
            logisticsList().then(res => {
                console.log(res)
                if(res.code === 0){
                    this.lists = res.result
                }
            })
            this.getAddressOne();
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
            padding-left: 50px;
            max-height: 400px; 
            overflow-y: scroll;
        }
    }
}
</style>