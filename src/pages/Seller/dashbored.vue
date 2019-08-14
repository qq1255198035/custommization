<template>
    <div id="dashbored">
        
        <my-header></my-header>
        <order-total></order-total>
        <my-title :title="'进行中的订单'">
            <a href="" style="text-decoration: underline;">全部订单</a>
        </my-title>
        <order-list></order-list>
          
    </div>    
</template>
<script>
import MyHeader from "@/components/MyHeader/MyHeader";

import OrderTotal from '@/components/OrderTotal/OrderTotal';
import MyTitle from "@/components/MyTitle/MyTitle";
import OrderList  from "@/components/OrderList/OrderList";
export default {
    components:{
        MyHeader,
        OrderTotal,
        MyTitle,
        OrderList
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
#dashbored{
    width: 100%;
    
    
}
</style>