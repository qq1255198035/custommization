<template>
    <div id="OrderDetails">
        <my-title :title="'新建订单'">
            <a-button size="small" icon="rollback">返回</a-button>
        </my-title>
        <a-row type="flex" justify="space-between" align="top" style="padding-top: 20px;">
            <a-col :span="4">
                <div class="order-info">
                    <dl class="top">
                        <dt>订单ID：</dt>
                        <dd>{{information.orderId}}</dd>
                        <dt>订单时间：</dt>
                        <dd>{{information.orderTime}}</dd>
                    </dl>
                    <ul class="bottom">
                        <li v-for="item in information.list" :key="item.id">
                            <img src="@/assets/jaw.jpg" alt="">
                            <div>
                                <div>
                                    <h3>{{item.name}}</h3>
                                    <p>颜色：{{item.color}}</p>
                                </div>
                                <p>
                                    <a-icon type="delete" />
                                </p>
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </a-col>
            <a-col :span="17">
                <ul class="forms">
                    <li>
                        <h3>
                            预期订货数量 <span>Tips: 最小订货量： 14</span>
                        </h3>
                        <div id="stepper">
                                <button class="left" @click="clickLeftbtn">-</button>
                                <input type="number" min="0" max="Infinity" class="stepper-input" v-model="number">
                                <button class="right" @click="clickRightbtn">+</button>
                        </div>
                    </li>
                    <li>
                        <h3>
                            选择付款截止日期 <span>描述1313213213213232</span>
                        </h3>
                        <div style="padding-left: 30px;">
                            <a-date-picker
                                :disabledDate="disabledStartDate"
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                v-model="startValue"
                                placeholder="Start"
                                @openChange="handleStartOpenChange"
                            />
                            <a-date-picker
                                :disabledDate="disabledEndDate"
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="End"
                                v-model="endValue"
                                :open="endOpen"
                                @openChange="handleEndOpenChange"
                                style="margin-left: 10px;"
                            />
                        </div>
                        
                    </li>
                    <li>
                        <h3>
                            运输方式 <span>描述4465+5+65+66+56+6+</span>
                        </h3>
                        <div class="select-way">
                            <a-radio-group @change="onChange" v-model="value">
                                <a-radio :value="1" style="display: flex; align-items: top;">
                                    <h4>统一地址发货</h4>
                                </a-radio>
                                <div style="margin-left: 24px;">
                                    <p>用户付款后，我们会统一发送到同一地址，由收到包裹的人员一起发放。</p>
                                    <h4>收货地址：<span @click="addressManagement"><a-icon type="edit" /> 管理地址</span></h4>
                                    <p>吉林省长春市南关区卫星路创新花园3号楼209</p>
                                </div>
                                <a-radio :value="2" style="display: flex; align-items: top;">
                                    <h4>发别发货</h4>
                                </a-radio>
                                <div style="margin-left: 24px;">
                                    <p>
                                        用户付款后，我们会统一发送到同一地址，由收到包裹的人员一起发放。
                                    </p>
                                </div>
                            </a-radio-group>
                        </div>
                        
                    </li>
                    <li>
                        <h3>开始</h3>
                    </li>
                </ul>
                <a-button style="margin-left: 30px;">开始团体订单</a-button>
            </a-col>
        </a-row>
        <a-modal
                v-model="modelShow"
                :footer="null"
        >
                <template slot="title">
                    <div>
                            <img src="@/assets/jaw.jpg" alt="" width="30">
                    </div>
                </template>
        </a-modal>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
export default {
    components:{
        MyTitle
    },
    data(){
        return{
            modelShow:false,
            value: 1,
            number:0,
            startValue: null,
            endValue: null,
            endOpen: false,
            information:{
                orderId:4164546,
                orderTime: '2019-56-56 15:25:30',
                list:[
                    {
                        id:1,
                        name:'校篮球队训练服',
                        color: '蓝色'
                    },
                    {
                        id:2,
                        name:'校篮球队训练服',
                        color: '蓝色'
                    }
                ]
                
            }
        }
    },
    methods:{
        addressManagement(){
            this.modelShow = true;
        },
        clickLeftbtn(){
            this.number > 0 ? this.number -- : 0
        },
        clickRightbtn(){
            this.number ++;
        },
        disabledStartDate (startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate (endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange (open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange (open) {
            this.endOpen = open;
        },
        onChange (e) {
            console.log('radio checked', e.target.value)
        },
    },
    watch: {
        startValue(val) {
        console.log('startValue', val)
        },
        endValue(val) {
        console.log('endValue', val)
        }
    },
}
</script>
<style lang="less">
@import "./../../components/index.less";
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
} 
#OrderDetails{
    .order-info{
        .top{
            padding: 20px 0;
            border-bottom: 1px solid #fff;
            dd{
                margin: 10px 0;
            }
        }
        .bottom{
            li{
                display: flex;
                align-items: flex-start;
                border-bottom: 1px solid #fff;
                padding: 10px 0;
                justify-content: space-between;
                > img{
                    width: 100px;
                }
                > div{
                    
                    height: 100%;
                    h3{
                        color: #fff;
                    }
                    > p{
                        width: 100%;
                        margin-top: 20px; 
                        text-align: right;
                        i{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
    .forms{
        position: relative;
        &:before{
            content: '';
            position: absolute;
            left: 7px;
            top: 10px;
            background-color: rgba(255,255,255,0.5);
            width: 1px;
            height: 97%;
            
        }
        li{
            h3{
                position: relative;
                color: #fff;
                margin: 20px 0;
                padding-left: 30px;
                span{
                    font-size: 12px;
                    margin-left: 10px;
                }
                &:before{
                    content: '';
                    width: 14px;
                    height: 14px;
                    border-radius: 7px;
                    background-color: #fff;
                    position: absolute;
                    left: 0;
                    top: 6px;
                }
            }
            h4{
                color: #fff;
                display: flex;
                justify-content: space-between;
                span{
                    cursor: pointer;
                }
            }
            .select-way{
                padding-left: 30px;
                p{
                    padding: 10px 0;
                    border-bottom: 1px solid #fff;
                    margin-bottom: 20px;
                }
            }
        }
    }
    #stepper{
        padding-left: 30px;
        .stepper-input{
                box-sizing: border-box;
                width: 32px;
                height: 28px;
                padding: 0;
                color: #fff;
                font-size: 14px;
                text-align: center;
                vertical-align: middle;
                background-color: rgba(255,255,255,0.5);
                border: 0;
                border-width: 1px 0;
                border-radius: 0;
                -webkit-appearance: none;
                outline: none;
        }
        .left{
                position: relative;
                box-sizing: border-box;
                width: 28px;
                height: 28px;
                margin: 0;
                padding: 5px;
                color: #fff;
                vertical-align: middle;
                background-color: rgba(255,255,255,0.5);
                border: 0;
                border-radius: 4px 0 0 4px;
                border-right: 1px solid #fff;
                outline: none;
                cursor: pointer;
                line-height: 14px;
        }
        .right{
                position: relative;
                box-sizing: border-box;
                width: 28px;
                height: 28px;
                margin: 0;
                padding: 5px;
                color: #fff;
                vertical-align: middle;
                background-color: rgba(255,255,255,0.5);
                border: 0;
                border-radius: 0 4px 4px 0;
                border-left: 1px solid #fff;
                outline: none;
                cursor: pointer;
                line-height: 14px;
        }
    }
}
</style>