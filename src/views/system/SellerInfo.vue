<template>
    <div>
        <a-row :gutter="40" style="padding: 0 40px;">
            <a-col :span="8">
                <div class="info-left">
                    <img src="" alt="">
                    <h2>JOJO</h2>
                    <p><span>等级：<span>VIP</span></span><span>折扣：<span>95%</span></span></p>
                    <p>邮箱：aaasdsd@qq.com</p>
                    <p>注册时间：<span>2019-08-21 10:00</span></p>
                </div>
            </a-col>
            <a-col :span="16">
                <div class="info-right">
                    <h1>基本信息</h1>
                    <p>个人简介</p>
                    <p></p>
                    <h1>代理信息</h1>
                    <p>公司名称：吉林热动</p>
                    <p>商业登记号：xxxxxxx</p>
                    <p>预计销售额：2222</p>
                    <p>员工数量：20</p>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
    .info-left,.info-right{
        padding: 20px;
        background: #fff;
        box-shadow: 2px 4px 4px #eee;
    }
</style>
