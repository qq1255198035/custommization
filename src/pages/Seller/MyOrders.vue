<template>
    <div id="my-order">
        <my-title :title="'订单详情'" :fontsize="20">
            <a-button size="small" icon="rollback" style="font-size: 14px;">返回</a-button>
        </my-title>
        <div class="side">
            <p>
                
                <span>
                    <a-icon type="file-text" />
                    单号:
                </span>
                {{orderId}}
            </p>
            <a-button size="small" style="font-size: 14px;">主操作</a-button>
        </div>
        <div class="title">
            <ul>
                <li>
                    <p><span>创建人：</span>{{ contact }}</p>
                    <p><span>创建时间: </span>{{ createTime }}</p>
                </li>
                <li>
                    <p><span>订购产品：</span>{{topic}}</p>
                    <p><span>备注：</span>{{ introduction }}</p>
                </li>
            </ul>
            <div class="status">
                <div>
                    <div>
                        <p>待关闭时间</p>
                        <span>{{payEndDate}}</span>
                    </div>
                    <a-divider type="vertical" style="height: 40px; margin: 0 50px;"/>
                    <div>
                        <p>状态</p>
                        <span>待审批</span>
                    </div>
                    <a-divider type="vertical" style="height: 40px; margin: 0 50px;"/>
                    <div>
                        <p>订单金额</p>
                        <span>
                            $ {{orderPrice}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="详情" key="1">
                <div class="details">
                    <h3>订单进度</h3>
                    <my-stpes :mycurrent="1" stpesnum="4">
                        <p slot="p1" style="color: #33b8b3;">提交订单</p>
                        <p slot="p2" style="color: #33b8b3;">样稿确认</p>
                        <p slot="p3">分享购买</p>
                        <p slot="p4">完成</p>
                    </my-stpes>
                    <my-title :title="'商品信息'" :fontsize="16" style="margin-top: 20px;"></my-title>
                    <a-row type="flex" class="content" v-for="item in infoList" :key="item.id">
                        <a-col :span="10">
                            <div class="left">
                                <h3>{{item.name}}</h3>
                                <ul class="img-box">
                                    <li>
                                        <img :src="item.positivePicUrl" alt="">
                                        <span>正面</span>
                                    </li>
                                    <li>
                                        <img :src="item.backPicUrl" alt="">
                                        <span>背面</span>
                                    </li>
                                </ul>
                                <p>价格： <span>$ {{item.price}}</span></p>
                                <p>
                                    <span>颜色：{{item.productColor}}</span>
                                    <span style="margin-left: 10px;">数量： <i>{{item.buyNum}}</i>/{{item.quantity}}</span>
                                </p>
                            </div>
                        </a-col>
                        <a-col :span="14">
                            <div class="right">
                                <h3>已付款信息</h3>
                                <a-table :columns="columns" :dataSource="item.interiorList" size="middle" :pagination="false">
                                    <span slot="status" slot-scope="text">
                                        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                                    </span>
                                </a-table>
                            </div>
                        </a-col>
                    </a-row>
                    
                </div>
            </a-tab-pane>
            <a-tab-pane tab="物流信息" key="2">
                <div class="info">
                    <h3>订单进度</h3>
                    <ul class="perInfo">
                        <li>
                            收货人:
                            <span>曲丽丽</span>
                        </li>
                        <li>
                            邮编:
                            <span>123456</span>
                        </li>
                        <li>
                            电子邮件:
                            <span>曲丽丽</span>
                        </li>
                        <li>
                            收货地址:
                            <span>紧邻生长处是此时此刻</span>
                        </li>
                    </ul>
                    <h3>物流轨迹</h3>
                    <ul class="perInfo">
                        <li>
                            物流公司：
                            <span>申通快递</span>
                        </li>
                        <li>
                            运单号：
                            <span>1444554</span>
                        </li>
                    </ul>
                    <ul class="logistics-info">
                        <li>cddcdcddddccdcdcdcdcdccdcd</li>
                        <li>cddcdcddddccdcdcdcdcdccdcd</li>
                        <li>cddcdcddddccdcdcdcdcdccdcd</li>
                    </ul>
                </div>
                
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import MyStpes from "@/components/MyPrimaryStpes/MyPrimaryStpes";
import { orderDetailUp, orderStatus, orderDetailDown } from "@/api/seller"
const statusMap = {
    0: {
        status: 'success',
        text: '已到账'
    },
    1: {
        status: 'warning',
        text: '申请中'
    },
    3: {
        status: 'error',
        text: '打款失败'
    },
    2: {
        status: 'processing',
        text: '打款中'
    }
}
export default {
    components:{
        MyTitle,
        MyStpes
    },
    data(){
        return{
            orderId:'',
            contact:'',
            createTime: '',
            topic:'',
            orderPrice:'',
            introduction: '',
            payEndDate:'',
            columns:[
                {
                title: '尺码',
                dataIndex: 'size',
                }, {
                title: '数量',
                dataIndex: 'number',
                }, {
                title: '操作时间',
                dataIndex: 'pay_time',
                },{
                title: '状态',
                dataIndex: 'pay_status',
                scopedSlots: { customRender: 'status' }
                } 
            ],
            data:[
                
            ],
            infoList:[]
        }
    },
    mounted(){
        this.getOrderDetailUp(266);
        this.getOrderStatus(266);
        this.getOrderDetailDown(266);
    },
    methods:{
        getOrderDetailDown(id){
            orderDetailDown(id).then(res => {
                console.log(res)
                this.infoList = res.result;
            })
        },
        getOrderStatus(id){
            orderStatus(id).then(res => {
                //console.log(res);
            })
        },
        getOrderDetailUp(id){
            orderDetailUp(id).then(res => {
                //console.log(res)
                if(res.code == 0){
                    this.orderId = res.result.orderSn;
                    this.contact = res.result.contact;
                    this.createTime = res.result.createTime;
                    this.topic = res.result.topic;
                    this.orderPrice = res.result.orderPrice;
                    this.introduction = res.result.introduction;
                    this.payEndDate = res.result.payEndDate;
                }
            })
        }
    },
    filters:{
        statusFilter (type) {
            return statusMap[type].text
        },
        statusTypeFilter (type) {
            return statusMap[type].status
        }
    }
}
</script>
<style lang="less" scoped>
@import url("./../../components/index.less");
#my-order{
    .side{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        p{
            font-size: 18px;
            color: #999;
            span{
                color: #33b8b3;
                i{
                    color: #33b8b3;
                }
            }
        }
    }
    .title{
        display: flex;
        justify-content: space-between;
        ul{
            display: flex;
            width: 48%;
            justify-content: space-between;
            padding-left: 20px;
            li{
                width: 50%;
                color: #999;
                p{
                    font-size: 16px;
                }
                span{
                    color: #666;
                }
            }
        }
        .status{
            display: flex;
            align-items: flex-start;
            > div{
                display: flex;
                align-items: center;
                > div{
                    text-align: center;
                    span{
                        font-size: 18px;
                        color: #33b8b3;
                    }
                }
                
            }
        }
    }
    .details{
        padding: 0 40px;
        h3{
            padding: 10px 0;
            color: #33b8b3;
            margin: 0;
        }
        .content{ 
            h3{
                font-size: 18px;
                color: #33b8b3;
            }
            .left{
                padding: 20px;
                border-bottom: 1px solid #ccc;
                background-color: #eee;
                .img-box{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    li{
                        width: 48%;
                        text-align: center;
                        
                        span{
                            color: #999;
                        }
                        img{
                            width: 100%;
                            display: block;
                            margin-bottom: 5px;
                        }
                    }
                }
                p:nth-child(3){
                    span{
                        font-size: 18px;
                        font-weight: bold;
                        color: #33b8b3;
                    }
                }
                p:nth-child(4){
                    span{
                        i{
                            font-style: normal;
                            font-size: 18px;
                            font-weight: bold;
                            color: #666;
                        }
                    }
                }
            }
            .right{
                padding: 20px 10px;
                
            }
        }
    }
    .info{
        padding: 0 30px;
        h3{
            font-size: 18px;
            color: #33b8b3;
        }
        .perInfo{
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            li{
                width: 33.33333%;
                color: #666;
                margin: 5px 0;
                span{
                    color: #999;
                }
            }
        }
    }
    .logistics-info{
        background-color: #eee;
        padding: 20px 20px 100px;
    }
}
</style>