<template>
    <div id="colorList">
        <my-title :title="'颜色列表'" :fontsize="20"></my-title>
        <div class="table-page-search-wrapper" style="margin-top: 20px;">
            <a-form layout="inline">
                <a-row style="padding-left: 20px;line-height: 39px;">
                <a-col :md="7">
                    <a-form-item label="颜色名称">
                        <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :md="5">
                    <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                    </span>
                </a-col>
                <a-col :md="12" style="text-align:right;">
                    <a-button type="primary" icon="plus" @click="addColor">添加</a-button>
                </a-col>
                </a-row>
            </a-form>
        </div>
        <div style="padding: 0 50px">
            <a-table
                :columns="columns"
                :dataSource="data"
                :pagination="ipagination"
                @change="handleTableChange"
                rowKey="id"
            >
                <div slot="colorAndName" slot-scope="text" style="display: flex; align-items:center;">
                    <span :style="{backgroundColor: text.itemValue,width: '20px',height: '20px',display: 'inline-block','margin-right': '5px',border: '1px solid #ccc','border-radius': '2px'}"></span><span>{{text.itemText}}</span>
                </div>
                <span slot="action" slot-scope="text, record">
                    <a-dropdown>
                        <a class="ant-dropdown-link" style="color: #333;">
                            更多<a-icon type="down"/>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a href="javascript:;" style="color: #333;" @click="editColorList(record.id)">修改</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;" style="color: #333;" @click="postColorDelete(record.id)">删除</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </span>
            </a-table>
        </div>
        <a-modal v-model="visible" :width="600" :maskClosable="false" title="添加/修改颜色" okText="确定" cancelText="关闭" @cancel="closeColorbox" @ok="postAddColor">
            <div style="padding: 0 30px;">
                <a-form :form="form">
                    <a-form-item label="颜色名称">
                        <a-input v-decorator="['colorname', { rules: [{ required: true, message: '请填写颜色名称!' }] }]"/>
                    </a-form-item>
                    <a-form-item label="颜色值">
                        <a-input v-decorator="['value', { rules: [{ required: true, message: '请填写颜色值!' }] }]"/>
                    </a-form-item>
                    <a-form-item label="印刷色值">
                        <a-input v-decorator="['colorcmyk', { rules: [{ required: true, message: '请填写印刷色值!' }] }]"/>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import { colorList,colorDelete,addColorList,editColorShow } from '@/api/system'
const columns = [
    {
        title: '颜色名称',
        dataIndex: 'colorAndName',
        scopedSlots: { customRender: 'colorAndName' },
    },
    {
        title: 'HEX色值',
        dataIndex: 'itemValue',
    },
    {
        title: 'CMYK',
        dataIndex: 'description',
    },
    {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'center'
    }
];
export default {
    data() {
        return {
            form:this.$form.createForm(this),
            data:[],
            columns,
            visible: false,
            queryParam: {
                name: '',
            },
            ipagination:{
                current: 1,
                pageSize: 10,
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条"
                },
                showQuickJumper: true,
                total: 0
            },
            current: 1,
            colorId: ''
        };
    },
    components:{
        MyTitle
    },
    computed: {
    
    },
    mounted(){
        this.getColorList(1,'')
    },
    methods: {
        editColorList(id){
            this.colorId = id;
            this.visible = true;
            editColorShow(id).then(res => {
                
                if(res.code == 0){
                    this.form.setFieldsValue({
                        colorname: res.result.itemText,
                        value: res.result.itemValue,
                        colorcmyk: res.result.description,
                    });
                }
            })
        },
        closeColorbox(){
            this.visible = false;
            this.form.setFieldsValue({
                colorname: '',
                value: '',
                colorcmyk: '',
            });
        },
        postAddColor(){
            this.form.validateFields((err, values) => {
                if(!err){
                    addColorList(values.value,values.colorcmyk,values.colorname,this.colorId).then(res => {
                        
                        if(res.code == 200){
                            this.$message.success(res.message);
                            this.getColorList(1,'');
                            this.visible = false;
                            this.colorId = '';
                            this.form.setFieldsValue({
                                colorname: '',
                                value: '',
                                colorcmyk: '',
                            });
                        }
                    })
                }
            })
        },
        addColor(){
            this.visible = true;
        },
        postColorDelete(id){
            colorDelete(id).then(res => {
                if(res.code == 200){
                    this.$message.success(res.message);
                    this.getColorList(this.current,this.queryParam.name)
                }
            })
        },
        getColorList(pageNo,name){
            colorList(pageNo,name).then(res => {
                
                this.ipagination.total = res.total;
                this.data = res.records;
            })
        },
        searchQuery(){
            this.getColorList(1,this.queryParam.name)
        },
        handleTableChange(pagination) {
            this.ipagination = pagination;
            this.current = pagination.current;
            this.getColorList(this.current,this.queryParam.name)
        },
    },
};
</script>
<style lang="less" scoped>
#colorList{
    padding: 0 20px;
    .table-page-search-wrapper{
        padding-bottom: 20px;
    }
}

</style>