<template>
    <div id="OrderResult">
        <div class="header">
            <my-header></my-header>
            <User :bellcolor="'#fff'" :usercolor="'#fff'"></User>
        </div>
        <div class="box1">
            <my-stpes :mycurrent="1" stpesnum="3">
                    <p slot="p1" style="color: #fff; text-align: center;">Original design</p>
                    <p slot="p2" style="color: #fff; text-align: center;">Proofing confirmation</p>
                    <p slot="p3" style="color: #fff; text-align: center;">Share purchase</p>
            </my-stpes>
        </div>
        <div class="content">
            <div class="success">
                <div class="title">
                    <a-icon type="smile" theme="filled" style="color: #fff;"/>
                    <div>
                        <h3>Successful！</h3>
                        <p style="color: #fff;">Thank you for your order.</p>
                    </div>
                </div>
                <div class="desc">
                    <span></span>
                    <div class="container">
                        <p>We will reply you within 3 working days</p>
                        <p>We will provide a design mockup within 4 working days.</p>
                        <div class="btn-box">
                            <a-button @click="$router.push({path: '/neworder'})">Order Again</a-button>
                            <a-button @click="$router.push({path: '/OrderManagement/grouporder'})">Back</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MyStpes from "@/components/MyStpes/MyStpes";
import MyHeader from "@/components/Header/Header";
import User from "@/components/Header/User";
export default {
    components:{
        MyStpes,
        MyHeader,
        User
    },
    data(){
        return{
            count:1
        }
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
#OrderResult{
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 50px;
        #User{
            text-align: right;
            > span{
                margin: 0 10px;
                i{
                    color: #fff;
                    font-size: 30px;
                    padding: 4px;
                }
            }
            .header-notice{
                position: relative;
                .diount{
                    position: absolute;
                    top:-20px;
                    right: 0px;
                }
            }
        }
    }
    .box1{
        padding: 30px;
        width: 80%;
        margin: 0 auto;
    }
    .content{
        
        .title{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px; 
            > i{
                font-size: 100px;
            }
            > div{
                margin-left: 20px;
            }
            p{
                margin: 0;
            }
            h3{
                color: #fff;
                font-size: 20px;
            }
        }
        .desc{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-top: 100px;
            span{
                display: block;
                height: 16px;
                width: 30%;
                background-color: #71a59f;
                border-radius: 8px;
            }
            .container{
                width: 530px;
                background-color: #fff;
                height: 300px;
                margin-top: -8px;
                padding-top: 80px;
                P{
                    color: #333;
                    text-align: center;
                    margin-bottom: 10px;
                }
                .btn-box{
                    display: flex;
                    justify-content: center;
                    margin-top: 50px;
                    button{
                        margin: 0 20px;
                        &:nth-child(1){
                            color: #33b8b3;
                            border-color: #33b8b3;
                        }
                        &:nth-child(2){
                            color: #333;
                            border-color: #757575;
                        }
                    }
                }
            }
        }
    }
}
</style>