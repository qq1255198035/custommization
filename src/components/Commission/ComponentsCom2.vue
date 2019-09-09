<template>
    <div id="compoents-com2">
        <a-alert message="确认转帐后，资金将直接打入账户，无法退回。" banner style="margin: 20px 0;wi"/>
        <ul class="content">
            <li>
                收款账户：<span>{{count}}</span>
            </li>
            <li>收款人姓名：<span>{{ sname }}</span></li>
            <li>提现金额：<span>￥{{ cash }}</span></li>
            <li>手续费({{persent1}}%)：<span>￥{{sprice}}</span></li>
            <li>地方税({{persent2}}%)：<span>￥{{dprice}}</span></li>
            <li>到账金额：<h3>￥{{dmoney}}</h3></li>
        </ul>
        <p>登录密码：<a-input placeholder="请输入密码" style="width: 80%;" @change="inputEnter4" v-model="password" type="password"></a-input></p>
    </div>
</template>
<script>
export default {
    props:{
        count:{
           
            required: true
        },
        sname:{
          
            required: true
        },
        cash:{
           
            required: true
        },
        sprice:{
           
            required: true
        },
        dprice:{
           
            required: true
        },
        dmoney:{
            
            required: true
        },
        persent1:{
           
            required: true
        },
        persent2:{
           
            required: true
        }
    },
    data(){
        return{
            password: ''
        }
    },
    methods:{
        inputEnter4(){
            this.$emit('input4', this.password)
        }
    }
}
</script>
<style lang="less" scoped>
#compoents-com2{
    padding: 30px;
    > p{
        display: flex;
        margin:20px; 
        align-items:center;
        justify-content: center;
    }
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