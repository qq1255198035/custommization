<template>
    <div id="BlankLayout">
        <My-Header :showNav="false"></My-Header>
        <router-view></router-view>
    </div>
</template>
<script>
import MyHeader from '@/components/Header/Header';

export default {
    components:{
        MyHeader,
    }
}
</script>

<style lang="less" scoped>
#BlankLayout{
    width: 100%;
    min-width: 100%;
    padding: 150px 80px 0;
    background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
}
</style>