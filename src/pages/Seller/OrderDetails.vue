<template>
    <div id="OrderDetails">
        <div class="container">
            <header>
                <p class="icon-logotxt"></p>
                <p>
                    <User></User>
                </p>
            </header>
            <my-title :title="'订单详情'" style="padding: 0 30px;margin-top: 20px;">
                <a-button size="small" icon="rollback">返回</a-button>
            </my-title>
            <a-row type="flex" justify="space-between" align="top" style="height: calc(100% - 189px);">
                <a-col :span="5" style="padding: 20px 30px;backgroundColor: #F2F2F2;height: 100%;overflow-y: scroll;">
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
                                        <p>价格：${{item.color}}</p>
                                        <p>数量：{{item.color}}</p>
                                    </div>
                                    <p>
                                        <a-icon type="edit" />
                                        <a-icon type="delete" />
                                    </p>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                </a-col>
                <a-col :span="17" style="padding-right: 30px;">
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
                                        <p>{{adress}}</p>
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
                v-model="modelShow1"
                :footer="null"
                :width="700"
                :centered="true"
                title="管理地址"
            >
                <ul class="adress">
                    <li v-for="(item,index) in adressList" :key="index" @click="setDefaultAdress(item.detailInfo)">
                        <p>
                            {{item.addressName}}{{item.detailInfo}}
                            <span>{{item.userName}}</span>
                            <span>{{item.telNumber}}</span>
                        </p>
                        <span>
                            <a-icon type="edit" style="margin-right: 10px;" @click="editAddress(item.id)"/>
                            <a-icon type="delete" />
                        </span>
                    </li>
                    
                </ul>
                <div class="btn-box">
                    <a-button icon="plus" style="width: 200px;" @click="inputAdress">添加地址</a-button>
                </div>
            </a-modal>
            <a-modal
                v-model="modelShow2"
                :footer="null"
                :centered="true"
                title="添加地址"
            >
                <!-- <template slot="title">
                    <div>
                            <img src="@/assets/jaw.jpg" alt="" width="30">
                    </div>
                </template> -->
                <div class="form-box">
                    <a-form layout="vertical" :form="form">
                        <a-form-item label="地址别名：">
                            <a-input v-decorator="['bm',{rules: [{ required: true, message: '请填写地址别名（如： 家、公司）！' }]}]"/>
                        </a-form-item>
                        <a-form-item label="国家/省/市：">
                            <a-cascader :options="options" placeholder="Please select" v-decorator="['country',{rules: [{ required: true, message: '请填写国家、省、市！' }]}]"/>
                        </a-form-item>
                        <a-form-item label="详细地址：">
                            <a-input v-decorator="['adress',{rules: [{ required: true, message: '请填写国家、省、市！' }]}]"/>
                        </a-form-item>
                        <a-form-item label="邮编：">
                            <a-input v-decorator="['email',{rules: [{ required: true, message: '请填写邮编！' }]}]"/>
                        </a-form-item>
                        <a-form-item label="联系人：">
                            <a-input v-decorator="['phonesome',{rules: [{ required: true, message: '请填写联系人！' }]}]"/>
                        </a-form-item>
                        <a-form-item label="电话：">
                            <a-input type="tel" v-decorator="['tel',{rules: [{ required: true, message: '请填写电话！' }]}]"/>
                        </a-form-item>
                    </a-form>
                    <div class="btn-box">
                        <a-button type="primary" style="padding: 0 30px;" @click="postAddAddress">提 交</a-button>
                        <a-button style="padding: 0 30px;">取 消</a-button>
                    </div>
                </div>
                
            </a-modal>
        </div>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import User from "@/components/Header/User";
import { adressList,addressOne,addAddress, queryById } from "@/api/seller";
export default {
    components:{
        MyTitle,
        User
    },
    data(){
        return{
            adress:'',
            id: '',
            form: this.$form.createForm(this),
            modelShow1:false,
            modelShow2:false,
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
                
            },
            adressList:[],
            options: []
        }
    },
    mounted(){
        this.getAdressList();
        this.getAddressOne()
    },
    methods:{
        editAddress(id){
            this.id = id
            this.modelShow1 = false;
            this.modelShow2 = true;
            this.queryAddressById(this.id)
        },
        queryAddressById(id){
            queryById(id).then(res => {
                this.form.setFieldsValue(
                    {
                        bm: res.result.name,
                        country: [1,4552,4553],
                        adress: res.result.detailInfo,
                        email: res.result.postalCode,
                        phonesome:　res.result.userName,
                        tel: res.result.telNumber
                    },
                   
                );
                
            })
        },
        postAddAddress(){
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log(values)
                    let params = {
                            id: this.id, 
                            userName: values.phonesome, 
                            postalCode: values.email, 
                            telNumber: values.tel, 
                            addressName: values.country.join(','), 
                            detailInfo: values.adress,
                            name: values.bm
                        }
                        console.log(values.country.join(','))
                        addAddress(params).then(res => {
                            console.log(res)
                            if(res.code == 200){
                                this.$message.success(res.message);
                                this.modelShow2 = false;
                                this.getAdressList()
                            }
                        })
                        
                }
            });
            // 
        },
        getAddressOne(){
            addressOne().then(res => {
                console.log(res);
                this.options = res.result;
            })
        },
        inputAdress(){
            this.id = ''
            this.modelShow1 = false;
            this.modelShow2 = true;
        },
        addressManagement(){
            this.modelShow1 = true;
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
        getAdressList(){
            adressList().then(res => {
                console.log(res)
                this.adressList = res.result
                this.adress = res.result[0].detailInfo;
            })
        },
        setDefaultAdress(item){
            this.adress = item;
        }
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
@import url("./../../components/index.less");
@import url("./../../assets/style.css");
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
} 
.form-box{
    padding: 30px 30px 0;
}

.btn-box{
    padding: 20px 0;
    text-align: center;
    button{
        margin: 0 10px;
    }
}
.adress{
    padding: 30px 50px;
    margin: 0;
    li{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        &:hover{
            background-color: #E3F2F0;
        }
        p{
            font-size: 14px;
            margin: 0;
            span{
                margin: 0 10px;
            }
        }
        > span{
            i{
                font-size: 20px;
                cursor: pointer;
                color: #5ba997;
            }
        }
    }
}
#OrderDetails{
    width: 100%;
    height: 100%;
    padding: 50px;
    .container{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        header{
            display: flex;
            width: 100%;
            justify-content: space-between;
            border-bottom: 1px solid #5ba997;
            padding: 30px;
            p:nth-child(1){
                color: #5ba997;
                font-size: 60px;
                margin-bottom: 0;
            }
        }
        .order-info{
            .top{
                padding: 20px 0;
                border-bottom: 1px solid #fff;
                dt{
                    color: #5ba997;
                }
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
                        display:flex;
                        align-items: flex-end;
                        height: 100%;
                        width: calc(100% - 120px);
                        h3{
                            color: #5ba997;
                        }
                        div{
                            width: 80%;
                            p{
                                margin: 0;
                            }
                        }
                        > p{
                            width: 20%;
                            margin: 0; 
                            text-align: right;
                            i{
                                font-size: 20px;
                                margin: 0 2px;
                                cursor: pointer;
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
                background-color: #5ba997;
                width: 1px;
                height: 97%;
                
            }
            li{
                h3{
                    position: relative;
                    color: #5ba997;
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
                        background-color: #5ba997;
                        position: absolute;
                        left: 0;
                        top: 6px;
                    }
                }
                h4{
                    color: #5ba997;
                    display: flex;
                    justify-content: space-between;
                    span{
                        cursor: pointer;
                        color: #5ba997;
                    }
                }
                .select-way{
                    padding-left: 30px;
                    p{
                        padding: 10px 0;
                        border-bottom: 1px solid #ccc;
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
    
}
</style>