<template>
    <div id="compoents-com3">
        <h2>
            <a-icon type="check-circle" />
            <p>操作成功</p>
        </h2>
        <ul class="content">
            <li>收款账户：<span>{{account3}}</span></li>
            <li>收款人姓名：<span>{{name3}}</span></li>
            <li>转账金额：<span>￥{{price3}}</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        account3:{
            required: true
        },
        name3:{
            required: true
        },
        price3:{
            required: true
        },
    }
}
</script>
<style lang="less" scoped>
#compoents-com3{
    background-color: #eee;
    width: 70%;
    margin: 30px auto;
    padding: 20px;
    h2{
        text-align: center;
        margin-bottom: 20px;
        font-size: 18px;
        i{
            font-size: 40px;
            color: #33b8b3;
        }
    }
    .content{
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                font-size: 16px;
            }
        }
    }
}
</style>