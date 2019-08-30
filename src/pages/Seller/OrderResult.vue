<template>
    <div id="OrderResult">
        <div class="header">
            <my-header></my-header>
            <div id="User">
                <span class="header-notice">
                    <a-icon type="bell"/>
                    <a-badge v-if="count" class="diount" :count="count" showZero></a-badge>
                </span>
                <span>
                    <a-icon type="user"/>
                </span>
            </div>
        </div>
        <div class="box1">
            <my-stpes :mycurrent="1" stpesnum="3">
                    <p slot="p1" style="color: #fff;">设计原稿</p>
                    <p slot="p2" style="color: #fff;">打样确认</p>
                    <p slot="p3" style="color: #fff;">分享购买</p>
            </my-stpes>
        </div>
        <div class="content">
            <div class="success">
                <div class="title">
                    <a-icon type="smile" theme="filled" style="color: #fff;"/>
                    <div>
                        <h3>操作成功！</h3>
                        <p style="color: #fff;">感谢您的下单</p>
                    </div>
                </div>
                <div class="desc">
                    <span></span>
                    <div class="container">
                        <p>ddvdvddvdvdvvvdvdvdvdv</p>
                        <p>dvdvdvdvvdvvdvvdvvdvdv</p>
                        <div class="btn-box">
                            <a-button>再来一单</a-button>
                            <a-button>返回</a-button>
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
export default {
    components:{
        MyStpes,
        MyHeader,
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
                padding-top: 50px;
                P{
                    color: #333;
                    text-align: center;
                    margin-bottom: 50px;
                }
                .btn-box{
                    display: flex;
                    justify-content: center;
                    button{
                        margin: 0 20px;
                        width: 88px;
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