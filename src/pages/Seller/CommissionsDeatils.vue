<template>
    <div id="CommissionsDeatils">
        <my-title :title="'佣金明细'" style="margin-bottom: 30px;"></my-title>
        <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="{showQuickJumper: true,pageSize: 7}" @change="handleTableChange">
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
const statusMap = {
    0: {
        status: 'success',
        text: '已到账'
    },
    10: {
        status: 'warning',
        text: '未到账'
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
        MyTitle
    },
    data(){
        return{
            loading:false,
            columns: [
                    {
                            title: '订单号',
                            dataIndex: 'num'
                    },
                    {
                            title: '订单时间',
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
                            title: '操作',
                            dataIndex: 'operation',
                            scopedSlots: { customRender: 'operation' },
                    }
                ],
                data: [
                    {
                        key:0,
                        num: 'AAAAA',
                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,
                    },
                    {
                        key:1,
                        num: 'AAAAA',

                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 0,

                    },
                    {
                        key:2,
                        num: 'AAAAA',

                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 30,

                    },
                    {
                        key:3,
                        num: 'AAAAA',

                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 20,

                    },
                    {
                        key:4,
                        num: 'AAAAA',

                        time: '2016-03-05 5:00:15',
                        price: '300000',
                        status: 10,

                    }
                ]
        }
    },
    methods:{
        handleTableChange (pagination) {
            //this.loading = true;
            console.log(pagination.current)
        },
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