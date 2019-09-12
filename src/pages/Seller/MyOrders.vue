<template>
    <div id="my-order">
        <my-title :title="'订单详情'" :fontsize="20">
            <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">返回</a-button>
        </my-title>
        <div class="side">
            <p>
                
                <span>
                    <a-icon type="file-text" />
                    单号:
                </span>
                {{orderId}}
            </p>
            <a-button size="small" style="font-size: 14px;" @mouseover="hidemenu = true">主操作</a-button>
            <ul v-show="hidemenu" @mouseover="hidemenu = true" @mouseout="hidemenu = false">
                <li style="border-bottom: 1px solid #fff;" @click="$router.push({path:'/orderdetails',query:{id: id}})">
                    <a-icon type="edit" />编辑
                </li>
                <li @click="openMyshareBox(id)">
                    <a-icon type="share-alt" />分享
                </li>
            </ul>
        </div>
        <div class="title">
            <ul>
                <li>
                    <p><span>创建人：</span>{{ contact }}</p>
                    <p><span>创建时间: </span>{{ createTime }}</p>
                </li>
                <li>
                    
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
        <a-modal :visible="openShare" :footer="null" @cancel="closeShareBox" title="分享给朋友" :centered="true">
            <div class="share-box1">
                <share class="share" :config="config"></share>
            </div>
        </a-modal>
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
            hidemenu:false,
            id:'',
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
            infoList:[],
            openShare:false,
            config: {
                url: '', // 网址，默认使用 window.location.href
                source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                title: "11", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                description: "222", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                image:
                        "https://hlx-1258407851.cos.ap-beijing.myqcloud.com/hlx/20181229/16144720457881.png", // 图片, 默认取网页中第一个img标签
                sites: ["facebook", "wechat", "weibo"], // 启用的站点
                //disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
                wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
                wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
            }
        }
    },
    mounted(){
        this.id = this.$route.query.id;
        this.getOrderDetailUp(this.id);
        this.getOrderStatus(this.id);
        this.getOrderDetailDown(this.id);
    },
    methods:{
        openMyshareBox(id){
            console.log(id)
            this.openShare = true;
            this.config.url = 'http://1920168.0.9:8080/#/share' + '?order_id='+id
            console.log(this.config.url)
        },
        closeShareBox(){
            this.openShare = false;
        },
        getOrderDetailDown(id){
            orderDetailDown(id).then(res => {
                console.log(res)
                this.infoList = res.result;
            })
        },
        getOrderStatus(id){
            orderStatus(id).then(res => {
                console.log(res);
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
<style lang="less">
@import url("./../../components/index.less");
#my-order{
    padding: 0 20px;
    .side{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        position: relative;
        ul{
            width: 67px;
            padding: 3px 10px;
            position: absolute;
            top: 25px;
            right: 0;
            background-color: #33b8b3;
            border-radius: 4px;
            li{
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                margin: 2px 0;
                i{
                        margin-right: 5px;
                        color: #fff;
                }
            }
                
        }
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
                    font-size: 14px;
                    margin: 10px 0;
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
.share-box1 {
  padding: 30px;
  p{
    font-size: 12px !important;
  }
  .qrcode{
    margin: 3px auto !important;
  }
  .share {
    text-align: center;
    a {
      font-size: 30px;
      margin: 0 20px;
      border: 1px solid #33b8b3 !important;
      height: 60px;
      width: 60px;
      padding-top: 14px;
    }
  }
}
</style>