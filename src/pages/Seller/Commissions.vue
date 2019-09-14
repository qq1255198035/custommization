<template>
    <div id="Commissions">
        <my-title :title="'Commission Management'" :fontsize="20"></my-title>
        <order-total :num1="price1 | moneyFormat" :num2="price2 | moneyFormat" :num3="price3 | moneyFormat">
            <p slot="a" style="margin: 0; color: #757575;">Total Commission</p>
            <p slot="b" style="margin: 0; color: #757575;">Balance</p>
            <p slot="c" style="margin: 0; color: #757575;">Payment To Be Received</p>
        </order-total>
        <my-title :title="'Withdrawal Records'" :fontsize="20" style="margin: 20px 0 ">
            <a-button @click="show = true">Apply for Withdrawal</a-button>
        </my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
                <span slot="status" slot-scope="text">
                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                </span>
                <template slot="operation" slot-scope="text,record">
                    <a href="javascript:;" @click="checkOutPrice(record.id)"><a-icon type="file-search" style="font-size: 20px;"/></a>
                </template>
        </a-table>
        <a-modal v-model="show" :footer="null" title="Apply for Withdrawal" :width="768">
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
        <a-modal v-model="show1" :footer="null" title="Withdrawal" :width="768">
            <div class="commodal-box">
                <ul class="content">
                    <li>
                        Receiver's Account：<span>{{count1}}</span>
                    </li>
                    <li>Recipient Name：<span>{{ sname1 }}</span></li>
                    <li>Withdrawal Amount：<span>${{ cash1 }}</span></li>
                    <li>Service Fee({{persent3}}%)：<span>${{sprice1}}</span></li>
                    <li>Tax({{persent4}}%)：<span>${{dprice1}}</span></li>
                    <li>Received Amount：<h3>${{dmoney1}}</h3></li>
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
        text: 'Money Received'
    },
    1: {
        status: 'warning',
        text: 'Applying'
    },
    3: {
        status: 'error',
        text: 'Payment Unsuccessful'
    },
    2: {
        status: 'processing',
        text: 'Processing Payment'
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
                            title: 'Withdrawal Order',
                            dataIndex: 'order_id'
                    },
                    {
                            title: 'Account',
                            dataIndex: 'account'
                    },
                    {
                            title: 'Time Submitted',
                            dataIndex: 'created_time',
                    },
                    {
                            title: 'Amount',
                            dataIndex: 'amount',
                    },
                    {
                            title: 'Status',
                            dataIndex: 'status',
                            scopedSlots: { customRender: 'status' }
                    },
                    {
                            title: 'Add Notes',
                            dataIndex: 'remark',
                    },
                    {
                            title: 'Active',
                            dataIndex: 'operation',
                            scopedSlots: { customRender: 'operation' },
                    }
                ],
                data: [],
                show: false,
                current: 0,
                steps: [{
                    title: 'Fill In Account Details',
                    content: ComponentA,
                    }, {
                    title: 'Please Confirm',
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
                this.count1 = res.result.first.account,
                this.sname1 = res.result.first.name,
                this.cash1 =  res.result.first.amount,
                this.persent3 = res.result.taxRate,
                this.persent4 = res.result.proceduresRate,
                this.dprice1 = res.result.first.procedures,
                this.dmoney1 = res.result.first.arrival,
                this.sprice1 = res.result.first.tax
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
                    this.$message.error('Incorrect password！')
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
                            this.$message.error('The withdrawal balance is insufficient!')
                        }
                        
                    }else{
                        this.$message.error('Minimum Amount - $100！')
                    }
                }else{
                    this.$message.error("Please Select Receiver's Account Information !")
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