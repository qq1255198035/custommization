<template>
    <div id="Commissions">
        <my-title :title="'佣金管理'" :fontsize="20"></my-title>
        <order-total :num1="price1 | moneyFormat" :num2="price2 | moneyFormat" :num3="price3 | moneyFormat">
            <p slot="a" style="margin: 0; color: #757575;">总佣金</p>
            <p slot="b" style="margin: 0; color: #757575;">余额</p>
            <p slot="c" style="margin: 0; color: #757575;">未到账金额</p>
        </order-total>
        <my-title :title="'提现记录'" :fontsize="20" style="margin: 20px 0 "></my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
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
import { commissionsData, withdrawalList } from "@/api/seller"
const statusMap = {
    4: {
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
        OrderTotal,
        MyTitle
    },
    data(){
        return{
                price1:0,
                price2:0,
                price3:0,
                loading: false,
                pagination:{showQuickJumper: true,pageSize: 7,total: 0},
                columns: [
                    {
                            title: '退款单号',
                            dataIndex: 'order_id'
                    },
                    {
                            title: '账号',
                            dataIndex: 'account'
                    },
                    {
                            title: '提交时间',
                            dataIndex: 'orderTime',
                    },
                    {
                            title: '金额',
                            dataIndex: 'amount',
                    },
                    {
                            title: '状态',
                            dataIndex: 'status',
                            scopedSlots: { customRender: 'status' }
                    },
                    {
                            title: '备注',
                            dataIndex: 'remark',
                    },
                    {
                            title: '操作',
                            dataIndex: 'operation',
                            scopedSlots: { customRender: 'operation' },
                    }
                ],
                data: [
                    
                ]
            }
    },
    mounted(){
        this.getCommissionsData();
        this.getWithdrawalList(1);
    },
    methods:{
        handleTableChange (pagination) {
                //this.loading = true;
                console.log(pagination.current);
                console.log(pagination);
                this.getWithdrawalList(pagination.current)
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
        },
        getWithdrawalList(num){
            withdrawalList(num).then(res => {
                this.data = res.records;
                this.pagination.total = res.total;
                console.log(res)
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