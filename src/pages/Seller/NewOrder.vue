<template>
    <div id="NewOrder">
        <div class="content">
            <a-row type="flex" justify="space-between" align="top" style="min-height: 100%;height: 100%;">
                <a-col :span="6" style="height: 100%;">
                    <div class="left">
                        <My-Header></My-Header>
                        <a-menu
                            mode="inline"
                            :defaultSelectedKeys="['sub00']" 
                            :defaultOpenKeys="['0']"
                            @click="handleClick"
                        >
                            <a-sub-menu  v-for="(item, index) in menuList" :key="index.toString()">
                                <span slot="title" style="display: flex;align-items: center;"><a-avatar :size="20" :src="item.icon" style="margin-right: 5px;"/><span>{{item.title}}</span></span>
                                <a-menu-item v-for="(sub,sindex) in item.subMenu" :key="'sub'+ index + sindex.toString()" @click="handleGetList(sub.categoryId)">{{sub.title}}</a-menu-item>
                            </a-sub-menu>
                        </a-menu>
                    </div>
                </a-col>
                <a-col :span="18" style="height: 100%;">
                    <div class="right">
                        <User></User>
                        <my-title :title="'新建订单'"></my-title>
                        <goods-list :goodsArr="goodsList"></goods-list>
                        <div class="btn-box">
                            <a-button :loading="loading" @click="loadMore" :disabled="btnable">
                                加载更多
                            </a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
import GoodsList from "@/components/GoodsList/GoodsList";
import User from '@/components/Header/User';
import MyHeader from '@/components/Header/Header';
import { listAll,categoryList } from "@/api/seller";
export default {
    components:{
        MyTitle,
        GoodsList,
        User,
        MyHeader
    },
    data () {
        return {
            loading:false,
            goodsList:[],
            menuList:[],
            defaultSelectedKeys:'',
            defaultOpenKeys:'',
            pageNum: 1,
            id:'',
            btnable:false
        }
    },
    created(){
        this.getAllList();
    },
    mounted(){
        
    },
    methods: {
        loadMore(){
            let that = this;
            that.pageNum ++;
            that.loading = true;
            categoryList(this.id,this.pageNum).then(res => {
                that.loading = false;
                console.log(res)
                if(res.current <= res.total){
                    that.goodsList = that.goodsList.concat(res.records);
                }else{
                    that.btnable = true;
                    that.$message.error('无更多数据！');
                }
            })

        },
        handleClick (e) {
            console.log('click', e.key)
        },
        getAllList(){
            listAll().then(res => {
                console.log(res)
                if(res.code == 0){
                    if(res.total == 1){
                        this.btnable = true;
                    }
                    this.menuList = res.result;
                    this.defaultSelectedKeys = res.result[0].subMenu[0].categoryId.toString();
                    this.id = res.result[0].subMenu[0].categoryId.toString();
                    this.defaultOpenKeys = res.result[0].categoryId.toString();
                    this.getcategoryList(this.defaultSelectedKeys,1)
                }
            })
        },
        getcategoryList(id,num){
            categoryList(id,num).then(res => {
                console.log(res)
                this.goodsList = res.records;
            })
        },
        handleGetList(id){
            this.id = id;
            this.getcategoryList(id,1)
        }
    },
}
</script>
<style lang="less">
@import url("./../../components/index.less");
#NewOrder{
    width: 100%;
    height: 100%;
    padding: 50px;
    .content{
        height: 100%;
        .left{
            background-color: #5ba997;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            padding-top: 50px;
            min-height: 100%;
        }
        .right{
            background-color: #fff;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 20px;
            min-height: 100%;
            position: relative;
            overflow-y: scroll;
            .btn-box{
                margin-top: 20px; 
                position: absolute;
                bottom: 10px;
                left: 50%;
            }
        }
    }
    
}
</style>