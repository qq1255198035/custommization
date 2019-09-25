<template>
    <div class="mycontent">
        <my-title :title="'销售商详情'" :fontsize="20" style="width: 100%;background-color: #fff;padding: 10px 20px;border-top: 1px solid #ccc">
            <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
        </my-title>
        <a-row type="flex" justify="space-between" style="padding: 0 10px;">
            <a-col :span="7">
                <div class="info-left">
                    <img :src="item.img" alt="" width="100" height="100">
                    <div style="text-align: left;">
                        <h2>{{item.company}}</h2>
                        <p><span>等级：<span>{{item.levelName}}</span></span><span>折扣：<span>{{item.discount}}%</span></span></p>
                        <p>邮箱：{{item.email}}</p>
                        <p>注册时间：<span>{{item.createTime}}</span></p>
                    </div>
                    <img :src="item.papersImg" alt="">
                </div>
            </a-col>
            <a-col :span="16">
                <div class="info-right">
                    <h2>基本信息</h2>
                    <p>{{item.intro}}</p>
                    <p></p>
                    <h2>代理信息</h2>
                    <p>公司名称：{{item.company}}</p>
                    <p>商业登记号：{{item.registration}}</p>
                    <p>预计销售额：{{item.sale}}</p>
                    <p>员工数量：{{item.employee}}</p>
                </div>
            </a-col>
        </a-row>
        <div class="btn-box" v-if="status == 0">
            <a-button type="danger" @click="openModalbox(2)">拒绝</a-button>
            <a-button type="primary" @click="openModalbox(1)">通过</a-button>
        </div>
        <a-modal v-model="show" title="经销商审批" okText="确认" cancelText="取消" @ok="hideModal">
            <div>
                <a-form :form="form">
                    <a-form-item
                        label="拒绝原因"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 18 }"
                        v-if="key == 2"
                    >
                        <a-textarea 
                            v-decorator="[
                            'note',
                            {rules: [{ required: true, message: '请填写拒绝原因!' }]}
                            ]"
                        ></a-textarea>
                    </a-form-item>
                    <a-form-item
                        label="折扣等级"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 18 }"
                        v-if="key == 1"
                    >
                        <a-select placeholder="请选择折扣等级" style="width: 100%;"
                            v-decorator="[
                            'leavel',
                            {rules: [{ required: true, message: '请选择折扣等级!' }]}
                            ]"
                        >
                            <a-select-option v-for="item in options" :key="item.id" :value="item.id">{{item.discount}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import { dealerDetails,dealerGrade,approvalDealer } from '@/api/seller'
export default {
    props: {

    },
    data() {
        return {
            dealerId: '',
            item:{},
            show:false,
            key:0,
            form: this.$form.createForm(this),
            options:[],
            status:-1
        };
    },
    
    mounted(){
        this.dealerId = this.$route.query.id;
        console.log(this.dealerId)
        this.getDealerDetails(this.dealerId)
        this.getDealerGrade();
    },
  
    methods:{
        hideModal(){
            if(this.key == 1){
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.postApprovalDealer(this.dealerId,1,'',values.leavel)
                    }
                })
            }else if(this.key == 2){
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.postApprovalDealer(this.dealerId,2,values.note,'')
                    }
                })
            }
        },
        postApprovalDealer(ids,status,remark,level){
            approvalDealer(ids,status,remark,level).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.show = false;
                    this.$message.success('操作成功！')
                }
            })
        },
        getDealerGrade(){
            dealerGrade().then(res => {
                console.log(res)
                if(res.code == 0){
                    this.options = res.result;
                }
            })
        },
        openModalbox(key){
            this.key = key;
            this.show = true;
        },
        getDealerDetails(dealerId){
            dealerDetails(dealerId).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.item = res.result
                    this.status = res.result.status;
                }
            })
        },
    
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
    position: relative;
    padding-bottom: 72px;
    .info-left{
        text-align: center;
        img:nth-child(3){
            width: 100%;
            margin: 10px 0;
        }
    }
    .info-left,.info-right{
        padding: 20px;
        background: #fff;
        box-shadow: 2px 4px 4px #eee;
        p{
            margin: 5px 0;
        }
        img{
            border-radius: 50%;
        }
    }
    .btn-box{
        width: 100%;
        text-align: right;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 20px 0;
        button{
            margin: 0 20px;
        }
    }
}

</style>
