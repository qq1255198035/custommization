<template>
    <div id="Timer">
        <h1><img src="@/assets/logo-group.png" alt="" srcset=""></h1>
        <h2>Our awesome platform for custom gears is about to go live. Sign up now to request an early invitation! </h2>
        <div style="margin: 100px 0; display: flex; justify-content: center">
            <div class="clock"></div>
        </div>
        <h3>Subscribe now to receive latest updates!</h3>
        <div class="input-box">
            <form>
                <input type="email" placeholder="Enter your email..." v-model="email"><button type="submit" @click="submitEmail">Subscribe!</button>
            </form>
        </div>
        <p>
            <a href="">
                <img src="@/assets/facebook-icon.png" alt="">
            </a>
            <a href="">
                <img src="@/assets/twiter-icon.png" alt="">
            </a>
            <a href="">
                <img src="@/assets/ins-icon.png" alt="">
            </a>
        </p>
        <!-- <ul class="img-list">
            <li>
                <a href="">
                    <img src="@/assets/GO.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="@/assets/SL.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="@/assets/CA.png" alt="">
                </a>
            </li>
            <li>
                <a href="">
                    <img src="@/assets/IQ.png" alt="">
                </a>
            </li>
        </ul> -->
    </div>
</template>
<script>
import '@/assets/flipclock.js';
import { axios } from '@/utils/request'
export default {
    components:{
        
    },
    data(){
        return{
            email:''
        }
    },
    mounted(){
        this.setCountdown();
        
    },
    methods:{
        submitEmail(){
            if(this.email){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(reg.test(this.email)){
                    axios({
                        url: 're.php?mail=' + this.email,
                        method: 'get'
                    }).then(res => {
                        console.log(res)
                    })
                }else{
                    alert('邮箱格式错误！')
                }
            }else{
                alert('请填写邮箱！')
            }
        },
        btnClick(){
            console.log(1)
        },
        setCountdown(){
            var clock;
            // 不包过当天时间
            const end = new Date('2019-08-23').getTime() / 1000;
            const now = new Date().getTime() / 1000;
            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
            });    
            clock.setTime(end - now);
            clock.setCountdown(true);
            clock.start();
        }
        
    }
}
</script>
<style lang="less" scoped>
@import url("./../../assets/flipclock.css");
#Timer{
    
    background-image: url("./../../assets/blue-bg.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    h1{
        text-align: center;
        padding: 50px 0 30px;
    }
    h2{
        text-align: center;
        color: #fff;
        font-size: 30px;
        width: 50%;
        margin: 0 auto;
    }
    h3{
        text-align: center;
        color: #fff;
        font-size: 50px;
        margin: 0 auto;
    }
    > p{
        display: flex;
        justify-content: center;
        padding: 100px 0;
        margin: 0;
        a{
            border: 1px solid #fff;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px;
            transition: all 0.6s;
            &:hover{
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
        }
    }
    .input-box{
        display: flex;
        justify-content: center;
        margin: 100px 0;
        input{
            border: none;
            outline: none;
            color: #000;
            border-top-left-radius: 35px;
            border-bottom-left-radius: 35px;
            width: 67%;
            padding: 10px 30px;
            font-size: 30px;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */
            color: #999;
            font-size: 16px;
        }
        button{
            width: 33%;
            border: none;
            background-color: #11b4af;
            font-size: 30px;
            border-top-right-radius: 35px;
            border-bottom-right-radius: 35px;
            padding: 10px 20px;
            outline: none;
            cursor: pointer;
        }
    }
    .img-list{
        display: flex;
        padding-bottom: 100px;
        margin: 0;
        li{
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>