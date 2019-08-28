<template>
    <div id="CommissionsDeatils">
        <my-title :title="'佣金明细'" style="margin-bottom: 30px;"></my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="{showQuickJumper: true}" @change="handleTableChange" :rowClassName="() => {return 'my-throw'}">
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
import MyTitle from "@/components/MyTitle/MyTitle";
import {commissionList} from "@/api/seller"
const statusMap = {
    2: {
        status: 'success',
        text: '已到账'
    },
    1: {
        status: 'warning',
        text: '未到账'
    },
    3: {
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
        MyTitle
    },
    data(){
        return{
            loading:false,
            num:1,
            columns: [
                    {
                            title: '订单号',
                            dataIndex: 'orderSn'
                    },
                    {
                            title: '订单时间',
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
                            title: '操作',
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
                this.data = res.records
            })
        }
    },
    filters:{
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