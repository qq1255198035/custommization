<template>
    <div id="dashbored">
        <my-header></my-header>
        <order-total :num1="price1 | moneyFormat" :num2="price2 | moneyFormat" :num3="price3 | moneyFormat">
            <p slot="a">总销售额</p>
            <p slot="b">总订单数</p>
            <p slot="c">总佣金</p>
        </order-total>
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
            price1:13000,
            price2:13000,
            price3:13000,
        }
    },
    filters:{
        moneyFormat(number, decimals) {
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite( + number) ? 0 : +number,
                prec = !isFinite( + decimals) ? 2 : Math.abs(decimals),
                sep = ',',
                dec = '.',
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.ceil(n * k) / k;
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
    }
}
</script>
<style lang="less" scoped>
#dashbored{
    width: 100%;
}
</style>