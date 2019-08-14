<template>
    <div id="SellerLayout">
        <My-Header :showNav="false"></My-Header>
        <a-row type="flex" justify="space-between" align="top">
            <a-col :span="6">
                <My-Menu></My-Menu>
            </a-col>
            <a-col :span="17">
                <router-view></router-view>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import MyHeader from '@/components/Header/Header';
import MyMenu from "@/components/MyMenu/MyMenu";
export default {
    components:{
        MyHeader,
        MyMenu
    }
}
</script>

<style lang="less" scoped>
#SellerLayout{
    width: 100%;
    padding: 150px 80px 0;
    background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
}
</style>