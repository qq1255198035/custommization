<template>
    <div id="CommissionsDeatils">
        <my-title :title="'Commission Details'" style="margin-bottom: 30px;" :fontsize="20"></my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="pagination" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
                <span slot="status" slot-scope="text">
                    <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
                </span>
                <span slot="times" slot-scope="text">
                    {{text | formatTime}}
                </span>
                <template slot="operation" slot-scope="text, record">
                    <a href="javascript:;" @click="$router.push({path: '/myorder',query: {id: record.id}})"><a-icon type="file-search" style="font-size: 24px;"/></a>
                </template>
        </a-table>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import {commissionList} from "@/api/seller"
const statusMap = {
    2: {
        status: 'success',
        text: 'Money Received'
    },
    1: {
        status: 'warning',
        text: 'Outstanding account'
    },
    3: {
        status: 'error',
        text: 'Payment Unsuccessful'
    }
}
export default {
    components:{
        MyTitle
    },
    data(){
        return{
            loading:false,
            pagination:{showQuickJumper: true, total: 0,pageSize: 10},
            num:1,
            columns: [
                    {
                            title: 'Order Number',
                            dataIndex: 'orderSn'
                    },
                    {
                            title: 'Order Time',
                            dataIndex: 'orderTime',
                            scopedSlots: { customRender: 'times' }
                    },
                    {
                            title: 'Time Submitted',
                            dataIndex: 'amount',
                    },
                    {
                            title: 'Status',
                            dataIndex: 'status',
                            scopedSlots: { customRender: 'status' }
                    },
                    {
                            title: 'Active',
                            dataIndex: 'operation',
                            scopedSlots: { customRender: 'operation' },
                    }
                ],
                data: []
        }
    },
    mounted(){
        this.getCommissionList(this.num);
    },
    methods:{
        handleTableChange (pagination) {
            console.log(pagination.current)
            this.getCommissionList(pagination.current);
        },
        getCommissionList(num){
            this.loading = true;
            commissionList(num).then(res => {
                this.loading = false;
                console.log(res)
                this.data = res.records;
                this.pagination.total = res.total
            })
        }
    },
    filters:{
        statusFilter (type) {
            return statusMap[type].text;
        },
        statusTypeFilter (type) {
            return statusMap[type].status;
        },
        formatTime(time){
            if(time){
                let d = new Date(time);
                let localTime = d.getTime();
                let localOffset = d.getTimezoneOffset()*60000;   //getTimezoneOffset()返回是以分钟为单位，需要转化成ms
                let utc = localTime + localOffset;
                let offset = d.getTimezoneOffset() / 60; //以韩国时间为例，东9区
                let korean = utc + (3600000 * offset);
                let date = new Date(korean);
                let y = date.getFullYear();  
                let m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                let dr = date.getDate();  
                dr = dr < 10 ? ('0' + dr) : dr;  
                let h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                let minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                let second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + dr +' '+ h +':'+ minute + ':' + second;  
            }else{
                return ' '
            }
        }
    }
}
</script>
<style lang="less">
@import "./../../components/index.less";
#CommissionsDeatils{
    padding: 0 20px;
}
</style>