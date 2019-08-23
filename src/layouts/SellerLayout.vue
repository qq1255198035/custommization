<template>
    <div id="SellerLayout">
        <div class="content">
            <a-row type="flex" justify="space-between" align="top" style="min-height: 100%;height: 100%;">
                <a-col :span="6" style="height: 100%;">
                    <div class="left" ref="left">
                        <My-Header></My-Header>
                        <My-Menu style="margin-top: 50px;"></My-Menu>
                    </div>
                </a-col>
                <a-col :span="18" style="height: 100%;">
                    <div class="right" ref="right">
                        <User></User>
                        <router-view></router-view>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import User from '@/components/Header/User';
import MyHeader from '@/components/Header/Header';
import MyMenu from "@/components/MyMenu/MyMenu";
export default {
    components:{
        User,
        MyMenu,
        MyHeader
    },
    mounted(){
       
    }
}
</script>

<style lang="less" scoped>
#SellerLayout{
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
        }
    }
    
}
</style>