<template>
    <div id="NewOrder">
        <my-title :title="'新建订单'">
            <a-button size="small" icon="rollback">返回</a-button>
        </my-title>
        <a-row type="flex" justify="space-between" align="top" style="padding-top: 20px;">
            <a-col :span="6">
                <a-menu
                    mode="inline"
                    :openKeys="openKeys"
                    @openChange="onOpenChange"
                    style="width: 256px"
                >
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="mail" /><span>校服</span></span>
                        <a-menu-item key="1">T-Shirt</a-menu-item>
                        <a-menu-item key="2">POLO</a-menu-item>
                        <a-menu-item key="3">POLO</a-menu-item>
                        <a-menu-item key="4">POLO</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="appstore" /><span>工作服</span></span>
                        <a-menu-item key="5">Option 5</a-menu-item>
                        <a-menu-item key="6">Option 6</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <span slot="title"><a-icon type="setting" /><span>运动服</span></span>
                        <a-menu-item key="7">Option 9</a-menu-item>
                        <a-menu-item key="8">Option 10</a-menu-item>
                        <a-menu-item key="9">Option 11</a-menu-item>
                        <a-menu-item key="10">Option 12</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub4">
                        <span slot="title"><a-icon type="setting" /><span>政府和组织</span></span>
                        <a-menu-item key="11">Option 9</a-menu-item>
                        <a-menu-item key="12">Option 10</a-menu-item>
                        
                    </a-sub-menu>
                </a-menu>
            </a-col>
            <a-col :span="17">
                <goods-list :goodsArr="goodsList"></goods-list>
                <div  style="text-align: center;margin: 20px 0;">
                    <a-button :loading="loading">
                        加载更多
                    </a-button>
                </div>
                
            </a-col>
        </a-row>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import GoodsList from "@/components/GoodsList/GoodsList";
export default {
    components:{
        MyTitle,
        GoodsList
    },
    data () {
        return {
            loading:true,
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub1'],
            goodsList:[
                {
                    id:1,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },
                {
                    id:2,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },
                {
                    id:3,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },{
                    id:4,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },{
                    id:5,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },{
                    id:6,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },{
                    id:7,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                },{
                    id:8,
                    name: '校篮球队训练服',
                    minprice: '200',
                    maxprice: '300',
                    num: '10',
                    size: 'S,M,L,XL,2XL'
                }
            ]
        }
    },
    methods: {
        onOpenChange (openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.openKeys = openKeys
        } else {
            this.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
        },
    },
}
</script>
<style lang="less" scoped>
#NewOrder{
    
}
</style>style