<template>
    <div id="GroupOrder">
        <my-title :title="'团体订单'"></my-title>
        <ul class="input-box">
            <li>
                <a-button icon="plus" @click="$router.push({name: 'neworder'})">新建订单</a-button>
                <a-radio-group defaultValue="a" style="margin-left: 10px;">
                    <a-radio-button value="a">全部订单</a-radio-button>
                    <a-radio-button value="b">已支付</a-radio-button>
                    <a-radio-button value="c">未支付</a-radio-button>
                </a-radio-group>
            </li>
            <li>
                <input-search></input-search>
            </li>
        </ul>
        <div class="content">
            <template v-if="orderList">
                <order-item :orderArr="orderList">
                    <hide-menu></hide-menu>
                </order-item>
            </template>
            <p v-else>暂无数据</p>
            <div class="pagination-box">
                <a-pagination showQuickJumper :defaultCurrent="2" :total="500" @change="onChange" />
            </div>
            
        </div>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import InputSearch from "@/components/InputSearch/InputSearch";
import OrderItem from "@/components/OrderItem/OrderItem";
import HideMenu from "@/components/HideMenu/HideMenu";
export default {
    components:{
            MyTitle,
            InputSearch,
            OrderItem,
            HideMenu
    },
    data(){
        return{
            orderList:[
                {
                    id: 1,
                    orderId: 164456,
                    time: '2019-03-05 19:00:00',
                    closeTime: '2019-03-05 19:00:00',
                    list:[
                        {
                            id: 2,
                            name: '篮球训练服',
                            color: '蓝色',
                            status: '团购中'
                        },
                        {
                            id: 3,
                            name: '篮球训练服',
                            color: '蓝色',
                            status: '团购中'
                        }
                        
                    ]
                },
                {
                    id: 2,
                    orderId: 164456,
                    time: '2019-03-05 19:00:00',
                    closeTime: '2019-03-05 19:00:00',
                    list:[
                        {
                            id: 2,
                            name: '篮球训练服',
                            color: '蓝色',
                            status: '团购中'
                        }
                        
                    ]
                }
            ]
        } 
    },
    methods:{
        onChange(pageNumber) {
            console.log('Page: ', pageNumber);
        }
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