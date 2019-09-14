<template>
    <div id="compoents-com1">
        <div class="box">
            <span>
                <a-icon type="pay-circle" />
            </span>
            <div class="desc">
                <span>Commission - Current</span>
                <h3>${{ money }}</h3>
            </div>
        </div>
        <div class="form-box">
            <a-form layout="horizontal">
                <a-form-item
                    label="Recipient Account Number"
                    :labelCol="{span: 7}" :wrapperCol="{span: 17}"
                >
                    <a-input placeholder="Please Fill In Account Information" @change="inputEnter3" v-model="count">
                        <a-select slot="addonBefore" style="width: 90px" @change="select" placeholder="Please select an account.">
                            <a-select-option value="1">Paypal</a-select-option>
                            <a-select-option value="2">Weixin</a-select-option>
                        </a-select>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="Recipient Name"
                    :labelCol="{span: 7}" :wrapperCol="{span: 17}"
                >
                    <a-input placeholder="Please enter your name." @change="inputEnter1" v-model="name">
                       
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="Withdrawal Amount"
                    :labelCol="{span: 7}" :wrapperCol="{span: 17}"
                >
                    <a-input placeholder="Minimum cash withdrawal$100" type="number" @change="inputEnter2" v-model="price" min="100"></a-input>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import { queryBalance } from "@/api/seller"
export default {
    data(){
        return{
            money: '',
            name: '',
            price: '',
            count:'',
           
        }
    },
    mounted(){
        this.getQueryBalance();
    },
    methods:{
        getQueryBalance(){
            queryBalance().then(res => {
                console.log(res)
                this.money = res.result.balance
            })
        },
        select(value){
            this.$emit('selected', value)
        },
        inputEnter1(){
            this.$emit('input1', this.name)
        },
        inputEnter2(){
            this.$emit('input2', this.price,this.money)
        },
        inputEnter3(){
            this.$emit('input3', this.count)
        }
    }
}
</script>
<style lang="less" scoped>
#compoents-com1{
    .box{
        display: flex;
        justify-content: center;
        margin: 30px 0 20px;
        .desc{
            h3{
                color: #727272;
                font-size: 25px;
                margin: 0;
            }
            span{
                color: #999;
            }
        }
        > span{
            width: 60px;
            height: 60px;
            border-radius: 28px;
            background-color: #d7f1f0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            i{
                font-size: 35px;
                color: #31b7b1;
            }
        }
    }
    .form-box{
        padding: 30px;
    }
}
</style>