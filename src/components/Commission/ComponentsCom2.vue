<template>
    <div id="compoents-com2">
        <a-alert message="All sales are final, no refunds or returns." banner style="margin: 20px 0;wi"/>
        <ul class="content">
            <li>
               Receiver's Account：<span>{{count}}</span>
            </li>
            <li>Recipient Name：<span>{{ sname }}</span></li>
            <li>Withdrawal Amount：<span>${{ cash }}</span></li>
            <li>Service Fee({{persent1}}%)：<span>${{sprice}}</span></li>
            <li>Tax({{persent2}}%)：<span>${{dprice}}</span></li>
            <li>Received Amount：<h3>${{dmoney}}</h3></li>
        </ul>
        <p>Login password：<a-input placeholder="Please input a password" style="width: 80%;" @change="inputEnter4" v-model="password" type="password"></a-input></p>
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