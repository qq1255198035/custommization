<template>
    <div id="GroupOrder">
        <my-title :title="'团体订单'"></my-title>
        <ul class="input-box">
            <li>
                <a-button icon="plus" @click="$router.push({name: 'neworder'})">新建订单</a-button>
                <a-radio-group defaultValue="9" style="margin-left: 10px;" @change="changeStatus">
                    <a-radio-button value="9">全部订单</a-radio-button>
                    <a-radio-button value="2">已支付</a-radio-button>
                    <a-radio-button value="0">未支付</a-radio-button>
                </a-radio-group>
            </li>
            <li>
                <div id="input-box">
                    <input type="text" v-model="key">
                    <span @click="search">
                        <a-icon type="search" />
                    </span>
                </div>
            </li>
        </ul>
        <div class="content">
            <template v-if="orderList">
                <order-item :orderArr="orderList" @handleMyClick="openConfirmBox"></order-item>
                <div class="pagination-box">
                    <a-pagination showQuickJumper :defaultCurrent="1" :total="totalnum" @change="onChange($event)" :pageSize="2"/>
                </div>
            </template>
            <p v-else>暂无数据</p>
           
            
        </div>
        <a-modal
            v-model="modelShow"
            :footer="null"
            :centered="true"
            title="样稿确认"
            width="40%"
        >
            <ul class="example-box">
                <li>
                    <h2>方案1</h2>
                    <div style="text-align: center;margin: 10px 0;">
                        <span>
                            <img src="./../../assets/jaw.jpg" alt="">
                            正面
                        </span>
                        <span>
                            <img src="./../../assets/jaw.jpg" alt="">
                            背面
                        </span>
                        <span>
                            <img src="./../../assets/jaw.jpg" alt="">
                            左面
                        </span>
                        <span>
                            <img src="./../../assets/jaw.jpg" alt="">
                            右面
                        </span>
                        
                    </div>
                    <div v-if="textshow" style="width: 70%;margin:20px auto;">
                        <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" />
                    </div>
                    
                    <a-button @click="textshow = true">添加描述</a-button>
                    <a-button>选用此方案</a-button>
                </li>
                
                <a-button type="primary">申请新方案</a-button>
            </ul>
        </a-modal>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import OrderItem from "@/components/OrderItem/OrderItem";
import { groupOrderList,exampleConfirm } from "@/api/seller";
export default {
    components:{
        MyTitle,
        OrderItem,
    },
    data(){
        return{
            orderList:[],
            num:1,
            status: 9,
            content: '',
            totalnum: 0,
            key:'',
            modelShow: false,
            textshow: false
        } 
    },
    methods:{
        openConfirmBox(id){
            this.modelShow = true;
            console.log(id)
            this.getExampleConfirm(id)
        },
        getExampleConfirm(id){
            exampleConfirm(id).then(res => {
                console.log(res)
            })
        },
        search(){
            this.getGroupOrderList(1,this.status,this.key)
        },
        changeStatus(e){
            console.log(e.target.value)
            this.status = e.target.value;
            this.getGroupOrderList(1,this.status,'')
        },
        onChange(pageNumber) {
            console.log('Page: ', pageNumber);
            this.num = pageNumber
            this.getGroupOrderList(this.num,this.status,this.content)
        },
        getGroupOrderList(num,status,orderid){
            groupOrderList(num,status,orderid).then(res => {
                console.log(res)
                this.orderList = res.records;
                this.totalnum = parseInt(res.total);
            })
        }
    },
    mounted(){
        console.log(this.totalnum)
        
    },
    created(){
        this.getGroupOrderList(this.num,this.status,this.content)
    }
}
</script>
<style lang="less">
@import "./../../components/index.less";
#GroupOrder{
    padding: 0 20px;
    .input-box{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        li{
            display: flex;
            #input-box{
                display: flex;
                justify-content: space-between;
                border-radius: 4px;
                padding: 5px 10px;
                width: 250px !important;
                border: 1px solid #33b8b3 !important;
                input{
                        border: none;
                        outline: none;
                        background-color: rgba(255, 255, 255, 0);
                        padding:0;
                        width: calc(100% - 35px)
                }
                span{
                        cursor: pointer;
                        i{
                            font-size: 25px;
                            color: #33b8b3;
                        }
                }
                
            }
        }
    }
    
    .content{
        margin-top: 30px;
        .pagination-box{
            display: flex;
            margin-top: 20px;
            justify-content: flex-end;
        }
    }
}
.example-box{
    padding: 20px;
    max-height: 710px;
    overflow-y: scroll;
    text-align: center;
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
    > button{
        margin-top: 20px;
    }
    li{
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #33b8b3; 
        button{
            margin: 10px;
        }
        h2{
            font-size: 16px;
            color: #33b8b3;
            text-align: left;
        }
        > div{
            span{
                display: inline-block;
                margin: 0 10px;
                width: 20%;
                text-align: center;
                border: 1px solid #ccc;
                color: #33b8b3;
            }
            img{
                width: 100%;
            }
           
        }
         p{
            text-align: center;
            font-size: 14px;
            color: #999;
            margin: 20px 0;
        }
    }
}
</style>