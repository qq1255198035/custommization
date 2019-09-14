<template>
    <div id="Commissions">
        <my-title :title="'佣金管理'" :fontsize="20"></my-title>
        <order-total :num1="price1 | moneyFormat" :num2="price2 | moneyFormat" :num3="price3 | moneyFormat">
            <p slot="a" style="margin: 0; color: #757575;">总佣金</p>
            <p slot="b" style="margin: 0; color: #757575;">余额</p>
            <p slot="c" style="margin: 0; color: #757575;">未到账金额</p>
        </order-total>
        <my-title :title="'提现记录'" :fontsize="20" style="margin: 20px 0 ">
            <a-button @click="show = true">申请提现</a-button>
        </my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
                <span slot="status" slot-scope="text">
                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                </span>
                <template slot="operation" slot-scope="text,record">
                    <a href="javascript:;" @click="checkOutPrice(record.id)"><a-icon type="file-search" style="font-size: 20px;"/></a>
                </template>
        </a-table>
        <a-modal v-model="show" :footer="null" title="申请提现" :width="768">
            <div class="commodal-box">
                <a-steps :current="current">
                    <a-step v-for="item in steps" :key="item.title" :title="item.title" />
                </a-steps>
                <div class="steps-content">
                    <component 
                        :is="steps[current].content" 
                        @selected="payType" 
                        @input1="enterName" 
                        @input2="enterPrice(arguments)" 
                        @input3="enterCount"
                        @input4="enterPassword"
                        :count="count"
                        :sname="name"
                        :cash="price"
                        :sprice="sprice"
                        :dprice="dprice"
                        :dmoney="dmoney"
                        :persent1="persent1"
                        :persent2="persent2"
                        :account3="account3"
                        :name3="name3"
                        :price3="price4"
                    >
                        
                    </component>
                </div>
                <div class="steps-action" style="text-align: center;">
                    <a-button
                        v-if="current < steps.length - 1"
                        type="primary" @click="next"
                    >
                        下一步
                    </a-button>
                    <a-button
                        v-if="current == steps.length - 1"
                        type="primary"
                        @click="done"
                    >
                        Completed
                    </a-button>
                    <a-button
                        v-if="current == 1"
                        style="margin-left: 8px"
                        @click="prev"
                    >
                        上一步
                    </a-button>
                </div>
            </div>
        </a-modal>
        <a-modal v-model="show1" :footer="null" title="提现" :width="768">
            <div class="commodal-box">
                <ul class="content">
                    <li>
                        收款账户：<span>{{count1}}</span>
                    </li>
                    <li>收款人姓名：<span>{{ sname1 }}</span></li>
                    <li>提现金额：<span>￥{{ cash1 }}</span></li>
                    <li>手续费({{persent3}}%)：<span>￥{{sprice1}}</span></li>
                    <li>地方税({{persent4}}%)：<span>￥{{dprice1}}</span></li>
                    <li>到账金额：<h3>￥{{dmoney1}}</h3></li>
                </ul>
               
            </div>
        </a-modal>
    </div>
</template>
<script>
import OrderTotal from '@/components/OrderTotal/OrderTotal';
import MyTitle from "@/components/MyTitle/MyTitle";
import ComponentA from "@/components/Commission/ComponentsCom1";
import ComponentB from "@/components/Commission/ComponentsCom2";
import ComponentC from "@/components/Commission/ComponentsCom3";
import { commissionsData, withdrawalList, nextStptes, twoNext,comDetails } from "@/api/seller"
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
        MyTitle,
        ComponentA,
        ComponentB,
        ComponentC
    },
    data(){
        return{
                count1: '',
                sname1: '',
                cash1: '',
                persent3: '',
                persent4: '',
                dprice1: '',
                dmoney1: '',
                sprice1: '',
                show1: false,
                price1:0,
                price2:0,
                price3:0,
                loading: false,
                pagination:{showQuickJumper: true,pageSize: 7,total: 0},
                columns: [
                    {
                            title: '提现单号',
                            dataIndex: 'order_id'
                    },
                    {
                            title: '账号',
                            dataIndex: 'account'
                    },
                    {
                            title: '提交时间',
                            dataIndex: 'created_time',
                    },
                    {
                            title: '金额',
                            dataIndex: 'amount',
                    },
                    {
                            title: 'Status',
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
                data: [],
                show: false,
                current: 0,
                steps: [{
                    title: '填写账户信息',
                    content: ComponentA,
                    }, {
                    title: '确认信息',
                    content: ComponentB,
                    }, {
                    title: 'Completed',
                    content: ComponentC,
                }],
                paytype: '',
                name:'',
                price: '',
                count: '',
                sprice: '',
                dprice: '',
                dmoney: '',
                totalMoney: '',
                passWord: '',
                persent1: '',
                persent2: '',
                account3: '',
                name3: '',
                price4: ''
            }
    },
    mounted(){
        this.getCommissionsData();
        this.getWithdrawalList(1);
    },
    methods:{
        
        checkOutPrice(id){
            this.show1 = true;
            console.log(id)
            comDetails(id).then(res => {
                console.log(res)
                this.count1 = res.result.account,
                this.sname1 = res.result.name,
                this.cash1 =  res.result.amount,
                this.persent3 = res.result.taxRate,
                this.persent4 = res.result.proceduresRate,
                this.dprice1 = res.result.procedures,
                this.dmoney1 = res.result.arrival,
                this.sprice1 = res.result.tax
            })
        },
        postTwoNext(params){
            twoNext(params).then(res => {
                console.log(res)
                if(res.code == 200){
                    this.account3 = this.count;
                    this.name3 = this.name;
                    this.price4 = this.dmoney;
                    this.current++;
                }else{
                    this.$message.error('密码错误！')
                }
            })
        },
        postNextStptes(account,name,amount,type){
            nextStptes(account,name,amount,type).then(res => {
                console.log(res)
                this.sprice = res.result.tax;
                this.dprice = res.result.procedures;
                this.dmoney = res.result.arrival;
                this.persent1 = res.result.taxRate;
                this.persent2 = res.result.proceduresRate
            })
        },
        enterPassword(passWord){
            this.passWord = passWord;
        },
        enterCount(count){
            console.log(count)
            this.count = count;
        },
        enterPrice(msg){
            console.log(name)
            this.price = msg[0];
            this.totalMoney = msg[1];
        },
        enterName(name){
            console.log(name)
            this.name = name;
        },
        payType(type){
            console.log(type)
            this.paytype = type;
        },
        next() {
            if(this.current == 0){
                if(this.paytype){
                    if(this.price >= 100){
                        if(this.price < this.totalMoney){
                            this.current++;
                            this.postNextStptes(this.count,this.name,this.price,this.paytype);
                        }else{
                            this.$message.error('提现余额不足！')
                        }
                        
                    }else{
                        this.$message.error('最小体现金额100元！')
                    }
                }else{
                    this.$message.error('请选择收款账户！')
                }
            }else{
                let params = {account: this.count,name:this.name,amount:this.price,type:this.paytype,tax:this.dprice,procedures:this.sprice,arrival:this.dmoney,password:this.passWord}
                this.postTwoNext(params)
            }
        },
        prev() {
            this.current--
        },
        done(){
            this.getWithdrawalList(1);
            this.show = false;
        },
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
                    this.price3 = res.result.unpaid;
                }
            })
        },
        getWithdrawalList(num){
            withdrawalList(num).then(res => {
                console.log(res)
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
                return statusMap[type].text || ''
        },
        statusTypeFilter (type) {
                return statusMap[type].status || ''
        }
    },
    computed:{
        
    }
}
</script>
<style lang="less">
@import "./../../components/index.less";
#Commissions{
    padding: 0 20px;
}
.commodal-box{
    padding: 30px;
    .content{
        width: 60%;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        li{
            width: 100%;
            display: flex;
            justify-content: space-between;
            
            padding: 5px;
            span{
                font-size: 16px;
                color: #33b8b3;
            }
            h3{
                color: #33b8b3;
            }
        }
    }
}
</style>