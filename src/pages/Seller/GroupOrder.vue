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
                <order-item :orderArr="orderList">
                    <hide-menu></hide-menu>
                </order-item>
                <div class="pagination-box">
                    <a-pagination showQuickJumper :defaultCurrent="1" :total="totalnum" @change="onChange($event)" :pageSize="4"/>
                </div>
            </template>
            <p v-else>暂无数据</p>
           
            
        </div>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import OrderItem from "@/components/OrderItem/OrderItem";
import HideMenu from "@/components/HideMenu/HideMenu";
import { groupOrderList } from "@/api/seller";
export default {
    components:{
        MyTitle,
        OrderItem,
        HideMenu
    },
    data(){
        return{
            orderList:[],
            num:1,
            status: 9,
            content: '',
            totalnum: 0,
            key:''
            
        } 
    },
    methods:{
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
                this.totalnum = res.total;
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
                border: 1px solid #5ba997 !important;
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
                            color: #5ba997;
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
</style>