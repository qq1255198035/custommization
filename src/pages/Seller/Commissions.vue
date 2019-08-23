<template>
    <div id="Commissions">
        <my-title :title="'佣金管理'"></my-title>
        <order-total :num1="price1 | moneyFormat" :num2="price2 | moneyFormat" :num3="price3 | moneyFormat">
            <p slot="a" style="margin: 0; color: #757575;">总佣金</p>
            <p slot="b" style="margin: 0; color: #757575;">余额</p>
            <p slot="c" style="margin: 0; color: #757575;">未到账金额</p>
        </order-total>
        <my-title :title="'提现记录'" :fontsize="14" style="margin: 20px 0 "></my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="{showQuickJumper: true,pageSize: 7}" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
                <span slot="status" slot-scope="text">
                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                </span>
                <template slot="operation">
                    <a href="javascript:;"><a-icon type="file-search" style="font-size: 20px;"/></a>
                </template>
        </a-table>
    </div>
</template>
<script>
import OrderTotal from '@/components/OrderTotal/OrderTotal';
import MyTitle from "@/components/MyTitle/MyTitle";
import { commissionsData } from "@/api/seller"
const statusMap = {
    0: {
        status: 'success',
        text: '已到账'
    },
    10: {
        status: 'warning',
        text: '申请中'
    },
    20: {
        status: 'error',
        text: '打款失败'
    },
    30: {
        status: 'processing',
        text: '打款中'
    }
}
export default {
    components:{
        OrderTotal,
        MyTitle
    },
    data(){
        return{
                price1:0,
                price2:0,
                price3:0,
                loading: false,
                columns: [
                    {
                            title: '退款单号',
                            dataIndex: 'num'
                    },
                    {
                            title: '账号',
                            dataIndex: 'account'
                    },
                    {
                            title: '提交时间',
                            dataIndex: 'time',
                    },
                    {
                            title: '金额',
                            dataIndex: 'price',
                    },
                    {
                            title: '状态',
                            dataIndex: 'status',
                            scopedSlots: { customRender: 'status' }
                    },
                    {
                            title: '备注',
                            dataIndex: 'content',
                    },
                    {
                            title: '操作',
                            dataIndex: 'operation',
                            scopedSlots: { customRender: 'operation' },
                    }
                ],
                data: [
                    {
                        key:0,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,
                        content: '1234567'
                    },
                    {
                        key:1,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,
                        content: '1234567'
                    },
                    {
                        key:2,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 30,
                        content: '1234567'
                    },
                    {
                        key:3,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 20,
                        content: '1234567'
                    },
                    {
                        key:4,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 10,
                        content: '1234567'
                    },
                    {
                        key:5,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,
                        content: '1234567'
                    },
                    {
                        key:6,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,
                        content: '1234567'
                    },
                    {
                        key:7,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 30,
                        content: '1234567'
                    },
                    {
                        key:8,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 20,
                        content: '1234567'
                    },
                    {
                        key:9,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 10,
                        content: '1234567'
                    },
                    {
                        key:10,
                        num: 'AAAAA',
                        account: '1564564@qq.com',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 10,
                        content: '1234567'
                    },
                ]
            }
    },
    mounted(){
        this.getCommissionsData();
    },
    methods:{
        handleTableChange (pagination) {
                //this.loading = true;
                console.log(pagination.current)
        },
        getCommissionsData(){
            commissionsData().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.price1 = res.result.amount;
                    this.price2 = res.result.balance;
                    this.price2 = res.result.unpaid;
                }
            })
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
@import "./../../components/index.less";

</style>