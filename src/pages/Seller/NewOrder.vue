<template>
    <div id="NewOrder">
        <my-title :title="'新建订单'">
            <a-button size="small" icon="rollback">返回</a-button>
        </my-title>
        <a-row type="flex" justify="space-between" align="top" style="padding-top: 20px;">
            <a-col :span="6">
                <a-menu
                    mode="inline"
                    style="width: 256px"
                    :defaultSelectedKeys="['sub00']" 
                    :defaultOpenKeys="['0']"
                    @click="handleClick"
                >
                    <a-sub-menu  v-for="(item, index) in menuList" :key="index.toString()">
                        <span slot="title" style="display: flex;align-items: center;"><a-avatar :size="20" :src="item.icon" style="margin-right: 5px;"/><span>{{item.title}}</span></span>
                        <a-menu-item v-for="(sub,sindex) in item.subMenu" :key="'sub'+ index + sindex.toString()" @click="handleGetList(sub.categoryId)">{{sub.title}}</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-col>
            <a-col :span="17">
                <goods-list :goodsArr="goodsList"></goods-list>
                <div  style="text-align: center;margin: 20px 0;">
                    <a-button :loading="loading" @click="loadMore" :disabled="btnable">
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
import { listAll,categoryList } from "@/api/seller";
export default {
    components:{
        MyTitle,
        GoodsList
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
                    this.menuList = res.result;
                    this.defaultSelectedKeys = res.result[0].subMenu[0].categoryId.toString();
                    this.id = res.result[0].subMenu[0].categoryId.toString();
                    this.defaultOpenKeys = res.result[0].categoryId.toString();
                    this.getcategoryList(this.defaultSelectedKeys,1)
                    console.log(this.defaultSelectedKeys)
                    console.log(this.defaultOpenKeys)
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
<style lang="less" scoped>
#NewOrder{
    
}
</style>style