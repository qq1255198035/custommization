<template>
    <div class="mycontent">
        <my-title :title="'销售商详情'" :fontsize="20" style="width: 100%;background-color: #fff;padding: 10px 20px;border-top: 1px solid #ccc">
            <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
        </my-title>
        <a-row type="flex" justify="space-between" style="padding: 0 10px;">
            <a-col :span="7">
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
import MyTitle from "@/components/MyTitle/MyTitle";
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
  
    mounted() {

    },
  
    methods: {

    },
    components: {
        MyTitle
    },
};
</script>

<style scoped lang="less">
.mycontent{
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
   
    .info-left,.info-right{
        padding: 20px;
        background: #fff;
        box-shadow: 2px 4px 4px #eee;
    }
}

</style>
